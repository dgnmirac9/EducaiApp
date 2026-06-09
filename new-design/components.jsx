/* Educai — shared components & icons */
const { useState, useEffect, useRef, useMemo } = React;

/* ---------- ICONS (line-art neon style) ---------- */
const Icon = {
  home: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg>
  ),
  books: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 5a2 2 0 0 1 2-2h5v18H6a2 2 0 0 1-2-2Z"/><path d="M13 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5Z"/><path d="M7 7h2M7 11h2M16 7h2M16 11h2"/></svg>
  ),
  trophy: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 4h8v4a4 4 0 0 1-8 0Z"/><path d="M4 5h4v3a2 2 0 0 1-4 0Z"/><path d="M16 5h4v3a2 2 0 0 1-4 0Z"/><path d="M9 14h6l-1 4h-4Z"/><path d="M8 21h8"/></svg>
  ),
  rocket: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 4c4 0 6 2 6 6l-7 7-6-1-1-6Z"/><circle cx="14.5" cy="9.5" r="1.6"/><path d="M7 14l-3 3 4 0"/><path d="M10 17l0 4 3-3"/></svg>
  ),
  user: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
  ),
  bell: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4Z"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>
  ),
  settings: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a1.7 1.7 0 0 1 0-3l1.1-.7-1.5-2.6-1.3.3a1.7 1.7 0 0 1-2-1.2L15.4 5h-3l-.3 1.3a1.7 1.7 0 0 1-2 1.2l-1.3-.3-1.5 2.6 1 .7a1.7 1.7 0 0 1 0 3l-1 .7 1.5 2.6 1.3-.3a1.7 1.7 0 0 1 2 1.2L12 19h3l.3-1.3a1.7 1.7 0 0 1 2-1.2l1.3.3 1.5-2.6Z"/></svg>
  ),
  search: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>),
  flame: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="#FF8AA3" stroke="#FFE074" strokeWidth="1.2" {...p}><path d="M12 3c1.5 3 4 4 4 8a4 4 0 1 1-8 0c0-1.5.5-2.5 1.5-3.5C9.5 9 9 6 12 3Z"/></svg>),
  pencil: (p) => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 20h4l11-11-4-4L4 16Z"/><path d="m14 6 4 4"/></svg>),
  arrowL: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 6l-6 6 6 6"/></svg>),
  arrowR: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 6l6 6-6 6"/></svg>),
  send: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M3 11.5 21 3l-8 18-2.5-7.5Z" opacity=".95"/></svg>),
  sparkles: (p) => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2l1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6Z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8Z"/></svg>),
  target: (p)=>(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/></svg>),
  star: (p) => (<svg viewBox="0 0 24 24" width="20" height="20" fill="#FFE074" stroke="#7A3D00" strokeWidth="1.2" {...p}><path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.9Z"/></svg>),
};

