import { useState } from 'react'
import { Glass } from './Glass'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function LoginScreen({ onLogin }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    if (e) e.preventDefault()
    const v = value.trim()
    if (!UUID_RE.test(v)) {
      setError('Geçersiz UUID. Format: 8-4-4-4-12 hexadecimal')
      return
    }
    localStorage.setItem('userId', v)
    onLogin(v)
  }

  return (
    <div style={{ position: 'relative', zIndex: 1, display: 'grid', placeItems: 'center', height: '100vh', padding: 24 }}>
      <Glass strong style={{ padding: 32, maxWidth: 440, width: '100%' }}>
        <div className="brand" style={{ padding: '0 0 18px' }}>
          <div className="brand-mark">E</div>
          <div>
            <div className="brand-name">Educ<span>ai</span></div>
            <div className="small">Learning Quest</div>
          </div>
        </div>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Giriş yap</h2>
        <p style={{ color: 'var(--ink-60)', margin: '6px 0 16px', fontSize: 13 }}>
          UserId'ni gir (UUID formatında)
        </p>
        <form onSubmit={submit}>
          <input
            className="nick-input"
            style={{ width: '100%' }}
            placeholder="00000000-0000-0000-0000-000000000000"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (error) setError('')
            }}
            autoFocus
          />
          {error && (
            <div style={{ color: '#FF8AA3', fontSize: 12, marginTop: 10 }}>{error}</div>
          )}
          <button
            type="submit"
            className="upgrade-btn"
            style={{ marginTop: 18 }}
          >
            Devam et
          </button>
        </form>
      </Glass>
    </div>
  )
}
