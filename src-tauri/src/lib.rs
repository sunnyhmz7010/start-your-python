use once_cell::sync::Lazy;
use serde::Serialize;
#[cfg(windows)]
use std::os::windows::process::CommandExt;
use std::{
  collections::HashMap,
  fs,
  io::{Read, Write},
  path::{Path, PathBuf},
  process::{Child, ChildStdin, Command, Stdio},
  sync::{
    atomic::{AtomicBool, Ordering},
    Arc, Mutex,
  },
  thread,
  time::Duration,
};
use tauri::{Emitter, Manager, State};
use uuid::Uuid;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct LessonSourceFile {
  file_path: String,
  source: String,
}

#[derive(Clone)]
struct PythonCommandSpec {
  command: String,
  prefix_args: Vec<String>,
}

#[derive(Serialize, Clone)]
#[serde(rename_all = "camelCase")]
struct PythonAvailability {
  available: bool,
  command: Option<String>,
  version: Option<String>,
  executable_path: Option<String>,
  error: Option<String>,
}

#[derive(Clone)]
struct DetectedPythonCommand {
  spec: PythonCommandSpec,
  version: String,
  executable_path: Option<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct PythonRunSession {
  session_id: String,
  command: String,
}

#[derive(Serialize, Clone)]
#[serde(rename_all = "camelCase")]
struct PythonOutputEvent {
  session_id: String,
  stream: String,
  chunk: String,
}

#[derive(Serialize, Clone)]
#[serde(rename_all = "camelCase")]
struct PythonStateEvent {
  session_id: String,
  status: String,
  exit_code: Option<i32>,
  message: Option<String>,
}

struct PythonSession {
  child: Arc<Mutex<Child>>,
  stdin: Arc<Mutex<ChildStdin>>,
  stopped: Arc<AtomicBool>,
}

struct SessionRegistry {
  sessions: Arc<Mutex<HashMap<String, PythonSession>>>,
}

impl Default for SessionRegistry {
  fn default() -> Self {
    Self {
      sessions: Arc::new(Mutex::new(HashMap::new())),
    }
  }
}

static PYTHON_COMMAND_CANDIDATES: Lazy<Vec<PythonCommandSpec>> = Lazy::new(|| {
  vec![
    PythonCommandSpec {
      command: "python".into(),
      prefix_args: Vec::new(),
    },
    PythonCommandSpec {
      command: "py".into(),
      prefix_args: vec!["-3".into()],
    },
  ]
});

#[cfg(windows)]
const CREATE_NO_WINDOW: u32 = 0x08000000;

fn apply_hidden_process_flags(command: &mut Command) {
  #[cfg(windows)]
  {
    command.creation_flags(CREATE_NO_WINDOW);
  }
}

fn configure_python_command(command: &mut Command) {
  command.env("PYTHONIOENCODING", "utf-8");
  command.env("PYTHONUTF8", "1");
}

fn collect_python_files(dir: &Path, files: &mut Vec<PathBuf>) -> Result<(), String> {
  let entries = fs::read_dir(dir).map_err(|error| format!("Failed to read {}: {}", dir.display(), error))?;

  for entry in entries {
    let entry = entry.map_err(|error| format!("Failed to read directory entry: {}", error))?;
    let path = entry.path();

    if path.is_dir() {
      collect_python_files(&path, files)?;
      continue;
    }

    if path.extension().and_then(|extension| extension.to_str()) == Some("py") {
      files.push(path);
    }
  }

  Ok(())
}

fn resolve_lessons_root(app: &tauri::AppHandle) -> Option<PathBuf> {
  let mut candidates = Vec::new();

  if let Ok(current_dir) = std::env::current_dir() {
    candidates.push(current_dir.join("content").join("lessons"));
  }

  if let Ok(exe_path) = std::env::current_exe() {
    if let Some(exe_dir) = exe_path.parent() {
      candidates.push(exe_dir.join("content").join("lessons"));
    }
  }

  if let Ok(resource_dir) = app.path().resource_dir() {
    candidates.push(resource_dir.join("content").join("lessons"));
  }

  candidates.into_iter().find(|path| path.exists() && path.is_dir())
}

fn get_python_version(spec: &PythonCommandSpec) -> Option<String> {
  let mut command = Command::new(&spec.command);
  apply_hidden_process_flags(&mut command);
  configure_python_command(&mut command);
  for argument in &spec.prefix_args {
    command.arg(argument);
  }
  command.arg("--version");

  command
    .output()
    .ok()
    .filter(|output| output.status.success())
    .map(|output| {
      let stdout = String::from_utf8_lossy(&output.stdout).trim().to_string();
      let stderr = String::from_utf8_lossy(&output.stderr).trim().to_string();
      if stdout.is_empty() { stderr } else { stdout }
    })
    .filter(|value| !value.is_empty())
}

fn get_python_executable_path(spec: &PythonCommandSpec) -> Option<String> {
  let mut command = Command::new(&spec.command);
  apply_hidden_process_flags(&mut command);
  configure_python_command(&mut command);
  for argument in &spec.prefix_args {
    command.arg(argument);
  }
  command.arg("-c").arg("import sys; print(sys.executable)");

  command
    .output()
    .ok()
    .filter(|output| output.status.success())
    .map(|output| String::from_utf8_lossy(&output.stdout).trim().to_string())
    .filter(|value| !value.is_empty())
}

fn try_python_command(spec: &PythonCommandSpec) -> bool {
  get_python_version(spec).is_some()
}

fn detect_python_command() -> Option<DetectedPythonCommand> {
  PYTHON_COMMAND_CANDIDATES
    .iter()
    .find_map(|spec| {
      get_python_version(spec).map(|version| DetectedPythonCommand {
        spec: spec.clone(),
        version,
        executable_path: get_python_executable_path(spec),
      })
    })
}

fn detect_python_command_spec() -> Option<PythonCommandSpec> {
  detect_python_command().map(|detected| detected.spec)
}

fn emit_output(app: &tauri::AppHandle, payload: PythonOutputEvent) {
  let _ = app.emit("python-output", payload);
}

fn emit_state(app: &tauri::AppHandle, payload: PythonStateEvent) {
  let _ = app.emit("python-state", payload);
}

fn spawn_output_reader<R: Read + Send + 'static>(
  reader: R,
  stream: &'static str,
  app: tauri::AppHandle,
  session_id: String,
) {
  thread::spawn(move || {
    let mut reader = reader;
    let mut buffer = [0_u8; 1024];

    loop {
      match reader.read(&mut buffer) {
        Ok(0) => break,
        Ok(count) => {
          let chunk = String::from_utf8_lossy(&buffer[..count]).to_string();
          emit_output(
            &app,
            PythonOutputEvent {
              session_id: session_id.clone(),
              stream: stream.into(),
              chunk,
            },
          );
        }
        Err(_) => break,
      }
    }
  });
}

