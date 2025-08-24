// Teacher/Examiner Dashboard Implementation
// Based on PRD Section: Teacher/Examiner Journey and Wireframes

'use client'

import React, { useState } from 'react'
import { clsx } from 'clsx'
import {
  ClipboardDocumentCheckIcon,
  ClockIcon,
  ChartBarIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge, StatusBadge } from '../ui/Badge'
import { ConfidenceScoreDisplay, ConfidenceIndicator } from '../ai/ConfidenceScore'
import { MarkingRationaleDisplay } from '../ai/MarkingRationale'
import { mockExaminationPapers, getMockDataForRole } from '@/lib/mock-data'
import { ExaminationPaper } from '@/types/platform'

export const TeacherDashboard: React.FC = () => {
  const teacherData = getMockDataForRole('teacher_examiner')
  const [selectedPaper, setSelectedPaper] = useState<ExaminationPaper | null>(null)
  
  return (
    <div className="space-y-6">
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Papers Assigned Today"
          value={teacherData.assignedPapers?.length || 0}
          subtitle="Mathematics Higher Level"
          icon={ClipboardDocumentCheckIcon}
          color="primary"
        />
        <StatCard
          title="Completed Today"
          value={teacherData.completedToday || 0}
          subtitle={`Target: ${teacherData.targetDaily || 50}`}
          icon={CheckIcon}
          color="success"
          progress={((teacherData.completedToday || 0) / (teacherData.targetDaily || 1)) * 100}
        />
        <StatCard
          title="Accuracy Rate"
          value={`${teacherData.averageAccuracy || 0}%`}
          subtitle="Last 30 days"
          icon={ChartBarIcon}
          color="info"
        />
        <StatCard
          title="Override Rate"
          value={`${teacherData.overrideRate || 0}%`}
          subtitle="AI decisions modified"
          icon={ExclamationTriangleIcon}
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Marking Queue */}
        <div className="lg:col-span-2 space-y-6">
          <MarkingQueue 
            papers={teacherData.assignedPapers || mockExaminationPapers} 
            onSelectPaper={setSelectedPaper}
            selectedPaperId={selectedPaper?.id}
          />
        </div>

        {/* Right Column: Paper Review */}
        <div className="space-y-6">
          {selectedPaper ? (
            <PaperReviewPanel paper={selectedPaper} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  )
}

// Statistics Card Component
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
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
            {progress !== undefined && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={clsx(
                      'h-2 rounded-full transition-all duration-500',
                      progress >= 100 ? 'bg-success-500' : 'bg-primary-500'
                    )}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
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

// Marking Queue Component
interface MarkingQueueProps {
  papers: ExaminationPaper[]
  onSelectPaper: (paper: ExaminationPaper) => void
  selectedPaperId?: string
}

const MarkingQueue: React.FC<MarkingQueueProps> = ({ papers, onSelectPaper, selectedPaperId }) => {
  const [filter, setFilter] = useState<'all' | 'review_required' | 'completed'>('all')
  
  const filteredPapers = papers.filter(paper => {
    switch (filter) {
      case 'review_required':
        return paper.markingStatus === 'human_review'
      case 'completed':
        return paper.markingStatus === 'completed'
      default:
        return true
    }
  })

  return (
    <Card>
      <CardHeader
        title="Marking Queue"
        subtitle={`${filteredPapers.length} papers requiring attention`}
        action={
          <div className="flex items-center space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Papers</option>
              <option value="review_required">Review Required</option>
              <option value="completed">Completed</option>
            </select>
            <Button variant="primary" size="sm">
              Refresh Queue
            </Button>
          </div>
        }
      />
      <CardContent >
        <div className="space-y-0 divide-y divide-gray-200">
          {filteredPapers.map((paper) => (
            <PaperQueueItem
              key={paper.id}
              paper={paper}
              isSelected={paper.id === selectedPaperId}
              onClick={() => onSelectPaper(paper)}
            />
          ))}
          {filteredPapers.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              <ClipboardDocumentCheckIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No papers in queue</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Individual Paper Queue Item
interface PaperQueueItemProps {
  paper: ExaminationPaper
  isSelected: boolean
  onClick: () => void
}

const PaperQueueItem: React.FC<PaperQueueItemProps> = ({ paper, isSelected, onClick }) => {
  const firstResponse = paper.responses[0]
  const confidence = firstResponse?.markingDecision?.confidence

  return (
    <div
      className={clsx(
        'p-4 cursor-pointer hover:bg-gray-50 transition-colors',
        isSelected && 'bg-blue-50 border-r-4 border-primary-500'
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div>
            <h4 className="text-sm font-medium text-gray-900">
              Paper #{paper.id.split('-')[1]}
            </h4>
            <p className="text-xs text-gray-600">
              Student ID: {paper.studentId} • {paper.subjectName} {paper.paperType}
            </p>
          </div>
          <StatusBadge status={paper.markingStatus as any} />
        </div>
        
        <div className="flex items-center space-x-2">
          {confidence && (
            <ConfidenceIndicator confidence={confidence} size="sm" />
          )}
          <ClockIcon className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-500">
            {new Date(paper.scanTimestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  )
}

// Paper Review Panel
interface PaperReviewPanelProps {
  paper: ExaminationPaper
}

const PaperReviewPanel: React.FC<PaperReviewPanelProps> = ({ paper }) => {
  const firstResponse = paper.responses[0]
  const decision = firstResponse?.markingDecision
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader
          title="Paper Review"
          subtitle={`Paper #${paper.id.split('-')[1]}`}
          action={
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" leftIcon={<EyeIcon className="h-4 w-4" />}>
                View Full
              </Button>
            </div>
          }
        />
        <CardContent>
          <div className="space-y-4">
            {/* Paper Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Subject:</span>
                <span className="ml-2 font-medium">{paper.subjectName}</span>
              </div>
              <div>
                <span className="text-gray-600">Level:</span>
                <span className="ml-2 font-medium capitalize">{paper.paperType}</span>
              </div>
              <div>
                <span className="text-gray-600">Session:</span>
                <span className="ml-2 font-medium">{paper.sessionMonth} {paper.sessionYear}</span>
              </div>
              <div>
                <span className="text-gray-600">OCR Quality:</span>
                <span className="ml-2 font-medium">{paper.ocrConfidence}%</span>
              </div>
            </div>

            {/* Student Response Preview */}
            {firstResponse && (
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">Student Response Preview</h5>
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  <p className="text-gray-700 line-clamp-3">
                    {firstResponse.studentResponse}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
              <Button variant="success" size="sm" leftIcon={<CheckIcon className="h-4 w-4" />}>
                Approve AI Decision
              </Button>
              <Button variant="warning" size="sm" leftIcon={<XMarkIcon className="h-4 w-4" />}>
                Override Decision
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Decision Details */}
      {decision && (
        <div className="space-y-4">
          <ConfidenceScoreDisplay 
            confidence={decision.confidence}
            detailed={false}
          />
          <MarkingRationaleDisplay
            decision={decision}
            expandable={true}
          />
        </div>
      )}
    </div>
  )
}

// Empty State Component
const EmptyState: React.FC = () => (
  <Card>
    <CardContent>
      <div className="text-center py-12">
        <AcademicCapIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Paper Selected</h3>
        <p className="text-gray-600 mb-4">
          Select a paper from the marking queue to begin review
        </p>
        <Button variant="primary">
          View Assignment Guidelines
        </Button>
      </div>
    </CardContent>
  </Card>
)