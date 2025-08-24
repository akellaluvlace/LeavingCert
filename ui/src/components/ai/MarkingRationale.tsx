// AI Marking Rationale Display Component
// Based on PRD Section: Explainable AI Framework

'use client'

import React, { useState } from 'react'
import { clsx } from 'clsx'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  AcademicCapIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline'
import { AIMarkingDecision, MarkingCriteria } from '@/types/platform'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface MarkingRationaleProps {
  decision: AIMarkingDecision
  showComparative?: boolean
  showCriteriaBreakdown?: boolean
  expandable?: boolean
  className?: string
}

export const MarkingRationaleDisplay: React.FC<MarkingRationaleProps> = ({
  decision,
  showComparative = true,
  showCriteriaBreakdown = true,
  expandable = false,
  className,
}) => {
  const [expanded, setExpanded] = useState(!expandable)
  const [activeTab, setActiveTab] = useState<'rationale' | 'criteria' | 'comparative'>('rationale')

  const percentage = Math.round((decision.marks / decision.maxMarks) * 100)

  return (
    <Card className={className}>
      <CardHeader
        title="AI Marking Rationale"
        subtitle={`${decision.marks}/${decision.maxMarks} marks (${percentage}%)`}
        action={
          <div className="flex items-center space-x-2">
            <Badge 
              variant={decision.flaggedForReview ? 'warning' : 'info'}
              size="sm"
            >
              AI Agent v{decision.aiAgentVersion}
            </Badge>
            {expandable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                leftIcon={expanded ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
              >
                {expanded ? 'Collapse' : 'Expand'}
              </Button>
            )}
          </div>
        }
      />

      {expanded && (
        <CardContent>
          <div className="space-y-6">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <TabButton
                  label="Main Rationale"
                  icon={DocumentTextIcon}
                  active={activeTab === 'rationale'}
                  onClick={() => setActiveTab('rationale')}
                />
                {showCriteriaBreakdown && (
                  <TabButton
                    label="Criteria Breakdown"
                    icon={AcademicCapIcon}
                    active={activeTab === 'criteria'}
                    onClick={() => setActiveTab('criteria')}
                    badge={decision.criteriaBreakdown.length.toString()}
                  />
                )}
                {showComparative && (
                  <TabButton
                    label="Comparative Analysis"
                    icon={LightBulbIcon}
                    active={activeTab === 'comparative'}
                    onClick={() => setActiveTab('comparative')}
                  />
                )}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
              {activeTab === 'rationale' && (
                <RationaleTab decision={decision} />
              )}
              
              {activeTab === 'criteria' && showCriteriaBreakdown && (
                <CriteriaBreakdownTab criteria={decision.criteriaBreakdown} />
              )}
              
              {activeTab === 'comparative' && showComparative && (
                <ComparativeAnalysisTab decision={decision} />
              )}
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span>Marked: {decision.timestamp.toLocaleString()}</span>
                {decision.biasChecked && (
                  <div className="flex items-center space-x-1">
                    <CheckCircleIcon className="h-4 w-4 text-success-600" />
                    <span>Bias Checked</span>
                  </div>
                )}
              </div>
              {decision.flaggedForReview && (
                <Badge variant="warning" size="xs">
                  Flagged for Human Review
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

// Tab Button Component
interface TabButtonProps {
  label: string
  icon: React.ComponentType<{ className?: string }>
  active: boolean
  onClick: () => void
  badge?: string
}

const TabButton: React.FC<TabButtonProps> = ({ label, icon: Icon, active, onClick, badge }) => (
  <button
    onClick={onClick}
    className={clsx(
      'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
      active
        ? 'border-primary-500 text-primary-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    )}
  >
    <Icon className="h-5 w-5 mr-2" />
    {label}
    {badge && (
      <Badge variant="secondary" size="xs" className="ml-2">
        {badge}
      </Badge>
    )}
  </button>
)

// Rationale Tab
const RationaleTab: React.FC<{ decision: AIMarkingDecision }> = ({ decision }) => (
  <div className="prose prose-sm max-w-none">
    <div className="bg-blue-50 p-4 rounded-lg mb-4">
      <h4 className="flex items-center text-blue-900 font-medium mb-2">
        <DocumentTextIcon className="h-5 w-5 mr-2" />
        AI Marking Explanation
      </h4>
      <p className="text-blue-800 text-sm leading-relaxed">
        {decision.rationale}
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-3 border border-gray-200 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-1">Marks Awarded</h5>
        <p className="text-2xl font-bold text-primary-600">
          {decision.marks}/{decision.maxMarks}
        </p>
        <p className="text-sm text-gray-600">
          {Math.round((decision.marks / decision.maxMarks) * 100)}% of total marks
        </p>
      </div>
      
      <div className="p-3 border border-gray-200 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-1">Review Status</h5>
        <div className="flex items-center space-x-2">
          {decision.flaggedForReview ? (
            <>
              <XCircleIcon className="h-5 w-5 text-warning-600" />
              <span className="text-sm text-warning-700">Requires Review</span>
            </>
          ) : (
            <>
              <CheckCircleIcon className="h-5 w-5 text-success-600" />
              <span className="text-sm text-success-700">Auto-Approved</span>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
)

// Criteria Breakdown Tab
const CriteriaBreakdownTab: React.FC<{ criteria: MarkingCriteria[] }> = ({ criteria }) => (
  <div className="space-y-4">
    {criteria.map((criterion, index) => (
      <CriterionCard key={index} criterion={criterion} />
    ))}
  </div>
)

// Individual Criterion Card
const CriterionCard: React.FC<{ criterion: MarkingCriteria }> = ({ criterion }) => {
  const percentage = Math.round((criterion.marksAwarded / criterion.maxMarks) * 100)
  const isFullMarks = criterion.marksAwarded === criterion.maxMarks
  
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900">{criterion.criterion}</h4>
        <div className="flex items-center space-x-2">
          <Badge 
            variant={isFullMarks ? 'success' : percentage >= 50 ? 'warning' : 'danger'}
            size="sm"
          >
            {criterion.marksAwarded}/{criterion.maxMarks}
          </Badge>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div
          className={clsx(
            'h-2 rounded-full transition-all duration-500',
            isFullMarks 
              ? 'bg-success-500' 
              : percentage >= 50 
                ? 'bg-warning-500' 
                : 'bg-danger-500'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <p className="text-sm text-gray-700 mb-3">{criterion.explanation}</p>
      
      {criterion.evidenceFromResponse.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-gray-900 mb-2">Evidence from Response:</h5>
          <ul className="space-y-1">
            {criterion.evidenceFromResponse.map((evidence, idx) => (
              <li key={idx} className="text-sm text-gray-600 bg-gray-50 p-2 rounded italic">
                &ldquo;{evidence}&rdquo;
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Comparative Analysis Tab
const ComparativeAnalysisTab: React.FC<{ decision: AIMarkingDecision }> = ({ decision }) => (
  <div className="space-y-6">
    <div className="bg-yellow-50 p-4 rounded-lg">
      <h4 className="flex items-center text-yellow-900 font-medium mb-2">
        <LightBulbIcon className="h-5 w-5 mr-2" />
        Comparative Context
      </h4>
      <p className="text-yellow-800 text-sm">
        This response was compared against exemplar answers and similar student responses 
        to ensure consistent marking standards.
      </p>
    </div>
    
    {/* Mock comparative data - in production this would come from the API */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border border-gray-200 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2">Similar Responses</h5>
        <p className="text-sm text-gray-600 mb-2">
          This response was compared with 127 similar responses.
        </p>
        <div className="text-sm">
          <div className="flex justify-between">
            <span>Average mark:</span>
            <span className="font-medium">{Math.round(decision.marks * 0.95)}/{decision.maxMarks}</span>
          </div>
          <div className="flex justify-between">
            <span>This response:</span>
            <span className="font-medium">{decision.marks}/{decision.maxMarks}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 border border-gray-200 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2">Marking Consistency</h5>
        <p className="text-sm text-gray-600 mb-2">
          Consistency with exemplar standards and peer responses.
        </p>
        <div className="flex items-center space-x-2">
          <CheckCircleIcon className="h-5 w-5 text-success-600" />
          <span className="text-sm text-success-700">Highly Consistent</span>
        </div>
      </div>
    </div>
  </div>
)