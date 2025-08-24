// Main Layout Component with Navigation
// Based on PRD wireframe recommendations and RBAC

'use client'

import React, { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { getDashboardNavigationForRole } from '@/lib/auth'
import { UserRole } from '@/types/auth'
import { Button } from './Button'
import { Badge } from './Badge'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  actions?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  actions 
}) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (status === 'loading') {
    return <LoadingLayout />
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  const navigation = getDashboardNavigationForRole((session.user as any)?.role as UserRole)
  const userRole = (session.user as any)?.role as UserRole
  
  const getRoleDisplayName = (role: UserRole) => {
    const roleNames = {
      [UserRole.TEACHER_EXAMINER]: 'Teacher/Examiner',
      [UserRole.STUDENT]: 'Student',
      [UserRole.REVIEWER_MODERATOR]: 'Reviewer/Moderator', 
      [UserRole.SEC_ADMINISTRATOR]: 'SEC Administrator',
      [UserRole.SCHOOL_ADMINISTRATOR]: 'School Administrator',
      [UserRole.PARENT]: 'Parent',
      [UserRole.POLICY_MAKER]: 'Policy Maker',
    }
    return roleNames[role] || role
  }

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar */}
      <div className={clsx(
        'fixed inset-0 z-50 lg:hidden',
        sidebarOpen ? 'block' : 'hidden'
      )}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <Sidebar navigation={navigation} pathname={pathname} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <Sidebar navigation={navigation} pathname={pathname} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <button
                  type="button"
                  className="lg:hidden -ml-2 mr-2 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
                <div>
                  {title && (
                    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                  )}
                  {subtitle && (
                    <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {actions}
                
                {/* GraidGenie Link */}
                <a
                  href="https://www.graidgenie.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center px-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
                >
                  🚀 GraidGenie.com
                </a>
                
                {/* Notifications */}
                <button className="p-2 text-gray-500 hover:text-gray-700 relative">
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-danger-500 rounded-full"></span>
                </button>
                
                {/* User menu */}
                <div className="flex items-center space-x-3">
                  <div className="text-right text-sm">
                    <div className="font-medium text-gray-900">{(session.user as any)?.name}</div>
                    <div className="text-gray-600">{getRoleDisplayName(userRole)}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSignOut}
                      leftIcon={<ArrowRightOnRectangleIcon className="h-4 w-4" />}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

// Sidebar Component
interface SidebarProps {
  navigation: Array<{
    name: string
    href: string
    icon: string
  }>
  pathname: string
}

const Sidebar: React.FC<SidebarProps> = ({ navigation, pathname }) => {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-900">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h2 className="text-white text-lg font-semibold">
            AI Leaving Cert Platform
          </h2>
        </div>
        <nav className="mt-8 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'group flex items-center px-2 py-3 text-sm font-medium rounded-md',
                  isActive 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                )}
              >
                <span className="mr-3 h-6 w-6" aria-hidden="true">
                  {/* Icon would be rendered here based on item.icon */}
                  <div className="h-6 w-6 bg-gray-600 rounded" />
                </span>
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      
      {/* System status indicator */}
      <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
        <div className="flex items-center text-sm text-gray-300">
          <div className="h-2 w-2 bg-success-500 rounded-full mr-2"></div>
          System Operational
        </div>
      </div>
    </div>
  )
}

// Loading Layout Component
const LoadingLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  )
}