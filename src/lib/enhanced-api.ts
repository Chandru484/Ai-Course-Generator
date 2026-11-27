import { Course, Chapter, CourseGenerationRequest, Category } from '@/types'

// Enhanced API service with real OpenAI integration and better content generation
export class EnhancedAPIService {
  
  // Real OpenAI API integration for course generation
  static async generateCourseWithOpenAI(request: CourseGenerationRequest): Promise<Chapter[]> {
    const apiKey = process.env.OPENAI_API_KEY
    
    if (!apiKey) {
      console.warn('OpenAI API key not found, using enhanced demo content')
      return this.generateEnhancedDemoContent(request)
    }

    try {
      const prompt = `
Create a comprehensive, practical course outline for "${request.title}" with the following specifications:

COURSE DETAILS:
- Title: ${request.title}
- Description: ${request.description}
- Category: ${request.category}
- Topic: ${request.topic}
- Target Audience: ${request.targetAudience}
- Difficulty Level: ${request.difficulty}
- Duration: ${request.duration} hours

REQUIREMENTS:
1. Create 5-7 detailed chapters that build upon each other
2. Each chapter should have:
   - A clear, engaging title
   - A brief description (1-2 sentences)
   - Detailed learning content (300-500 words)
   - Specific learning objectives
   - Practical examples or exercises
3. Make the content practical and actionable
4. Include real-world applications
5. Ensure progression from basic to advanced concepts
6. Make it suitable for ${request.difficulty} level learners

RESPONSE FORMAT (JSON):
{
  "chapters": [
    {
      "title": "Chapter Title",
      "description": "Brief description of what students will learn",
      "content": "Detailed educational content with practical examples",
      "objectives": ["Objective 1", "Objective 2", "Objective 3"],
      "exercises": ["Exercise 1", "Exercise 2"],
      "duration": "estimated time in minutes"
    }
  ]
}

Make the content engaging, practical, and immediately useful for learners.
`

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4', // Using GPT-4 for better content quality
          messages: [
            {
              role: 'system',
              content: 'You are an expert course designer and educator with years of experience creating engaging, practical learning content. Create comprehensive, actionable course content that learners can immediately apply.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      const data = await response.json()
      const content = data.choices[0]?.message?.content

      if (!content) {
        throw new Error('No content generated')
      }

      // Parse the JSON response
      const parsedContent = JSON.parse(content)
      return parsedContent.chapters.map((chapter: any, index: number) => ({
        id: Math.random().toString(36).substring(2, 15),
        title: chapter.title,
        description: chapter.description,
        content: chapter.content,
        objectives: chapter.objectives || [],
        exercises: chapter.exercises || [],
        duration: chapter.duration || '15-20 minutes',
        order: index + 1,
        courseId: '', // Will be set later
        videoUrl: ''
      }))
    } catch (error) {
      console.error('OpenAI API error:', error)
      return this.generateEnhancedDemoContent(request)
    }
  }

  // Enhanced demo content when API is not available
  static generateEnhancedDemoContent(request: CourseGenerationRequest): Chapter[] {
    const baseChapters = [
      {
        title: `Introduction to ${request.topic}`,
        description: `Get started with ${request.topic} and understand the fundamentals`,
        content: `Welcome to this comprehensive course on ${request.topic}! This course is specifically designed for ${request.targetAudience} who want to learn ${request.topic} effectively.

What you'll learn in this course:
• Core concepts and principles of ${request.topic}
• Practical applications and real-world examples
• Best practices and industry standards
• Common pitfalls and how to avoid them
• Advanced techniques and optimization strategies

Course Structure:
This ${request.duration}-hour course is structured to take you from ${request.difficulty} level to intermediate proficiency in ${request.topic}. Each chapter builds upon the previous one, ensuring a solid foundation before moving to more advanced topics.

Prerequisites:
• Basic understanding of related concepts (we'll cover the essentials)
• Willingness to practice and apply what you learn
• Access to the tools and resources we'll discuss

By the end of this course, you'll have:
• A solid understanding of ${request.topic} fundamentals
• Practical skills you can apply immediately
• Confidence to tackle real-world ${request.topic} challenges
• A foundation for continued learning and growth

Let's begin your journey into ${request.topic}!`,
        objectives: [
          `Understand the fundamental concepts of ${request.topic}`,
          `Identify key principles and methodologies`,
          `Recognize the importance and applications of ${request.topic}`
        ],
        exercises: [
          `Create a simple ${request.topic} example`,
          `Identify 3 real-world applications of ${request.topic}`
        ],
        duration: '20-25 minutes'
      },
      {
        title: `Core Concepts and Fundamentals`,
        description: `Dive deep into the essential concepts that form the foundation of ${request.topic}`,
        content: `Now that you understand the basics, let's explore the core concepts that form the foundation of ${request.topic}.

Key Concepts Covered:

1. **Fundamental Principles**
   Understanding the core principles that govern ${request.topic} is crucial for success. These principles serve as the building blocks for all advanced techniques and applications.

2. **Common Patterns and Methodologies**
   Every field has established patterns and methodologies that have proven effective over time. Learning these will help you approach ${request.topic} problems systematically.

3. **Best Practices and Standards**
   Industry best practices ensure consistency, maintainability, and efficiency. We'll cover the most important standards and conventions used in professional ${request.topic} work.

4. **Common Pitfalls and Solutions**
   Learning from others' mistakes is one of the fastest ways to improve. We'll identify common pitfalls and provide proven solutions.

Practical Applications:
• Case studies from real-world projects
• Step-by-step implementation examples
• Performance optimization techniques
• Troubleshooting common issues

By the end of this chapter, you'll have a solid understanding of the core concepts that will support your learning throughout the rest of the course.`,
        objectives: [
          `Master the fundamental principles of ${request.topic}`,
          `Apply common patterns and methodologies`,
          `Implement industry best practices`
        ],
        exercises: [
          `Implement a basic ${request.topic} pattern`,
          `Identify and fix common ${request.topic} issues`,
          `Create a best practices checklist`
        ],
        duration: '25-30 minutes'
      },
      {
        title: `Practical Implementation`,
        description: `Apply your knowledge with hands-on exercises and real-world projects`,
        content: `Theory is important, but practice makes perfect! In this chapter, we'll apply what you've learned about ${request.topic} to practical, real-world scenarios.

What You'll Build:
• A complete ${request.topic} project from start to finish
• Multiple smaller exercises to reinforce key concepts
• Real-world examples and case studies
• Performance optimizations and improvements

Project Structure:
1. **Planning Phase**
   - Define project requirements
   - Choose appropriate tools and technologies
   - Plan the implementation approach

2. **Implementation Phase**
   - Build the core functionality
   - Implement best practices
   - Add error handling and validation

3. **Testing and Optimization**
   - Test functionality thoroughly
   - Optimize performance
   - Refactor for maintainability

4. **Documentation and Deployment**
   - Document your code and decisions
   - Prepare for deployment
   - Plan for future enhancements

Hands-on Exercises:
• Build a ${request.topic} application step by step
• Implement advanced features and optimizations
• Debug and troubleshoot common issues
• Optimize performance and scalability

This practical approach will help you solidify your understanding and build confidence in your ${request.topic} abilities.`,
        objectives: [
          `Build a complete ${request.topic} project`,
          `Apply learned concepts in practice`,
          `Implement performance optimizations`
        ],
        exercises: [
          `Create a ${request.topic} project from scratch`,
          `Implement advanced features`,
          `Optimize project performance`
        ],
        duration: '30-40 minutes'
      },
      {
        title: `Advanced Techniques and Optimization`,
        description: `Explore advanced concepts and performance optimization strategies`,
        content: `Ready to take your ${request.topic} skills to the next level? This chapter covers advanced techniques, optimization strategies, and industry best practices that will make you a proficient ${request.topic} developer.

Advanced Topics Covered:

1. **Performance Optimization**
   - Profiling and benchmarking techniques
   - Memory management and optimization
   - Caching strategies and implementation
   - Scalability considerations

2. **Advanced Patterns and Architectures**
   - Design patterns specific to ${request.topic}
   - Architectural patterns and best practices
   - Microservices and distributed systems
   - Event-driven architectures

3. **Integration and APIs**
   - Third-party service integration
   - API design and implementation
   - Authentication and security
   - Error handling and monitoring

4. **Testing and Quality Assurance**
   - Unit testing strategies
   - Integration testing approaches
   - Performance testing methodologies
   - Code quality and maintainability

Real-world Applications:
• Enterprise-level ${request.topic} implementations
• High-performance system design
• Scalable architecture patterns
• Production deployment strategies

These advanced topics will prepare you for complex, real-world ${request.topic} projects and help you become a more effective developer.`,
        objectives: [
          `Implement advanced ${request.topic} techniques`,
          `Optimize system performance`,
          `Design scalable architectures`
        ],
        exercises: [
          `Optimize an existing ${request.topic} project`,
          `Implement advanced design patterns`,
          `Design a scalable system architecture`
        ],
        duration: '35-45 minutes'
      },
      {
        title: `Real-world Projects and Case Studies`,
        description: `Analyze real-world implementations and build your final project`,
        content: `In this final chapter, we'll examine real-world ${request.topic} implementations and help you build a comprehensive final project that demonstrates your mastery of the subject.

Case Studies:
• **Enterprise Application**: How major companies implement ${request.topic}
• **Startup Success Story**: Rapid development and scaling strategies
• **Open Source Project**: Community-driven development practices
• **Performance-Critical System**: Optimization techniques in action

Final Project Requirements:
Your final project should demonstrate:
• Understanding of core ${request.topic} concepts
• Implementation of best practices
• Performance optimization techniques
• Proper testing and documentation
• Real-world applicability

Project Ideas:
1. **Build a Complete Application**
   - Implement all learned concepts
   - Include proper architecture and design
   - Add comprehensive testing

2. **Optimize an Existing Project**
   - Analyze performance bottlenecks
   - Implement optimization strategies
   - Measure and document improvements

3. **Create a Learning Resource**
   - Document your learning journey
   - Share knowledge with the community
   - Build something others can learn from

Portfolio Development:
• Document your project thoroughly
• Create a compelling project presentation
• Prepare for technical interviews
• Plan your continued learning path

This final project will serve as a portfolio piece and demonstrate your proficiency in ${request.topic}.`,
        objectives: [
          `Complete a comprehensive ${request.topic} project`,
          `Apply all learned concepts in practice`,
          `Create portfolio-worthy work`
        ],
        exercises: [
          `Build your final ${request.topic} project`,
          `Create project documentation`,
          `Prepare a project presentation`
        ],
        duration: '45-60 minutes'
      }
    ]

    return baseChapters.map((chapter, index) => ({
      id: Math.random().toString(36).substring(2, 15),
      title: chapter.title,
      description: chapter.description,
      content: chapter.content,
      objectives: chapter.objectives,
      exercises: chapter.exercises,
      duration: chapter.duration,
      order: index + 1,
      courseId: '',
      videoUrl: ''
    }))
  }

  // Real YouTube API integration (via server route with YouTube search fallback)
  static async searchRelevantVideos(topic: string, chapterTitle: string): Promise<string> {
    try {
      const searchQuery = `${topic} ${chapterTitle} tutorial`
      const baseUrl = typeof window !== 'undefined' ? '' : 'http://localhost:3000'
      const response = await fetch(
        `${baseUrl}/api/youtube-search?q=${encodeURIComponent(searchQuery)}&maxResults=1`
      )

      if (response.ok) {
        const data = await response.json()
        if (data.videoUrl) {
          return data.videoUrl
        }
      }

      return this.getDemoVideoUrl(topic)
    } catch (error) {
      console.error('YouTube search error:', error)
      return this.getDemoVideoUrl(topic)
    }
  }

  static getDemoVideoUrl(topic: string): string {
    // Return educational videos based on topic
    const educationalVideos: { [key: string]: string } = {
      'programming': 'https://www.youtube.com/watch?v=zOjov-2OZ0E',
      'javascript': 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
      'react': 'https://www.youtube.com/watch?v=DLX62G4lc44',
      'python': 'https://www.youtube.com/watch?v=rfscVS0vtbw',
      'machine learning': 'https://www.youtube.com/watch?v=7eh4d6sabA0',
      'ai': 'https://www.youtube.com/watch?v=7eh4d6sabA0',
      'data': 'https://www.youtube.com/watch?v=ua-CiDNNj30',
      'web': 'https://www.youtube.com/watch?v=nu_pCVPKzTk',
      'html': 'https://www.youtube.com/watch?v=pQN-pnXPaVg',
      'css': 'https://www.youtube.com/watch?v=1Rs2ND1ryYc',
      'node': 'https://www.youtube.com/watch?v=Oe421EPjeBE',
      'sql': 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
      'design': 'https://www.youtube.com/watch?v=_Hp_kI6hluY',
      'business': 'https://www.youtube.com/watch?v=YyQYj-FrFuk',
      'marketing': 'https://www.youtube.com/watch?v=wRHgqGVYrpk',
    }
    
    const lowerTopic = topic.toLowerCase()
    for (const [key, url] of Object.entries(educationalVideos)) {
      if (lowerTopic.includes(key)) {
        return url
      }
    }
    
    return 'https://www.youtube.com/watch?v=zOjov-2OZ0E' // Default educational tutorial
  }

  // Enhanced course generation with real APIs
  static async generateCourse(request: CourseGenerationRequest): Promise<Course> {
    console.log('🚀 Enhanced API: Generating course with real content...', request)
    
    // Generate detailed course content
    const chapters = await this.generateCourseWithOpenAI(request)
    
    // Add relevant videos to each chapter
    const chaptersWithVideos = await Promise.all(
      chapters.map(async (chapter, index) => {
        const videoUrl = await this.searchRelevantVideos(request.topic, chapter.title)
        return {
          ...chapter,
          videoUrl,
          courseId: '', // Will be set when course is created
        }
      })
    )

    const courseId = Math.random().toString(36).substring(2, 15)
    
    const course: Course = {
      id: courseId,
      title: request.title,
      description: request.description,
      category: request.category,
      topic: request.topic,
      targetAudience: request.targetAudience,
      difficulty: request.difficulty,
      duration: request.duration,
      imageUrl: `https://images.unsplash.com/photo-${Math.random().toString(36).substring(7)}?w=400&h=300&fit=crop&q=80`,
      chapters: chaptersWithVideos.map(chapter => ({ ...chapter, courseId })),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'demo-user'
    }
    
    // Save the course to storage
    await this.saveCourse(course)
    
    return course
  }

  // In-memory storage for demo purposes
  private static courses: Course[] = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      description: 'Master advanced React patterns and best practices for building scalable applications',
      category: 'Programming',
      topic: 'React',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      chapters: [
        {
          id: '1-1',
          title: 'Introduction to Advanced React',
          description: 'Understanding advanced React concepts',
          content: 'Learn the fundamentals of advanced React development...',
          order: 1,
          courseId: '1',
          videoUrl: 'https://www.youtube.com/watch?v=DLX62G4lc44'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'demo-user'
    }
  ]

  // Course management methods
  static async getCourses(): Promise<Course[]> {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ai_course_generator_courses')
        if (saved) {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed
          }
        }
      } catch (e) {
        console.error('Error reading localStorage courses', e)
      }
    }
    return [...this.courses]
  }

  static async getCourse(id: string): Promise<Course | null> {
    const courses = await this.getCourses()
    return courses.find(course => course.id === id) || null
  }

  static async getChapters(courseId: string): Promise<Chapter[]> {
    const course = await this.getCourse(courseId)
    return course?.chapters || []
  }

  static async saveCourse(course: Course): Promise<Course> {
    // Add or update course in memory
    const existingIndex = this.courses.findIndex(c => c.id === course.id)
    if (existingIndex >= 0) {
      this.courses[existingIndex] = course
    } else {
      this.courses.push(course)
    }

    // Persist to localStorage across page loads and refreshes
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ai_course_generator_courses')
        const coursesList: Course[] = saved ? JSON.parse(saved) : [...this.courses]
        const idx = coursesList.findIndex(c => c.id === course.id)
        if (idx >= 0) {
          coursesList[idx] = course
        } else {
          coursesList.unshift(course)
        }
        localStorage.setItem('ai_course_generator_courses', JSON.stringify(coursesList))
      } catch (e) {
        console.error('Error saving course to localStorage', e)
      }
    }

    return course
  }

  static async deleteCourse(id: string): Promise<boolean> {
    const index = this.courses.findIndex(course => course.id === id)
    if (index >= 0) {
      this.courses.splice(index, 1)
    }
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ai_course_generator_courses')
        if (saved) {
          const coursesList: Course[] = JSON.parse(saved)
          const filtered = coursesList.filter(c => c.id !== id)
          localStorage.setItem('ai_course_generator_courses', JSON.stringify(filtered))
        }
      } catch (e) {
        console.error('Error deleting course from localStorage', e)
      }
    }
    return true
  }

  // Get categories
  static async getCategories(): Promise<Category[]> {
    return [
      { id: '1', name: 'Programming', description: 'Learn programming languages and development', icon: '💻' },
      { id: '2', name: 'Design', description: 'UI/UX design and visual arts', icon: '🎨' },
      { id: '3', name: 'Business', description: 'Business skills and entrepreneurship', icon: '💼' },
      { id: '4', name: 'Marketing', description: 'Digital marketing and advertising', icon: '📈' },
      { id: '5', name: 'Data Science', description: 'Data analysis and machine learning', icon: '📊' },
      { id: '6', name: 'Photography', description: 'Photography techniques and editing', icon: '📸' },
      { id: '7', name: 'Writing', description: 'Content writing and communication', icon: '✍️' },
      { id: '8', name: 'Finance', description: 'Personal finance and investment', icon: '💰' }
    ]
  }

  // Enhanced analytics
  static async getAnalytics() {
    return {
      totalCourses: 15,
      totalStudents: 3421,
      totalRevenue: 18750,
      monthlyGrowth: 28.5,
      popularCategories: [
        { name: 'Programming', count: 67, percentage: 42 },
        { name: 'Design', count: 45, percentage: 28 },
        { name: 'Business', count: 32, percentage: 20 },
        { name: 'Marketing', count: 16, percentage: 10 }
      ],
      recentActivity: [
        { type: 'course_created', message: 'New course "Advanced React Patterns" created', timestamp: new Date() },
        { type: 'student_enrolled', message: '23 new students enrolled in "UI/UX Design"', timestamp: new Date() },
        { type: 'revenue', message: '$680 earned this week', timestamp: new Date() },
        { type: 'course_updated', message: 'Course "JavaScript Fundamentals" updated with new content', timestamp: new Date() }
      ]
    }
  }
}
