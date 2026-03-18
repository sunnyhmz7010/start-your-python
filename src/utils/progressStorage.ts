const STORAGE_KEY = 'start-your-python.progress'

export function loadProgressSnapshot<T>(fallback: T): T {
  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return fallback
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveProgressSnapshot<T>(value: T) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}