fn spawn_process_monitor(
  app: tauri::AppHandle,
  registry: Arc<SessionRegistry>,
  session_id: String,
  child: Arc<Mutex<Child>>,
  stopped: Arc<AtomicBool>,
) {
  thread::spawn(move || loop {
    let status_result = {
      let mut child = child.lock().expect("child lock poisoned");
      child.try_wait()
    };

    match status_result {
      Ok(Some(status)) => {
        let final_status = if stopped.load(Ordering::SeqCst) {
          "stopped"
        } else if status.success() {
          "completed"
        } else {
          "error"
        };

        emit_state(
          &app,
          PythonStateEvent {
            session_id: session_id.clone(),
            status: final_status.into(),
            exit_code: status.code(),
            message: None,
          },
        );

        registry
          .sessions
          .lock()
          .expect("session registry lock poisoned")
          .remove(&session_id);
        break;
      }
      Ok(None) => thread::sleep(Duration::from_millis(50)),
      Err(error) => {
        emit_state(
          &app,
          PythonStateEvent {
            session_id: session_id.clone(),
            status: "error".into(),
            exit_code: None,
            message: Some(format!("Python 进程状态检查失败: {}", error)),
          },
        );
        registry
          .sessions
          .lock()
          .expect("session registry lock poisoned")
          .remove(&session_id);
        break;
      }
    }
  });
}

