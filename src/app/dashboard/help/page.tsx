'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Mail, 
  BookOpen,
  Video,
  FileText,
  ChevronRight
} from 'lucide-react'

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const helpCategories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: BookOpen,
      articles: [
        { title: 'How to create your first course', description: 'Step-by-step guide to creating courses' },
        { title: 'Understanding the dashboard', description: 'Learn about your dashboard features' },
        { title: 'Setting up your profile', description: 'Complete your profile setup' }
      ]
    },
    {
      id: 'course-creation',
      name: 'Course Creation',
      icon: Video,
      articles: [
        { title: 'Using AI to generate content', description: 'Maximize AI assistance for course creation' },
        { title: 'Adding videos and multimedia', description: 'Integrate videos and images into courses' },
        { title: 'Organizing course chapters', description: 'Structure your course content effectively' }
      ]
    },
    {
      id: 'account',
      name: 'Account & Settings',
      icon: FileText,
      articles: [
        { title: 'Managing your account', description: 'Update account information and settings' },
        { title: 'Privacy and security', description: 'Protect your data and privacy' },
        { title: 'Billing and subscription', description: 'Manage your subscription and billing' }
      ]
    }
  ]

  const faqs = [
    {
      question: 'How does the AI course generation work?',
      answer: 'Our AI analyzes your course requirements and generates comprehensive content including chapters, learning objectives, and practical exercises. It uses advanced language models to create educational content tailored to your specific topic and audience.'
    },
    {
      question: 'Can I edit the AI-generated content?',
      answer: 'Yes! All AI-generated content can be edited and customized. You have full control over the course structure, content, and multimedia elements.'
    },
    {
      question: 'How do I add videos to my courses?',
      answer: 'The system automatically finds relevant YouTube videos based on your course topic. You can also manually add your own video URLs or upload videos directly.'
    },
    {
      question: 'Is there a limit to the number of courses I can create?',
      answer: 'On the free plan, you can create up to 5 courses. Premium plans offer unlimited course creation with additional features.'
    },
    {
      question: 'How do I share my courses with students?',
      answer: 'You can share courses via direct links, embed them on your website, or publish them to our marketplace for wider distribution.'
    }
  ]

  const filteredCategories = selectedCategory === 'all' 
    ? helpCategories 
    : helpCategories.filter(cat => cat.id === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-1">Find answers to your questions and learn how to use our platform</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-sm text-gray-600 mb-4">Get instant help from our support team</p>
          <Button variant="outline" size="sm">Start Chat</Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-sm text-gray-600 mb-4">Send us a detailed message</p>
          <Button variant="outline" size="sm">Send Email</Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Video className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Video Tutorials</h3>
          <p className="text-sm text-gray-600 mb-4">Watch step-by-step tutorials</p>
          <Button variant="outline" size="sm">View Videos</Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        {helpCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Help Articles */}
      <div className="space-y-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <category.icon className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {category.articles.map((article, index) => (
                <div key={index} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{article.title}</h3>
                      <p className="text-sm text-gray-600">{article.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6">
              <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Still need help?</h3>
        <p className="text-blue-800 mb-4">
          Our support team is here to help you succeed. Reach out to us anytime!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact Support
          </Button>
          <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
            <Mail className="mr-2 h-4 w-4" />
            support@aicoursegenerator.com
          </Button>
        </div>
      </div>
    </div>
  )
}
