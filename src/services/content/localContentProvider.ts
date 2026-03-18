import { chapters } from '@/data/lessons'
import type { ContentProvider } from './contentProvider'

export const localContentProvider: ContentProvider = {
  async getChapters() {
    return chapters
  },

  async getLessonById(id) {
    for (const chapter of chapters) {
      const lesson = chapter.lessons.find((item) => item.id === id)
      if (lesson) {
        return lesson
      }
    }

    return null
  }
}
