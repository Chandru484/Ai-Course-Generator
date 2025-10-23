'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Course, Chapter } from '@/types'
import { EnhancedAPIService } from '@/lib/enhanced-api'
import { useCourseProgress } from '@/hooks/useCourseProgress'
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Users, 
  Play, 
  Edit, 
  Trash2,
  Plus,
  CheckCircle,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  
  const [course, setCourse] = useState<Course | null>(null)
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(true)
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null)

  const {
    progress,
    loading: progressLoading,
    markChapterComplete,
    markChapterIncomplete,
    isChapterCompleted,
    getProgressPercentage,
    isCourseCompleted
  } = useCourseProgress(courseId)

  useEffect(() => {
    if (courseId) {
      loadCourseData()
    }
  }, [courseId])

  const loadCourseData = async () => {
    try {
      setLoading(true)
      console.log('🔍 Loading course data for ID:', courseId)
      
      // Use enhanced API for better content
      const [courseData, chaptersData] = await Promise.all([
        EnhancedAPIService.getCourse(courseId),
        EnhancedAPIService.getChapters(courseId)
      ])
      
      console.log('📚 Course data:', courseData)
      console.log('📖 Chapters data:', chaptersData)
      
      setCourse(courseData)
      setChapters(chaptersData)
      
      if (chaptersData.length > 0) {
        setActiveChapter(chaptersData[0])
      }
    } catch (error) {
      console.error('Error loading course data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCourse = async () => {
    if (!course) return
    
    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        // Use enhanced API for deletion
        await EnhancedAPIService.deleteCourse(course.id)
        router.push('/dashboard')
      } catch (error) {
        console.error('Error deleting course:', error)
        alert('Failed to delete course. Please try again.')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Course not found</h3>
        <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been deleted.</p>
        <Link href="/dashboard">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            <p className="text-gray-600 mt-1">{course.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link href={`/dashboard/courses/${course.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Course
            </Button>
          </Link>
          <Button variant="outline" onClick={handleDeleteCourse}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Info */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-start space-x-4">
              {course.imageUrl ? (
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {course.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {chapters.length} chapters
                  </span>
                  <span className="text-gray-500 text-sm">
                    Created {course.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{course.description}</p>
              </div>
            </div>
          </div>

          {/* Chapter Content */}
          {activeChapter && (
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {activeChapter.title}
                </h2>
                <p className="text-gray-600">{activeChapter.description}</p>
              </div>
              <div className="p-6">
                <div className="prose max-w-none">
                  <div className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                    {activeChapter.content}
                  </div>
                  
                  {activeChapter.videoUrl && (
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
                      <iframe
                        src={`https://www.youtube.com/embed/${activeChapter.videoUrl.split('v=')[1]?.split('&')[0] || ''}`}
                        title={activeChapter.title}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {/* Learning Objectives */}
                  {activeChapter.objectives && activeChapter.objectives.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-blue-900 mb-3">Learning Objectives</h4>
                      <ul className="space-y-2">
                        {activeChapter.objectives.map((objective: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-600 mr-2">✓</span>
                            <span className="text-blue-800">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Exercises */}
                  {activeChapter.exercises && activeChapter.exercises.length > 0 && (
                    <div className="bg-green-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-green-900 mb-3">Hands-on Exercises</h4>
                      <ul className="space-y-2">
                        {activeChapter.exercises.map((exercise: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-600 mr-2">📝</span>
                            <span className="text-green-800">{exercise}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Estimated {activeChapter.duration || '15-20 minutes'}
                  </div>
                  <Button 
                    onClick={() => {
                      if (isChapterCompleted(activeChapter.id)) {
                        markChapterIncomplete(activeChapter.id)
                      } else {
                        markChapterComplete(activeChapter.id)
                      }
                    }}
                    variant={isChapterCompleted(activeChapter.id) ? "outline" : "default"}
                    className={isChapterCompleted(activeChapter.id) ? "text-green-600 border-green-600 hover:bg-green-50" : ""}
                  >
                    {isChapterCompleted(activeChapter.id) ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Completed
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Complete
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Progress */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overall Progress</span>
                <span className="text-sm font-medium text-gray-900">{getProgressPercentage()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {progress?.completedChapters.length || 0} of {chapters.length} chapters completed
                </span>
                {isCourseCompleted() && (
                  <span className="text-green-600 font-medium">Course Completed!</span>
                )}
              </div>
            </div>
          </div>

          {/* Course Actions */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Actions</h3>
            <div className="space-y-3">
              <Link href={`/dashboard/courses/${course.id}/edit`} className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Course Details
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Add Chapter
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Share Course
              </Button>
            </div>
          </div>

          {/* Chapter List */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Chapters</h3>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => setActiveChapter(chapter)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    activeChapter?.id === chapter.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      isChapterCompleted(chapter.id) ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isChapterCompleted(chapter.id) ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {chapter.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {chapter.description}
                      </p>
                    </div>
                    {isChapterCompleted(chapter.id) && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Course Stats */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Students</span>
                </div>
                <span className="text-sm font-medium text-gray-900">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Play className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Total Duration</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {chapters.length * 15} min
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Chapters</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{chapters.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
