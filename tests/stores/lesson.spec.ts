import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useLessonStore } from '@/stores/lesson'
import type { Lesson } from '@/types/lesson'

function makeLesson(overrides: Partial<Lesson> = {}): Lesson {
  return {
    id: 'lesson-1',
    title: 'Test Lesson',
    fileName: 'Test Lesson.py',
    description: 'desc',
    difficulty: 'beginner',
    estimatedTime: 5,
    chapter: 1,
    order: 1,
    pseudoCode: 'print("hi")',
    steps: [],
    prerequisites: [],
    tags: [],
    ...overrides
  }
}

describe('lesson store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('stores an editable working copy separate from lesson source', () => {
    const store = useLessonStore()
    const lesson = makeLesson()

    store.selectLesson(lesson)
    store.updateEditorCode('print("changed")')

    expect(store.currentLesson?.pseudoCode).toBe('print("hi")')
    expect(store.currentEditorCode).toBe('print("changed")')
  })

  it('restores the existing working copy when the lesson is reselected', () => {
    const store = useLessonStore()
    const lesson = makeLesson()

    store.selectLesson(lesson)
    store.updateEditorCode('print("changed")')
    store.selectLesson(lesson)

    expect(store.currentEditorCode).toBe('print("changed")')
  })
})
