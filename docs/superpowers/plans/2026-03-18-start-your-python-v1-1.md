# Start Your Python v1.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stabilize `Start Your Python` into a credible `v1.1.0` release with a maintainable architecture, a real beginner learning loop, and a clean path toward future remote lesson sources.

**Architecture:** Keep the app local-first and Vue/Pinia-based, but split lesson content, learning state, and UI composition into separate layers. Replace the overloaded home view with focused components, preserve the IDE-style shell, and add a minimal quality gate so future releases can be repeated safely.

**Tech Stack:** Vue 3, TypeScript, Pinia, Vue Router, Vite, Neutralinojs, Vitest

---

## File Structure

### Existing files to modify

- `package.json`
- `.gitignore`
- `README.md`
- `src/types/lesson.ts`
- `src/stores/lesson.ts`
- `src/stores/progress.ts`
- `src/views/HomeView.vue`
- `src/styles/main.css`
- `src/data/lessons/index.ts`
- `src/data/lessonsData.ts`

### Files to create

- `src/services/content/contentProvider.ts`
- `src/services/content/localContentProvider.ts`
- `src/utils/progressStorage.ts`
- `src/components/workspace/LessonTree.vue`
- `src/components/workspace/LessonMainPanel.vue`
- `src/components/workspace/LessonStepsPanel.vue`
- `src/components/workspace/LessonBottomPanel.vue`
- `src/components/workspace/RecentLessonCard.vue`
- `src/components/workspace/types.ts`
- `tests/stores/progress.spec.ts`
- `tests/services/localContentProvider.spec.ts`
- `tests/views/homeWorkspace.spec.ts`
- `vitest.config.ts`
- `docs/ROADMAP.md`

### Files to delete from git tracking

- `StartYourPython.exe`
- `release/StartYourPython.exe`
- `neutralinojs.log`
- `current_styles.css`
- `new_styles.css`
- `new_styles_fixed.css`
- `fix_css.py`
- `fix_bottom_bar.py`
- `patch_css.py`
- `patch_css2.py`
- `replace_styles.py`
- `.tmp/`
- `.trae/`

## Task 1: Clean repository noise and establish release scripts

**Files:**
- Modify: `.gitignore`
- Modify: `package.json`
- Modify: `README.md`

- [ ] **Step 1: Write the failing repository hygiene checklist into the README draft**

```md
## Development

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run typecheck`
- `npm run test`
```

- [ ] **Step 2: Run build to confirm the current baseline before editing scripts**

Run: `npm run build`
Expected: existing app builds successfully or fails with a concrete type/build issue to fix during this task

- [ ] **Step 3: Add minimal quality scripts to `package.json`**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "typecheck": "vue-tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 4: Expand `.gitignore` for Node/Vite/Neutralino outputs and local junk**

```gitignore
node_modules/
dist/
.tmp/
.trae/
release/
*.log
*.exe
coverage/
```

- [ ] **Step 5: Remove tracked generated artifacts and one-off patch files from git**

Run: `git rm --cached StartYourPython.exe release/StartYourPython.exe neutralinojs.log current_styles.css new_styles.css new_styles_fixed.css fix_css.py fix_bottom_bar.py patch_css.py patch_css2.py replace_styles.py`
Expected: files staged for removal from version control while remaining locally if needed

- [ ] **Step 6: Run build again after script and ignore changes**

Run: `npm run build`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add .gitignore package.json README.md
git commit -m "chore: clean repository and add release scripts"
```

## Task 2: Add test tooling and lock the progress/content seams with tests

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `tests/stores/progress.spec.ts`
- Create: `tests/services/localContentProvider.spec.ts`

- [ ] **Step 1: Write the failing progress store test**

```ts
import { setActivePinia, createPinia } from 'pinia'
import { describe, expect, it, beforeEach } from 'vitest'
import { useProgressStore } from '@/stores/progress'

describe('progress store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('persists current step and recent lesson', () => {
    const store = useProgressStore()
    store.updateCurrentStep('lesson-1', 2)
    store.setRecentLesson('lesson-1')

    expect(store.progress.lessons['lesson-1'].currentStep).toBe(2)
    expect(store.progress.recentLessonId).toBe('lesson-1')
  })
})
```

- [ ] **Step 2: Write the failing local content provider test**

