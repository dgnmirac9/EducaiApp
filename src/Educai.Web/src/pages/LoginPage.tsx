import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { Button } from '../components/atoms/Button'
import { Input } from '../components/atoms/Input'

const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

const FEATURES = [
  { icon: '⚡', title: 'Gerçek zamanlı düello', desc: 'Rakibinle anında eşleş, canlı skor takibi.' },
  { icon: '🏆', title: 'Haftalık liderlik', desc: 'Sıralamada yüksel, ödüller kazan.' },
  { icon: '🤖', title: 'AI kişisel asistan', desc: 'Sana özel önerilerle ilerle.' },
]

export function LoginPage() {
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')
  const { login } = useUser()
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = userId.trim()
    if (!trimmed) {
      setError('Lütfen bir User ID girin')
      return
    }
    if (!UUID_REGEX.test(trimmed)) {
      setError('Geçerli bir User ID giriniz')
      return
    }
    login(trimmed)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Hero side */}
      <section className="hidden lg:flex relative flex-[3] overflow-hidden">
        {/* Animated aurora blobs */}
        <div
          aria-hidden
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-60 bg-gradient-to-br from-purple-600 to-fuchsia-600 animate-[var(--animate-aurora)]"
        />
        <div
          aria-hidden
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-40 bg-gradient-to-br from-amber-500 to-pink-500"
          style={{ animation: 'aurora 22s ease-in-out infinite reverse' }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 max-w-2xl animate-[var(--animate-fade-in)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-[var(--text-secondary)] w-fit mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Yapay zekayla daha hızlı öğren
          </div>

          <h1 className="text-7xl xl:text-8xl font-black tracking-tight bg-gradient-to-br from-purple-300 via-purple-400 to-amber-400 bg-clip-text text-transparent leading-[0.95]">
            Educai
          </h1>
          <p className="mt-6 text-lg text-[var(--text-secondary)] max-w-md">
            Yapay zeka destekli rekabetçi öğrenme platformu.
          </p>

          <ul className="mt-12 flex flex-col gap-5">
            {FEATURES.map((f) => (
              <li
                key={f.title}
                className="flex items-start gap-4 animate-[var(--animate-slide-up)]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg shrink-0">
                  {f.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">
                    {f.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form side */}
      <section className="flex-1 lg:flex-[2] bg-[var(--bg-surface)] border-l border-[var(--border)] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm animate-[var(--animate-slide-up)]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Giriş Yap</h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Hesabına erişmek için User ID'ni gir.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              id="userId"
              label="USER ID"
              placeholder="00000000-0000-0000-0000-000000000000"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value)
                if (error) setError('')
              }}
              error={error}
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />

            <Button type="submit" fullWidth size="lg">
              Giriş Yap
            </Button>
          </form>

          <p className="text-[11px] text-[var(--text-muted)] text-center mt-8">
            Demo için veritabanındaki User ID'nizi kullanın. Gerçek kimlik
            doğrulaması yakında.
          </p>
        </div>
      </section>
    </div>
  )
}
