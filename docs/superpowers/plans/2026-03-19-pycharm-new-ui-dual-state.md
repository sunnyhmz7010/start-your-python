# Start Your Python PyCharm New UI Dual-State Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the home workspace so `Start Your Python` behaves like a PyCharm New UI Dark lesson project: lesson files open as `.py` pseudo code in editor mode, and clicking `Run` switches the workspace into a synchronized teaching run mode.

**Architecture:** Keep the existing lesson data model and persistence layer, but introduce an explicit workspace mode state (`editor` vs `run`) and rebuild the visual shell around PyCharm-like frame regions. The lesson tree, editor shell, run content panel, right-side navigator, and bottom tool windows should become coordinated but isolated components.

**Tech Stack:** Vue 3, TypeScript, Pinia, Vite, Vitest, Neutralinojs

---

## File Structure

### Existing files to modify

- `src/views/HomeView.vue`
- `src/stores/lesson.ts`
- `src/stores/progress.ts`
- `src/types/lesson.ts`
- `src/components/workspace/LessonTree.vue`
- `src/components/workspace/LessonMainPanel.vue`
- `src/components/workspace/LessonStepsPanel.vue`
- `src/components/workspace/LessonBottomPanel.vue`
- `src/components/workspace/RecentLessonCard.vue`
- `src/components/workspace/types.ts`
- `tests/views/homeWorkspace.spec.ts`
- `README.md`

### Files to create

- `src/components/workspace/IdeFrame.vue`
- `src/components/workspace/EditorTabs.vue`
- `src/components/workspace/ProjectToolWindow.vue`
- `src/components/workspace/EditorCodeView.vue`
- `src/components/workspace/RunLessonView.vue`
- `src/components/workspace/BottomToolWindows.vue`
- `src/components/workspace/StatusBar.vue`
- `tests/stores/lessonWorkspace.spec.ts`

## Task 1: Lock the dual-state workspace behavior with failing tests

**Files:**
- Modify: `tests/views/homeWorkspace.spec.ts`
- Create: `tests/stores/lessonWorkspace.spec.ts`

- [ ] **Step 1: Add a failing view test for editor-state defaults**

```ts
it('shows a pseudo python file view before run mode starts', async () => {
  const wrapper = mount(HomeView, { global: { plugins: [createPinia()] } })
  await flushPromises()

  expect(wrapper.text()).toContain('.py')
  expect(wrapper.text()).toContain('Project')
  expect(wrapper.text()).not.toContain('课程开始')
})
```

- [ ] **Step 2: Add a failing view test for run-state transition**

```ts
it('switches to run mode and activates the Run tool window', async () => {
  const wrapper = mount(HomeView, { global: { plugins: [createPinia()] } })
  await flushPromises()

  await wrapper.get('[data-testid="run-button"]').trigger('click')

  expect(wrapper.text()).toContain('Run')
  expect(wrapper.text()).toContain('课程开始')
  expect(wrapper.get('[data-testid="tool-tab-run"]').classes()).toContain('active')
})
```

- [ ] **Step 3: Add a failing store test for workspace mode separation**

```ts
it('keeps file selection separate from run mode', async () => {
  const store = useLessonStore()
  await store.loadLessons()
  store.selectLesson(store.allLessons[0])

  expect(store.workspaceMode).toBe('editor')

  store.enterRunMode()

  expect(store.workspaceMode).toBe('run')
})
```

- [ ] **Step 4: Run the new tests and verify they fail for the expected missing mode behavior**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts tests/stores/lessonWorkspace.spec.ts`
Expected: FAIL with missing `workspaceMode`, missing run-state UI hooks, or missing test ids

## Task 2: Add explicit workspace mode and run-state logging to the lesson store

**Files:**
- Modify: `src/stores/lesson.ts`
- Modify: `src/types/lesson.ts`
- Create: `tests/stores/lessonWorkspace.spec.ts`

- [ ] **Step 1: Extend the lesson store state with explicit workspace mode**

```ts
workspaceMode: 'editor' as 'editor' | 'run',
activeBottomTab: 'problems' as 'problems' | 'terminal' | 'run'
```

- [ ] **Step 2: Add actions to enter and leave run mode**

```ts
enterRunMode() {
  if (!this.currentLesson) return
  this.workspaceMode = 'run'
  this.activeBottomTab = 'run'
  this.consoleOutput = `课程开始: ${this.currentLesson.title}\n`
}
```

- [ ] **Step 3: Make lesson selection reset to editor mode**

```ts
selectLesson(lesson: Lesson) {
  this.currentLesson = lesson
  this.currentStepIndex = 0
  this.workspaceMode = 'editor'
  this.activeBottomTab = 'problems'
}
```

- [ ] **Step 4: Append teaching-oriented output for step changes and completion**

```ts
this.consoleOutput += `步骤 ${this.currentStepIndex + 1}: ${this.currentStep?.title}\n`
```

- [ ] **Step 5: Run the targeted store tests**

Run: `npm run test -- tests/stores/lessonWorkspace.spec.ts tests/stores/progress.spec.ts`
Expected: PASS

## Task 3: Rebuild the PyCharm New UI frame and project tree

**Files:**
- Create: `src/components/workspace/IdeFrame.vue`
- Create: `src/components/workspace/EditorTabs.vue`
- Create: `src/components/workspace/ProjectToolWindow.vue`
- Create: `src/components/workspace/StatusBar.vue`
- Modify: `src/components/workspace/LessonTree.vue`
- Modify: `src/views/HomeView.vue`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Replace the current top shell with a PyCharm-like frame component**

```vue
<IdeFrame
  :current-lesson="currentLesson"
  :active-bottom-tab="activeBottomTab"
  @run="handleRunLesson"
