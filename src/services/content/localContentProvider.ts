import { invoke, isTauri } from '@tauri-apps/api/core'
import { buildChaptersFromLessonSources, getBundledCourseFileChapters, type LessonSourceFile } from './courseFiles'
import type { ContentLoadResult, ContentProvider } from './contentProvider'

let chaptersCachePromise: Promise<ContentLoadResult> | null = null

function formatErrorDetail(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return String(error)
}

async function loadChapters() {
  if (isTauri()) {
    try {
      const files = await invoke<LessonSourceFile[]>('load_lesson_sources')
      return {
        chapters: buildChaptersFromLessonSources(files),
        status: {
          source: 'external',
          warning: null
        }
      } satisfies ContentLoadResult
    } catch (error) {
      console.warn('Falling back to bundled lesson files.', error)
      return {
        chapters: await getBundledCourseFileChapters(),
        status: {
          source: 'bundled',
          warning: {
            message: '外部课程目录加载失败，已切换到内置课程。',
            detail: formatErrorDetail(error)
          }
        }
      } satisfies ContentLoadResult
    }
  }

  return {
    chapters: await getBundledCourseFileChapters(),
    status: {
      source: 'bundled',
      warning: null
    }
  } satisfies ContentLoadResult
}

export const localContentProvider: ContentProvider = {
  async getChaptersWithStatus() {
    if (!chaptersCachePromise) {
      chaptersCachePromise = loadChapters()
    }

    return chaptersCachePromise
  },

  async getChapters() {
    const result = await this.getChaptersWithStatus()
    return result.chapters
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
