import type { Chapter, Lesson } from '@/types/lesson'

export interface ContentProvider {
  getChapters(): Promise<Chapter[]>
  getLessonById(id: string): Promise<Lesson | null>
}
