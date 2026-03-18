import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useLessonStore } from '@/stores/lesson'

describe('lesson workspace mode', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('keeps file selection separate from run mode', async () => {
    const store = useLessonStore()
    await store.loadLessons()
    store.selectLesson(store.allLessons[0])

    expect(store.workspaceMode).toBe('editor')

    store.enterRunMode()

    expect(store.workspaceMode).toBe('run')
  })
})
