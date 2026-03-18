import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it, beforeEach } from 'vitest'
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

  it('shows a recent lesson entry and a visible learning steps region', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await flushPromises()

    expect(wrapper.text()).toContain('继续学习')
    expect(wrapper.text()).toContain('学习步骤')
  })
})
