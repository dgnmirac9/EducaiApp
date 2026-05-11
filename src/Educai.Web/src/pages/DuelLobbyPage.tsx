import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useToast } from '../context/ToastContext'
import { findMatch, joinQueue } from '../services/matchmakingService'
import { AppLayout } from '../components/molecules/AppLayout'
import { Button } from '../components/atoms/Button'
import { Card } from '../components/atoms/Card'

export function DuelLobbyPage() {
  const navigate = useNavigate()
  const { currentUser } = useUser()
  const { showToast } = useToast()
  const [searching, setSearching] = useState(false)
  const [abortRequested, setAbortRequested] = useState(false)

  const handleFindMatch = async () => {
    if (!currentUser) return
    setSearching(true)
    setAbortRequested(false)
    try {
      await joinQueue(currentUser)
      const match = await findMatch(currentUser)
      if (abortRequested) return
      if (match) {
        navigate(`/duel/${match.id}`)
      } else {
        showToast('Eşleşme bulunamadı, tekrar dene.', 'error')
      }
    } catch {
      showToast('Maç aranırken hata oluştu.', 'error')
    } finally {
      setSearching(false)
    }
  }

  const handleCancel = () => {
    setAbortRequested(true)
    setSearching(false)
  }

  return (
    <AppLayout>
      <div className="min-h-screen flex flex-col items-center justify-center px-8 py-10">
        <Card className="w-full max-w-md !p-10 flex flex-col items-center gap-7 animate-[var(--animate-slide-up)]">
          {!searching ? (
            <>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-amber-400 p-[3px] shadow-2xl shadow-purple-500/40 animate-[var(--animate-pulse-glow)]">
                <div className="w-full h-full rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-4xl">
                  ⚔️
                </div>
              </div>

              <div className="text-center flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-300 to-amber-400 bg-clip-text text-transparent">
                  Düello Arenası
                </h1>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Seviyene uygun rakip bul ve anlık düelloya giriş yap.
                </p>
              </div>

              <Button
                size="lg"
                onClick={handleFindMatch}
                fullWidth
                className="!py-4 !text-base"
              >
                Maç Bul
              </Button>
            </>
          ) : (
            <>
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/30" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-400 animate-spin" />
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-purple-500/30 to-fuchsia-500/30 blur-md" />
                <span className="relative text-2xl">⚔️</span>
              </div>

              <div className="text-center flex flex-col gap-2">
                <p className="text-xl font-bold text-white tracking-tight animate-pulse">
                  Rakip Aranıyor...
                </p>
                <p className="text-xs text-[var(--text-muted)] tracking-wide">
                  ⚡ Seviyene uygun rakip bekleniyor
                </p>
              </div>

              <Button variant="ghost" onClick={handleCancel} fullWidth>
                İptal
              </Button>
            </>
          )}
        </Card>
      </div>
    </AppLayout>
  )
}
