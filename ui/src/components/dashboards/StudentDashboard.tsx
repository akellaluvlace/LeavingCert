// Student Dashboard Implementation  
// Based on PRD Section: Student Journey and Persona Requirements

'use client'

import React, { useState } from 'react'
import { clsx } from 'clsx'
import {
  DocumentTextIcon,
  ChartBarIcon,
  TrophyIcon,
  ExclamationCircleIcon,
  ArrowTrendingUpIcon,
  MapIcon,
  ScaleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge, GradeBadge, StatusBadge } from '../ui/Badge'
import { getMockDataForRole } from '@/lib/mock-data'

export const StudentDashboard: React.FC = () => {
  const studentData = getMockDataForRole('student')
  const [selectedSubject, setSelectedSubject] = useState<string>('mathematics')
  
  return (
    <div className="space-y-6">
      {/* Results Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(studentData.results || {}).map(([subject, result]: [string, any]) => (
          <ResultsCard
            key={subject}
            subject={subject}
            result={result}
            isSelected={selectedSubject === subject}
            onClick={() => setSelectedSubject(subject)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Detailed Feedback */}
        <div className="lg:col-span-2 space-y-6">
          <DetailedFeedbackSection 
            subject={selectedSubject}
            result={studentData.results?.[selectedSubject]}
            feedback={studentData.feedback}
          />
          <PerformanceAnalysis results={studentData.results} />
        </div>

        {/* Right Column: Quick Actions & Info */}
        <div className="space-y-6">
          <QuickActionsCard />
          <AcademicPlanningCard />
          <AppealsInfoCard appeals={studentData.appeals || []} />
        </div>
      </div>
    </div>
  )
}

// Individual Results Card
interface ResultsCardProps {
  subject: string
  result: { grade: string; marks: number; maxMarks: number }
  isSelected: boolean
  onClick: () => void
}

