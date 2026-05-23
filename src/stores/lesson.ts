import { defineStore } from 'pinia'
import type { Lesson, Chapter, LessonStep } from '@/types/lesson'
import { localContentProvider } from '@/services/content/localContentProvider'
import type { ContentLoadStatus } from '@/services/content/contentProvider'
import type { WorkspaceBottomTab, WorkspaceMode } from '@/components/workspace/types'

const defaultContentStatus = (): ContentLoadStatus => ({
  source: 'bundled',
  warning: null
})

export const useLessonStore = defineStore('lesson', {
  state: () => ({
    chapters: [] as Chapter[],
    contentStatus: defaultContentStatus(),
    currentLesson: null as Lesson | null,
    workingCopies: {} as Record<string, string>,
    currentEditorCode: '',
    currentStepIndex: 0,
    isLessonRunning: false,
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
      const result = await localContentProvider.getChaptersWithStatus()
      this.chapters = result.chapters
      this.contentStatus = result.status
    },

    selectLesson(lesson: Lesson) {
      this.currentLesson = lesson
      this.currentEditorCode = this.workingCopies[lesson.id] ?? lesson.pseudoCode
      this.currentStepIndex = 0
      this.isLessonRunning = false
      this.workspaceMode = 'editor'
      this.activeBottomTab = 'terminal'
    },

    enterRunMode() {
      if (!this.currentLesson) return

      this.workspaceMode = 'run'
      this.activeBottomTab = 'terminal'
      this.isLessonRunning = true
    },

    nextStep() {
      if (!this.currentLesson) return

      if (this.currentStepIndex < this.currentLesson.steps.length - 1) {
        this.currentStepIndex++
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

    completeLesson() {
      if (!this.currentLesson) return

      this.isLessonRunning = false
    },

    getLessonById(id: string): Lesson | undefined {
      return this.allLessons.find(lesson => lesson.id === id)
    }
  }
})
