import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useRuntimeStore } from '@/stores/runtime'
import type { PythonOutputEvent, PythonStateEvent } from '@/types/runtime'

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

describe('runtime store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    runtimeMock.reset()
    runtimeMock.detectPython.mockReset()
    runtimeMock.startRun.mockReset()
    runtimeMock.sendInput.mockReset()
    runtimeMock.stopRun.mockReset()
    runtimeMock.onOutput.mockClear()
    runtimeMock.onState.mockClear()
  })

  it('starts a run and appends stdout chunks to the terminal buffer', async () => {
    const store = useRuntimeStore()

    runtimeMock.detectPython.mockResolvedValue({ available: true, command: 'python' })
    runtimeMock.startRun.mockResolvedValue({ sessionId: 'session-1', command: 'python -u -c <code>' })

    await store.runCode('print("hello")')
    runtimeMock.emitOutput({ sessionId: 'session-1', stream: 'stdout', chunk: 'hello\n' })

    expect(store.terminalOutput).toContain('hello')
    expect(store.status).toBe('running')
  })

  it('sends terminal input to a running python session', async () => {
    const store = useRuntimeStore()

    runtimeMock.detectPython.mockResolvedValue({ available: true, command: 'python' })
    runtimeMock.startRun.mockResolvedValue({ sessionId: 'session-1', command: 'python -u -c <code>' })

    await store.runCode('name = input()')
    await store.submitInput('Sunny')

    expect(runtimeMock.sendInput).toHaveBeenCalledWith('session-1', 'Sunny')
    expect(store.terminalOutput).toContain('> Sunny')
  })

  it('enters python-missing state when no interpreter is available', async () => {
    const store = useRuntimeStore()

    runtimeMock.detectPython.mockResolvedValue({ available: false, error: 'Python not found' })

    const result = await store.runCode('print("hello")')

    expect(result).toBe(false)
    expect(store.status).toBe('python-missing')
    expect(store.terminalOutput).toContain('未检测到可用的 Python 解释器')
  })
})
