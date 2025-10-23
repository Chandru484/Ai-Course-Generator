'use client'

import Header from '@/components/header'
import { 
  Brain, 
  Video, 
  BookOpen, 
  Users, 
  Zap, 
  Shield, 
  BarChart3, 
  Globe, 
  Smartphone,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Lightbulb,
  Rocket
} from 'lucide-react'
import Link from 'next/link'

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Content Generation",
      description: "Generate comprehensive, engaging course content using advanced AI technology. Create detailed outlines, learning objectives, and practical exercises.",
      benefits: [
        "Comprehensive course outlines",
        "Learning objectives and exercises",
        "Practical real-world examples",
        "Adaptive content difficulty"
      ],
      color: "blue"
    },
    {
      icon: Video,
      title: "Smart Video Integration",
      description: "Automatically find and integrate relevant YouTube videos for each chapter. Enhance learning with multimedia content.",
      benefits: [
        "Automatic video discovery",
        "Relevant content matching",
        "Seamless video embedding",
        "Quality content curation"
      ],
      color: "red"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Course Management",
      description: "Organize, edit, and manage your courses with our intuitive dashboard. Track progress and analytics.",
      benefits: [
        "Course organization",
        "Progress tracking",
        "Edit and update courses",
        "Export/import functionality"
      ],
      color: "green"
    },
    {
      icon: Users,
      title: "User-Friendly Interface",
      description: "Designed for educators of all technical levels. Simple, intuitive interface that makes course creation effortless.",
      benefits: [
        "Intuitive design",
        "Step-by-step guidance",
        "Mobile responsive",
        "Accessibility features"
      ],
      color: "purple"
    },
    {
      icon: Zap,
      title: "Lightning Fast Generation",
      description: "Create complete courses in minutes, not hours. Our optimized AI delivers high-quality content quickly.",
      benefits: [
        "Rapid content generation",
        "Optimized performance",
        "Real-time progress tracking",
        "Instant preview"
      ],
      color: "yellow"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your content and data are protected with enterprise-grade security. Reliable service with 99.9% uptime.",
      benefits: [
        "Data encryption",
        "Secure storage",
        "Regular backups",
        "Privacy protection"
      ],
      color: "indigo"
    }
  ]

  const stats = [
    { number: "10K+", label: "Courses Created", icon: BookOpen },
    { number: "50K+", label: "Happy Users", icon: Users },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "4.9★", label: "User Rating", icon: Star }
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Powerful Features for
              <span className="gradient-text block">Course Creation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover the comprehensive suite of tools that make creating professional courses effortless and engaging.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard/create">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center group">
                  Start Creating Courses
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/demo">
                <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-colors">
                  Try Demo
                </button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Create Amazing Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive feature set empowers educators to create professional, engaging courses with minimal effort.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                  feature.color === 'blue' ? 'bg-blue-100' :
                  feature.color === 'red' ? 'bg-red-100' :
                  feature.color === 'green' ? 'bg-green-100' :
                  feature.color === 'purple' ? 'bg-purple-100' :
                  feature.color === 'yellow' ? 'bg-yellow-100' :
                  'bg-indigo-100'
                }`}>
                  <feature.icon className={`h-6 w-6 ${
                    feature.color === 'blue' ? 'text-blue-600' :
                    feature.color === 'red' ? 'text-red-600' :
                    feature.color === 'green' ? 'text-green-600' :
                    feature.color === 'purple' ? 'text-purple-600' :
                    feature.color === 'yellow' ? 'text-yellow-600' :
                    'text-indigo-600'
                  }`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Creating professional courses has never been easier. Follow these simple steps to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Define Your Course</h3>
              <p className="text-gray-600">
                Choose your topic, target audience, and difficulty level. Our AI will understand your requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. AI Generates Content</h3>
              <p className="text-gray-600">
                Our advanced AI creates comprehensive course outlines, chapters, and learning materials.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Launch Your Course</h3>
              <p className="text-gray-600">
                Review, customize, and publish your course. Track student progress and engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of educators who are already creating amazing courses with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/create">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center group">
                Start Creating Courses
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/demo">
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                Try Demo First
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
