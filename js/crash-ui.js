/* Signal Path — guided crash-course interface.
   Deliberately separate from the original academy and progress state. */
(function () {
  'use strict';
  const steps = AV.crashCourse || [];
  const KEY = 'signalpath-crash-v1';
  const totalMinutes = steps.reduce((n, step) => n + step.minutes, 0);
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function readProgress() {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || '{}');
      return stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {};
    } catch (_) { return {}; }
  }
  let completed = readProgress();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(completed)); } catch (_) {}
  }
  function isDone(step) { return completed[step.id] === true; }
  function doneCount() { return steps.filter(isDone).length; }
  function nextIndex() {
    const i = steps.findIndex(step => !isDone(step));
    return i < 0 ? steps.length - 1 : i;
  }
  function percent() { return Math.round(100 * doneCount() / Math.max(steps.length, 1)); }
  function summary() {
    return `<a class="crash-progress-link" href="#/crash">
      <span class="crash-mini-mark">⚡ Crash course</span>
      <strong>${doneCount()} / ${steps.length} checkpoints</strong>
      <span>Continue your practical AV essentials course →</span>
      <span class="crash-meter" aria-hidden="true"><i style="width:${percent()}%"></i></span>
    </a>`;
  }
  function courseCard(step, i) {
    const complete = isDone(step);
    return `<a class="crash-course-card ${complete ? 'is-complete' : ''}" href="#/crash/${i}">
      <div class="crash-course-id"><span class="crash-stage-number">${String(i + 1).padStart(2, '0')}</span><span>${step.icon}</span></div>
      <div class="crash-course-details">
        <div class="crash-stage-meta"><span>${step.minutes} min</span><span>${complete ? '✓ Passed' : '1 check'}</span></div>
        <h3>${escapeHTML(step.title)}</h3>
        <p>${escapeHTML(step.subtitle)}</p>
      </div>
      <span class="crash-course-arrow" aria-hidden="true">→</span>
    </a>`;
  }
  function home(app) {
    const count = doneCount(), next = nextIndex(), finished = count === steps.length;
    const minutesLeft = steps.filter(s => !isDone(s)).reduce((sum,s) => sum+s.minutes,0);
    app.innerHTML = `
      <section class="crash-home-hero">
        <div class="crash-hero-main">
          <div class="crash-eyebrow"><span class="crash-live-dot"></span> YOUR AV FIELD GUIDE <span>·</span> NO EXPERIENCE REQUIRED</div>
          <h1>Learn the signal.<br><em>Work the room.</em></h1>
          <p class="crash-intro">A practical ${totalMinutes}-minute crash course in professional AV. Start with how systems connect, then learn the essentials of audio, video, networks, conferencing, and troubleshooting.</p>
          <div class="crash-hero-actions">
            <a class="crash-start-btn" href="#/crash/${next}">${finished ? 'Review the crash course' : count ? 'Continue learning' : 'Start the crash course'} <span aria-hidden="true">↗</span></a>
            <a class="crash-secondary-btn" href="#/learn">Explore full academy →</a>
          </div>
          <div class="crash-hero-trust">
            <span>⏱ ${totalMinutes} minutes</span><span>◎ ${steps.length} practical lessons</span><span>✓ 8 knowledge checks</span>
          </div>
        </div>
        <div class="crash-signal-panel" aria-label="Example professional AV signal chain">
          <div class="crash-display-top"><span>LIVE SIGNAL / FLOW 01</span><span class="crash-live-lamp"></span></div>
          <div class="crash-display-line"><span class="crash-display-unit"><b>IN</b> Laptop</span><i></i><span class="crash-display-unit"><b>ROUTE</b> Switcher</span></div>
          <div class="crash-display-line"><span class="crash-display-unit"><b>PROC</b> DSP</span><i></i><span class="crash-display-unit"><b>OUT</b> Display + sound</span></div>
          <div class="crash-display-footer"><span>Trace the path. Find the fault.</span><span>↳</span></div>
        </div>
      </section>
      <section class="crash-progress-strip" aria-label="Crash course progress">
        <div><span class="crash-strip-label">YOUR LEARNING SESSION</span><strong>${finished ? 'All checkpoints passed' : count ? 'Pick up where you left off' : 'Ready when you are'}</strong></div>
        <div class="crash-strip-visual"><span><strong>${count}</strong> / ${steps.length} complete <small>· ${minutesLeft} min left</small></span><span class="crash-meter" role="progressbar" aria-label="Course completed" aria-valuenow="${count}" aria-valuemin="0" aria-valuemax="${steps.length}"><i style="width:${percent()}%"></i></span></div>
      </section>
      <div class="crash-section-top"><div><p class="crash-overline">THE FAST TRACK</p><h2>Eight stops. One working understanding.</h2></div><p>Take them in order or jump straight to what you need.</p></div>
      <div class="crash-course-grid">${steps.map(courseCard).join('')}</div>
      <section class="crash-outro">
        <div><span class="crash-overline">NEED THE FULL PICTURE?</span><h2>The deeper academy is still here.</h2><p>When you're ready, explore all 11 modules, 52 lessons, tools, quizzes, and scenarios without losing your crash-course progress.</p></div>
        <div class="crash-outro-links"><a class="btn primary" href="#/learn">Full learning path →</a><a class="btn" href="#/tools">Interactive tools</a><a class="btn" href="#/glossary">AV glossary</a></div>
      </section>`;
  }
  function lesson(app, n) {
    const step = steps[n];
    if (!Number.isInteger(n) || !step) { home(app); return; }
    const passed = isDone(step);
    app.innerHTML = `
      <nav class="crash-crumbs"><a href="#/crash">← Crash course</a><span> / </span><span>Stop ${n+1} of ${steps.length}</span></nav>
      <section class="crash-lesson-header">
        <div class="crash-lesson-topline"><span class="crash-overline">AV CRASH COURSE / ${String(n+1).padStart(2,'0')}</span><span class="crash-lesson-time">⏱ ${step.minutes} minutes</span></div>
        <div class="crash-lesson-heading"><span class="crash-lesson-icon">${step.icon}</span><div><h1>${escapeHTML(step.title)}</h1><p>${escapeHTML(step.subtitle)}</p></div></div>
        <div class="crash-meter" role="progressbar" aria-label="Completed checkpoints" aria-valuenow="${doneCount()}" aria-valuemin="0" aria-valuemax="${steps.length}"><i style="width:${percent()}%"></i></div>
      </section>
      <div class="crash-reader-grid">
        <article class="crash-reader">
          ${step.html}
          <div class="crash-deeper"><span>GO DEEPER</span><p>Want a fuller explanation and exercises?</p><a href="#/m/${step.deep.module}/${step.deep.lesson}">${escapeHTML(step.deep.title)} →</a></div>
        </article>
        <aside class="crash-side">
          <div class="crash-side-label">YOU'LL BE ABLE TO</div>
          <p>${escapeHTML(step.skill)}</p>
          <div class="crash-side-label">NEXT UP</div>
          <p>${n < steps.length-1 ? escapeHTML(steps[n+1].title) : 'Your AV essentials are complete.'}</p>
          <div class="crash-side-label">PROGRESS</div>
          <span><strong>${doneCount()}</strong> of ${steps.length} passed</span>
        </aside>
      </div>
      <section class="crash-checkpoint" aria-label="Knowledge check">
        <div class="crash-check-header"><span>QUICK CHECK / ${n+1}</span><span>${passed ? '✓ Previously passed' : 'One question to lock it in'}</span></div>
        <h2>${escapeHTML(step.question.q)}</h2>
        <div class="crash-answer-grid">${step.question.options.map((option,i)=>`<button class="crash-answer" type="button" data-answer="${i}"><span>${String.fromCharCode(65+i)}</span>${escapeHTML(option)}</button>`).join('')}</div>
        <div class="crash-answer-result" data-answer-result role="status" aria-live="polite"></div>
        <div class="crash-complete-nav" data-complete-nav ${passed?'':'hidden'}>
          <span>✓ Checkpoint passed</span>
          <a class="crash-start-btn" href="${n===steps.length-1?'#/crash':'#/crash/'+(n+1)}">${n===steps.length-1?'Finish & review':'Next stop'} →</a>
        </div>
      </section>
      <div class="crash-bottom-nav"><a href="${n>0?'#/crash/'+(n-1):'#/crash'}">← ${n>0?'Previous stop':'Course overview'}</a><a href="#/learn">Full academy ↗</a></div>
    `;
    const options = [...app.querySelectorAll('[data-answer]')];
    const result = app.querySelector('[data-answer-result]');
    const nav = app.querySelector('[data-complete-nav]');
    options.forEach(button => button.addEventListener('click', () => {
      if (button.disabled) return;
      const selected = +button.dataset.answer;
      if (selected === step.question.answer) {
        completed[step.id] = true; save();
        options.forEach(b => {
          b.disabled = true;
          b.classList.toggle('is-correct', +b.dataset.answer === selected);
          b.classList.remove('is-wrong');
        });
        result.className = 'crash-answer-result is-correct';
        result.textContent = 'Correct! ' + step.question.explanation;
        nav.hidden = false;
        app.querySelectorAll('[role=progressbar]').forEach(bar => {
          bar.setAttribute('aria-valuenow', doneCount());
          bar.querySelector('i').style.width = percent()+'%';
        });
        const progressText = app.querySelector('.crash-side strong');
        if (progressText) progressText.textContent = doneCount();
      } else {
        button.classList.add('is-wrong');
        result.className = 'crash-answer-result is-wrong';
        result.textContent = 'Not quite. Revisit the signal path above and try another answer.';
      }
    }));
  }
  AV.crashUI = function (app) {
    return {
      home: () => home(app),
      lesson: n => lesson(app, Number(n)),
      summary
    };
  };
})();