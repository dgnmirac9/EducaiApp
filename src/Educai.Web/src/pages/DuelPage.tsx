import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useToast } from '../context/ToastContext'
import { useSignalR } from '../hooks/useSignalR'
import { finishMatch } from '../services/matchmakingService'
import { AppLayout } from '../components/molecules/AppLayout'
import { Badge } from '../components/atoms/Badge'
import { Button } from '../components/atoms/Button'
import { Card } from '../components/atoms/Card'

interface LogEntry {
  id: number
  text: string
  time: string
}

function nowTime(): string {
  return new Date().toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function DuelPage() {
  const { matchId } = useParams<{ matchId: string }>()
  const navigate = useNavigate()
  const { currentUser } = useUser()
  const { showToast } = useToast()

  const [myScore, setMyScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [opponentId, setOpponentId] = useState<string>('Rakip')
  const [log, setLog] = useState<LogEntry[]>([])
  const [finishing, setFinishing] = useState(false)
  const logIdRef = useRef(0)

  const addLog = useCallback((text: string) => {
    logIdRef.current += 1
    setLog((prev) =>
      [{ id: logIdRef.current, text, time: nowTime() }, ...prev].slice(0, 30),
    )
  }, [])

  const handleOpponentScore = useCallback(
    (userId: string, earnedXP: number) => {
      setOpponentId(userId)
      setOpponentScore((s) => s + earnedXP)
      addLog(`Rakip +${earnedXP} XP kazandı`)
    },
    [addLog],
  )

  const { isConnected, joinMatch, leaveMatch, sendScore } = useSignalR({
    onOpponentScore: handleOpponentScore,
  })

  useEffect(() => {
    if (!matchId || !isConnected) return
    joinMatch(matchId).catch(() => addLog('Odaya katılım başarısız'))
    return () => {
      leaveMatch(matchId).catch(() => {})
    }
  }, [matchId, isConnected, joinMatch, leaveMatch, addLog])

  const handleCorrectAnswer = async () => {
    if (!matchId || !currentUser) return
    const XP = 10
    setMyScore((s) => s + XP)
    addLog(`Sen +${XP} XP kazandın`)
    try {
      await sendScore(matchId, currentUser, XP)
    } catch {
      addLog('Skor gönderilemedi')
    }
  }

  const handleFinishMatch = async () => {
    if (!matchId) return
    setFinishing(true)
    try {
      if (matchId) await leaveMatch(matchId)
      await finishMatch(matchId)
      showToast('Maç bitirildi.', 'success')
      navigate('/dashboard')
    } catch {
      showToast('Maç bitirilemedi, tekrar deneyin.', 'error')
      setFinishing(false)
    }
  }

  if (!matchId) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center px-8">
          <p className="text-red-400">Geçersiz maç ID</p>
        </div>
      </AppLayout>
    )
  }

  const winning =
    myScore > opponentScore ? 'me' : opponentScore > myScore ? 'opp' : null

  return (
    <AppLayout>
      <div className="min-h-screen max-w-2xl mx-auto px-8 py-10 flex flex-col justify-center gap-6 animate-[var(--animate-slide-up)]">
          {/* Header */}
          <header className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                ⚔️ Düello
              </h1>
              <p className="text-[11px] text-[var(--text-muted)] mt-1 break-all">
                Maç ID: {matchId}
              </p>
            </div>
            <Badge variant={isConnected ? 'success' : 'danger'}>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isConnected ? 'bg-emerald-400' : 'bg-red-400'
                }`}
              />
              {isConnected ? 'Bağlı' : 'Bağlanıyor...'}
            </Badge>
          </header>

          {/* Player cards with VS divider */}
          <div className="relative grid grid-cols-2 gap-4 items-stretch">
            <Card
              className={`!p-6 text-center transition-all duration-300 ${
                winning === 'me'
                  ? 'border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.3)]'
                  : ''
              }`}
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-3xl shadow-lg shadow-purple-500/40">
                🧑‍🎓
              </div>
              <p className="text-sm font-semibold text-white mt-3 truncate tracking-tight">
                {currentUser ?? 'Sen'}
              </p>
              <p className="text-5xl font-extrabold text-amber-300 tabular-nums mt-3 drop-shadow-[0_0_20px_rgba(245,158,11,0.45)]">
                {myScore}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-1">
                XP
              </p>
            </Card>

            <Card
              className={`!p-6 text-center transition-all duration-300 ${
                winning === 'opp'
                  ? 'border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.3)]'
                  : ''
              }`}
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-3xl shadow-lg shadow-pink-500/40">
                🤺
              </div>
              <p className="text-sm font-semibold text-white mt-3 truncate tracking-tight">
                {opponentId}
              </p>
              <p className="text-5xl font-extrabold text-amber-300 tabular-nums mt-3 drop-shadow-[0_0_20px_rgba(245,158,11,0.45)]">
                {opponentScore}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-1">
                XP
              </p>
            </Card>

            {/* VS separator */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative w-14 h-14 rounded-full bg-[var(--bg-base)] border border-[var(--border-hover)] flex items-center justify-center shadow-xl shadow-black/40">
                <span className="absolute -top-2 text-amber-300 text-lg animate-pulse">⚡</span>
                <span className="text-xs font-extrabold tracking-widest bg-gradient-to-r from-purple-300 to-amber-300 bg-clip-text text-transparent">
                  VS
                </span>
              </div>
            </div>
          </div>

          {/* Correct answer */}
          <button
            onClick={handleCorrectAnswer}
            disabled={!isConnected}
            className="w-full py-5 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-lg font-bold tracking-wide transition-all duration-200 shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:shadow-[0_0_50px_rgba(16,185,129,0.7)] hover:scale-[1.02] active:scale-[0.98]"
          >
            ✅ Doğru Cevap (+10 XP)
          </button>

          <Button
            variant="danger"
            fullWidth
            loading={finishing}
            onClick={handleFinishMatch}
          >
            🏁 Maçı Bitir
          </Button>

          {/* Live log */}
          <Card padded={false} className="overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Canlı Log
              </h3>
              <span className="text-[10px] text-[var(--text-muted)]">
                {log.length} olay
              </span>
            </div>
            <div className="bg-black/40 max-h-48 overflow-y-auto font-mono">
              {log.length === 0 ? (
                <p className="text-xs text-[var(--text-muted)] text-center py-6">
                  Henüz etkinlik yok
                </p>
              ) : (
                <ul className="flex flex-col">
                  {log.map((entry) => (
                    <li
                      key={entry.id}
                      className="flex items-center justify-between gap-3 px-4 py-1.5 text-[11px] hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="text-[var(--text-muted)] tabular-nums shrink-0">
                        {entry.time}
                      </span>
                      <span className="text-emerald-300/90 flex-1 truncate text-right">
                        › {entry.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>
      </div>
    </AppLayout>
  )
}
