# Start Your Python v1.1 Dual Run Model Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `Start Your Python` 的运行语义拆成两层：右上角主 `Run` 只进入课程内容态，课程内容中的代码块 `Run` 才会调用系统 Python 并把结果送到底部终端。

**Architecture:** 前端把“课程展示状态”和“代码执行状态”彻底分离。主工作区继续用 `editor/run` 双态切换课程内容，但真实执行逻辑只由课程代码块触发，运行时通过 `Tauri` 后端执行带教学上下文的代码块，并把 stdout/stderr/stdin 统一交给底部终端。

**Tech Stack:** Vue 3, Pinia, TypeScript, Tauri 2, Rust, Vitest

---

## File Map

- Modify: `src/types/lesson.ts`
  - 为课程步骤补充可执行代码块和上下文数据结构
- Modify: `src/services/content/courseFiles.ts`
  - 解析课程文件中的代码块显示内容和运行内容
- Modify: `src/stores/lesson.ts`
  - 让主 `Run` 只负责切课程内容态，不再执行 Python
- Modify: `src/stores/runtime.ts`
  - 改成“只服务代码块执行”的运行时 store
- Modify: `src/components/workspace/IdeFrame.vue`
  - 保持右上角 `Run` 仅作为课程入口按钮
- Modify: `src/components/workspace/LessonMainPanel.vue`
  - 根据主 `Run` 在编辑器和课程内容之间切换
- Modify: `src/components/workspace/RunLessonView.vue`
  - 给课程内容中的代码块加独立 `Run`
- Modify: `src/components/workspace/BottomToolWindows.vue`
  - 终端只显示代码块执行输出和输入
- Modify: `src/views/HomeView.vue`
  - 串联主 `Run`、代码块 `Run`、终端输入和安装课程跳转
- Modify: `src/services/runtime/pythonRuntime.ts`
  - 接收“代码块运行代码”而不是整份编辑器内容
- Modify: `src-tauri/src/lib.rs`
  - 保留 Python 会话能力，但按代码块输入模型执行
- Test: `tests/services/localContentProvider.spec.ts`
  - 验证课程文件解析出的代码块运行数据
- Test: `tests/stores/runtime.spec.ts`
  - 验证代码块运行、输入、停止
- Test: `tests/views/homeWorkspace.spec.ts`
  - 验证主 `Run` 与代码块 `Run` 的双层行为

### Task 1: Add Executable Code Block Metadata

**Files:**
- Modify: `src/types/lesson.ts`
- Modify: `src/services/content/courseFiles.ts`
- Test: `tests/services/localContentProvider.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('parses step display code and runnable code separately', async () => {
  const lesson = await localContentProvider.getLessonById('lesson_syntax_input_output')
  const step = lesson?.steps.find((item) => item.id === 'step_run_example')

  expect(step?.code).toContain('print')
  expect(step?.runnableCode).toContain('name =')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/services/localContentProvider.spec.ts`
Expected: FAIL because `runnableCode` does not exist

- [ ] **Step 3: Write minimal implementation**

```ts
export interface LessonStep {
  ...
  code?: string
  runnableCode?: string
}

return {
  ...
  code: visibleCode || undefined,
  runnableCode: visibleCode || undefined
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/services/localContentProvider.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/types/lesson.ts src/services/content/courseFiles.ts tests/services/localContentProvider.spec.ts
git commit -m "feat: add runnable code metadata for lesson steps"
```

### Task 2: Make Main Run Teaching-Only Again

