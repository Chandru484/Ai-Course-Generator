import { Course, Chapter, Category, CourseProgress } from '@/types'

// Local storage service for persisting courses and content
export class StorageService {
  private static readonly COURSES_KEY = 'ai_course_generator_courses'
  private static readonly USER_KEY = 'ai_course_generator_user'
  private static readonly SETTINGS_KEY = 'ai_course_generator_settings'
  private static readonly PROGRESS_KEY = 'ai_course_generator_progress'

  // Course management
  static async saveCourse(course: Course): Promise<Course> {
    try {
      const courses = await this.getCourses()
      const existingIndex = courses.findIndex(c => c.id === course.id)
      
      if (existingIndex >= 0) {
        courses[existingIndex] = { ...course, updatedAt: new Date() }
      } else {
        courses.push(course)
      }
      
      localStorage.setItem(this.COURSES_KEY, JSON.stringify(courses))
      return course
    } catch (error) {
      console.error('Error saving course:', error)
      throw error
    }
  }

  static async getCourses(): Promise<Course[]> {
    try {
      const coursesData = localStorage.getItem(this.COURSES_KEY)
      if (!coursesData) return []
      
      const courses = JSON.parse(coursesData)
      // Convert date strings back to Date objects
      return courses.map((course: any) => ({
        ...course,
        createdAt: new Date(course.createdAt),
        updatedAt: new Date(course.updatedAt),
        chapters: course.chapters.map((chapter: any) => ({
          ...chapter,
          // Ensure all chapter properties are present
          objectives: chapter.objectives || [],
          exercises: chapter.exercises || [],
          duration: chapter.duration || '15-20 minutes'
        }))
      }))
    } catch (error) {
      console.error('Error loading courses:', error)
      return []
    }
  }

  static async getCourse(id: string): Promise<Course | null> {
    try {
      const courses = await this.getCourses()
      return courses.find(course => course.id === id) || null
    } catch (error) {
      console.error('Error getting course:', error)
      return null
    }
  }

  static async deleteCourse(id: string): Promise<boolean> {
    try {
      const courses = await this.getCourses()
      const filteredCourses = courses.filter(course => course.id !== id)
      localStorage.setItem(this.COURSES_KEY, JSON.stringify(filteredCourses))
      return true
    } catch (error) {
      console.error('Error deleting course:', error)
      return false
    }
  }

  static async getChapters(courseId: string): Promise<Chapter[]> {
    try {
      const course = await this.getCourse(courseId)
      return course?.chapters || []
    } catch (error) {
      console.error('Error getting chapters:', error)
      return []
    }
  }

  // User management
  static async getCurrentUser(): Promise<{ id: string; name: string; email: string } | null> {
    try {
      const userData = localStorage.getItem(this.USER_KEY)
      if (!userData) return null
      return JSON.parse(userData)
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  static async setCurrentUser(user: { id: string; name: string; email: string }): Promise<void> {
    try {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    } catch (error) {
      console.error('Error setting current user:', error)
    }
  }

  // Course analytics and statistics
  static async getCourseStats(): Promise<{
    totalCourses: number
    totalChapters: number
    totalDuration: number
    categoriesCount: number
    recentCourses: Course[]
    categoryBreakdown: { [key: string]: number }
  }> {
    try {
      const courses = await this.getCourses()
      const totalChapters = courses.reduce((sum, course) => sum + course.chapters.length, 0)
      const totalDuration = courses.reduce((sum, course) => sum + (course.duration || 0), 0)
      
      const categories = courses.map(course => course.category)
      const categoryBreakdown = categories.reduce((acc, category) => {
        acc[category] = (acc[category] || 0) + 1
        return acc
      }, {} as { [key: string]: number })

      const recentCourses = courses
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 5)

      return {
        totalCourses: courses.length,
        totalChapters,
        totalDuration,
        categoriesCount: Object.keys(categoryBreakdown).length,
        recentCourses,
        categoryBreakdown
      }
    } catch (error) {
      console.error('Error getting course stats:', error)
      return {
        totalCourses: 0,
        totalChapters: 0,
        totalDuration: 0,
        categoriesCount: 0,
        recentCourses: [],
        categoryBreakdown: {}
      }
    }
  }

  // Export/Import functionality
  static async exportCourses(): Promise<string> {
    try {
      const courses = await this.getCourses()
      const user = await this.getCurrentUser()
      const exportData = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        user: user,
        courses: courses
      }
      return JSON.stringify(exportData, null, 2)
    } catch (error) {
      console.error('Error exporting courses:', error)
      throw error
    }
  }

  static async importCourses(jsonData: string): Promise<{ imported: number; errors: string[] }> {
    try {
      const importData = JSON.parse(jsonData)
      const courses = importData.courses || []
      const errors: string[] = []
      let imported = 0

      for (const course of courses) {
        try {
          // Validate course structure
          if (!course.id || !course.title || !course.chapters) {
            errors.push(`Invalid course structure: ${course.title || 'Unknown'}`)
            continue
          }

          // Convert date strings to Date objects
          const processedCourse = {
            ...course,
            createdAt: new Date(course.createdAt),
            updatedAt: new Date(course.updatedAt),
            chapters: course.chapters.map((chapter: any) => ({
              ...chapter,
              objectives: chapter.objectives || [],
              exercises: chapter.exercises || [],
              duration: chapter.duration || '15-20 minutes'
            }))
          }

          await this.saveCourse(processedCourse)
          imported++
        } catch (error) {
          errors.push(`Failed to import course: ${course.title || 'Unknown'}`)
        }
      }

      return { imported, errors }
    } catch (error) {
      console.error('Error importing courses:', error)
      throw error
    }
  }