```ts
import { describe, expect, it } from 'vitest'
import { localContentProvider } from '@/services/content/localContentProvider'

describe('local content provider', () => {
  it('returns populated chapters and lessons', async () => {
    const chapters = await localContentProvider.getChapters()
    expect(chapters.length).toBeGreaterThan(0)
    expect(chapters[0].lessons.length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 3: Add Vitest config and dependency**

```ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

- [ ] **Step 4: Run the tests to verify they fail for the expected missing APIs**

Run: `npm run test`
Expected: FAIL with messages such as `setRecentLesson is not a function` or missing content provider module

- [ ] **Step 5: Commit the failing tests and config**

```bash
git add package.json vitest.config.ts tests
git commit -m "test: add failing coverage for progress and content provider"
```

## Task 3: Introduce the content provider layer and normalize lesson types

**Files:**
- Modify: `src/types/lesson.ts`
- Modify: `src/data/lessons/index.ts`
- Modify: `src/data/lessonsData.ts`
- Modify: `src/stores/lesson.ts`
- Create: `src/services/content/contentProvider.ts`
- Create: `src/services/content/localContentProvider.ts`
- Test: `tests/services/localContentProvider.spec.ts`

- [ ] **Step 1: Extend lesson types for lesson summaries and future provider metadata**

```ts
export interface LessonSummary {
  id: string
  title: string
  description: string
  chapter: number
  estimatedTime: number
}

export interface ContentProvider {
  getChapters(): Promise<Chapter[]>
  getLessonById(id: string): Promise<Lesson | null>
}
```

- [ ] **Step 2: Create the provider contract**

```ts
import type { Chapter, Lesson } from '@/types/lesson'

export interface ContentProvider {
  getChapters(): Promise<Chapter[]>
  getLessonById(id: string): Promise<Lesson | null>
}
```

- [ ] **Step 3: Create the local provider backed by existing lesson data**

```ts
import { chapters } from '@/data/lessons'
import type { ContentProvider } from './contentProvider'

export const localContentProvider: ContentProvider = {
  async getChapters() {
    return chapters
  },
  async getLessonById(id) {
    for (const chapter of chapters) {
      const lesson = chapter.lessons.find(item => item.id === id)
      if (lesson) return lesson
    }
    return null
  }
}
```

- [ ] **Step 4: Update the lesson store to load chapters asynchronously through the provider**

```ts
import { localContentProvider } from '@/services/content/localContentProvider'

async loadLessons() {
  this.chapters = await localContentProvider.getChapters()
}
```

- [ ] **Step 5: Run the targeted content provider test**

Run: `npm run test -- tests/services/localContentProvider.spec.ts`
Expected: PASS

- [ ] **Step 6: Run typecheck**

Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/types/lesson.ts src/data/lessons/index.ts src/data/lessonsData.ts src/stores/lesson.ts src/services/content
git commit -m "feat: add local content provider abstraction"
```

## Task 4: Upgrade progress persistence for recent learning and safer storage

**Files:**
- Modify: `src/stores/progress.ts`
- Create: `src/utils/progressStorage.ts`
- Test: `tests/stores/progress.spec.ts`

- [ ] **Step 1: Write a tiny storage wrapper to isolate localStorage parsing**

```ts
const STORAGE_KEY = 'start-your-python.progress'

export function loadProgressSnapshot<T>(fallback: T): T {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}
```

- [ ] **Step 2: Extend the persisted shape with recent lesson support**

```ts
export interface UserProgress {
  lessons: Record<string, LessonProgress>
  totalCompleted: number
  totalTimeSpent: number
  recentLessonId: string | null
}
```

- [ ] **Step 3: Add store actions for recent lesson and safe hydration**

```ts
setRecentLesson(lessonId: string) {
  this.progress.recentLessonId = lessonId
  this.saveProgress()
}
```

- [ ] **Step 4: Run the progress store test**

Run: `npm run test -- tests/stores/progress.spec.ts`
Expected: PASS

- [ ] **Step 5: Run the full test suite**

Run: `npm run test`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/stores/progress.ts src/utils/progressStorage.ts tests/stores/progress.spec.ts
git commit -m "feat: persist recent lesson and harden progress storage"
```

## Task 5: Decompose the home workspace into focused components

