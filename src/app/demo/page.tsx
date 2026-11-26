'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { BookOpen, Plus, Users, TrendingUp, Star, Wand2 } from 'lucide-react'
import Link from 'next/link'
import { Course } from '@/types'
import { FastDemoAPIService } from '@/lib/fast-demo-api'

export default function DemoPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [coursesData, analyticsData] = await Promise.all([
        FastDemoAPIService.getCourses(),
        FastDemoAPIService.getAnalytics()
      ])
      
      setCourses(coursesData)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickCourseCreation = async () => {
    try {
      const courseRequest = {
        title: 'JavaScript Fundamentals',
        description: 'Learn JavaScript from the ground up',
        category: 'Programming',
        topic: 'JavaScript',
        targetAudience: 'Beginners',
        difficulty: 'beginner' as const,
        duration: 4
      }

      console.log('🚀 Creating demo course...')
      const course = await FastDemoAPIService.generateCourse(courseRequest)
      alert(`Course "${course.title}" created successfully! Check the dashboard to view it.`)
      loadDashboardData() // Refresh the list
    } catch (error) {
      console.error('Error creating course:', error)
      alert('Failed to create course. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">AI Course Generator - Demo Mode</span>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Demo Mode Active!</h1>
                <p className="text-blue-100">
                  Test the AI Course Generator without authentication. Click the button below to create a sample course instantly.
                </p>
              </div>
              <Button 
                onClick={handleQuickCourseCreation}
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Wand2 className="mr-2 h-5 w-5" />
                Create Demo Course
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics?.totalCourses || 0}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics?.totalStudents?.toLocaleString() || 0}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${analytics?.totalRevenue?.toLocaleString() || 0}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating</p>
                  <p className="text-3xl font-bold text-gray-900">4.9</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Courses List */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Sample Courses</h2>
            </div>
            <div className="p-6">
              {courses.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
                  <p className="text-gray-600 mb-6">Click "Create Demo Course" above to generate a sample course.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                        {course.imageUrl ? (
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {course.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {course.chapters.length} chapters
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-4">How to Test the Course Generator</h3>
            <div className="space-y-3 text-blue-800">
              <p>• Click "Create Demo Course" above to instantly generate a sample course</p>
              <p>• The course will include 5 chapters with detailed content and YouTube videos</p>
              <p>• All data is generated locally - no external APIs required</p>
              <p>• This demo mode works without authentication or API keys</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
