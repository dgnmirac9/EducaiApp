import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Glass } from './Glass'
import { joinQueue, findMatch } from '../services/matchmakingService'

function extractMatchId(res) {
  if (!res) return null
  return res.matchId || res.id || res.match?.id || res.match?.matchId || null
}

export function DuelLobbyPage({ userId }) {
  const navigate = useNavigate()
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(null)
  const cancelRef = useRef(false)
  const pollTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      cancelRef.current = true
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current)
    }
  }, [])

  const startSearch = async () => {
    setError(null)
    setSearching(true)
    cancelRef.current = false

    try {
      await joinQueue(userId)
    } catch (e) {
      setError('Sıraya katılınamadı. Backend çalışıyor mu?')
      setSearching(false)
      return
    }

    const poll = async () => {
      if (cancelRef.current) return
      try {
        const res = await findMatch(userId)
        const matchId = extractMatchId(res)
        if (matchId) {
          navigate(`/duel/${matchId}`)
          return
        }
      } catch (e) {
        // tek seferlik hataya tölerans: tekrar dene
      }
      if (!cancelRef.current) {
        pollTimerRef.current = setTimeout(poll, 2000)
      }
    }
    poll()
  }

  const cancel = () => {
    cancelRef.current = true
    if (pollTimerRef.current) clearTimeout(pollTimerRef.current)
    setSearching(false)
  }

  return (
    <div className="duel-shell">
      <Glass strong className="duel-lobby">
        <div className="duel-emblem">⚔️</div>
        <h1 className="duel-title">Düello Arenası</h1>
        <p className="duel-subtitle">Seviyene uygun rakip bul ve XP kazan.</p>

        {!searching && (
          <>
            <button className="duel-primary-btn" onClick={startSearch}>Maç Bul</button>
            <button
              className="duel-cancel-btn"
              onClick={() => navigate('/')}
            >
              Geri Dön
            </button>
          </>
        )}

        {searching && (
          <div className="duel-search">
            <div className="duel-spinner" />
            <div className="duel-searching-text">RAKİP ARANIYOR…</div>
            <button className="duel-cancel-btn" onClick={cancel}>İptal</button>
          </div>
        )}

        {error && <div className="duel-error">{error}</div>}
      </Glass>
    </div>
  )
}
