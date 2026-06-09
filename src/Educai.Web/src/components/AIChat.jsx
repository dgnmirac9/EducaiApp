import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icons'
import { Glass } from './Glass'

export function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Merhaba! Öğrenme hedeflerini analiz ediyorum. Sana en uygun soruları hazırlamak için bu tercihlerin çok önemli. Hazır mısın?' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, typing])
  const send = async (textOverride) => {
    const text = (textOverride ?? input).trim()
    if (!text) return
    setMessages((m) => [...m, { role: 'me', text }])
    setInput('')
    setTyping(true)
    let reply = ''
    try {
      if (window.claude) {
        reply = await window.claude.complete({
          messages: [
            { role: 'user', content: `Sen Educai isimli oyunlaştırılmış eğitim uygulamasının AI asistanısın. Kullanıcı bir lise/üniversite öğrencisi. Kısa (1-3 cümle), enerjik ve Türkçe yanıt ver. Soru: ${text}` },
          ],
        })
      }
    } catch (e) { /* fallback */ }
    if (!reply) reply = 'Süper! Sana bu konuda 5 soruluk hızlı bir tur hazırlayayım mı? Doğru cevap başına +20 XP kazanırsın. 🚀'
    setTyping(false)
    setMessages((m) => [...m, { role: 'ai', text: reply }])
  }
  return (
    <Glass className="chat" strong>
      <div className="chat-head">
        <div className="chat-bot">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c2a36" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="7" width="16" height="12" rx="3" fill="#DFFCFF" />
            <circle cx="9" cy="13" r="1.4" fill="#0c2a36" />
            <circle cx="15" cy="13" r="1.4" fill="#0c2a36" />
            <path d="M12 4v3" />
            <circle cx="12" cy="3.5" r="1" fill="#0c2a36" />
          </svg>
        </div>
        <div>
          <div className="nm">Educai Asistan</div>
          <div className="st">çevrimiçi · seninle çalışıyor</div>
        </div>
        <div style={{ marginLeft: 'auto' }} className="premium-tag">AI</div>
      </div>
      <div className="chat-body" ref={bodyRef}>
        {messages.map((m, i) => (<div key={i} className={`msg ${m.role}`}>{m.text}</div>))}
        {typing && (<div className="msg ai typing"><span /><span /><span /></div>)}
      </div>
      <div style={{ display: 'flex', gap: 6, padding: '0 12px 8px', flexWrap: 'wrap' }}>
        {['Bana fizik özet ver', 'Bugünkü hedefimi planla', 'Zayıf konularımı analiz et'].map((q, i) => (
          <button key={i} className="chip" onClick={() => send(q)}>{q}</button>
        ))}
      </div>
      <div className="chat-input-row">
        <input
          className="chat-input"
          placeholder="Educai'ye bir şey sor…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button className="chat-send" onClick={() => send()}><Icon.send /></button>
      </div>
    </Glass>
  )
}
