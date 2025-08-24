// Sign In Page with Role-Based Demo Access
// Based on PRD authentication requirements

'use client'

import { useState, useEffect, Suspense } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  AcademicCapIcon,
  UserIcon,
  ShieldCheckIcon,
  CogIcon,
  BuildingOfficeIcon,
  UsersIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState(searchParams?.get('email') || '')

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push('/dashboard')
      }
    })
  }, [router])

  const handleSignIn = async (email: string) => {
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        email,
        password: 'demo123',
        redirect: false,
      })

      if (result?.error) {
        toast.error('Sign in failed. Please try again.')
      } else {
        toast.success('Successfully signed in!')
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('An error occurred during sign in.')
    } finally {
      setLoading(false)
    }
  }

  const demoUsers = [
    {
      email: 'teacher@demo.ie',
      name: 'Sarah O\'Connor',
      role: 'Teacher/Examiner',
      description: 'Review AI marking decisions, override when needed, track marking progress',
      icon: AcademicCapIcon,
      color: 'default' as const,
    },
    {
      email: 'student@demo.ie',
      name: 'Liam Murphy',
      role: 'Student',
      description: 'View results, detailed feedback, initiate appeals, academic planning',
      icon: UserIcon,
      color: 'success' as const,
    },
    {
      email: 'reviewer@demo.ie',
      name: 'Dr. Patricia Walsh',
      role: 'Reviewer/Moderator',
      description: 'Quality assurance, appeals processing, system monitoring',
      icon: ShieldCheckIcon,
      color: 'warning' as const,
    },
    {
      email: 'admin@sec.ie',
      name: 'Michael Johnson',
      role: 'SEC Administrator',
      description: 'System administration, user management, comprehensive reporting',
      icon: CogIcon,
      color: 'info' as const,
    },
    {
      email: 'principal@school.ie',
      name: 'Mary Collins',
      role: 'School Administrator',
      description: 'School performance overview, student support, parent communication',
      icon: BuildingOfficeIcon,
      color: 'secondary' as const,
    },
    {
      email: 'parent@demo.ie',
      name: 'John Smith',
      role: 'Parent',
      description: 'Monitor child\'s progress, understand results, access support resources',
      icon: UsersIcon,
      color: 'info' as const,
    },
    {
      email: 'policy@education.ie',
      name: 'Dr. Aoife Ryan',
      role: 'Policy Maker',
      description: 'Strategic analytics, system-wide insights, policy development data',
      icon: GlobeAltIcon,
      color: 'secondary' as const,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Leaving Certificate Platform
          </h1>
          <p className="text-gray-600 mb-4">
            Choose a demo account to explore role-specific features
          </p>
          <Badge variant="info" size="sm">
            Demo Mode - Use password: demo123 for all accounts
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {demoUsers.map((user) => (
            <DemoUserCard
              key={user.email}
              user={user}
              isSelected={selectedEmail === user.email}
              onSelect={() => setSelectedEmail(user.email)}
              onSignIn={() => handleSignIn(user.email)}
              loading={loading && selectedEmail === user.email}
            />
          ))}
        </div>

        {/* Custom Sign In Form */}
        <Card className="max-w-md mx-auto">
          <CardHeader
            title="Custom Sign In"
            subtitle="Or sign in with your own credentials"
          />
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const email = formData.get('email') as string
                if (email) handleSignIn(email)
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your email"
                  defaultValue={selectedEmail}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your password"
                  defaultValue="demo123"
                />
              </div>
              <Button 
                type="submit" 
                fullWidth 
                loading={loading}
                disabled={loading}
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>This is a demonstration platform showcasing AI-assisted marking capabilities.</p>
          <p className="mt-1">Built for the National AI Challenge 2025 - Ireland</p>
        </div>
      </div>
    </div>
  )
}

// Demo User Card Component
interface DemoUserCardProps {
  user: {
    email: string
    name: string
    role: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    color: 'default' | 'success' | 'warning' | 'info' | 'secondary'
  }
  isSelected: boolean
  onSelect: () => void
  onSignIn: () => void
  loading: boolean
}

const DemoUserCard: React.FC<DemoUserCardProps> = ({
  user,
  isSelected,
  onSelect,
  onSignIn,
  loading,
}) => {
  const Icon = user.icon
  
  const colorClasses = {
    default: 'text-primary-600 bg-primary-100',
    success: 'text-success-600 bg-success-100',
    warning: 'text-warning-600 bg-warning-100',
    info: 'text-blue-600 bg-blue-100',
    secondary: 'text-purple-600 bg-purple-100',
  }

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary-500 shadow-md' : ''
      }`}
      onClick={onSelect}
    >
      <CardContent>
        <div className="text-center">
          <div className={`inline-flex p-3 rounded-full mb-3 ${colorClasses[user.color]}`}>
            <Icon className="h-6 w-6" />
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-1">{user.name}</h3>
          <Badge variant={user.color} size="xs" className="mb-2">
            {user.role}
          </Badge>
          
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {user.description}
          </p>
          
          <div className="text-xs text-gray-500 mb-3">
            {user.email}
          </div>
          
          <Button 
            size="sm" 
            fullWidth
            variant={isSelected ? 'primary' : 'outline'}
            onClick={(e) => {
              e.stopPropagation()
              onSignIn()
            }}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  )
}