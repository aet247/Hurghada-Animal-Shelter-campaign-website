import type { ReactNode } from 'react'

interface Props {
  children:   ReactNode
  className?: string
  hover?:     boolean
  padding?:   'sm' | 'md' | 'lg' | 'none'
}

const padMap = { sm: 'p-4', md: 'p-6', lg: 'p-8', none: '' }

export default function Card({ children, className = '', hover = false, padding = 'md' }: Props) {
  return (
    <div
      className={[
        'bg-white rounded-2xl shadow-sm border border-amber-100/60',
        hover ? 'transition-all duration-200 hover:shadow-md hover:-translate-y-1' : '',
        padMap[padding],
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
