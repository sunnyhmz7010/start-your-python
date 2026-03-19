use serde::Serialize;
use std::{
  fs,
  path::{Path, PathBuf},
};
use tauri::Manager;

#[derive(Serialize)]
struct LessonSourceFile {
  file_path: String,
  source: String,
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![load_lesson_sources])
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
