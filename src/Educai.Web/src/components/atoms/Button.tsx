import { type ButtonHTMLAttributes, type ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const sizes: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5 rounded-lg',
  md: 'text-sm px-4 py-2.5 rounded-xl',
  lg: 'text-base px-5 py-3 rounded-xl',
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-br from-purple-600 to-purple-700 text-white font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:from-purple-500 hover:to-purple-600 hover:shadow-[0_0_30px_rgba(124,58,237,0.55)] hover:scale-[1.02]',
  secondary:
    'bg-transparent text-[var(--text-primary)] border border-white/10 hover:bg-white/5 hover:border-white/20',
  danger:
    'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50',
  ghost:
    'bg-transparent text-[var(--text-secondary)] hover:text-white hover:bg-white/5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  loading,
  leftIcon,
  rightIcon,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 select-none'

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span
          className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
          aria-label="loading"
        />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!loading && rightIcon}
    </button>
  )
}
