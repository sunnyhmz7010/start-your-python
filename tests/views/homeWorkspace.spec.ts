import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import HomeView from '@/views/HomeView.vue'

describe('HomeView workspace', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('start-your-python.progress', JSON.stringify({
      lessons: {
        lesson_2_1: {
          lessonId: 'lesson_2_1',
          completed: false,
          currentStep: 1
        }
      },
      totalCompleted: 0,
      totalTimeSpent: 0,
      recentLessonId: 'lesson_2_1'
    }))
  })

  it('shows a pseudo python file view before run mode starts', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await flushPromises()

    expect(wrapper.text()).toContain('.py')
    expect(wrapper.text()).toContain('Project')
    expect(wrapper.text()).not.toContain('课程开始')
  })

  it('switches to run mode and activates the Run tool window', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await flushPromises()
    await wrapper.get('[data-testid="run-button"]').trigger('click')

    expect(wrapper.text()).toContain('Run')
    expect(wrapper.text()).toContain('课程开始')
    expect(wrapper.get('[data-testid="tool-tab-run"]').classes()).toContain('active')
  })
})