**Files:**
- Modify: `src/stores/lesson.ts`
- Modify: `src/views/HomeView.vue`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('switches to lesson content without starting python when main run is clicked', async () => {
  const wrapper = mount(HomeView, { global: { plugins: [createPinia()] } })
  await waitForWorkspace()
  await wrapper.get('[data-testid="run-button"]').trigger('click')

  expect(wrapper.find('[data-testid="run-lesson-view"]').exists()).toBe(true)
  expect(runtimeMock.startRun).not.toHaveBeenCalled()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: FAIL because main `Run` still starts runtime

- [ ] **Step 3: Write minimal implementation**

```ts
handleRunLesson() {
  lessonStore.setWorkspaceMode('run')
  lessonStore.setActiveBottomTab('terminal')
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/stores/lesson.ts src/views/HomeView.vue tests/views/homeWorkspace.spec.ts
git commit -m "feat: make main run enter lesson content only"
```

### Task 3: Add Code Block Run Buttons in Course Content

**Files:**
- Modify: `src/components/workspace/RunLessonView.vue`
- Modify: `src/components/workspace/LessonMainPanel.vue`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('shows a run button for runnable lesson code blocks', async () => {
  const wrapper = mount(HomeView, { global: { plugins: [createPinia()] } })
  await waitForWorkspace()
  await wrapper.get('[data-testid="run-button"]').trigger('click')

  expect(wrapper.get('[data-testid="step-run-button"]').exists()).toBe(true)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: FAIL because step run button does not exist

- [ ] **Step 3: Write minimal implementation**

```vue
<button
  v-if="step?.runnableCode"
  data-testid="step-run-button"
  @click="$emit('runStepCode', step.id)"
>
  Run
</button>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/workspace/RunLessonView.vue src/components/workspace/LessonMainPanel.vue tests/views/homeWorkspace.spec.ts
git commit -m "feat: add runnable code buttons to lesson content"
```

### Task 4: Execute Step Code Instead of Editor Code

**Files:**
- Modify: `src/stores/runtime.ts`
- Modify: `src/views/HomeView.vue`
- Modify: `src/services/runtime/pythonRuntime.ts`
- Test: `tests/stores/runtime.spec.ts`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('runs the selected step runnable code in the terminal', async () => {
  await wrapper.get('[data-testid="step-run-button"]').trigger('click')
  expect(runtimeMock.startRun).toHaveBeenCalledWith(expect.stringContaining('print'))
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/stores/runtime.spec.ts tests/views/homeWorkspace.spec.ts`
Expected: FAIL because step run handler does not exist

- [ ] **Step 3: Write minimal implementation**

```ts
async function handleRunStepCode(stepId: string) {
  const step = currentLesson.value?.steps.find((item) => item.id === stepId)
  if (!step?.runnableCode) return
  await runtimeStore.runCode(step.runnableCode)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/stores/runtime.spec.ts tests/views/homeWorkspace.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/stores/runtime.ts src/views/HomeView.vue src/services/runtime/pythonRuntime.ts tests/stores/runtime.spec.ts tests/views/homeWorkspace.spec.ts
git commit -m "feat: execute lesson step code in terminal"
```

### Task 5: Add Teaching Context to Runnable Code

**Files:**
- Modify: `src/types/lesson.ts`
- Modify: `src/services/content/courseFiles.ts`
- Modify: `content/lessons/**/*.py`
- Test: `tests/services/localContentProvider.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('includes hidden teaching context when a step needs setup code', async () => {
  const lesson = await localContentProvider.getLessonById('lesson_syntax_input_output')
  const step = lesson?.steps.find((item) => item.id === 'step_run_example')

  expect(step?.runnableCode).toContain('name =')
  expect(step?.code).not.toContain('name =')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/services/localContentProvider.spec.ts`
Expected: FAIL because display code and runnable context are identical

- [ ] **Step 3: Write minimal implementation**

```ts
export interface LessonStep {
  ...
  runnableContext?: string
}

const runnableCode = [step.runnableContext, step.code].filter(Boolean).join('\n')
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/services/localContentProvider.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/types/lesson.ts src/services/content/courseFiles.ts content/lessons tests/services/localContentProvider.spec.ts
git commit -m "feat: support hidden teaching context for step runs"
```

### Task 6: Repair Terminal Input for Active Step Session

**Files:**
- Modify: `src/stores/runtime.ts`
- Modify: `src/components/workspace/BottomToolWindows.vue`
- Test: `tests/stores/runtime.spec.ts`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('submits terminal input to the active step run session', async () => {
  await store.runCode('name = input()')
  await store.submitInput('Sunny')
  expect(runtimeMock.sendInput).toHaveBeenCalledWith('session-1', 'Sunny')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/stores/runtime.spec.ts tests/views/homeWorkspace.spec.ts`
Expected: FAIL because active-session input flow is incomplete

- [ ] **Step 3: Write minimal implementation**

```ts
canSubmitInput: (state) => state.status === 'running' && !!state.sessionId
```

```vue
<form v-if="canSubmitInput" @submit.prevent="submitInput">
  <input data-testid="terminal-input" ... />
</form>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/stores/runtime.spec.ts tests/views/homeWorkspace.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/stores/runtime.ts src/components/workspace/BottomToolWindows.vue tests/stores/runtime.spec.ts tests/views/homeWorkspace.spec.ts
git commit -m "fix: wire terminal input to active step session"
```

### Task 7: Keep Python-Missing Guidance on Step Run Only

**Files:**
- Modify: `src/views/HomeView.vue`
- Modify: `src/stores/runtime.ts`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('shows python-missing guidance only when a step run is attempted', async () => {
  await wrapper.get('[data-testid="run-button"]').trigger('click')
  expect(wrapper.text()).not.toContain('未检测到可用的 Python 解释器')

  await wrapper.get('[data-testid="step-run-button"]').trigger('click')
  expect(wrapper.text()).toContain('未检测到可用的 Python 解释器')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: FAIL because main `Run` still triggers Python check side effects

- [ ] **Step 3: Write minimal implementation**

```ts
handleRunLesson() {
  lessonStore.setWorkspaceMode('run')
}

handleRunStepCode() {
  return runtimeStore.runCode(...)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/views/HomeView.vue src/stores/runtime.ts tests/views/homeWorkspace.spec.ts
git commit -m "fix: limit python checks to step execution"
```

### Task 8: Full Verification and Docs Update

**Files:**
- Modify: `README.md`
- Modify: `PROJECT_CONTEXT.md`
- Modify: `NEXT_TASKS.md`
- Modify: `docs/ROADMAP.md`

- [ ] **Step 1: Update docs for dual-run behavior**

Document:
- main `Run` enters lesson content
- step `Run` executes code in terminal
- terminal input belongs to active step run
- system Python requirement and install guidance

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
git commit -m "docs: update v1.1 dual-run guidance"
```
