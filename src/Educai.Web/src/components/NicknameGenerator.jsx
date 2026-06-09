import { useState } from 'react'
import { Icon } from './Icons'
import { Glass } from './Glass'
import { generateNickname } from '../services/nicknameService'

const NICK_POOLS = {
  prefixes: ['Atomik', 'Kuantum', 'Zaman', 'Nebula', 'Photon', 'Polaris', 'Helix', 'Vortex', 'Sigma', 'Pulsar', 'Orbital', 'Lambda'],
  suffixes: ['Zeka', 'Gezgini', 'Makinesi', 'Avcısı', 'Mimari', 'Kodu', 'Yolcusu', 'Çözücü', 'Kâşifi', 'Şifresi'],
}

function makeNick(seed) {
  const p = NICK_POOLS.prefixes[Math.floor(Math.random() * NICK_POOLS.prefixes.length)]
  const s = NICK_POOLS.suffixes[Math.floor(Math.random() * NICK_POOLS.suffixes.length)]
  return `@${seed ? seed[0].toUpperCase() + seed.slice(1) : p}_${s}`
}

function normalize(arr) {
  return arr
    .map((x) => String(x).trim())
    .filter(Boolean)
    .map((x) => (x.startsWith('@') ? x : `@${x}`))
}

export function NicknameGenerator({ userId, onPick }) {
  const [seed, setSeed] = useState('')
  const [busy, setBusy] = useState(false)
  const [items, setItems] = useState(['@Atomik_Zeka', '@Kuantum_Gezgini', '@Zaman_Makinesi'])

  const generate = async () => {
    setBusy(true)
    const keyword = seed.trim()

    try {
      if (userId) {
        const res = await generateNickname(userId, keyword ? [keyword] : [])
        const list = res?.suggestions || res?.nicknames || (Array.isArray(res) ? res : null)
        if (list && list.length) {
          setItems(normalize(list).slice(0, 3))
          setBusy(false)
          return
        }
      }
    } catch (e) {
      // continue to next fallback
    }

    try {
      if (window.claude && keyword) {
        const out = await window.claude.complete({
          messages: [{ role: 'user', content: `Bir öğrenme uygulaması için, "${keyword}" anahtar kelimesinden ilham alan 3 yaratıcı, kısa, oyunlaştırılmış Türkçe kullanıcı adı öner. Format: her satırda bir tane, "@" ile başlasın, alt çizgi kullan. Sadece adları döndür, başka metin yok.` }],
        })
        const names = String(out).split('\n').map((x) => x.trim()).filter((x) => x.startsWith('@')).slice(0, 3)
        if (names.length) {
          setItems(names)
          setBusy(false)
          return
        }
      }
    } catch (e) {
      // continue to local
    }

    await new Promise((r) => setTimeout(r, 400))
    setItems([makeNick(keyword), makeNick(keyword), makeNick(keyword)])
    setBusy(false)
  }

  return (
    <Glass className="nick">
      <div className="section-h">
        <Icon.sparkles style={{ color: '#FFE074' }} />
        <h3>AI Nickname Oluşturucu</h3>
        <span className="premium-tag" style={{ marginLeft: 8 }}>Premium</span>
        <span className="pill" style={{ marginLeft: 'auto' }}>Powered by Educai AI</span>
      </div>
      <div className="nick-row">
        <input
          className="nick-input"
          placeholder="Anahtar kelime gir (örn: Atom, Galaksi, Zaman)…"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generate()}
        />
        <button className="nick-btn" onClick={generate} disabled={busy}>
          {busy ? 'Üretiliyor…' : 'Nickname Öner'}
        </button>
      </div>
      <div className="nick-suggestions">
        {items.map((n, i) => (
          <div key={i} className="nick-chip" onClick={() => onPick && onPick(n)}>
            <span className="spark">✦</span>{n}
          </div>
        ))}
      </div>
    </Glass>
  )
}
