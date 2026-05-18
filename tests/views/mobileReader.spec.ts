import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import MobileView from '@/views/MobileView.vue'

async function waitForReader() {
  await flushPromises()
  await flushPromises()
  await new Promise((resolve) => setTimeout(resolve, 40))
}

describe('MobileView reader', () => {
  beforeEach(() => {
    localStorage.clear()
    window.confirm = () => true
  })

  it('renders the mobile reader without desktop runtime tools', async () => {
    const wrapper = mount(MobileView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForReader()

    expect(wrapper.get('[data-testid="mobile-reader"]').text()).toContain('分钟')
    expect(wrapper.text()).toContain('纯课程阅读模式')
    expect(wrapper.text()).not.toContain('Run Current File')
    expect(wrapper.text()).not.toContain('Terminal')
    expect(wrapper.find('.step-content img').exists()).toBe(true)
  })

  it('tracks step navigation and completion in reader mode', async () => {
    const wrapper = mount(MobileView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForReader()
    const initialTitle = wrapper.get('.step-card h3').text()
    expect(wrapper.get('[data-testid="mobile-progress-summary"]').text()).toContain('0 /')

    await wrapper.get('[data-testid="mobile-mark-step"]').trigger('click')
    await wrapper.get('.primary').trigger('click')
    await flushPromises()

    expect(wrapper.findAll('.step-chip.completed').length).toBeGreaterThan(0)
    expect(wrapper.get('[data-testid="mobile-progress-summary"]').text()).toContain('1 /')
    expect(wrapper.get('.step-card h3').text()).not.toBe(initialTitle)
  })

  it('marks quiz steps complete after the correct answer in reader mode', async () => {
    localStorage.setItem('start-your-python.progress', JSON.stringify({
      lessons: {
        lesson_syntax_hello_world: {
          lessonId: 'lesson_syntax_hello_world',
          completed: false,
          currentStep: 3,
          stepStates: {}
        }
      },
      totalCompleted: 0,
      totalTimeSpent: 0,
      recentLessonId: 'lesson_syntax_hello_world'
    }))

    const wrapper = mount(MobileView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForReader()

    expect(wrapper.get('[data-testid="mobile-reader"]').text()).toContain('小测验')
    await wrapper.findAll('[data-testid="quiz-step"] button')[0].trigger('click')
    await flushPromises()

    expect(wrapper.text()).toContain('回答正确')
    expect(wrapper.findAll('.step-chip.completed')).toHaveLength(1)
    expect(wrapper.get('[data-testid="mobile-progress-summary"]').text()).toContain('1 / 4 步')
    const savedProgress = JSON.parse(localStorage.getItem('start-your-python.progress') ?? '{}')
    expect(savedProgress.lessons.lesson_syntax_hello_world.stepStates.q1).toBe(true)
  })
})
