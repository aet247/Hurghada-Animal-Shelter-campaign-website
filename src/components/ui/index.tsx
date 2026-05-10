import type { ReactNode } from 'react'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const badgeMap: Record<BadgeVariant, string> = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  danger:  'bg-red-100 text-red-800',
  info:    'bg-blue-100 text-blue-800',
  neutral: 'bg-gray-100 text-gray-700',
}

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeMap[variant]} ${className}`}>
      {children}
    </span>
  )
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-10 h-10 rounded-full border-4 border-amber-200 border-t-primary animate-spin" />
    </div>
  )
}

interface EmptyStateProps {
  icon:    ReactNode
  title:   string
  message: string
}

export function EmptyState({ icon, title, message }: EmptyStateProps) {
  return (
    <div className="text-center py-20 text-shelter-bark2">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-shelter-bark mb-2">{title}</h3>
      <p className="max-w-sm mx-auto">{message}</p>
    </div>
  )
}

interface PageHeaderProps {
  title:     string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-shelter-sand to-shelter-cream py-14 md:py-20 border-b border-amber-100">
      <div className="container-content">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-shelter-bark mb-4 text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-shelter-bark2 max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