**Files:**
- Modify: `src/views/HomeView.vue`
- Create: `src/components/workspace/LessonTree.vue`
- Create: `src/components/workspace/LessonMainPanel.vue`
- Create: `src/components/workspace/LessonStepsPanel.vue`
- Create: `src/components/workspace/LessonBottomPanel.vue`
- Create: `src/components/workspace/RecentLessonCard.vue`
- Create: `src/components/workspace/types.ts`
- Test: `tests/views/homeWorkspace.spec.ts`

- [ ] **Step 1: Write the failing workspace composition test**

```ts
import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import HomeView from '@/views/HomeView.vue'

it('shows recent lesson entry and lesson workspace regions', () => {
  render(HomeView, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })]
    }
  })

  expect(screen.getByText(/继续学习/i)).toBeInTheDocument()
  expect(screen.getByText(/学习步骤/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Extract the lesson tree component**

```vue
<LessonTree
  :chapters="chapters"
  :current-lesson-id="currentLesson?.id ?? null"
  :completed-lesson-ids="completedLessonIds"
  @select-lesson="selectLesson"
/>
```

- [ ] **Step 3: Extract the main panel and recent lesson card**

```vue
<RecentLessonCard
  v-if="recentLesson"
  :lesson="recentLesson"
  @resume="selectLesson(recentLesson)"
/>
<LessonMainPanel
  :lesson="currentLesson"
  :chapter="currentChapter"
  :step="currentStep"
/>
```

- [ ] **Step 4: Extract the steps panel and bottom panel**

```vue
<LessonStepsPanel
  :lesson="currentLesson"
  :current-step-index="currentStepIndex"
  @goto-step="gotoStep"
/>
<LessonBottomPanel
  :lesson="currentLesson"
  :step="currentStep"
  :console-output="consoleOutput"
/>
```

- [ ] **Step 5: Wire selection to progress updates and recent lesson**

```ts
function handleLessonSelection(lesson: Lesson) {
  lessonStore.selectLesson(lesson)
  progressStore.setRecentLesson(lesson.id)
}
```

- [ ] **Step 6: Run the targeted workspace test**

Run: `npm run test -- tests/views/homeWorkspace.spec.ts`
Expected: PASS

- [ ] **Step 7: Run build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/views/HomeView.vue src/components/workspace tests/views/homeWorkspace.spec.ts
git commit -m "refactor: split home workspace into focused components"
```

## Task 6: Refresh README and roadmap to match the actual product

**Files:**
- Modify: `README.md`
- Create: `docs/ROADMAP.md`

- [ ] **Step 1: Replace exaggerated README claims with an honest product summary**

```md
# Start Your Python

Start Your Python is a local-first IDE-style learning app for Python beginners.

## Current status

- guided lessons
- local progress saving
- desktop-friendly workspace UI
- future-ready content provider layer
```

- [ ] **Step 2: Add a short roadmap document**

```md
# Roadmap

## v1.1.0
- clean repository
- split home workspace
- improve progress tracking

## Next
- remote lesson source
- richer practice blocks
- release automation
```

- [ ] **Step 3: Run the full release baseline**

Run: `npm run typecheck`
Expected: PASS

Run: `npm run test`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add README.md docs/ROADMAP.md
git commit -m "docs: refresh project positioning and roadmap"
```

## Task 7: Final release verification and version cut preparation

**Files:**
- Modify: `package.json`
- Modify: `README.md`

- [ ] **Step 1: Bump the package version to the planned release**

```json
{
  "version": "1.1.0"
}
```

- [ ] **Step 2: Add a concise release checklist to the README**

```md
## Release checklist

1. Run typecheck
2. Run tests
3. Run build
4. Build Neutralino release
```

- [ ] **Step 3: Run the full release checklist**

Run: `npm run typecheck`
Expected: PASS

Run: `npm run test`
Expected: PASS

Run: `npm run build`
Expected: PASS

Run: `npm run neu:build`
Expected: PASS or a concrete packaging issue to fix before tagging

- [ ] **Step 4: Commit**

```bash
git add package.json README.md
git commit -m "release: prepare v1.1.0"
```

## Notes for execution

- Keep changes incremental. Do not attempt a single giant UI rewrite.
- Do not reintroduce fake functionality that implies real Python execution.
- Prefer local composables/utilities over adding heavy dependencies unless a test gap demands it.
- If Neutralino packaging blocks progress, keep the web build green first, then isolate packaging fixes.
- Git commits currently require repository identity configuration before they can succeed.
