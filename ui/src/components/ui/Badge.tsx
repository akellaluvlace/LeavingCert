// Badge Component for Status Indicators and Labels
// Simplified version to avoid runtime errors

import React from 'react'
import { clsx } from 'clsx'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'secondary'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  rounded?: boolean
  outline?: boolean
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'sm',
    rounded = false,
    outline = false,
    children,
    ...props 
  }, ref) => {
    const getVariantClasses = (variant: string, outline: boolean) => {
      if (outline) {
        switch (variant) {
          case 'success': return 'text-green-700 border-green-300'
          case 'warning': return 'text-yellow-700 border-yellow-300'
          case 'danger': return 'text-red-700 border-red-300'
          case 'info': return 'text-blue-700 border-blue-300'
          case 'secondary': return 'text-purple-700 border-purple-300'
          default: return 'text-gray-700 border-gray-300'
        }
      } else {
        switch (variant) {
          case 'success': return 'bg-green-100 text-green-800'
          case 'warning': return 'bg-yellow-100 text-yellow-800'
          case 'danger': return 'bg-red-100 text-red-800'
          case 'info': return 'bg-blue-100 text-blue-800'
          case 'secondary': return 'bg-purple-100 text-purple-800'
          default: return 'bg-gray-100 text-gray-800'
        }
      }
    }

    const getSizeClasses = (size: string) => {
      switch (size) {
        case 'xs': return 'px-2 py-0.5 text-xs'
        case 'sm': return 'px-2.5 py-1 text-xs'
        case 'md': return 'px-3 py-1.5 text-sm'
        case 'lg': return 'px-4 py-2 text-base'
        default: return 'px-2.5 py-1 text-xs'
      }
    }

    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center font-medium',
          rounded ? 'rounded-full' : 'rounded-md',
          outline && 'border',
          getVariantClasses(variant, outline),
          getSizeClasses(size),
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

// Confidence Score Badge - Special component for AI confidence display
interface ConfidenceBadgeProps {
  score: number
  showPercentage?: boolean
  className?: string
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  score,
  showPercentage = true,
  className,
}) => {
  const getVariant = (score: number) => {
    if (score >= 90) return 'success'
    if (score >= 70) return 'warning'
    return 'danger'
  }

  const getRiskLevel = (score: number) => {
    if (score >= 90) return 'Low Risk'
    if (score >= 70) return 'Medium Risk'
    return 'High Risk'
  }

  const variant = getVariant(score)
  const displayText = showPercentage ? `${score}%` : getRiskLevel(score)

  return (
    <Badge 
      variant={variant} 
      className={className}
      title={`Confidence Score: ${score}% - ${getRiskLevel(score)}`}
    >
      {displayText}
    </Badge>
  )
}

// Grade Badge - For displaying student grades
interface GradeBadgeProps {
  grade: string
  className?: string
}

export const GradeBadge: React.FC<GradeBadgeProps> = ({ grade, className }) => {
  const getGradeVariant = (grade: string) => {
    const gradeUpper = grade.toUpperCase()
    if (gradeUpper.startsWith('A')) return 'success'
    if (gradeUpper.startsWith('B')) return 'info'
    if (gradeUpper.startsWith('C')) return 'warning'
    return 'secondary'
  }

  return (
    <Badge 
      variant={getGradeVariant(grade)}
      size="md"
      className={className}
    >
      {grade}
    </Badge>
  )
}

// Status Badge - For various status indicators
interface StatusBadgeProps {
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'review' | 'appealed'
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig = {
    pending: { variant: 'secondary' as const, text: 'Pending' },
    processing: { variant: 'info' as const, text: 'Processing' },
    completed: { variant: 'success' as const, text: 'Completed' },
    failed: { variant: 'danger' as const, text: 'Failed' },
    review: { variant: 'warning' as const, text: 'Review Required' },
    appealed: { variant: 'secondary' as const, text: 'Appealed' },
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <Badge variant={config.variant} className={className}>
      {config.text}
    </Badge>
  )
}