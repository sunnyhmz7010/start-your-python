# Start Your Python Course Tree Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the course system so the PyCharm-style `Project` tree uses Chinese chapter folders with multiple `.py` lesson files, while preserving the dual-state editor/run lesson workflow.

**Architecture:** Replace the current coarse “one lesson per chapter” organization with a denser folder-and-file curriculum model. Keep a single lesson object per file, but expand chapter and lesson metadata so the UI can render a believable project tree and still map each file cleanly to editor-state pseudo code and run-state teaching content.

**Tech Stack:** Vue 3, TypeScript, Pinia, Vite, Vitest, Neutralinojs

---

## File Structure

### Existing files to modify

- `src/types/lesson.ts`
- `src/data/lessons/index.ts`
- `src/data/lessonsData.ts`
- `src/stores/lesson.ts`
- `src/stores/progress.ts`
- `src/components/workspace/LessonTree.vue`
- `src/views/HomeView.vue`
- `tests/views/homeWorkspace.spec.ts`
- `tests/stores/lessonWorkspace.spec.ts`
- `README.md`

### Files to create

- `src/data/courseTree.ts`
- `src/data/lessonFactories.ts`
- `tests/services/courseTree.spec.ts`

## Task 1: Lock the new folder-and-file tree behavior with failing tests

**Files:**
- Modify: `tests/views/homeWorkspace.spec.ts`
- Create: `tests/services/courseTree.spec.ts`

- [ ] **Step 1: Add a failing view test for Chinese chapter folders**

```ts
expect(wrapper.text()).toContain('第一章 Python环境准备')
expect(wrapper.text()).toContain('Python是什么.py')
```

- [ ] **Step 2: Add a failing view test for multi-file chapter structure**

```ts
expect(wrapper.text()).toContain('安装Python.py')
expect(wrapper.text()).toContain('配置开发环境.py')
```

- [ ] **Step 3: Add a failing data test that the first chapter has multiple lessons**

```ts
const chapters = await localContentProvider.getChapters()
expect(chapters[0]?.lessons.length).toBeGreaterThan(2)
```

