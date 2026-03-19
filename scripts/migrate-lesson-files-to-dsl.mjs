import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const lessonsRoot = path.join(root, 'content', 'lessons')

function formatScalarComment(prefix, value) {
  return `# ${prefix}: ${value}`
}

function formatBlockComment(prefix, value) {
  const lines = String(value)
    .split(/\r?\n/)
    .map((line) => `# ${line}`)

  return [`# ${prefix}:`, ...lines]
}

async function getLessonFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      return getLessonFiles(fullPath)
    }

    return entry.name.endsWith('.py') ? [fullPath] : []
  }))

  return files.flat()
}

function convertOldFile(source) {
  const match = source.match(/^"""\r?\n([\s\S]*?)\r?\n"""\r?\n+([\s\S]*)$/m)

  if (!match) {
    return source
  }

  const [, metadataJson] = match
  const metadata = JSON.parse(metadataJson)
  const output = []

  output.push(formatScalarComment('@lesson.id', metadata.id))
  output.push(formatScalarComment('@lesson.title', metadata.title))
  output.push(...formatBlockComment('@lesson.description', metadata.description))
  output.push(formatScalarComment('@lesson.difficulty', metadata.difficulty))
  output.push(formatScalarComment('@lesson.estimated_time', metadata.estimatedTime))
  output.push(formatScalarComment('@lesson.chapter', metadata.chapter))
  output.push(formatScalarComment('@lesson.chapter_title', metadata.chapterTitle))
  output.push(formatScalarComment('@lesson.chapter_order', metadata.chapterOrder))
  output.push(formatScalarComment('@lesson.order', metadata.order))
  output.push(formatScalarComment('@lesson.prerequisites', (metadata.prerequisites ?? []).join(', ')))
  output.push(formatScalarComment('@lesson.tags', (metadata.tags ?? []).join(', ')))
  output.push('')

  for (const step of metadata.steps ?? []) {
    output.push(formatScalarComment('@step.id', step.id))
    output.push(formatScalarComment('@step.type', step.type))
    output.push(formatScalarComment('@step.title', step.title))
    output.push(...formatBlockComment('@step.content', step.content))

    if (step.hint) {
      output.push(...formatBlockComment('@step.hint', step.hint))
    }

    if (step.code) {
      output.push(...String(step.code).split(/\r?\n/))
    }

    output.push('')
  }

  return `${output.join('\n').trim()}\n`
}

const files = await getLessonFiles(lessonsRoot)

for (const file of files) {
  const source = await fs.readFile(file, 'utf8')
  const converted = convertOldFile(source)
  await fs.writeFile(file, converted, 'utf8')
}
