import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?:    Size
  children: ReactNode
  className?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>  & { as: 'a' }

type Props = ButtonProps | AnchorProps

const variantClasses: Record<Variant, string> = {
  primary:   'bg-primary text-white shadow-md hover:bg-primary-dark hover:shadow-lg',
  secondary: 'bg-secondary text-white shadow-md hover:bg-green-800 hover:shadow-lg',
  outline:   'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost:     'text-primary hover:bg-primary/10',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({ variant = 'primary', size = 'md', children, className = '', as: Tag = 'button', ...rest }: Props) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold',
    'transition-all duration-200 hover:scale-[1.02]',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(' ')

  if (Tag === 'a') {
    const { as: _as, ...anchorRest } = rest as AnchorProps
    return <a className={classes} {...anchorRest}>{children}</a>
  }

  const { as: _as, ...btnRest } = rest as ButtonProps
  return <button className={classes} {...btnRest}>{children}</button>
}
