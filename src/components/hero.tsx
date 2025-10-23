'use client'

import { Button } from '@/components/ui/button'
import { SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { ArrowRight, BookOpen, Brain, Zap, Users, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Generate Amazing
                <span className="gradient-text block">AI-Powered Courses</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Create comprehensive, engaging courses with AI assistance. 
                From content generation to multimedia integration, build 
                professional educational experiences in minutes.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg" className="group">
                    Start Creating Courses
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard/create">
                  <Button size="lg" className="group">
                    Start Creating Course
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </SignedIn>
              <Link href="/demo">
                <Button variant="outline" size="lg">
                  Try Demo
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-600">Courses Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">50K+</div>
                <div className="text-sm text-gray-600">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">4.9★</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Content */}
          <div className="relative">
            {/* Main Hero Image */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 card-hover">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">AI Course Generator</h3>
                      <p className="text-sm text-gray-500">Creating your course...</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Course Preview */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Brain className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-gray-900">Course Outline Generated</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-blue-200 rounded-full w-full"></div>
                      <div className="h-2 bg-blue-200 rounded-full w-4/5"></div>
                      <div className="h-2 bg-blue-200 rounded-full w-3/4"></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-gray-900">Adding Multimedia Content</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded p-2 flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span className="text-xs text-gray-600">Videos</span>
                      </div>
                      <div className="bg-white rounded p-2 flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-xs text-gray-600">Images</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-4/5 transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 card-hover">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-sm font-medium">Live Users</div>
                  <div className="text-xs text-gray-500">1,234 online</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 card-hover">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <div className="text-sm font-medium">Rating</div>
                  <div className="text-xs text-gray-500">4.9/5 stars</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
