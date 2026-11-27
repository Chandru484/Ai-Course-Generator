'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Brain, Zap, PlayCircle, Sparkles, CheckCircle2, ShieldCheck, Code2 } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let rafId = 0
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY || 0)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    setMouse({ x: nx, y: ny })
  }

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 })
  }

  // Clamp scroll parallax so it stays smooth in the hero viewport
  const clampedScroll = Math.min(scrollY, 700)

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-gradient-to-b from-[#060911] via-[#09111a] to-[#060911] text-white py-24 md:py-32"
    >
      {/* Subtle Parallax Grid Mesh */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #2dd4bf 1px, transparent 1px), linear-gradient(to bottom, #2dd4bf 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          transform: `translate3d(0, ${clampedScroll * 0.14}px, 0)`,
        }}
      />

      {/* Multi-Layer Parallax Aurora Glowing Orbs */}
      <div
        className="absolute top-1/4 left-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-emerald-500/25 via-teal-500/20 to-cyan-500/25 blur-[135px] rounded-full pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(calc(-50% + ${mouse.x * -36}px), calc(-50% + ${clampedScroll * 0.25 + mouse.y * -24}px), 0)`,
        }}
      />
      <div
        className="absolute top-1/2 right-6 w-[340px] h-[340px] bg-cyan-400/15 blur-[110px] rounded-full pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouse.x * 28}px, ${clampedScroll * -0.18 + mouse.y * 28}px, 0)`,
        }}
      />
      <div
        className="absolute bottom-8 left-12 w-[260px] h-[260px] bg-amber-400/10 blur-[100px] rounded-full pointer-events-none"
        style={{
          transform: `translate3d(${mouse.x * 18}px, ${clampedScroll * -0.12}px, 0)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Hero Content (7 cols) with subtle upward scroll parallax */}
          <div
            className="lg:col-span-7 space-y-8 text-center lg:text-left will-change-transform"
            style={{
              transform: `translate3d(0, ${clampedScroll * 0.06}px, 0)`,
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Free &amp; Open-Source AI Education Engine</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Learn Any Skill With <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
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
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-slate-950 font-bold px-8 py-6 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-95 text-base"
                >
                  Start Creating Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-teal-800/70 bg-slate-900/70 hover:bg-slate-800/90 text-teal-100 font-medium px-7 py-6 rounded-2xl backdrop-blur-md transition-all text-base"
                >
                  <PlayCircle className="mr-2 h-5 w-5 text-emerald-400" />
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
                <Code2 className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-medium text-slate-300">Open Source</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-medium text-slate-300">Self-Paced</span>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Parallax Glass Card Preview (5 cols) */}
          <div
            className="lg:col-span-5 relative will-change-transform transition-transform duration-200 ease-out"
            style={{
              transform: `translate3d(${mouse.x * 16}px, ${clampedScroll * -0.07 + mouse.y * 16}px, 0) perspective(1000px) rotateY(${mouse.x * 6}deg) rotateX(${mouse.y * -6}deg)`,
            }}
          >
            {/* Floating Parallax Chip Top-Left */}
            <div
              className="hidden sm:flex items-center gap-2 absolute -top-4 -left-4 z-20 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-emerald-500/30 shadow-lg shadow-emerald-950/50 backdrop-blur-md text-xs font-semibold text-emerald-300 transition-transform duration-200 ease-out"
              style={{
                transform: `translate3d(${mouse.x * -14}px, ${clampedScroll * -0.13 + mouse.y * -12}px, 0)`,
              }}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Built in &lt;60s</span>
            </div>

            {/* Floating Parallax Chip Bottom-Right */}
            <div
              className="hidden sm:flex items-center gap-2 absolute -bottom-4 -right-3 z-20 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-cyan-500/30 shadow-lg shadow-cyan-950/50 backdrop-blur-md text-xs font-semibold text-cyan-300 transition-transform duration-200 ease-out"
              style={{
                transform: `translate3d(${mouse.x * 18}px, ${clampedScroll * 0.11 + mouse.y * 14}px, 0)`,
              }}
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>5+ Chapters Ready</span>
            </div>

            <div className="relative rounded-3xl bg-slate-900/60 border border-teal-500/20 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/50">
              {/* Fake Browser Top */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <span className="text-xs font-mono text-teal-300/80 px-2.5 py-0.5 rounded-full bg-slate-950/70 border border-teal-500/20">
                  ai-course-generator.engine
                </span>
              </div>

              {/* Dynamic Live Course Mock */}
              <div className="mt-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Autonomous Curriculum Design</h3>
                    <p className="text-xs text-slate-400">Generates 5 comprehensive modules</p>
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Curating Chapter Videos</span>
                    <span className="text-emerald-400 font-bold">Done ✓</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full w-full rounded-full"></div>
                  </div>

                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-slate-300 font-medium">Drafting Practical Exercises</span>
                    <span className="text-cyan-400 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-400 to-cyan-400 h-full w-full rounded-full"></div>
                  </div>
                </div>

                {/* Chapter pills preview */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate text-slate-200">Interactive Tasks</span>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate text-slate-200">Curated Media</span>
                  </div>
                </div>

                {/* Instant Launch Action inside Mock */}
                <Link href="/dashboard/create" className="block">
                  <div className="w-full py-3 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 rounded-xl text-center text-xs font-semibold transition-all">
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
