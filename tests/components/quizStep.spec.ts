import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import QuizStep from '@/components/content/QuizStep.vue'
import type { LessonStep } from '@/types/lesson'

function makeQuizStep(): LessonStep {
  return {
    id: 'q1',
    type: 'quiz',
    title: '小测验',
    content: '哪个函数可以输出内容？',
    options: [
      { id: 'a', text: 'print()', isCorrect: true },
      { id: 'b', text: 'input()', isCorrect: false }
    ],
    correctAnswer: 'a'
  }
}

describe('QuizStep', () => {
  it('renders quiz options and confirms the correct answer', async () => {
    const wrapper = mount(QuizStep, {
      props: {
        step: makeQuizStep()
      }
    })

    expect(wrapper.text()).toContain('print()')
    expect(wrapper.text()).toContain('input()')

    await wrapper.findAll('button')[0].trigger('click')

    expect(wrapper.text()).toContain('回答正确')
    expect(wrapper.emitted('answer')).toEqual([[{ optionId: 'a', isCorrect: true }]])
  })

  it('shows retry feedback for a wrong answer', async () => {
    const wrapper = mount(QuizStep, {
      props: {
        step: makeQuizStep()
      }
    })

    await wrapper.findAll('button')[1].trigger('click')

    expect(wrapper.text()).toContain('再想一想')
    expect(wrapper.emitted('answer')).toEqual([[{ optionId: 'b', isCorrect: false }]])
  })
})
