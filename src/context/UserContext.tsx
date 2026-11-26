'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { StorageService } from '@/lib/storage'

interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  initializeUser: () => void
  isInitialized: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const initializeUser = async () => {
    try {
      const currentUser = await StorageService.getCurrentUser()
      if (currentUser) {
        setUser({
          ...currentUser,
          createdAt: new Date() // Default for existing users
        })
      } else {
        // Create a default user for demo purposes
        const defaultUser: User = {
          id: `user_${Date.now()}`,
          name: 'Course Creator',
          email: 'creator@example.com',
          createdAt: new Date()
        }
        await StorageService.setCurrentUser(defaultUser)
        setUser(defaultUser)
      }
    } catch (error) {
      console.error('Error initializing user:', error)
    } finally {
      setIsInitialized(true)
    }
  }

  useEffect(() => {
    initializeUser()
  }, [])

  const handleSetUser = async (newUser: User | null) => {
    setUser(newUser)
    if (newUser) {
      await StorageService.setCurrentUser(newUser)
    }
  }

  const value: UserContextType = {
    user,
    setUser: handleSetUser,
    initializeUser,
    isInitialized
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
