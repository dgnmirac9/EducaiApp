import { SubjectIcon } from './Icons'

export const SUBJECTS = [
  { id: 'math',      name: 'Matematik', icon: SubjectIcon.math,       color: '#6CE7FF', level: 5, progress: 68, qtoday: 12 },
  { id: 'geo',       name: 'Geometri',  icon: SubjectIcon.geo,        color: '#C29BFF', level: 3, progress: 42, qtoday: 6 },
  { id: 'physics',   name: 'Fizik',     icon: SubjectIcon.physics,    color: '#FFC56B', level: 4, progress: 55, qtoday: 9 },
  { id: 'biology',   name: 'Biyoloji',  icon: SubjectIcon.biology,    color: '#74F0C2', level: 2, progress: 30, qtoday: 4 },
  { id: 'chemistry', name: 'Kimya',     icon: SubjectIcon.chemistry,  color: '#FF8AA3', level: 3, progress: 48, qtoday: 5 },
  { id: 'geography', name: 'Coğrafya',  icon: SubjectIcon.geography,  color: '#FFE074', level: 2, progress: 20, qtoday: 0 },
  { id: 'history',   name: 'Tarih',     icon: SubjectIcon.history,    color: '#C7F75A', level: 1, progress: 12, qtoday: 0 },
  { id: 'literature',name: 'Edebiyat',  icon: SubjectIcon.literature, color: '#FF7AC6', level: 1, progress: 8,  qtoday: 0 },
  { id: 'cs',        name: 'Bilişim',   icon: SubjectIcon.cs,         color: '#9BD7FF', level: 2, progress: 24, qtoday: 2 },
]

export function SubjectCard({ s, selected, onToggle }) {
  return (
    <div
      className={`sub-card ${selected ? 'selected' : ''}`}
      style={{ '--g': s.color, '--ringc': `${s.color}88` }}
      onClick={onToggle}
    >
      <div className="glow" />
      <div className="ico-wrap">{s.icon(s.color)}</div>
      <h4>{s.name}</h4>
      <div className="meta">
        <span>Bugün {s.qtoday} soru</span>
        <span>·</span>
        <span>{s.progress}% ünite</span>
      </div>
      <div className="sub-prog"><div style={{ width: `${s.progress}%` }} /></div>
      <div className="footer-row">
        <span className="level-tag">LVL {s.level}</span>
        <span className="small" style={{ color: s.color, fontWeight: 700 }}>{selected ? 'Seçili ✓' : 'Seç'}</span>
      </div>
    </div>
  )
}
