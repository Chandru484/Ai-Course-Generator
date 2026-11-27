import { Sparkles, Brain, Video, Layers, Users, Shield, Cpu, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Header from '@/components/header'

const features = [
  {
    icon: Brain,
    title: 'AI Curriculum Designer',
    description: 'Transform any topic into a pedagogical structure with comprehensive modules, structured learning objectives, and practical exercises.',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50 text-blue-600'
  },
  {
    icon: Video,
    title: 'Smart Multimedia Curating',
    description: 'Our engine finds high-quality, relevant educational video tutorials for every chapter so students stay engaged.',
    color: 'from-purple-500 to-pink-600',
    bg: 'bg-purple-50 text-purple-600'
  },
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Generate full 5-to-10 chapter interactive courses in under 30 seconds with tailored difficulty levels.',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50 text-amber-600'
  },
  {
    icon: Layers,
    title: 'Adaptive Difficulty',
    description: 'Target beginners, intermediates, or experts. AI customizes tone, complexity, and coding depth accordingly.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 text-emerald-600'
  },
  {
    icon: Users,
    title: 'Student Tracking & Progress',
    description: 'Built-in tracking lets learners track their completions, practice exercises, and measure mastery chapter-by-chapter.',
    color: 'from-cyan-500 to-blue-600',
    bg: 'bg-cyan-50 text-cyan-600'
  },
  {
    icon: Shield,
    title: 'Export & Backup',
    description: 'Own your course content. Export full course outlines and chapters to JSON or backup storage anytime.',
    color: 'from-rose-500 to-red-600',
    bg: 'bg-rose-50 text-rose-600'
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      {/* Hero Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Empowered by AI
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Powerful Features for Modern Creators
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to craft, organize, and deliver immersive educational courses in minutes instead of months.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to create your first course?</h2>
            <p className="text-blue-100 max-w-xl">
              Start now for free. Experience instant outline generation and multimedia-rich learning.
            </p>
          </div>
          <Link href="/dashboard/create">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-slate-100 font-semibold px-6 shadow-md whitespace-nowrap">
              Create a Course Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
