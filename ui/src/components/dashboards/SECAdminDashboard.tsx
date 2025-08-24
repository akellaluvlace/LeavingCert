// SEC Administrator Dashboard Implementation
// Based on PRD Section: SEC Administrator Journey and System Oversight

'use client'

import React, { useState } from 'react'
import { clsx } from 'clsx'
import {
  CogIcon,
  UsersIcon,
  DocumentChartBarIcon,
  ComputerDesktopIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyEuroIcon,
} from '@heroicons/react/24/outline'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge, StatusBadge } from '../ui/Badge'
import { ComprehensiveAnalyticsDashboard } from '../analytics/AnalyticsDashboard'
import { mockSystemStatus, mockPerformanceMetrics, mockAnalyticsData } from '@/lib/mock-data'

export const SECAdminDashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'processing' | 'quality' | 'financial'>('processing')
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics'>('overview')
  
  if (activeTab === 'analytics') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <Button variant="outline" onClick={() => setActiveTab('overview')}>
            ← Back to Overview
          </Button>
        </div>
        <ComprehensiveAnalyticsDashboard userRole="SEC_ADMINISTRATOR" />
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SystemStatusCard
          title="System Health"
          status={mockSystemStatus.overall}
          icon={ComputerDesktopIcon}
          uptime={mockSystemStatus.uptime}
          color="success"
        />
        <StatCard
          title="Active Users"
          value={mockSystemStatus.activeUsers.toLocaleString()}
          subtitle="Current session count"
          icon={UsersIcon}
          color="primary"
        />
        <StatCard
          title="Processing Load"
          value={`${mockSystemStatus.currentLoad}%`}
          subtitle="System capacity utilization"
          icon={ChartBarIcon}
          color={mockSystemStatus.currentLoad > 80 ? 'warning' : 'info'}
          progress={mockSystemStatus.currentLoad}
        />
        <StatCard
          title="Daily Savings"
          value="€143K"
          subtitle="Cost reduction vs manual"
          icon={CurrencyEuroIcon}
          color="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: System Monitoring */}
        <div className="lg:col-span-2 space-y-6">
          <SystemComponentsCard components={mockSystemStatus.components} />
          <ProcessingMetricsCard 
            metrics={mockPerformanceMetrics}
            selectedMetric={selectedMetric}
            onMetricChange={setSelectedMetric}
          />
        </div>

        {/* Right Column: Management Actions */}
        <div className="space-y-6">
          <QuickActionsCard />
          <UserManagementCard />
          <SystemConfigCard />
        </div>
      </div>

      {/* National Overview Section */}
      <NationalOverviewCard />
    </div>
  )
}

// System Status Card Component
interface SystemStatusCardProps {
  title: string
  status: 'operational' | 'degraded' | 'maintenance' | 'outage'
  icon: React.ComponentType<{ className?: string }>
  uptime: number
  color: 'success' | 'warning' | 'danger'
}

