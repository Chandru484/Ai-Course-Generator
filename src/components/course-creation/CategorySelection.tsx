'use client'

import { useCourseCreation } from '@/context/CourseCreationContext'
import { Category } from '@/types'
import { Button } from '@/components/ui/button'

export default function CategorySelection() {
  const { categories, selectedCategory, setSelectedCategory } = useCourseCreation()

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Course Category</h2>
        <p className="text-gray-600">
          Select the category that best fits your course topic. This helps us generate relevant content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md ${
              selectedCategory?.id === category.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{category.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
              {selectedCategory?.id === category.id && (
                <div className="bg-blue-500 text-white rounded-full p-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">{selectedCategory.icon}</div>
            <div>
              <h4 className="font-medium text-blue-900">Selected: {selectedCategory.name}</h4>
              <p className="text-blue-700 text-sm">{selectedCategory.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
