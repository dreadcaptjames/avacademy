/* Signal Path — Interactive tools.
   Each widget: { title, desc, render(bodyEl) }. Lessons embed them with <div data-widget="id"></div>. */
(function () {
  const W = AV.widgets;
  const L = Math.log10;
  const fmt = (n, d = 1) => (isFinite(n) ? Number(n).toLocaleString(undefined, { maximumFractionDigits: d }) : '—');

  function field(k, label, val, o = {}) {
    if (o.options) {
      return `<label class="field"><span>${label}</span><select data-k="${k}">${o.options
        .map(([v, t]) => `<option value="${v}"${String(v) === String(val) ? ' selected' : ''}>${t}</option>`)
        .join('')}</select></label>`;
    }
    if (o.range) {
      return `<label class="field"><span>${label} <output data-show="${k}">${val}</output>${o.unit ? ' ' + o.unit : ''}</span><input type="range" data-k="${k}" value="${val}" min="${o.min}" max="${o.max}" step="${o.step || 1}"></label>`;
    }
    return `<label class="field"><span>${label}</span><input type="number" inputmode="decimal" step="any" data-k="${k}" value="${val}"></label>`;
  }
  function bind(el, calc) {
    const get = (k) => {
      const x = el.querySelector(`[data-k="${k}"]`);
      if (!x) return null;
      if (x.tagName === 'SELECT') { const n = Number(x.value); return isNaN(n) ? x.value : n; }
      const v = parseFloat(x.value);
      return isNaN(v) ? 0 : v;
    };
    const run = () => {
      el.querySelectorAll('output[data-show]').forEach((o) => {
        const i = el.querySelector(`[data-k="${o.dataset.show}"]`);
        if (i) o.textContent = i.value;
      });
      try { calc(get); } catch (e) { console.error(e); }
    };
    el.addEventListener('input', run);
    el.addEventListener('change', run);
    run();
    return run;
  }
  const out = (el, sel, html) => { const o = el.querySelector(sel); if (o) o.innerHTML = html; };
  const badge = (ok, okT, badT) => `<span class="badge ${ok ? 'good' : 'bad'}">${ok ? okT : badT}</span>`;

  /* ---------- Signal chain game ---------- */
  W.chain = {
    title: 'Signal chain builder',
    desc: 'Tap the components in signal-flow order, from source to destination.',
    render(el) {
      let ci = 0, picked = [], bank = [];
      const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
      el.innerHTML = `${field('c', 'Scenario', 0, { options: AV.chains.map((c, i) => [i, c.title]) })}
        <p class="small muted">Your chain:</p><div class="chain answer" data-a></div>
        <p class="small muted">Components:</p><div class="chain bank" data-b></div>
        <div class="row"><button class="btn primary" data-check>Check</button><button class="btn" data-reset>Shuffle</button></div>
        <div class="out" data-o hidden></div>`;
      const sel = el.querySelector('select');
      const reset = () => {
        ci = +sel.value; picked = [];
        const items = AV.chains[ci].items;
        do { bank = shuffle(items); } while (items.length > 1 && bank.join() === items.join());
        draw(); el.querySelector('[data-o]').hidden = true;
      };
      const draw = () => {
        el.querySelector('[data-a]').innerHTML = picked.length ? picked.map((t, i) => `<button class="tile on" data-i="${i}">${i + 1}. ${t}</button>`).join('<b class="arrow">→</b>') : '<span class="muted small">Tap components below…</span>';
        el.querySelector('[data-b]').innerHTML = bank.map((t, i) => `<button class="tile" data-j="${i}">${t}</button>`).join('');
      };
      el.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        if (b.dataset.j != null) { picked.push(bank.splice(+b.dataset.j, 1)[0]); draw(); }
        else if (b.dataset.i != null) { bank.push(picked.splice(+b.dataset.i, 1)[0]); draw(); }
        else if (b.hasAttribute('data-reset')) reset();
        else if (b.hasAttribute('data-check')) {
          const c = AV.chains[ci]; const o = el.querySelector('[data-o]'); o.hidden = false;
          if (bank.length) { o.innerHTML = 'Place every component first.'; return; }
          const right = picked.filter((t, i) => t === c.items[i]).length;
          if (right === c.items.length) {
            o.innerHTML = `${badge(true, 'Correct!')} ${c.note}`;
            if (AV.onChainSolved) AV.onChainSolved(ci);
          } else {
            o.innerHTML = `${badge(false, '', `${right}/${c.items.length} in place`)} Correct order: ${c.items.join(' → ')}`;
          }
        }
      });
      sel.addEventListener('change', reset);
      reset();
    }
  };

  /* ---------- Ohm's law ---------- */
  W.ohms = {
    title: "Ohm's law & power calculator",
    desc: 'Enter any two values to solve for the others.',
    render(el) {
      el.innerHTML = `${field('m', 'I know…', 'VR', { options: [['VR', 'Voltage & resistance'], ['VI', 'Voltage & current'], ['IR', 'Current & resistance'], ['PV', 'Power & voltage'], ['PR', 'Power & resistance'], ['PI', 'Power & current']] })}
      <div class="grid2">${field('a', 'Value A', 70.7)}${field('b', 'Value B', 50)}</div>
      <div class="out" data-o></div>`;
      bind(el, (g) => {
        const m = g('m'), a = g('a'), b = g('b'); let V, I, R, P;
        const names = { V: 'Voltage (V)', I: 'Current (A)', R: 'Resistance (Ω)', P: 'Power (W)' };
        el.querySelectorAll('.field span')[1].textContent = names[m[0]];
        el.querySelectorAll('.field span')[2].textContent = names[m[1]];
        if (m === 'VR') { V = a; R = b; I = V / R; P = V * I; }
        if (m === 'VI') { V = a; I = b; R = V / I; P = V * I; }
        if (m === 'IR') { I = a; R = b; V = I * R; P = V * I; }
        if (m === 'PV') { P = a; V = b; I = P / V; R = V / I; }
        if (m === 'PR') { P = a; R = b; I = Math.sqrt(P / R); V = I * R; }
        if (m === 'PI') { P = a; I = b; V = P / I; R = V / I; }
        out(el, '[data-o]', `V = <b>${fmt(V, 2)} V</b> · I = <b>${fmt(I, 3)} A</b> · R = <b>${fmt(R, 2)} Ω</b> · P = <b>${fmt(P, 1)} W</b>`);
      });
    }
  };

  /* ---------- Decibel toolkit ---------- */
  W.db = {
    title: 'Decibel toolkit',
    desc: 'Inverse square law, adding sound sources, and voltage ↔ dBu/dBV.',
    render(el) {
      el.innerHTML = `<h5>Level vs. distance (inverse square law)</h5>
      <div class="grid3">${field('l1', 'Level at reference (dB SPL)', 90)}${field('d1', 'Reference distance', 1)}${field('d2', 'New distance', 8)}</div><div class="out" data-o1></div>
      <h5>Adding sources</h5>
      <div class="grid3">${field('a', 'Source A (dB)', 80)}${field('b', 'Source B (dB)', 80)}${field('n', 'Or: N identical sources', 4)}</div><div class="out" data-o2></div>
      <h5>Voltage ↔ dB</h5>
      <div class="grid3">${field('v', 'Voltage (V rms)', 1.228)}</div><div class="out" data-o3></div>`;
      bind(el, (g) => {
        const l2 = g('l1') - 20 * L(g('d2') / g('d1'));
        out(el, '[data-o1]', `At ${fmt(g('d2'), 2)}: <b>${fmt(l2, 1)} dB SPL</b> (change of ${fmt(l2 - g('l1'), 1)} dB)`);
        const sum = 10 * L(Math.pow(10, g('a') / 10) + Math.pow(10, g('b') / 10));
        const nsum = g('a') + 10 * L(Math.max(1, g('n')));
        out(el, '[data-o2]', `A + B = <b>${fmt(sum, 1)} dB</b> · ${fmt(g('n'), 0)} sources at ${fmt(g('a'), 1)} dB = <b>${fmt(nsum, 1)} dB</b>`);
        const v = g('v');
        out(el, '[data-o3]', `<b>${fmt(20 * L(v / 0.775), 2)} dBu</b> · <b>${fmt(20 * L(v), 2)} dBV</b> <span class="muted">(+4 dBu = 1.228 V, −10 dBV = 0.316 V)</span>`);
      });
    }
  };

  /* ---------- Loudspeaker SPL ---------- */
  W.spl = {
    title: 'Loudspeaker SPL & power calculator',
    desc: 'SPL = sensitivity + 10·log(power) − 20·log(distance). Free-field estimate for a single speaker.',
    render(el) {
      el.innerHTML = `<div class="grid2">${field('s', 'Sensitivity (dB, 1 W/1 m)', 89)}${field('p', 'Amplifier power (W)', 100)}${field('d', 'Listener distance (m)', 8)}${field('t', 'Target average SPL at listener (dB)', 85)}${field('h', 'Headroom for peaks (dB)', 10)}</div><div class="out" data-o></div>`;
      bind(el, (g) => {
        const spl = g('s') + 10 * L(g('p')) - 20 * L(g('d'));
        const need = Math.pow(10, (g('t') + g('h') - g('s') + 20 * L(g('d'))) / 10);
        out(el, '[data-o]', `Max SPL at ${fmt(g('d'))} m: <b>${fmt(spl)} dB</b><br>Power needed for ${fmt(g('t'))} dB average + ${fmt(g('h'))} dB headroom: <b>${fmt(need, 0)} W</b> ${badge(need <= g('p'), 'amp is sufficient', 'amp is too small')}<br><span class="muted small">Each doubling of power adds 3 dB. Each doubling of distance costs 6 dB.</span>`);
      });
    }
  };

  /* ---------- 70V tap calculator ---------- */
  W.seventy = {
    title: '70 V / 100 V line load calculator',
    desc: 'Add speakers and taps. Keep the total at or below 80% of the amplifier channel rating.',
    render(el) {
      const taps = [0.25, 0.5, 1, 2, 4, 8, 16, 32];
      const row = (q, t) => `<div class="trow"><input type="number" class="q" value="${q}" min="0" inputmode="numeric" aria-label="Quantity"><span>speakers ×</span><select class="t" aria-label="Tap">${taps.map((x) => `<option${x === t ? ' selected' : ''}>${x}</option>`).join('')}</select><span>W</span><button class="x" aria-label="Remove">✕</button></div>`;
      el.innerHTML = `<div class="grid2">${field('a', 'Amplifier channel rating (W)', 250)}${field('v', 'Line voltage', 70.7, { options: [[25, '25 V'], [70.7, '70 V (70.7)'], [100, '100 V']] })}</div>
        <div data-rows>${row(16, 4)}${row(6, 8)}</div><button class="btn small" data-add>+ Add speaker group</button><div class="out" data-o></div>`;
      const run = bind(el, (g) => {
        let total = 0, n = 0;
        el.querySelectorAll('.trow').forEach((r) => { const q = +r.querySelector('.q').value || 0; total += q * +r.querySelector('.t').value; n += q; });
        const amp = g('a'), v = g('v'), pct = (total / amp) * 100;
        const z = total ? (v * v) / total : Infinity;
        out(el, '[data-o]', `${n} speakers · total taps <b>${fmt(total, 2)} W</b> = <b>${fmt(pct, 0)}%</b> of amp ${badge(pct <= 80, 'within 80% rule', pct <= 100 ? 'over 80%: add amp capacity' : 'overloaded')}<br>Line load impedance ≈ <b>${fmt(z, 1)} Ω</b> · Minimum amp for this load: <b>${fmt(total / 0.8, 0)} W</b><div class="meter"><i style="width:${Math.min(pct, 120) / 1.2}%" class="${pct > 100 ? 'bad' : pct > 80 ? 'warn' : ''}"></i><em style="left:${80 / 1.2}%">80%</em></div>`);
      });
      el.addEventListener('click', (e) => {
        if (e.target.matches('[data-add]')) { el.querySelector('[data-rows]').insertAdjacentHTML('beforeend', row(1, 2)); run(); }
        if (e.target.matches('.x')) { e.target.parentElement.remove(); run(); }
      });
    }
  };

  /* ---------- Impedance ---------- */
  W.impedance = {
    title: 'Speaker impedance calculator',
    desc: 'Series adds impedances; parallel lowers them. Check against the amplifier’s minimum load.',
    render(el) {
      el.innerHTML = `<div class="grid3">${field('n', 'Number of speakers', 2)}${field('z', 'Each speaker (Ω)', 8)}${field('m', 'Wiring', 'p', { options: [['p', 'Parallel'], ['s', 'Series'], ['sp', 'Series-parallel (pairs)']] })}${field('min', 'Amp minimum load (Ω)', 4)}</div><div class="out" data-o></div>`;
      bind(el, (g) => {
        const n = Math.max(1, Math.round(g('n'))), z = g('z'); let t;
        if (g('m') === 'p') t = z / n;
        else if (g('m') === 's') t = z * n;
        else t = n % 2 ? NaN : (z * 2) / (n / 2);
        out(el, '[data-o]', isNaN(t) ? 'Series-parallel pairs need an even number of speakers.' : `Total load: <b>${fmt(t, 2)} Ω</b> ${badge(t >= g('min'), 'safe for amp', 'below amp minimum!')}`);
      });
    }
  };

  /* ---------- Wire loss ---------- */
  W.wireloss = {
    title: 'Speaker cable loss calculator',
    desc: 'Estimates level lost in cable resistance (copper, round trip). Many designers aim for under ~0.5–1 dB.',
    render(el) {
      const awg = [[18, '18 AWG (6.39 Ω/1000 ft)'], [16, '16 AWG (4.02)'], [14, '14 AWG (2.53)'], [12, '12 AWG (1.59)'], [10, '10 AWG (1.00)']];
      const ohm = { 18: 6.39, 16: 4.02, 14: 2.53, 12: 1.59, 10: 1.0 };
      el.innerHTML = `<div class="grid2">${field('sys', 'System', 'lo', { options: [['lo', 'Low impedance'], ['70.7', '70 V'], ['100', '100 V']] })}${field('z', 'Speaker load (Ω) or total taps on line (W)', 8)}${field('len', 'One-way cable length (ft)', 150)}${field('g', 'Wire gauge', 14, { options: awg })}</div><div class="out" data-o></div>`;
      bind(el, (g) => {
        const sys = g('sys');
        const load = sys === 'lo' ? g('z') : (sys * sys) / Math.max(g('z'), 0.01);
        const r = (2 * g('len') * ohm[g('g')]) / 1000;
        const loss = -20 * L(load / (load + r));
        out(el, '[data-o]', `Load ≈ <b>${fmt(load, 1)} Ω</b> · Cable resistance <b>${fmt(r, 2)} Ω</b> · Loss <b>${fmt(loss, 2)} dB</b> ${badge(loss <= 1, loss <= 0.5 ? 'excellent' : 'acceptable', 'consider heavier gauge')}<br><span class="muted small">Notice how much more forgiving constant-voltage lines are: their load impedance is much higher.</span>`);
      });
    }
  };

  /* ---------- Ceiling speaker spacing ---------- */
  W.spacing = {
    title: 'Ceiling speaker layout calculator',
    desc: 'Coverage radius at ear height = (ceiling − ear height) × tan(dispersion ÷ 2). Use any consistent unit.',
    render(el) {
      el.innerHTML = `<div class="grid2">${field('h', 'Ceiling height', 10)}${field('e', 'Ear height (seated ≈ 4 ft / 1.2 m)', 4)}${field('a', 'Speaker dispersion (°)', 90)}${field('lay', 'Density', 'mo', { options: [['ee', 'Edge-to-edge (background music)'], ['mo', 'Minimum overlap (paging/speech)'], ['ec', 'Edge-to-center (critical speech)']] })}${field('L', 'Room length', 40)}${field('Wd', 'Room width', 30)}</div><div class="out" data-o></div><svg class="room" viewBox="0 0 200 150" data-svg></svg>`;
      bind(el, (g) => {
        const r = (g('h') - g('e')) * Math.tan((g('a') / 2) * Math.PI / 180);
        const sp = g('lay') === 'ee' ? 2 * r : g('lay') === 'mo' ? r * Math.SQRT2 : r;
        const nx = Math.max(1, Math.ceil(g('L') / sp)), ny = Math.max(1, Math.ceil(g('Wd') / sp));
        out(el, '[data-o]', r > 0 ? `Coverage diameter <b>${fmt(2 * r, 1)}</b> · Spacing <b>${fmt(sp, 1)}</b> · Grid ${nx} × ${ny} = <b>${nx * ny} speakers</b>` : 'Ear height must be below the ceiling.');
        if (r <= 0) return;
        const s = Math.min(190 / g('L'), 140 / g('Wd')), ox = (200 - g('L') * s) / 2, oy = (150 - g('Wd') * s) / 2;
        let c = `<rect x="${ox}" y="${oy}" width="${g('L') * s}" height="${g('Wd') * s}" class="wall"/>`;
        for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
          const cx = ox + (g('L') / nx) * (i + 0.5) * s, cy = oy + (g('Wd') / ny) * (j + 0.5) * s;
          c += `<circle cx="${cx}" cy="${cy}" r="${r * s}" class="cov"/><circle cx="${cx}" cy="${cy}" r="1.6" class="spk"/>`;
        }
        el.querySelector('[data-svg]').innerHTML = c;
      });
    }
  };

  /* ---------- PAG / NAG ---------- */
  W.pag = {
    title: 'Gain-before-feedback calculator (PAG / NAG)',
    desc: 'Use consistent units (feet or meters). The system is predicted stable when PAG ≥ NAG.',
    render(el) {
      el.innerHTML = `<svg viewBox="0 0 320 90" class="pagsvg"><text x="10" y="70">🗣 Talker</text><text x="70" y="40">🎙 Mic</text><text x="150" y="20">🔊 Speaker</text><text x="250" y="70">👂 Listener</text>
        <line x1="40" y1="62" x2="80" y2="44"/><text x="45" y="50" class="lab">Ds</text><line x1="95" y1="34" x2="155" y2="24"/><text x="118" y="25" class="lab">D1</text><line x1="190" y1="25" x2="262" y2="58"/><text x="230" y="35" class="lab">D2</text><line x1="50" y1="78" x2="250" y2="78" class="d0"/><text x="140" y="88" class="lab">D0</text></svg>
        <div class="grid3">${field('d0', 'D0: talker → farthest listener', 60)}${field('ds', 'Ds: talker → mic', 2, { range: 1, min: 0.25, max: 6, step: 0.25 })}${field('d1', 'D1: mic → nearest speaker', 15)}${field('d2', 'D2: speaker → farthest listener', 45)}${field('ead', 'EAD (comfortable distance)', 6)}${field('nom', 'Open mics (NOM)', 1, { range: 1, min: 1, max: 16 })}${field('fsm', 'Feedback stability margin (dB)', 6)}</div><div class="out" data-o></div>`;
      bind(el, (g) => {
        const pag = 20 * L(g('d0')) - 20 * L(g('ds')) + 20 * L(g('d1')) - 20 * L(g('d2')) - 10 * L(g('nom')) - g('fsm');
        const nag = 20 * L(g('d0')) - 20 * L(g('ead'));
        out(el, '[data-o]', `PAG <b>${fmt(pag)} dB</b> · NAG <b>${fmt(nag)} dB</b> · Margin <b>${fmt(pag - nag)} dB</b> ${badge(pag >= nag, 'stable', 'feedback likely')}<br><span class="muted small">Try moving the mic closer (smaller Ds) or opening more mics.</span>`);
      });
    }
  };

  /* ---------- Gain structure simulator ---------- */
  W.gain = {
    title: 'Gain structure simulator',
    desc: 'Set each stage so speech peaks sit well above the noise and below clipping. Watch the meters and the advice.',
    render(el) {
      el.innerHTML = `<div class="grid2">${field('mic', 'Mic speech peaks', -45, { range: 1, min: -65, max: -20, unit: 'dBu' })}${field('pre', 'Preamp gain', 30, { range: 1, min: 0, max: 70, unit: 'dB' })}${field('fad', 'DSP fader / processing', 0, { range: 1, min: -30, max: 20, unit: 'dB' })}${field('out', 'DSP output level', 0, { range: 1, min: -30, max: 12, unit: 'dB' })}${field('att', 'Amp input attenuator', 0, { range: 1, min: -30, max: 0, unit: 'dB' })}${field('sens', 'Amp input sensitivity (full power)', 4, { options: [[4, '+4 dBu (1.23 V)'], [0, '0 dBu (0.775 V)'], [10, '+10 dBu']] })}</div>
      <div class="meters" data-m></div><div class="out" data-o></div>`;
      const CLIP = 24, DSPN = -95, EIN = -126;
      const bar = (name, lvl, noise, limit) => {
        const pos = (x) => Math.max(0, Math.min(100, ((x + 110) / 140) * 100));
        return `<div class="mrow"><span>${name}</span><div class="mtrack"><i class="noise" style="width:${pos(noise)}%"></i><i class="sig ${lvl > limit ? 'bad' : lvl > limit - 6 ? 'warn' : ''}" style="left:${pos(noise)}%;width:${Math.max(0, pos(lvl) - pos(noise))}%"></i><em style="left:${pos(limit)}%"></em></div><b>${fmt(lvl, 0)}</b></div>`;
      };
      bind(el, (g) => {
        const pre = g('mic') + g('pre');
        const preN = EIN + g('pre');
        const proc = pre + g('fad');
        const procN = 10 * L(Math.pow(10, (preN + g('fad')) / 10) + Math.pow(10, DSPN / 10));
        const dout = proc + g('out');
        const doutN = 10 * L(Math.pow(10, (procN + g('out')) / 10) + Math.pow(10, DSPN / 10));
        const amp = dout + g('att'), ampN = doutN + g('att'), sens = g('sens');
        el.querySelector('[data-m]').innerHTML =
          bar('Preamp / ADC', pre, preN, CLIP) + bar('DSP processing', proc, procN, CLIP) + bar('DSP output', dout, doutN, CLIP) + bar('Amp input', amp, ampN, sens) +
          `<p class="small muted">Scale −110 to +30 dBu. Grey = noise floor, colored = signal peaks, line = clip / full-power point.</p>`;
        const tips = [];
        if (pre > CLIP) tips.push('🔴 The A/D converter is clipping. Reduce preamp gain.');
        else if (pre > CLIP - 8) tips.push('🟠 Peaks are within 8 dB of the A/D clip point. Loud talkers will clip, so back the preamp off a little.');
        else if (pre < CLIP - 40) tips.push('🟠 Preamp gain is too low. Making up the level later raises the noise with it.');
        if (proc > CLIP || dout > CLIP) tips.push('🔴 Internal or output clipping. Lower the fader or output level.');
        if (Math.abs(g('fad')) > 10) tips.push('🟡 Large fader offsets usually mean gain should be set elsewhere. Try to keep processing near unity.');
        if (amp > sens + 1) tips.push('🔴 The amplifier is being driven past full power. Use the amp attenuator or lower the DSP output.');
        else if (amp < sens - 15) tips.push('🟠 The amp will never reach full power. Raise the DSP output rather than cranking gain elsewhere.');
        const snr = amp - ampN;
        if (!tips.length) tips.push('🟢 Good gain structure: healthy headroom, low noise, and the amp reaches full power right where it should.');
        out(el, '[data-o]', tips.join('<br>') + `<br><span class="muted small">Signal-to-noise at amp input ≈ ${fmt(snr, 0)} dB · Peak level at ADC = ${fmt(pre - CLIP, 0)} dBFS</span>`);
      });
    }
  };

  /* ---------- Bandwidth ---------- */
  W.bandwidth = {
    title: 'Video & audio bandwidth calculator',
    desc: 'Estimates uncompressed data rates and checks them against common links.',
    render(el) {
      const res = [['1280x720', '720p'], ['1920x1080', '1080p'], ['1920x1200', 'WUXGA'], ['2560x1440', '1440p'], ['3840x2160', '4K UHD'], ['4096x2160', 'DCI 4K'], ['7680x4320', '8K UHD']];
      el.innerHTML = `<div class="grid2">${field('r', 'Resolution', '3840x2160', { options: res })}${field('f', 'Frame rate (fps)', 60, { options: [[24, 24], [25, 25], [30, 30], [50, 50], [60, 60], [120, 120]] })}${field('b', 'Bit depth', 8, { options: [[8, '8-bit'], [10, '10-bit'], [12, '12-bit']] })}${field('c', 'Chroma', 3, { options: [[3, '4:4:4 / RGB'], [2, '4:2:2'], [1.5, '4:2:0']] })}</div><div class="out" data-o1></div>
      <h5>Audio</h5><div class="grid3">${field('ch', 'Channels', 64)}${field('fs', 'Sample rate (kHz)', 48)}${field('ab', 'Bit depth', 24)}</div><div class="out" data-o2></div>`;
      bind(el, (g) => {
        const [w, h] = String(g('r')).split('x').map(Number);
        const active = (w * h * g('f') * g('b') * g('c')) / 1e9;
        const tmds = active * 1.19 * 1.25, frl = active * 1.19 * (18 / 16);
        const links = [
          ['HDMI 1.4 (10.2 Gbps TMDS)', tmds <= 10.2], ['HDMI 2.0 (18 Gbps TMDS)', tmds <= 18], ['HDMI 2.1 (48 Gbps FRL)', frl <= 48],
          ['1 GbE network', active <= 0.95], ['10 GbE network', active <= 9.5], ['25 GbE network', active <= 24]
        ];
        out(el, '[data-o1]', `Active video ≈ <b>${fmt(active, 2)} Gbps</b> · With blanking + 8b/10b encoding ≈ <b>${fmt(tmds, 2)} Gbps</b><ul class="checks">${links.map(([n, ok]) => `<li class="${ok ? 'ok' : 'no'}">${ok ? '✓' : '✗'} ${n}${ok ? '' : ' — needs compression or a faster link'}</li>`).join('')}</ul><span class="muted small">Estimates using CTA-style blanking (~19%). Real link rates depend on exact timing.</span>`);
        const mbps = (g('ch') * g('fs') * 1000 * g('ab')) / 1e6;
        out(el, '[data-o2]', `≈ <b>${fmt(mbps, 1)} Mbps</b> of raw audio payload (before packet overhead) · ≈ ${Math.ceil(g('ch') / 4)} Dante unicast flows at 4 channels each`);
      });
    }
  };

  /* ---------- Display sizing ---------- */
  W.display = {
    title: 'Display size calculator',
    desc: 'Compares the legacy 4-6-8 rule with DISCAS-style BDM and ADM estimates. Verify real designs against ANSI/AVIXA V202.01.',
    render(el) {
      el.innerHTML = `<div class="grid2">${field('d', 'Farthest viewer distance (ft)', 24)}${field('ar', 'Aspect ratio', 1.7778, { options: [[1.7778, '16:9'], [1.6, '16:10'], [1.3333, '4:3'], [2.37, '21:9']] })}${field('t', 'Viewing task (4-6-8 rule)', 6, { options: [[4, 'Detailed / analytical (÷4)'], [6, 'Reading / decision making (÷6)'], [8, 'Passive video (÷8)']] })}</div><div class="out" data-o1></div>
      <h5>DISCAS-style estimates</h5><div class="grid3">${field('eh', 'BDM: text element height (% of image height)', 2.5)}${field('vr', 'ADM: vertical resolution (px)', 2160, { options: [[1080, '1080'], [1200, '1200'], [2160, '2160'], [4320, '4320']] })}${field('ep', 'ADM: element height (px)', 4)}</div><div class="out" data-o2></div>`;
      const diag = (hFt, ar) => hFt * 12 * Math.sqrt(1 + ar * ar);
      bind(el, (g) => {
        const ar = g('ar'), h = g('d') / g('t');
        out(el, '[data-o1]', `Min image height <b>${fmt(h, 2)} ft</b> · width <b>${fmt(h * ar, 2)} ft</b> · ≈ <b>${fmt(diag(h, ar), 0)}″ diagonal</b><br><span class="muted small">Comfort rule of thumb: keep the closest viewer at least about one image width (${fmt(h * ar, 1)} ft) away.</span>`);
        const hb = g('d') / (200 * (g('eh') / 100));
        const ha = (g('d') * g('vr')) / (3438 * Math.max(g('ep'), 0.1));
        out(el, '[data-o2]', `BDM (farthest viewer ≤ 200 × element height): image height <b>${fmt(hb, 2)} ft</b> → ≈ <b>${fmt(diag(hb, ar), 0)}″</b><br>ADM (resolve ${fmt(g('ep'), 1)} px at 1 arc-minute): image height <b>${fmt(ha, 2)} ft</b> → ≈ <b>${fmt(diag(ha, ar), 0)}″</b><br><span class="muted small">Bigger element height → smaller display allowed. Detailed content (ADM) often requires very large images.</span>`);
      });
    }
  };

  /* ---------- Projector brightness & contrast ---------- */
  W.projector = {
    title: 'Projection brightness, contrast & throw calculator',
    desc: 'Estimates screen luminance and in-room contrast against ANSI/INFOCOMM 3M-2011 categories.',
    render(el) {
      el.innerHTML = `<div class="grid2">${field('dg', 'Screen diagonal (in)', 120)}${field('ar', 'Aspect ratio', 1.7778, { options: [[1.7778, '16:9'], [1.6, '16:10'], [1.3333, '4:3']] })}${field('lm', 'Projector lumens', 6000)}${field('gn', 'Screen gain', 1.0)}${field('fc', 'Ambient light on screen (foot-candles)', 5, { range: 1, min: 0.5, max: 50, step: 0.5, unit: 'fc' })}${field('tr', 'Lens throw ratio', 1.5)}</div><div class="out" data-o></div>`;
      bind(el, (g) => {
        const ar = g('ar'), hIn = g('dg') / Math.sqrt(1 + ar * ar), wIn = hIn * ar;
        const area = (wIn * hIn) / 144, proj = (g('lm') * g('gn')) / area, amb = g('fc') * g('gn');
        const cr = (proj + amb) / amb;
        const cats = [['Passive viewing', 7], ['Basic decision making', 15], ['Analytical decision making', 50], ['Full-motion video', 80]];
        out(el, '[data-o]', `Image ${fmt(wIn / 12, 2)} × ${fmt(hIn / 12, 2)} ft (${fmt(area, 1)} ft²) · Throw distance ≈ <b>${fmt((g('tr') * wIn) / 12, 1)} ft</b><br>Screen luminance ≈ <b>${fmt(proj, 1)} fL</b> (${fmt(proj * 3.426, 0)} nits) · Ambient adds ${fmt(amb, 1)} fL<br>In-room contrast ≈ <b>${fmt(cr, 1)} : 1</b><ul class="checks">${cats.map(([n, t]) => `<li class="${cr >= t ? 'ok' : 'no'}">${cr >= t ? '✓' : '✗'} ${n} (${t}:1)${cr >= t ? '' : ` needs ≈ ${fmt(((t - 1) * amb * area) / g('gn'), 0)} lumens`}</li>`).join('')}</ul><span class="muted small">Simplified model: assumes ambient reflects at screen gain and ignores the projector’s native black level.</span>`);
      });
    }
  };

  /* ---------- Rack power & heat ---------- */
  W.power = {
    title: 'Rack power, heat & space calculator',
    desc: 'Add equipment to estimate circuit loading (80% continuous rule), heat load and rack units.',
    render(el) {
      const row = (n, q, w, u) => `<div class="trow wide"><input class="n" value="${n}" aria-label="Device"><input type="number" class="q" value="${q}" aria-label="Qty"><input type="number" class="w" value="${w}" aria-label="Watts"><input type="number" class="u" value="${u}" aria-label="RU"><button class="x" aria-label="Remove">✕</button></div>`;
      el.innerHTML = `<div class="grid2">${field('v', 'Voltage', 120, { options: [[120, '120 V'], [208, '208 V'], [230, '230 V']] })}${field('br', 'Breaker (A)', 20, { options: [[15, '15 A'], [16, '16 A'], [20, '20 A'], [30, '30 A']] })}</div>
      <div class="trow wide head"><span>Device</span><span>Qty</span><span>Watts each</span><span>RU each</span><span></span></div>
      <div data-rows>${row('DSP', 1, 60, 1)}${row('4-ch amplifier', 2, 350, 2)}${row('Network switch (PoE)', 1, 250, 1)}${row('Control processor', 1, 20, 1)}${row('UPS (overhead)', 1, 50, 2)}</div>
      <button class="btn small" data-add>+ Add device</button><div class="out" data-o></div>`;
      const run = bind(el, (g) => {
        let w = 0, u = 0;
        el.querySelectorAll('[data-rows] .trow').forEach((r) => { const q = +r.querySelector('.q').value || 0; w += q * (+r.querySelector('.w').value || 0); u += q * (+r.querySelector('.u').value || 0); });
        const amps = w / g('v'), cont = g('br') * 0.8, pct = (amps / cont) * 100;
        out(el, '[data-o]', `Total <b>${fmt(w, 0)} W</b> · <b>${fmt(amps, 1)} A</b> at ${g('v')} V = ${fmt(pct, 0)}% of the ${fmt(cont, 0)} A continuous limit ${badge(pct <= 100, 'OK on one circuit', 'needs more circuits')}<br>Heat ≈ <b>${fmt(w * 3.412, 0)} BTU/hr</b> · Space <b>${u} RU</b> (+25% spare ≈ ${Math.ceil(u * 1.25)} RU)<br><span class="muted small">Use typical draw for heat, and maximum draw for circuit sizing on amplifiers.</span>`);
      });
      el.addEventListener('click', (e) => {
        if (e.target.matches('[data-add]')) { el.querySelector('[data-rows]').insertAdjacentHTML('beforeend', row('New device', 1, 50, 1)); run(); }
        if (e.target.matches('.x')) { e.target.parentElement.remove(); run(); }
      });
    }
  };

  /* ---------- PoE budget ---------- */
  W.poe = {
    title: 'PoE budget calculator',
    desc: 'Budget by the power class each device requests at the switch port (worst case).',
    render(el) {
      const cls = [[15.4, 'Class 3 / 802.3af — 15.4 W'], [4, 'Class 1 — 4 W'], [7, 'Class 2 — 7 W'], [30, 'Class 4 / PoE+ — 30 W'], [45, 'Class 5 — 45 W'], [60, 'Class 6 / bt Type 3 — 60 W'], [75, 'Class 7 — 75 W'], [90, 'Class 8 / bt Type 4 — 90 W']];
      const row = (n, q, c) => `<div class="trow wide3"><input class="n" value="${n}" aria-label="Device"><input type="number" class="q" value="${q}" aria-label="Qty"><select class="c" aria-label="Class">${cls.map(([v, t]) => `<option value="${v}"${v === c ? ' selected' : ''}>${t}</option>`).join('')}</select><button class="x" aria-label="Remove">✕</button></div>`;
      el.innerHTML = `<div class="grid2">${field('b', 'Switch PoE budget (W)', 370)}${field('p', 'PoE ports available', 24)}</div>
      <div data-rows>${row('Ceiling mic array', 2, 15.4)}${row('Touch panel', 1, 30)}${row('PTZ camera', 2, 30)}${row('Dante amplifier', 1, 60)}</div>
      <button class="btn small" data-add>+ Add device</button><div class="out" data-o></div>`;
      const run = bind(el, (g) => {
        let w = 0, n = 0;
        el.querySelectorAll('[data-rows] .trow').forEach((r) => { const q = +r.querySelector('.q').value || 0; w += q * +r.querySelector('.c').value; n += q; });
        const pct = (w / g('b')) * 100;
        out(el, '[data-o]', `${n} devices · <b>${fmt(w, 1)} W</b> of ${fmt(g('b'), 0)} W (${fmt(pct, 0)}%) ${badge(pct <= 100 && n <= g('p'), 'fits', 'over budget or out of ports')}<div class="meter"><i style="width:${Math.min(pct, 120) / 1.2}%" class="${pct > 100 ? 'bad' : pct > 85 ? 'warn' : ''}"></i><em style="left:${100 / 1.2}%">100%</em></div><span class="muted small">Leave headroom for growth, and check per-port limits as well as the total.</span>`);
      });
      el.addEventListener('click', (e) => {
        if (e.target.matches('[data-add]')) { el.querySelector('[data-rows]').insertAdjacentHTML('beforeend', row('New device', 1, 15.4)); run(); }
        if (e.target.matches('.x')) { e.target.parentElement.remove(); run(); }
      });
    }
  };

  /* ---------- Margin vs markup ---------- */
  W.margin = {
    title: 'Margin vs. markup calculator',
    desc: 'Price a line item for a target margin, and see the markup that equals it.',
    render(el) {
      el.innerHTML = `<div class="grid2">${field('c', 'Cost ($)', 8000)}${field('m', 'Target margin', 30, { range: 1, min: 0, max: 70, unit: '%' })}</div><div class="out" data-o></div>
      <h5>Common confusion</h5><div class="grid2">${field('mu', 'If I mark up cost by…', 30, { range: 1, min: 0, max: 150, unit: '%' })}</div><div class="out" data-o2></div>`;
      bind(el, (g) => {
        const m = g('m') / 100, p = g('c') / (1 - m);
        out(el, '[data-o]', `Sell price <b>$${fmt(p, 2)}</b> · Profit <b>$${fmt(p - g('c'), 2)}</b> · Equivalent markup <b>${fmt(((p - g('c')) / g('c')) * 100, 1)}%</b>`);
        const mu = g('mu') / 100;
        out(el, '[data-o2]', `…a ${fmt(g('mu'), 0)}% markup yields only a <b>${fmt((mu / (1 + mu)) * 100, 1)}% margin</b>.`);
      });
    }
  };
})();
