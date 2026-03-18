export interface LessonStep {
  id: string
  type: 'text' | 'code' | 'image' | 'video' | 'quiz' | 'interactive'
  title: string
  content: string
  code?: string
  hint?: string
  options?: QuizOption[]
  correctAnswer?: string | number
}

export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface Lesson {
  id: string
  title: string
  fileName?: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number
  chapter: number
  order: number
  pseudoCode: string
  steps: LessonStep[]
  prerequisites: string[]
  tags: string[]
}

export interface Chapter {
  id: string
  title: string
  folderName: string
  description: string
  order: number
  lessons: Lesson[]
}

export interface LessonProgress {
  lessonId: string
  completed: boolean
  currentStep: number
  completedAt?: string
  score?: number
}

export interface UserProgress {
  lessons: Record<string, LessonProgress>
  totalCompleted: number
  totalTimeSpent: number
  recentLessonId: string | null
}

export interface ContentProvider {
  getChapters(): Promise<Chapter[]>
  getLessonById(id: string): Promise<Lesson | null>
}
