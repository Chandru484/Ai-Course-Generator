import { BookOpen, CheckCircle, Code, GraduationCap, Heart, Rocket, Target, Users } from 'lucide-react'
import Header from '@/components/header'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      {/* Hero Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold mb-4">
            <Rocket className="w-3.5 h-3.5" /> Our Mission
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Democratizing Education With Intelligent AI
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            We believe anyone with knowledge should be able to turn their expertise into a world-class course without spending hundreds of hours authoring.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Focused Learning</h3>
            <p className="text-slate-600 text-sm">
              Structured modules designed to eliminate fluff and deliver high-signal education directly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Modern Tech Stack</h3>
            <p className="text-slate-600 text-sm">
              Built on Next.js 14, Tailwind CSS, Clerk Auth, and Gemini/OpenAI intelligence.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">For Every Learner</h3>
            <p className="text-slate-600 text-sm">
              From beginner foundations to advanced architectures, adaptable for any skill tier.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why AI Course Generator?</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              Traditional course creation involves weeks of outlining, searching for relevant multimedia, drafting step-by-step exercises, and formatting.
            </p>
            <p>
              AI Course Generator bridges that gap. By combining the latest LLM reasoning with automated YouTube educational curation, instructors and students get structured learning paths in seconds.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-wrap gap-6 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                AI
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">AI Course Generator</p>
                <p className="text-xs text-slate-500">Autonomous EdTech Platform</p>
              </div>
            </div>
            <Link href="/dashboard/create">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Try it Yourself
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
