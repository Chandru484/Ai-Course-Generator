'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EnhancedAPIService } from '@/lib/enhanced-api'

export default function TestCoursePage() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testCourseCreation = async () => {
    setLoading(true)
    setResult('Testing course creation...')
    
    try {
      // Test course generation
      const courseRequest = {
        title: 'Test JavaScript Course',
        description: 'A test course to verify functionality',
        category: 'Programming',
        topic: 'JavaScript',
        targetAudience: 'Beginners',
        difficulty: 'beginner' as const,
        duration: 2
      }

      setResult('Generating course...')
      const course = await EnhancedAPIService.generateCourse(courseRequest)
      
      setResult(`Course created successfully!\nID: ${course.id}\nTitle: ${course.title}\nChapters: ${course.chapters.length}`)
      
      // Test course retrieval
      setResult(prev => prev + '\n\nTesting course retrieval...')
      const retrievedCourse = await EnhancedAPIService.getCourse(course.id)
      
      if (retrievedCourse) {
        setResult(prev => prev + `\nCourse retrieved successfully!\nTitle: ${retrievedCourse.title}`)
      } else {
        setResult(prev => prev + '\n❌ Course retrieval failed!')
      }
      
      // Test course listing
      setResult(prev => prev + '\n\nTesting course listing...')
      const courses = await EnhancedAPIService.getCourses()
      setResult(prev => prev + `\nTotal courses: ${courses.length}`)
      
    } catch (error) {
      setResult(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testCourseListing = async () => {
    setLoading(true)
    setResult('Testing course listing...')
    
    try {
      const courses = await EnhancedAPIService.getCourses()
      setResult(`Found ${courses.length} courses:\n${courses.map(c => `- ${c.title} (${c.id})`).join('\n')}`)
    } catch (error) {
      setResult(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Course Creation Test</h1>
        
        <div className="space-y-4 mb-8">
          <Button onClick={testCourseCreation} disabled={loading}>
            {loading ? 'Testing...' : 'Test Course Creation'}
          </Button>
          
          <Button onClick={testCourseListing} disabled={loading} variant="outline">
            Test Course Listing
          </Button>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Test Results:</h2>
          <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded">
            {result || 'Click a button to run tests...'}
          </pre>
        </div>
      </div>
    </div>
  )
}
