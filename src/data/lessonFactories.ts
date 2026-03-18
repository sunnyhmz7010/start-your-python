import type { Chapter, Lesson, LessonStep } from '@/types/lesson'

type LessonInput = {
  id: string
  title: string
  description: string
  chapter: number
  order: number
  pseudoCode: string
  steps: LessonStep[]
  estimatedTime?: number
  difficulty?: Lesson['difficulty']
  prerequisites?: string[]
  tags?: string[]
}

export function createLesson(input: LessonInput): Lesson {
  return {
    ...input,
    fileName: `${input.title}.py`,
    estimatedTime: input.estimatedTime ?? 10,
    difficulty: input.difficulty ?? 'beginner',
    prerequisites: input.prerequisites ?? [],
    tags: input.tags ?? []
  }
}

export function createChapter(input: Omit<Chapter, 'lessons'> & { lessons: Lesson[] }): Chapter {
  return input
}
