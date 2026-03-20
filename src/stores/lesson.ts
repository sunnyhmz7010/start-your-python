import { defineStore } from 'pinia'
import type { Lesson, Chapter, LessonStep } from '@/types/lesson'
import { localContentProvider } from '@/services/content/localContentProvider'
import type { WorkspaceBottomTab, WorkspaceMode } from '@/components/workspace/types'

export const useLessonStore = defineStore('lesson', {
  state: () => ({
    chapters: [] as Chapter[],
    currentLesson: null as Lesson | null,
    workingCopies: {} as Record<string, string>,
    currentEditorCode: '',
    currentStepIndex: 0,
    isLessonRunning: false,
    consoleOutput: '',
    workspaceMode: 'editor' as WorkspaceMode,
    activeBottomTab: 'terminal' as WorkspaceBottomTab
  }),

  getters: {
    currentStep: (state): LessonStep | null => {
      if (!state.currentLesson) return null
      return state.currentLesson.steps[state.currentStepIndex] || null
    },
    allLessons: (state): Lesson[] => {
      return state.chapters.flatMap(chapter => chapter.lessons)
    }
  },

  actions: {
    async loadLessons() {
      this.chapters = await localContentProvider.getChapters()
    },

    selectLesson(lesson: Lesson) {
      this.currentLesson = lesson
      this.currentEditorCode = this.workingCopies[lesson.id] ?? lesson.pseudoCode
      this.currentStepIndex = 0
      this.isLessonRunning = false
      this.consoleOutput = ''
      this.workspaceMode = 'editor'
      this.activeBottomTab = 'terminal'
    },

    enterRunMode() {
      if (!this.currentLesson) return

      this.workspaceMode = 'run'
      this.activeBottomTab = 'run'
      this.isLessonRunning = true
      this.consoleOutput = `[Run] 课程开始: ${this.currentLesson.title}\n`
      this.consoleOutput += `[Run] 当前步骤 ${this.currentStepIndex + 1}: ${this.currentStep?.title ?? '准备开始'}\n`
    },

    runLesson() {
      this.enterRunMode()
    },

    nextStep() {
      if (!this.currentLesson) return

      if (this.currentStepIndex < this.currentLesson.steps.length - 1) {
        this.currentStepIndex++
        this.consoleOutput += `[Run] 步骤 ${this.currentStepIndex + 1}: ${this.currentStep?.title}\n`
      } else {
        this.completeLesson()
      }
    },

    prevStep() {
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--
      }
    },

    setCurrentStep(index: number) {
      if (!this.currentLesson) return
      this.currentStepIndex = Math.max(0, Math.min(index, this.currentLesson.steps.length - 1))
    },

    setActiveBottomTab(tab: WorkspaceBottomTab) {
      this.activeBottomTab = tab
    },

    setWorkspaceMode(mode: WorkspaceMode) {
      this.workspaceMode = mode
    },

    updateEditorCode(code: string) {
      if (!this.currentLesson) return
      this.currentEditorCode = code
      this.workingCopies[this.currentLesson.id] = code
    },

    resetEditorCode() {
      if (!this.currentLesson) return
      delete this.workingCopies[this.currentLesson.id]
      this.currentEditorCode = this.currentLesson.pseudoCode
    },

    completeLesson() {
      if (!this.currentLesson) return

      this.consoleOutput += `[Run] 课程完成: ${this.currentLesson.title}\n`
      this.isLessonRunning = false
    },

    appendConsoleOutput(output: string) {
      this.consoleOutput += output
    },

    clearConsole() {
      this.consoleOutput = ''
    },

    getLessonById(id: string): Lesson | undefined {
      return this.allLessons.find(lesson => lesson.id === id)
    },

    getLessonsByChapter(chapterId: string): Lesson[] {
      const chapter = this.chapters.find(ch => ch.id === chapterId)
      return chapter?.lessons || []
    }
  }
})
