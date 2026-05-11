import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { getUserById } from '../../services/userService'
import { Badge } from '../atoms/Badge'
import type { User } from '../../types/User'

interface NavItem {
  to: string
  label: string
  icon: string
  disabled?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/profile', label: 'Profil & Tercihler', icon: '👤' },
  { to: '/duel', label: 'Düello', icon: '⚔️' },
  { to: '/leaderboard', label: 'Sıralama', icon: '🏆', disabled: true },
]

export function AppSidebar() {
  const { currentUser, logout } = useUser()
  const navigate = useNavigate()
  const userId = currentUser ?? ''
  const [me, setMe] = useState<User | null>(null)

  useEffect(() => {
    if (!userId) return
    let cancelled = false
    getUserById(userId)
      .then((u) => {
        if (!cancelled) setMe(u)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [userId])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const nickname = me?.nickname ?? userId.slice(0, 8)
  const level = me?.level ?? 1
  const totalXP = me?.totalXP ?? 0

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 bg-[var(--bg-surface)] border-r border-[var(--border)] flex flex-col">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-[var(--border)]">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
            Educai
          </span>
          <span className="text-[10px] text-[var(--text-muted)] font-medium">
            v0.4
          </span>
        </div>
        <p className="text-[11px] text-[var(--text-muted)] mt-1">
          AI Öğrenme Platformu
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV_ITEMS.map((item) =>
          item.disabled ? (
            <div
              key={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-muted)] cursor-not-allowed select-none"
            >
              <span className="text-base">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]/70">
                Yakında
              </span>
            </div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-500/15 text-white font-medium border-l-2 border-purple-400 pl-[14px]'
                    : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ),
        )}
      </nav>

      {/* User card */}
      <div className="px-3 pb-4">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors">
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-lg shrink-0 shadow-lg shadow-purple-500/30">
            🧑‍🎓
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[var(--bg-surface)]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {nickname}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="level" className="!px-2 !py-0 !text-[10px]">
                Lvl {level}
              </Badge>
              <span className="text-[10px] text-[var(--text-muted)] tabular-nums">
                {totalXP.toLocaleString()} XP
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-2 px-3 py-2 rounded-xl text-xs text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-colors tracking-wide"
        >
          Çıkış Yap
        </button>
      </div>
    </aside>
  )
}
