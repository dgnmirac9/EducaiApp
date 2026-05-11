import { Badge } from '../atoms/Badge'

interface DashboardHeaderProps {
  nickname: string
  level: number
  totalXP: number
}

export function DashboardHeader({ nickname, level, totalXP }: DashboardHeaderProps) {
  const xpForCurrentLevel = (level - 1) * 800
  const xpForNextLevel = level * 800
  const currentLevelXP = Math.max(0, totalXP - xpForCurrentLevel)
  const neededXP = xpForNextLevel - xpForCurrentLevel
  const xpPercent = Math.min(100, (currentLevelXP / neededXP) * 100)

  return (
    <header className="flex items-center justify-between gap-6 pb-8 flex-wrap">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Hoş geldin, <span className="text-purple-300">{nickname}</span>{' '}
          <span className="inline-block">👋</span>
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1 tracking-wide">
          Bugün için hedeflerin seni bekliyor.
        </p>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="flex flex-col items-end gap-1.5 min-w-[200px]">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[var(--text-muted)] uppercase tracking-widest">
              XP
            </span>
            <span className="text-white font-semibold tabular-nums">
              {currentLevelXP} / {neededXP}
            </span>
          </div>
          <div className="w-52 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 transition-[width] duration-700 ease-out"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        <Badge variant="level" className="!text-sm !px-3 !py-1.5 font-semibold">
          Lvl {level}
        </Badge>
      </div>
    </header>
  )
}