- [ ] **Step 4: Run the targeted tests and verify they fail**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts tests/services/courseTree.spec.ts`
Expected: FAIL because the existing course tree still exposes one coarse lesson per chapter

## Task 2: Extend lesson and chapter metadata for realistic project-tree rendering

**Files:**
- Modify: `src/types/lesson.ts`
- Create: `src/data/courseTree.ts`
- Create: `src/data/lessonFactories.ts`

- [ ] **Step 1: Extend chapter metadata with a folder name**

```ts
export interface Chapter {
  id: string
  title: string
  folderName: string
  description: string
  order: number
  lessons: Lesson[]
}
```

- [ ] **Step 2: Extend lesson metadata with a file name**

```ts
export interface Lesson {
  id: string
  title: string
  fileName: string
  ...
}
```

- [ ] **Step 3: Add small helper factories for creating chapter and lesson records**

```ts
export function createLesson(input: Lesson): Lesson {
  return input
}
```

- [ ] **Step 4: Run typecheck**

Run: `npm run typecheck`
Expected: FAIL until all lesson data is updated

## Task 3: Rebuild the course data into Chinese chapter folders with multiple lesson files

**Files:**
- Modify: `src/data/lessons/index.ts`
- Modify: `src/data/lessonsData.ts`
- Create: `src/data/courseTree.ts`
- Test: `tests/services/courseTree.spec.ts`

- [ ] **Step 1: Replace the current chapter list with the new eight-chapter curriculum**

```ts
{
  id: 'chapter_1',
  title: '第一章 Python环境准备',
  folderName: '第一章 Python环境准备',
  lessons: [...]
}
```

- [ ] **Step 2: Split the old installation/introduction material into multiple files**

```ts
[
  'Python是什么.py',
  '安装Python.py',
  '配置开发环境.py',
  '第一次运行Python.py'
]
```

- [ ] **Step 3: Split and supplement the remaining beginner curriculum into smaller lesson files**

```ts
[
  '注释与缩进.py',
  '输入与输出.py',
  '常见语法错误.py',
  '模块导入.py'
]
```

- [ ] **Step 4: Preserve each lesson’s dual-state mapping**

```ts
{
  fileName: '输入与输出.py',
  pseudoCode: '...',
  steps: [...]
}
```

- [ ] **Step 5: Run the data tests**

Run: `npm run test -- tests/services/courseTree.spec.ts`
Expected: PASS

## Task 4: Update persistence assumptions so the new lesson ids do not break resume behavior

**Files:**
- Modify: `src/stores/progress.ts`
- Modify: `src/stores/lesson.ts`
- Modify: `tests/stores/lessonWorkspace.spec.ts`

- [ ] **Step 1: Make lesson selection resilient when old saved ids no longer exist**

```ts
const recentLesson = recentLessonId ? lessonStore.getLessonById(recentLessonId) : null
const selected = recentLesson ?? lessonStore.allLessons[0] ?? null
```

- [ ] **Step 2: Clamp saved step values to the new lesson step count**

```ts
lessonStore.setCurrentStep(savedStep)
```

- [ ] **Step 3: Run store tests**

Run: `npm run test -- tests/stores/lessonWorkspace.spec.ts tests/stores/progress.spec.ts`
Expected: PASS

## Task 5: Rebuild the left project tree as folders and `.py` files

**Files:**
- Modify: `src/components/workspace/LessonTree.vue`
- Modify: `src/views/HomeView.vue`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Render the project root**

```vue
<div class="tree-root">start-your-python</div>
```

- [ ] **Step 2: Render each chapter as a folder row**

```vue
<div class="chapter-title">{{ chapter.folderName }}</div>
```

- [ ] **Step 3: Render each lesson as a quiet `.py` file row**

```vue
<span class="lesson-name">{{ lesson.fileName }}</span>
```

- [ ] **Step 4: Remove web-style duration badges from the file tree**

```vue
<span v-if="completedLessonIds.includes(lesson.id)" class="badge completed">done</span>
```

- [ ] **Step 5: Run the view tests**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: PASS

## Task 6: Preserve editor/run dual-state behavior for the new lesson files

**Files:**
- Modify: `src/views/HomeView.vue`
- Modify: `src/stores/lesson.ts`
- Modify: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Ensure selecting a new file still returns to editor mode**

```ts
lessonStore.selectLesson(lesson)
expect(lessonStore.workspaceMode).toBe('editor')
```

- [ ] **Step 2: Ensure clicking Run uses the selected file’s content**

```ts
lessonStore.enterRunMode()
expect(lessonStore.consoleOutput).toContain(currentLesson.value?.title ?? '')
```

- [ ] **Step 3: Ensure run-mode content reflects the new smaller lesson unit**

```ts
expect(wrapper.text()).toContain('输入与输出')
```

- [ ] **Step 4: Run the view and store tests**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts tests/stores/lessonWorkspace.spec.ts`
Expected: PASS

## Task 7: Refresh README to reflect the new file-based course structure

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update the product summary**

```md
Lessons are organized as Chinese chapter folders and `.py` files inside the Project tree.
```

- [ ] **Step 2: Update the current capabilities list**

```md
- Chinese chapter folders in the Project tree
- multi-file lesson curriculum
- dual-state editor/run learning flow
```

- [ ] **Step 3: Run full verification**

Run: `npm run test`
Expected: PASS

Run: `npm run typecheck`
Expected: PASS

Run: `npm run build`
Expected: PASS

Run: `npm run neu:build`
Expected: PASS

## Notes for execution

- Keep the chapter folder names in Chinese.
- Keep the file names as lesson titles with `.py`.
- Prefer splitting and reusing existing content before writing new material.
- Add only obvious beginner gaps; do not try to author an entire textbook in one pass.
