import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function daysLeft(endDate) {
  if (!endDate) return null
  const ms = new Date(endDate).getTime() - Date.now()
  if (Number.isNaN(ms)) return null
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

function difficultyLabel(w) {
  if (w == null) return 'Belirsiz'
  if (w <= 1.0) return 'Kolay'
  if (w <= 1.5) return 'Orta'
  return 'Zor'
}

export function ChallengeModal({ challenge, onClose }) {
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!challenge) return null

  const title = challenge.title || challenge.name || 'Görev'
  const desc = challenge.description || 'Bu göreve katılarak XP kazanma şansını yakala.'
  const days = daysLeft(challenge.endDate)
  const xp = challenge.xpReward ?? 1200
  const difficulty = difficultyLabel(challenge.difficultyWeight)

  const join = () => {
    onClose()
    navigate('/duel')
  }

  return (
    <div
      className="challenge-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="challenge-modal-card glass-strong"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="challenge-modal-head">
          <h3>{title}</h3>
          <button
            className="challenge-modal-close"
            onClick={onClose}
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>

        <div className="challenge-modal-emblem" aria-hidden>🏆</div>

        <p className="challenge-modal-desc">{desc}</p>

        <ul className="challenge-modal-info">
          {days != null && (
            <li><span className="ico" aria-hidden>⏱</span>Kalan süre: <b>{days} gün</b></li>
          )}
          <li><span className="ico" aria-hidden>💎</span>XP Ödülü: <b>+{xp} XP</b></li>
          <li><span className="ico" aria-hidden>🎯</span>Zorluk: <b>{difficulty}</b></li>
        </ul>

        <div className="challenge-modal-actions">
          <button className="challenge-modal-btn ghost" onClick={onClose}>
            Kapat
          </button>
          <button className="challenge-modal-btn primary" onClick={join}>
            Düelloya Gir ⚔️
          </button>
        </div>
      </div>
    </div>
  )
}