  // Progress tracking methods
  static async getCourseProgress(courseId: string, userId: string): Promise<CourseProgress | null> {
    try {
      const progressData = localStorage.getItem(this.PROGRESS_KEY)
      if (!progressData) return null
      
      const progressRecords = JSON.parse(progressData)
      const progress = progressRecords.find((p: any) => p.courseId === courseId && p.userId === userId)
      
      if (progress) {
        return {
          ...progress,
          lastAccessedAt: new Date(progress.lastAccessedAt),
          completedAt: progress.completedAt ? new Date(progress.completedAt) : undefined
        }
      }
      
      return null
    } catch (error) {
      console.error('Error getting course progress:', error)
      return null
    }
  }

  static async saveCourseProgress(progress: CourseProgress): Promise<CourseProgress> {
    try {
      const progressData = localStorage.getItem(this.PROGRESS_KEY)
      let progressRecords = progressData ? JSON.parse(progressData) : []
      
      const existingIndex = progressRecords.findIndex((p: any) => 
        p.courseId === progress.courseId && p.userId === progress.userId
      )
      
      if (existingIndex >= 0) {
        progressRecords[existingIndex] = progress
      } else {
        progressRecords.push(progress)
      }
      
      localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(progressRecords))
      return progress
    } catch (error) {
      console.error('Error saving course progress:', error)
      throw error
    }
  }

  static async markChapterComplete(courseId: string, chapterId: string, userId: string): Promise<CourseProgress> {
    try {
      let progress = await this.getCourseProgress(courseId, userId)
      
      if (!progress) {
        // Create new progress record
        progress = {
          courseId,
          userId,
          completedChapters: [chapterId],
          totalChapters: 0, // Will be updated below
          progressPercentage: 0,
          lastAccessedAt: new Date()
        }
      } else {
        // Add chapter to completed list if not already there
        if (!progress.completedChapters.includes(chapterId)) {
          progress.completedChapters.push(chapterId)
        }
        progress.lastAccessedAt = new Date()
      }
      
      // Get course to determine total chapters
      const course = await this.getCourse(courseId)
      if (course) {
        progress.totalChapters = course.chapters.length
        progress.progressPercentage = Math.round((progress.completedChapters.length / progress.totalChapters) * 100)
        
        // Mark course as completed if all chapters are done
        if (progress.completedChapters.length === progress.totalChapters) {
          progress.completedAt = new Date()
        }
      }
      
      return await this.saveCourseProgress(progress)
    } catch (error) {
      console.error('Error marking chapter complete:', error)
      throw error
    }
  }

  static async markChapterIncomplete(courseId: string, chapterId: string, userId: string): Promise<CourseProgress> {
    try {
      const progress = await this.getCourseProgress(courseId, userId)
      
      if (progress) {
        progress.completedChapters = progress.completedChapters.filter(id => id !== chapterId)
        progress.lastAccessedAt = new Date()
        progress.completedAt = undefined // Remove completion date
        
        // Recalculate progress percentage
        const course = await this.getCourse(courseId)
        if (course) {
          progress.totalChapters = course.chapters.length
          progress.progressPercentage = Math.round((progress.completedChapters.length / progress.totalChapters) * 100)
        }
        
        return await this.saveCourseProgress(progress)
      }
      
      throw new Error('Progress record not found')
    } catch (error) {
      console.error('Error marking chapter incomplete:', error)
      throw error
    }
  }

  static async getAllUserProgress(userId: string): Promise<CourseProgress[]> {
    try {
      const progressData = localStorage.getItem(this.PROGRESS_KEY)
      if (!progressData) return []
      
      const progressRecords = JSON.parse(progressData)
      const userProgress = progressRecords.filter((p: any) => p.userId === userId)
      
      return userProgress.map((progress: any) => ({
        ...progress,
        lastAccessedAt: new Date(progress.lastAccessedAt),
        completedAt: progress.completedAt ? new Date(progress.completedAt) : undefined
      }))
    } catch (error) {
      console.error('Error getting user progress:', error)
      return []
    }
  }

  // Search courses
  static async searchCourses(query: string): Promise<Course[]> {
    try {
      const courses = await this.getCourses()
      const lowerQuery = query.toLowerCase()
      
      return courses.filter(course => 
        course.title.toLowerCase().includes(lowerQuery) ||
        course.description.toLowerCase().includes(lowerQuery) ||
        course.topic.toLowerCase().includes(lowerQuery) ||
        course.category.toLowerCase().includes(lowerQuery) ||
        course.chapters.some(chapter => 
          chapter.title.toLowerCase().includes(lowerQuery) ||
          chapter.content.toLowerCase().includes(lowerQuery)
        )
      )
    } catch (error) {
      console.error('Error searching courses:', error)
      return []
    }
  }

  // Get courses by category
  static async getCoursesByCategory(category: string): Promise<Course[]> {
    try {
      const courses = await this.getCourses()
      return courses.filter(course => course.category === category)
    } catch (error) {
      console.error('Error getting courses by category:', error)
      return []
    }
  }

  // Get recent courses
  static async getRecentCourses(limit: number = 5): Promise<Course[]> {
    try {
      const courses = await this.getCourses()
      return courses
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, limit)
    } catch (error) {
      console.error('Error getting recent courses:', error)
      return []
    }
  }

  // Clear all data
  static async clearAllData(): Promise<void> {
    try {
      localStorage.removeItem(this.COURSES_KEY)
      localStorage.removeItem(this.USER_KEY)
      localStorage.removeItem(this.SETTINGS_KEY)
      localStorage.removeItem(this.PROGRESS_KEY)
    } catch (error) {
      console.error('Error clearing data:', error)
    }
  }
}
