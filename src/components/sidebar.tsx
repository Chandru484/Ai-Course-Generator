'use client'

import { Button } from '@/components/ui/button'
import { 
  Home, 
  BookOpen, 
  Plus, 
  Settings, 
  BarChart3, 
  Users,
  HelpCircle,
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Courses', href: '/dashboard/courses', icon: BookOpen },
  { name: 'Create Course', href: '/dashboard/create', icon: Plus },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Students', href: '/dashboard/students', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const secondaryNavigation = [
  { name: 'Help & Support', href: '/dashboard/help', icon: HelpCircle },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm border-r min-h-screen">
      <div className="p-6">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-2 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">AI Courses</span>
        </Link>

        {/* Main Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Secondary Navigation */}
        <nav className="mt-8 pt-8 border-t border-gray-200 space-y-2">
          {secondaryNavigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:bg-gray-100"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
