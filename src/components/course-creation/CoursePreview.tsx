'use client'

import { useCourseCreation } from '@/context/CourseCreationContext'
import { Wand2, BookOpen, Users, Clock, Target, CheckCircle } from 'lucide-react'

export default function CoursePreview() {
  const { formData, selectedCategory } = useCourseCreation()

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Beginner'
      case 'intermediate':
        return 'Intermediate'
      case 'advanced':
        return 'Advanced'
      default:
        return 'Beginner'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Preview</h2>
        <p className="text-gray-600">
          Review your course details before AI generation begins.
        </p>
      </div>

      {/* Course Overview Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
        <div className="flex items-start space-x-6">
          {/* Course Icon */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>

          {/* Course Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900">{formData.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(formData.difficulty || 'beginner')}`}>
                {getDifficultyLabel(formData.difficulty || 'beginner')}
              </span>
            </div>
            
            <p className="text-gray-700 mb-4">{formData.description}</p>

            {/* Course Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">{formData.duration} hours</span>
              </div>
              
              {formData.targetAudience && (
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">{formData.targetAudience}</span>
                </div>
              )}
              
              {selectedCategory && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{selectedCategory.icon}</span>
                  <span className="text-sm text-gray-600">{selectedCategory.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* What AI Will Generate */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Wand2 className="h-5 w-5 text-purple-600 mr-2" />
          What AI Will Generate
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-700">Course outline and structure</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-700">Detailed chapter content</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-700">Learning objectives</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-700">Relevant YouTube videos</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-700">Course thumbnail image</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-700">Interactive elements</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Topics Preview */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Expected Course Topics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            'Introduction',
            'Core Concepts',
            'Practical Examples',
            'Advanced Topics',
            'Best Practices',
            'Real Projects',
            'Troubleshooting',
            'Next Steps'
          ].map((topic, index) => (
            <div key={index} className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium text-center">
              {topic}
            </div>
          ))}
        </div>
      </div>

      {/* Generation Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Target className="h-6 w-6 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Ready to Generate</h4>
            <p className="text-blue-700 text-sm">
              Click "Generate Course" to create your AI-powered course. This process typically takes 30-60 seconds 
              and will create a comprehensive course structure with chapters, content, and multimedia elements.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
