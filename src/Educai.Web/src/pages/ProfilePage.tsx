import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useToast } from '../context/ToastContext'
import {
  getUserPreference,
  createUserPreference,
  updateUserPreference,
} from '../services/userPreferenceService'
import { AppLayout } from '../components/molecules/AppLayout'
import { Button } from '../components/atoms/Button'
import { NicknameGenerator } from '../components/organisms/NicknameGenerator'
import { FocusAreaSelector } from '../components/organisms/FocusAreaSelector'
import { WeeklyTargetControl } from '../components/organisms/WeeklyTargetControl'
import { AIAssistantBox } from '../components/organisms/AIAssistantBox'

const DEFAULT_WEEKLY_TARGET = 150
const DEFAULT_DAILY_TARGET = 20

export function ProfilePage() {
  const { currentUser } = useUser()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const userId = currentUser ?? ''

  const [preferenceId, setPreferenceId] = useState<string | null>(null)
  const [selectedNickname, setSelectedNickname] = useState<string | null>(null)
  const [focusAreas, setFocusAreas] = useState<string[]>([])
  const [weeklyTarget, setWeeklyTarget] = useState<number>(DEFAULT_WEEKLY_TARGET)
  const [dailyTarget, setDailyTarget] = useState<number>(DEFAULT_DAILY_TARGET)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!userId) return
    let cancelled = false

    async function fetchPreference() {
      setLoading(true)
      try {
        const pref = await getUserPreference(userId)
        if (cancelled) return
        if (pref) {
          setPreferenceId(pref.id)
          setFocusAreas(pref.focusAreas ?? [])
          setWeeklyTarget(pref.weeklyQuestionTarget || DEFAULT_WEEKLY_TARGET)
          setDailyTarget(pref.dailyTarget || DEFAULT_DAILY_TARGET)
          if (pref.goalSubject) setSelectedNickname(pref.goalSubject)
        }
      } catch {
        if (!cancelled) showToast('Tercihler yüklenemedi.', 'error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchPreference()
    return () => {
      cancelled = true
    }
  }, [userId, showToast])

  const toggleFocusArea = (area: string) => {
    setFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    )
  }

  const handleSave = async () => {
    if (focusAreas.length === 0) {
      showToast('En az bir odak alanı seçmelisin.', 'error')
      return
    }

    setSaving(true)
    try {
      const goalSubject = selectedNickname ?? focusAreas[0] ?? ''
      if (preferenceId) {
        await updateUserPreference(preferenceId, {
          goalSubject,
          dailyTarget,
          weeklyQuestionTarget: weeklyTarget,
          focusAreas,
        })
      } else {
        const created = await createUserPreference({
          userId,
          goalSubject,
          dailyTarget,
          weeklyQuestionTarget: weeklyTarget,
          focusAreas,
        })
        setPreferenceId(created.id)
      }
      showToast('Tercihlerin başarıyla kaydedildi.', 'success')
    } catch {
      showToast('Tercihler kaydedilemedi.', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-8 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Profil & Tercihler
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 tracking-wide">
            Senin için kişiselleştirilmiş bir öğrenme deneyimi oluşturalım.
          </p>
        </header>

        {loading ? (
          <p className="text-[var(--text-muted)] text-sm text-center py-16">
            Yükleniyor...
          </p>
        ) : (
          <div className="flex flex-col gap-6 animate-[var(--animate-slide-up)]">
            <AIAssistantBox />

            <NicknameGenerator
              userId={userId}
              selected={selectedNickname}
              onSelect={setSelectedNickname}
            />

            <FocusAreaSelector
              selected={focusAreas}
              onToggle={toggleFocusArea}
            />

            <WeeklyTargetControl
              value={weeklyTarget}
              onChange={setWeeklyTarget}
            />

            <div className="flex items-center justify-between gap-3 pt-2">
              <Button
                variant="ghost"
                size="md"
                onClick={() => navigate('/dashboard')}
              >
                İptal
              </Button>
              <Button
                onClick={handleSave}
                loading={saving}
                size="lg"
                className="flex-1"
              >
                Tercihleri Kaydet
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
