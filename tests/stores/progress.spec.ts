import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
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

    expect(store.progress.lessons['lesson-1']?.currentStep).toBe(2)
    expect(store.progress.recentLessonId).toBe('lesson-1')
  })

  it('tracks step completion and marks lesson complete when all steps are done', () => {
    const store = useProgressStore()

    store.setStepCompleted('lesson-1', 'step-1', true, 3)
    expect(store.progress.lessons['lesson-1']?.completed).toBe(false)

    store.setStepCompleted('lesson-1', 'step-2', true, 3)
    store.setStepCompleted('lesson-1', 'step-3', true, 3)

    expect(store.progress.lessons['lesson-1']?.stepStates).toEqual({
      'step-1': true,
      'step-2': true,
      'step-3': true
    })
    expect(store.progress.lessons['lesson-1']?.completed).toBe(true)
    expect(store.progress.totalCompleted).toBe(1)
  })

  it('can undo a completed step and clear the lesson completion state', () => {
    const store = useProgressStore()

    store.setStepCompleted('lesson-1', 'step-1', true, 1)
    expect(store.progress.lessons['lesson-1']?.completed).toBe(true)

    store.setStepCompleted('lesson-1', 'step-1', false, 1)

    expect(store.progress.lessons['lesson-1']?.stepStates).toEqual({
      'step-1': false
    })
    expect(store.progress.lessons['lesson-1']?.completed).toBe(false)
    expect(store.progress.totalCompleted).toBe(0)
  })

  it('resets a single lesson without clearing other progress', () => {
    const store = useProgressStore()

    store.setStepCompleted('lesson-1', 'step-1', true, 1)
    store.updateCurrentStep('lesson-1', 2)
    store.setRecentLesson('lesson-1')
    store.setStepCompleted('lesson-2', 'step-1', true, 1)

    store.resetLessonProgress('lesson-1')

    expect(store.progress.lessons['lesson-1']).toEqual({
      lessonId: 'lesson-1',
      completed: false,
      currentStep: 0,
      stepStates: {}
    })
    expect(store.progress.lessons['lesson-2']?.completed).toBe(true)
    expect(store.progress.recentLessonId).toBe('lesson-1')
    expect(store.progress.totalCompleted).toBe(1)
  })

  it('clears all progress data', () => {
    const store = useProgressStore()

    store.setStepCompleted('lesson-1', 'step-1', true, 1)
    store.setRecentLesson('lesson-1')
    store.addTimeSpent(15)

    store.resetProgress()

    expect(store.progress).toEqual({
      lessons: {},
      totalCompleted: 0,
      totalTimeSpent: 0,
      recentLessonId: null
    })
  })
})
