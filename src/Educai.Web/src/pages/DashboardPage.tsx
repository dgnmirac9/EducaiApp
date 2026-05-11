import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useToast } from '../context/ToastContext'
import { getTopLeaderboard } from '../services/leaderboardService'
import { getActiveChallenges } from '../services/challengeService'
import { getWeeklyProgress } from '../services/progressService'
import { getUserById, updateUser } from '../services/userService'
import { AppLayout } from '../components/molecules/AppLayout'
import { DashboardHeader } from '../components/organisms/DashboardHeader'
import { CharacterCard } from '../components/organisms/CharacterCard'
import { ChallengeCard } from '../components/organisms/ChallengeCard'
import { WeeklyProgressCard } from '../components/organisms/WeeklyProgressCard'
import { LeaderboardList } from '../components/organisms/LeaderboardList'
import { ProfileEditPanel } from '../components/organisms/ProfileEditPanel'
import type { User } from '../types/User'
import type { Challenge } from '../types/Challenge'
import type { UserProgress } from '../types/UserProgress'

export function DashboardPage() {
  const { currentUser } = useUser()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [me, setMe] = useState<User | null>(null)
  const [topUsers, setTopUsers] = useState<User[]>([])
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const currentUserId = currentUser ?? ''

  useEffect(() => {
    if (!currentUserId) return
    let cancelled = false

    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const [user, leaders, challenges, prog] = await Promise.all([
          getUserById(currentUserId).catch(() => null),
          getTopLeaderboard(5),
          getActiveChallenges(),
          getWeeklyProgress(currentUserId),
        ])
        if (!cancelled) {
          setMe(user)
          setTopUsers(leaders)
          setActiveChallenge(challenges[0] ?? null)
          setProgress(prog)
        }
      } catch {
        if (!cancelled) setError('Veriler yüklenirken hata oluştu.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => {
      cancelled = true
    }
  }, [currentUserId])

  const nickname = me?.nickname ?? currentUserId.slice(0, 8)
  const level = me?.level ?? 1
  const totalXP = me?.totalXP ?? 0

  const handleProfileSave = async (newNickname: string) => {
    if (!me) {
      navigate('/profile')
      return
    }
    try {
      const updated = await updateUser(me.id, {
        nickname: newNickname,
        level: me.level,
        totalXP: me.totalXP,
        isPremium: me.isPremium,
      })
      setMe(updated)
      showToast('Profil güncellendi.', 'success')
    } catch {
      showToast('Profil güncellenemedi.', 'error')
    }
  }

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-8 py-10">
        <DashboardHeader nickname={nickname} level={level} totalXP={totalXP} />

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-[var(--text-muted)] text-sm text-center py-16">
            Yükleniyor...
          </p>
        ) : (
          <div className="flex flex-col gap-6 animate-[var(--animate-slide-up)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CharacterCard
                nickname={nickname}
                onEdit={() => setEditOpen(true)}
              />
              <div className="flex flex-col gap-6">
                <WeeklyProgressCard progress={progress} />
                <LeaderboardList users={topUsers} />
              </div>
            </div>

            <ChallengeCard challenge={activeChallenge} />
          </div>
        )}
      </div>

      <ProfileEditPanel
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialNickname={nickname}
        onSave={handleProfileSave}
      />
    </AppLayout>
  )
}
