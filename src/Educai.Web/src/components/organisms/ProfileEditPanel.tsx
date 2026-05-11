import { useEffect, useState } from 'react'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'

interface ProfileEditPanelProps {
  open: boolean
  onClose: () => void
  initialNickname: string
  onSave: (nickname: string) => Promise<void> | void
}

const AVATARS = ['🧑‍🎓', '🧙‍♂️', '🧑‍🚀', '🦸', '🥷', '🧝']

export function ProfileEditPanel({
  open,
  onClose,
  initialNickname,
  onSave,
}: ProfileEditPanelProps) {
  const [nickname, setNickname] = useState(initialNickname)
  const [avatarIndex, setAvatarIndex] = useState(0)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) setNickname(initialNickname)
  }, [open, initialNickname])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(nickname.trim() || initialNickname)
      onClose()
    } finally {
      setSaving(false)
    }
  }

  const prevAvatar = () =>
    setAvatarIndex((i) => (i - 1 + AVATARS.length) % AVATARS.length)
  const nextAvatar = () => setAvatarIndex((i) => (i + 1) % AVATARS.length)

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Profili Düzenle"
        className={`fixed top-0 right-0 z-50 h-screen w-96 bg-[var(--bg-surface)] border-l border-[var(--border)] backdrop-blur-xl flex flex-col shadow-2xl shadow-black/40 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
          <h2 className="text-base font-semibold text-white tracking-tight">
            Profili Düzenle
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center text-lg"
            aria-label="Kapat"
          >
            ✕
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
          <section className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
              Karakter
            </p>
            <div className="flex items-center justify-center gap-5">
              <button
                onClick={prevAvatar}
                className="w-10 h-10 rounded-full text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Önceki"
              >
                ◀
              </button>
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-amber-400 p-[3px] shadow-2xl shadow-purple-500/40">
                <div className="w-full h-full rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-5xl">
                  {AVATARS[avatarIndex]}
                </div>
              </div>
              <button
                onClick={nextAvatar}
                className="w-10 h-10 rounded-full text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Sonraki"
              >
                ▶
              </button>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <Input
              label="NICKNAME"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Yeni nickname'in"
              maxLength={32}
            />
            <p className="text-[11px] text-[var(--text-muted)]">
              Profilinde görünecek isim. En fazla 32 karakter.
            </p>
          </section>
        </div>

        {/* Footer */}
        <footer className="px-6 py-5 border-t border-[var(--border)] flex flex-col gap-2">
          <Button onClick={handleSave} loading={saving} fullWidth size="lg">
            Kaydet
          </Button>
          <Button variant="ghost" size="md" onClick={onClose} fullWidth>
            Vazgeç
          </Button>
        </footer>
      </aside>
    </>
  )
}
