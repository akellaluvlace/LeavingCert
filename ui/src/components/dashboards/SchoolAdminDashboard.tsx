// School Administrator Dashboard Implementation
// Based on PRD Section: School Administrator Journey and Performance Monitoring

'use client'

import React, { useState } from 'react'
import { clsx } from 'clsx'
import {
  BuildingOfficeIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  TrophyIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge, GradeBadge } from '../ui/Badge'

export const SchoolAdminDashboard: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'overview' | 'subjects' | 'students'>('overview')
  
  // Mock school data
  const schoolData = {
    name: 'St. Mary\'s Secondary School',
    studentCount: 487,
    teacherCount: 34,
    currentYear: 2024,
    overallPerformance: 87.3,
    nationalRanking: 23,
    improvementTrend: 5.2
  }

  const subjectPerformance = [
    { subject: 'Mathematics', averageGrade: 'B1', percentage: 82.4, trend: 'up', students: 89 },
    { subject: 'English', averageGrade: 'A2', percentage: 89.1, trend: 'up', students: 89 },
    { subject: 'Irish', averageGrade: 'B2', percentage: 78.6, trend: 'down', students: 89 },
    { subject: 'History', averageGrade: 'A2', percentage: 85.7, trend: 'up', students: 67 },
    { subject: 'Geography', averageGrade: 'B1', percentage: 81.3, trend: 'stable', students: 54 },
    { subject: 'Biology', averageGrade: 'A2', percentage: 88.9, trend: 'up', students: 43 },
  ]

  return (
    <div className="space-y-6">
      {/* School Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SchoolStatCard
          title="Total Students"
          value={schoolData.studentCount}
          subtitle="Active LC students"
          icon={AcademicCapIcon}
          color="primary"
        />
        <SchoolStatCard
          title="Overall Performance"
          value={`${schoolData.overallPerformance}%`}
          subtitle="Above national average"
          icon={TrophyIcon}
          color="success"
          trend={schoolData.improvementTrend}
        />
        <SchoolStatCard
          title="National Ranking"
          value={`#${schoolData.nationalRanking}`}
          subtitle="Out of 734 schools"
          icon={ChartBarIcon}
          color="info"
        />
        <SchoolStatCard
          title="Staff Count"
          value={schoolData.teacherCount}
          subtitle="Teaching faculty"
          icon={UsersIcon}
          color="secondary"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setSelectedView('overview')}
          className={clsx(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            selectedView === 'overview'
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          )}
        >
          School Overview
        </button>
        <button
          onClick={() => setSelectedView('subjects')}
          className={clsx(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            selectedView === 'subjects'
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          )}
        >
          Subject Performance
        </button>
        <button
          onClick={() => setSelectedView('students')}
          className={clsx(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            selectedView === 'students'
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          )}
        >
          Student Management
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {selectedView === 'overview' && <SchoolOverviewSection />}
          {selectedView === 'subjects' && <SubjectPerformanceSection subjects={subjectPerformance} />}
          {selectedView === 'students' && <StudentManagementSection />}
        </div>

        {/* Right Column: School Actions & Info */}
        <div className="space-y-6">
          <QuickActionsCard />
          <CommunicationCard />
          <UpcomingEventsCard />
        </div>
      </div>
    </div>
  )
}

// School Stat Card Component
interface SchoolStatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
  color: 'primary' | 'success' | 'info' | 'secondary'
  trend?: number
}

