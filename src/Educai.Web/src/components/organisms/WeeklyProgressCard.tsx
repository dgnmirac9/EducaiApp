import { Card } from '../atoms/Card'
import type { UserProgress } from '../../types/UserProgress'

interface WeeklyProgressCardProps {
  progress: UserProgress | null
}

export function WeeklyProgressCard({ progress }: WeeklyProgressCardProps) {
  const solved = progress?.solved ?? 0
  const target = progress?.target ?? 0
  const percent = Math.min(
    100,
    Math.max(0, Math.round(progress?.progressPercentage ?? 0)),
  )

  const radius = 56
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <Card className="flex items-center gap-6">
      <div className="relative w-32 h-32 shrink-0">
        <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="url(#progGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.7s ease-out' }}
          />
          <defs>
            <linearGradient id="progGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-amber-300 tabular-nums">
            {percent}%
          </span>
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-0.5">
            Tamamlandı
          </span>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          Haftalık İlerleme
        </h2>
        <p className="mt-2 text-2xl font-bold text-white tabular-nums">
          {solved} <span className="text-[var(--text-muted)] font-medium">/ {target}</span>
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-1">soru tamamlandı</p>
      </div>
    </Card>
  )
}
