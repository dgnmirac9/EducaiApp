import { type HTMLAttributes, type ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  interactive?: boolean
  padded?: boolean
  gradient?: boolean
}

export function Card({
  children,
  interactive = false,
  padded = true,
  gradient = false,
  className = '',
  ...props
}: CardProps) {
  const base =
    'relative bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl backdrop-blur-xl transition-all duration-200'
  const padding = padded ? 'p-6' : ''
  const hover = interactive
    ? 'hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)] cursor-pointer'
    : ''

  if (gradient) {
    return (
      <div
        className={`relative rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/40 via-fuchsia-500/30 to-pink-500/40 ${className}`}
      >
        <div
          className={`${base} ${padding} !border-transparent`}
          style={{ borderRadius: '15px' }}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={`${base} ${padding} ${hover} ${className}`} {...props}>
      {children}
    </div>
  )
}
