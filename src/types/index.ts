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
