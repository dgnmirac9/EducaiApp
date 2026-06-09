import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HubConnectionState } from '@microsoft/signalr'
import { Glass } from './Glass'
import { signalRService } from '../services/signalRService'
import { finishMatch } from '../services/matchmakingService'

const XP_PER_CORRECT = 10

function ts() {
  const d = new Date()
  return d.toTimeString().slice(0, 8)
}

export function DuelPage({ userId }) {
  const { matchId } = useParams()
  const navigate = useNavigate()

  const [status, setStatus] = useState('connecting') // connecting | connected | disconnected
  const [isConnected, setIsConnected] = useState(false)
  const [myXP, setMyXP] = useState(0)
  const [oppXP, setOppXP] = useState(0)
  const [busy, setBusy] = useState(false)
  const [log, setLog] = useState([])
  const offRef = useRef(null)

  const appendLog = (entry) => setLog((l) => [...l, { ts: ts(), ...entry }])

  useEffect(() => {
    let isMounted = true

    const conn = signalRService.connection
    const onReconnected = () => {
      if (!isMounted) return
      setIsConnected(true)
      setStatus('connected')
      appendLog({ kind: 'system', text: 'Yeniden bağlanıldı' })
    }
    const onClose = () => {
      if (!isMounted) return
      setIsConnected(false)
      setStatus('disconnected')
      appendLog({ kind: 'system', text: 'Bağlantı kapandı' })
    }
    conn.onreconnected(onReconnected)
    conn.onclose(onClose)

    ;(async () => {
      try {
        setStatus('connecting')
        appendLog({ kind: 'system', text: 'SignalR bağlanıyor…' })
        await signalRService.connect()
        if (!isMounted) return
        setIsConnected(true)
        setStatus('connected')
        await signalRService.joinMatch(matchId)
        if (!isMounted) return
        appendLog({ kind: 'system', text: `Maç gruba katılındı: ${matchId.slice(0, 8)}` })

        offRef.current = signalRService.onOpponentScore((opponentId, earnedXP) => {
          if (!isMounted) return
          if (String(opponentId) === String(userId)) return
          setOppXP((x) => x + Number(earnedXP || 0))
          appendLog({ kind: 'opp', text: `Rakip ${earnedXP} XP kazandı` })
        })
      } catch (e) {
        if (isMounted) {
          setIsConnected(false)
          setStatus('disconnected')
          appendLog({ kind: 'system', text: `Bağlantı hatası: ${e?.message || 'bilinmiyor'}` })
        }
      }
    })()

    return () => {
      isMounted = false
      if (offRef.current) {
        try { offRef.current() } catch { /* noop */ }
        offRef.current = null
      }
      ;(async () => {
        if (signalRService.state !== HubConnectionState.Connected) return
        try { await signalRService.leaveMatch(matchId) } catch { /* noop */ }
        if (signalRService.state !== HubConnectionState.Connected) return
        try { await signalRService.disconnect() } catch { /* noop */ }
      })()
    }
  }, [matchId, userId])

  const sendCorrect = async () => {
    if (!isConnected) return
    const next = myXP + XP_PER_CORRECT
    setMyXP(next)
    appendLog({ kind: 'me', text: `Doğru cevap! +${XP_PER_CORRECT} XP` })
    try {
      await signalRService.sendScore(matchId, userId, XP_PER_CORRECT)
    } catch (e) {
      appendLog({ kind: 'system', text: `Skor gönderilemedi: ${e?.message || ''}` })
    }
  }

  const finish = async () => {
    setBusy(true)
    appendLog({ kind: 'system', text: 'Maç bitiriliyor…' })
    try {
      await finishMatch(matchId)
    } catch (e) {
      appendLog({ kind: 'system', text: `Bitirme isteği başarısız: ${e?.message || ''}` })
    } finally {
      setBusy(false)
      navigate('/')
    }
  }

  const me = userId ? String(userId).slice(0, 8) : 'sen'
  const statusLabel = {
    connected: 'Bağlı',
    connecting: 'Bağlanıyor…',
    disconnected: 'Bağlantı kesildi',
  }[status]

  return (
    <div className="duel-arena">
      <div className="duel-status-row">
        <div className={`duel-status-badge ${status}`}>{statusLabel}</div>
        <span className="small">Maç: {matchId.slice(0, 8)}</span>
        <button className="duel-back-btn" onClick={() => navigate('/')}>← Lobiye dön</button>
      </div>

      <div className="duel-players">
        <Glass strong className="duel-player me">
          <div className="role">SEN</div>
          <div className="who">{me}</div>
          <div className="xp">{myXP} XP</div>
        </Glass>
        <div className="duel-vs">VS</div>
        <Glass strong className="duel-player opp">
          <div className="role">RAKİP</div>
          <div className="who">Rakip</div>
          <div className="xp">{oppXP} XP</div>
        </Glass>
      </div>

      <div className="duel-actions">
        <button
          className="duel-correct-btn"
          onClick={sendCorrect}
          disabled={!isConnected || busy}
        >
          {isConnected ? `✅ Doğru Cevap (+${XP_PER_CORRECT} XP)` : 'Bağlanılıyor…'}
        </button>
        <button
          className="duel-finish-btn"
          onClick={finish}
          disabled={busy}
        >
          🏁 Maçı Bitir
        </button>
      </div>

      <Glass className="duel-log">
        <h3>Canlı Log</h3>
        <div className="entries">
          {log.length === 0 && <div className="entry system"><span className="ts">--:--:--</span>henüz aktivite yok</div>}
          {log.map((l, i) => (
            <div key={i} className={`entry ${l.kind}`}>
              <span className="ts">{l.ts}</span>{l.text}
            </div>
          ))}
        </div>
      </Glass>
    </div>
  )
}