#[tauri::command]
fn load_lesson_sources(app: tauri::AppHandle) -> Result<Vec<LessonSourceFile>, String> {
  let lessons_root = resolve_lessons_root(&app).ok_or_else(|| "Unable to locate content/lessons directory".to_string())?;
  let mut files = Vec::new();
  collect_python_files(&lessons_root, &mut files)?;
  files.sort();

  files
    .into_iter()
    .map(|path| {
      let source = fs::read_to_string(&path)
        .map_err(|error| format!("Failed to read {}: {}", path.display(), error))?;

      let relative_path = path
        .strip_prefix(&lessons_root)
        .map_err(|error| format!("Failed to compute lesson path for {}: {}", path.display(), error))?;

      let normalized_path = format!("content/lessons/{}", relative_path.to_string_lossy().replace('\\', "/"));

      Ok(LessonSourceFile {
        file_path: normalized_path,
        source,
      })
    })
    .collect()
}

#[tauri::command]
fn detect_python() -> PythonAvailability {
  if let Some(detected) = detect_python_command() {
    return PythonAvailability {
      available: true,
      command: Some(detected.spec.command),
      version: Some(detected.version),
      executable_path: detected.executable_path,
      error: None,
    };
  }

  PythonAvailability {
    available: false,
    command: None,
    version: None,
    executable_path: None,
    error: Some("未检测到 Python，请先安装并加入 PATH。".into()),
  }
}

#[tauri::command]
fn start_python_run(
  app: tauri::AppHandle,
  registry: State<'_, SessionRegistry>,
  code: String,
) -> Result<PythonRunSession, String> {
  let spec = detect_python_command_spec().ok_or_else(|| "未检测到可用的 Python 解释器。".to_string())?;
  let session_id = Uuid::new_v4().to_string();

  let mut command = Command::new(&spec.command);
  apply_hidden_process_flags(&mut command);
  configure_python_command(&mut command);
  for argument in &spec.prefix_args {
    command.arg(argument);
  }
  command
    .arg("-X")
    .arg("utf8")
    .arg("-u")
    .arg("-c")
    .arg(code)
    .stdin(Stdio::piped())
    .stdout(Stdio::piped())
    .stderr(Stdio::piped());

  let mut child = command
    .spawn()
    .map_err(|error| format!("启动 Python 失败: {}", error))?;

  let stdin = child
    .stdin
    .take()
    .ok_or_else(|| "无法打开 Python stdin".to_string())?;
  let stdout = child
    .stdout
    .take()
    .ok_or_else(|| "无法打开 Python stdout".to_string())?;
  let stderr = child
    .stderr
    .take()
    .ok_or_else(|| "无法打开 Python stderr".to_string())?;

  let child = Arc::new(Mutex::new(child));
  let stdin = Arc::new(Mutex::new(stdin));
  let stopped = Arc::new(AtomicBool::new(false));

  registry
    .sessions
    .lock()
    .expect("session registry lock poisoned")
    .insert(
      session_id.clone(),
      PythonSession {
        child: child.clone(),
        stdin,
        stopped: stopped.clone(),
      },
    );

  emit_state(
    &app,
    PythonStateEvent {
      session_id: session_id.clone(),
      status: "running".into(),
      exit_code: None,
      message: Some(format!("已启动 {}", spec.command)),
    },
  );

  spawn_output_reader(stdout, "stdout", app.clone(), session_id.clone());
  spawn_output_reader(stderr, "stderr", app.clone(), session_id.clone());
  spawn_process_monitor(
    app,
    Arc::new(SessionRegistry {
      sessions: registry.sessions.clone(),
    }),
    session_id.clone(),
    child,
    stopped,
  );

  Ok(PythonRunSession {
    session_id,
    command: format!("{} -u -c <code>", spec.command),
  })
}

