import { Icon } from './Icons'
import { Glass } from './Glass'
import { PIXEL } from './PixelAvatars'

export function ProfileCard({ avatarKey, setAvatarKey, name, xp, xpMax, level, loading }) {
  const avatars = ['oppenheimer', 'novauser', 'spectra', 'questmaster', 'learner101']
  const idx = avatars.indexOf(avatarKey)
  const cycle = (d) => setAvatarKey(avatars[(idx + d + avatars.length) % avatars.length])
  const safeMax = xpMax > 0 ? xpMax : 1
  const pct = Math.round((xp / safeMax) * 100)
  return (
    <Glass className="profile-card" strong style={loading ? { opacity: 0.7 } : undefined}>
      <div className="xp-medal">
        <div className="medal-coin">{level}</div>
        <div className="medal-ribbon">{xp}/{xpMax} XP</div>
      </div>
      <div className="profile-body">
        <div className="avatar-stage">
          <div className="avatar-arrow l" onClick={() => cycle(-1)}><Icon.arrowL /></div>
          <img className="pixel-avatar" width="120" height="120" src={PIXEL[avatarKey]} alt="avatar" />
          <div className="avatar-arrow r" onClick={() => cycle(1)}><Icon.arrowR /></div>
        </div>
        <div className="profile-meta">
          <div className="name"><span className="name-text">{name}</span><span className="pencil"><Icon.pencil /></span></div>
          <div className="tag"><span style={{ width: 6, height: 6, borderRadius: 99, background: '#6CE7FF', boxShadow: '0 0 8px #6CE7FF', flexShrink: 0 }} /> Quantum Pathfinder · Rank #47</div>
          <div className="xp-bar-wrap">
            <div className="xp-label"><span>İlerleme</span><b>{pct}%</b></div>
            <div className="xp-bar"><div className="xp-fill" style={{ width: `${pct}%` }} /></div>
          </div>
          <div className="profile-actions">
            <button className="btn">DÜZENLE</button>
            <button className="btn">ROZETLER</button>
          </div>
        </div>
      </div>
    </Glass>
  )
}
