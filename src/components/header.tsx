'use client'

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { BookOpen, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="glass-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-2 rounded-xl shadow-md shadow-emerald-500/20">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-black tracking-tight gradient-text">AI Course Studio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="/" className="text-slate-600 hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link href="/features" className="text-slate-600 hover:text-emerald-600 transition-colors">
              Features
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-emerald-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
            <Link href="/demo" className="text-slate-600 hover:text-emerald-600 transition-colors">
              Demo
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="font-semibold text-slate-700 hover:text-slate-900 rounded-xl">
                  Sign In
                </Button>
              </SignInButton>
              <Link href="/dashboard/create">
                <Button size="sm" className="btn-primary">
                  Start Creating
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="rounded-xl border-slate-300 font-medium">
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/features" className="text-gray-700 hover:text-blue-600 transition-colors">
                Features
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
              <div className="pt-4 border-t space-y-2">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="w-full">Get Started</Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard" className="block">
                    <Button variant="outline" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                </SignedIn>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
