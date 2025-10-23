export interface Course {
  id: string
  title: string
  description: string
  category: string
  topic: string
  targetAudience?: string
  difficulty?: string
  duration?: number
  imageUrl?: string
  chapters: Chapter[]
  createdAt: Date
  updatedAt: Date
  userId: string
  progress?: CourseProgress
}

export interface Chapter {
  id: string
  title: string
  description: string
  content: string
  videoUrl?: string
  order: number
  courseId: string
  objectives?: string[]
  exercises?: string[]
  duration?: string
  completed?: boolean
  completedAt?: Date
}

export interface CourseProgress {
  courseId: string
  userId: string
  completedChapters: string[]
  totalChapters: number
  progressPercentage: number
  lastAccessedAt: Date
  completedAt?: Date
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  imageUrl?: string
  createdAt: Date
}

export interface CourseGenerationRequest {
  title: string
  description: string
  category: string
  topic: string
  targetAudience: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number // in hours
}
