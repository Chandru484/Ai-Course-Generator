'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { CourseGenerationRequest, Category } from '@/types'

interface CourseCreationContextType {
  // Form state
  formData: Partial<CourseGenerationRequest>
  setFormData: (data: Partial<CourseGenerationRequest>) => void
  
  // UI state
  activeStep: number
  setActiveStep: (step: number) => void
  
  // Loading states
  isGenerating: boolean
  setIsGenerating: (loading: boolean) => void
  
  // Categories
  categories: Category[]
  setCategories: (categories: Category[]) => void
  
  // Selected category
  selectedCategory: Category | null
  setSelectedCategory: (category: Category | null) => void
  
  // Reset function
  resetForm: () => void
}

const CourseCreationContext = createContext<CourseCreationContextType | undefined>(undefined)

const initialFormData: Partial<CourseGenerationRequest> = {
  title: '',
  description: '',
  category: '',
  topic: '',
  targetAudience: '',
  difficulty: 'beginner',
  duration: 1
}

export function CourseCreationProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<Partial<CourseGenerationRequest>>(initialFormData)
  const [activeStep, setActiveStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const resetForm = () => {
    setFormData(initialFormData)
    setActiveStep(0)
    setIsGenerating(false)
    setSelectedCategory(null)
  }

  const value: CourseCreationContextType = {
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
  }

  return (
    <CourseCreationContext.Provider value={value}>
      {children}
    </CourseCreationContext.Provider>
  )
}

export function useCourseCreation() {
  const context = useContext(CourseCreationContext)
  if (context === undefined) {
    throw new Error('useCourseCreation must be used within a CourseCreationProvider')
  }
  return context
}
