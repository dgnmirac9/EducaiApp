import { type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export function Input({
  label,
  error,
  hint,
  className = '',
  id,
  ...props
}: InputProps) {
  const hasError = Boolean(error)

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-medium text-[var(--text-secondary)] tracking-tight"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`px-4 py-3 rounded-xl bg-white/5 border text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 ${
          hasError
            ? 'border-red-500/50 focus:border-red-500/80 focus:bg-red-500/5'
            : 'border-white/10 focus:border-purple-500/50 focus:bg-white/[0.08]'
        } ${className}`}
        {...props}
      />
      {error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : hint ? (
        <p className="text-xs text-[var(--text-muted)]">{hint}</p>
      ) : null}
    </div>
  )
}
