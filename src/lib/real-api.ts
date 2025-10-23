import { Course, Chapter, CourseGenerationRequest, Category } from '@/types'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

// YouTube API helper
async function searchYouTubeVideos(query: string, maxResults: number = 5): Promise<any[]> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  if (!apiKey) {
    console.warn('YouTube API key not found, returning mock data')
    return [
      {
        id: { videoId: 'dQw4w9WgXcQ' },
        snippet: {
          title: `${query} - Tutorial`,
          description: `Learn ${query} with this comprehensive tutorial`,
          thumbnails: {
            default: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg' },
            medium: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
            high: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg' }
          }
        }
      }
    ]
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${apiKey}`
    )
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`)
    }
    
    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error('YouTube API error:', error)
    // Return fallback data
    return [
      {
        id: { videoId: 'dQw4w9WgXcQ' },
        snippet: {
          title: `${query} - Tutorial`,
          description: `Learn ${query} with this comprehensive tutorial`,
          thumbnails: {
            default: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg' },
            medium: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
            high: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg' }
          }
        }
      }
    ]
  }
}

// OpenAI API helper
async function generateCourseContent(request: CourseGenerationRequest): Promise<Chapter[]> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.warn('OpenAI API key not found, returning mock content')
    return generateMockChapters(request)
  }

  try {
    const prompt = `
Create a comprehensive course outline for "${request.title}" with the following details:
- Topic: ${request.topic}
- Category: ${request.category}
- Target Audience: ${request.targetAudience}
- Difficulty Level: ${request.difficulty}
- Duration: ${request.duration} hours

Please generate 5-7 chapters with:
1. Chapter titles
2. Brief descriptions
3. Detailed content for each chapter
4. Learning objectives

Format the response as JSON with this structure:
{
  "chapters": [
    {
      "title": "Chapter Title",
      "description": "Brief description",
      "content": "Detailed content",
      "objectives": ["objective1", "objective2"]
    }
  ]
}
`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert course designer. Create comprehensive, educational content that is engaging and well-structured.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
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
      order: index + 1,
      courseId: '', // Will be set later
      videoUrl: ''
    }))
  } catch (error) {
    console.error('OpenAI API error:', error)
    return generateMockChapters(request)
  }
}

// Fallback function for mock chapters
function generateMockChapters(request: CourseGenerationRequest): Chapter[] {
  return [
    {
      id: Math.random().toString(36).substring(2, 15),
      title: `Introduction to ${request.topic}`,
      description: `Get started with ${request.topic} and understand the fundamentals`,
      content: `Welcome to this comprehensive course on ${request.topic}! This course is designed for ${request.difficulty} level learners and will take approximately ${request.duration} hours to complete.`,
      order: 1,
      courseId: '',
      videoUrl: ''
    },
    {
      id: Math.random().toString(36).substring(2, 15),
      title: `Core Concepts of ${request.topic}`,
      description: `Dive deep into the essential concepts and principles`,
      content: `In this chapter, we'll explore the core concepts that form the foundation of ${request.topic}. You'll learn about the key principles and methodologies used in this field.`,
      order: 2,
      courseId: '',
      videoUrl: ''
    },
    {
      id: Math.random().toString(36).substring(2, 15),
      title: `Practical Applications`,
      description: `Apply your knowledge with real-world examples and projects`,
      content: `Now that you understand the fundamentals, let's put your knowledge into practice. This chapter includes hands-on exercises and real-world applications.`,
      order: 3,
      courseId: '',
      videoUrl: ''
    },
    {
      id: Math.random().toString(36).substring(2, 15),
      title: `Advanced Topics`,
      description: `Explore advanced concepts and best practices`,
      content: `Take your skills to the next level with advanced topics and industry best practices. This chapter covers complex scenarios and optimization techniques.`,
      order: 4,
      courseId: '',
      videoUrl: ''
    },
    {
      id: Math.random().toString(36).substring(2, 15),
      title: `Project & Assessment`,
      description: `Complete your learning with a comprehensive project`,
      content: `Cap off your learning journey with a final project that demonstrates your mastery of ${request.topic}. This assessment will help consolidate your knowledge.`,
      order: 5,
      courseId: '',
      videoUrl: ''
    }
  ]
}

export class RealAPIService {
  // Course Management
  static async getCourses(userId?: string): Promise<Course[]> {
    try {
      const coursesRef = collection(db, 'courses')
      const q = userId ? query(coursesRef, where('userId', '==', userId)) : coursesRef
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Course[]
    } catch (error) {
      console.error('Error fetching courses:', error)
      return []
    }
  }

  static async getCourse(id: string): Promise<Course | null> {
    try {
      const coursesRef = collection(db, 'courses')
      const q = query(coursesRef, where('id', '==', id))
      const querySnapshot = await getDocs(q)
      
      if (querySnapshot.empty) return null
      
      const doc = querySnapshot.docs[0]
      return {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      } as Course
    } catch (error) {
      console.error('Error fetching course:', error)
      return null
    }
  }