/* ---------- SUBJECT ICONS (line-art glow) ---------- */
const SubjectIcon = {
  math: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="24" height="24" rx="6"/>
      <path d="M9 11h6M12 8v6"/>
      <path d="M19 9l4 4M19 13l4-4"/>
      <path d="M8 20h7M9 24h5"/>
      <circle cx="22" cy="20" r="1.6" fill={color}/>
      <circle cx="22" cy="24" r="1.6" fill={color}/>
    </svg>
  ),
  geo: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4l12 22H4Z"/>
      <circle cx="16" cy="14" r="2" fill={color}/>
      <path d="M10 24h12"/>
    </svg>
  ),
  physics: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="2.4" fill={color}/>
      <ellipse cx="16" cy="16" rx="12" ry="5"/>
      <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(120 16 16)"/>
    </svg>
  ),
  biology: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 26C12 22 12 14 6 10"/>
      <path d="M26 6C20 10 20 18 26 22"/>
      <path d="M10 22c2-2 6-2 8 0"/>
      <path d="M14 10c2-2 6-2 8 0"/>
      <circle cx="9" cy="14" r="1.6" fill={color}/>
      <circle cx="23" cy="18" r="1.6" fill={color}/>
    </svg>
  ),
  geography: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="11"/>
      <path d="M5 16h22"/>
      <path d="M16 5c4 4 4 18 0 22"/>
      <path d="M16 5c-4 4-4 18 0 22"/>
    </svg>
  ),
  chemistry: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 4v8L7 24a3 3 0 0 0 2.6 4.4h12.8A3 3 0 0 0 25 24l-6-12V4"/>
      <path d="M11 4h10"/>
      <circle cx="13" cy="22" r="1.4" fill={color}/>
      <circle cx="18" cy="19" r="1.2" fill={color}/>
    </svg>
  ),
  history: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="11"/>
      <path d="M16 9v7l5 3"/>
      <path d="M5 16c0-6 5-11 11-11" strokeDasharray="2 2"/>
    </svg>
  ),
  literature: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6h14a4 4 0 0 1 4 4v16H10a4 4 0 0 1-4-4Z"/>
      <path d="M10 11h8M10 15h8M10 19h6"/>
    </svg>
  ),
  cs: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="24" height="16" rx="3"/>
      <path d="M11 11l-3 3 3 3M21 11l3 3-3 3M18 11l-4 6"/>
      <path d="M11 26h10"/>
    </svg>
  ),
};

/* ---------- PIXEL AVATARS (data-uri to keep file count low) ---------- */
const PIXEL = {
  // pixel art generated as inline SVG with rects (16x16 cells)
  oppenheimer: pixelSvg([
    "................",
    "................",
    "....KKKKKK......",
    "...KSSSSSSK.....",
    "...KSFFFFSK.....",
    "...KFFFFFFK.....",
    "...FFFKFKFF.....",
    "...FFFFKFFF.....",
    "....WWWWWW......",
    "....WWRWWW......",
    "....WWRWWW......",
    "....WWRWWW......",
    "....BBBBBB......",
    "....BB..BB......",
    "....BB..BB......",
    "....SS..SS......",
  ], { K:"#0e0e0e", S:"#f3c89f", F:"#e6b48b", W:"#f6f1ea", R:"#c4302b", B:"#1a1a26" }),
  questmaster: pixelSvg([
    "................",
    "................",
    "....8888........",
    "...8AAAA88......",
    "..8AAAAAA8......",
    "..8AAAAAA8......",
    "..8SSSSSS8......",
    "...SSFKFKSS.....",
    "....SSSSSS......",
    "....GGGGGG......",
    "....GGYGGG......",
    "....GGYGGG......",
    "....BBBBBB......",
    "....BB..BB......",
    "....BB..BB......",
    "....KK..KK......",
  ], { "8":"#5a3a1a", A:"#7d4a1f", S:"#f0c79b", F:"#1a1a26", K:"#0e0e0e", G:"#3a7d4f", Y:"#f1c84b", B:"#2c2138" }),
  learner101: pixelSvg([
    "................",
    "................",
    "....FFFF........",
    "...FFPPFF.......",
    "...FFPPPFF......",
    "...FKKFFKK......",
    "...FSSFFSS......",
    "....SSSSSS......",
    "....SSMMSS......",
    "....PPPPPP......",
    "....PWWWWP......",
    "....PPPPPP......",
    "....BBBBBB......",
    "....BB..BB......",
    "....BB..BB......",
    "....KK..KK......",
  ], { F:"#3d2030", P:"#e58fbb", K:"#0e0e0e", S:"#f3c89f", M:"#c46a8a", W:"#fff4f9", B:"#5a2a45" }),
  novauser: pixelSvg([
    "................",
    "................",
    "....EEEE........",
    "...EEEEEE.......",
    "..EESSSSEE......",
    "..ESKSSKSS......",
    "..ESSSSSSS......",
    "...SSMMMSS......",
    "....SSSSSS......",
    "....NNNNNN......",
    "....NCCCCN......",
    "....NNNNNN......",
    "....BBBBBB......",
    "....BB..BB......",
    "....BB..BB......",
    "....KK..KK......",
  ], { E:"#3e2e7a", S:"#f3c89f", K:"#0e0e0e", M:"#c4302b", N:"#222040", C:"#6ce7ff", B:"#1a1a26" }),
  spectra: pixelSvg([
    "................",
    "....HHHH........",
    "...HHCCCH.......",
    "..HCCCCCCH......",
    "..HCSSSSCH......",
    "..HSSFFSSC......",
    "..HSSSSSSC......",
    "...SSMMMSS......",
    "....SSSSSS......",
    "....TTTTTT......",
    "....TTYTTT......",
    "....TTYTTT......",
    "....BBBBBB......",
    "....BB..BB......",
    "....BB..BB......",
    "....KK..KK......",
  ], { H:"#553a1a", C:"#a4783a", S:"#f3c89f", F:"#0e0e0e", M:"#c46a8a", T:"#0e7d8c", Y:"#ffe074", B:"#1f223a", K:"#0e0e0e" }),
};

