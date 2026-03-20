# Start Your Python v1.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让 `Start Your Python` 支持真实编辑当前课程代码、调用系统 Python 运行代码，并在底部终端显示真实输出、错误输出和 `input()` 交互。

**Architecture:** 前端把当前课程的“工作副本”从只读展示升级为真实可编辑状态，并把运行请求交给 `Tauri` 后端。后端负责检测系统 Python、启动/管理子进程、转发 stdout/stderr/stdin，前端只负责编辑器状态、终端会话 UI 和缺失 Python 时的课程引导。

**Tech Stack:** Vue 3, Pinia, TypeScript, Tauri 2, Rust, Vitest

---

## File Map

- Modify: `src/types/lesson.ts`
  - 为课程工作副本、终端会话、Python 检测状态补充类型
- Modify: `src/stores/lesson.ts`
  - 管理当前课程编辑内容、运行状态、终端输出和输入状态
- Create: `src/stores/runtime.ts`
  - 独立承载 Python 运行会话、解释器状态和终端交互
- Modify: `src/components/workspace/EditorCodeView.vue`
  - 从只读 `<pre>` 升级为真实可编辑编辑器
- Modify: `src/components/workspace/LessonMainPanel.vue`
  - 接入可编辑编辑器和右侧学习区的新状态
- Modify: `src/components/workspace/BottomToolWindows.vue`
  - 支持真实终端输出、输入框、运行中状态和无 Python 提示
- Modify: `src/components/workspace/types.ts`
  - 扩展工具窗口和工作区运行状态
- Modify: `src/views/HomeView.vue`
  - 串联编辑、运行、终端和安装课程引导
- Modify: `src/services/content/courseFiles.ts`
  - 支持课程源和编辑工作副本分离
- Create: `src/services/runtime/pythonRuntime.ts`
  - 前端对 Tauri Python 命令的封装
- Modify: `src-tauri/src/lib.rs`
  - 新增 Python 检测、运行会话、输入写入、停止运行命令
- Modify: `src-tauri/Cargo.toml`
  - 如需补充进程管理或序列化依赖，在这里更新
- Test: `tests/stores/lesson.spec.ts`
  - 验证工作副本和运行状态管理
- Test: `tests/stores/runtime.spec.ts`
  - 验证 Python 状态和终端会话行为
- Test: `tests/views/homeWorkspace.spec.ts`
  - 验证编辑、运行、无 Python 提示、安装课程引导
- Test: `src-tauri/src/lib.rs` 对应 Rust 单元测试或集成测试
  - 验证解释器检测和命令选择逻辑

### Task 1: Editor Working Copy Model

**Files:**
- Modify: `src/types/lesson.ts`
- Modify: `src/stores/lesson.ts`
- Test: `tests/stores/lesson.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('stores an editable working copy separate from lesson source', () => {
  const store = useLessonStore()
  store.selectLesson(makeLesson({ id: 'lesson-1', pseudoCode: 'print("hi")' }))
  store.updateEditorCode('print("changed")')

  expect(store.currentLesson?.pseudoCode).toBe('print("hi")')
  expect(store.currentEditorCode).toBe('print("changed")')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/stores/lesson.spec.ts`
Expected: FAIL with missing `currentEditorCode` / `updateEditorCode`

- [ ] **Step 3: Write minimal implementation**

```ts
state: () => ({
  currentEditorCode: '',
})

selectLesson(lesson) {
  this.currentLesson = lesson
  this.currentEditorCode = lesson.pseudoCode
}

updateEditorCode(code: string) {
  this.currentEditorCode = code
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/stores/lesson.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/types/lesson.ts src/stores/lesson.ts tests/stores/lesson.spec.ts
git commit -m "feat: add editable lesson working copies"
```

### Task 2: Replace Read-Only Code View With Editable Editor

