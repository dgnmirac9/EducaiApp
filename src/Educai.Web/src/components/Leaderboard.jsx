import { useEffect, useState } from 'react'
import { Glass } from './Glass'
import { PIXEL } from './PixelAvatars'
import { getTopLeaderboard } from '../services/leaderboardService'

const MOCK_ROWS = [
  { rank: 1,  name: 'user123',           sub: 'Atomik Lider',       lvl: 15, totalXP: 0, av: 'questmaster', cls: 'gold' },
  { rank: 2,  name: 'questmaster',       sub: 'Zaman Yolcusu',      lvl: 12, totalXP: 0, av: 'learner101',  cls: 'silver' },
  { rank: 3,  name: 'learner101',        sub: 'Quantum Çözücü',     lvl: 11, totalXP: 0, av: 'spectra',     cls: 'bronze' },
  { rank: 4,  name: 'spectra',           sub: 'Helix Mimarı',       lvl: 10, totalXP: 0, av: 'novauser' },
  { rank: 47, name: 'oppenheimer (sen)', sub: 'Quantum Pathfinder', lvl: 3,  totalXP: 0, av: 'oppenheimer', you: true },
]

const AVATAR_KEYS = ['oppenheimer', 'questmaster', 'learner101', 'spectra', 'novauser']
const RANK_CLASS = ['gold', 'silver', 'bronze']

export function Leaderboard({ userId }) {
  const [rows, setRows] = useState(MOCK_ROWS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await getTopLeaderboard(5)
        if (!mounted || !Array.isArray(data)) return
        const mapped = data.map((u, i) => ({
          rank: u.rank ?? i + 1,
          name: u.nickname || u.name || (u.id ? String(u.id).slice(0, 8) : `kullanıcı ${i + 1}`),
          sub: `Toplam ${u.totalXP ?? 0} XP`,
          lvl: u.level ?? 0,
          totalXP: u.totalXP ?? 0,
          av: AVATAR_KEYS[i % AVATAR_KEYS.length],
          cls: RANK_CLASS[i],
          you: userId && u.id && String(u.id) === String(userId),
        }))
        setRows(mapped)
      } catch (e) {
        // keep mock
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [userId])

  return (
    <Glass className="lb" style={loading ? { opacity: 0.7 } : undefined}>
      <div className="section-h">
        <h3>Sıralama</h3>
        <span className="pill" style={{ marginLeft: 'auto' }}>Bu hafta</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className={`lb-row ${r.you ? 'you' : ''}`}>
          <div className={`lb-rank ${r.cls || ''}`}>#{r.rank}</div>
          <div className="lb-av"><img src={PIXEL[r.av]} width="26" height="26" alt="" /></div>
          <div className="lb-name">{r.you ? `${r.name} (sen)` : r.name}<span className="sub">{r.sub}</span></div>
          <div className="lb-lvl">LVL {r.lvl}</div>
        </div>
      ))}
    </Glass>
  )
}
