// Export Utilities for Analytics and Reports
// Supports multiple export formats as required by PRD

'use client'

import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'

interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv' | 'json'
  dateRange: string
  subjects: string[]
  includeGraphics: boolean
  userRole: string
}

export const ExportPanel: React.FC<{ userRole: string }> = ({ userRole }) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    dateRange: 'last-7-days',
    subjects: [],
    includeGraphics: true,
    userRole
  })

  const [isExporting, setIsExporting] = useState(false)

  const availableSubjects = [
    'Mathematics', 'English', 'Irish', 'History', 
    'Geography', 'Physics', 'Chemistry', 'Biology'
  ]

  const dateRangeOptions = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'current-month', label: 'Current Month' },
    { value: 'current-year', label: 'Current Academic Year' },
    { value: 'custom', label: 'Custom Range' }
  ]

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report', icon: '📄' },
    { value: 'excel', label: 'Excel Workbook', icon: '📊' },
    { value: 'csv', label: 'CSV Data', icon: '📋' },
    { value: 'json', label: 'JSON Export', icon: '🔧' }
  ]

  const handleExport = async () => {
    setIsExporting(true)
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock download trigger
    const filename = `leaving-cert-analytics-${Date.now()}.${exportOptions.format}`
    console.log(`Exporting ${filename} with options:`, exportOptions)
    
    setIsExporting(false)
    
    // In real implementation, this would trigger file download
    alert(`Export complete: ${filename}`)
  }

  const getRoleSpecificExports = () => {
    const exports = {
      'SEC_ADMINISTRATOR': ['National Overview', 'Performance Metrics', 'Quality Assurance'],
      'SCHOOL_ADMINISTRATOR': ['School Performance', 'Student Analytics', 'Department Reports'],
      'POLICY_MAKER': ['Strategic Analytics', 'Trend Analysis', 'Benchmarking Reports'],
      'TEACHER_EXAMINER': ['Marking Analytics', 'Subject Performance', 'Time Tracking'],
      'REVIEWER_MODERATOR': ['Quality Reviews', 'Appeal Analytics', 'Accuracy Reports']
    }
    
    return exports[userRole as keyof typeof exports] || ['Basic Reports']
  }

  return (
    <div className="space-y-6">
      {/* Export Configuration */}
      <Card>
        <CardHeader 
          title="Export Configuration"
          subtitle="Configure your analytics export settings"
        />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Export Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {formatOptions.map((format) => (
                  <button
                    key={format.value}
                    onClick={() => setExportOptions({...exportOptions, format: format.value as any})}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      exportOptions.format === format.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg mb-1">{format.icon}</div>
                    <div className="text-sm font-medium">{format.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Date Range
              </label>
              <select 
                value={exportOptions.dateRange}
                onChange={(e) => setExportOptions({...exportOptions, dateRange: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject Selection */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Subjects to Include
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const allSelected = exportOptions.subjects.length === availableSubjects.length
                  setExportOptions({
                    ...exportOptions, 
                    subjects: allSelected ? [] : availableSubjects
                  })
                }}
                className="px-3 py-1 text-sm border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50"
              >
                {exportOptions.subjects.length === availableSubjects.length ? 'Deselect All' : 'Select All'}
              </button>
              {availableSubjects.map((subject) => (
                <Badge
                  key={subject}
                  variant={exportOptions.subjects.includes(subject) ? 'success' : 'secondary'}
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => {
                    const newSubjects = exportOptions.subjects.includes(subject)
                      ? exportOptions.subjects.filter(s => s !== subject)
                      : [...exportOptions.subjects, subject]
                    setExportOptions({...exportOptions, subjects: newSubjects})
                  }}
                >
                  {subject}
                </Badge>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="mt-6 space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={exportOptions.includeGraphics}
                onChange={(e) => setExportOptions({...exportOptions, includeGraphics: e.target.checked})}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Include charts and visualizations</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Quick Export Templates */}
      <Card>
        <CardHeader 
          title="Quick Export Templates"
          subtitle="Pre-configured exports for your role"
        />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getRoleSpecificExports().map((template, index) => (
              <div 
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer"
              >
                <h4 className="font-medium text-gray-900 mb-2">{template}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Complete {template.toLowerCase()} with all relevant metrics
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    // Configure based on template
                    setExportOptions({
                      ...exportOptions,
                      subjects: template.includes('Subject') ? ['Mathematics'] : availableSubjects
                    })
                  }}
                >
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Action */}
      <div className="flex justify-end">
        <Button
          onClick={handleExport}
          disabled={isExporting || exportOptions.subjects.length === 0}
          className="px-8"
        >
          {isExporting ? 'Exporting...' : 'Generate Export'}
        </Button>
      </div>

      {/* Export History */}
      <Card>
        <CardHeader 
          title="Recent Exports"
          subtitle="Download previous exports"
        />
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'National Performance Q3 2024.pdf', date: '2024-03-15', size: '2.3 MB' },
              { name: 'Mathematics Analytics.xlsx', date: '2024-03-10', size: '1.8 MB' },
              { name: 'Student Progress Export.csv', date: '2024-03-08', size: '456 KB' }
            ].map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{file.name}</div>
                  <div className="text-sm text-gray-600">{file.date} • {file.size}</div>
                </div>
                <Button size="sm" variant="secondary">
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Real-time Analytics Component
export const RealTimeAnalytics: React.FC = () => {
  const [isLive, setIsLive] = useState(true)

  const liveMetrics = {
    papersProcessed: 1847,
    currentQueue: 23,
    averageProcessingTime: 1.3,
    systemLoad: 78,
    activeUsers: 142
  }

  return (
    <Card>
      <CardHeader 
        title="Real-time System Metrics"
        subtitle="Live performance monitoring"
        actions={
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="text-sm text-gray-600">{isLive ? 'Live' : 'Offline'}</span>
          </div>
        }
      />
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{liveMetrics.papersProcessed}</div>
            <div className="text-sm text-gray-600">Papers Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{liveMetrics.currentQueue}</div>
            <div className="text-sm text-gray-600">In Queue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{liveMetrics.averageProcessingTime}m</div>
            <div className="text-sm text-gray-600">Avg Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{liveMetrics.systemLoad}%</div>
            <div className="text-sm text-gray-600">System Load</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{liveMetrics.activeUsers}</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}