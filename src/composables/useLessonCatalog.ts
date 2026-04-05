import { computed } from 'vue'
import { useLessonStore } from '@/stores/lesson'
import { useProgressStore } from '@/stores/progress'
import type { Lesson } from '@/types/lesson'

export function useLessonCatalog() {
  const lessonStore = useLessonStore()
  const progressStore = useProgressStore()

  const chapters = computed(() => lessonStore.chapters)
  const currentLesson = computed(() => lessonStore.currentLesson)
  const currentStepIndex = computed(() => lessonStore.currentStepIndex)
  const currentStep = computed(() => lessonStore.currentStep)
  const editorCode = computed(() => lessonStore.currentEditorCode)

  const completedLessonIds = computed(() =>
    Object.values(progressStore.progress.lessons)
      .filter((item) => item.completed)
      .map((item) => item.lessonId)
  )

  const completedStepIds = computed(() => {
    if (!currentLesson.value) {
      return []
    }

    const stepStates = progressStore.getProgress(currentLesson.value.id)?.stepStates ?? {}
    return Object.entries(stepStates)
      .filter(([, completed]) => completed)
      .map(([stepId]) => stepId)
  })

  function restoreSavedStep(lessonId: string) {
    const savedStep = progressStore.getProgress(lessonId)?.currentStep ?? 0
    lessonStore.setCurrentStep(savedStep)
  }

  function applyLessonSelection(lesson: Lesson) {
    lessonStore.selectLesson(lesson)
    restoreSavedStep(lesson.id)
  }

  function selectInitialLesson() {
    const recentLessonId = progressStore.progress.recentLessonId
    const recentLesson = recentLessonId ? lessonStore.getLessonById(recentLessonId) : null
    const selected = recentLesson ?? lessonStore.allLessons[0] ?? null

    if (!selected) {
      return
    }

    applyLessonSelection(selected)
  }

  function selectLesson(lesson: Lesson) {
    applyLessonSelection(lesson)
    progressStore.setRecentLesson(lesson.id)
  }

  async function bootstrap() {
    progressStore.loadProgress()
    await lessonStore.loadLessons()
    selectInitialLesson()
  }

  return {
    lessonStore,
    progressStore,
    chapters,
    currentLesson,
    currentStepIndex,
    currentStep,
    editorCode,
    completedLessonIds,
    completedStepIds,
    bootstrap,
    selectLesson
  }
}
