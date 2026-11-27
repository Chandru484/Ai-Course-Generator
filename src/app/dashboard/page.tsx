'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { BookOpen, Plus, Sparkles, Layers, ArrowRight, Play, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Course } from '@/types'
import { EnhancedAPIService } from '@/lib/enhanced-api'

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const coursesData = await EnhancedAPIService.getCourses()
      setCourses(coursesData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalModules = courses.reduce((acc, c) => acc + (c.chapters?.length || 0), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[450px]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-blue-600 border-t-transparent"></div>
          <p className="text-sm text-slate-500 font-medium">Loading your learning space...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Modern Gradient Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Open-Source AI Studio
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Welcome to Your Learning Lab
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Explore your active courses or craft a tailored new curriculum on any concept in seconds.
            </p>
          </div>

          <Link href="/dashboard/create">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-2xl px-6 py-6 shadow-lg shadow-blue-500/20 whitespace-nowrap">
              <Plus className="mr-2 h-5 w-5" />
              Generate New Course
            </Button>
          </Link>
        </div>
      </div>

      {/* Modern Learning Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Courses</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{courses.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full inline-block">
            In Your Library
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Curated Chapters</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{totalModules}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full inline-block">
            Modular Learning
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform Access</p>
              <p className="text-3xl font-extrabold text-emerald-600 mt-1">100% Free</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full inline-block">
            Community Open Core
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Tutor Engine</p>
              <p className="text-3xl font-extrabold text-purple-600 mt-1">Active</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full inline-block">
            Self-Paced Mastery
          </p>
        </div>
      </div>

      {/* Course List Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Your Learning Paths</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Pick up where you left off or begin a new lesson</p>
          </div>
          <Link href="/dashboard/courses">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="p-6 md:p-8">
          {courses.length === 0 ? (
            <div className="text-center py-16 max-w-sm mx-auto space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No courses created yet</h3>
              <p className="text-slate-500 text-sm">
                Type any topic—from Python to Machine Learning—and generate your first course in 30 seconds.
              </p>
              <Link href="/dashboard/create" className="block pt-2">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Course
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div 
                  key={course.id} 
                  className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400/60 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
                      <img 
                        src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop&q=80'} 
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md">
                        {course.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mb-4">
                      <span className="flex items-center gap-1 font-medium">
                        <Layers className="w-3.5 h-3.5 text-blue-500" />
                        {course.chapters?.length || 0} Modules
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-purple-500" />
                        {course.duration || 1} Hours
                      </span>
                    </div>

                    <Link href={`/dashboard/courses/${course.id}`} className="block">
                      <Button className="w-full bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold py-2.5 transition-colors">
                        <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> Continue Course
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
