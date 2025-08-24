// Core Platform Types
// Based on PRD Sections: AI-Assisted Marking, Data Flows, Analytics

// AI Marking and Assessment Types
export interface ExaminationPaper {
  id: string
  studentId: string
  subjectCode: string
  subjectName: string
  paperType: 'higher' | 'ordinary' | 'foundation'
  sessionYear: number
  sessionMonth: string
  scanTimestamp: Date
  ocrStatus: 'pending' | 'processing' | 'completed' | 'failed'
  ocrConfidence: number
  markingStatus: 'pending' | 'ai_marked' | 'human_review' | 'completed' | 'appealed'
  totalMarks: number
  maxMarks: number
  grade?: string
  responses: QuestionResponse[]
}

export interface QuestionResponse {
  id: string
  questionNumber: string
  questionPart?: string
  studentResponse: string
  ocrText?: string
  ocrConfidence: number
  markingDecision?: AIMarkingDecision
  humanOverride?: HumanOverride
  scannedImageUrl: string
}

export interface AIMarkingDecision {
  id: string
  marks: number
  maxMarks: number
  confidence: ConfidenceScore
  rationale: string
  criteriaBreakdown: MarkingCriteria[]
  timestamp: Date
  aiAgentVersion: string
  flaggedForReview: boolean
  biasChecked: boolean
}

export interface ConfidenceScore {
  overall: number // 0-100
  contentUnderstanding: number
  markingSchemeApplication: number
  languageProcessing: number
  riskLevel: 'low' | 'medium' | 'high'
  reviewRequired: boolean
}

export interface MarkingCriteria {
  criterion: string
  marksAwarded: number
  maxMarks: number
  explanation: string
  evidenceFromResponse: string[]
}

export interface HumanOverride {
  id: string
  teacherId: string
  teacherName: string
  originalMarks: number
  newMarks: number
  justification: string
  timestamp: Date
  reviewLevel: 'teacher' | 'moderator' | 'senior_reviewer'
}

// Appeals System Types
export interface Appeal {
  id: string
  studentId: string
  studentName: string
  paperId: string
  questionNumbers: string[]
  submissionDate: Date
  status: 'submitted' | 'under_review' | 'additional_info_required' | 'completed' | 'rejected'
  groundsForAppeal: string[]
  evidenceProvided: string
  supportingDocuments: string[]
  assignedReviewerId?: string
  reviewerDecision?: AppealDecision
  estimatedCompletionDate?: Date
  fees: {
    required: boolean
    amount?: number
    paid?: boolean
    paymentDate?: Date
  }
}

export interface AppealDecision {
  id: string
  reviewerId: string
  reviewerName: string
  decision: 'upheld' | 'partially_upheld' | 'rejected'
  originalMarks: number
  revisedMarks?: number
  detailedExplanation: string
  decisionDate: Date
  refundRecommended: boolean
}

// Analytics and Performance Types
export interface PerformanceMetrics {
  accuracy: {
    overall: number
    bySubject: Record<string, number>
    byQuestionType: Record<string, number>
    trend: DataPoint[]
  }
  processing: {
    averageTimePerPaper: number // in minutes
    papersProcessedToday: number
    totalPapersInQueue: number
    completionRate: number
  }
  quality: {
    humanOverrideRate: number
    appealsRate: number
    successfulAppealsRate: number
    biasIncidents: number
  }
  stakeholderSatisfaction: {
    teachers: number
    students: number
    parents: number
    overall: number
  }
}

export interface DataPoint {
  date: string
  value: number
  label?: string
}

// System Status and Monitoring
export interface SystemStatus {
  overall: 'operational' | 'degraded' | 'maintenance' | 'outage'
  components: {
    ocrPipeline: ComponentStatus
    aiMarkingAgents: ComponentStatus
    database: ComponentStatus
    userInterface: ComponentStatus
    apiGateway: ComponentStatus
  }
  lastUpdated: Date
  uptime: number
  activeUsers: number
  currentLoad: number
}

export interface ComponentStatus {
  status: 'operational' | 'degraded' | 'down'
  responseTime?: number
  lastCheck: Date
  errorRate?: number
}

// Subject and Curriculum Types
export enum Subject {
  MATHEMATICS = 'mathematics',
  ENGLISH = 'english',
  IRISH = 'irish',
  HISTORY = 'history',
  GEOGRAPHY = 'geography',
  BIOLOGY = 'biology',
  CHEMISTRY = 'chemistry',
  PHYSICS = 'physics',
  FRENCH = 'french',
  GERMAN = 'german',
  SPANISH = 'spanish',
  ART = 'art',
  MUSIC = 'music',
  // Add more subjects as needed
}

export interface MarkingScheme {
  id: string
  subjectCode: string
  paperType: string
  year: number
  criteria: MarkingSchemeCriteria[]
  totalMarks: number
  gradeBoundaries: GradeBoundary[]
  lastUpdated: Date
}

export interface MarkingSchemeCriteria {
  questionNumber: string
  questionPart?: string
  maxMarks: number
  acceptableAnswers: string[]
  partialCreditRules: PartialCreditRule[]
  commonMistakes: string[]
  exampleResponses: ExampleResponse[]
}

export interface PartialCreditRule {
  condition: string
  marksAwarded: number
  explanation: string
}

export interface ExampleResponse {
  response: string
  marks: number
  explanation: string
  quality: 'excellent' | 'good' | 'satisfactory' | 'poor'
}

export interface GradeBoundary {
  grade: string
  minMarks: number
  maxMarks: number
  percentage: number
}

// Notification and Communication Types
export interface Notification {
  id: string
  userId: string
  type: 'info' | 'warning' | 'success' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  actionLabel?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

// GDPR and Compliance Types
export interface GDPRConsent {
  userId: string
  consentType: 'essential' | 'analytics' | 'marketing' | 'research'
  granted: boolean
  timestamp: Date
  ipAddress: string
  userAgent: string
  version: string
}

export interface AuditLog {
  id: string
  userId: string
  userRole: string
  action: string
  resource: string
  resourceId?: string
  timestamp: Date
  ipAddress: string
  userAgent: string
  outcome: 'success' | 'failure' | 'error'
  details?: Record<string, any>
  gdprRelevant: boolean
}