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

  const completedStepCount = computed(() => {
    if (!currentLesson.value) {
      return 0
    }

    const lessonStepIds = new Set(currentLesson.value.steps.map((step) => step.id))
    return completedStepIds.value.filter((stepId) => lessonStepIds.has(stepId)).length
  })

  const completionPercent = computed(() => {
    if (!currentLesson.value?.steps.length) {
      return 0
    }

    return Math.round((completedStepCount.value / currentLesson.value.steps.length) * 100)
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

  function markStepCompleted(lessonId: string, stepId: string, totalSteps: number) {
    const wasLessonCompleted = progressStore.isLessonCompleted(lessonId)
    progressStore.setStepCompleted(lessonId, stepId, true, totalSteps)

    if (
      lessonStore.isLessonRunning &&
      currentLesson.value?.id === lessonId &&
      !wasLessonCompleted &&
      progressStore.isLessonCompleted(lessonId)
    ) {
      lessonStore.completeLesson()
    }
  }

  function markCurrentStepCompleted() {
    if (!currentLesson.value || !currentStep.value) {
      return false
    }

    markStepCompleted(
      currentLesson.value.id,
      currentStep.value.id,
      currentLesson.value.steps.length
    )
    return true
  }

  function toggleCurrentStepCompleted() {
    if (!currentLesson.value || !currentStep.value) {
      return
    }

    const isCompleted = progressStore.isStepCompleted(currentLesson.value.id, currentStep.value.id)
    progressStore.setStepCompleted(
      currentLesson.value.id,
      currentStep.value.id,
      !isCompleted,
      currentLesson.value.steps.length
    )
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
    completedStepCount,
    completionPercent,
    bootstrap,
    selectLesson,
    markStepCompleted,
    markCurrentStepCompleted,
    toggleCurrentStepCompleted
  }
}
