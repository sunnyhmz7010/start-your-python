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
})
