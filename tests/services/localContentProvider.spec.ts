import { describe, expect, it } from 'vitest'
import { localContentProvider } from '@/services/content/localContentProvider'

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
    expect(lesson?.steps[2]?.content).toContain('输出出来')
  })
})
