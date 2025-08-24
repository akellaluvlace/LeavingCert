// Appeals Workflow System Implementation
// Based on PRD Section: Appeals and Fairness Framework

'use client'

import React, { useState } from 'react'
import { clsx } from 'clsx'
import {
  ScaleIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  CurrencyEuroIcon,
  UserIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge, StatusBadge } from '../ui/Badge'
import { mockAppeals } from '@/lib/mock-data'
import { Appeal, AppealDecision } from '@/types/platform'

// Main Appeals Workflow Component
export const AppealWorkflow: React.FC<{ userRole: string }> = ({ userRole }) => {
  const [activeAppeal, setActiveAppeal] = useState<Appeal | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'detail' | 'process'>('list')

  if (userRole === 'student' || userRole === 'parent') {
    return <StudentAppealView onInitiate={() => setViewMode('process')} />
  }

  if (userRole === 'reviewer_moderator') {
    return (
      <ReviewerAppealView 
        appeals={mockAppeals}
        onSelectAppeal={setActiveAppeal}
        activeAppeal={activeAppeal}
      />
    )
  }

  // Default view for other roles
  return <AppealOverviewView appeals={mockAppeals} />
}

// Student/Parent Appeal View - Initiate Appeals
const StudentAppealView: React.FC<{ onInitiate: () => void }> = ({ onInitiate }) => {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
  const [appealGrounds, setAppealGrounds] = useState<string[]>([])
  const [step, setStep] = useState<1 | 2 | 3>(1)

  const availableQuestions = [
    { id: '1a', subject: 'Mathematics', description: 'Algebra - Quadratic equations', marks: 8 },
    { id: '1b', subject: 'Mathematics', description: 'Algebra - Simultaneous equations', marks: 6 },
    { id: '2a', subject: 'Mathematics', description: 'Calculus - Integration', marks: 10 },
    { id: '2b', subject: 'Mathematics', description: 'Calculus - Differentiation', marks: 8 },
  ]

  const groundsOptions = [
    'marking_error', 
    'alternative_method', 
    'transcription_error', 
    'unclear_question', 
    'technical_issue'
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader
          title="Submit an Appeal"
          subtitle="Request a review of your examination results"
        />
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={clsx(
                    'flex items-center justify-center w-8 h-8 rounded-full',
                    step >= stepNum ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
                  )}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={clsx(
                      'w-16 h-1 mx-2',
                      step > stepNum ? 'bg-primary-600' : 'bg-gray-300'
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <AppealStep1 
              questions={availableQuestions}
              selectedQuestions={selectedQuestions}
              onSelectionChange={setSelectedQuestions}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <AppealStep2
              grounds={groundsOptions}
              selectedGrounds={appealGrounds}
              onGroundsChange={setAppealGrounds}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <AppealStep3
              selectedQuestions={selectedQuestions}
              selectedGrounds={appealGrounds}
              onSubmit={() => alert('Appeal submitted successfully!')}
              onBack={() => setStep(2)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Appeal Step Components
const AppealStep1: React.FC<{
  questions: any[]
  selectedQuestions: string[]
  onSelectionChange: (questions: string[]) => void
  onNext: () => void
}> = ({ questions, selectedQuestions, onSelectionChange, onNext }) => {
  const handleQuestionToggle = (questionId: string) => {
    if (selectedQuestions.includes(questionId)) {
      onSelectionChange(selectedQuestions.filter(q => q !== questionId))
    } else {
      onSelectionChange([...selectedQuestions, questionId])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Questions to Appeal</h3>
        <p className="text-gray-600 mb-4">Choose the specific questions you wish to appeal</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {questions.map((question) => (
          <div
            key={question.id}
            className={clsx(
              'p-4 border-2 rounded-lg cursor-pointer transition-all',
              selectedQuestions.includes(question.id)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            )}
            onClick={() => handleQuestionToggle(question.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">
                  Question {question.id} - {question.subject}
                </h4>
                <p className="text-sm text-gray-600">{question.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" size="sm">{question.marks} marks</Badge>
                {selectedQuestions.includes(question.id) && (
                  <CheckCircleIcon className="h-5 w-5 text-primary-600" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={onNext} 
          disabled={selectedQuestions.length === 0}
        >
          Next Step
        </Button>
      </div>
    </div>
  )
}

const AppealStep2: React.FC<{
  grounds: string[]
  selectedGrounds: string[]
  onGroundsChange: (grounds: string[]) => void
  onNext: () => void
  onBack: () => void
}> = ({ grounds, selectedGrounds, onGroundsChange, onNext, onBack }) => {
  const groundsLabels: Record<string, string> = {
    marking_error: 'Marking Error - Incorrect application of marking scheme',
    alternative_method: 'Alternative Method - Valid approach not recognized',
    transcription_error: 'Transcription Error - OCR misread my response',
    unclear_question: 'Unclear Question - Ambiguous wording or instructions',
    technical_issue: 'Technical Issue - System or scanning problems'
  }

  const handleGroundToggle = (ground: string) => {
    if (selectedGrounds.includes(ground)) {
      onGroundsChange(selectedGrounds.filter(g => g !== ground))
    } else {
      onGroundsChange([...selectedGrounds, ground])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Grounds for Appeal</h3>
        <p className="text-gray-600 mb-4">Select the reasons for your appeal (you can select multiple)</p>
      </div>

      <div className="space-y-3">
        {grounds.map((ground) => (
          <div
            key={ground}
            className={clsx(
              'p-4 border-2 rounded-lg cursor-pointer transition-all',
              selectedGrounds.includes(ground)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            )}
            onClick={() => handleGroundToggle(ground)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">
                  {groundsLabels[ground].split(' - ')[0]}
                </h4>
                <p className="text-sm text-gray-600">
                  {groundsLabels[ground].split(' - ')[1]}
                </p>
              </div>
              {selectedGrounds.includes(ground) && (
                <CheckCircleIcon className="h-5 w-5 text-primary-600 ml-3" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Evidence (Optional)
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            placeholder="Provide any additional details or evidence to support your appeal..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supporting Documents
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Upload supporting documents (optional)</p>
            <Button variant="outline" size="sm" className="mt-2">
              Choose Files
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={selectedGrounds.length === 0}
        >
          Review Appeal
        </Button>
      </div>
    </div>
  )
}

const AppealStep3: React.FC<{
  selectedQuestions: string[]
  selectedGrounds: string[]
  onSubmit: () => void
  onBack: () => void
}> = ({ selectedQuestions, selectedGrounds, onSubmit, onBack }) => {
  const appealFee = 40 // EUR per appeal

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Your Appeal</h3>
        <p className="text-gray-600 mb-4">Please review your appeal details before submission</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Questions to Appeal" />
          <CardContent>
            <div className="space-y-2">
              {selectedQuestions.map(q => (
                <div key={q} className="flex justify-between items-center">
                  <span className="text-sm text-gray-900">Question {q}</span>
                  <Badge variant="secondary" size="xs">Mathematics</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Grounds for Appeal" />
          <CardContent>
            <div className="space-y-2">
              {selectedGrounds.map(ground => (
                <div key={ground} className="text-sm text-gray-700">
                  • {ground.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader title="Appeal Fee" />
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <CurrencyEuroIcon className="h-5 w-5 text-yellow-600 mr-2" />
              <div>
                <p className="font-medium text-yellow-900">Fee Required</p>
                <p className="text-sm text-yellow-700">Refundable if appeal is successful</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-yellow-900">€{appealFee}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit} className="min-w-32">
          Submit Appeal & Pay
        </Button>
      </div>
    </div>
  )
}

// Reviewer Appeal Processing View
const ReviewerAppealView: React.FC<{
  appeals: Appeal[]
  onSelectAppeal: (appeal: Appeal) => void
  activeAppeal: Appeal | null
}> = ({ appeals, onSelectAppeal, activeAppeal }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Appeals Queue */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader
            title="Appeals Queue"
            subtitle={`${appeals.length} pending appeals`}
          />
          <CardContent >
            <div className="divide-y divide-gray-200">
              {appeals.map((appeal) => (
                <AppealQueueItem
                  key={appeal.id}
                  appeal={appeal}
                  isSelected={activeAppeal?.id === appeal.id}
                  onClick={() => onSelectAppeal(appeal)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appeal Details */}
      <div className="lg:col-span-2">
        {activeAppeal ? (
          <AppealReviewPanel appeal={activeAppeal} />
        ) : (
          <Card>
            <CardContent>
              <div className="text-center py-12">
                <ScaleIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Appeal Selected</h3>
                <p className="text-gray-600">Select an appeal from the queue to begin review</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Appeal Queue Item
const AppealQueueItem: React.FC<{
  appeal: Appeal
  isSelected: boolean
  onClick: () => void
}> = ({ appeal, isSelected, onClick }) => {
  const daysOld = Math.floor((Date.now() - appeal.submissionDate.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div
      className={clsx(
        'p-4 cursor-pointer hover:bg-gray-50 transition-colors',
        isSelected && 'bg-blue-50 border-r-4 border-primary-500'
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-900">
          Appeal #{appeal.id.split('-')[1]}
        </h4>
        <StatusBadge status={appeal.status as any} />
      </div>
      <p className="text-xs text-gray-600 mb-1">
        {appeal.studentName} • {appeal.questionNumbers.join(', ')}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{daysOld} days old</span>
        {appeal.fees.required && appeal.fees.paid && (
          <Badge variant="success" size="xs">Fee Paid</Badge>
        )}
      </div>
    </div>
  )
}

// Appeal Review Panel
const AppealReviewPanel: React.FC<{ appeal: Appeal }> = ({ appeal }) => {
  const [decision, setDecision] = useState<'upheld' | 'partially_upheld' | 'rejected' | null>(null)
  const [reasoning, setReasoning] = useState('')

  const handleSubmitDecision = () => {
    if (!decision || !reasoning.trim()) {
      alert('Please provide a decision and reasoning')
      return
    }
    
    alert(`Appeal ${decision} with reasoning: ${reasoning}`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title={`Appeal #${appeal.id.split('-')[1]}`}
          subtitle={`Submitted by ${appeal.studentName}`}
        />
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Questions:</span>
              <span className="ml-2 font-medium">{appeal.questionNumbers.join(', ')}</span>
            </div>
            <div>
              <span className="text-gray-600">Submitted:</span>
              <span className="ml-2 font-medium">{appeal.submissionDate.toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <span className="ml-2"><StatusBadge status={appeal.status as any} /></span>
            </div>
            <div>
              <span className="text-gray-600">Fee Status:</span>
              <span className="ml-2">
                {appeal.fees.paid ? (
                  <Badge variant="success" size="xs">Paid</Badge>
                ) : (
                  <Badge variant="warning" size="xs">Pending</Badge>
                )}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Appeal Details" />
        <CardContent>
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Grounds for Appeal:</h5>
              <div className="flex flex-wrap gap-2">
                {appeal.groundsForAppeal.map((ground, index) => (
                  <Badge key={index} variant="secondary" size="sm">
                    {ground.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 mb-2">Evidence Provided:</h5>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                {appeal.evidenceProvided}
              </p>
            </div>

            {appeal.supportingDocuments.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Supporting Documents:</h5>
                <div className="space-y-2">
                  {appeal.supportingDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <DocumentTextIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-blue-600 hover:underline cursor-pointer">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Reviewer Decision" />
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Decision
              </label>
              <div className="space-y-2">
                {(['upheld', 'partially_upheld', 'rejected'] as const).map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="decision"
                      value={option}
                      checked={decision === option}
                      onChange={(e) => setDecision(e.target.value as any)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-900 capitalize">
                      {option.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Reasoning
              </label>
              <textarea
                rows={4}
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Provide detailed reasoning for your decision..."
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">
                Save Draft
              </Button>
              <Button onClick={handleSubmitDecision}>
                Submit Decision
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Appeals Overview for other roles
const AppealOverviewView: React.FC<{ appeals: Appeal[] }> = ({ appeals }) => {
  const stats = {
    total: appeals.length,
    pending: appeals.filter(a => a.status === 'submitted').length,
    underReview: appeals.filter(a => a.status === 'under_review').length,
    completed: appeals.filter(a => a.status === 'completed').length,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Appeals</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning-600">{stats.pending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.underReview}</p>
              <p className="text-sm text-gray-600">Under Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-2xl font-bold text-success-600">{stats.completed}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader title="Recent Appeals" />
        <CardContent>
          <div className="space-y-3">
            {appeals.slice(0, 5).map((appeal) => (
              <div key={appeal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Appeal #{appeal.id.split('-')[1]}</p>
                  <p className="text-sm text-gray-600">{appeal.studentName} • {appeal.questionNumbers.join(', ')}</p>
                </div>
                <StatusBadge status={appeal.status as any} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}