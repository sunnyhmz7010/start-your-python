import type { Chapter, Lesson, LessonStep } from '@/types/lesson'

type LessonFileMetadata = {
  id: string
  title: string
  description: string
  difficulty: Lesson['difficulty']
  estimatedTime: number
  chapter: number
  chapterTitle: string
  chapterOrder: number
  order: number
  prerequisites: string[]
  tags: string[]
  steps: LessonStep[]
}

const lessonModules = import.meta.glob('../../../content/lessons/**/*.py', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

const DOCSTRING_PATTERN = /^"""\r?\n([\s\S]*?)\r?\n"""\r?\n+([\s\S]*)$/m

function parseLessonFile(filePath: string, source: string): Lesson {
  const match = source.match(DOCSTRING_PATTERN)

  if (!match) {
    throw new Error(`Invalid lesson file format: ${filePath}`)
  }

  const [, metadataJson, pseudoCode] = match
  const metadata = JSON.parse(metadataJson) as LessonFileMetadata
  const fileName = filePath.split('/').pop() ?? `${metadata.title}.py`

  return {
    id: metadata.id,
    title: metadata.title,
    fileName,
    description: metadata.description,
    difficulty: metadata.difficulty,
    estimatedTime: metadata.estimatedTime,
    chapter: metadata.chapter,
    order: metadata.order,
    pseudoCode: pseudoCode.trim(),
    steps: metadata.steps,
    prerequisites: metadata.prerequisites,
    tags: metadata.tags
  }
}

function buildChapters(): Chapter[] {
  const chaptersMap = new Map<string, Chapter>()

  for (const [filePath, source] of Object.entries(lessonModules)) {
    const lesson = parseLessonFile(filePath, source)
    const pathParts = filePath.split('/')
    const folderName = pathParts[pathParts.length - 2] ?? `第${lesson.chapter}章`
    const metadataMatch = source.match(DOCSTRING_PATTERN)

    if (!metadataMatch) {
      continue
    }

    const metadata = JSON.parse(metadataMatch[1]) as LessonFileMetadata
    const existingChapter = chaptersMap.get(folderName)

    if (!existingChapter) {
      chaptersMap.set(folderName, {
        id: `chapter_${metadata.chapterOrder}`,
        title: metadata.chapterTitle,
        folderName,
        description: `${metadata.chapterTitle} 课程目录`,
        order: metadata.chapterOrder,
        lessons: [lesson]
      })
      continue
    }

    existingChapter.lessons.push(lesson)
  }

  return Array.from(chaptersMap.values())
    .sort((a, b) => a.order - b.order)
    .map((chapter) => ({
      ...chapter,
      lessons: [...chapter.lessons].sort((a, b) => a.order - b.order)
    }))
}

export const courseFileChapters = buildChapters()
