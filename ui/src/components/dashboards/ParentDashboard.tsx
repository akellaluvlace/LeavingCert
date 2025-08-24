// Parent Dashboard Implementation
// Based on PRD Section: Parent Journey and Child Monitoring

'use client'

import React, { useState } from 'react'
import { clsx } from 'clsx'
import {
  UserIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  TrophyIcon,
  CalendarIcon,
  BellIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge, GradeBadge } from '../ui/Badge'

export const ParentDashboard: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState('child-1')
  
  // Mock child data - parents may have multiple children
  const children = [
    {
      id: 'child-1',
      name: 'Emma Smith',
      year: '6th Year',
      school: 'St. Mary\'s Secondary School',
      overallPerformance: 85.2,
      recentResults: {
        mathematics: { grade: 'A2', marks: 87, maxMarks: 100 },
        english: { grade: 'B1', marks: 76, maxMarks: 100 },
        irish: { grade: 'B2', marks: 68, maxMarks: 100 },
        history: { grade: 'A1', marks: 92, maxMarks: 100 },
      },
      nextExam: { subject: 'Biology', date: 'Nov 15, 2024' },
      attendance: 94.5,
      coursePreferences: ['Medicine', 'Biomedical Science', 'Psychology'],
    }
  ]

  const currentChild = children.find(c => c.id === selectedChild) || children[0]

  return (
    <div className="space-y-6">
      {/* Child Selection Header */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <UserIcon className="h-12 w-12 text-gray-400 bg-gray-100 p-3 rounded-full" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{currentChild.name}</h2>
                <p className="text-gray-600">{currentChild.year} • {currentChild.school}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Overall Performance</p>
                <p className="text-2xl font-bold text-primary-600">{currentChild.overallPerformance}%</p>
              </div>
              <Button variant="outline" size="sm">
                Switch Child
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ParentStatCard
          title="Overall Grade"
          value="B1+"
          subtitle="Above class average"
          icon={TrophyIcon}
          color="success"
          trend="improving"
        />
        <ParentStatCard
          title="Attendance"
          value={`${currentChild.attendance}%`}
          subtitle="Above 90% target"
          icon={CalendarIcon}
          color="primary"
        />
        <ParentStatCard
          title="Next Exam"
          value={currentChild.nextExam.subject}
          subtitle={currentChild.nextExam.date}
          icon={BookOpenIcon}
          color="warning"
        />
        <ParentStatCard
          title="Course Applications"
          value="3 Selected"
          subtitle="CAO preferences"
          icon={DocumentTextIcon}
          color="info"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Child's Performance */}
        <div className="lg:col-span-2 space-y-6">
          <RecentResultsCard results={currentChild.recentResults} />
          <AcademicProgressCard child={currentChild} />
        </div>

        {/* Right Column: Parent Actions & Communication */}
        <div className="space-y-6">
          <ParentActionsCard />
          <CommunicationCard />
          <SupportResourcesCard />
        </div>
      </div>

      {/* Bottom Section: Detailed Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CoursePreferencesCard preferences={currentChild.coursePreferences} />
        <UpcomingEventsCard />
      </div>
    </div>
  )
}

// Parent Stat Card Component
interface ParentStatCardProps {
  title: string
  value: string
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
  color: 'success' | 'primary' | 'warning' | 'info'
  trend?: 'improving' | 'stable' | 'declining'
}

const ParentStatCard: React.FC<ParentStatCardProps> = ({ title, value, subtitle, icon: Icon, color, trend }) => {
  const colorClasses = {
    success: 'text-success-600 bg-success-100',
    primary: 'text-primary-600 bg-primary-100',
    warning: 'text-warning-600 bg-warning-100',
    info: 'text-blue-600 bg-blue-100',
  }

  const trendColors = {
    improving: 'text-success-600',
    stable: 'text-gray-600',
    declining: 'text-warning-600',
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
            {trend && (
              <div className="flex items-center mt-2">
                <div className={`text-xs font-medium ${trendColors[trend]}`}>
                  {trend === 'improving' && '↗ Improving'}
                  {trend === 'stable' && '→ Stable'}
                  {trend === 'declining' && '↘ Needs attention'}
                </div>
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

// Recent Results Card
const RecentResultsCard: React.FC<{ results: any }> = ({ results }) => {
  return (
    <Card>
      <CardHeader
        title="Recent Results"
        subtitle="Latest examination scores and feedback"
        action={
          <Button variant="outline" size="sm">
            View All Results
          </Button>
        }
      />
      <CardContent>
        <div className="space-y-4">
          {Object.entries(results).map(([subject, result]: [string, any]) => (
            <div key={subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">{subject}</h4>
                <p className="text-sm text-gray-600">
                  {result.marks}/{result.maxMarks} marks ({Math.round((result.marks / result.maxMarks) * 100)}%)
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <GradeBadge grade={result.grade} />
                <Button variant="ghost" size="sm">
                  View Feedback
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Academic Progress Card
const AcademicProgressCard: React.FC<{ child: any }> = ({ child }) => {
  return (
    <Card>
      <CardHeader
        title="Academic Progress"
        subtitle="Performance trends and insights"
      />
      <CardContent>
        <div className="space-y-6">
          {/* Progress Chart Placeholder */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-2">Performance Trend</h4>
              <p className="text-3xl font-bold text-primary-600 mb-2">↗ +5.2%</p>
              <p className="text-sm text-gray-600">Improvement over last semester</p>
            </div>
          </div>

          {/* Subject Strengths and Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                <CheckCircleIcon className="h-4 w-4 text-success-600 mr-2" />
                Strengths
              </h5>
              <ul className="text-sm space-y-1">
                <li className="text-success-700">• Strong in mathematical reasoning</li>
                <li className="text-success-700">• Excellent historical analysis</li>
                <li className="text-success-700">• Good problem-solving skills</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                <ExclamationCircleIcon className="h-4 w-4 text-warning-600 mr-2" />
                Areas for Improvement
              </h5>
              <ul className="text-sm space-y-1">
                <li className="text-warning-700">• Irish language comprehension</li>
                <li className="text-warning-700">• Essay writing structure</li>
                <li className="text-warning-700">• Time management in exams</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Parent Actions Card
const ParentActionsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader title="Quick Actions" />
      <CardContent>
        <div className="space-y-3">
          <Button variant="primary" fullWidth leftIcon={<DocumentTextIcon className="h-4 w-4" />}>
            Download Progress Report
          </Button>
          <Button variant="outline" fullWidth leftIcon={<ChatBubbleLeftRightIcon className="h-4 w-4" />}>
            Contact Teachers
          </Button>
          <Button variant="outline" fullWidth leftIcon={<CalendarIcon className="h-4 w-4" />}>
            Schedule Meeting
          </Button>
          <Button variant="ghost" fullWidth leftIcon={<QuestionMarkCircleIcon className="h-4 w-4" />}>
            Get Support
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Communication Card
const CommunicationCard: React.FC = () => {
  const messages = [
    {
      from: 'Ms. O\'Connor (Mathematics)',
      message: 'Emma is doing excellent work in calculus. Consider additional practice for trigonometry.',
      time: '2 days ago',
      priority: 'normal'
    },
    {
      from: 'School Principal',
      message: 'Parent-teacher meetings scheduled for October 15-17. Please book your slot.',
      time: '1 week ago',
      priority: 'high'
    },
    {
      from: 'Career Guidance',
      message: 'Course selection deadline approaching. Schedule consultation if needed.',
      time: '3 days ago',
      priority: 'normal'
    }
  ]

  return (
    <Card>
      <CardHeader
        title="Recent Communications"
        action={
          <Badge variant="info" size="sm">
            3 New
          </Badge>
        }
      />
      <CardContent>
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h5 className="text-sm font-medium text-gray-900">{msg.from}</h5>
                {msg.priority === 'high' && (
                  <Badge variant="warning" size="xs">Priority</Badge>
                )}
              </div>
              <p className="text-sm text-gray-700 mb-2">{msg.message}</p>
              <p className="text-xs text-gray-500">{msg.time}</p>
            </div>
          ))}
        </div>
        <Button variant="ghost" fullWidth className="mt-4">
          View All Messages
        </Button>
      </CardContent>
    </Card>
  )
}

// Support Resources Card
const SupportResourcesCard: React.FC = () => {
  const resources = [
    { title: 'Study Tips for Parents', type: 'guide', url: '#' },
    { title: 'Understanding LC Grades', type: 'explainer', url: '#' },
    { title: 'Mental Health Support', type: 'support', url: '#' },
    { title: 'University Application Guide', type: 'guide', url: '#' },
  ]

  return (
    <Card>
      <CardHeader title="Support Resources" />
      <CardContent>
        <div className="space-y-3">
          {resources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div>
                <p className="text-sm font-medium text-gray-900">{resource.title}</p>
                <p className="text-xs text-gray-600 capitalize">{resource.type}</p>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Course Preferences Card
const CoursePreferencesCard: React.FC<{ preferences: string[] }> = ({ preferences }) => {
  return (
    <Card>
      <CardHeader
        title="CAO Course Preferences"
        subtitle="Current course selections for university application"
      />
      <CardContent>
        <div className="space-y-4">
          {preferences.map((course, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Choice {index + 1}</p>
                <p className="text-sm text-blue-700">{course}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-success-700 font-medium">Points Met ✓</p>
                <p className="text-xs text-gray-600">Based on current performance</p>
              </div>
            </div>
          ))}
          
          <div className="mt-4 p-3 bg-success-50 rounded-lg border border-success-200">
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-success-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-success-900">On Track for Preferred Courses</p>
                <p className="text-xs text-success-700">Current performance meets requirements for all selections</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Upcoming Events Card
const UpcomingEventsCard: React.FC = () => {
  const events = [
    {
      title: 'Parent-Teacher Conference',
      date: 'October 16, 2024',
      time: '3:30 PM',
      location: 'School Main Hall',
      type: 'meeting'
    },
    {
      title: 'Biology Mock Exam',
      date: 'November 15, 2024',
      time: '9:00 AM',
      location: 'Exam Hall A',
      type: 'exam'
    },
    {
      title: 'University Open Day',
      date: 'November 23, 2024', 
      time: '10:00 AM',
      location: 'Trinity College Dublin',
      type: 'event'
    }
  ]

  return (
    <Card>
      <CardHeader title="Upcoming Events" />
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
              <CalendarIcon className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-medium text-gray-900">{event.title}</h5>
                <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                <p className="text-xs text-gray-500">{event.location}</p>
              </div>
              <Button variant="outline" size="sm">
                Add to Calendar
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}