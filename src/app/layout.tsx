import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { UserProvider } from '@/context/UserContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Course Generator',
  description: 'Generate comprehensive courses with AI-powered content and multimedia integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <UserProvider>
        <html lang="en">
          <body className={inter.className}>
            {children}
          </body>
        </html>
      </UserProvider>
    </ClerkProvider>
  )
}
