// Landing Page
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import {
  AcademicCapIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

export default function LandingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  if (status === 'loading') {
    return <LoadingScreen />
  }

  if (session) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Leaving Certificate
            <span className="text-primary-600 block">Correction Platform</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transforming Ireland's educational assessment system through intelligent automation,
            ensuring fairness, efficiency, and transparency for all stakeholders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="min-w-[200px]"
              onClick={() => window.location.href = '/auth/signin'}
            >
              Try Demo Platform
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="min-w-[200px]"
              onClick={() => window.open('https://www.graidgenie.com/', '_blank')}
            >
              Visit GraidGenie.com
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            icon={<AcademicCapIcon className="h-8 w-8" />}
            title="AI-Assisted Marking"
            description="Advanced AI agents provide accurate, consistent marking with detailed explanations."
          />
          <FeatureCard
            icon={<ClockIcon className="h-8 w-8" />}
            title="70% Faster Results"
            description="Dramatically reduced processing time with real-time progress tracking."
          />
          <FeatureCard
            icon={<ShieldCheckIcon className="h-8 w-8" />}
            title="Transparent & Fair"
            description="Complete explainability with bias detection and comprehensive audit trails."
          />
          <FeatureCard
            icon={<ChartBarIcon className="h-8 w-8" />}
            title="Rich Analytics"
            description="Detailed insights and analytics for all stakeholders to support decision making."
          />
        </div>

        {/* Integration Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powered by GraidGenie Technology
            </h2>
            <p className="text-gray-600 mb-6">
              This AI-Powered Leaving Certificate Platform leverages cutting-edge grading technology 
              from GraidGenie.com to deliver accurate, fair, and transparent assessment solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => window.open('https://www.graidgenie.com/', '_blank')}
                className="min-w-[250px]"
              >
                🚀 Explore GraidGenie Platform
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = '/auth/signin'}
                className="min-w-[250px]"
              >
                🇮🇪 Try Irish LC Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Experience the Platform
          </h2>
          <p className="text-gray-600 mb-8">
            Try our demo with different user roles to see how the platform serves each stakeholder.
          </p>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <DemoRoleCard role="Teacher" email="teacher@demo.ie" />
            <DemoRoleCard role="Student" email="student@demo.ie" />
            <DemoRoleCard role="Reviewer" email="reviewer@demo.ie" />
            <DemoRoleCard role="Administrator" email="admin@sec.ie" />
            <DemoRoleCard role="School Admin" email="principal@school.ie" />
            <DemoRoleCard role="Parent" email="parent@demo.ie" />
            <DemoRoleCard role="Policy Maker" email="policy@education.ie" />
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Use password: <code className="bg-gray-100 px-2 py-1 rounded">demo123</code> for all demo accounts
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Impact</h2>
            <p className="text-gray-600">Real results from our AI-assisted marking system</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">€50M+</div>
              <div className="text-gray-600">Annual Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success-600 mb-2">94.2%</div>
              <div className="text-gray-600">AI Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning-600 mb-2">70%</div>
              <div className="text-gray-600">Time Reduction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">4.2/5</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 space-y-2">
          <p>&copy; 2024 AI Leaving Certificate Platform. Built for Ireland's educational future.</p>
          <p className="text-sm">
            Powered by{' '}
            <a 
              href="https://www.graidgenie.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              GraidGenie.com
            </a>
            {' '}• Advanced AI Grading Technology
          </p>
        </div>
      </div>
    </div>
  )
}

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="text-center hover:shadow-md transition-shadow">
      <CardContent padding="lg">
        <div className="text-primary-600 mb-4 flex justify-center">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

// Demo Role Card Component
interface DemoRoleCardProps {
  role: string
  email: string
}

const DemoRoleCard: React.FC<DemoRoleCardProps> = ({ role, email }) => {
  const handleClick = () => {
    window.location.href = `/auth/signin?email=${encodeURIComponent(email)}`
  }

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick}>
      <CardContent padding="sm">
        <div className="text-center">
          <h4 className="font-medium text-gray-900 mb-1">{role}</h4>
          <p className="text-xs text-gray-600">{email}</p>
        </div>
      </CardContent>
    </Card>
  )
}

// Loading Screen Component
const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading platform...</p>
      </div>
    </div>
  )
}