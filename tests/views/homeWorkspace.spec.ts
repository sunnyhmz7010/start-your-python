import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import HomeView from '@/views/HomeView.vue'

async function waitForWorkspace() {
  await flushPromises()
  await flushPromises()
  await new Promise((resolve) => setTimeout(resolve, 20))
}

describe('HomeView workspace', () => {
  beforeEach(() => {
    localStorage.clear()
    window.confirm = () => true
    localStorage.setItem('start-your-python.progress', JSON.stringify({
      lessons: {
        lesson_2_1: {
          lessonId: 'lesson_syntax_hello_world',
          completed: false,
          currentStep: 1,
          stepStates: {}
        }
      },
      totalCompleted: 0,
      totalTimeSpent: 0,
      recentLessonId: 'lesson_syntax_hello_world'
    }))
  })

  it('shows a pseudo python file view before run mode starts', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()

    expect(wrapper.text()).toContain('.py')
    expect(wrapper.text()).toContain('Project')
    expect(wrapper.text()).not.toContain('课程开始')
    expect(wrapper.get('[data-testid="tool-tab-terminal"]').classes()).toContain('active')
  })

  it('shows Chinese chapter folders with multiple lesson files', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()

    expect(wrapper.text()).toContain('第一章 Python环境准备')
    expect(wrapper.text()).toContain('Python是什么.py')
    expect(wrapper.text()).toContain('安装Python.py')
  })

  it('switches to run mode and activates the Run tool window', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()
    await wrapper.get('[data-testid="run-button"]').trigger('click')
    await flushPromises()

    expect(wrapper.text()).toContain('Run')
    expect(wrapper.text()).toContain('课程开始')
    expect(wrapper.get('[data-testid="tool-tab-run"]').classes()).toContain('active')
  })

  it('marks each previous step complete when advancing with next step', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()
    await wrapper.get('[data-testid="run-button"]').trigger('click')
    await flushPromises()

    await wrapper.get('.actions .primary').trigger('click')
    await flushPromises()

    const doneBadges = wrapper.findAll('.step-done')
    expect(doneBadges).toHaveLength(1)
  })

  it('allows marking a step complete and resetting the current lesson progress', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()
    await wrapper.get('[data-testid="run-button"]').trigger('click')
    await flushPromises()

    await wrapper.get('[data-testid="toggle-step-completed"]').trigger('click')
    expect(wrapper.text()).toContain('done')

    await wrapper.get('[data-testid="reset-lesson-progress"]').trigger('click')
    await flushPromises()

    expect(wrapper.text()).not.toContain('取消本步完成')
  })
})