function pixelSvg(rows, palette){
  const cell = 8, w = rows[0].length, h = rows.length;
  let rects = "";
  for (let y=0;y<h;y++){
    for (let x=0;x<w;x++){
      const c = rows[y][x];
      if (c === "." || !palette[c]) continue;
      rects += `<rect x="${x*cell}" y="${y*cell}" width="${cell}" height="${cell}" fill="${palette[c]}"/>`;
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w*cell} ${h*cell}" shape-rendering="crispEdges">${rects}</svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/* ---------- GLASS / SHELL ---------- */
function Glass({ className="", strong=false, children, style }){
  return <div className={`${strong?"glass-strong":"glass"} ${className}`} style={style}>{children}</div>;
}

/* ---------- SIDEBAR ---------- */
function Sidebar({ active, setActive }){
  const items = [
    { id:"home", label:"Home", icon: Icon.home },
    { id:"subjects", label:"Subjects", icon: Icon.books, badge:"6" },
    { id:"challenges", label:"Challenges", icon: Icon.trophy, badge:"3" },
    { id:"quests", label:"Quests", icon: Icon.rocket },
    { id:"profile", label:"Profile", icon: Icon.user },
  ];
  const tools = [
    { id:"notif", label:"Notifications", icon: Icon.bell },
    { id:"settings", label:"Settings", icon: Icon.settings },
  ];
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
      {items.map(it => (
        <div key={it.id} className={`nav-item ${active===it.id?"active":""}`} onClick={()=>setActive(it.id)}>
          <div className="ico"><it.icon /></div>
          <div>{it.label}</div>
          {it.badge && <div className="badge">{it.badge}</div>}
        </div>
      ))}
      <div className="nav-section">Account</div>
      {tools.map(it => (
        <div key={it.id} className="nav-item" onClick={()=>setActive(it.id)}>
          <div className="ico"><it.icon /></div>
          <div>{it.label}</div>
        </div>
      ))}
      <div className="nav-foot">
        <div className="upgrade">
          <div className="row" style={{marginBottom:8}}>
            <Icon.sparkles style={{color:"#FFE074"}} />
            <span className="premium-tag">PREMIUM</span>
          </div>
          <h4>Unlock AI tutor</h4>
          <p>Unlimited nicknames, daily challenges, voice study mode.</p>
          <button className="upgrade-btn">Upgrade — 49₺ / ay</button>
        </div>
      </div>
    </aside>
  );
}

/* ---------- TOPBAR ---------- */
function Topbar(){
  return (
    <div className="topbar">
      <div className="greeting">
        <h1>Selam, <span style={{color:"#FFE074"}}>oppenheimer</span> 👋</h1>
        <p>Bugün 3 görev seni bekliyor. Haftalık hedefe 22 soru kaldı.</p>
      </div>
      <div className="search">
        <Icon.search style={{color:"#B5A4DC"}} />
        <input placeholder="Konu, soru ya da arkadaş ara…" />
        <span className="kbd">⌘K</span>
      </div>
      <div className="streak">
        <div className="flame"><Icon.flame /></div>
        <div>
          <div style={{fontFamily:"'Press Start 2P', monospace", fontSize:11}}>12 gün</div>
          <div className="small">streak</div>
        </div>
      </div>
      <div className="icon-btn"><Icon.bell /><span className="dot"/></div>
      <div className="icon-btn"><Icon.settings /></div>
    </div>
  );
}

/* ---------- PROFILE CARD ---------- */
function ProfileCard({ avatarKey, setAvatarKey, name, xp, xpMax, level }){
  const avatars = ["oppenheimer","novauser","spectra","questmaster","learner101"];
  const idx = avatars.indexOf(avatarKey);
  const cycle = (d) => setAvatarKey(avatars[(idx + d + avatars.length) % avatars.length]);
  const pct = Math.round((xp/xpMax)*100);
  return (
    <Glass className="profile-card" strong>
      <div className="xp-medal">
        <div className="medal-coin">{level}</div>
        <div className="medal-ribbon">{xp}/{xpMax} XP</div>
        <div className="medal-stars">
          <Icon.star/>
          <Icon.star/>
          <Icon.star/>
        </div>
      </div>
      <div className="profile-body">
        <div className="avatar-stage">
          <div className="avatar-arrow l" onClick={()=>cycle(-1)}><Icon.arrowL/></div>
          <img className="pixel-avatar" width="120" height="120" src={PIXEL[avatarKey]} alt="avatar"/>
          <div className="avatar-arrow r" onClick={()=>cycle(1)}><Icon.arrowR/></div>
        </div>
        <div className="profile-meta">
          <div className="name"><span className="name-text">{name}</span><span className="pencil"><Icon.pencil/></span></div>
          <div className="tag"><span style={{width:6,height:6,borderRadius:99,background:"#6CE7FF",boxShadow:"0 0 8px #6CE7FF",flexShrink:0}}/> Quantum Pathfinder · Rank #47</div>
          <div className="xp-bar-wrap">
            <div className="xp-label"><span>İlerleme</span><b>{pct}%</b></div>
            <div className="xp-bar"><div className="xp-fill" style={{width:`${pct}%`}}/></div>
          </div>
          <div className="profile-actions">
            <button className="btn">DÜZENLE</button>
            <button className="btn">ROZETLER</button>
          </div>
        </div>
      </div>
    </Glass>
  );
}

/* ---------- WEEKLY GOAL ---------- */
function WeeklyGoal({ goal, setGoal }){
  const days = [
    { d:"PZT", v:28, done:true },
    { d:"SAL", v:22, done:true },
    { d:"ÇAR", v:35, done:true },
    { d:"PER", v:18, done:true },
    { d:"CUM", v:25, today:true },
    { d:"CMT", v:0 },
    { d:"PAZ", v:0 },
  ];
  const total = days.reduce((s,d)=>s+d.v,0);
  return (
    <Glass className="weekly">
      <div className="section-h">
        <h3>Haftalık Soru Hedefi</h3>
        <span className="pill">{total}/{goal} tamamlandı</span>
      </div>
      <div className="goal-row">
        <div>
          <div className="goal-num">{goal}</div>
          <div className="goal-sub"><Icon.target/> Hedefini gün başına böl: ~{Math.round(goal/7)} soru/gün</div>
        </div>
        <div className="stepper">
          <button className="step-btn" onClick={()=>setGoal(Math.max(10, goal-10))}>−</button>
          <input className="goal-input" value={goal} onChange={(e)=>{const v=parseInt(e.target.value)||0; setGoal(Math.max(0, Math.min(999,v)))}}/>
          <button className="step-btn" onClick={()=>setGoal(Math.min(999, goal+10))}>+</button>
        </div>
      </div>
      <div className="week-days">
        {days.map((d,i)=>(
          <div key={i} className={`day ${d.done?"done":""} ${d.today?"today":""}`}>
            <div className="d">{d.d}</div>
            <div className="v">{d.v}</div>
          </div>
        ))}
      </div>
    </Glass>
  );
}

/* ---------- SUBJECT CARD ---------- */
const SUBJECTS = [
  { id:"math",     name:"Matematik", icon: SubjectIcon.math,     color:"#6CE7FF", level:5, progress:68, qtoday:12 },
  { id:"geo",      name:"Geometri",  icon: SubjectIcon.geo,      color:"#C29BFF", level:3, progress:42, qtoday:6 },
  { id:"physics",  name:"Fizik",     icon: SubjectIcon.physics,  color:"#FFC56B", level:4, progress:55, qtoday:9 },
  { id:"biology",  name:"Biyoloji",  icon: SubjectIcon.biology,  color:"#74F0C2", level:2, progress:30, qtoday:4 },
  { id:"chemistry",name:"Kimya",     icon: SubjectIcon.chemistry,color:"#FF8AA3", level:3, progress:48, qtoday:5 },
  { id:"geography",name:"Coğrafya",  icon: SubjectIcon.geography,color:"#FFE074", level:2, progress:20, qtoday:0 },
  { id:"history",  name:"Tarih",     icon: SubjectIcon.history,  color:"#C7F75A", level:1, progress:12, qtoday:0 },
  { id:"literature",name:"Edebiyat", icon: SubjectIcon.literature,color:"#FF7AC6", level:1, progress:8,  qtoday:0 },
  { id:"cs",       name:"Bilişim",   icon: SubjectIcon.cs,       color:"#9BD7FF", level:2, progress:24, qtoday:2 },
];

function SubjectCard({ s, selected, onToggle }){
  return (
    <div className={`sub-card ${selected?"selected":""}`} style={{ "--g":s.color, "--ringc":`${s.color}88` }} onClick={onToggle}>
      <div className="glow"/>
      <div className="ico-wrap">{s.icon(s.color)}</div>
      <h4>{s.name}</h4>
      <div className="meta">
        <span>Bugün {s.qtoday} soru</span>
        <span>·</span>
        <span>{s.progress}% ünite</span>
      </div>
      <div className="sub-prog"><div style={{width:`${s.progress}%`}}/></div>
      <div className="footer-row">
        <span className="level-tag">LVL {s.level}</span>
        <span className="small" style={{color:s.color, fontWeight:700}}>{selected?"Seçili ✓":"Seç"}</span>
      </div>
    </div>
  );
}

/* ---------- NICKNAME GENERATOR ---------- */
const NICK_POOLS = {
  prefixes:["Atomik","Kuantum","Zaman","Nebula","Photon","Polaris","Helix","Vortex","Sigma","Pulsar","Orbital","Lambda"],
  suffixes:["Zeka","Gezgini","Makinesi","Avcısı","Mimari","Kodu","Yolcusu","Çözücü","Kâşifi","Şifresi"]
};
function makeNick(seed){
  const p = NICK_POOLS.prefixes[Math.floor(Math.random()*NICK_POOLS.prefixes.length)];
  const s = NICK_POOLS.suffixes[Math.floor(Math.random()*NICK_POOLS.suffixes.length)];
  return `@${seed?seed[0].toUpperCase()+seed.slice(1):p}_${s}`;
}
function NicknameGenerator({ onPick }){
  const [seed, setSeed] = useState("");
  const [busy, setBusy] = useState(false);
  const [items, setItems] = useState(["@Atomik_Zeka","@Kuantum_Gezgini","@Zaman_Makinesi"]);
  const generate = async () => {
    setBusy(true);
    // Try Claude if available; fall back to local generator.
    try {
      if (window.claude && seed.trim()){
        const out = await window.claude.complete({
          messages:[{role:"user", content:`Bir öğrenme uygulaması için, "${seed}" anahtar kelimesinden ilham alan 3 yaratıcı, kısa, oyunlaştırılmış Türkçe kullanıcı adı öner. Format: her satırda bir tane, "@" ile başlasın, alt çizgi kullan. Sadece adları döndür, başka metin yok.`}]
        });
        const names = out.split("\n").map(x=>x.trim()).filter(x=>x.startsWith("@")).slice(0,3);
        if (names.length) { setItems(names); setBusy(false); return; }
      }
    } catch(e) {}
    // Local fallback
    await new Promise(r=>setTimeout(r, 650));
    const base = seed.trim() || "";
    setItems([makeNick(base), makeNick(base), makeNick(base)]);
    setBusy(false);
  };
  return (
    <Glass className="nick">
      <div className="section-h">
        <Icon.sparkles style={{color:"#FFE074"}}/>
        <h3>AI Nickname Oluşturucu</h3>
        <span className="premium-tag" style={{marginLeft:8}}>Premium</span>
        <span className="pill" style={{marginLeft:"auto"}}>Powered by Educai AI</span>
      </div>
      <div className="nick-row">
        <input className="nick-input" placeholder="Anahtar kelime gir (örn: Atom, Galaksi, Zaman)…" value={seed} onChange={e=>setSeed(e.target.value)} onKeyDown={e=>e.key==='Enter'&&generate()}/>
        <button className="nick-btn" onClick={generate} disabled={busy}>
          {busy ? "Üretiliyor…" : "Nickname Öner"}
        </button>
      </div>
      <div className="nick-suggestions">
        {items.map((n,i)=>(
          <div key={i} className="nick-chip" onClick={()=>onPick&&onPick(n)}>
            <span className="spark">✦</span>{n}
          </div>
        ))}
      </div>
    </Glass>
  );
}

/* ---------- LEADERBOARD ---------- */
function Leaderboard(){
  const rows = [
    { rank:1, name:"user123",     sub:"Atomik Lider",    lvl:15, av:"questmaster", cls:"gold" },
    { rank:2, name:"questmaster", sub:"Zaman Yolcusu",   lvl:12, av:"learner101", cls:"silver" },
    { rank:3, name:"learner101",  sub:"Quantum Çözücü",  lvl:11, av:"spectra",    cls:"bronze" },
    { rank:4, name:"spectra",     sub:"Helix Mimarı",    lvl:10, av:"novauser" },
    { rank:47, name:"oppenheimer (sen)", sub:"Quantum Pathfinder", lvl:3, av:"oppenheimer", you:true },
  ];
  return (
    <Glass className="lb">
      <div className="section-h">
        <h3>Sıralama</h3>
        <span className="pill" style={{marginLeft:"auto"}}>Bu hafta</span>
      </div>
      {rows.map((r,i)=>(
        <div key={i} className={`lb-row ${r.you?"you":""}`}>
          <div className={`lb-rank ${r.cls||""}`}>#{r.rank}</div>
          <div className="lb-av"><img src={PIXEL[r.av]} width="26" height="26" alt=""/></div>
          <div className="lb-name">{r.name}<span className="sub">{r.sub}</span></div>
          <div className="lb-lvl">LVL {r.lvl}</div>
        </div>
      ))}
    </Glass>
  );
}

/* ---------- CHALLENGES ---------- */
function ChallengesCard(){
  const items = [
    { icon: trophyMedal("podium"), name:"Aylık Challenge", sub:"Kalan süre: 10 gün", cta:"Katıl" },
    { icon: trophyMedal("rank"),   name:"Sıralama Yarışı", sub:"3 gün · 200 XP",     cta:"Başla" },
    { icon: trophyMedal("solver"), name:"Soru Çöz Sprint", sub:"60 dk · 50 soru",    cta:"Çöz" },
  ];
  return (
    <Glass className="challenges">
      <div className="section-h">
        <h3>Görevler</h3>
        <span className="pill" style={{marginLeft:"auto"}}>+1200 XP</span>
      </div>
      {items.map((it,i)=>(
        <div key={i} className="ch-tile">
          <div className="ch-ico">{it.icon}</div>
          <div>
            <div className="ch-name">{it.name}</div>
            <div className="ch-sub">{it.sub}</div>
          </div>
          <button className="ch-cta">{it.cta}</button>
        </div>
      ))}
    </Glass>
  );
}
function trophyMedal(kind){
  if (kind==="podium") return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#3a1a00" strokeWidth="1.6">
      <rect x="12" y="10" width="8" height="16" fill="#FFE074"/>
      <rect x="4"  y="16" width="8" height="10" fill="#FF8AA3"/>
      <rect x="20" y="14" width="8" height="12" fill="#6CE7FF"/>
      <path d="M16 4l1.5 3 3.5.5-2.5 2.5.7 3.5L16 11.8 12.8 13.5l.7-3.5L11 7.5 14.5 7Z" fill="#FFE074"/>
    </svg>
  );
  if (kind==="rank") return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#3a1a00" strokeWidth="1.6">
      <rect x="4" y="18" width="6" height="8" fill="#6CE7FF"/>
      <rect x="13" y="12" width="6" height="14" fill="#FFE074"/>
      <rect x="22" y="20" width="6" height="6" fill="#FF8AA3"/>
    </svg>
  );
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#3a1a00" strokeWidth="1.6">
      <circle cx="16" cy="14" r="9" fill="#FF8AA3"/>
      <path d="M11 14h10M16 9v10" stroke="#3a1a00" strokeWidth="2"/>
    </svg>
  );
}