const ResultsCard: React.FC<ResultsCardProps> = ({ subject, result, isSelected, onClick }) => {
  const percentage = Math.round((result.marks / result.maxMarks) * 100)
  const getGradeColor = (grade: string) => {
    const gradeUpper = grade.toUpperCase()
    if (gradeUpper.startsWith('A')) return 'success'
    if (gradeUpper.startsWith('B')) return 'info'
    if (gradeUpper.startsWith('C')) return 'warning'
    return 'secondary'
  }

  return (
    <Card
      className={clsx(
        'cursor-pointer transition-all hover:shadow-md',
        isSelected && 'ring-2 ring-primary-500 shadow-md'
      )}
      onClick={onClick}
    >
      <CardContent>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 capitalize mb-2">
            {subject}
          </h3>
          
          <div className="mb-4">
            <GradeBadge grade={result.grade} className="text-xl px-4 py-2" />
          </div>
          
          <div className="text-sm text-gray-600">
            <div className="flex justify-between items-center mb-2">
              <span>Marks:</span>
              <span className="font-medium">{result.marks}/{result.maxMarks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Percentage:</span>
              <span className="font-medium">{percentage}%</span>
            </div>
          </div>

          {/* Performance indicator */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-center text-xs">
              <ArrowTrendingUpIcon className="h-4 w-4 text-success-600 mr-1" />
              <span className="text-success-700">Above Target</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Detailed Feedback Section
interface DetailedFeedbackSectionProps {
  subject: string
  result: any
  feedback: any
}

const DetailedFeedbackSection: React.FC<DetailedFeedbackSectionProps> = ({ 
  subject, 
  result, 
  feedback 
}) => {
  return (
    <Card>
      <CardHeader
        title={`${subject.charAt(0).toUpperCase() + subject.slice(1)} - Detailed Feedback`}
        subtitle={`Grade: ${result?.grade} (${result?.marks}/${result?.maxMarks} marks)`}
      />
      <CardContent>
        <div className="space-y-6">
          {/* AI Explanation */}
          {feedback && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="flex items-center text-blue-900 font-medium mb-2">
                <InformationCircleIcon className="h-5 w-5 mr-2" />
                How Your Answer Was Marked
              </h4>
              <p className="text-blue-800 text-sm leading-relaxed mb-3">
                {feedback.rationale}
              </p>
              <div className="text-xs text-blue-700">
                <span className="font-medium">AI Confidence:</span> {feedback.confidence.overall}%
              </div>
            </div>
          )}

          {/* Question-by-Question Breakdown */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Question Breakdown</h4>
            <div className="space-y-3">
              {feedback?.criteriaBreakdown?.map((criterion: any, index: number) => (
                <QuestionFeedbackItem 
                  key={index}
                  criterion={criterion}
                  questionNumber={`1${String.fromCharCode(97 + index)}`}
                />
              )) || (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  Detailed question-by-question feedback will be available once all papers are processed.
                </div>
              )}
            </div>
          </div>

          {/* Improvement Recommendations */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Recommendations for Improvement</h4>
            <div className="space-y-2">
              <RecommendationItem
                type="strength"
                text="Excellent application of quadratic formula with clear working steps"
              />
              <RecommendationItem
                type="improvement"
                text="Consider double-checking final answer presentation and units"
              />
              <RecommendationItem
                type="study"
                text="Practice more questions involving complex algebraic manipulation"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Question Feedback Item
interface QuestionFeedbackItemProps {
  criterion: any
  questionNumber: string
}

const QuestionFeedbackItem: React.FC<QuestionFeedbackItemProps> = ({ criterion, questionNumber }) => {
  const percentage = Math.round((criterion.marksAwarded / criterion.maxMarks) * 100)
  
  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-sm font-medium text-gray-900">
          Question {questionNumber}: {criterion.criterion}
        </h5>
        <Badge 
          variant={percentage >= 80 ? 'success' : percentage >= 60 ? 'warning' : 'danger'}
          size="sm"
        >
          {criterion.marksAwarded}/{criterion.maxMarks}
        </Badge>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className={clsx(
            'h-2 rounded-full transition-all duration-500',
            percentage >= 80 ? 'bg-success-500' : percentage >= 60 ? 'bg-warning-500' : 'bg-danger-500'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <p className="text-xs text-gray-600">{criterion.explanation}</p>
    </div>
  )
}

// Recommendation Item
interface RecommendationItemProps {
  type: 'strength' | 'improvement' | 'study'
  text: string
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ type, text }) => {
  const config = {
    strength: { color: 'text-success-700', bg: 'bg-success-50', icon: '✓' },
    improvement: { color: 'text-warning-700', bg: 'bg-warning-50', icon: '!' },
    study: { color: 'text-blue-700', bg: 'bg-blue-50', icon: '📚' },
  }
  
  return (
    <div className={clsx('p-3 rounded-lg flex items-start space-x-3', config[type].bg)}>
      <span className="text-sm">{config[type].icon}</span>
      <p className={clsx('text-sm', config[type].color)}>{text}</p>
    </div>
  )
}

// Performance Analysis Card
const PerformanceAnalysis: React.FC<{ results: any }> = ({ results }) => {
  return (
    <Card>
      <CardHeader
        title="Performance Analysis"
        subtitle="Your performance across subjects"
      />
      <CardContent>
        <div className="space-y-4">
          {/* Overall Performance */}
          <div className="text-center p-4 bg-primary-50 rounded-lg">
            <h4 className="text-lg font-semibold text-primary-900 mb-1">Overall Performance</h4>
            <p className="text-3xl font-bold text-primary-600">85.0%</p>
            <p className="text-sm text-primary-700">Average across all subjects</p>
          </div>

          {/* Strengths and Areas for Improvement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Strengths</h5>
              <ul className="text-sm space-y-1">
                <li className="flex items-center text-success-700">
                  <span className="mr-2">✓</span>
                  Mathematical problem-solving
                </li>
                <li className="flex items-center text-success-700">
                  <span className="mr-2">✓</span>
                  Historical analysis skills
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Areas to Improve</h5>
              <ul className="text-sm space-y-1">
                <li className="flex items-center text-warning-700">
                  <span className="mr-2">!</span>
                  Essay structure in English
                </li>
                <li className="flex items-center text-warning-700">
                  <span className="mr-2">!</span>
                  Time management
                </li>
              </ul>
            </div>
          </div>
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
          <Button variant="primary" fullWidth leftIcon={<DocumentTextIcon className="h-4 w-4" />}>
            Download Results Certificate
          </Button>
          <Button variant="outline" fullWidth leftIcon={<ScaleIcon className="h-4 w-4" />}>
            Submit an Appeal
          </Button>
          <Button variant="ghost" fullWidth leftIcon={<ChartBarIcon className="h-4 w-4" />}>
            View Detailed Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Academic Planning Card
const AcademicPlanningCard: React.FC = () => {
  return (
    <Card>
      <CardHeader
        title="Academic Planning"
        subtitle="Based on your results"
      />
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <h5 className="font-medium text-green-900 mb-1">University Prospects</h5>
            <p className="text-sm text-green-800">
              Your results meet requirements for 89% of your preferred courses
            </p>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Recommended Next Steps</h5>
            <ul className="text-sm space-y-1">
              <li className="flex items-center">
                <MapIcon className="h-4 w-4 mr-2 text-primary-600" />
                <span>Complete CAO application</span>
              </li>
              <li className="flex items-center">
                <TrophyIcon className="h-4 w-4 mr-2 text-primary-600" />
                <span>Consider scholarship opportunities</span>
              </li>
            </ul>
          </div>
          
          <Button variant="primary" size="sm" fullWidth>
            Explore Course Options
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Appeals Info Card
const AppealsInfoCard: React.FC<{ appeals: any[] }> = ({ appeals }) => {
  return (
    <Card>
      <CardHeader
        title="Appeals"
        subtitle={`${appeals.length} active appeals`}
      />
      <CardContent>
        {appeals.length > 0 ? (
          <div className="space-y-3">
            {appeals.map((appeal, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Appeal #{appeal.id}</span>
                  <StatusBadge status={appeal.status} />
                </div>
                <p className="text-xs text-gray-600">{appeal.subject}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <ScaleIcon className="h-8 w-8 mx-auto text-gray-300 mb-2" />
            <p className="text-sm text-gray-600 mb-3">No active appeals</p>
            <Button variant="outline" size="sm">
              Learn About Appeals Process
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}