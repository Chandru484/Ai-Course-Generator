'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useCourseCreation } from '@/context/CourseCreationContext'
import { useCourseCreation as useCourseCreationTracking } from '@/hooks/useCourseManagement'
import { CourseGenerationRequest, Category } from '@/types'
import { EnhancedAPIService } from '@/lib/enhanced-api'
import { ArrowLeft, ArrowRight, Wand2, BookOpen, Users, Clock } from 'lucide-react'
import CategorySelection from './CategorySelection'
import CourseDetails from './CourseDetails'
import CoursePreview from './CoursePreview'
import { useRouter } from 'next/navigation'

const steps = [
  { id: 0, title: 'Category', description: 'Choose your course category' },
  { id: 1, title: 'Details', description: 'Provide course information' },
  { id: 2, title: 'Preview', description: 'Review and generate' }
]

export default function CourseCreationForm() {
  const router = useRouter()
  const {
    formData,
    setFormData,
    activeStep,
    setActiveStep,
    isGenerating,
    setIsGenerating,
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    resetForm
  } = useCourseCreation()

  const {
    isCreating,
    progress,
    currentStep,
    error: creationError,
    createdCourse,
    createCourse,
    resetTracking
  } = useCourseCreationTracking()

  const [generatedCourse, setGeneratedCourse] = useState<any>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      // Use enhanced API for better content
      const categoriesData = await EnhancedAPIService.getCategories()
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleGenerateCourse = async () => {
    try {
      const courseRequest: CourseGenerationRequest = {
        title: formData.title || '',
        description: formData.description || '',
        category: selectedCategory?.name || formData.category || '',
        topic: formData.topic || '',
        targetAudience: formData.targetAudience || '',
        difficulty: formData.difficulty || 'beginner',
        duration: formData.duration || 1
      }

      console.log('🚀 Enhanced API: Generating course with:', courseRequest)
      
      // Use the new course creation tracking
      const course = await createCourse(courseRequest)
      console.log('✅ Course generated successfully:', course)
      setGeneratedCourse(course)
      
      // Redirect to course page after generation
      setTimeout(() => {
        console.log('🔄 Redirecting to course:', `/dashboard/courses/${course.id}`)
        router.push(`/dashboard/courses/${course.id}`)
      }, 2000)
      
    } catch (error) {
      console.error('Error generating course:', error)
      alert('Failed to generate course. Please try again.')
    }
  }

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return selectedCategory !== null
      case 1:
        return formData.title && formData.description && formData.topic
      case 2:
        return true
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <CategorySelection />
      case 1:
        return <CourseDetails />
      case 2:
        return <CoursePreview />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  activeStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}
              >
                {activeStep > step.id ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{step.id + 1}</span>
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${activeStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden md:block w-16 h-0.5 ml-4 ${activeStep > step.id ? 'bg-blue-600' : 'bg-gray-300'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={activeStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center space-x-4">
          {activeStep === steps.length - 1 ? (
            <Button
              onClick={handleGenerateCourse}
              disabled={!canProceed() || isCreating}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Course...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Course
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Generation Status */}
      {isCreating && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-4"></div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-blue-900">AI is generating your course...</h3>
              <p className="text-blue-700 mt-1">
                {currentStep}
              </p>
              <div className="mt-2">
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-sm text-blue-600">
                  {progress}% complete
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {creationError && (
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-full mr-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-red-900">Course Generation Failed</h3>
              <p className="text-red-700 mt-1">
                {creationError}
              </p>
              <Button 
                onClick={resetTracking}
                className="mt-2"
                variant="outline"
                size="sm"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Generated Course Preview */}
      {generatedCourse && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-4">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-green-900">Course Generated Successfully!</h3>
              <p className="text-green-700 mt-1">
                Redirecting you to your new course...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
