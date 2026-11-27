import { NextRequest, NextResponse } from 'next/server'
import { CourseGenerationRequest, Chapter, Course } from '@/types'

function generateRealisticChapters(req: CourseGenerationRequest): Array<{
  title: string
  description: string
  content: string
  objectives: string[]
  exercises: string[]
  duration: string
}> {
  const topic = req.topic.trim()
  const diff = req.difficulty || 'beginner'
  const audience = req.targetAudience || 'ambitious learners'

  return [
    {
      title: `1. Foundations of ${topic}`,
      description: `Understand the core architecture, essential principles, and historical evolution of ${topic}.`,
      content: `Welcome to the comprehensive guide on ${topic}. In this opening module, we establish the fundamental mental models required to excel as a ${diff} learner.

### Key Conceptual Pillars
- **Why ${topic} Matters**: Modern workflows demand speed, precision, and reliability. Mastering ${topic} gives ${audience} a decisive advantage.
- **System Architecture**: We dissect how components communicate and the primary abstractions that make ${topic} robust.
- **Terminology & Vocabulary**: Demystifying industry terms so you can read official documentation and collaborate fluently.

### Step-by-Step Overview
1. Inspect your current development or working environment.
2. Verify you have standard toolchains installed.
3. Understand the input-to-output pipeline that governs ${topic}.

Take your time reviewing the accompanying video tutorial and ensure you comprehend the fundamental vocabulary before proceeding to practical implementation.`,
      objectives: [
        `Define core concepts and vocabulary of ${topic}`,
        `Explain how ${topic} operates under real-world conditions`,
        `Set up your workspace and development environment`
      ],
      exercises: [
        `Write down your specific learning goals for ${topic}`,
        `Set up and verify your local tools and environment`,
        `Summarize the 3 core principles in your own words`
      ],
      duration: '20 minutes'
    },
    {
      title: `2. Core Tooling, Syntax & Setup for ${topic}`,
      description: `Hands-on configuration, tooling ecosystem, and foundational workflows for ${topic}.`,
      content: `Now that you understand the background, we dive straight into practical execution.

### Tooling Ecosystem
Every successful practitioner of ${topic} relies on a predictable setup. We configure the standard linters, compilers, libraries, or SDKs needed to produce production-grade work.

### Practical Code / Workflow Walkthrough
- Configuration files and environment initialization
- Writing your first hello-world or minimal viable implementation in ${topic}
- Common debugging flags and troubleshooting steps for common configuration snags

Remember: Mastery is built through repetition. Follow along with the code snippets and replicate each example locally.`,
      objectives: [
        `Configure your environment for ${topic} with zero friction`,
        `Execute your first end-to-end task successfully`,
        `Identify and resolve 3 common configuration pitfalls`
      ],
      exercises: [
        `Create a starter project and run its baseline suite`,
        `Intentionally trigger an error and resolve it using console logs`
      ],
      duration: '30 minutes'
    },
    {
      title: `3. Deep Dive: Key Patterns & Mechanics in ${topic}`,
      description: `Mastering the workhorse patterns, abstractions, and structural techniques used daily in ${topic}.`,
      content: `In this chapter, we unpack the patterns that separate novices from experienced practitioners of ${topic}.

### Structural Patterns
- **Data Flow & State Management**: How information moves through your system cleanly and predictably.
- **Modularity**: Organizing code and logic into reusable, decoupled chunks that are easy to test.
- **Error Handling & Resilience**: Defensive programming strategies designed for real users and real edge cases.

### Real-World Case Study
We explore a practical scenario where a naïve implementation caused performance bottlenecks, and refactor it step-by-step using modern ${topic} paradigms.`,
      objectives: [
        `Implement clean architectural patterns in ${topic}`,
        `Refactor messy spaghetti code into modular units`,
        `Handle exceptions gracefully without crashing`
      ],
      exercises: [
        `Refactor a monolithic example into three modular functions`,
        `Implement custom error handling for edge-case inputs`
      ],
      duration: '35 minutes'
    },
    {
      title: `4. Advanced Techniques & Optimization in ${topic}`,
      description: `Performance tuning, scalability best practices, and enterprise-grade optimizations for ${topic}.`,
      content: `At the ${diff} tier, building things that merely work is not enough—they must be fast, resilient, and maintainable.

### Optimization Strategies
- **Latency & Resource Profiling**: How to measure bottlenecks before attempting premature optimization.
- **Caching & Memoization**: Drastically reducing computational overhead with smart caching layers.
- **Security & Best Practices**: Protecting your ${topic} implementation against security vulnerabilities and resource leaks.

Benchmark before you optimize! Always measure the impact of your architectural changes with repeatable tests.`,
      objectives: [
        `Measure and profile bottlenecks in ${topic}`,
        `Apply caching and efficiency techniques to reduce latency`,
        `Audit your project for security and standard compliance`
      ],
      exercises: [
        `Run a performance benchmark on your project`,
        `Apply an optimization technique and measure the percentage improvement`
      ],
      duration: '40 minutes'
    },
    {
      title: `5. Capstone Project: End-to-End ${topic} Application`,
      description: `Synthesize everything you learned into a complete, portfolio-ready project in ${topic}.`,
      content: `Congratulations on reaching the final chapter! In this capstone, you will build a complete, production-ready project incorporating all the modules of this ${req.duration}-hour curriculum.

### Capstone Scope
You will design, implement, test, and document a full implementation of ${topic} tailored for ${audience}.

### Deliverables Checklist
1. Clean code architecture adhering to best practices.
2. Automated tests or verification checks verifying critical paths.
3. Polished documentation explaining how to launch, configure, and maintain the application.

Review your work against industry benchmarks and publish it proudly to your portfolio!`,
      objectives: [
        `Synthesize modular concepts into a complete application`,
        `Write clear documentation and deployment steps`,
        `Demonstrate mastery of ${topic} for career or project success`
      ],
      exercises: [
        `Build and deploy your capstone project`,
        `Write a 1-page post-mortem reviewing lessons learned and next steps`
      ],
      duration: '45 minutes'
    }
  ]
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CourseGenerationRequest

    if (!body || !body.topic || !body.title) {
      return NextResponse.json({ error: 'Missing required course fields' }, { status: 400 })
    }

    const openaiApiKey = process.env.OPENAI_API_KEY
    let chaptersData: Array<{
      title: string
      description: string
      content: string
      objectives: string[]
      exercises: string[]
      duration: string
    }> | null = null

    // Try OpenAI API if key is present
    if (openaiApiKey && !openaiApiKey.includes('YOUR_OPENAI_API_KEY')) {
      try {
        const prompt = `You are a world-class course curriculum developer.
Create an in-depth, highly structured 5-chapter course on:
Title: "${body.title}"
Topic: "${body.topic}"
Category: "${body.category}"
Target Audience: "${body.targetAudience}"
Difficulty: "${body.difficulty}"
Duration: ${body.duration} hours

Format response ONLY as strict JSON matching this structure:
{
  "chapters": [
    {
      "title": "1. Chapter Title",
      "description": "1-2 sentence overview",
      "content": "Detailed, practical learning content with markdown headings, explanations, code/practical walk-throughs (at least 300 words).",
      "objectives": ["Objective 1", "Objective 2", "Objective 3"],
      "exercises": ["Hands-on task 1", "Hands-on task 2"],
      "duration": "25 minutes"
    }
  ]
}`

        const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo', // Faster, highly reliable, and within token limits
            messages: [
              { role: 'system', content: 'You are an educational curriculum creator that always returns valid JSON.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 3000
          }),
          signal: AbortSignal.timeout(18000)
        })

        if (aiResponse.ok) {
          const aiJson = await aiResponse.json()
          const rawText = aiJson.choices?.[0]?.message?.content || ''
          const cleanedText = rawText.replace(/```json\n?|\n?```/g, '').trim()
          const parsed = JSON.parse(cleanedText)
          if (Array.isArray(parsed.chapters) && parsed.chapters.length >= 3) {
            chaptersData = parsed.chapters
          }
        }
      } catch (err) {
        console.warn('OpenAI generation failed or timed out, using enhanced generator:', err)
      }
    }

    // Fallback to high-signal deterministic curriculum generator
    if (!chaptersData) {
      chaptersData = generateRealisticChapters(body)
    }

    // Lookup relevant videos for each chapter via server endpoint
    const baseUrl = request.nextUrl.origin
    const chaptersWithVideos: Chapter[] = await Promise.all(
      chaptersData.map(async (ch, index) => {
        let videoUrl = 'https://www.youtube.com/watch?v=zOjov-2OZ0E'
        try {
          const q = `${body.topic} ${ch.title} tutorial`
          const vRes = await fetch(`${baseUrl}/api/youtube-search?q=${encodeURIComponent(q)}&maxResults=1`, {
            signal: AbortSignal.timeout(3000)
          })
          if (vRes.ok) {
            const vData = await vRes.json()
            if (vData.videoUrl) videoUrl = vData.videoUrl
          }
        } catch {
          // fallback kept
        }

        return {
          id: `ch_${Date.now()}_${index}`,
          title: ch.title,
          description: ch.description,
          content: ch.content,
          objectives: ch.objectives || [],
          exercises: ch.exercises || [],
          duration: ch.duration || '20 minutes',
          order: index + 1,
          courseId: '',
          videoUrl
        }
      })
    )

    const courseId = `course_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    
    // Choose topic-matching high-resolution Unsplash photo
    const imageKeywords: Record<string, string> = {
      programming: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop&q=80',
      javascript: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=500&fit=crop&q=80',
      python: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=500&fit=crop&q=80',
      react: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop&q=80',
      ai: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&h=500&fit=crop&q=80',
      design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop&q=80',
      business: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80',
      marketing: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=500&fit=crop&q=80',
    }

    const tLower = (body.topic + ' ' + body.category).toLowerCase()
    let imageUrl = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop&q=80'
    for (const [key, url] of Object.entries(imageKeywords)) {
      if (tLower.includes(key)) {
        imageUrl = url
        break
      }
    }

    const finalCourse: Course = {
      id: courseId,
      title: body.title,
      description: body.description,
      category: body.category,
      topic: body.topic,
      targetAudience: body.targetAudience,
      difficulty: body.difficulty,
      duration: body.duration,
      imageUrl,
      chapters: chaptersWithVideos.map(c => ({ ...c, courseId })),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'creator'
    }

    return NextResponse.json({ course: finalCourse })
  } catch (err: any) {
    console.error('Course creation error:', err)
    return NextResponse.json({ error: err.message || 'Failed to generate course' }, { status: 500 })
  }
}