/* ---------- AI CHAT ---------- */
function AIChat(){
  const [messages, setMessages] = useState([
    { role:"ai", text:"Merhaba! Öğrenme hedeflerini analiz ediyorum. Sana en uygun soruları hazırlamak için bu tercihlerin çok önemli. Hazır mısın?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef();
  useEffect(()=>{ if(bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [messages, typing]);
  const send = async (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text) return;
    setMessages(m => [...m, { role:"me", text }]);
    setInput(""); setTyping(true);
    let reply = "";
    try{
      if (window.claude){
        reply = await window.claude.complete({
          messages: [
            { role:"user", content:`Sen Educai isimli oyunlaştırılmış eğitim uygulamasının AI asistanısın. Kullanıcı bir lise/üniversite öğrencisi. Kısa (1-3 cümle), enerjik ve Türkçe yanıt ver. Soru: ${text}` }
          ]
        });
      }
    }catch(e){}
    if (!reply) reply = "Süper! Sana bu konuda 5 soruluk hızlı bir tur hazırlayayım mı? Doğru cevap başına +20 XP kazanırsın. 🚀";
    setTyping(false);
    setMessages(m => [...m, { role:"ai", text: reply }]);
  };
  return (
    <Glass className="chat" strong>
      <div className="chat-head">
        <div className="chat-bot">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c2a36" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="7" width="16" height="12" rx="3" fill="#DFFCFF"/>
            <circle cx="9" cy="13" r="1.4" fill="#0c2a36"/>
            <circle cx="15" cy="13" r="1.4" fill="#0c2a36"/>
            <path d="M12 4v3"/>
            <circle cx="12" cy="3.5" r="1" fill="#0c2a36"/>
          </svg>
        </div>
        <div>
          <div className="nm">Educai Asistan</div>
          <div className="st">çevrimiçi · seninle çalışıyor</div>
        </div>
        <div style={{marginLeft:"auto"}} className="premium-tag">AI</div>
      </div>
      <div className="chat-body" ref={bodyRef}>
        {messages.map((m,i)=>(<div key={i} className={`msg ${m.role}`}>{m.text}</div>))}
        {typing && (<div className="msg ai typing"><span/><span/><span/></div>)}
      </div>
      <div style={{display:"flex", gap:6, padding:"0 12px 8px", flexWrap:"wrap"}}>
        {["Bana fizik özet ver","Bugünkü hedefimi planla","Zayıf konularımı analiz et"].map((q,i)=>(
          <button key={i} className="chip" onClick={()=>send(q)}>{q}</button>
        ))}
      </div>
      <div className="chat-input-row">
        <input className="chat-input" placeholder="Educai'ye bir şey sor…" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}/>
        <button className="chat-send" onClick={()=>send()}><Icon.send/></button>
      </div>
    </Glass>
  );
}

Object.assign(window, {
  Icon, SubjectIcon, PIXEL, Glass,
  Sidebar, Topbar, ProfileCard, WeeklyGoal,
  SUBJECTS, SubjectCard, NicknameGenerator,
  Leaderboard, ChallengesCard, AIChat,
});
