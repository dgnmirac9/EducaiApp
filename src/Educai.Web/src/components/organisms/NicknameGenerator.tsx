import { useState } from 'react'
import { generateNickname } from '../../services/nicknameService'
import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'
import { Card } from '../atoms/Card'
import { Input } from '../atoms/Input'

interface NicknameGeneratorProps {
  userId: string
  selected: string | null
  onSelect: (nickname: string) => void
}

export function NicknameGenerator({ userId, selected, onSelect }: NicknameGeneratorProps) {
  const [keyword, setKeyword] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    const trimmed = keyword.trim()
    if (!trimmed) {
      setError('Lütfen bir anahtar kelime girin.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await generateNickname(userId, [trimmed], 3)
      setSuggestions(res.suggestions.slice(0, 3))
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status
      setError(
        status === 403
          ? 'Bu özellik yalnızca premium kullanıcılara açıktır.'
          : 'Nickname üretilirken bir hata oluştu.',
      )
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="!p-8 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-white">
            AI Nickname Oluşturucu
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Anahtar kelimeye göre benzersiz bir nickname üret.
          </p>
        </div>
        <Badge variant="premium">Premium</Badge>
      </div>

      <div className="flex gap-2">
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="örn: Atom, Sayı, Galaksi"
          className="!py-2.5"
        />
        <Button onClick={handleGenerate} loading={loading} size="md">
          Öner
        </Button>
      </div>

      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => {
            const isSelected = s === selected
            const label = s.startsWith('@') ? s : `@${s}`
            return (
              <button
                key={s}
                onClick={() => onSelect(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-amber-400/15 border-amber-400/60 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                    : 'bg-white/[0.03] border-white/10 text-[var(--text-secondary)] hover:bg-amber-400/10 hover:border-amber-400/30 hover:text-amber-300'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      )}
    </Card>
  )
}
