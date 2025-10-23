'use client'

import { useCourseCreation } from '@/context/CourseCreationContext'
import { Button } from '@/components/ui/button'
import { BookOpen, Users, Clock, Target } from 'lucide-react'

export default function CourseDetails() {
  const { formData, setFormData, selectedCategory } = useCourseCreation()

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value })
  }

  const difficultyOptions = [
    { value: 'beginner', label: 'Beginner', description: 'No prior experience required' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience recommended' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced learners only' }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Details</h2>
        <p className="text-gray-600">
          Provide information about your course to help AI generate relevant content.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Course Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Title *
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Complete React Development Course"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Course Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Description *
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what students will learn in this course..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specific Topic *
            </label>
            <input
              type="text"
              value={formData.topic || ''}
              onChange={(e) => handleInputChange('topic', e.target.value)}
              placeholder="e.g., React Hooks, UI Design, Digital Marketing"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audience
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.targetAudience || ''}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                placeholder="e.g., Web developers, Designers, Entrepreneurs"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Difficulty Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Difficulty Level
            </label>
            <div className="space-y-3">
              {difficultyOptions.map((option) => (
                <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value={option.value}
                    checked={formData.difficulty === option.value}
                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Duration (hours)
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                min="1"
                max="100"
                value={formData.duration || 1}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 1)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Selected Category Display */}
          {selectedCategory && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Selected Category</h4>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{selectedCategory.icon}</div>
                <div>
                  <div className="font-medium text-gray-900">{selectedCategory.name}</div>
                  <div className="text-sm text-gray-600">{selectedCategory.description}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Validation */}
      {(!formData.title || !formData.description || !formData.topic) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <Target className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800 text-sm">
              Please fill in all required fields (marked with *) to continue.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
