import { useEffect, useState } from 'react'
import { Glass } from './Glass'
import { getChallenges } from '../services/challengeService'
import { ChallengeModal } from './ChallengeModal'

const MOCK_ITEMS = [
  {
    kind: 'podium',
    name: 'Aylık Challenge',
    sub: 'Kalan süre: 10 gün',
    cta: 'Katıl',
    description: 'Ay boyunca en çok soru çözen 10 kişi özel rozet kazanır.',
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    xpReward: 1200,
    difficultyWeight: 1.0,
  },
  {
    kind: 'rank',
    name: 'Sıralama Yarışı',
    sub: '3 gün · 200 XP',
    cta: 'Başla',
    description: 'Sıralamada 10 basamak yükselen herkes ödüllü.',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    xpReward: 200,
    difficultyWeight: 1.5,
  },
  {
    kind: 'solver',
    name: 'Soru Çöz Sprint',
    sub: '60 dk · 50 soru',
    cta: 'Çöz',
    description: '60 dakika içinde 50 soru çöz, sprint rozetini kap.',
    endDate: null,
    xpReward: 500,
    difficultyWeight: 2.0,
  },
]

const KINDS = ['podium', 'rank', 'solver']

function daysLeft(endDate) {
  if (!endDate) return null
  const ms = new Date(endDate).getTime() - Date.now()
  if (Number.isNaN(ms)) return null
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

function trophyMedal(kind) {
  if (kind === 'podium') return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#3a1a00" strokeWidth="1.6">
      <rect x="12" y="10" width="8" height="16" fill="#FFE074" />
      <rect x="4" y="16" width="8" height="10" fill="#FF8AA3" />
      <rect x="20" y="14" width="8" height="12" fill="#6CE7FF" />
      <path d="M16 4l1.5 3 3.5.5-2.5 2.5.7 3.5L16 11.8 12.8 13.5l.7-3.5L11 7.5 14.5 7Z" fill="#FFE074" />
    </svg>
  )
  if (kind === 'rank') return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#3a1a00" strokeWidth="1.6">
      <rect x="4" y="18" width="6" height="8" fill="#6CE7FF" />
      <rect x="13" y="12" width="6" height="14" fill="#FFE074" />
      <rect x="22" y="20" width="6" height="6" fill="#FF8AA3" />
    </svg>
  )
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#3a1a00" strokeWidth="1.6">
      <circle cx="16" cy="14" r="9" fill="#FF8AA3" />
      <path d="M11 14h10M16 9v10" stroke="#3a1a00" strokeWidth="2" />
    </svg>
  )
}

export function ChallengesCard() {
  const [items, setItems] = useState(MOCK_ITEMS)
  const [loading, setLoading] = useState(true)
  const [selectedChallenge, setSelectedChallenge] = useState(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await getChallenges()
        if (!mounted || !Array.isArray(data)) return
        const active = data.filter((c) => c.isActive !== false)
        if (!active.length) return
        const mapped = active.slice(0, 3).map((c, i) => {
          const left = daysLeft(c.endDate)
          const sub = left != null
            ? `Kalan süre: ${left} gün`
            : (c.description || (c.xpReward ? `+${c.xpReward} XP` : '—'))
          return {
            kind: KINDS[i % KINDS.length],
            name: c.title || c.name || `Challenge ${i + 1}`,
            sub,
            cta: 'Katıl',
            description: c.description,
            endDate: c.endDate,
            xpReward: c.xpReward,
            difficultyWeight: c.difficultyWeight,
          }
        })
        setItems(mapped)
      } catch (e) {
        // keep mock
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <>
      <Glass className="challenges" style={loading ? { opacity: 0.7 } : undefined}>
        <div className="section-h">
          <h3>Düellolar</h3>
          <span className="pill" style={{ marginLeft: 'auto' }}>+1200 XP</span>
        </div>
        {items.map((it, i) => (
          <div key={i} className="ch-tile">
            <div className="ch-ico">{trophyMedal(it.kind)}</div>
            <div>
              <div className="ch-name">{it.name}</div>
              <div className="ch-sub">{it.sub}</div>
            </div>
            <button
              className="ch-cta"
              onClick={() => setSelectedChallenge(it)}
            >
              {it.cta}
            </button>
          </div>
        ))}
      </Glass>

      {selectedChallenge && (
        <ChallengeModal
          challenge={selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
        />
      )}
    </>
  )
}
