import { defineStore } from 'pinia'
import type { LessonProgress, UserProgress } from '@/types/lesson'
import { loadProgressSnapshot, saveProgressSnapshot } from '@/utils/progressStorage'

function createDefaultProgress(): UserProgress {
  return {
    lessons: {},
    totalCompleted: 0,
    totalTimeSpent: 0,
    recentLessonId: null
  }
}

export const useProgressStore = defineStore('progress', {
  state: () => ({
    progress: createDefaultProgress()
  }),

  getters: {
    getProgress: (state) => (lessonId: string): LessonProgress | undefined => {
      return state.progress.lessons[lessonId]
    },

    isLessonCompleted: (state) => (lessonId: string): boolean => {
      return state.progress.lessons[lessonId]?.completed || false
    },

    getCompletionRate: (state) => (totalLessons: number): number => {
      if (totalLessons === 0) return 0
      return state.progress.totalCompleted / totalLessons
    },

    isStepCompleted: (state) => (lessonId: string, stepId: string): boolean => {
      return state.progress.lessons[lessonId]?.stepStates?.[stepId] || false
    }
  },

  actions: {
    loadProgress() {
      this.progress = loadProgressSnapshot(createDefaultProgress())
    },

    saveProgress() {
      saveProgressSnapshot(this.progress)
    },

    updateProgress(lessonId: string, progress: Partial<LessonProgress>) {
      const current = this.progress.lessons[lessonId] || {
        lessonId,
        completed: false,
        currentStep: 0,
        stepStates: {}
      }

      const newProgress = {
        ...current,
        stepStates: {
          ...current.stepStates,
          ...progress.stepStates
        },
        ...progress
      }

      const wasCompleted = current.completed
      this.progress.lessons[lessonId] = newProgress

      if (newProgress.completed && !wasCompleted) {
        this.progress.totalCompleted++
      } else if (!newProgress.completed && wasCompleted) {
        this.progress.totalCompleted--
      }

      this.saveProgress()
    },

    markLessonCompleted(lessonId: string, score?: number) {
      this.updateProgress(lessonId, {
        completed: true,
        currentStep: 0,
        completedAt: new Date().toISOString(),
        score
      })
    },

    updateCurrentStep(lessonId: string, step: number) {
      this.updateProgress(lessonId, { currentStep: step })
    },

    setStepCompleted(lessonId: string, stepId: string, completed: boolean, totalSteps: number) {
      const current = this.progress.lessons[lessonId] || {
        lessonId,
        completed: false,
        currentStep: 0,
        stepStates: {}
      }

      const stepStates = {
        ...current.stepStates,
        [stepId]: completed
      }

      const completedSteps = Object.values(stepStates).filter(Boolean).length
      const isLessonComplete = totalSteps > 0 && completedSteps >= totalSteps

      this.updateProgress(lessonId, {
        stepStates,
        completed: isLessonComplete,
        completedAt: isLessonComplete ? new Date().toISOString() : undefined
      })
    },

    setRecentLesson(lessonId: string) {
      this.progress.recentLessonId = lessonId
      this.saveProgress()
    },

    addTimeSpent(minutes: number) {
      this.progress.totalTimeSpent += minutes
      this.saveProgress()
    },

    resetLessonProgress(lessonId: string) {
      const existing = this.progress.lessons[lessonId]

      this.updateProgress(lessonId, {
        lessonId,
        completed: false,
        currentStep: 0,
        stepStates: {},
        completedAt: undefined,
        score: existing?.score
      })
    },

    resetProgress() {
      this.progress = createDefaultProgress()
      this.saveProgress()
    }
  }
})
