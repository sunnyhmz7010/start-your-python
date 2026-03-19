import { invoke, isTauri } from '@tauri-apps/api/core'
import { buildChaptersFromLessonSources, getBundledCourseFileChapters, type LessonSourceFile } from './courseFiles'
import type { ContentProvider } from './contentProvider'

let chaptersCachePromise: Promise<Awaited<ReturnType<typeof loadChapters>>> | null = null

async function loadChapters() {
  if (isTauri()) {
    try {
      const files = await invoke<LessonSourceFile[]>('load_lesson_sources')
      return buildChaptersFromLessonSources(files)
    } catch (error) {
      console.warn('Falling back to bundled lesson files.', error)
    }
  }

  return getBundledCourseFileChapters()
}

export const localContentProvider: ContentProvider = {
  async getChapters() {
    if (!chaptersCachePromise) {
      chaptersCachePromise = loadChapters()
    }

    return chaptersCachePromise
  },

  async getLessonById(id) {
    const chapters = await this.getChapters()

    for (const chapter of chapters) {
      const lesson = chapter.lessons.find((item) => item.id === id)
      if (lesson) {
        return lesson
      }
    }

    return null
  }
}
