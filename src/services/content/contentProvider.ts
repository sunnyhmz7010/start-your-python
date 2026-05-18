import type { Chapter, Lesson } from '@/types/lesson'

export type ContentSource = 'external' | 'bundled'

export interface ContentLoadWarning {
  message: string
  detail?: string
}

export interface ContentLoadStatus {
  source: ContentSource
  warning: ContentLoadWarning | null
}

export interface ContentLoadResult {
  chapters: Chapter[]
  status: ContentLoadStatus
}

export interface ContentProvider {
  getChaptersWithStatus(): Promise<ContentLoadResult>
  getChapters(): Promise<Chapter[]>
  getLessonById(id: string): Promise<Lesson | null>
}
