'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Course } from '@/types'
import { useCourseHistory, useCourseStats } from '@/hooks/useCourseManagement'
import { useUser } from '@/context/UserContext'
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List,
  Edit,
  Trash2,
  Eye,
  Clock,
  Users,
  Calendar,
  Download,
  Upload,
  RefreshCw,
  TrendingUp,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

export default function CoursesPage() {
  const { user } = useUser()
  const { 
    courses, 
    loading, 
    error, 
    refreshCourses, 
    deleteCourse, 
    searchCourses, 
    getCoursesByCategory 
  } = useCourseHistory()
  const { stats, loading: statsLoading } = useCourseStats()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const handleSearch = async (query: string) => {
    setSearchTerm(query)
    await searchCourses(query)
  }

  const handleCategoryFilter = async (category: string) => {
    setFilterCategory(category)
    await getCoursesByCategory(category)
  }

  const handleDeleteCourse = async (courseId: string) => {
    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      await deleteCourse(courseId)
    }
  }

  const handleExportCourses = async () => {
    try {
      const { StorageService } = await import('@/lib/storage')
      const exportData = await StorageService.exportCourses()
      const blob = new Blob([exportData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `courses-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting courses:', error)
      alert('Failed to export courses. Please try again.')
    }
  }

  const handleImportCourses = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const { StorageService } = await import('@/lib/storage')
        const result = await StorageService.importCourses(e.target?.result as string)
        alert(`Successfully imported ${result.imported} courses.${result.errors.length > 0 ? ` Errors: ${result.errors.join(', ')}` : ''}`)
        refreshCourses()
      } catch (error) {
        console.error('Error importing courses:', error)
        alert('Failed to import courses. Please check the file format.')
      }
    }
    reader.readAsText(file)
  }

  const categories = Array.from(new Set(courses.map(course => course.category)))

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <BookOpen className="h-12 w-12 mx-auto mb-2" />
          <h3 className="text-lg font-medium">Error Loading Courses</h3>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
        <Button onClick={refreshCourses}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-1">
            {user ? `Welcome back, ${user.name}!` : 'Manage and organize your AI-generated courses'}
          </p>
          {courses.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              You have {courses.length} course{courses.length !== 1 ? 's' : ''} in your library
            </p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={refreshCourses}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExportCourses}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <label className="cursor-pointer">
            <Button variant="outline" asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Import
              </span>
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={handleImportCourses}
              className="hidden"
            />
          </label>
          <Link href="/dashboard/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Course
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Courses List */}
      {courses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterCategory !== 'all' ? 'No courses found' : 'No courses yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first AI-powered course.'
            }
          </p>
          <Link href="/dashboard/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Course
            </Button>
          </Link>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {courses.map((course) => (
            <div key={course.id} className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow ${
              viewMode === 'list' ? 'flex' : ''
            }`}>
              {/* Course Image */}
              <div className={`${
                viewMode === 'grid' 
                  ? 'aspect-video' 
                  : 'w-48 h-32 flex-shrink-0'
              } bg-gray-200 rounded-t-lg overflow-hidden ${
                viewMode === 'list' ? 'rounded-l-lg rounded-t-none' : ''
              }`}>
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

              {/* Course Content */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {course.description}
                    </p>
                  </div>
                </div>

                {/* Course Meta */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mr-2">
                      {course.category}
                    </span>
                    <span className="text-xs">{course.chapters.length} chapters</span>
                  </div>
                  
                  <div className="space-y-1">
                    {course.duration && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration} hours</span>
                      </div>
                    )}

                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Created {course.createdAt.toLocaleDateString()}</span>
                    </div>

                    {course.targetAudience && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.targetAudience}</span>
                      </div>
                    )}

                    {course.difficulty && (
                      <div className="flex items-center text-sm text-gray-500">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="capitalize">{course.difficulty}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Link href={`/dashboard/courses/${course.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/courses/${course.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {courses.length > 0 && stats && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Course Statistics</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalCourses}</div>
              <div className="text-sm text-gray-600">Total Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalChapters}</div>
              <div className="text-sm text-gray-600">Total Chapters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalDuration}</div>
              <div className="text-sm text-gray-600">Total Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.categoriesCount}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
          </div>
          
          {/* Category Breakdown */}
          {stats.popularCategories && stats.popularCategories.length > 0 && (
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-900 mb-3">Course Categories</h4>
              <div className="space-y-2">
                {stats.popularCategories.map((category: any) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">
                        {category.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
