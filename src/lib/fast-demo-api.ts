import { Course, Chapter, CourseGenerationRequest, Category } from '@/types'

// Fast demo API with immediate responses
export class FastDemoAPIService {
  // Course Management
  static async getCourses(): Promise<Course[]> {
    // Return immediately with mock data
    return [
      {
        id: '1',
        title: 'React Fundamentals',
        description: 'Learn React from the ground up with practical examples',
        category: 'Programming',
        topic: 'React',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
        chapters: [
          {
            id: '1-1',
            title: 'Introduction to React',
            description: 'Getting started with React',
            content: 'React is a JavaScript library for building user interfaces.',
            order: 1,
            courseId: '1',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'demo-user'
      },
      {
        id: '2',
        title: 'JavaScript ES6+',
        description: 'Modern JavaScript features and best practices',
        category: 'Programming',
        topic: 'JavaScript',
        imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop',
        chapters: [
          {
            id: '2-1',
            title: 'Arrow Functions',
            description: 'Learn about arrow functions',
            content: 'Arrow functions provide a concise syntax for writing functions.',
            order: 1,
            courseId: '2',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'demo-user'
      }
    ]
  }

  static async getCourse(id: string): Promise<Course | null> {
    const courses = await this.getCourses()
    return courses.find(course => course.id === id) || null
  }

  static async getChapters(courseId: string): Promise<Chapter[]> {
    const course = await this.getCourse(courseId)
    return course?.chapters || []
  }

  static async deleteCourse(id: string): Promise<boolean> {
    console.log(`Demo: Deleting course ${id}`)
    return true
  }

  // AI Course Generation (Fast Demo)
  static async generateCourse(request: CourseGenerationRequest): Promise<Course> {
    console.log('🚀 Fast Demo: Generating course...', request)
    
    // Simulate a quick generation process
    await new Promise(resolve => setTimeout(resolve, 1500)) // 1.5 seconds instead of 2
    
    const courseId = Math.random().toString(36).substring(2, 15)
    
    // Generate chapters based on the request
    const chapters: Chapter[] = [
      {
        id: Math.random().toString(36).substring(2, 15),
        title: `Introduction to ${request.topic}`,
        description: `Get started with ${request.topic} and understand the fundamentals`,
        content: `Welcome to this comprehensive course on ${request.topic}! This course is designed for ${request.difficulty} level learners and will take approximately ${request.duration} hours to complete.

In this chapter, you'll learn:
• Basic concepts of ${request.topic}
• Why ${request.topic} is important
• How to get started with ${request.topic}

This course is perfect for ${request.targetAudience} who want to learn ${request.topic} effectively.`,
        order: 1,
        courseId: courseId,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        title: `Core Concepts of ${request.topic}`,
        description: `Dive deep into the essential concepts and principles`,
        content: `Now that you understand the basics, let's explore the core concepts that form the foundation of ${request.topic}.

Key topics covered:
• Fundamental principles of ${request.topic}
• Common patterns and methodologies
• Best practices for ${request.topic}
• Common pitfalls to avoid

By the end of this chapter, you'll have a solid understanding of the core concepts that will help you throughout your ${request.topic} journey.`,
        order: 2,
        courseId: courseId,
        videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw'
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        title: `Practical Applications`,
        description: `Apply your knowledge with real-world examples and projects`,
        content: `Theory is important, but practice makes perfect! In this chapter, we'll apply what you've learned about ${request.topic} to real-world scenarios.

What you'll build:
• A practical project using ${request.topic}
• Real-world examples and case studies
• Hands-on exercises and challenges
• Tips for troubleshooting common issues

This hands-on approach will help you solidify your understanding and build confidence in using ${request.topic}.`,
        order: 3,
        courseId: courseId,
        videoUrl: 'https://www.youtube.com/watch?v=M7lc1UVf-VE'
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        title: `Advanced Topics`,
        description: `Explore advanced concepts and best practices`,
        content: `Ready to take your ${request.topic} skills to the next level? This chapter covers advanced topics and industry best practices.

Advanced concepts include:
• Complex scenarios and edge cases
• Performance optimization techniques
• Integration with other technologies
• Industry best practices and standards
• Future trends in ${request.topic}

These advanced topics will help you become a proficient ${request.topic} developer.`,
        order: 4,
        courseId: courseId,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        title: `Project & Assessment`,
        description: `Complete your learning with a comprehensive project`,
        content: `Time to put everything together! This final chapter includes a comprehensive project that demonstrates your mastery of ${request.topic}.

Your final project will:
• Combine all the concepts you've learned
• Challenge you to solve real problems
• Provide a portfolio piece to showcase your skills
• Include a self-assessment to track your progress

Completing this project will give you confidence in your ${request.topic} abilities and prepare you for real-world applications.`,
        order: 5,
        courseId: courseId,
        videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw'
      }
    ]

    const generatedCourse: Course = {
      id: courseId,
      title: request.title || `Complete ${request.topic} Course`,
      description: request.description || `A comprehensive course covering ${request.topic} from basics to advanced topics, designed for ${request.difficulty} level learners.`,
      category: request.category,
      topic: request.topic,
      targetAudience: request.targetAudience,
      difficulty: request.difficulty,
      duration: request.duration,
      imageUrl: `https://images.unsplash.com/photo-${Math.random().toString(36).substring(7)}?w=400&h=300&fit=crop`,
      chapters: chapters,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'demo-user'
    }
    
    return generatedCourse
  }

  // Categories
  static async getCategories(): Promise<Category[]> {
    return [
      { id: '1', name: 'Programming', description: 'Learn programming languages and development' },
      { id: '2', name: 'Design', description: 'UI/UX design and visual arts' },
      { id: '3', name: 'Business', description: 'Business skills and entrepreneurship' },
      { id: '4', name: 'Marketing', description: 'Digital marketing and advertising' },
      { id: '5', name: 'Data Science', description: 'Data analysis and machine learning' },
      { id: '6', name: 'Photography', description: 'Photography techniques and editing' }
    ]
  }

  // Analytics
  static async getAnalytics() {
    return {
      totalCourses: 8,
      totalStudents: 1247,
      totalRevenue: 8920,
      monthlyGrowth: 18.5,
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