**Files:**
- Modify: `src/components/workspace/EditorCodeView.vue`
- Modify: `src/components/workspace/LessonMainPanel.vue`
- Modify: `src/views/HomeView.vue`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('lets the user edit the current lesson code', async () => {
  const wrapper = mount(HomeView, { global: { plugins: [createPinia()] } })
  await waitForWorkspace()

  const editor = wrapper.get('[data-testid="editor-input"]')
  await editor.setValue('print("edited")')

  expect((editor.element as HTMLTextAreaElement).value).toContain('edited')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: FAIL because editable control does not exist

- [ ] **Step 3: Write minimal implementation**

```vue
<textarea
  data-testid="editor-input"
  :value="code"
  @input="$emit('updateCode', ($event.target as HTMLTextAreaElement).value)"
/>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/workspace/EditorCodeView.vue src/components/workspace/LessonMainPanel.vue src/views/HomeView.vue tests/views/homeWorkspace.spec.ts
git commit -m "feat: make lesson editor editable"
```

### Task 3: Add Python Runtime Service Contract

**Files:**
- Create: `src/services/runtime/pythonRuntime.ts`
- Modify: `src/components/workspace/types.ts`
- Modify: `src/stores/lesson.ts`
- Test: `tests/stores/runtime.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('exposes runtime states for idle running waiting-input and error', async () => {
  const runtime = createPythonRuntime(mockInvoker)
  const state = await runtime.detectPython()
  expect(state.available).toBe(true)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/stores/runtime.spec.ts`
Expected: FAIL because runtime service does not exist

- [ ] **Step 3: Write minimal implementation**

```ts
export type PythonAvailability = { available: boolean; command?: string; error?: string }
export function createPythonRuntime(invokeImpl = invoke) {
  return {
    detectPython: () => invokeImpl<PythonAvailability>('detect_python'),
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/stores/runtime.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/services/runtime/pythonRuntime.ts src/components/workspace/types.ts src/stores/lesson.ts tests/stores/runtime.spec.ts
git commit -m "feat: add python runtime service contract"
```

### Task 4: Detect System Python in Tauri

**Files:**
- Modify: `src-tauri/src/lib.rs`
- Modify: `src-tauri/Cargo.toml`
- Test: `src-tauri/src/lib.rs`

- [ ] **Step 1: Write the failing Rust test**

```rust
#[test]
fn prefers_python_then_py() {
    let commands = vec!["python".to_string(), "py".to_string()];
    let selected = select_python_command(&commands, |cmd| cmd == "py");
    assert_eq!(selected, Some("py".to_string()));
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cargo test --manifest-path src-tauri/Cargo.toml`
Expected: FAIL because selector / command does not exist

- [ ] **Step 3: Write minimal implementation**

```rust
fn detect_python_command() -> Result<PythonAvailability, String> {
    for cmd in ["python", "py"] {
        if Command::new(cmd).arg("--version").output().is_ok() {
            return Ok(PythonAvailability { available: true, command: Some(cmd.into()), error: None });
        }
    }
    Ok(PythonAvailability { available: false, command: None, error: Some("Python not found".into()) })
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cargo test --manifest-path src-tauri/Cargo.toml`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src-tauri/src/lib.rs src-tauri/Cargo.toml
git commit -m "feat: detect system python interpreter"
```

### Task 5: Run Current Editor Code and Stream Output

**Files:**
- Modify: `src-tauri/src/lib.rs`
- Create: `src/services/runtime/pythonRuntime.ts`
- Modify: `src/stores/runtime.ts`
- Test: `tests/stores/runtime.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('starts a run and appends stdout chunks to the terminal buffer', async () => {
  const store = useRuntimeStore()
  mockRuntime.startRun.mockResolvedValue({ sessionId: 's1' })
  mockRuntime.onOutput('s1', 'hello\\n')

  await store.runCode('print("hello")')

  expect(store.output).toContain('hello')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/stores/runtime.spec.ts`
Expected: FAIL because run session state does not exist

- [ ] **Step 3: Write minimal implementation**

```ts
state: () => ({
  sessionId: null,
  output: '',
  status: 'idle',
})

async runCode(code: string) {
  this.status = 'running'
  const session = await pythonRuntime.startRun(code)
  this.sessionId = session.sessionId
}

appendOutput(chunk: string) {
  this.output += chunk
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/stores/runtime.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src-tauri/src/lib.rs src/services/runtime/pythonRuntime.ts src/stores/runtime.ts tests/stores/runtime.spec.ts
git commit -m "feat: run current code and stream output"
```

### Task 6: Support stdin Input and Stop Running

**Files:**
- Modify: `src-tauri/src/lib.rs`
- Modify: `src/services/runtime/pythonRuntime.ts`
- Modify: `src/stores/runtime.ts`
- Modify: `src/components/workspace/BottomToolWindows.vue`
- Test: `tests/stores/runtime.spec.ts`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('sends terminal input to a waiting python session', async () => {
  const store = useRuntimeStore()
  store.status = 'waiting-input'
  store.sessionId = 's1'

  await store.submitInput('Sunny')

  expect(mockRuntime.sendInput).toHaveBeenCalledWith('s1', 'Sunny')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/stores/runtime.spec.ts tests/views/homeWorkspace.spec.ts`
Expected: FAIL because stdin flow does not exist

- [ ] **Step 3: Write minimal implementation**

```vue
<form @submit.prevent="$emit('submitInput', terminalInput)">
  <input v-model="terminalInput" data-testid="terminal-input" />
</form>
<button @click="$emit('stopRun')" data-testid="stop-run">Stop</button>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/stores/runtime.spec.ts tests/views/homeWorkspace.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src-tauri/src/lib.rs src/services/runtime/pythonRuntime.ts src/stores/runtime.ts src/components/workspace/BottomToolWindows.vue tests/stores/runtime.spec.ts tests/views/homeWorkspace.spec.ts
git commit -m "feat: support python stdin and stop actions"
```

### Task 7: Handle Missing Python and Route to Install Course

**Files:**
- Modify: `src/views/HomeView.vue`
- Modify: `src/stores/runtime.ts`
- Modify: `src/stores/lesson.ts`
- Modify: `src/components/workspace/BottomToolWindows.vue`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('shows install guidance when python is unavailable and jumps to install lesson', async () => {
  mockRuntime.detectPython.mockResolvedValue({ available: false, error: 'Python not found' })
  const wrapper = mount(HomeView, { global: { plugins: [createPinia()] } })
  await waitForWorkspace()
  await wrapper.get('[data-testid="run-button"]').trigger('click')

  expect(wrapper.text()).toContain('未检测到可用的 Python 解释器')
  await wrapper.get('[data-testid="go-to-install-python"]').trigger('click')
  expect(wrapper.text()).toContain('安装Python.py')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: FAIL because missing-Python UI does not exist

- [ ] **Step 3: Write minimal implementation**

```ts
if (!availability.available) {
  this.runtimeStatus = 'python-missing'
  this.runtimeError = '未检测到可用的 Python 解释器'
}
```

```vue
<button data-testid="go-to-install-python" @click="$emit('openInstallLesson')">
  去学习安装 Python
</button>
<button data-testid="recheck-python" @click="$emit('recheckPython')">
  重新检测 Python
</button>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/views/HomeView.vue src/stores/runtime.ts src/stores/lesson.ts src/components/workspace/BottomToolWindows.vue tests/views/homeWorkspace.spec.ts
git commit -m "feat: guide users to install python when missing"
```

### Task 8: Reconcile Lesson Guidance With Real Runtime

**Files:**
- Modify: `src/components/workspace/LessonMainPanel.vue`
- Modify: `src/components/workspace/BottomToolWindows.vue`
- Modify: `src/views/HomeView.vue`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('keeps lesson steps visible while real runtime output appears in the bottom terminal', async () => {
  const wrapper = mount(HomeView, { global: { plugins: [createPinia()] } })
  await waitForWorkspace()
  await wrapper.get('[data-testid="run-button"]').trigger('click')

  expect(wrapper.text()).toContain('学习步骤')
  expect(wrapper.get('[data-testid="tool-tab-terminal"]').classes()).toContain('active')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: FAIL because current run flow still assumes teaching-only run mode

- [ ] **Step 3: Write minimal implementation**

```ts
handleRunLesson() {
  lessonStore.setActiveBottomTab('terminal')
  runtimeStore.runCurrentEditorCode(...)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/workspace/LessonMainPanel.vue src/components/workspace/BottomToolWindows.vue src/views/HomeView.vue tests/views/homeWorkspace.spec.ts
git commit -m "feat: align lesson guidance with real runtime"
```

### Task 9: Full Verification and Docs Update

**Files:**
- Modify: `README.md`
- Modify: `PROJECT_CONTEXT.md`
- Modify: `NEXT_TASKS.md`
- Modify: `docs/ROADMAP.md`

- [ ] **Step 1: Update docs for v1.1 behavior**

Document:
- editable editor
- system Python requirement
- terminal input/output
- missing Python guidance

- [ ] **Step 2: Run full verification**

Run:

```bash
npm run test
npm run typecheck
npm run build
npm run tauri:build
```

Expected:
- all tests pass
- typecheck passes
- Vite build passes
- Tauri build passes

- [ ] **Step 3: Commit**

```bash
git add README.md PROJECT_CONTEXT.md NEXT_TASKS.md docs/ROADMAP.md
git commit -m "docs: update v1.1 runtime guidance"
```
