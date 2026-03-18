import { defineStore } from 'pinia'
import type { Lesson, Chapter, LessonStep } from '@/types/lesson'
import { localContentProvider } from '@/services/content/localContentProvider'

export const useLessonStore = defineStore('lesson', {
  state: () => ({
    chapters: [] as Chapter[],
    currentLesson: null as Lesson | null,
    currentStepIndex: 0,
    isLessonRunning: false,
    consoleOutput: ''
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
      this.currentStepIndex = 0
      this.isLessonRunning = false
      this.consoleOutput = ''
    },

    runLesson() {
      if (!this.currentLesson) return

      this.isLessonRunning = true
      this.consoleOutput = `>>> 正在执行 ${this.currentLesson.title}...\n\n`
      this.consoleOutput += `>>> 课程开始！\n\n`
      this.currentStepIndex = 0
    },

    nextStep() {
      if (!this.currentLesson) return

      if (this.currentStepIndex < this.currentLesson.steps.length - 1) {
        this.currentStepIndex++
        this.consoleOutput += `>>> 步骤 ${this.currentStepIndex + 1}: ${this.currentStep?.title}\n\n`
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

    completeLesson() {
      if (!this.currentLesson) return

      this.consoleOutput += `\n>>> 课程完成！恭喜你学完了 ${this.currentLesson.title}\n`
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
