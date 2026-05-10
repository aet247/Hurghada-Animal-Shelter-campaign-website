import type { ReactNode } from 'react'

type BgVariant = 'white' | 'cream' | 'sand' | 'dark' | 'primary'

interface Props {
  children:  ReactNode
  title?:    string
  subtitle?: string
  bg?:       BgVariant
  id?:       string
  centered?: boolean
  className?: string
}

const bgMap: Record<BgVariant, string> = {
  white:   'bg-white',
  cream:   'bg-shelter-cream',
  sand:    'bg-shelter-sand',
  dark:    'bg-shelter-bark text-white',
  primary: 'bg-primary text-white',
}

export default function Section({ children, title, subtitle, bg = 'cream', id, centered = false, className = '' }: Props) {
  return (
    <section id={id} className={`py-16 md:py-24 ${bgMap[bg]} ${className}`}>
      <div className="container-content">
        {(title || subtitle) && (
          <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
            {title && (
              <h2 className="font-display text-3xl md:text-4xl font-bold text-shelter-bark leading-tight mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-shelter-bark2 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
