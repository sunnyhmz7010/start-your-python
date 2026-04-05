import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { PythonOutputEvent, PythonStateEvent } from '@/types/runtime'
import HomeView from '@/views/HomeView.vue'

const runtimeMock = vi.hoisted(() => {
  let outputHandler: ((payload: PythonOutputEvent) => void) | null = null
  let stateHandler: ((payload: PythonStateEvent) => void) | null = null

  return {
    detectPython: vi.fn(),
    startRun: vi.fn(),
    sendInput: vi.fn(),
    stopRun: vi.fn(),
    onOutput: vi.fn(async (callback: (payload: PythonOutputEvent) => void) => {
      outputHandler = callback
      return () => undefined
    }),
    onState: vi.fn(async (callback: (payload: PythonStateEvent) => void) => {
      stateHandler = callback
      return () => undefined
    }),
    emitOutput(payload: PythonOutputEvent) {
      outputHandler?.(payload)
    },
    emitState(payload: PythonStateEvent) {
      stateHandler?.(payload)
    },
    reset() {
      outputHandler = null
      stateHandler = null
    }
  }
})

vi.mock('@/services/runtime/pythonRuntime', () => ({
  pythonRuntime: runtimeMock
}))

async function waitForWorkspace() {
  await flushPromises()
  await flushPromises()
  await flushPromises()
  await new Promise((resolve) => setTimeout(resolve, 40))
}

describe('HomeView workspace', () => {
  beforeEach(() => {
    localStorage.clear()
    window.confirm = () => true
    runtimeMock.reset()
    runtimeMock.detectPython.mockReset()
    runtimeMock.startRun.mockReset()
    runtimeMock.sendInput.mockReset()
    runtimeMock.stopRun.mockReset()
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

  it('shows an editable python file view before runtime starts', async () => {
    runtimeMock.detectPython.mockResolvedValue({ available: true, command: 'python' })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()

    expect(wrapper.get('[data-testid="editor-input"]').element).toBeTruthy()
    expect(wrapper.text()).toContain('Project')
    expect(wrapper.get('[data-testid="tool-tab-terminal"]').classes()).toContain('active')
    expect(wrapper.text()).not.toContain('学习步骤')
  })

  it('lets the user edit the current lesson code', async () => {
    runtimeMock.detectPython.mockResolvedValue({ available: true, command: 'python' })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()

    const editor = wrapper.get('[data-testid="editor-input"]')
    await editor.setValue('print("edited")')

    expect((editor.element as HTMLTextAreaElement).value).toContain('edited')
  })

  it('runs the edited lesson file from editor mode', async () => {
    runtimeMock.detectPython.mockResolvedValue({ available: true, command: 'python' })
    runtimeMock.startRun.mockResolvedValue({ sessionId: 'session-1', command: 'python -u -c <code>' })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()
    const editor = wrapper.get('[data-testid="editor-input"]')
    await editor.setValue('print("edited from editor")')
    await wrapper.get('[data-testid="editor-run-button"]').trigger('click')
    await flushPromises()

    expect(runtimeMock.startRun).toHaveBeenCalledWith('print("edited from editor")')
    expect(wrapper.get('[data-testid="tool-tab-terminal"]').classes()).toContain('active')
  })

  it('switches to lesson content without executing python when the main run button is clicked', async () => {
    runtimeMock.detectPython.mockResolvedValue({ available: true, command: 'python' })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()
    await wrapper.get('[data-testid="run-button"]').trigger('click')
    await flushPromises()

    expect(runtimeMock.startRun).not.toHaveBeenCalled()
    expect(wrapper.get('[data-testid="tool-tab-run"]').classes()).toContain('active')
    expect(wrapper.text()).toContain('学习步骤')
    expect(wrapper.find('[data-testid="run-lesson-view"]').exists()).toBe(true)
  })

  it('runs the current lesson code block in the terminal tool window', async () => {
    runtimeMock.detectPython.mockResolvedValue({ available: true, command: 'python' })
    runtimeMock.startRun.mockResolvedValue({ sessionId: 'session-1', command: 'python -u -c <code>' })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()
    await wrapper.get('[data-testid="run-button"]').trigger('click')
    await flushPromises()
    await wrapper.get('[data-testid="step-run-button"]').trigger('click')
    await flushPromises()
    runtimeMock.emitOutput({ sessionId: 'session-1', stream: 'stdout', chunk: 'hello\n' })
    await flushPromises()

    expect(runtimeMock.startRun).toHaveBeenCalledTimes(1)
    expect(wrapper.get('[data-testid="tool-tab-terminal"]').classes()).toContain('active')
    expect(wrapper.text()).toContain('hello')
  })

  it('shows install guidance when python is unavailable for a lesson code block', async () => {
    runtimeMock.detectPython.mockResolvedValue({ available: false, error: 'Python not found' })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()
    await wrapper.get('[data-testid="run-button"]').trigger('click')
    await flushPromises()
    await wrapper.get('[data-testid="step-run-button"]').trigger('click')
    await flushPromises()

    expect(wrapper.text()).toContain('未检测到可用的 Python 解释器')
    expect(wrapper.get('[data-testid="go-to-install-python"]').exists()).toBe(true)
  })

  it('marks each previous step complete when advancing with next step', async () => {
    runtimeMock.detectPython.mockResolvedValue({ available: true, command: 'python' })
    runtimeMock.startRun.mockResolvedValue({ sessionId: 'session-1', command: 'python -u -c <code>' })

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

    expect(wrapper.findAll('.step-done')).toHaveLength(1)
  })
})
