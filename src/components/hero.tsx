'use client'

import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { ArrowRight, BookOpen, Brain, Zap, PlayCircle, Sparkles, CheckCircle2, ShieldCheck, Code2 } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-24 md:py-32">
      {/* Subtle Glowing Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-purple-600/30 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-blue-400 text-xs font-semibold tracking-wide backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>Free &amp; Open-Source AI Education Engine</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Learn Any Skill With <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  Personalized AI Courses
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Generate structured, multi-chapter curricula complete with integrated YouTube tutorials, practical coding exercises, and real-time progress tracking.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/dashboard/create">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-6 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-95 text-base">
                  Start Creating Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 font-medium px-7 py-6 rounded-2xl backdrop-blur-md transition-all text-base">
                  <PlayCircle className="mr-2 h-5 w-5 text-indigo-400" />
                  Try Sandbox Demo
                </Button>
              </Link>
            </div>

            {/* Open Source Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium text-slate-300">100% Free Core</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <Code2 className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-slate-300">Open Source</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-slate-300">Self-Paced</span>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Glass Card Preview (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/60">
              
              {/* Fake Browser Top */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-700/50">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <span className="text-xs font-mono text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-900/60 border border-slate-700/50">
                  ai-course-generator.engine
                </span>
              </div>

              {/* Dynamic Live Course Mock */}
              <div className="mt-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Autonomous Curriculum Design</h3>
                    <p className="text-xs text-slate-400">Generates 5 comprehensive modules</p>
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-3 bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Curating Chapter Videos</span>
                    <span className="text-emerald-400 font-bold">Done ✓</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full w-full rounded-full"></div>
                  </div>

                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-slate-300 font-medium">Drafting Practical Exercises</span>
                    <span className="text-indigo-400 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-400 h-full w-full rounded-full"></div>
                  </div>
                </div>

                {/* Chapter pills preview */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate text-slate-200">Interactive Tasks</span>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="truncate text-slate-200">Curated Media</span>
                  </div>
                </div>

                {/* Instant Launch Action inside Mock */}
                <Link href="/dashboard/create" className="block">
                  <div className="w-full py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 rounded-xl text-center text-xs font-semibold transition-all">
                    Generate Your Course in 30 Seconds →
                  </div>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