#[tauri::command]
fn send_python_input(
  registry: State<'_, SessionRegistry>,
  session_id: String,
  input: String,
) -> Result<(), String> {
  let sessions = registry.sessions.lock().expect("session registry lock poisoned");
  let session = sessions
    .get(&session_id)
    .ok_or_else(|| "未找到运行中的 Python 会话。".to_string())?;

  let mut stdin = session.stdin.lock().expect("stdin lock poisoned");
  stdin
    .write_all(format!("{}\n", input).as_bytes())
    .map_err(|error| format!("写入 Python stdin 失败: {}", error))?;
  stdin.flush().map_err(|error| format!("刷新 Python stdin 失败: {}", error))?;
  Ok(())
}

#[tauri::command]
fn stop_python_run(
  registry: State<'_, SessionRegistry>,
  session_id: String,
) -> Result<(), String> {
  let sessions = registry.sessions.lock().expect("session registry lock poisoned");
  let session = sessions
    .get(&session_id)
    .ok_or_else(|| "未找到运行中的 Python 会话。".to_string())?;

  session.stopped.store(true, Ordering::SeqCst);
  let mut child = session.child.lock().expect("child lock poisoned");
  child
    .kill()
    .map_err(|error| format!("停止 Python 进程失败: {}", error))?;
  Ok(())
}

#[cfg(test)]
mod tests {
  use super::{
    LessonSourceFile, PythonAvailability, PythonCommandSpec, PythonOutputEvent, PythonRunSession,
    PythonStateEvent, PYTHON_COMMAND_CANDIDATES,
  };

  #[test]
  fn defines_python_candidates_in_expected_order() {
    let commands: Vec<&str> = PYTHON_COMMAND_CANDIDATES.iter().map(|item| item.command.as_str()).collect();
    assert_eq!(commands, vec!["python", "py"]);
  }

  #[test]
  fn py_candidate_uses_python3_prefix() {
    let py = PYTHON_COMMAND_CANDIDATES
      .iter()
      .find(|item| item.command == "py")
      .cloned()
      .unwrap_or(PythonCommandSpec {
        command: String::new(),
        prefix_args: Vec::new(),
      });

    assert_eq!(py.prefix_args, vec!["-3".to_string()]);
  }

  #[test]
  fn serializes_lesson_source_files_for_frontend_contract() {
    let payload = LessonSourceFile {
      file_path: "content/lessons/demo.py".into(),
      source: "print(1)".into(),
    };
    let value = serde_json::to_value(payload).expect("payload should serialize");

    assert_eq!(value["filePath"], "content/lessons/demo.py");
    assert!(value.get("file_path").is_none());
  }

  #[test]
  fn serializes_python_runtime_payloads_for_frontend_contract() {
    let availability = PythonAvailability {
      available: true,
      command: Some("python".into()),
      version: Some("Python 3.12.0".into()),
      executable_path: Some("C:/Python312/python.exe".into()),
      error: None,
    };
    let session = PythonRunSession {
      session_id: "session-1".into(),
      command: "python -u -c <code>".into(),
    };
    let output = PythonOutputEvent {
      session_id: "session-1".into(),
      stream: "stdout".into(),
      chunk: "hello\n".into(),
    };
    let state = PythonStateEvent {
      session_id: "session-1".into(),
      status: "completed".into(),
      exit_code: Some(0),
      message: None,
    };

    let availability_value = serde_json::to_value(availability).expect("availability should serialize");
    let session_value = serde_json::to_value(session).expect("session should serialize");
    let output_value = serde_json::to_value(output).expect("output should serialize");
    let state_value = serde_json::to_value(state).expect("state should serialize");

    assert_eq!(availability_value["version"], "Python 3.12.0");
    assert_eq!(availability_value["executablePath"], "C:/Python312/python.exe");
    assert_eq!(session_value["sessionId"], "session-1");
    assert_eq!(output_value["sessionId"], "session-1");
    assert_eq!(state_value["sessionId"], "session-1");
    assert_eq!(state_value["exitCode"], 0);
    assert!(session_value.get("session_id").is_none());
    assert!(state_value.get("exit_code").is_none());
  }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .manage(SessionRegistry::default())
    .invoke_handler(tauri::generate_handler![
      load_lesson_sources,
      detect_python,
      start_python_run,
      send_python_input,
      stop_python_run
    ])
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
