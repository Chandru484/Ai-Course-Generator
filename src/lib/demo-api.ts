import { Course, Chapter, CourseGenerationRequest } from '@/types'
import { demoCourses, demoCategories, generateMockCourse } from './demo-data'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class DemoAPIService {
  // Course Management
  static async getCourses(): Promise<Course[]> {
    await delay(500) // Simulate network delay
    return [...demoCourses]
  }

  static async getCourse(id: string): Promise<Course | null> {
    await delay(300)
    return demoCourses.find(course => course.id === id) || null
  }

  static async createCourse(courseData: Partial<Course>): Promise<Course> {
    await delay(800)
    const newCourse: Course = {
      id: Math.random().toString(36).substring(2, 15),
      title: courseData.title || 'New Course',
      description: courseData.description || 'Course description',
      category: courseData.category || 'General',
      topic: courseData.topic || 'General',
      imageUrl: courseData.imageUrl,
      chapters: courseData.chapters || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: courseData.userId || 'demo-user'
    }
    
    demoCourses.push(newCourse)
    return newCourse
  }

  static async updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
    await delay(400)
    const index = demoCourses.findIndex(course => course.id === id)
    if (index !== -1) {
      demoCourses[index] = { ...demoCourses[index], ...updates, updatedAt: new Date() }
      return demoCourses[index]
    }
    return null
  }

  static async deleteCourse(id: string): Promise<boolean> {
    await delay(300)
    const index = demoCourses.findIndex(course => course.id === id)
    if (index !== -1) {
      demoCourses.splice(index, 1)
      return true
    }
    return false
  }

  // Chapter Management
  static async getChapters(courseId: string): Promise<Chapter[]> {
    await delay(300)
    const course = demoCourses.find(c => c.id === courseId)
    return course?.chapters || []
  }

  static async createChapter(courseId: string, chapterData: Partial<Chapter>): Promise<Chapter> {
    await delay(400)
    const newChapter: Chapter = {
      id: Math.random().toString(36).substring(2, 15),
      title: chapterData.title || 'New Chapter',
      description: chapterData.description || 'Chapter description',
      content: chapterData.content || 'Chapter content',
      order: chapterData.order || 1,
      courseId,
      videoUrl: chapterData.videoUrl
    }

    const course = demoCourses.find(c => c.id === courseId)
    if (course) {
      course.chapters.push(newChapter)
      course.updatedAt = new Date()
    }

    return newChapter
  }

  // AI Course Generation (Demo)
  static async generateCourse(request: CourseGenerationRequest): Promise<Course> {
    await delay(2000) // Simulate AI processing time
    
    console.log('🤖 Demo AI: Generating course...', request)
    
    // Generate mock course based on request
    const generatedCourse = generateMockCourse(request.title, request.description, request.category)
    
    // Add some AI-generated chapters based on the request
    const aiChapters: Chapter[] = [
      {
        id: Math.random().toString(36).substring(2, 15),
        title: `Introduction to ${request.topic}`,
        description: `Get started with ${request.topic} and understand the fundamentals`,
        content: `Welcome to this comprehensive course on ${request.topic}! This course is designed for ${request.difficulty} level learners and will take approximately ${request.duration} hours to complete.`,
        order: 1,
        courseId: generatedCourse.id,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        title: `Core Concepts of ${request.topic}`,
        description: `Dive deep into the essential concepts and principles`,
        content: `In this chapter, we'll explore the core concepts that form the foundation of ${request.topic}. You'll learn about the key principles and methodologies used in this field.`,
        order: 2,
        courseId: generatedCourse.id,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        title: `Practical Applications`,
        description: `Apply your knowledge with real-world examples and projects`,
        content: `Now that you understand the fundamentals, let's put your knowledge into practice. This chapter includes hands-on exercises and real-world applications.`,
        order: 3,
        courseId: generatedCourse.id,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        title: `Advanced Topics`,
        description: `Explore advanced concepts and best practices`,
        content: `Take your skills to the next level with advanced topics and industry best practices. This chapter covers complex scenarios and optimization techniques.`,
        order: 4,
        courseId: generatedCourse.id,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        title: `Project & Assessment`,
        description: `Complete your learning with a comprehensive project`,
        content: `Cap off your learning journey with a final project that demonstrates your mastery of ${request.topic}. This assessment will help consolidate your knowledge.`,
        order: 5,
        courseId: generatedCourse.id,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    ]

    generatedCourse.chapters = aiChapters
    generatedCourse.userId = 'demo-user'
    
    // Add to demo courses
    demoCourses.push(generatedCourse)
    
    return generatedCourse
  }

  // Categories
  static async getCategories() {
    await delay(200)
    return [...demoCategories]
  }

  // YouTube Search (Demo)
  static async searchYouTubeVideos(query: string): Promise<any[]> {
    await delay(800)
    
    console.log('🎥 Demo YouTube: Searching for videos...', query)
    
    // Return mock video data
    return [
      {
        id: { videoId: 'dQw4w9WgXcQ' },
        snippet: {
          title: `${query} - Complete Tutorial`,
          description: `Learn ${query} with this comprehensive tutorial`,
          thumbnails: {
            default: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg' },
            medium: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
            high: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg' }
          }
        }
      },
      {
        id: { videoId: 'jNQXAC9IVRw' },
        snippet: {
          title: `${query} - Beginner Guide`,
          description: `Perfect for beginners learning ${query}`,
          thumbnails: {
            default: { url: 'https://img.youtube.com/vi/jNQXAC9IVRw/default.jpg' },
            medium: { url: 'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg' },
            high: { url: 'https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg' }
          }
        }
      },
      {
        id: { videoId: 'M7lc1UVf-VE' },
        snippet: {
          title: `${query} - Advanced Techniques`,
          description: `Advanced techniques and tips for ${query}`,
          thumbnails: {
            default: { url: 'https://img.youtube.com/vi/M7lc1UVf-VE/default.jpg' },
            medium: { url: 'https://img.youtube.com/vi/M7lc1UVf-VE/mqdefault.jpg' },
            high: { url: 'https://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg' }
          }
        }
      }
    ]
  }

  // File Upload (Demo)
  static async uploadFile(file: File): Promise<string> {
    await delay(1000)
    
    console.log('📁 Demo Upload: Uploading file...', file.name)
    
    // Return a mock URL
    return `https://images.unsplash.com/photo-${Math.random().toString(36).substring(7)}?w=400&h=300&fit=crop`
  }

  // Analytics (Demo)
  static async getAnalytics() {
    await delay(500)
    
    return {
      totalCourses: 12,
      totalStudents: 2847,
      totalRevenue: 15420,
      monthlyGrowth: 23.5,
      popularCategories: [
        { name: 'Programming', count: 45, percentage: 35 },
        { name: 'Design', count: 32, percentage: 25 },
        { name: 'Business', count: 28, percentage: 22 },
        { name: 'Marketing', count: 23, percentage: 18 }
      ],
      recentActivity: [
        { type: 'course_created', message: 'New course "Advanced React Patterns" created', timestamp: new Date() },
        { type: 'student_enrolled', message: '15 new students enrolled in "UI/UX Design"', timestamp: new Date() },
        { type: 'revenue', message: '$450 earned this week', timestamp: new Date() }
      ]
    }
  }
}