  static async createCourse(courseData: Partial<Course>): Promise<Course> {
    try {
      const docRef = await addDoc(collection(db, 'courses'), {
        ...courseData,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
      return {
        id: docRef.id,
        ...courseData,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Course
    } catch (error) {
      console.error('Error creating course:', error)
      throw error
    }
  }

  static async updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
    try {
      const courseRef = doc(db, 'courses', id)
      await updateDoc(courseRef, {
        ...updates,
        updatedAt: new Date()
      })
      
      return await this.getCourse(id)
    } catch (error) {
      console.error('Error updating course:', error)
      return null
    }
  }

  static async deleteCourse(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'courses', id))
      return true
    } catch (error) {
      console.error('Error deleting course:', error)
      return false
    }
  }

  // Chapter Management
  static async getChapters(courseId: string): Promise<Chapter[]> {
    try {
      const chaptersRef = collection(db, 'chapters')
      const q = query(chaptersRef, where('courseId', '==', courseId), orderBy('order'))
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Chapter[]
    } catch (error) {
      console.error('Error fetching chapters:', error)
      return []
    }
  }

  static async createChapter(courseId: string, chapterData: Partial<Chapter>): Promise<Chapter> {
    try {
      const docRef = await addDoc(collection(db, 'chapters'), {
        ...chapterData,
        courseId
      })
      
      return {
        id: docRef.id,
        ...chapterData,
        courseId
      } as Chapter
    } catch (error) {
      console.error('Error creating chapter:', error)
      throw error
    }
  }

  // AI Course Generation
  static async generateCourse(request: CourseGenerationRequest): Promise<Course> {
    try {
      // Generate course content using OpenAI
      const chapters = await generateCourseContent(request)
      
      // Create the course
      const courseData = {
        title: request.title,
        description: request.description,
        category: request.category,
        topic: request.topic,
        targetAudience: request.targetAudience,
        difficulty: request.difficulty,
        duration: request.duration,
        userId: 'demo-user', // This should come from auth context
        chapters: []
      }
      
      const course = await this.createCourse(courseData)
      
      // Add video URLs to chapters using YouTube search
      const chaptersWithVideos = await Promise.all(
        chapters.map(async (chapter, index) => {
          const videos = await searchYouTubeVideos(`${request.topic} ${chapter.title}`, 1)
          const videoUrl = videos.length > 0 ? `https://www.youtube.com/watch?v=${videos[0].id.videoId}` : ''
          
          const chapterData = {
            ...chapter,
            courseId: course.id,
            videoUrl
          }
          
          return await this.createChapter(course.id, chapterData)
        })
      )
      
      // Update course with chapters
      await this.updateCourse(course.id, { chapters: chaptersWithVideos })
      
      return { ...course, chapters: chaptersWithVideos }
    } catch (error) {
      console.error('Error generating course:', error)
      throw error
    }
  }

  // Categories
  static async getCategories(): Promise<Category[]> {
    // For now, return static categories. In a real app, these could come from a database
    return [
      { id: '1', name: 'Programming', description: 'Learn programming languages and development' },
      { id: '2', name: 'Design', description: 'UI/UX design and visual arts' },
      { id: '3', name: 'Business', description: 'Business skills and entrepreneurship' },
      { id: '4', name: 'Marketing', description: 'Digital marketing and advertising' },
      { id: '5', name: 'Data Science', description: 'Data analysis and machine learning' },
      { id: '6', name: 'Photography', description: 'Photography techniques and editing' }
    ]
  }

  // YouTube Search
  static async searchYouTubeVideos(query: string, maxResults: number = 5): Promise<any[]> {
    return await searchYouTubeVideos(query, maxResults)
  }

  // File Upload
  static async uploadFile(file: File): Promise<string> {
    try {
      const storageRef = ref(storage, `uploads/${file.name}`)
      const snapshot = await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      return downloadURL
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  }

  // Analytics
  static async getAnalytics(userId?: string) {
    try {
      const courses = await this.getCourses(userId)
      const totalStudents = courses.reduce((sum, course) => sum + (course.students || 0), 0)
      const totalRevenue = courses.reduce((sum, course) => sum + (course.revenue || 0), 0)
      
      return {
        totalCourses: courses.length,
        totalStudents,
        totalRevenue,
        monthlyGrowth: 23.5, // This would be calculated from historical data
        popularCategories: [
          { name: 'Programming', count: 45, percentage: 35 },
          { name: 'Design', count: 32, percentage: 25 },
          { name: 'Business', count: 28, percentage: 22 },
          { name: 'Marketing', count: 23, percentage: 18 }
        ],
        recentActivity: [
          { type: 'course_created', message: 'New course created', timestamp: new Date() },
          { type: 'student_enrolled', message: 'New students enrolled', timestamp: new Date() },
          { type: 'revenue', message: 'Revenue earned', timestamp: new Date() }
        ]
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      return {
        totalCourses: 0,
        totalStudents: 0,
        totalRevenue: 0,
        monthlyGrowth: 0,
        popularCategories: [],
        recentActivity: []
      }
    }
  }
}