const SchoolStatCard: React.FC<SchoolStatCardProps> = ({ title, value, subtitle, icon: Icon, color, trend }) => {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-100',
    success: 'text-success-600 bg-success-100',
    info: 'text-blue-600 bg-blue-100',
    secondary: 'text-purple-600 bg-purple-100',
  }

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
            {trend !== undefined && (
              <div className="flex items-center mt-2">
                {trend > 0 ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 text-success-600 mr-1" />
                ) : (
                  <ArrowTrendingDownIcon className="h-4 w-4 text-danger-600 mr-1" />
                )}
                <span className={`text-xs font-medium ${trend > 0 ? 'text-success-600' : 'text-danger-600'}`}>
                  {Math.abs(trend)}% vs last year
                </span>
              </div>
            )}
          </div>
          <div className={clsx('p-3 rounded-full', colorClasses[color])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// School Overview Section
const SchoolOverviewSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Performance Summary"
          subtitle="Academic year 2023-2024 results overview"
        />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Grade Distribution</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">A Grades</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="w-12 bg-success-500 h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">34%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">B Grades</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="w-10 bg-blue-500 h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">41%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">C Grades</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="w-6 bg-warning-500 h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">D/E/F Grades</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="w-2 bg-gray-400 h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">7%</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Key Achievements</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-success-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">23 students achieved 600+ points</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-success-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Mathematics performance up 8.4%</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-success-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">100% university acceptance rate</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-warning-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Irish language scores need attention</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title="Comparison with National Averages"
          subtitle="How our school performs against national benchmarks"
        />
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-success-50 rounded-lg border border-success-200">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-success-900">Above National Average</h5>
                  <p className="text-sm text-success-700">School performing +12.3% better than national average</p>
                </div>
                <TrophyIcon className="h-8 w-8 text-success-600" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">87.3%</p>
                <p className="text-sm text-gray-600">School Average</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">75.0%</p>
                <p className="text-sm text-gray-600">National Average</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Subject Performance Section
const SubjectPerformanceSection: React.FC<{ subjects: any[] }> = ({ subjects }) => {
  return (
    <Card>
      <CardHeader
        title="Subject Performance Analysis"
        subtitle="Detailed breakdown by subject area"
      />
      <CardContent>
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <SubjectPerformanceItem key={index} subject={subject} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Subject Performance Item
const SubjectPerformanceItem: React.FC<{ subject: any }> = ({ subject }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowTrendingUpIcon className="h-4 w-4 text-success-600" />
      case 'down':
        return <ArrowTrendingDownIcon className="h-4 w-4 text-danger-600" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <div>
          <h4 className="font-medium text-gray-900">{subject.subject}</h4>
          <p className="text-sm text-gray-600">{subject.students} students</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{subject.percentage}%</p>
          <p className="text-xs text-gray-600">Average Score</p>
        </div>
        
        <GradeBadge grade={subject.averageGrade} />
        
        <div className="flex items-center">
          {getTrendIcon(subject.trend)}
        </div>
        
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </div>
    </div>
  )
}

// Student Management Section
const StudentManagementSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Student Overview"
          subtitle="Current Leaving Certificate cohort"
        />
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-900">487</p>
              <p className="text-sm text-blue-700">Total Students</p>
            </div>
            <div className="text-center p-4 bg-success-50 rounded-lg">
              <p className="text-2xl font-bold text-success-900">456</p>
              <p className="text-sm text-success-700">On Track</p>
            </div>
            <div className="text-center p-4 bg-warning-50 rounded-lg">
              <p className="text-2xl font-bold text-warning-900">31</p>
              <p className="text-sm text-warning-700">Need Support</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title="Support Required"
          subtitle="Students requiring additional attention"
        />
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-warning-50 rounded-lg">
              <div>
                <p className="font-medium text-warning-900">Academic Support</p>
                <p className="text-sm text-warning-700">18 students below expected performance</p>
              </div>
              <Button variant="warning" size="sm">Review</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Attendance Issues</p>
                <p className="text-sm text-blue-700">8 students with attendance concerns</p>
              </div>
              <Button variant="outline" size="sm">Contact</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-purple-900">Career Guidance</p>
                <p className="text-sm text-purple-700">5 students awaiting guidance meetings</p>
              </div>
              <Button variant="outline" size="sm">Schedule</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Quick Actions Card
const QuickActionsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader title="Quick Actions" />
      <CardContent>
        <div className="space-y-3">
          <Button variant="primary" fullWidth leftIcon={<DocumentChartBarIcon className="h-4 w-4" />}>
            Generate School Report
          </Button>
          <Button variant="outline" fullWidth leftIcon={<ChatBubbleLeftRightIcon className="h-4 w-4" />}>
            Contact Parents
          </Button>
          <Button variant="outline" fullWidth leftIcon={<AcademicCapIcon className="h-4 w-4" />}>
            Schedule Staff Meeting
          </Button>
          <Button variant="ghost" fullWidth leftIcon={<BuildingOfficeIcon className="h-4 w-4" />}>
            School Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Communication Card
const CommunicationCard: React.FC = () => {
  const recentMessages = [
    { from: 'Department of Education', subject: 'LC 2024 Updates', time: '2 hours ago', urgent: true },
    { from: 'Parent Council', subject: 'Meeting Minutes', time: '1 day ago', urgent: false },
    { from: 'Staff Room', subject: 'Next Week Schedule', time: '3 days ago', urgent: false },
  ]

  return (
    <Card>
      <CardHeader
        title="Recent Communications"
        action={
          <Button variant="outline" size="sm">
            View All
          </Button>
        }
      />
      <CardContent>
        <div className="space-y-3">
          {recentMessages.map((message, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-900">{message.subject}</h5>
                  <p className="text-xs text-gray-600">{message.from}</p>
                </div>
                {message.urgent && (
                  <Badge variant="danger" size="xs">Urgent</Badge>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">{message.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Upcoming Events Card
const UpcomingEventsCard: React.FC = () => {
  const events = [
    { title: 'Parent-Teacher Meetings', date: 'Oct 15-17, 2024', type: 'meeting' },
    { title: 'Mock Examinations', date: 'Nov 4-8, 2024', type: 'exam' },
    { title: 'Career Guidance Fair', date: 'Nov 22, 2024', type: 'event' },
    { title: 'Winter Break', date: 'Dec 20 - Jan 8', type: 'break' },
  ]

  return (
    <Card>
      <CardHeader title="Upcoming Events" />
      <CardContent>
        <div className="space-y-3">
          {events.map((event, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                <p className="text-xs text-gray-600">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}