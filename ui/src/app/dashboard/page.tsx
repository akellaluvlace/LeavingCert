// Main Dashboard Router based on User Role
// Routes users to appropriate dashboard based on their role

'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Layout } from '@/components/ui/Layout'
import { TeacherDashboard } from '@/components/dashboards/TeacherDashboard'
import { StudentDashboard } from '@/components/dashboards/StudentDashboard'
import { SECAdminDashboard } from '@/components/dashboards/SECAdminDashboard'
import { SchoolAdminDashboard } from '@/components/dashboards/SchoolAdminDashboard'
import { ParentDashboard } from '@/components/dashboards/ParentDashboard'
import { PolicyMakerDashboard } from '@/components/dashboards/PolicyMakerDashboard'
import { UserRole } from '@/types/auth'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return <DashboardLoading />
  }

  if (!session) {
    return null // Will redirect
  }

  const userRole = session.user.role as UserRole

  const getDashboardTitle = (role: UserRole) => {
    const titles = {
      [UserRole.TEACHER_EXAMINER]: 'Teacher Dashboard',
      [UserRole.STUDENT]: 'Student Dashboard', 
      [UserRole.REVIEWER_MODERATOR]: 'Reviewer Dashboard',
      [UserRole.SEC_ADMINISTRATOR]: 'Administrator Dashboard',
      [UserRole.SCHOOL_ADMINISTRATOR]: 'School Dashboard',
      [UserRole.PARENT]: 'Parent Dashboard',
      [UserRole.POLICY_MAKER]: 'Policy Dashboard',
    }
    return titles[role] || 'Dashboard'
  }

  const getDashboardSubtitle = (role: UserRole) => {
    const subtitles = {
      [UserRole.TEACHER_EXAMINER]: 'Review and manage examination marking',
      [UserRole.STUDENT]: 'View your results and feedback',
      [UserRole.REVIEWER_MODERATOR]: 'Quality assurance and appeals management',
      [UserRole.SEC_ADMINISTRATOR]: 'System administration and oversight',
      [UserRole.SCHOOL_ADMINISTRATOR]: 'School performance and student management',
      [UserRole.PARENT]: 'Monitor your child\'s academic progress',
      [UserRole.POLICY_MAKER]: 'Strategic insights and policy analytics',
    }
    return subtitles[role] || 'Welcome to the platform'
  }

  const renderRoleBasedDashboard = (role: UserRole) => {
    switch (role) {
      case UserRole.TEACHER_EXAMINER:
        return <TeacherDashboard />
      case UserRole.STUDENT:
        return <StudentDashboard />
      case UserRole.REVIEWER_MODERATOR:
        return <ReviewerDashboard />
      case UserRole.SEC_ADMINISTRATOR:
        return <SECAdminDashboard />
      case UserRole.SCHOOL_ADMINISTRATOR:
        return <SchoolAdminDashboard />
      case UserRole.PARENT:
        return <ParentDashboard />
      case UserRole.POLICY_MAKER:
        return <PolicyMakerDashboard />
      default:
        return <DefaultDashboard />
    }
  }

  return (
    <Layout
      title={getDashboardTitle(userRole)}
      subtitle={getDashboardSubtitle(userRole)}
      actions={
        <div className="flex items-center space-x-2">
          {/* Role-specific actions can be added here */}
        </div>
      }
    >
      {renderRoleBasedDashboard(userRole)}
    </Layout>
  )
}

// Placeholder components for other dashboards (to be implemented)
const ReviewerDashboard = () => (
  <div className="text-center py-12">
    <h2 className="text-xl font-semibold mb-4">Reviewer Dashboard</h2>
    <p className="text-gray-600">Quality assurance and appeals management dashboard coming soon...</p>
  </div>
)

const AdminDashboard = () => (
  <div className="text-center py-12">
    <h2 className="text-xl font-semibold mb-4">Administrator Dashboard</h2>
    <p className="text-gray-600">System administration dashboard coming soon...</p>
  </div>
)

const SchoolDashboard = () => (
  <div className="text-center py-12">
    <h2 className="text-xl font-semibold mb-4">School Administrator Dashboard</h2>
    <p className="text-gray-600">School performance dashboard coming soon...</p>
  </div>
)

const ParentDashboard = () => (
  <div className="text-center py-12">
    <h2 className="text-xl font-semibold mb-4">Parent Dashboard</h2>
    <p className="text-gray-600">Parent monitoring dashboard coming soon...</p>
  </div>
)

const PolicyDashboard = () => (
  <div className="text-center py-12">
    <h2 className="text-xl font-semibold mb-4">Policy Maker Dashboard</h2>
    <p className="text-gray-600">Strategic analytics dashboard coming soon...</p>
  </div>
)

const DefaultDashboard = () => (
  <div className="text-center py-12">
    <h2 className="text-xl font-semibold mb-4">Welcome</h2>
    <p className="text-gray-600">Your dashboard is being prepared...</p>
  </div>
)

// Loading Component
const DashboardLoading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="max-w-md w-full space-y-4">
      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
)