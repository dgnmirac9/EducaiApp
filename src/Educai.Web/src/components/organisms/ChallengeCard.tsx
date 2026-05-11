import { Badge } from '../atoms/Badge'
import { Card } from '../atoms/Card'
import type { Challenge } from '../../types/Challenge'

interface ChallengeCardProps {
  challenge: Challenge | null
}

function daysUntil(dateStr: string): number {
  const end = new Date(dateStr)
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  if (!challenge) {
    return (
      <Card className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            🏆 Aktif Challenge
          </h2>
          <Badge variant="neutral">Yok</Badge>
        </div>
        <p className="text-sm text-[var(--text-muted)] py-4 text-center">
          Şu anda aktif bir challenge yok.
        </p>
      </Card>
    )
  }

  const remaining = daysUntil(challenge.endDate)
  const start = new Date(challenge.startDate).getTime()
  const end = new Date(challenge.endDate).getTime()
  const now = Date.now()
  const elapsed = Math.max(0, now - start)
  const total = Math.max(1, end - start)
  const percent = Math.min(100, Math.round((elapsed / total) * 100))

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          🏆 Aktif Challenge
        </h2>
        <Badge variant="danger">{remaining} gün kaldı</Badge>
      </div>

      <div className="min-w-0">
        <p className="text-base font-semibold text-white truncate">
          {challenge.title}
        </p>
        {challenge.description && (
          <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2">
            {challenge.description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--text-muted)]">İlerleme</span>
          <span className="text-white font-semibold tabular-nums">{percent}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-[width] duration-700 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </Card>
  )
}
