// Policy Maker Dashboard Implementation  
// Based on PRD Section: Policy Maker Journey and Strategic Analytics

'use client'

import React, { useState } from 'react'
import { clsx } from 'clsx'
import {
  GlobeAltIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  GlobeEuropeAfricaIcon,
  TrophyIcon,
  CurrencyEuroIcon,
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

export const PolicyMakerDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1year' | '3year' | '5year'>('1year')
  const [selectedMetric, setSelectedMetric] = useState<'performance' | 'equity' | 'efficiency'>('performance')
  
  return (
    <div className="space-y-6">
      {/* Strategic KPIs Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StrategicKPICard
          title="National Performance"
          value="87.3%"
          subtitle="Average LC completion rate"
          icon={TrophyIcon}
          color="success"
          trend={2.4}
        />
        <StrategicKPICard
          title="System Efficiency"
          value="€52.3M"
          subtitle="Annual cost savings"
          icon={CurrencyEuroIcon}
          color="primary"
          trend={847}
          trendLabel="% ROI"
        />
        <StrategicKPICard
          title="Education Equity"
          value="92.1%"
          subtitle="Cross-demographic fairness"
          icon={GlobeAltIcon}
          color="info"
          trend={1.8}
        />
        <StrategicKPICard
          title="International Ranking"
          value="#3"
          subtitle="OECD assessment systems"
          icon={GlobeEuropeAfricaIcon}
          color="warning"
          trend={2}
          trendLabel="positions up"
        />
      </div>

      {/* Time Series Controls */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Strategic Analytics Dashboard</h3>
              <p className="text-gray-600">Ireland&apos;s educational assessment system performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <Button
                  variant={selectedTimeframe === '1year' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe('1year')}
                >
                  1 Year
                </Button>
                <Button
                  variant={selectedTimeframe === '3year' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe('3year')}
                >
                  3 Years
                </Button>
                <Button
                  variant={selectedTimeframe === '5year' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe('5year')}
                >
                  5 Years
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Primary Analytics */}
        <div className="lg:col-span-2 space-y-6">
          <NationalPerformanceCard timeframe={selectedTimeframe} />
          <EducationalEquityCard />
        </div>

        {/* Right Column: Strategic Insights */}
        <div className="space-y-6">
          <SystemImpactCard />
          <InternationalBenchmarkCard />
          <PolicyRecommendationsCard />
        </div>
      </div>

      {/* Bottom Section: Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RegionalAnalysisCard />
        <TrendAnalysisCard />
      </div>
    </div>
  )
}

// Strategic KPI Card Component
interface StrategicKPICardProps {
  title: string
  value: string
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
  color: 'success' | 'primary' | 'info' | 'warning'
  trend?: number
  trendLabel?: string
}

const StrategicKPICard: React.FC<StrategicKPICardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color, 
  trend, 
  trendLabel 
}) => {
  const colorClasses = {
    success: 'text-success-600 bg-success-100',
    primary: 'text-primary-600 bg-primary-100',
    info: 'text-blue-600 bg-blue-100',
    warning: 'text-warning-600 bg-warning-100',
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
            {trend !== undefined && (
              <div className="flex items-center mt-2">
                {trend > 0 ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 text-success-600 mr-1" />
                ) : (
                  <ArrowTrendingDownIcon className="h-4 w-4 text-danger-600 mr-1" />
                )}
                <span className={`text-xs font-medium ${trend > 0 ? 'text-success-600' : 'text-danger-600'}`}>
                  +{Math.abs(trend)}{trendLabel ? ` ${trendLabel}` : '%'}
                </span>
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

// National Performance Card
const NationalPerformanceCard: React.FC<{ timeframe: string }> = ({ timeframe }) => {
  const performanceData = {
    '1year': {
      studentsAssessed: 61247,
      averageScore: 76.8,
      completionRate: 94.2,
      gradeDist: { A: 23, B: 38, C: 27, D: 9, E: 3 }
    },
    '3year': {
      studentsAssessed: 183741,
      averageScore: 75.1,
      completionRate: 92.8,
      gradeDist: { A: 21, B: 37, C: 28, D: 11, E: 3 }
    },
    '5year': {
      studentsAssessed: 306235,
      averageScore: 73.6,
      completionRate: 91.4,
      gradeDist: { A: 19, B: 36, C: 29, D: 12, E: 4 }
    }
  }

  const data = performanceData[timeframe as keyof typeof performanceData]

  return (
    <Card>
      <CardHeader
        title="National Performance Overview"
        subtitle={`${timeframe === '1year' ? 'Annual' : timeframe === '3year' ? '3-Year' : '5-Year'} educational outcomes analysis`}
      />
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Key Metrics */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Students Assessed</p>
              <p className="text-2xl font-bold text-primary-600">{data.studentsAssessed.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-success-600">{data.averageScore}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-blue-600">{data.completionRate}%</p>
            </div>
          </div>

          {/* Grade Distribution */}
          <div className="md:col-span-2">
            <h4 className="font-medium text-gray-900 mb-3">Grade Distribution</h4>
            <div className="space-y-3">
              {Object.entries(data.gradeDist).map(([grade, percentage]) => (
                <div key={grade} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Grade {grade}</span>
                  <div className="flex items-center space-x-2 flex-1 max-w-32 ml-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={clsx(
                          'h-2 rounded-full',
                          grade === 'A' ? 'bg-success-500' :
                          grade === 'B' ? 'bg-blue-500' :
                          grade === 'C' ? 'bg-warning-500' :
                          'bg-gray-400'
                        )}
                        style={{ width: `${(percentage as number) * 2}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Educational Equity Card
const EducationalEquityCard: React.FC = () => {
  const equityMetrics = [
    { demographic: 'Gender', score: 94.2, trend: 'stable', description: 'Balanced performance across genders' },
    { demographic: 'Regional', score: 91.8, trend: 'improving', description: 'Urban-rural gap decreasing' },
    { demographic: 'Socioeconomic', score: 88.4, trend: 'improving', description: 'DEIS schools showing improvement' },
    { demographic: 'Language', score: 93.6, trend: 'stable', description: 'First/second language balance' },
  ]

  return (
    <Card>
      <CardHeader
        title="Educational Equity Analysis"
        subtitle="Fairness and accessibility across demographics"
      />
      <CardContent>
        <div className="space-y-4">
          {equityMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h5 className="font-medium text-gray-900">{metric.demographic} Equity</h5>
                <p className="text-sm text-gray-600 mt-1">{metric.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{metric.score}%</p>
                  <div className="flex items-center">
                    {metric.trend === 'improving' ? (
                      <ArrowTrendingUpIcon className="h-3 w-3 text-success-600 mr-1" />
                    ) : (
                      <div className="w-3 h-3 mr-1" />
                    )}
                    <span className={`text-xs ${
                      metric.trend === 'improving' ? 'text-success-600' : 'text-gray-600'
                    }`}>
                      {metric.trend}
                    </span>
                  </div>
                </div>
                <Badge 
                  variant={metric.score >= 93 ? 'success' : metric.score >= 90 ? 'warning' : 'secondary'}
                  size="sm"
                >
                  {metric.score >= 93 ? 'Excellent' : metric.score >= 90 ? 'Good' : 'Fair'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// System Impact Card
const SystemImpactCard: React.FC = () => {
  const impacts = [
    { metric: 'Processing Time', value: '70%', change: 'reduction', color: 'success' },
    { metric: 'Cost per Student', value: '€8.50', change: 'from €28.40', color: 'primary' },
    { metric: 'Accuracy Rate', value: '94.2%', change: '+2.1% vs manual', color: 'info' },
    { metric: 'Teacher Satisfaction', value: '4.3/5', change: '+0.8 vs previous', color: 'success' },
  ]

  return (
    <Card>
      <CardHeader title="System Impact Metrics" />
      <CardContent>
        <div className="space-y-4">
          {impacts.map((impact, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-medium text-gray-900">{impact.metric}</span>
                <Badge variant={impact.color as any} size="xs">Impact</Badge>
              </div>
              <p className="text-xl font-bold text-gray-900">{impact.value}</p>
              <p className="text-xs text-gray-600">{impact.change}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// International Benchmark Card
const InternationalBenchmarkCard: React.FC = () => {
  const benchmarks = [
    { country: 'Ireland', score: 87.3, rank: 3, trend: 'up' },
    { country: 'Finland', score: 91.2, rank: 1, trend: 'stable' },
    { country: 'Singapore', score: 89.8, rank: 2, trend: 'up' },
    { country: 'Netherlands', score: 85.1, rank: 4, trend: 'down' },
    { country: 'Canada', score: 84.7, rank: 5, trend: 'stable' },
  ]

  return (
    <Card>
      <CardHeader
        title="International Benchmarks"
        subtitle="OECD assessment system rankings"
      />
      <CardContent>
        <div className="space-y-3">
          {benchmarks.map((benchmark, index) => (
            <div 
              key={index} 
              className={clsx(
                'flex items-center justify-between p-3 rounded-lg',
                benchmark.country === 'Ireland' ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50'
              )}
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-bold text-gray-600">#{benchmark.rank}</span>
                <div>
                  <p className={clsx(
                    'text-sm font-medium',
                    benchmark.country === 'Ireland' ? 'text-primary-900' : 'text-gray-900'
                  )}>
                    {benchmark.country}
                  </p>
                  <p className="text-xs text-gray-600">{benchmark.score}% efficiency</p>
                </div>
              </div>
              <div className="flex items-center">
                {benchmark.trend === 'up' && <ArrowTrendingUpIcon className="h-4 w-4 text-success-600" />}
                {benchmark.trend === 'down' && <ArrowTrendingDownIcon className="h-4 w-4 text-danger-600" />}
                {benchmark.trend === 'stable' && <div className="h-4 w-4" />}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Policy Recommendations Card
const PolicyRecommendationsCard: React.FC = () => {
  const recommendations = [
    {
      title: 'Expand AI Coverage',
      priority: 'high',
      description: 'Extend to all subjects by 2025',
      impact: 'High'
    },
    {
      title: 'Rural Connectivity',
      priority: 'medium',
      description: 'Improve broadband access',
      impact: 'Medium'
    },
    {
      title: 'Teacher Training',
      priority: 'high',
      description: 'AI integration workshops',
      impact: 'High'
    },
    {
      title: 'International Partnerships',
      priority: 'low',
      description: 'Share best practices',
      impact: 'Low'
    }
  ]

  return (
    <Card>
      <CardHeader title="Policy Recommendations" />
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h5 className="text-sm font-medium text-gray-900">{rec.title}</h5>
                <Badge 
                  variant={rec.priority === 'high' ? 'danger' : rec.priority === 'medium' ? 'warning' : 'secondary'}
                  size="xs"
                >
                  {rec.priority}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Impact: {rec.impact}</span>
                <Button variant="ghost" size="sm">Details</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Regional Analysis Card
const RegionalAnalysisCard: React.FC = () => {
  const regions = [
    { name: 'Dublin', performance: 89.2, schools: 156, trend: 1.2 },
    { name: 'Cork', performance: 86.8, schools: 89, trend: 2.1 },
    { name: 'Galway', performance: 85.1, schools: 67, trend: 1.8 },
    { name: 'Limerick', performance: 84.3, schools: 45, trend: 3.2 },
    { name: 'Waterford', performance: 82.7, schools: 34, trend: 2.8 },
  ]

  return (
    <Card>
      <CardHeader
        title="Regional Performance Analysis"
        subtitle="Performance across Irish counties/regions"
      />
      <CardContent>
        <div className="space-y-4">
          {regions.map((region, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">{region.name}</h5>
                <p className="text-sm text-gray-600">{region.schools} schools</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{region.performance}%</p>
                <div className="flex items-center text-xs text-success-600">
                  <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                  +{region.trend}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Trend Analysis Card
const TrendAnalysisCard: React.FC = () => {
  return (
    <Card>
      <CardHeader
        title="Long-term Trends"
        subtitle="5-year strategic outlook"
      />
      <CardContent>
        <div className="space-y-6">
          <div className="text-center p-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg">
            <h4 className="text-lg font-semibold text-primary-900 mb-2">System Transformation</h4>
            <p className="text-3xl font-bold text-primary-600 mb-2">94.2%</p>
            <p className="text-sm text-primary-700">Digital assessment adoption rate</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-success-50 rounded-lg">
              <p className="text-xl font-bold text-success-900">€200M+</p>
              <p className="text-xs text-success-700">5-year savings projection</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold text-blue-900">#1</p>
              <p className="text-xs text-blue-700">Target OECD ranking by 2027</p>
            </div>
          </div>

          <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
            <h5 className="font-medium text-warning-900 mb-2">Key Challenges Ahead</h5>
            <ul className="text-sm text-warning-800 space-y-1">
              <li>• Ensuring equitable access across all regions</li>
              <li>• Maintaining teacher engagement and skills</li>
              <li>• International competitiveness pressures</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}