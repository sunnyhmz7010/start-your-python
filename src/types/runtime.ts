export type PythonRuntimeStatus =
  | 'idle'
  | 'checking'
  | 'starting'
  | 'python-missing'
  | 'running'
  | 'stopping'
  | 'completed'
  | 'error'
  | 'stopped'

export interface PythonAvailability {
  available: boolean
  command?: string | null
  version?: string | null
  executablePath?: string | null
  error?: string | null
}

export interface PythonRunSession {
  sessionId: string
  command: string
}

export interface PythonOutputEvent {
  sessionId: string
  stream: 'stdout' | 'stderr'
  chunk: string
}

export interface PythonStateEvent {
  sessionId: string
  status: Extract<PythonRuntimeStatus, 'running' | 'completed' | 'error' | 'stopped'>
  exitCode?: number | null
  message?: string | null
}
