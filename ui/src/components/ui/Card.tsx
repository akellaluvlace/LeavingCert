// Reusable Card Component for Dashboard Layouts
// Based on PRD dashboard wireframe recommendations

import React from 'react'
import { clsx } from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  header?: React.ReactNode
  footer?: React.ReactNode
  loading?: boolean
}

const cardVariants = {
  default: 'bg-white shadow-sm border border-gray-200',
  outlined: 'bg-white border-2 border-gray-300',
  elevated: 'bg-white shadow-lg border border-gray-200',
  flat: 'bg-gray-50 border border-gray-200',
}

const cardPadding = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md',
    header,
    footer,
    loading = false,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-lg overflow-hidden',
          cardVariants[variant],
          !header && !footer && cardPadding[padding],
          loading && 'animate-pulse',
          className
        )}
        {...props}
      >
        {header && (
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            {header}
          </div>
        )}
        
        <div className={clsx((header || footer) && cardPadding[padding])}>
          {loading ? (
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
          ) : (
            children
          )}
        </div>
        
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card Header Component
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  className,
  ...props
}) => {
  return (
    <div className={clsx('flex items-center justify-between', className)} {...props}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex items-center space-x-2">{action}</div>}
    </div>
  )
}

// Card Content Component
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx('text-gray-700', className)} {...props}>
      {children}
    </div>
  )
}

// Card Footer Component
export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx('flex items-center justify-between', className)} {...props}>
      {children}
    </div>
  )
}