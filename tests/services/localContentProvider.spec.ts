import { beforeEach, describe, expect, it, vi } from 'vitest'
import { localContentProvider } from '@/services/content/localContentProvider'
import { parseLessonFile } from '@/services/content/courseFiles'

const tauriCoreMock = vi.hoisted(() => ({
  isTauri: vi.fn(() => false),
  invoke: vi.fn()
}))

vi.mock('@tauri-apps/api/core', () => tauriCoreMock)

describe('localContentProvider', () => {
  beforeEach(() => {
    tauriCoreMock.isTauri.mockReturnValue(false)
    tauriCoreMock.invoke.mockReset()
  })

  it('returns populated chapters and lessons', async () => {
    const chapters = await localContentProvider.getChapters()

    expect(chapters.length).toBeGreaterThan(0)
    expect(chapters[0]?.lessons.length ?? 0).toBeGreaterThan(0)
  })

  it('parses lesson steps from annotated python source files', async () => {
    const lesson = await localContentProvider.getLessonById('lesson_syntax_input_output')

    expect(lesson).not.toBeNull()
    expect(lesson?.pseudoCode).toContain('# @step.title: 组合使用')
    expect(lesson?.steps[2]?.code).toContain('input("请输入名字: ")')
    expect(lesson?.steps[2]?.runnableCode).toContain('input("请输入名字: ")')
    expect(lesson?.steps[2]?.content).toContain('输出出来')
  })

  it('supports step runtime annotations for hidden execution context', () => {
    const lesson = parseLessonFile('content/lessons/demo.py', `
# @lesson.id: lesson_demo
# @lesson.title: Demo
# @lesson.description: Demo lesson.
# @lesson.difficulty: beginner
# @lesson.estimated_time: 5
# @lesson.chapter: 1
# @lesson.chapter_title: 第一章
# @lesson.chapter_order: 1
# @lesson.order: 1

# @step.id: s1
# @step.type: code
# @step.title: 示例
# @step.content: 运行示例
# @step.runtime:
# name = "Sunny"
print(name)
`)

    expect(lesson.steps[0]?.code).toBe('print(name)')
    expect(lesson.steps[0]?.runnableCode).toContain('name = "Sunny"')
  })

  it('parses quiz options and answers from lesson annotations', () => {
    const lesson = parseLessonFile('content/lessons/demo.py', `
# @lesson.id: lesson_quiz_demo
# @lesson.title: Quiz Demo
# @lesson.description: Demo lesson.
# @lesson.difficulty: beginner
# @lesson.estimated_time: 5
# @lesson.chapter: 1
# @lesson.chapter_title: 第一章
# @lesson.chapter_order: 1
# @lesson.order: 1

# @step.id: q1
# @step.type: quiz
# @step.title: 小测验
# @step.content: 哪个函数可以输出内容？
# @step.option: a | print() | true
# @step.option: b | input() | false
# @step.correct_answer: a
`)

    expect(lesson.steps[0]?.type).toBe('quiz')
    expect(lesson.steps[0]?.options).toEqual([
      { id: 'a', text: 'print()', isCorrect: true },
      { id: 'b', text: 'input()', isCorrect: false }
    ])
    expect(lesson.steps[0]?.correctAnswer).toBe('a')
  })

  it('uses correct_answer to resolve quiz answers when option flags are omitted', () => {
    const lesson = parseLessonFile('content/lessons/demo.py', `
# @lesson.id: lesson_quiz_answer_demo
# @lesson.title: Quiz Answer Demo
# @lesson.description: Demo lesson.
# @lesson.difficulty: beginner
# @lesson.estimated_time: 5
# @lesson.chapter: 1
# @lesson.chapter_title: 第一章
# @lesson.chapter_order: 1
# @lesson.order: 1

# @step.id: q1
# @step.type: quiz
# @step.title: 小测验
# @step.content: 哪个函数可以输出内容？
# @step.option: a | print()
# @step.option: b | input()
# @step.correct_answer: a
`)

    expect(lesson.steps[0]?.options).toEqual([
      { id: 'a', text: 'print()', isCorrect: true },
      { id: 'b', text: 'input()', isCorrect: false }
    ])
  })

  it('parses lesson sources returned by the Tauri command contract', async () => {
    tauriCoreMock.isTauri.mockReturnValue(true)
    tauriCoreMock.invoke.mockResolvedValue([
      {
        filePath: 'content/lessons/第一章/demo.py',
        source: `
# @lesson.id: lesson_tauri_demo
# @lesson.title: Tauri Demo
# @lesson.description: Demo lesson.
# @lesson.difficulty: beginner
# @lesson.estimated_time: 5
# @lesson.chapter: 1
# @lesson.chapter_title: 第一章
# @lesson.chapter_order: 1
# @lesson.order: 1

# @step.id: s1
# @step.type: code
# @step.title: 示例
# @step.content: 运行示例
print("hello")
`
      }
    ])

    vi.resetModules()
    const { localContentProvider: provider } = await import('@/services/content/localContentProvider')
    const lesson = await provider.getLessonById('lesson_tauri_demo')

    expect(tauriCoreMock.invoke).toHaveBeenCalledWith('load_lesson_sources')
    expect(lesson?.fileName).toBe('demo.py')
    expect(lesson?.steps[0]?.code).toBe('print("hello")')
  })

  it('returns a warning when Tauri lesson loading falls back to bundled lessons', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    try {
      tauriCoreMock.isTauri.mockReturnValue(true)
      tauriCoreMock.invoke.mockRejectedValue(new Error('missing content/lessons'))

      vi.resetModules()
      const { localContentProvider: provider } = await import('@/services/content/localContentProvider')
      const result = await provider.getChaptersWithStatus()

      expect(result.chapters.length).toBeGreaterThan(0)
      expect(result.status.source).toBe('bundled')
      expect(result.status.warning?.message).toContain('外部课程目录加载失败')
      expect(result.status.warning?.detail).toBe('missing content/lessons')
    } finally {
      warnSpy.mockRestore()
    }
  })
})
