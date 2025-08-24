// Analytics and Reporting Dashboard Components
// Based on PRD Section: Analytics and Reporting Requirements

'use client'

import React from 'react'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { mockAnalyticsData, mockPerformanceMetrics } from '@/lib/mock-data'

// Main Analytics Dashboard
export const AnalyticsDashboard: React.FC<{ userRole: string }> = ({ userRole }) => {
  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProcessingVolumeChart />
        <AccuracyTrendsChart />
      </div>

      {/* Subject and Confidence Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SubjectPerformanceChart />
        <ConfidenceDistributionChart />
      </div>

      {/* Detailed Analytics Table */}
      <AnalyticsTable />
    </div>
  )
}

// Processing Volume Chart
const ProcessingVolumeChart: React.FC = () => {
  return (
    <Card>
      <CardHeader 
        title="Daily Processing Volume"
        subtitle="Papers processed per day over the last week"
      />
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockAnalyticsData.dailyProcessingVolume}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Accuracy Trends Chart
const AccuracyTrendsChart: React.FC = () => {
  return (
    <Card>
      <CardHeader
        title="Accuracy Trends"
        subtitle="AI marking accuracy over time"
      />
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockAnalyticsData.accuracyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[90, 95]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <Badge variant="success" size="sm">
            Current: {mockPerformanceMetrics.accuracy.overall}% accuracy
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

// Subject Performance Chart
const SubjectPerformanceChart: React.FC = () => {
  return (
    <Card>
      <CardHeader
        title="Subject Performance"
        subtitle="AI accuracy by subject area"
      />
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockAnalyticsData.subjectPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="accuracy" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Confidence Distribution Chart
const ConfidenceDistributionChart: React.FC = () => {
  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6B7280', '#8B5CF6']

  return (
    <Card>
      <CardHeader
        title="Confidence Distribution"
        subtitle="Distribution of AI confidence scores"
      />
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockAnalyticsData.confidenceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ range, percentage }) => `${range}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {mockAnalyticsData.confidenceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Analytics Data Table
const AnalyticsTable: React.FC = () => {
  const tableData = [
    { subject: 'Mathematics', papers: 15847, accuracy: 96.8, avgTime: 1.2, overrides: 3.1 },
    { subject: 'English', papers: 18392, accuracy: 92.1, avgTime: 2.1, overrides: 7.8 },
    { subject: 'Irish', papers: 16284, accuracy: 91.4, avgTime: 1.8, overrides: 8.6 },
    { subject: 'History', papers: 8745, accuracy: 93.7, avgTime: 1.9, overrides: 6.3 },
    { subject: 'Geography', accuracy: 94.2, papers: 7123, avgTime: 1.6, overrides: 5.8 },
  ]

  return (
    <Card>
      <CardHeader
        title="Detailed Analytics"
        subtitle="Comprehensive performance metrics by subject"
      />
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Papers Processed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accuracy Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Time (min)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Override Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.papers.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Badge 
                      variant={row.accuracy >= 95 ? 'success' : row.accuracy >= 90 ? 'warning' : 'danger'}
                      size="sm"
                    >
                      {row.accuracy}%
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.avgTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Badge 
                      variant={row.overrides <= 5 ? 'success' : row.overrides <= 8 ? 'warning' : 'danger'}
                      size="sm"
                    >
                      {row.overrides}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}