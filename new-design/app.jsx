/* Educai — App shell */
function App(){
  const [active, setActive] = useState("home");
  const [name, setName] = useState("oppenheimer");
  const [avatarKey, setAvatarKey] = useState("oppenheimer");
  const [goal, setGoal] = useState(150);
  const [selected, setSelected] = useState(new Set(["math","physics","chemistry"]));

  const toggleSubject = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  return (
    <div className="shell" data-screen-label="01 Dashboard">
      <Sidebar active={active} setActive={setActive} />

      <main className="main">
        <Topbar/>

        <section className="hero">
          <ProfileCard
            avatarKey={avatarKey}
            setAvatarKey={setAvatarKey}
            name={name}
            xp={799} xpMax={800} level={3}
          />
          <WeeklyGoal goal={goal} setGoal={setGoal}/>
        </section>

        <section>
          <div className="section-title">
            <h2>Öğrenme Odak Alanları</h2>
            <span className="muted">· seçili {selected.size} ders</span>
            <div className="right">
              <span className="chip active">Tümü</span>
              <span className="chip">Sayısal</span>
              <span className="chip">Sözel</span>
              <span className="chip">Dil</span>
            </div>
          </div>
          <div className="subjects" style={{marginTop:12}}>
            {SUBJECTS.map(s => (
              <SubjectCard key={s.id} s={s} selected={selected.has(s.id)} onToggle={()=>toggleSubject(s.id)}/>
            ))}
          </div>
        </section>

        <section>
          <NicknameGenerator onPick={(n)=>setName(n.replace(/^@/,"").toLowerCase())}/>
        </section>
      </main>

      <aside className="rail">
        <div className="user-tile">
          <div className="av"><img src={PIXEL[avatarKey]} width="40" height="40" alt=""/></div>
          <div style={{flex:1}}>
            <div className="nm">{name}</div>
            <div className="sub">Quantum Pathfinder · LVL 3</div>
          </div>
          <button className="icon-btn" style={{width:32, height:32, borderRadius:10}}><Icon.settings/></button>
        </div>
        <ChallengesCard/>
        <Leaderboard/>
        <AIChat/>
      </aside>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
