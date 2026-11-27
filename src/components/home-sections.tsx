'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Brain, Video, LayoutDashboard, Sparkles, GitBranch, Globe } from 'lucide-react'

const features = [
  {
    icon: Brain,
    color: 'from-emerald-500 to-teal-600',
    glow: 'hover:shadow-emerald-500/15',
    title: 'AI Content Generation',
    desc: 'Generate structured, multi-chapter curricula using GPT-powered intelligence. Every course is tailored to your chosen topic and difficulty level.',
  },
  {
    icon: Video,
    color: 'from-teal-500 to-cyan-600',
    glow: 'hover:shadow-teal-500/15',
    title: 'YouTube Integration',
    desc: 'Automatically fetch the most relevant tutorial videos for each chapter so learners get the best visual content without manual curation.',
  },
  {
    icon: LayoutDashboard,
    color: 'from-cyan-500 to-sky-600',
    glow: 'hover:shadow-cyan-500/15',
    title: 'Smart Dashboard',
    desc: 'Manage every course you create in one intuitive dashboard. Track progress, pick up where you left off, and stay organized.',
  },
  {
    icon: Sparkles,
    color: 'from-amber-400 to-orange-500',
    glow: 'hover:shadow-amber-500/15',
    title: 'Self-Paced Learning',
    desc: 'Chapter-by-chapter progress tracking with local persistence. Learn at your own pace and resume anytime — no deadlines, no pressure.',
  },
  {
    icon: GitBranch,
    color: 'from-emerald-400 to-green-600',
    glow: 'hover:shadow-emerald-500/15',
    title: 'Open Source',
    desc: 'Fully transparent codebase on GitHub. Fork it, improve it, and contribute back to the community. Education should be open to all.',
  },
  {
    icon: Globe,
    color: 'from-sky-400 to-teal-500',
    glow: 'hover:shadow-sky-500/15',
    title: 'Any Topic, Any Skill',
    desc: 'From machine learning to medieval history — generate a full course on any subject in seconds with no prior curriculum knowledge required.',
  },
]

const steps = [
  { step: '01', title: 'Enter Your Topic', desc: 'Type any subject you want to learn or teach. The AI handles the rest.' },
  { step: '02', title: 'AI Builds the Curriculum', desc: 'GPT designs a structured multi-chapter course plan with exercises.' },
  { step: '03', title: 'Videos Auto-Attached', desc: 'Relevant YouTube tutorials are sourced and embedded per chapter.' },
  { step: '04', title: 'Start Learning', desc: 'Jump in, track progress, and master the subject at your own pace.' },
]

export default function HomeSections() {
  const [scrollY, setScrollY] = useState(0)

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

  return (
    <>
      {/* ── How It Works (with Scroll Parallax) ── */}
      <section className="relative py-24 bg-[#060911] overflow-hidden">
        {/* Parallax ambient orbs */}
        <div
          className="absolute -left-24 top-12 w-[380px] h-[380px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"
          style={{ transform: `translate3d(0, ${(scrollY - 600) * 0.12}px, 0)` }}
        />
        <div
          className="absolute -right-24 bottom-8 w-[340px] h-[340px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"
          style={{ transform: `translate3d(0, ${(scrollY - 600) * -0.1}px, 0)` }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <span className="inline-block text-xs font-bold tracking-widest text-emerald-400 uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              How It Works
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-white">
              From idea to full course in{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                under a minute
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              No curriculum design experience needed. Just describe what you want to learn.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, title, desc }, idx) => (
              <div
                key={step}
                className="relative group rounded-2xl bg-slate-900/60 border border-slate-800/90 p-6 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-950/50 backdrop-blur-sm"
                style={{
                  transform: `translate3d(0, ${Math.max(-14, Math.min(14, (scrollY - 750) * (idx % 2 === 0 ? -0.025 : 0.025)))}px, 0)`,
                }}
              >
                <span className="text-5xl font-black text-slate-800 select-none group-hover:text-emerald-500/30 transition-colors">
                  {step}
                </span>
                <h3 className="mt-3 text-base font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features (with Parallax Background Layer) ── */}
      <section className="relative py-24 bg-gradient-to-b from-[#060911] via-[#0a131c] to-[#060911] overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 w-[820px] h-[420px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 blur-[160px] rounded-full pointer-events-none"
          style={{
            transform: `translate3d(-50%, calc(-50% + ${(scrollY - 1250) * 0.14}px), 0)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <span className="inline-block text-xs font-bold tracking-widest text-cyan-400 uppercase px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              Features
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-white">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                learn without limits
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A complete, free, open-source AI learning platform built for self-learners and educators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, color, glow, title, desc }) => (
              <div
                key={title}
                className={`group rounded-2xl bg-slate-900/60 border border-slate-800/90 p-7 hover:border-teal-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${glow} backdrop-blur-sm`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg shadow-black/30 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-slate-950" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner (with Parallax Glow) ── */}
      <section className="relative py-28 overflow-hidden bg-[#060911]">
        <div
          className="absolute inset-0 bg-gradient-to-br from-emerald-600/15 via-teal-600/10 to-cyan-600/15 pointer-events-none"
          style={{ transform: `translate3d(0, ${(scrollY - 1900) * 0.08}px, 0)` }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
          <span className="inline-block text-xs font-bold tracking-widest text-emerald-400 uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            100% Free · Open Source · No Credit Card
          </span>

          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            Ready to build your first{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              AI-powered course?
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Join learners and creators who are already generating personalized courses on any topic — in seconds, completely free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard/create"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-5 h-5" />
              Start Creating for Free
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base text-teal-100 bg-slate-900/70 border border-teal-800/60 hover:bg-slate-800 hover:border-teal-600/60 transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-md"
            >
              Explore Features →
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            {[
              { emoji: '⚡', label: 'Course in <60s' },
              { emoji: '🔓', label: 'Open Source' },
              { emoji: '🎓', label: 'Self-Paced' },
              { emoji: '🤖', label: 'GPT-Powered' },
            ].map(({ emoji, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-slate-400">
                <span>{emoji}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
