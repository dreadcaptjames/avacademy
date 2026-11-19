/* Signal Path — app shell: routing, progress, quizzes, practice */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const app = $('#app');
  const mods = AV.modules;
  const modById = (id) => mods.find((m) => m.id === id);
  const crashUI = AV.crashUI(app);

  /* ---------- Progress storage (per-browser) ---------- */
  const KEY = 'signalpath-progress-v1';
  let P = { lessons: {}, quizzes: {}, exam: null, scenarios: {}, cards: {}, chains: {} };
  try { Object.assign(P, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { /* storage unavailable */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) { /* ignore */ } };
  AV.onChainSolved = (i) => { P.chains[i] = true; save(); };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const modProg = (m) => { const done = m.lessons.filter((_, i) => P.lessons[m.id + ':' + i]).length; return { done, total: m.lessons.length, pct: Math.round((done / m.lessons.length) * 100) }; };
  const totals = () => {
    const lessons = mods.reduce((s, m) => s + m.lessons.length, 0);
    const done = Object.keys(P.lessons).filter((k) => P.lessons[k]).length;
    const questions = mods.reduce((s, m) => s + m.quiz.length, 0);
    return { lessons, done, questions, pct: Math.round((done / lessons) * 100) };
  };
  const nextLesson = () => {
    for (const m of mods) for (let i = 0; i < m.lessons.length; i++) if (!P.lessons[m.id + ':' + i]) return `#/m/${m.id}/${i}`;
    return '#/exam';
  };
  const widgetIds = (m) => [...new Set(m.lessons.flatMap((l) => [...l.html.matchAll(/data-widget="([\w-]+)"/g)].map((x) => x[1])))];
  const widgetHome = (id) => { for (const m of mods) for (let i = 0; i < m.lessons.length; i++) if (m.lessons[i].html.includes(`data-widget="${id}"`)) return { m, i }; return null; };

  function mountWidgets(root) {
    root.querySelectorAll('[data-widget]').forEach((el) => {
      const w = AV.widgets[el.dataset.widget]; if (!w) return;
      el.className = 'widget';
      el.innerHTML = `<div class="whead"><span class="wtag">Interactive</span><h4>${w.title}</h4><p class="small muted">${w.desc}</p></div><div class="wbody"></div>`;
      w.render(el.querySelector('.wbody'));
    });
  }

  /* ---------- Views ---------- */
  function modCard(m, i) {
    const p = modProg(m), q = P.quizzes[m.id];
    return `<a class="card mod" href="#/m/${m.id}">
      <div class="mod-top"><span class="num">${String(i + 1).padStart(2, '0')}</span><span class="pill">${m.level}</span><span class="icon">${m.icon}</span></div>
      <h3>${m.title}</h3><p>${m.summary}</p>
      <div class="meta"><span>${p.done}/${p.total} lessons</span>${q != null ? `<span>Quiz best ${q}%</span>` : '<span>Quiz not taken</span>'}</div>
      <div class="progressbar"><i style="width:${p.pct}%"></i></div></a>`;
  }

  function home() { crashUI.home(); }

  function practiceCards() {
    const sc = Object.keys(P.scenarios).length;
    return `
      <a class="card" href="#/scenarios"><div class="icon big">🛠️</div><h3>Troubleshooting scenarios</h3><p>Diagnose real-world faults step by step.</p><div class="meta"><span>${sc}/${AV.scenarios.length} completed</span></div></a>
      <a class="card" href="#/flashcards"><div class="icon big">🃏</div><h3>Flashcards</h3><p>${AV.glossary.length} terms. Flip, self-grade, repeat.</p><div class="meta"><span>${Object.keys(P.cards).length} known</span></div></a>
      <a class="card" href="#/exam"><div class="icon big">🎓</div><h3>Final exam</h3><p>25 random questions from every module.</p><div class="meta"><span>${P.exam != null ? 'Best ' + P.exam + '%' : 'Not taken'}</span></div></a>
      <a class="card" href="#/tools/chain"><div class="icon big">🔗</div><h3>Signal chain builder</h3><p>Put real systems in signal-flow order.</p><div class="meta"><span>${Object.keys(P.chains).length}/${AV.chains.length} solved</span></div></a>`;
  }

  function learn() {
    app.innerHTML = `<h1>Full AV Academy</h1><p class="lead">Want the complete picture? Explore all 11 modules and dig deeper into topics from the crash course.</p><div class="row"><a class="btn primary" href="#/crash">← Back to the crash course</a><a class="btn" href="#/glossary">AV glossary</a></div><div class="grid">${mods.map(modCard).join('')}</div>`;
  }

  function moduleView(id) {
    const m = modById(id); if (!m) return notFound();
    const p = modProg(m), q = P.quizzes[m.id], ws = widgetIds(m), idx = mods.indexOf(m);
    app.innerHTML = `
    <nav class="crumbs"><a href="#/learn">Learning path</a> / Module ${idx + 1}</nav>
    <header class="mhead"><span class="icon big">${m.icon}</span><div><h1>${m.title}</h1><p class="lead">${m.summary}</p></div></header>
    <div class="progressbar"><i style="width:${p.pct}%"></i></div>
    <h2 class="section">Lessons</h2>
    <ol class="lessons">${m.lessons.map((l, i) => `<li><a href="#/m/${m.id}/${i}" class="${P.lessons[m.id + ':' + i] ? 'done' : ''}"><span class="chk">${P.lessons[m.id + ':' + i] ? '✓' : i + 1}</span>${l.title}</a></li>`).join('')}</ol>
    ${ws.length ? `<h2 class="section">Tools in this module</h2><div class="chips">${ws.map((w) => `<a class="chip" href="#/tools/${w}">${AV.widgets[w].title}</a>`).join('')}</div>` : ''}
    <h2 class="section">Check your knowledge</h2>
    <a class="card quizcard" href="#/m/${m.id}/quiz"><h3>Module quiz · ${m.quiz.length} questions</h3><p>${q != null ? `Best score: ${q}%. Try again to improve.` : 'Take it after the lessons, or now to test yourself.'}</p></a>
    <div class="pager">${idx > 0 ? `<a href="#/m/${mods[idx - 1].id}">← ${mods[idx - 1].title}</a>` : '<span></span>'}${idx < mods.length - 1 ? `<a href="#/m/${mods[idx + 1].id}">${mods[idx + 1].title} →</a>` : ''}</div>`;
  }

  function lessonView(id, n) {
    const m = modById(id); if (!m || !m.lessons[n]) return notFound();
    const l = m.lessons[n], key = m.id + ':' + n, last = n === m.lessons.length - 1;
    const next = last ? `#/m/${m.id}/quiz` : `#/m/${m.id}/${n + 1}`;
    app.innerHTML = `
    <nav class="crumbs"><a href="#/m/${m.id}">${m.icon} ${m.title}</a> / Lesson ${n + 1} of ${m.lessons.length}</nav>
    <article class="lesson"><h1>${l.title}</h1>${l.html}</article>
    <div class="lessonfoot">
      <button class="btn ${P.lessons[key] ? '' : 'primary'}" data-done>${P.lessons[key] ? '✓ Completed' : 'Mark complete'}</button>
      <a class="btn primary" href="${next}" data-next>${last ? 'Take the module quiz →' : 'Next lesson →'}</a>
    </div>
    <div class="pager">${n > 0 ? `<a href="#/m/${m.id}/${n - 1}">← ${m.lessons[n - 1].title}</a>` : '<span></span>'}<a href="#/m/${m.id}">All lessons</a></div>`;
    mountWidgets(app);
    $('[data-done]').onclick = (e) => { P.lessons[key] = !P.lessons[key]; if (!P.lessons[key]) delete P.lessons[key]; save(); e.target.textContent = P.lessons[key] ? '✓ Completed' : 'Mark complete'; e.target.classList.toggle('primary', !P.lessons[key]); };
    $('[data-next]').onclick = () => { P.lessons[key] = true; save(); };
  }

  /* ---------- Quiz engine ---------- */
  function runQuiz(root, questions, onDone) {
    const qs = questions.map((q) => { const order = shuffle(q.o.map((_, i) => i)); return { ...q, order }; });
    let i = 0, score = 0; const missed = [];
    const draw = () => {
      if (i >= qs.length) {
        const pct = Math.round((score / qs.length) * 100);
        onDone(pct);
        root.innerHTML = `<div class="result"><div class="score ${pct >= 80 ? 'good' : pct >= 60 ? 'warn' : 'bad'}">${pct}%</div><p>${score} of ${qs.length} correct. ${pct >= 80 ? 'Excellent work!' : pct >= 60 ? 'Good. Review the misses below.' : 'Review the lessons and try again.'}</p></div>
          ${missed.length ? `<h3>Review</h3>${missed.map((q) => `<div class="review"><p><b>${esc(q.q)}</b></p><p>✓ ${esc(q.o[q.a])}</p><p class="muted small">${esc(q.e)}</p></div>`).join('')}` : ''}
          <div class="row"><button class="btn primary" data-retry>Retry</button></div>`;
        root.querySelector('[data-retry]').onclick = () => runQuiz(root, questions, onDone);
        return;
      }
      const q = qs[i];
      root.innerHTML = `<div class="qmeta"><span>Question ${i + 1} / ${qs.length}</span><span>Score ${score}</span></div><div class="progressbar thin"><i style="width:${(i / qs.length) * 100}%"></i></div>
        <h3 class="qtext">${esc(q.q)}</h3><div class="opts">${q.order.map((oi) => `<button class="opt" data-o="${oi}">${esc(q.o[oi])}</button>`).join('')}</div><div class="explain" hidden></div>`;
      root.querySelectorAll('.opt').forEach((b) => b.onclick = () => {
        const pick = +b.dataset.o, ok = pick === q.a;
        if (ok) score++; else missed.push(q);
        root.querySelectorAll('.opt').forEach((x) => { x.disabled = true; if (+x.dataset.o === q.a) x.classList.add('correct'); });
        if (!ok) b.classList.add('wrong');
        const ex = root.querySelector('.explain'); ex.hidden = false;
        ex.innerHTML = `<p><b>${ok ? 'Correct.' : 'Not quite.'}</b> ${esc(q.e)}</p><button class="btn primary" data-n>${i === qs.length - 1 ? 'See results' : 'Next question →'}</button>`;
        ex.querySelector('[data-n]').onclick = () => { i++; draw(); window.scrollTo(0, 0); };
      });
    };
    draw();
  }

  function quizView(id) {
    const m = modById(id); if (!m) return notFound();
    app.innerHTML = `<nav class="crumbs"><a href="#/m/${m.id}">${m.icon} ${m.title}</a> / Quiz</nav><h1>${m.title}: quiz</h1><div class="quiz" data-q></div>`;
    runQuiz($('[data-q]'), m.quiz, (pct) => { P.quizzes[m.id] = Math.max(P.quizzes[m.id] || 0, pct); save(); });
  }

  function exam() {
    const all = mods.flatMap((m) => m.quiz.map((q) => ({ ...q, q: q.q })));
    app.innerHTML = `<nav class="crumbs"><a href="#/practice">Practice</a> / Final exam</nav><h1>Final exam</h1><p class="lead">25 random questions across every module. Aim for 80% or higher.</p><div class="quiz" data-q></div>`;
    runQuiz($('[data-q]'), shuffle(all).slice(0, 25), (pct) => { P.exam = Math.max(P.exam || 0, pct); save(); });
  }

  /* ---------- Tools ---------- */
  function tools() {
    const ids = Object.keys(AV.widgets);
    app.innerHTML = `<h1>Toolbox</h1><p class="lead">Calculators and simulators AV designers and technicians actually use. Each links back to the lesson that explains it.</p>
      <div class="grid">${ids.map((id) => { const w = AV.widgets[id], h = widgetHome(id); return `<a class="card" href="#/tools/${id}"><h3>${w.title}</h3><p>${w.desc}</p>${h ? `<div class="meta"><span>${h.m.icon} ${h.m.title}</span></div>` : ''}</a>`; }).join('')}</div>`;
  }
  function toolView(id) {
    const w = AV.widgets[id]; if (!w) return notFound(); const h = widgetHome(id);
    app.innerHTML = `<nav class="crumbs"><a href="#/tools">Toolbox</a></nav><div data-widget="${id}"></div>${h ? `<p>Learn the theory: <a href="#/m/${h.m.id}/${h.i}">${h.m.title} → ${h.m.lessons[h.i].title}</a></p>` : ''}`;
    mountWidgets(app);
  }

  /* ---------- Practice ---------- */
  function practice() { app.innerHTML = `<h1>Practice</h1><p class="lead">Apply what you've learned.</p><div class="grid">${practiceCards()}</div>`; }

  function scenarios() {
    app.innerHTML = `<nav class="crumbs"><a href="#/practice">Practice</a></nav><h1>Troubleshooting scenarios</h1><p class="lead">Each one is a real-world fault. Choose the best next step, and you'll get feedback on every choice.</p>
      <div class="grid">${AV.scenarios.map((s) => `<a class="card" href="#/scenario/${s.id}"><span class="pill">${s.tag}</span><h3>${s.title}</h3><p>${s.intro}</p><div class="meta"><span>${P.scenarios[s.id] != null ? `Completed · first-try ${P.scenarios[s.id]}/${s.steps.length}` : `${s.steps.length} steps`}</span></div></a>`).join('')}</div>`;
  }
  function scenarioView(id) {
    const s = AV.scenarios.find((x) => x.id === id); if (!s) return notFound();
    let step = 0, first = 0, tried = false;
    app.innerHTML = `<nav class="crumbs"><a href="#/scenarios">Scenarios</a> / ${s.tag}</nav><h1>${s.title}</h1><div class="callout">${s.intro}</div><div data-s></div>`;
    const root = $('[data-s]');
    const draw = () => {
      if (step >= s.steps.length) {
        P.scenarios[s.id] = Math.max(P.scenarios[s.id] || 0, first); save();
        root.innerHTML = `<div class="result"><div class="score ${first === s.steps.length ? 'good' : 'warn'}">${first}/${s.steps.length}</div><p>correct on the first try</p></div><div class="callout tip"><b>Takeaway:</b> ${s.lesson}</div><div class="row"><a class="btn primary" href="#/scenarios">More scenarios</a><button class="btn" data-r>Replay</button></div>`;
        root.querySelector('[data-r]').onclick = () => scenarioView(id); return;
      }
      const st = s.steps[step]; tried = false;
      root.innerHTML = `<div class="qmeta"><span>Step ${step + 1} / ${s.steps.length}</span></div><h3 class="qtext">${st.prompt}</h3><div class="opts">${shuffle(st.options.map((o, i) => i)).map((i) => `<button class="opt" data-i="${i}">${st.options[i].t}</button>`).join('')}</div><div class="explain" hidden></div>`;
      root.querySelectorAll('.opt').forEach((b) => b.onclick = () => {
        const o = st.options[+b.dataset.i], ex = root.querySelector('.explain'); ex.hidden = false;
        if (o.ok) {
          if (!tried) first++;
          b.classList.add('correct'); root.querySelectorAll('.opt').forEach((x) => x.disabled = true);
          ex.innerHTML = `<p><b>✓</b> ${o.fb}</p><button class="btn primary" data-n>${step === s.steps.length - 1 ? 'Finish' : 'Continue →'}</button>`;
          ex.querySelector('[data-n]').onclick = () => { step++; draw(); };
        } else { tried = true; b.classList.add('wrong'); b.disabled = true; ex.innerHTML = `<p><b>✗</b> ${o.fb} Try another option.</p>`; }
      });
    };
    draw();
  }

  function flashcards() {
    const cats = [...new Set(AV.glossary.map((g) => g.c))];
    app.innerHTML = `<nav class="crumbs"><a href="#/practice">Practice</a></nav><h1>Flashcards</h1>
      <div class="chips" data-cats><button class="chip on" data-c="">All</button>${cats.map((c) => `<button class="chip" data-c="${c}">${c}</button>`).join('')}</div>
      <label class="toggle"><input type="checkbox" data-rev> Show definition first (reverse)</label>
      <div data-f></div>`;
    let deck = [], cur = 0, cat = '';
    const build = () => { deck = shuffle(AV.glossary.filter((g) => !cat || g.c === cat)); cur = 0; draw(); };
    const draw = () => {
      const f = $('[data-f]');
      if (!deck.length) { f.innerHTML = `<div class="result"><div class="score good">✓</div><p>Deck cleared! ${Object.keys(P.cards).length} terms marked known overall.</p><button class="btn primary" data-again>Shuffle again</button></div>`; f.querySelector('[data-again]').onclick = build; return; }
      const g = deck[cur % deck.length], rev = $('[data-rev]').checked;
      f.innerHTML = `<p class="small muted">${deck.length} cards left · ${g.c}</p><button class="flash" data-flip><span class="front">${esc(rev ? g.d : g.t)}</span><span class="back" hidden>${esc(rev ? g.t : g.d)}</span><small>Tap to flip</small></button>
        <div class="row"><button class="btn" data-again>↺ Again</button><button class="btn primary" data-got>✓ Got it</button></div>`;
      f.querySelector('[data-flip]').onclick = (e) => { const c = e.currentTarget; c.querySelector('.back').hidden = !c.querySelector('.back').hidden; c.classList.toggle('flipped'); };
      f.querySelector('[data-again]').onclick = () => { deck.push(deck.splice(cur % deck.length, 1)[0]); draw(); };
      f.querySelector('[data-got]').onclick = () => { P.cards[g.t] = true; save(); deck.splice(cur % deck.length, 1); draw(); };
    };
    $('[data-cats]').onclick = (e) => { const b = e.target.closest('[data-c]'); if (!b) return; cat = b.dataset.c; document.querySelectorAll('[data-cats] .chip').forEach((x) => x.classList.toggle('on', x === b)); build(); };
    $('[data-rev]').onchange = draw;
    build();
  }

  function glossary() {
    const cats = [...new Set(AV.glossary.map((g) => g.c))];
    app.innerHTML = `<h1>Glossary</h1><input type="search" class="search" placeholder="Search ${AV.glossary.length} terms…" data-s aria-label="Search glossary">
      <div class="chips" data-cats><button class="chip on" data-c="">All</button>${cats.map((c) => `<button class="chip" data-c="${c}">${c}</button>`).join('')}</div><dl class="gloss" data-l></dl>`;
    let cat = '';
    const draw = () => {
      const s = $('[data-s]').value.toLowerCase();
      const list = AV.glossary.filter((g) => (!cat || g.c === cat) && (!s || (g.t + ' ' + g.d).toLowerCase().includes(s))).sort((a, b) => a.t.localeCompare(b.t));
      $('[data-l]').innerHTML = list.length ? list.map((g) => `<div><dt>${esc(g.t)} <span class="pill">${g.c}</span></dt><dd>${esc(g.d)}</dd></div>`).join('') : '<p class="muted">No matching terms.</p>';
    };
    $('[data-s]').oninput = draw;
    $('[data-cats]').onclick = (e) => { const b = e.target.closest('[data-c]'); if (!b) return; cat = b.dataset.c; document.querySelectorAll('[data-cats] .chip').forEach((x) => x.classList.toggle('on', x === b)); draw(); };
    draw();
  }

  function progress() {
    const t = totals();
    app.innerHTML = `<h1>Your progress</h1><p class="lead">Saved in this browser only.</p>${crashUI.summary()}
      <div class="stats"><div><b>${t.done}/${t.lessons}</b><span>lessons</span></div><div><b>${Object.keys(P.quizzes).length}/${mods.length}</b><span>quizzes taken</span></div><div><b>${P.exam != null ? P.exam + '%' : '—'}</b><span>best exam</span></div><div><b>${Object.keys(P.scenarios).length}/${AV.scenarios.length}</b><span>scenarios</span></div></div>
      <table><tr><th>Module</th><th>Lessons</th><th>Quiz best</th></tr>${mods.map((m) => { const p = modProg(m); return `<tr><td><a href="#/m/${m.id}">${m.icon} ${m.title}</a></td><td>${p.done}/${p.total}</td><td>${P.quizzes[m.id] != null ? P.quizzes[m.id] + '%' : '—'}</td></tr>`; }).join('')}</table>
      <div class="row"><button class="btn danger" data-reset>Reset all progress</button></div>`;
    const b = $('[data-reset]'); let armed = false;
    b.onclick = () => { if (!armed) { armed = true; b.textContent = 'Tap again to confirm reset'; return; } P = { lessons: {}, quizzes: {}, exam: null, scenarios: {}, cards: {}, chains: {} }; save(); crashUI.clear(); progress(); };
  }

  function notFound() { app.innerHTML = `<h1>Not found</h1><p><a href="#/">Go home</a></p>`; }

  /* ---------- Router ---------- */
  const routes = [
    [/^#?\/?$/, home], [/^#\/crash$/, () => crashUI.home()], [/^#\/crash\/(\d+)$/, (n) => crashUI.lesson(+n)], [/^#\/learn$/, learn], [/^#\/m\/([\w-]+)$/, moduleView], [/^#\/m\/([\w-]+)\/quiz$/, quizView],
    [/^#\/m\/([\w-]+)\/(\d+)$/, (id, n) => lessonView(id, +n)], [/^#\/tools$/, tools], [/^#\/tools\/([\w-]+)$/, toolView],
    [/^#\/practice$/, practice], [/^#\/flashcards$/, flashcards], [/^#\/scenarios$/, scenarios], [/^#\/scenario\/([\w-]+)$/, scenarioView],
    [/^#\/exam$/, exam], [/^#\/glossary$/, glossary], [/^#\/progress$/, progress]
  ];
  function tabFor(h) {
    if (!h || h === '#/' || /^#\/crash/.test(h)) return 'crash';
    if (/^#\/tools/.test(h)) return 'tools';
    if (/^#\/(practice|flashcards|scenario|exam)/.test(h)) return 'practice';
    if (/^#\/glossary/.test(h)) return 'glossary';
    if (/^#\/progress/.test(h)) return 'progress';
    return 'learn';
  }
  function router() {
    const h = location.hash || '#/';
    let hit = false;
    for (const [re, fn] of routes) { const m = h.match(re); if (m) { fn(...m.slice(1)); hit = true; break; } }
    if (!hit) notFound();
    const tab = tabFor(h);
    document.querySelectorAll('[data-tab]').forEach((a) => a.classList.toggle('active', a.dataset.tab === tab));
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', router);
  router();
})();
