import { useCallback, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Icon } from './components/Icons'
import { PIXEL } from './components/PixelAvatars'
import { Sidebar } from './components/Sidebar'
import { HamburgerMenu } from './components/HamburgerMenu'
import { BottomNav } from './components/BottomNav'
import { Topbar } from './components/Topbar'
import { ProfileCard } from './components/ProfileCard'
import { WeeklyGoal } from './components/WeeklyGoal'
import { SUBJECTS, SubjectCard } from './components/SubjectCard'
import { NicknameGenerator } from './components/NicknameGenerator'
import { Leaderboard } from './components/Leaderboard'
import { ChallengesCard } from './components/ChallengesCard'
import { AIChat } from './components/AIChat'
import { LoginScreen } from './components/LoginScreen'
import { DuelLobbyPage } from './components/DuelLobbyPage'
import { DuelPage } from './components/DuelPage'
import { getUser } from './services/userService'
import { getWeeklyProgress } from './services/progressService'
import { getPreferences, updatePreferences } from './services/preferenceService'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const DEFAULT_GOAL = 150
const DEFAULT_FOCUS = ['math', 'physics', 'chemistry']

export default function App() {
  const [userId, setUserId] = useState(() => {
    const stored = localStorage.getItem('userId')
    return stored && UUID_RE.test(stored) ? stored : null
  })

  if (!userId) {
    return <LoginScreen onLogin={(id) => setUserId(id)} />
  }

  const onLogout = () => {
    localStorage.removeItem('userId')
    setUserId(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard userId={userId} onLogout={onLogout} />} />
        <Route path="/duel" element={<DuelLobbyPage userId={userId} />} />
        <Route path="/duel/:matchId" element={<DuelPage userId={userId} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function Dashboard({ userId, onLogout }) {
  const [active, setActive] = useState('home')
  const [avatarKey, setAvatarKey] = useState('oppenheimer')

  const [user, setUser] = useState(null)
  const [userLoading, setUserLoading] = useState(true)

  const [weekly, setWeekly] = useState(null)
  const [weeklyLoading, setWeeklyLoading] = useState(true)

  const [goal, setGoal] = useState(DEFAULT_GOAL)
  const [selected, setSelected] = useState(new Set(DEFAULT_FOCUS))
  const [prefsReady, setPrefsReady] = useState(false)
  const prefRef = useRef(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await getUser(userId)
        if (mounted) setUser(data)
      } catch (e) { /* keep null */ }
      finally { if (mounted) setUserLoading(false) }
    })()
    return () => { mounted = false }
  }, [userId])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await getWeeklyProgress(userId)
        if (mounted) setWeekly(data)
      } catch (e) { /* keep null */ }
      finally { if (mounted) setWeeklyLoading(false) }
    })()
    return () => { mounted = false }
  }, [userId])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await getPreferences(userId)
        if (!mounted || !data) return
        prefRef.current = data
        if (Array.isArray(data.focusAreas)) setSelected(new Set(data.focusAreas))
        if (typeof data.weeklyQuestionTarget === 'number') setGoal(data.weeklyQuestionTarget)
      } catch (e) { /* keep defaults */ }
      finally { if (mounted) setPrefsReady(true) }
    })()
    return () => { mounted = false }
  }, [userId])

  const saveTimer = useRef(null)
  const persist = useCallback((nextSelected, nextGoal) => {
    console.log('persist çağrıldı, prefRef:', prefRef.current)
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      const pref = prefRef.current
      if (!pref?.id) return
      const payload = {
        goalSubject: pref.goalSubject ?? '',
        dailyTarget: pref.dailyTarget ?? 0,
        weeklyQuestionTarget: nextGoal,
        focusAreas: Array.from(nextSelected),
      }
      try {
        const updated = await updatePreferences(pref.id, payload)
        prefRef.current = { ...pref, ...payload, ...(updated || {}) }
        console.log('Tercihler kaydedildi')
      } catch (e) {
        console.error('Tercihler kaydedilemedi:', e?.message || e)
      }
    }, 400)
  }, [])

  const toggleSubject = (id) => {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
    if (prefsReady) persist(next, goal)
  }

  const handleSetGoal = (next) => {
    setGoal(next)
    if (prefsReady) persist(selected, next)
  }

  const handleSetNameFromNickname = (n) => {
    setUser((prev) => ({ ...(prev || {}), nickname: n.replace(/^@/, '').toLowerCase() }))
  }

  const displayName = user?.nickname || (userLoading ? '' : userId.slice(0, 8))
  const xp = weekly?.xp ?? weekly?.currentXP ?? user?.totalXP ?? 799
  const xpMax = weekly?.xpToNextLevel ?? weekly?.xpMax ?? 800
  const level = user?.level ?? weekly?.level ?? 3
  const solved = weekly?.solved ?? weekly?.questionsSolved

  return (
    <div className="shell" data-screen-label="01 Dashboard">
      <HamburgerMenu active={active} setActive={setActive} />
      <Sidebar active={active} setActive={setActive} />

      <main className="main">
        <Topbar name={displayName} loading={userLoading} />

        <section className="hero">
          <ProfileCard
            avatarKey={avatarKey}
            setAvatarKey={setAvatarKey}
            name={displayName || '…'}
            xp={xp}
            xpMax={xpMax}
            level={level}
            loading={weeklyLoading}
          />
          <WeeklyGoal goal={goal} setGoal={handleSetGoal} solved={solved} loading={weeklyLoading} />
        </section>

        <section>
          <div className="section-title">
            <h2>Öğrenme Odak Alanları</h2>
            <span className="muted">· seçili {selected.size} ders</span>
            <div className="right">
              <span className="chip active">Tümü</span>
              <span className="chip">Sayısal</span>
              <span className="chip">Sözel</span>
              <span className="chip">Dil</span>
            </div>
          </div>
          <div className="subjects" style={{ marginTop: 12, opacity: prefsReady ? 1 : 0.7 }}>
            {SUBJECTS.map((s) => (
              <SubjectCard key={s.id} s={s} selected={selected.has(s.id)} onToggle={() => toggleSubject(s.id)} />
            ))}
          </div>
        </section>

        <section>
          <NicknameGenerator userId={userId} onPick={handleSetNameFromNickname} />
        </section>
      </main>

      <aside className="rail">
        <div className="user-tile">
          <div className="av"><img src={PIXEL[avatarKey]} width="40" height="40" alt="" /></div>
          <div style={{ flex: 1 }}>
            <div className="nm">{displayName || '…'}</div>
            <div className="sub">Quantum Pathfinder · LVL {level}</div>
          </div>
          <button
            className="icon-btn"
            style={{ width: 32, height: 32, borderRadius: 10 }}
            onClick={onLogout}
            title="Çıkış"
          >
            <Icon.settings />
          </button>
        </div>
        <ChallengesCard />
        <Leaderboard userId={userId} />
        <AIChat />
      </aside>

      <BottomNav active={active} setActive={setActive} />
    </div>
  )
}
