import { invoke, isTauri } from '@tauri-apps/api/core'
import { listen, type UnlistenFn } from '@tauri-apps/api/event'
import type {
  PythonAvailability,
  PythonOutputEvent,
  PythonRunSession,
  PythonStateEvent
} from '@/types/runtime'

const OUTPUT_EVENT = 'python-output'
const STATE_EVENT = 'python-state'

export interface PythonRuntimeService {
  detectPython(): Promise<PythonAvailability>
  startRun(code: string): Promise<PythonRunSession>
  sendInput(sessionId: string, input: string): Promise<void>
  stopRun(sessionId: string): Promise<void>
  onOutput(callback: (payload: PythonOutputEvent) => void): Promise<UnlistenFn>
  onState(callback: (payload: PythonStateEvent) => void): Promise<UnlistenFn>
}

export function createPythonRuntimeService(): PythonRuntimeService {
  return {
    async detectPython() {
      if (!isTauri()) {
        return {
          available: false,
          error: '当前环境未运行在 Tauri 桌面壳中，无法调用系统 Python。'
        }
      }

      return invoke<PythonAvailability>('detect_python')
    },

    async startRun(code: string) {
      return invoke<PythonRunSession>('start_python_run', { code })
    },

    async sendInput(sessionId: string, input: string) {
      await invoke('send_python_input', { sessionId, input })
    },

    async stopRun(sessionId: string) {
      await invoke('stop_python_run', { sessionId })
    },

    async onOutput(callback) {
      if (!isTauri()) {
        return () => undefined
      }

      return listen<PythonOutputEvent>(OUTPUT_EVENT, (event) => {
        callback(event.payload)
      })
    },

    async onState(callback) {
      if (!isTauri()) {
        return () => undefined
      }

      return listen<PythonStateEvent>(STATE_EVENT, (event) => {
        callback(event.payload)
      })
    }
  }
}

export const pythonRuntime = createPythonRuntimeService()
