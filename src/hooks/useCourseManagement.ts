'use client'

import { useState, useEffect } from 'react'
import { Course, CourseGenerationRequest } from '@/types'
import { EnhancedAPIService } from '@/lib/enhanced-api'
import { StorageService } from '@/lib/storage'

interface CourseCreationTracking {
  isCreating: boolean
  progress: number
  currentStep: string
  error: string | null
  createdCourse: Course | null
}

export function useCourseCreation() {
  const [tracking, setTracking] = useState<CourseCreationTracking>({
    isCreating: false,
    progress: 0,
    currentStep: '',
    error: null,
    createdCourse: null
  })

  const createCourse = async (request: CourseGenerationRequest): Promise<Course> => {
    setTracking({
      isCreating: true,
      progress: 0,
      currentStep: 'Initializing course creation...',
      error: null,
      createdCourse: null
    })

    try {
      // Step 1: Generate course content
      setTracking(prev => ({
        ...prev,
        progress: 20,
        currentStep: 'Generating course content with AI...'
      }))

      const course = await EnhancedAPIService.generateCourse(request)

      // Step 2: Save course
      setTracking(prev => ({
        ...prev,
        progress: 80,
        currentStep: 'Saving course to your library...'
      }))

      const savedCourse = await EnhancedAPIService.saveCourse(course)

      // Step 3: Complete
      setTracking(prev => ({
        ...prev,
        progress: 100,
        currentStep: 'Course created successfully!',
        isCreating: false,
        createdCourse: savedCourse
      }))

      return savedCourse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create course'
      setTracking(prev => ({
        ...prev,
        isCreating: false,
        error: errorMessage,
        currentStep: 'Error occurred during creation'
      }))
      throw error
    }
  }

  const resetTracking = () => {
    setTracking({
      isCreating: false,
      progress: 0,
      currentStep: '',
      error: null,
      createdCourse: null
    })
  }

  return {
    ...tracking,
    createCourse,
    resetTracking
  }
}

export function useCourseHistory() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadCourses = async () => {
    try {
      setLoading(true)
      setError(null)
      const coursesData = await EnhancedAPIService.getCourses()
      setCourses(coursesData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses')
    } finally {
      setLoading(false)
    }
  }

  const refreshCourses = () => {
    loadCourses()
  }

  const deleteCourse = async (courseId: string) => {
    try {
      await EnhancedAPIService.deleteCourse(courseId)
      setCourses(prev => prev.filter(course => course.id !== courseId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete course')
    }
  }

  const searchCourses = async (query: string) => {
    try {
      if (!query.trim()) {
        loadCourses()
        return
      }
      const searchResults = await EnhancedAPIService.searchCourses(query)
      setCourses(searchResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search courses')
    }
  }

  const getCoursesByCategory = async (category: string) => {
    try {
      if (category === 'all') {
        loadCourses()
        return
      }
      const categoryCourses = await EnhancedAPIService.getCoursesByCategory(category)
      setCourses(categoryCourses)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to filter courses')
    }
  }

  useEffect(() => {
    loadCourses()
  }, [])

  return {
    courses,
    loading,
    error,
    refreshCourses,
    deleteCourse,
    searchCourses,
    getCoursesByCategory
  }
}

export function useCourseStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const loadStats = async () => {
    try {
      setLoading(true)
      const statsData = await EnhancedAPIService.getCourseStats()
      setStats(statsData)
    } catch (error) {
      console.error('Error loading course stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStats()
  }, [])

  return {
    stats,
    loading,
    refreshStats: loadStats
  }
}
