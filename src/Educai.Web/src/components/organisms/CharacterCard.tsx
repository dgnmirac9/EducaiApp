import { Badge } from '../atoms/Badge'

interface CharacterCardProps {
  nickname: string
  onEdit: () => void
}

export function CharacterCard({ nickname, onEdit }: CharacterCardProps) {
  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/40 via-fuchsia-500/30 to-amber-400/30 h-full">
      <div className="group relative h-full rounded-2xl bg-[var(--bg-surface)] backdrop-blur-xl p-8 flex flex-col items-center gap-6 overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none"
        />

        <h2 className="relative text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] self-start">
          Karakter
        </h2>

        <div className="relative flex items-center gap-5">
          <button
            className="w-10 h-10 rounded-full text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center"
            aria-label="Önceki"
          >
            ◀
          </button>

          <div className="relative w-[160px] h-[160px] rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-amber-400 p-[3px] shadow-2xl shadow-purple-500/40">
            <div className="w-full h-full rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-6xl">
              🧑‍🎓
            </div>
          </div>

          <button
            className="w-10 h-10 rounded-full text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center"
            aria-label="Sonraki"
          >
            ▶
          </button>
        </div>

        <div className="relative text-center flex flex-col items-center gap-2">
          <p className="text-xl font-bold text-white truncate max-w-[260px] tracking-tight">
            {nickname}
          </p>
          <Badge variant="neutral" className="!text-[10px]">
            Sınıf VIII
          </Badge>
        </div>

        {/* Hover overlay edit */}
        <button
          onClick={onEdit}
          className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl"
          aria-label="Profili düzenle"
        >
          <span className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 text-white text-sm font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)] tracking-wide">
            ✏️ Profili Düzenle
          </span>
        </button>
      </div>
    </div>
  )
}
