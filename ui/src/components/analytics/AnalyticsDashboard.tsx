// Complete Analytics and Reporting Dashboard
// Integrates all analytics components for comprehensive reporting

'use client'

import React, { useState } from 'react'
import { AnalyticsDashboard as ChartsDisplay } from './AnalyticsCharts'
import { ExportPanel, RealTimeAnalytics } from './ExportUtilities'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

interface AnalyticsDashboardProps {
  userRole: string
}

export const ComprehensiveAnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ userRole }) => {
  const [activeView, setActiveView] = useState<'charts' | 'export' | 'realtime'>('charts')

  const getViewPermissions = (role: string) => {
    const permissions = {
      'SEC_ADMINISTRATOR': ['charts', 'export', 'realtime'],
      'SCHOOL_ADMINISTRATOR': ['charts', 'export'],
      'POLICY_MAKER': ['charts', 'export', 'realtime'],
      'TEACHER_EXAMINER': ['charts'],
      'REVIEWER_MODERATOR': ['charts', 'export'],
      'PARENT': ['charts'],
      'STUDENT': ['charts']
    }
    
    return permissions[role as keyof typeof permissions] || ['charts']
  }

  const availableViews = getViewPermissions(userRole)

  const views = [
    { 
      id: 'charts', 
      label: 'Analytics Charts', 
      icon: '📊', 
      description: 'Interactive data visualizations' 
    },
    { 
      id: 'export', 
      label: 'Export & Reports', 
      icon: '📄', 
      description: 'Generate and download reports' 
    },
    { 
      id: 'realtime', 
      label: 'Real-time Monitoring', 
      icon: '📡', 
      description: 'Live system performance' 
    }
  ]

  const renderView = () => {
    switch (activeView) {
      case 'charts':
        return <ChartsDisplay userRole={userRole} />
      case 'export':
        return <ExportPanel userRole={userRole} />
      case 'realtime':
        return <RealTimeAnalytics />
      default:
        return <ChartsDisplay userRole={userRole} />
    }
  }

  const getRoleSpecificInsights = () => {
    const insights = {
      'SEC_ADMINISTRATOR': [
        'National accuracy rate increased by 2.3% this quarter',
        'Processing volume up 15% compared to last year',
        '3 schools flagged for quality review'
      ],
      'SCHOOL_ADMINISTRATOR': [
        'School ranking improved to top 25%',
        'Mathematics performance above national average',
        '2 teachers require additional training'
      ],
      'POLICY_MAKER': [
        'Rural schools show 8% improvement in STEM subjects',
        'Digital marking reduces processing time by 40%',
        'Student satisfaction scores at all-time high'
      ],
      'TEACHER_EXAMINER': [
        'Your marking accuracy: 96.8% (above average)',
        'Processing 23% faster than last month',
        'Appeals rate down to 2.1%'
      ]
    }
    
    return insights[userRole as keyof typeof insights] || [
      'Platform performance is optimal',
      'All systems operating normally',
      'Contact support for additional insights'
    ]
  }

  return (
    <div className="space-y-6">
      {/* Analytics Navigation */}
      <Card>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {views
              .filter(view => availableViews.includes(view.id))
              .map((view) => (
              <Button
                key={view.id}
                variant={activeView === view.id ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setActiveView(view.id as any)}
                className="flex items-center space-x-2"
              >
                <span>{view.icon}</span>
                <span>{view.label}</span>
              </Button>
            ))}
          </div>
          
          <div className="text-sm text-gray-600">
            {views.find(v => v.id === activeView)?.description}
          </div>
        </CardContent>
      </Card>

      {/* Role-specific Insights */}
      <Card>
        <CardHeader 
          title="Key Insights"
          subtitle="Personalized analytics for your role"
        />
        <CardContent>
          <div className="space-y-2">
            {getRoleSpecificInsights().map((insight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div className="text-sm text-gray-700">{insight}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions for Role */}
      <Card>
        <CardHeader 
          title="Quick Actions"
          subtitle="Common analytics tasks for your role"
        />
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {userRole === 'SEC_ADMINISTRATOR' && (
              <>
                <Button size="sm" variant="secondary" className="text-xs">
                  Generate National Report
                </Button>
                <Button size="sm" variant="secondary" className="text-xs">
                  School Comparison
                </Button>
                <Button size="sm" variant="secondary" className="text-xs">
                  Quality Audit
                </Button>
                <Button size="sm" variant="secondary" className="text-xs">
                  Export Dashboard
                </Button>
              </>
            )}
            
            {userRole === 'SCHOOL_ADMINISTRATOR' && (
              <>
                <Button size="sm" variant="secondary" className="text-xs">
                  Student Performance
                </Button>
                <Button size="sm" variant="secondary" className="text-xs">
                  Department Analysis
                </Button>
                <Button size="sm" variant="secondary" className="text-xs">
                  Parent Reports
                </Button>
                <Button size="sm" variant="secondary" className="text-xs">
                  Teacher Analytics
                </Button>
              </>
            )}
            
            {userRole === 'TEACHER_EXAMINER' && (
              <>
                <Button size="sm" variant="secondary" className="text-xs">
                  My Performance
                </Button>
                <Button size="sm" variant="secondary" className="text-xs">
                  Subject Trends
                </Button>
                <Button size="sm" variant="secondary" className="text-xs">
                  Time Analysis
                </Button>
                <Button size="sm" variant="secondary" className="text-xs">
                  Quality Metrics
                </Button>
              </>
            )}
            
            {(userRole === 'PARENT' || userRole === 'STUDENT') && (
              <>
                <Button size="sm" variant="secondary" className="text-xs">
                  Progress Report
                </Button>
                <Button size="sm" variant="secondary" className="text-xs">
                  Subject Breakdown
                </Button>
                <Button size="sm" variant="secondary" className="text-xs">
                  Historical Trends
                </Button>
                <Button size="sm" variant="secondary" className="text-xs">
                  Download Results
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Analytics Content */}
      <div className="min-h-[600px]">
        {renderView()}
      </div>

      {/* Analytics Summary Footer */}
      <Card>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Last Updated: {new Date().toLocaleString()}</span>
              <Badge variant="success" size="sm">Live Data</Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="secondary">
                📊 Full Screen
              </Button>
              <Button size="sm" variant="secondary">
                🔄 Refresh
              </Button>
              <Button size="sm" variant="secondary">
                ⚙️ Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Individual Metric Cards for Dashboard Widgets
export const MetricCard: React.FC<{
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'stable'
  icon?: string
}> = ({ title, value, change, trend, icon }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗️'
      case 'down': return '↘️'
      default: return '➡️'
    }
  }

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-600">{title}</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
            {change && (
              <div className={`text-sm mt-1 flex items-center space-x-1 ${getTrendColor()}`}>
                <span>{getTrendIcon()}</span>
                <span>{change}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="text-2xl opacity-50">{icon}</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}