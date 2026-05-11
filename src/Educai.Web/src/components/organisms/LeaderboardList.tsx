import { Badge } from '../atoms/Badge'
import { Card } from '../atoms/Card'
import type { User } from '../../types/User'

interface LeaderboardListProps {
  users: User[]
}

const rankStyles: Record<number, string> = {
  1: 'bg-gradient-to-r from-amber-400/20 to-transparent border-amber-400/30',
  2: 'bg-gradient-to-r from-zinc-300/15 to-transparent border-zinc-200/20',
  3: 'bg-gradient-to-r from-orange-400/15 to-transparent border-orange-400/25',
}

const rankIcon: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

const avatarPalette = [
  'from-purple-500 to-fuchsia-500',
  'from-amber-400 to-orange-500',
  'from-emerald-400 to-teal-500',
  'from-pink-500 to-rose-500',
  'from-sky-400 to-blue-500',
]

export function LeaderboardList({ users }: LeaderboardListProps) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          🏆 Top Oyuncular
        </h2>
        <span className="text-[10px] text-[var(--text-muted)]">
          Bu hafta
        </span>
      </div>

      {users.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)] text-center py-6">
          Henüz veri yok
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {users.map((user, index) => {
            const rank = index + 1
            const palette = avatarPalette[index % avatarPalette.length]
            const accent = rank <= 3 ? rankStyles[rank] : ''
            return (
              <li
                key={user.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent ${accent || 'hover:bg-white/[0.03] hover:border-[var(--border)]'} transition-colors`}
              >
                <span className="w-7 text-center text-sm font-bold text-[var(--text-muted)] tabular-nums">
                  {rankIcon[rank] ?? `#${rank}`}
                </span>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm bg-gradient-to-br ${palette} shadow-sm shadow-black/30`}
                >
                  🧑‍🎓
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user.nickname}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Level {user.level}
                  </p>
                </div>
                <Badge variant="xp">{user.totalXP.toLocaleString()} XP</Badge>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}
