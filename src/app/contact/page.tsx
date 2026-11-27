'use client'

import { Mail, MessageSquare, MapPin, Send, CheckCircle, Clock } from 'lucide-react'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      {/* Header Banner */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto">
            Have questions about generating courses, suggestions, or need assistance? Reach out to us below.
          </p>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid md:grid-cols-5 gap-10">
          
          {/* Info cards (2 cols) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Contact Channels</h3>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Email Us</p>
                  <p className="text-sm text-slate-600">support@aicoursegenerator.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Response Time</p>
                  <p className="text-sm text-slate-600">Within 24 hours on business days</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Community Support</p>
                  <p className="text-sm text-slate-600">GitHub Issues & Discussions</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-md">
              <h4 className="font-bold text-lg mb-2">Need an Instant Test?</h4>
              <p className="text-blue-100 text-sm mb-4">
                You can try course generation immediately without creating an account using our local demo sandbox.
              </p>
              <a href="/demo">
                <Button variant="secondary" size="sm" className="bg-white text-blue-700 hover:bg-slate-100 font-semibold">
                  Launch Demo Mode
                </Button>
              </a>
            </div>
          </div>

          {/* Form (3 cols) */}
          <div className="md:col-span-3 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-slate-600 max-w-sm mx-auto">
                  Thank you for reaching out. Our team will review your message and reply promptly.
                </p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="mt-4"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Feedback, Question, or Partnership"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea 
                    required 
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
                >
                  {loading ? 'Sending...' : (
                    <>
                      <Send className="w-4 h-4 mr-2" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
