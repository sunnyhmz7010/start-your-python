import { invoke, isTauri } from '@tauri-apps/api/core'
import {
  buildChaptersFromLessonSources,
  getBundledCourseFileChapters,
  LessonParseError,
  type LessonSourceFile
} from './courseFiles'
import type { ContentLoadResult, ContentLoadWarning, ContentProvider } from './contentProvider'

let chaptersCachePromise: Promise<ContentLoadResult> | null = null

function formatErrorDetail(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return String(error)
}

function buildWarning(error: unknown, fallbackMessage: string): ContentLoadWarning {
  if (error instanceof LessonParseError) {
    return {
      message: fallbackMessage,
      detail: error.filePath
        ? `${error.filePath}: ${error.message}`
        : error.message
    }
  }

  return {
    message: fallbackMessage,
    detail: formatErrorDetail(error)
  }
}

async function loadBundledLessons(warning: ContentLoadWarning | null): Promise<ContentLoadResult> {
  try {
    return {
      chapters: await getBundledCourseFileChapters(),
      status: {
        source: 'bundled',
        warning
      }
    }
  } catch (error) {
    return {
      chapters: [],
      status: {
        source: 'bundled',
        warning: buildWarning(error, '课程文件解析失败，课程目录无法加载。')
      }
    }
  }
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
      return loadBundledLessons(
        buildWarning(error, '外部课程目录加载失败，已切换到内置课程。')
      )
    }
  }

  return loadBundledLessons(null)
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
