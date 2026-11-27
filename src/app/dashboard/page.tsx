'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { BookOpen, Plus, Users, TrendingUp, Star } from 'lucide-react'
import Link from 'next/link'
import { Course } from '@/types'
import { DemoAPIService } from '@/lib/demo-api'
import { RealAPIService } from '@/lib/real-api'
import { FastDemoAPIService } from '@/lib/fast-demo-api'
import { EnhancedAPIService } from '@/lib/enhanced-api'

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Use enhanced API for better content
      const [coursesData, analyticsData] = await Promise.all([
        EnhancedAPIService.getCourses(),
        EnhancedAPIService.getAnalytics()
      ])
      
      setCourses(coursesData)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-blue-100">
              Ready to create your next amazing course?
            </p>
          </div>
          <Link href="/dashboard/create">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Plus className="mr-2 h-5 w-5" />
              Create New Course
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      {/* Learning Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-3xl font-bold text-gray-900">{courses.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-blue-600">
            Open-Source Library
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Modules</p>
              <p className="text-3xl font-bold text-gray-900">
                {courses.reduce((acc, c) => acc + (c.chapters?.length || 0), 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-purple-600">
            Curated Chapters
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Platform Access</p>
              <p className="text-3xl font-bold text-green-600">100% Free</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            Public Knowledge
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engine Type</p>
              <p className="text-3xl font-bold text-gray-900">AI Tutor</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-amber-600">
            Self-Paced Learning
          </div>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Courses</h2>
            <Link href="/dashboard/courses">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
        </div>
        <div className="p-6">
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first course with AI assistance.</p>
              <Link href="/dashboard/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Course
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 6).map((course) => (
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

      {/* Recent Activity */}
      {analytics?.recentActivity && (
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.recentActivity.map((activity: any, index: number) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">
                      {activity.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
