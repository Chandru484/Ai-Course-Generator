import { CourseGenerationRequest, Course, Chapter } from '@/types'

export async function generateCourse(request: CourseGenerationRequest): Promise<Course> {
  const response = await fetch('/api/ai/generate-course', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error('Failed to generate course')
  }

  return response.json()
}

export async function generateChapterContent(
  courseTitle: string,
  chapterTitle: string,
  previousChapters: Chapter[]
): Promise<string> {
  const response = await fetch('/api/ai/generate-chapter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      courseTitle,
      chapterTitle,
      previousChapters,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate chapter content')
  }

  const data = await response.json()
  return data.content
}

export function generateCoursePrompt(request: CourseGenerationRequest): string {
  return `
    Create a comprehensive course outline for the following specifications:
    
    Title: ${request.title}
    Description: ${request.description}
    Category: ${request.category}
    Topic: ${request.topic}
    Target Audience: ${request.targetAudience}
    Difficulty Level: ${request.difficulty}
    Duration: ${request.duration} hours
    
    Please generate a structured course with 6-10 chapters that progressively build knowledge from basic concepts to advanced topics. Each chapter should include:
    - A clear, descriptive title
    - A brief description of what will be covered
    - Key learning objectives
    - Estimated duration (in minutes)
    
    The course should be well-structured and suitable for ${request.difficulty} level learners.
  `
}
