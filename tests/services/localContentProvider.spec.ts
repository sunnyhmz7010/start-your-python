import { describe, expect, it } from 'vitest'
import { localContentProvider } from '@/services/content/localContentProvider'
import { parseLessonFile } from '@/services/content/courseFiles'

describe('localContentProvider', () => {
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
})
