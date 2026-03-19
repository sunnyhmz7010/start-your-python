import { courseFileChapters } from './courseFiles'
import type { ContentProvider } from './contentProvider'

export const localContentProvider: ContentProvider = {
  async getChapters() {
    return courseFileChapters
  },

  async getLessonById(id) {
    for (const chapter of courseFileChapters) {
      const lesson = chapter.lessons.find((item) => item.id === id)
      if (lesson) {
        return lesson
      }
    }

    return null
  }
}
