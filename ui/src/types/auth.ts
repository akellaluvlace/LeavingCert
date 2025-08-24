// Authentication and Role-Based Access Control Types
// Based on PRD Section: Role-Based Features & Permissions Matrix

export enum UserRole {
  TEACHER_EXAMINER = 'teacher_examiner',
  STUDENT = 'student',
  REVIEWER_MODERATOR = 'reviewer_moderator',
  SEC_ADMINISTRATOR = 'sec_administrator',
  SCHOOL_ADMINISTRATOR = 'school_administrator',
  PARENT = 'parent',
  POLICY_MAKER = 'policy_maker',
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  schoolId?: string
  subjectSpecializations?: string[]
  permissions: Permission[]
  lastLogin?: Date
  isActive: boolean
  gdprConsent: boolean
  consentTimestamp?: Date
}

export interface Permission {
  resource: string
  action: string
  conditions?: Record<string, any>
}

export interface Session {
  user: User
  expires: string
  accessToken: string
}

// RBAC Permissions based on PRD matrix
export const PERMISSIONS = {
  // Dashboard Access
  DASHBOARD_FULL: 'dashboard:full',
  DASHBOARD_LIMITED: 'dashboard:limited', 
  DASHBOARD_EXECUTIVE: 'dashboard:executive',
  
  // AI Marking
  AI_MARKING_REVIEW: 'ai_marking:review',
  AI_MARKING_OVERRIDE: 'ai_marking:override',
  
  // Student Results
  STUDENT_RESULTS_ASSIGNED: 'student_results:assigned',
  STUDENT_RESULTS_OWN: 'student_results:own',
  STUDENT_RESULTS_SYSTEM_WIDE: 'student_results:system_wide',
  STUDENT_RESULTS_SCHOOL: 'student_results:school',
  STUDENT_RESULTS_CHILD: 'student_results:child',
  STUDENT_RESULTS_AGGREGATED: 'student_results:aggregated',
  
  // Appeals
  APPEALS_INITIATE: 'appeals:initiate',
  APPEALS_PROCESS: 'appeals:process',
  APPEALS_OVERSIGHT: 'appeals:oversight',
  APPEALS_SUPPORT: 'appeals:support',
  
  // System Management
  SYSTEM_ANALYTICS: 'system:analytics',
  SYSTEM_CONFIG: 'system:config',
  USER_MANAGEMENT: 'user:management',
  
  // Audit & Reporting
  AUDIT_LOGS: 'audit:logs',
  REPORTING: 'reporting:access',
} as const

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.TEACHER_EXAMINER]: [
    PERMISSIONS.DASHBOARD_FULL,
    PERMISSIONS.AI_MARKING_REVIEW,
    PERMISSIONS.AI_MARKING_OVERRIDE,
    PERMISSIONS.STUDENT_RESULTS_ASSIGNED,
    PERMISSIONS.REPORTING,
    PERMISSIONS.AUDIT_LOGS,
  ],
  [UserRole.STUDENT]: [
    PERMISSIONS.DASHBOARD_LIMITED,
    PERMISSIONS.STUDENT_RESULTS_OWN,
    PERMISSIONS.APPEALS_INITIATE,
  ],
  [UserRole.REVIEWER_MODERATOR]: [
    PERMISSIONS.DASHBOARD_FULL,
    PERMISSIONS.AI_MARKING_REVIEW,
    PERMISSIONS.AI_MARKING_OVERRIDE,
    PERMISSIONS.APPEALS_PROCESS,
    PERMISSIONS.SYSTEM_ANALYTICS,
    PERMISSIONS.AUDIT_LOGS,
    PERMISSIONS.REPORTING,
  ],
  [UserRole.SEC_ADMINISTRATOR]: [
    PERMISSIONS.DASHBOARD_FULL,
    PERMISSIONS.AI_MARKING_REVIEW,
    PERMISSIONS.AI_MARKING_OVERRIDE,
    PERMISSIONS.STUDENT_RESULTS_SYSTEM_WIDE,
    PERMISSIONS.APPEALS_OVERSIGHT,
    PERMISSIONS.SYSTEM_ANALYTICS,
    PERMISSIONS.SYSTEM_CONFIG,
    PERMISSIONS.USER_MANAGEMENT,
    PERMISSIONS.AUDIT_LOGS,
    PERMISSIONS.REPORTING,
  ],
  [UserRole.SCHOOL_ADMINISTRATOR]: [
    PERMISSIONS.DASHBOARD_LIMITED,
    PERMISSIONS.STUDENT_RESULTS_SCHOOL,
    PERMISSIONS.APPEALS_SUPPORT,
    PERMISSIONS.USER_MANAGEMENT,
    PERMISSIONS.REPORTING,
  ],
  [UserRole.PARENT]: [
    PERMISSIONS.DASHBOARD_LIMITED,
    PERMISSIONS.STUDENT_RESULTS_CHILD,
    PERMISSIONS.APPEALS_INITIATE,
  ],
  [UserRole.POLICY_MAKER]: [
    PERMISSIONS.DASHBOARD_EXECUTIVE,
    PERMISSIONS.STUDENT_RESULTS_AGGREGATED,
    PERMISSIONS.SYSTEM_ANALYTICS,
    PERMISSIONS.AUDIT_LOGS,
    PERMISSIONS.REPORTING,
  ],
}