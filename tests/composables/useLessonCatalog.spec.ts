import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useLessonCatalog } from '@/composables/useLessonCatalog'
import type { Chapter, Lesson, LessonStep } from '@/types/lesson'

const contentProviderMock = vi.hoisted(() => ({
  getChaptersWithStatus: vi.fn()
}))

vi.mock('@/services/content/localContentProvider', () => ({
  localContentProvider: contentProviderMock
}))

function makeStep(id: string): LessonStep {
  return {
    id,
    type: 'text',
    title: `Step ${id}`,
    content: `Content ${id}`
  }
}

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
    steps: [makeStep('step-1'), makeStep('step-2'), makeStep('step-3')],
    prerequisites: [],
    tags: [],
    ...overrides
  }
}

function makeChapter(lessons: Lesson[]): Chapter {
  return {
    id: 'chapter-1',
    title: '第一章',
    folderName: '第一章',
    description: 'desc',
    order: 1,
    lessons
  }
}

describe('useLessonCatalog', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
    contentProviderMock.getChaptersWithStatus.mockReset()
    contentProviderMock.getChaptersWithStatus.mockResolvedValue({
      chapters: [makeChapter([makeLesson()])],
      status: {
        source: 'bundled',
        warning: null
      }
    })
  })

  it('bootstraps lessons and restores the saved current step', async () => {
    localStorage.setItem('start-your-python.progress', JSON.stringify({
      lessons: {
        'lesson-1': {
          lessonId: 'lesson-1',
          completed: false,
          currentStep: 2,
          stepStates: {
            'step-1': true
          }
        }
      },
      totalCompleted: 0,
      totalTimeSpent: 0,
      recentLessonId: 'lesson-1'
    }))

    const catalog = useLessonCatalog()

    await catalog.bootstrap()

    expect(catalog.currentLesson.value?.id).toBe('lesson-1')
    expect(catalog.currentStepIndex.value).toBe(2)
    expect(catalog.currentStep.value?.id).toBe('step-3')
    expect(catalog.completedStepIds.value).toEqual(['step-1'])
    expect(catalog.completedStepCount.value).toBe(1)
    expect(catalog.completionPercent.value).toBe(33)
  })

  it('marks and toggles current step completion through the shared catalog actions', async () => {
    const catalog = useLessonCatalog()

    await catalog.bootstrap()

    expect(catalog.markCurrentStepCompleted()).toBe(true)
    expect(catalog.completedStepIds.value).toEqual(['step-1'])
    expect(catalog.completedStepCount.value).toBe(1)
    expect(catalog.completionPercent.value).toBe(33)

    catalog.toggleCurrentStepCompleted()

    expect(catalog.completedStepIds.value).toEqual([])
    expect(catalog.completedStepCount.value).toBe(0)
    expect(catalog.completionPercent.value).toBe(0)
  })

  it('completes the running lesson only when the selected lesson reaches full progress', async () => {
    const lesson = makeLesson()
    const otherLesson = makeLesson({
      id: 'lesson-2',
      title: 'Other Lesson',
      steps: [makeStep('other-1')]
    })
    contentProviderMock.getChaptersWithStatus.mockResolvedValue({
      chapters: [makeChapter([lesson, otherLesson])],
      status: {
        source: 'bundled',
        warning: null
      }
    })
    const catalog = useLessonCatalog()

    await catalog.bootstrap()
    catalog.lessonStore.enterRunMode()

    catalog.markStepCompleted('lesson-2', 'other-1', 1)

    expect(catalog.progressStore.isLessonCompleted('lesson-2')).toBe(true)
    expect(catalog.lessonStore.isLessonRunning).toBe(true)

    catalog.markStepCompleted('lesson-1', 'step-1', 3)
    catalog.markStepCompleted('lesson-1', 'step-2', 3)
    catalog.markStepCompleted('lesson-1', 'step-3', 3)

    expect(catalog.progressStore.isLessonCompleted('lesson-1')).toBe(true)
    expect(catalog.lessonStore.isLessonRunning).toBe(false)
    expect(catalog.lessonStore.consoleOutput).toContain('[课程] 课程完成: Test Lesson')
  })

  it('returns false when marking a current step without a selected lesson', () => {
    const catalog = useLessonCatalog()

    expect(catalog.markCurrentStepCompleted()).toBe(false)
    expect(catalog.completedStepIds.value).toEqual([])
    expect(catalog.completedStepCount.value).toBe(0)
    expect(catalog.completionPercent.value).toBe(0)
  })
})