>
  <!-- project tree, editor, tool windows, status bar -->
</IdeFrame>
```

- [ ] **Step 2: Make the project tree look like a Project tool window with `.py` files**

```vue
<button class="file-node">
  <span class="file-name">{{ lesson.orderLabel }}.py</span>
</button>
```

- [ ] **Step 3: Add editor tabs and a believable PyCharm-style top toolbar**

```vue
<EditorTabs :lesson="currentLesson" />
```

- [ ] **Step 4: Add a lightweight IDE-style status bar**

```vue
<StatusBar :mode="workspaceMode" :lesson="currentLesson" />
```

- [ ] **Step 5: Run the view test**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: PASS

## Task 4: Split editor mode and run mode into separate center-panel renderers

**Files:**
- Create: `src/components/workspace/EditorCodeView.vue`
- Create: `src/components/workspace/RunLessonView.vue`
- Modify: `src/components/workspace/LessonMainPanel.vue`
- Modify: `src/views/HomeView.vue`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Create the editor-mode code renderer**

```vue
<EditorCodeView
  :lesson="currentLesson"
  data-testid="editor-code-view"
/>
```

- [ ] **Step 2: Create the run-mode lesson renderer**

```vue
<RunLessonView
  :lesson="currentLesson"
  :step="currentStep"
  data-testid="run-lesson-view"
/>
```

- [ ] **Step 3: Make the main panel switch on `workspaceMode`**

```vue
<EditorCodeView v-if="workspaceMode === 'editor'" :lesson="lesson" />
<RunLessonView v-else :lesson="lesson" :step="step" />
```

- [ ] **Step 4: Run the run-state transition test**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: PASS

## Task 5: Rebuild the bottom tool windows around Problems, Terminal, and Run

**Files:**
- Create: `src/components/workspace/BottomToolWindows.vue`
- Modify: `src/components/workspace/LessonBottomPanel.vue`
- Modify: `src/components/workspace/types.ts`
- Modify: `src/views/HomeView.vue`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Define strict bottom-tab types**

```ts
export type WorkspaceBottomTab = 'problems' | 'terminal' | 'run'
```

- [ ] **Step 2: Rebuild the bottom tabs to mirror PyCharm tool windows**

```vue
<button data-testid="tool-tab-run" :class="{ active: activeTab === 'run' }">Run</button>
```

- [ ] **Step 3: Make Run the only rich content window**

```vue
<pre v-if="activeTab === 'run'">{{ consoleOutput }}</pre>
```

- [ ] **Step 4: Keep Problems and Terminal minimal but believable**

```vue
<p v-if="activeTab === 'problems'">No problems found</p>
<p v-if="activeTab === 'terminal'">Terminal is unavailable in lesson mode.</p>
```

- [ ] **Step 5: Run the view test**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: PASS

## Task 6: Make the right-side step navigator run-mode-only and keep resume behavior sane

**Files:**
- Modify: `src/components/workspace/LessonStepsPanel.vue`
- Modify: `src/stores/progress.ts`
- Modify: `src/views/HomeView.vue`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Hide or mute the right-side panel in editor mode**

```vue
<LessonStepsPanel v-if="workspaceMode === 'run'" />
```

- [ ] **Step 2: Preserve step progress without auto-entering run mode on mount**

```ts
if (recentLesson.value) {
  lessonStore.selectLesson(recentLesson.value)
  lessonStore.setCurrentStep(savedStep)
}
```

- [ ] **Step 3: Ensure Run starts from the saved step when appropriate**

```ts
lessonStore.enterRunMode()
lessonStore.setCurrentStep(savedStep)
```

- [ ] **Step 4: Run the view tests**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: PASS

## Task 7: Refresh documentation to match the PyCharm dual-state product

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Rewrite the product summary around editor mode and run mode**

```md
Start Your Python opens lessons as `.py` files in a PyCharm-like workspace.
Clicking `Run` switches the workspace into guided lesson mode.
```

- [ ] **Step 2: Update the current capabilities list**

```md
- PyCharm New UI inspired workspace
- lesson files rendered as `.py`
- dual-state editor/run lesson flow
- local progress persistence
```

- [ ] **Step 3: Run the full verification baseline**

Run: `npm run typecheck`
Expected: PASS

Run: `npm run test`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Run desktop packaging**

Run: `npm run neu:build`
Expected: PASS

## Notes for execution

- Prioritize structural PyCharm likeness over decorative gradients or product-style cards.
- Keep educational copy inside run mode, not in editor mode.
- Avoid auto-running lessons when files are selected.
- If the visual shell and state model conflict, fix the state model first.
