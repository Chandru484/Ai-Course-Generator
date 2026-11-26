'use client'

import { CourseCreationProvider } from '@/context/CourseCreationContext'
import CourseCreationForm from '@/components/course-creation/CourseCreationForm'

export default function CreateCoursePage() {
  return (
    <CourseCreationProvider>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
          <p className="text-gray-600 mt-2">
            Use AI to generate a comprehensive course with content, videos, and interactive elements.
          </p>
        </div>
        
        <CourseCreationForm />
      </div>
    </CourseCreationProvider>
  )
}
