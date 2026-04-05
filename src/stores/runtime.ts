import { defineStore } from 'pinia'
import { pythonRuntime } from '@/services/runtime/pythonRuntime'
import type { PythonAvailability, PythonOutputEvent, PythonStateEvent, PythonRuntimeStatus } from '@/types/runtime'

function createDefaultAvailability(): PythonAvailability {
  return {
    available: false,
    command: null,
    error: null
  }
}

export const useRuntimeStore = defineStore('runtime', {
  state: () => ({
    python: createDefaultAvailability(),
    status: 'idle' as PythonRuntimeStatus,
    sessionId: null as string | null,
    terminalOutput: '',
    initialized: false
  }),

  getters: {
    canSubmitInput: (state) => state.status === 'running',
    isPythonMissing: (state) => state.status === 'python-missing'
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
      const availability = await pythonRuntime.detectPython()
      this.python = availability
      this.status = availability.available ? 'idle' : 'python-missing'
      return availability
    },

    async runCode(code: string) {
      await this.initialize()
      this.terminalOutput = ''

      const availability = await this.detectPython()
      if (!availability.available) {
        this.terminalOutput = '未检测到可用的 Python 解释器。\n请先完成安装 Python 课程，然后重新检测。'
        return false
      }

      const session = await pythonRuntime.startRun(code)
      this.sessionId = session.sessionId
      this.status = 'running'
      this.terminalOutput = `$ ${session.command}\n`
      return true
    },

    async submitInput(input: string) {
      if (!this.sessionId) {
        return
      }

      await pythonRuntime.sendInput(this.sessionId, input)
      this.terminalOutput += `> ${input}\n`
    },

    async stopRun() {
      if (!this.sessionId) {
        return
      }

      await pythonRuntime.stopRun(this.sessionId)
    },

    handleOutput(payload: PythonOutputEvent) {
      if (payload.sessionId !== this.sessionId) {
        return
      }

      this.terminalOutput += payload.chunk
    },

    handleState(payload: PythonStateEvent) {
      if (payload.sessionId !== this.sessionId) {
        return
      }

      this.status = payload.status

      if (payload.message) {
        this.terminalOutput += `${payload.message}\n`
      }

      if (payload.status === 'completed' || payload.status === 'error' || payload.status === 'stopped') {
        this.sessionId = null
      }
    },

    resetTerminal() {
      this.sessionId = null
      this.status = 'idle'
      this.terminalOutput = ''
    }
  }
})
