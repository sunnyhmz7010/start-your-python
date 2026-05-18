import { defineStore } from 'pinia'
import { pythonRuntime } from '@/services/runtime/pythonRuntime'
import type { PythonAvailability, PythonOutputEvent, PythonStateEvent, PythonRuntimeStatus } from '@/types/runtime'

function createDefaultAvailability(): PythonAvailability {
  return {
    available: false,
    command: null,
    version: null,
    executablePath: null,
    error: null
  }
}

function formatRuntimeError(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return String(error)
}

export const useRuntimeStore = defineStore('runtime', {
  state: () => ({
    python: createDefaultAvailability(),
    status: 'idle' as PythonRuntimeStatus,
    sessionId: null as string | null,
    terminalOutput: '',
    lastRunState: null as PythonStateEvent | null,
    pendingStateEvents: {} as Record<string, PythonStateEvent>,
    initialized: false
  }),

  getters: {
    canSubmitInput: (state) => state.status === 'running',
    isPythonMissing: (state) => state.status === 'python-missing',
    isRunning: (state) => state.status === 'running',
    isBusy: (state) => state.status === 'checking' || state.status === 'starting' || state.status === 'running'
  },

  actions: {
    async initialize() {
      if (this.initialized) {
        return
      }

      await pythonRuntime.onOutput((payload) => this.handleOutput(payload))
      await pythonRuntime.onState((payload) => this.handleState(payload))
      this.initialized = true
    },

    async detectPython(force = false) {
      if (!force && (this.python.available || this.status === 'python-missing')) {
        return this.python
      }

      this.status = 'checking'
      try {
        const availability = await pythonRuntime.detectPython()
        this.python = availability
        this.status = availability.available ? 'idle' : 'python-missing'
        return availability
      } catch (error) {
        const message = formatRuntimeError(error)
        const availability = {
          available: false,
          command: null,
          version: null,
          executablePath: null,
          error: message
        }
        this.python = availability
        this.status = 'python-missing'
        this.terminalOutput += `[Runtime] Python 检测失败: ${message}\n`
        return availability
      }
    },

    async runCode(code: string) {
      await this.initialize()

      if (this.status === 'checking' || this.status === 'starting' || this.status === 'running') {
        this.terminalOutput += '[Runtime] 当前已有 Python 程序正在准备或运行，请先等待当前任务结束。\n'
        return false
      }

      this.terminalOutput = ''
      this.lastRunState = null
      this.pendingStateEvents = {}

      const availability = await this.detectPython()
      if (!availability.available) {
        if (!this.terminalOutput) {
          this.terminalOutput = '未检测到可用的 Python 解释器。\n请先完成安装 Python 课程，然后重新检测。'
        }
        return false
      }

      try {
        this.status = 'starting'
        const session = await pythonRuntime.startRun(code)
        this.sessionId = session.sessionId
        this.status = 'running'
        this.terminalOutput = `$ ${session.command}\n`
        if (availability.version) {
          this.terminalOutput += `[Runtime] ${availability.version}\n`
        }
        if (availability.executablePath) {
          this.terminalOutput += `[Runtime] ${availability.executablePath}\n`
        }
        const pendingState = this.pendingStateEvents[session.sessionId]
        if (pendingState) {
          delete this.pendingStateEvents[session.sessionId]
          this.handleState(pendingState)
        }
        return true
      } catch (error) {
        const message = formatRuntimeError(error)
        this.status = 'error'
        this.sessionId = null
        this.terminalOutput += `[Runtime] 启动 Python 失败: ${message}\n`
        return false
      }
    },

    async submitInput(input: string) {
      if (!this.sessionId) {
        return
      }

      try {
        await pythonRuntime.sendInput(this.sessionId, input)
        this.terminalOutput += `> ${input}\n`
      } catch (error) {
        this.terminalOutput += `[Runtime] 发送输入失败: ${formatRuntimeError(error)}\n`
      }
    },

    async stopRun() {
      if (!this.sessionId) {
        return
      }

      try {
        await pythonRuntime.stopRun(this.sessionId)
      } catch (error) {
        this.terminalOutput += `[Runtime] 停止 Python 失败: ${formatRuntimeError(error)}\n`
      }
    },

    handleOutput(payload: PythonOutputEvent) {
      if (payload.sessionId !== this.sessionId) {
        return
      }

      this.terminalOutput += payload.chunk
    },

    handleState(payload: PythonStateEvent) {
      if (payload.sessionId !== this.sessionId) {
        if (
          this.status === 'starting' &&
          (payload.status === 'completed' || payload.status === 'error' || payload.status === 'stopped')
        ) {
          this.pendingStateEvents[payload.sessionId] = payload
        }
        return
      }

      this.status = payload.status

      if (payload.message) {
        this.terminalOutput += `${payload.message}\n`
      }

      if (payload.status === 'completed' || payload.status === 'error' || payload.status === 'stopped') {
        const labels: Record<'completed' | 'error' | 'stopped', string> = {
          completed: '运行完成',
          error: '运行失败',
          stopped: '已停止'
        }
        const exitCode = payload.exitCode === null || payload.exitCode === undefined
          ? ''
          : `，退出码 ${payload.exitCode}`
        this.terminalOutput += `[Runtime] ${labels[payload.status]}${exitCode}\n`
        this.lastRunState = payload
        this.sessionId = null
      }
    },

    resetTerminal() {
      this.sessionId = null
      this.status = 'idle'
      this.terminalOutput = ''
      this.lastRunState = null
      this.pendingStateEvents = {}
    }
  }
})
