// Confidence Score Display Component
// Based on PRD Section: AI-Assisted Marking Insights

'use client'

import React from 'react'
import { clsx } from 'clsx'
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { ConfidenceScore as ConfidenceScoreType } from '@/types/platform'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Badge, ConfidenceBadge } from '../ui/Badge'

interface ConfidenceScoreProps {
  confidence: ConfidenceScoreType
  detailed?: boolean
  showExplanation?: boolean
  className?: string
}

export const ConfidenceScoreDisplay: React.FC<ConfidenceScoreProps> = ({
  confidence,
  detailed = false,
  showExplanation = true,
  className,
}) => {
  const getTrafficLightColor = (score: number) => {
    if (score >= 90) return 'success'
    if (score >= 70) return 'warning'
    return 'danger'
  }

  const getTrafficLightIcon = (score: number) => {
    if (score >= 90) return CheckCircleIcon
    if (score >= 70) return ExclamationTriangleIcon
    return XCircleIcon
  }

  const getConfidenceExplanation = (confidence: ConfidenceScoreType) => {
    const { overall, riskLevel, reviewRequired } = confidence
    
    if (overall >= 90) {
      return 'High confidence in AI marking decision. The system has strong understanding of the content and marking scheme application.'
    } else if (overall >= 70) {
      return 'Medium confidence in AI marking decision. Some aspects may require attention, but generally acceptable.'
    } else {
      return 'Low confidence in AI marking decision. Human review is strongly recommended to ensure accuracy.'
    }
  }

  const TrafficLightIcon = getTrafficLightIcon(confidence.overall)
  const colorVariant = getTrafficLightColor(confidence.overall)

  if (!detailed) {
    return (
      <div className={clsx('flex items-center space-x-2', className)}>
        <TrafficLightIcon 
          className={clsx(
            'h-5 w-5',
            colorVariant === 'success' && 'text-success-600',
            colorVariant === 'warning' && 'text-warning-600',
            colorVariant === 'danger' && 'text-danger-600'
          )}
        />
        <ConfidenceBadge score={confidence.overall} />
        {confidence.reviewRequired && (
          <Badge variant="warning" size="xs">
            Review Required
          </Badge>
        )}
      </div>
    )
  }

  return (
    <Card className={className}>
      <CardHeader
        title="AI Confidence Analysis"
        subtitle="Traffic Light Review System"
        action={
          <ConfidenceBadge 
            score={confidence.overall} 
            showPercentage={true}
          />
        }
      />
      <CardContent>
        <div className="space-y-6">
          {/* Overall confidence with traffic light */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div className="flex items-center space-x-3">
              <TrafficLightIcon 
                className={clsx(
                  'h-8 w-8',
                  colorVariant === 'success' && 'text-success-600',
                  colorVariant === 'warning' && 'text-warning-600',
                  colorVariant === 'danger' && 'text-danger-600'
                )}
              />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Overall Confidence</h4>
                <p className="text-xs text-gray-600">Risk Level: {confidence.riskLevel.toUpperCase()}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{confidence.overall}%</div>
              {confidence.reviewRequired && (
                <div className="text-xs text-warning-600 font-medium">Review Required</div>
              )}
            </div>
          </div>

          {/* Detailed breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ConfidenceMetric
              label="Content Understanding"
              score={confidence.contentUnderstanding}
              description="How well the AI understood the student's response content"
            />
            <ConfidenceMetric
              label="Marking Scheme Application" 
              score={confidence.markingSchemeApplication}
              description="Confidence in applying marking criteria correctly"
            />
            <ConfidenceMetric
              label="Language Processing"
              score={confidence.languageProcessing}
              description="Quality of handwriting recognition and text processing"
            />
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <h5 className="font-medium mb-1">What this means:</h5>
                <p>{getConfidenceExplanation(confidence)}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Individual Confidence Metric Component
interface ConfidenceMetricProps {
  label: string
  score: number
  description: string
}

const ConfidenceMetric: React.FC<ConfidenceMetricProps> = ({
  label,
  score,
  description,
}) => {
  const colorVariant = score >= 90 ? 'success' : score >= 70 ? 'warning' : 'danger'
  
  return (
    <div className="p-3 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-sm font-medium text-gray-900">{label}</h5>
        <ConfidenceBadge score={score} />
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className={clsx(
            'h-2 rounded-full transition-all duration-500',
            colorVariant === 'success' && 'bg-success-500',
            colorVariant === 'warning' && 'bg-warning-500',
            colorVariant === 'danger' && 'bg-danger-500'
          )}
          style={{ width: `${score}%` }}
        />
      </div>
      
      <p className="text-xs text-gray-600" title={description}>
        {description}
      </p>
    </div>
  )
}

// Compact Confidence Indicator for lists/tables
export const ConfidenceIndicator: React.FC<{
  confidence: ConfidenceScoreType
  size?: 'sm' | 'md'
}> = ({ confidence, size = 'sm' }) => {
  const TrafficLightIcon = getTrafficLightIcon(confidence.overall)
  const colorVariant = getTrafficLightColor(confidence.overall)
  
  return (
    <div className="flex items-center space-x-1">
      <TrafficLightIcon 
        className={clsx(
          size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
          colorVariant === 'success' && 'text-success-600',
          colorVariant === 'warning' && 'text-warning-600', 
          colorVariant === 'danger' && 'text-danger-600'
        )}
      />
      <span className={clsx(
        'font-medium',
        size === 'sm' ? 'text-xs' : 'text-sm',
        colorVariant === 'success' && 'text-success-700',
        colorVariant === 'warning' && 'text-warning-700',
        colorVariant === 'danger' && 'text-danger-700'
      )}>
        {confidence.overall}%
      </span>
    </div>
  )
}

function getTrafficLightColor(score: number) {
  if (score >= 90) return 'success' as const
  if (score >= 70) return 'warning' as const
  return 'danger' as const
}

function getTrafficLightIcon(score: number) {
  if (score >= 90) return CheckCircleIcon
  if (score >= 70) return ExclamationTriangleIcon
  return XCircleIcon
}