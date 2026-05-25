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

const contentProviderMock = vi.hoisted(() => ({
  getChaptersWithStatus: vi.fn()
}))

vi.mock('@/services/content/localContentProvider', () => {
  return { localContentProvider: contentProviderMock }
})

async function waitForWorkspace() {
  await flushPromises()
}

async function waitForEditor(wrapper: ReturnType<typeof mount>) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    await flushPromises()
    if (wrapper.find('[data-testid="editor-input"]').exists()) {
      return
    }
    await new Promise((resolve) => setTimeout(resolve, 20))
  }
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
    contentProviderMock.getChaptersWithStatus.mockReset()
    contentProviderMock.getChaptersWithStatus.mockImplementation(async () => {
      const { getBundledCourseFileChapters } = await import('@/services/content/courseFiles')
      return {
        chapters: await getBundledCourseFileChapters(),
        status: {
          source: 'bundled',
          warning: null
        }
      }
    })
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
    await waitForEditor(wrapper)

    expect(wrapper.get('[data-testid="editor-input"]').element).toBeTruthy()
    expect(wrapper.text()).toContain('项目')
    expect(wrapper.find('[data-testid="editor-run-button"]').exists()).toBe(false)
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
    await waitForEditor(wrapper)

    const editor = wrapper.get('[data-testid="editor-input"]')
    await editor.setValue('print("edited")')

    expect((editor.element as HTMLTextAreaElement).value).toContain('edited')
  })

  it('enters lesson run mode without starting python from the top button', async () => {
    runtimeMock.detectPython.mockResolvedValue({
      available: true,
      command: 'python',
      version: 'Python 3.12.0',
      executablePath: 'C:/Python312/python.exe'
    })
    runtimeMock.startRun.mockResolvedValue({ sessionId: 'session-1', command: 'python -u -c <code>' })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()
    await waitForEditor(wrapper)
    const editor = wrapper.get('[data-testid="editor-input"]')
    await editor.setValue('print("edited from editor")')
    await wrapper.get('[data-testid="run-button"]').trigger('click')
    await flushPromises()

    expect(runtimeMock.startRun).not.toHaveBeenCalled()
    expect(wrapper.find('[data-testid="run-lesson-view"]').exists()).toBe(true)
    expect(wrapper.get('[data-testid="tool-tab-terminal"]').classes()).toContain('active')
    expect(wrapper.text()).toContain('当前步骤')
  })

  it('switches to lesson content without executing python from the main run button', async () => {
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

    expect(runtimeMock.startRun).not.toHaveBeenCalled()
    expect(wrapper.get('[data-testid="tool-tab-terminal"]').classes()).toContain('active')
    expect(wrapper.text()).toContain('当前步骤')
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

    runtimeMock.emitState({ sessionId: 'session-1', status: 'completed', exitCode: 0 })
    await flushPromises()

    expect(wrapper.findAll('.step-done')).toHaveLength(1)
    expect(wrapper.get('[data-testid="lesson-progress-summary"]').text()).toContain('1 /')
  })

  it('runs pasted python code from the bottom terminal when no process is active', async () => {
    runtimeMock.detectPython.mockResolvedValue({ available: true, command: 'python' })
    runtimeMock.startRun.mockResolvedValue({ sessionId: 'session-1', command: 'python -u -c <code>' })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()
    await waitForEditor(wrapper)

    await wrapper.get('[data-testid="terminal-input"]').setValue('print("terminal")')
    await wrapper.get('[data-testid="terminal-form"]').trigger('submit')
    await flushPromises()

    expect(runtimeMock.startRun).toHaveBeenCalledWith('print("terminal")')
  })

  it('sends bottom terminal input to stdin while python is running', async () => {
    runtimeMock.detectPython.mockResolvedValue({ available: true, command: 'python' })
    runtimeMock.startRun.mockResolvedValue({ sessionId: 'session-1', command: 'python -u -c <code>' })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()
    await waitForEditor(wrapper)

    await wrapper.get('[data-testid="terminal-input"]').setValue('name = input()')
    await wrapper.get('[data-testid="terminal-form"]').trigger('submit')
    await flushPromises()
    await wrapper.get('[data-testid="terminal-input"]').setValue('Sunny')
    await wrapper.get('[data-testid="terminal-form"]').trigger('submit')
    await flushPromises()

    expect(runtimeMock.startRun).toHaveBeenCalledWith('name = input()')
    expect(runtimeMock.sendInput).toHaveBeenCalledWith('session-1', 'Sunny')
  })

  it('marks a lesson step complete even when python exits immediately after start', async () => {
    runtimeMock.detectPython.mockResolvedValue({ available: true, command: 'python' })
    runtimeMock.startRun.mockImplementation(async () => {
      const session = { sessionId: 'session-1', command: 'python -u -c <code>' }
      queueMicrotask(() => {
        runtimeMock.emitState({ sessionId: session.sessionId, status: 'completed', exitCode: 0 })
      })
      return session
    })

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
    runtimeMock.emitState({ sessionId: 'session-1', status: 'completed', exitCode: 0 })
    await flushPromises()

    expect(wrapper.findAll('.step-done')).toHaveLength(1)
    expect(wrapper.get('[data-testid="lesson-progress-summary"]').text()).toContain('1 /')
  })

  it('does not complete a lesson step when the python run fails', async () => {
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
    runtimeMock.emitState({ sessionId: 'session-1', status: 'completed', exitCode: 0 })
    await flushPromises()

    await wrapper.get('[data-testid="step-run-button"]').trigger('click')
    await flushPromises()

    runtimeMock.emitState({ sessionId: 'session-1', status: 'error', exitCode: 1 })
    await flushPromises()

    expect(wrapper.findAll('.step-done')).toHaveLength(0)
    expect(wrapper.get('[data-testid="lesson-progress-summary"]').text()).toContain('0 /')
  })

  it('disables run actions while python is running', async () => {
    runtimeMock.detectPython.mockResolvedValue({ available: true, command: 'python' })
    runtimeMock.startRun.mockResolvedValue({ sessionId: 'session-1', command: 'python -u -c <code>' })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()
    await waitForEditor(wrapper)
    await wrapper.get('[data-testid="run-button"]').trigger('click')
    await flushPromises()

    expect(wrapper.get('[data-testid="run-button"]').attributes('disabled')).toBeDefined()
  })

  it('shows python preparation states on run buttons', async () => {
    let resolveDetection!: (value: { available: true; command: string }) => void
    runtimeMock.detectPython.mockReturnValue(new Promise((resolve) => {
      resolveDetection = resolve
    }))
    runtimeMock.startRun.mockResolvedValue({ sessionId: 'session-1', command: 'python -u -c <code>' })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await flushPromises()
    await waitForEditor(wrapper)
    await wrapper.get('[data-testid="run-button"]').trigger('click')
    await flushPromises()

    expect(wrapper.get('[data-testid="run-button"]').text()).toBe('运行课程')
    expect(wrapper.get('[data-testid="run-button"]').attributes('disabled')).toBeDefined()

    resolveDetection({ available: true, command: 'python' })
    await flushPromises()

    let resolveStart!: (value: { sessionId: string; command: string }) => void
    runtimeMock.startRun.mockReturnValue(new Promise((resolve) => {
      resolveStart = resolve
    }))
    await wrapper.get('[data-testid="step-run-button"]').trigger('click')
    await flushPromises()

    expect(wrapper.get('[data-testid="run-button"]').text()).toBe('运行课程')
    expect(wrapper.get('[data-testid="step-run-button"]').text()).toBe('启动中...')
    expect(wrapper.get('[data-testid="step-run-button"]').attributes('disabled')).toBeDefined()

    resolveStart({ sessionId: 'session-2', command: 'python -u -c <code>' })
    await flushPromises()

    expect(wrapper.get('[data-testid="run-button"]').text()).toBe('运行课程')
    expect(wrapper.get('[data-testid="step-run-button"]').text()).toBe('运行中...')
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
    expect(wrapper.get('[data-testid="lesson-progress-summary"]').text()).toContain('0 /')

    await wrapper.get('.actions .primary').trigger('click')
    await flushPromises()

    expect(wrapper.findAll('.step-done')).toHaveLength(1)
    expect(wrapper.get('[data-testid="lesson-progress-summary"]').text()).toContain('1 /')
  })

  it('shows a visible problem when external lesson loading falls back to bundled lessons', async () => {
    runtimeMock.detectPython.mockResolvedValue({ available: true, command: 'python' })
    contentProviderMock.getChaptersWithStatus.mockResolvedValue({
      chapters: [
        {
          id: 'chapter-1',
          title: '第一章',
          folderName: '第一章',
          description: 'desc',
          order: 1,
          lessons: [
            {
              id: 'lesson_syntax_hello_world',
              title: 'Hello World',
              chapterTitle: '第一章',
              chapterOrder: 1,
              fileName: 'Hello World.py',
              description: 'desc',
              difficulty: 'beginner',
              estimatedTime: 5,
              chapter: 1,
              order: 1,
              pseudoCode: 'print("hello")',
              steps: [],
              prerequisites: [],
              tags: [],
              references: []
            }
          ]
        }
      ],
      status: {
        source: 'bundled',
        warning: {
          message: '外部课程目录加载失败，已切换到内置课程。',
          detail: 'missing lessons'
        }
      }
    })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()
    await waitForEditor(wrapper)

    expect(wrapper.get('[data-testid="tool-tab-problems"]').classes()).toContain('active')
    expect(wrapper.text()).toContain('外部课程目录加载失败')
    expect(wrapper.text()).toContain('missing lessons')
    expect(wrapper.get('[data-testid="content-source-warning"]').text()).toContain('外部课程目录加载失败')
  })

  it('marks a quiz step complete after the correct answer in run mode', async () => {
    runtimeMock.detectPython.mockResolvedValue({ available: true, command: 'python' })
    contentProviderMock.getChaptersWithStatus.mockResolvedValue({
      chapters: [
        {
          id: 'chapter-1',
          title: '第一章',
          folderName: '第一章',
          description: 'desc',
          order: 1,
          lessons: [
            {
              id: 'lesson_quiz_demo',
              title: 'Quiz Demo',
              chapterTitle: '第一章',
              chapterOrder: 1,
              fileName: 'Quiz Demo.py',
              description: 'desc',
              difficulty: 'beginner',
              estimatedTime: 5,
              chapter: 1,
              order: 1,
              pseudoCode: '# quiz',
              steps: [
                {
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
              ],
              prerequisites: [],
              tags: [],
              references: []
            }
          ]
        }
      ],
      status: {
        source: 'bundled',
        warning: null
      }
    })
    localStorage.setItem('start-your-python.progress', JSON.stringify({
      lessons: {},
      totalCompleted: 0,
      totalTimeSpent: 0,
      recentLessonId: 'lesson_quiz_demo'
    }))

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForWorkspace()
    await wrapper.get('[data-testid="run-button"]').trigger('click')
    await flushPromises()

    expect(wrapper.get('[data-testid="quiz-step"]').text()).toContain('print()')

    await wrapper.findAll('[data-testid="quiz-step"] button')[0].trigger('click')
    await flushPromises()

    expect(wrapper.text()).toContain('回答正确')
    expect(wrapper.findAll('.step-done')).toHaveLength(1)
    const savedProgress = JSON.parse(localStorage.getItem('start-your-python.progress') ?? '{}')
    expect(savedProgress.lessons.lesson_quiz_demo.stepStates.q1).toBe(true)
    expect(savedProgress.lessons.lesson_quiz_demo.completed).toBe(true)
  })
})
