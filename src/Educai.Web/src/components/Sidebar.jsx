import { useNavigate } from 'react-router-dom'
import { Icon } from './Icons'

export function Sidebar({ active, setActive }) {
  const navigate = useNavigate()
  const items = [
    { id: 'home', label: 'Home', icon: Icon.home, path: '/' },
    { id: 'subjects', label: 'Subjects', icon: Icon.books, badge: '6' },
    { id: 'challenges', label: 'Challenges', icon: Icon.trophy, badge: '3', path: '/duel' },
    { id: 'quests', label: 'Quests', icon: Icon.rocket },
    { id: 'profile', label: 'Profile', icon: Icon.user },
  ]
  const tools = [
    { id: 'notif', label: 'Notifications', icon: Icon.bell },
    { id: 'settings', label: 'Settings', icon: Icon.settings },
  ]

  const handle = (it) => {
    setActive(it.id)
    if (it.path) navigate(it.path)
  }

  return (
    <aside className="sidebar glass">
      <div className="brand">
        <div className="brand-mark">E</div>
        <div>
          <div className="brand-name">Educ<span>ai</span></div>
          <div className="small">Learning Quest</div>
        </div>
      </div>
      <div className="nav-section">Main</div>
      {items.map((it) => (
        <div key={it.id} className={`nav-item ${active === it.id ? 'active' : ''}`} onClick={() => handle(it)}>
          <div className="ico"><it.icon /></div>
          <div>{it.label}</div>
          {it.badge && <div className="badge">{it.badge}</div>}
        </div>
      ))}
      <div className="nav-section">Account</div>
      {tools.map((it) => (
        <div key={it.id} className="nav-item" onClick={() => handle(it)}>
          <div className="ico"><it.icon /></div>
          <div>{it.label}</div>
        </div>
      ))}
      <div className="nav-foot">
        <div className="upgrade">
          <div className="row" style={{ marginBottom: 8 }}>
            <Icon.sparkles style={{ color: '#FFE074' }} />
            <span className="premium-tag">PREMIUM</span>
          </div>
          <h4>Unlock AI tutor</h4>
          <p>Unlimited nicknames, daily challenges, voice study mode.</p>
          <button className="upgrade-btn">Upgrade — 49₺ / ay</button>
        </div>
      </div>
    </aside>
  )
}
