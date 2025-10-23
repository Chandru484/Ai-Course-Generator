'use client'

import { useState, useEffect } from 'react'
import { CourseProgress } from '@/types'
import { EnhancedAPIService } from '@/lib/enhanced-api'
import { useUser } from '@/context/UserContext'

export function useCourseProgress(courseId: string) {
  const { user } = useUser()
  const [progress, setProgress] = useState<CourseProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProgress = async () => {
    if (!user || !courseId) return

    try {
      setLoading(true)
      setError(null)
      const progressData = await EnhancedAPIService.getCourseProgress(courseId, user.id)
      setProgress(progressData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load progress')
    } finally {
      setLoading(false)
    }
  }

  const markChapterComplete = async (chapterId: string) => {
    if (!user || !courseId) return

    try {
      const updatedProgress = await EnhancedAPIService.markChapterComplete(courseId, chapterId, user.id)
      setProgress(updatedProgress)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark chapter complete')
    }
  }

  const markChapterIncomplete = async (chapterId: string) => {
    if (!user || !courseId) return

    try {
      const updatedProgress = await EnhancedAPIService.markChapterIncomplete(courseId, chapterId, user.id)
      setProgress(updatedProgress)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark chapter incomplete')
    }
  }

  const isChapterCompleted = (chapterId: string): boolean => {
    return progress?.completedChapters.includes(chapterId) || false
  }

  const getProgressPercentage = (): number => {
    return progress?.progressPercentage || 0
  }

  const isCourseCompleted = (): boolean => {
    return progress?.completedAt !== undefined
  }

  useEffect(() => {
    loadProgress()
  }, [courseId, user?.id])

  return {
    progress,
    loading,
    error,
    markChapterComplete,
    markChapterIncomplete,
    isChapterCompleted,
    getProgressPercentage,
    isCourseCompleted,
    refreshProgress: loadProgress
  }
}

export function useAllUserProgress() {
  const { user } = useUser()
  const [progressList, setProgressList] = useState<CourseProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadAllProgress = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)
      const allProgress = await EnhancedAPIService.getAllUserProgress(user.id)
      setProgressList(allProgress)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load progress')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAllProgress()
  }, [user?.id])

  return {
    progressList,
    loading,
    error,
    refreshProgress: loadAllProgress
  }
}
