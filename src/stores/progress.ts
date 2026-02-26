import { defineStore } from 'pinia'
import type { LessonProgress, UserProgress } from '@/types/lesson'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    progress: {
      lessons: {} as Record<string, LessonProgress>,
      totalCompleted: 0,
      totalTimeSpent: 0
    } as UserProgress
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
    }
  },

  actions: {
    loadProgress() {
      const saved = localStorage.getItem('lessonProgress')
      if (saved) {
        try {
          this.progress = JSON.parse(saved)
        } catch (e) {
          console.error('Failed to load progress:', e)
        }
      }
    },

    saveProgress() {
      localStorage.setItem('lessonProgress', JSON.stringify(this.progress))
    },

    updateProgress(lessonId: string, progress: Partial<LessonProgress>) {
      const current = this.progress.lessons[lessonId] || {
        lessonId,
        completed: false,
        currentStep: 0
      }

      const newProgress = {
        ...current,
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

    addTimeSpent(minutes: number) {
      this.progress.totalTimeSpent += minutes
      this.saveProgress()
    },

    resetProgress() {
      this.progress = {
        lessons: {},
        totalCompleted: 0,
        totalTimeSpent: 0
      }
      this.saveProgress()
    }
  }
})