const SystemStatusCard: React.FC<SystemStatusCardProps> = ({ title, status, icon: Icon, uptime, color }) => {
  const statusConfig = {
    operational: { text: 'Operational', color: 'success' as const },
    degraded: { text: 'Degraded', color: 'warning' as const },
    maintenance: { text: 'Maintenance', color: 'warning' as const },
    outage: { text: 'Outage', color: 'danger' as const },
  }

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-center space-x-2 mt-1">
              <StatusBadge status={status as any} />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Uptime: {uptime}%
            </p>
          </div>
          <div className="text-success-600 bg-success-100 p-3 rounded-full">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Generic Stat Card Component
interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
  color: 'primary' | 'success' | 'warning' | 'info'
  progress?: number
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, color, progress }) => {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-100',
    success: 'text-success-600 bg-success-100',
    warning: 'text-warning-600 bg-warning-100',
    info: 'text-blue-600 bg-blue-100',
  }

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
            {progress !== undefined && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={clsx(
                      'h-2 rounded-full transition-all duration-500',
                      progress >= 80 ? 'bg-warning-500' : 'bg-primary-500'
                    )}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={clsx('p-3 rounded-full ml-4', colorClasses[color])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// System Components Monitoring Card
const SystemComponentsCard: React.FC<{ components: any }> = ({ components }) => {
  return (
    <Card>
      <CardHeader
        title="System Components"
        subtitle="Real-time component health monitoring"
      />
      <CardContent>
        <div className="space-y-4">
          {Object.entries(components).map(([name, component]: [string, any]) => (
            <div key={name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900 capitalize">
                  {name.replace(/([A-Z])/g, ' $1')}
                </h4>
                <p className="text-xs text-gray-600">
                  Response: {component.responseTime}ms | Error: {component.errorRate}%
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <StatusBadge status={component.status === 'operational' ? 'completed' : 'failed'} />
                {component.status === 'operational' ? (
                  <CheckCircleIcon className="h-5 w-5 text-success-600" />
                ) : (
                  <ExclamationTriangleIcon className="h-5 w-5 text-warning-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Processing Metrics Card
interface ProcessingMetricsCardProps {
  metrics: any
  selectedMetric: 'processing' | 'quality' | 'financial'
  onMetricChange: (metric: 'processing' | 'quality' | 'financial') => void
}

const ProcessingMetricsCard: React.FC<ProcessingMetricsCardProps> = ({ 
  metrics, 
  selectedMetric, 
  onMetricChange 
}) => {
  const metricData = {
    processing: {
      title: 'Processing Performance',
      data: [
        { label: 'Papers Processed Today', value: metrics.processing.papersProcessedToday.toLocaleString() },
        { label: 'Average Time per Paper', value: `${metrics.processing.averageTimePerPaper}min` },
        { label: 'Queue Length', value: metrics.processing.totalPapersInQueue.toLocaleString() },
        { label: 'Completion Rate', value: `${metrics.processing.completionRate}%` },
      ]
    },
    quality: {
      title: 'Quality Metrics',
      data: [
        { label: 'AI Accuracy Rate', value: `${metrics.accuracy.overall}%` },
        { label: 'Human Override Rate', value: `${metrics.quality.humanOverrideRate}%` },
        { label: 'Appeals Rate', value: `${metrics.quality.appealsRate}%` },
        { label: 'Bias Incidents', value: metrics.quality.biasIncidents.toString() },
      ]
    },
    financial: {
      title: 'Financial Impact',
      data: [
        { label: 'Daily Cost Savings', value: '€143,250' },
        { label: 'Annual Projection', value: '€52.3M' },
        { label: 'Processing Cost per Paper', value: '€0.45' },
        { label: 'Manual Cost per Paper', value: '€12.80' },
      ]
    }
  }

  const currentData = metricData[selectedMetric]

  return (
    <Card>
      <CardHeader
        title={currentData.title}
        subtitle="Real-time system performance metrics"
        action={
          <div className="flex space-x-2">
            <Button
              variant={selectedMetric === 'processing' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onMetricChange('processing')}
            >
              Processing
            </Button>
            <Button
              variant={selectedMetric === 'quality' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onMetricChange('quality')}
            >
              Quality
            </Button>
            <Button
              variant={selectedMetric === 'financial' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onMetricChange('financial')}
            >
              Financial
            </Button>
          </div>
        }
      />
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {currentData.data.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <p className="text-sm text-gray-600 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Quick Actions Card
const QuickActionsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader title="Quick Actions" />
      <CardContent>
        <div className="space-y-3">
          <Button 
            variant="primary" 
            fullWidth 
            leftIcon={<DocumentChartBarIcon className="h-4 w-4" />}
            onClick={() => setActiveTab('analytics')}
          >
            View Analytics Dashboard
          </Button>
          <Button variant="outline" fullWidth leftIcon={<UsersIcon className="h-4 w-4" />}>
            Manage User Accounts
          </Button>
          <Button variant="outline" fullWidth leftIcon={<CogIcon className="h-4 w-4" />}>
            System Configuration
          </Button>
          <Button variant="ghost" fullWidth leftIcon={<ExclamationTriangleIcon className="h-4 w-4" />}>
            View System Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// User Management Card
const UserManagementCard: React.FC = () => {
  const userStats = [
    { role: 'Teachers', count: 2847, active: 1456 },
    { role: 'Students', count: 45123, active: 3247 },
    { role: 'Reviewers', count: 156, active: 89 },
    { role: 'Administrators', count: 34, active: 12 },
  ]

  return (
    <Card>
      <CardHeader 
        title="User Management"
        subtitle="Active user statistics"
      />
      <CardContent>
        <div className="space-y-3">
          {userStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-900">{stat.role}</p>
                <p className="text-xs text-gray-600">{stat.active} active</p>
              </div>
              <Badge variant="secondary" size="sm">
                {stat.count}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// System Configuration Card
const SystemConfigCard: React.FC = () => {
  return (
    <Card>
      <CardHeader title="System Configuration" />
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">AI Confidence Threshold</span>
            <Badge variant="info" size="sm">85%</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Auto-approve Limit</span>
            <Badge variant="success" size="sm">90%</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Review Required Below</span>
            <Badge variant="warning" size="sm">70%</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">System Maintenance</span>
            <Badge variant="secondary" size="sm">02:00 Daily</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// National Overview Card
const NationalOverviewCard: React.FC = () => {
  return (
    <Card>
      <CardHeader
        title="National Processing Overview"
        subtitle="Ireland-wide examination processing status"
      />
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary-600">2024 Session</h3>
            <p className="text-gray-600">June Examinations</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Papers Processed:</span>
                <span className="font-medium">847,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Completion Rate:</span>
                <span className="font-medium">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Time Saved:</span>
                <span className="font-medium">2,847 hours</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-success-600">Quality Metrics</h3>
            <p className="text-gray-600">System Performance</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Accuracy Rate:</span>
                <span className="font-medium">96.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Appeals Rate:</span>
                <span className="font-medium">1.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Satisfaction:</span>
                <span className="font-medium">4.2/5.0</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-warning-600">Financial Impact</h3>
            <p className="text-gray-600">Cost Optimization</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Annual Savings:</span>
                <span className="font-medium">€52.3M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Cost per Paper:</span>
                <span className="font-medium">€0.45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">ROI:</span>
                <span className="font-medium">847%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}