import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useLessonStore } from '@/stores/lesson'
import type { Lesson } from '@/types/lesson'

const contentProviderMock = vi.hoisted(() => ({
  getChaptersWithStatus: vi.fn()
}))

vi.mock('@/services/content/localContentProvider', () => ({
  localContentProvider: contentProviderMock
}))

function makeLesson(overrides: Partial<Lesson> = {}): Lesson {
  return {
    id: 'lesson-1',
    title: 'Test Lesson',
    chapterTitle: '第一章',
    chapterOrder: 1,
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
    contentProviderMock.getChaptersWithStatus.mockReset()
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

  it('stores content loading status from the content provider', async () => {
    const store = useLessonStore()

    contentProviderMock.getChaptersWithStatus.mockResolvedValue({
      chapters: [
        {
          id: 'chapter-1',
          title: '第一章',
          folderName: '第一章',
          description: 'desc',
          order: 1,
          lessons: [makeLesson()]
        }
      ],
      status: {
        source: 'bundled',
        warning: {
          message: '外部课程目录加载失败，已切换到内置课程。',
          detail: 'missing lessons'
        }
      }
    })

    await store.loadLessons()

    expect(store.chapters).toHaveLength(1)
    expect(store.contentStatus.source).toBe('bundled')
    expect(store.contentStatus.warning?.detail).toBe('missing lessons')
  })

  it('stores parse failure warnings from the content provider', async () => {
    const store = useLessonStore()

    contentProviderMock.getChaptersWithStatus.mockResolvedValue({
      chapters: [],
      status: {
        source: 'bundled',
        warning: {
          message: '课程文件解析失败，课程目录无法加载。',
          detail: 'lessons/demo.py: Incomplete lesson metadata'
        }
      }
    })

    await store.loadLessons()

    expect(store.chapters).toEqual([])
    expect(store.contentStatus.source).toBe('bundled')
    expect(store.contentStatus.warning?.message).toBe('课程文件解析失败，课程目录无法加载。')
    expect(store.contentStatus.warning?.detail).toContain('lessons/demo.py')
  })
})
