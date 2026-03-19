import type { Chapter, Lesson, LessonStep } from '@/types/lesson'

type LessonAnnotationKey =
  | 'id'
  | 'title'
  | 'description'
  | 'difficulty'
  | 'estimated_time'
  | 'chapter'
  | 'chapter_title'
  | 'chapter_order'
  | 'order'
  | 'prerequisites'
  | 'tags'

type StepAnnotationKey = 'id' | 'type' | 'title' | 'content' | 'hint'

type LessonMetadata = {
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
}

type ParsedStep = LessonStep & {
  codeLines: string[]
}

const lessonModules = import.meta.glob('../../../content/lessons/**/*.py', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

const LESSON_PREFIX = '# @lesson.'
const STEP_PREFIX = '# @step.'

function isAnnotationLine(line: string) {
  return line.startsWith(LESSON_PREFIX) || line.startsWith(STEP_PREFIX)
}

function isCommentLine(line: string) {
  return line.trimStart().startsWith('#')
}

function stripComment(line: string) {
  return line.replace(/^\s*#\s?/, '')
}

function parseAnnotationLine<T extends string>(line: string, prefix: string) {
  const payload = line.slice(prefix.length)
  const separatorIndex = payload.indexOf(':')

  if (separatorIndex === -1) {
    throw new Error(`Invalid annotation line: ${line}`)
  }

  const key = payload.slice(0, separatorIndex).trim() as T
  const value = payload.slice(separatorIndex + 1).trim()
  return { key, value }
}

function consumeBlockComment(lines: string[], startIndex: number) {
  const contentLines: string[] = []
  let cursor = startIndex

  while (cursor < lines.length) {
    const currentLine = lines[cursor]

    if (!isCommentLine(currentLine) || isAnnotationLine(currentLine)) {
      break
    }

    contentLines.push(stripComment(currentLine))
    cursor += 1
  }

  return {
    value: contentLines.join('\n').trim(),
    nextIndex: cursor
  }
}

function normalizeListValue(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function finalizeStep(step: ParsedStep | null): LessonStep | null {
  if (!step) {
    return null
  }

  const code = step.codeLines.join('\n').trim()

  return {
    id: step.id,
    type: step.type,
    title: step.title,
    content: step.content,
    code: code || undefined,
    hint: step.hint
  }
}

export function parseLessonFile(filePath: string, source: string): Lesson {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const metadata: Partial<LessonMetadata> = {
    prerequisites: [],
    tags: []
  }
  const steps: LessonStep[] = []
  let currentStep: ParsedStep | null = null
  let index = 0

  while (index < lines.length) {
    const line = lines[index]

    if (line.startsWith(LESSON_PREFIX)) {
      const { key, value } = parseAnnotationLine<LessonAnnotationKey>(line, LESSON_PREFIX)

      if (value) {
        if (key === 'estimated_time' || key === 'chapter' || key === 'chapter_order' || key === 'order') {
          const numberValue = Number(value)
          if (Number.isNaN(numberValue)) {
            throw new Error(`Invalid numeric lesson annotation in ${filePath}: ${line}`)
          }

          if (key === 'estimated_time') metadata.estimatedTime = numberValue
          if (key === 'chapter') metadata.chapter = numberValue
          if (key === 'chapter_order') metadata.chapterOrder = numberValue
          if (key === 'order') metadata.order = numberValue
        } else if (key === 'prerequisites') {
          metadata.prerequisites = normalizeListValue(value)
        } else if (key === 'tags') {
          metadata.tags = normalizeListValue(value)
        } else if (key === 'difficulty') {
          metadata.difficulty = value as Lesson['difficulty']
        } else if (key === 'id') {
          metadata.id = value
        } else if (key === 'title') {
          metadata.title = value
        } else if (key === 'description') {
          metadata.description = value
        } else if (key === 'chapter_title') {
          metadata.chapterTitle = value
        }
        index += 1
        continue
      }

      const block = consumeBlockComment(lines, index + 1)

      if (key === 'description') metadata.description = block.value
      if (key === 'prerequisites') metadata.prerequisites = block.value ? block.value.split('\n').map((item) => item.trim()).filter(Boolean) : []
      if (key === 'tags') metadata.tags = block.value ? block.value.split('\n').map((item) => item.trim()).filter(Boolean) : []

      index = block.nextIndex
      continue
    }

    if (line.startsWith(STEP_PREFIX)) {
      const { key, value } = parseAnnotationLine<StepAnnotationKey>(line, STEP_PREFIX)

      if (key === 'id') {
        const finalizedStep = finalizeStep(currentStep)
        if (finalizedStep) {
          steps.push(finalizedStep)
        }

        currentStep = {
          id: value,
          type: 'text',
          title: '',
          content: '',
          hint: undefined,
          codeLines: []
        }
        index += 1
        continue
      }

      if (!currentStep) {
        throw new Error(`Step annotation before step.id in ${filePath}: ${line}`)
      }

      if (value) {
        if (key === 'type') currentStep.type = value as LessonStep['type']
        if (key === 'title') currentStep.title = value
        if (key === 'content') currentStep.content = value
        if (key === 'hint') currentStep.hint = value
        index += 1
        continue
      }

      const block = consumeBlockComment(lines, index + 1)

      if (key === 'content') currentStep.content = block.value
      if (key === 'hint') currentStep.hint = block.value

      index = block.nextIndex
      continue
    }

    if (currentStep) {
      currentStep.codeLines.push(line)
    }

    index += 1
  }

  const finalizedStep = finalizeStep(currentStep)
  if (finalizedStep) {
    steps.push(finalizedStep)
  }

  const fileName = filePath.split('/').pop() ?? `${metadata.title ?? 'lesson'}.py`

  if (
    !metadata.id ||
    !metadata.title ||
    !metadata.description ||
    !metadata.difficulty ||
    metadata.estimatedTime === undefined ||
    metadata.chapter === undefined ||
    !metadata.chapterTitle ||
    metadata.chapterOrder === undefined ||
    metadata.order === undefined
  ) {
    throw new Error(`Incomplete lesson metadata in ${filePath}`)
  }

  return {
    id: metadata.id,
    title: metadata.title,
    fileName,
    description: metadata.description,
    difficulty: metadata.difficulty,
    estimatedTime: metadata.estimatedTime,
    chapter: metadata.chapter,
    order: metadata.order,
    pseudoCode: source.trim(),
    steps,
    prerequisites: metadata.prerequisites ?? [],
    tags: metadata.tags ?? []
  }
}

function buildChapters(): Chapter[] {
  const chaptersMap = new Map<string, Chapter>()

  for (const [filePath, source] of Object.entries(lessonModules)) {
    const lesson = parseLessonFile(filePath, source)
    const pathParts = filePath.split('/')
    const folderName = pathParts[pathParts.length - 2] ?? `第${lesson.chapter}章`
    const existingChapter = chaptersMap.get(folderName)

    if (!existingChapter) {
      chaptersMap.set(folderName, {
        id: `chapter_${lesson.chapter}`,
        title: `${folderName}`,
        folderName,
        description: `${folderName} 课程目录`,
        order: lesson.chapter,
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
