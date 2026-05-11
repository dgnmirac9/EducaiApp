import { type HTMLAttributes, type ReactNode } from 'react'

type BadgeVariant =
  | 'xp'
  | 'level'
  | 'success'
  | 'danger'
  | 'neutral'
  | 'premium'
  | 'gold'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

const variants: Record<BadgeVariant, string> = {
  xp: 'bg-amber-500/15 border border-amber-500/30 text-amber-400',
  level: 'bg-purple-500/15 border border-purple-500/30 text-purple-300',
  success: 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400',
  danger: 'bg-red-500/15 border border-red-500/30 text-red-400',
  neutral: 'bg-white/5 border border-white/10 text-[var(--text-secondary)]',
  premium:
    'bg-gradient-to-r from-pink-500 to-purple-500 border border-pink-300/40 text-white shadow-sm shadow-pink-500/20',
  gold: 'bg-amber-400/15 border border-amber-400/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.35)]',
}

export function Badge({
  variant = 'neutral',
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-tight ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
