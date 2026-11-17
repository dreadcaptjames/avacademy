# Signal Path: Commercial AV Academy

An interactive, self-paced course on commercial audiovisual (Pro AV) systems. It's a static site with no build step, no dependencies and no backend, so it runs anywhere, including GitHub Pages.

## What's inside

- **11 modules, 52 lessons**: the industry, AV fundamentals, audio, video and displays, networking and AV-over-IP, control systems, conferencing, cabling/racks/power, the project lifecycle, the business of AV, and live/specialty systems.
- **16 interactive tools**: decibel toolkit, Ohm's law, loudspeaker SPL, 70 V tap loading, speaker impedance, cable loss, ceiling speaker layout (with a drawn grid), PAG/NAG feedback, a gain structure simulator, video/audio bandwidth, display sizing (4-6-8 and DISCAS-style), projector brightness/contrast/throw, rack power and heat, PoE budget, margin vs. markup, and a signal-chain builder.
- **111 quiz questions** (one quiz per module, plus a 25-question randomized final exam).
- **7 branching troubleshooting scenarios** (no video, echo, feedback, Dante discovery, RS-232 control, hum, multicast flooding).
- **137 glossary terms** with search, category filters and flashcards.
- **Progress tracking** saved in the browser (localStorage).

## Deploy to GitHub Pages

1. Create a new repository on GitHub, for example `av-academy`.
2. Upload the contents of this folder to the repository root, keeping the folder structure: `index.html`, `manifest.webmanifest`, `css/`, `js/`, `icons/`, `.nojekyll`.
   - Web: **Add file → Upload files**, then drag everything in.
   - Command line:
     ```bash
     git init
     git add .
     git commit -m "Signal Path AV course"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/av-academy.git
     git push -u origin main
     ```
3. In the repository, go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, select **main** and **/ (root)**, then save.
4. After a minute or so, the site is live at `https://YOUR-USERNAME.github.io/av-academy/`.

It also works on Netlify, Cloudflare Pages, or by opening `index.html` directly in a browser.

## Project structure

```
index.html              App shell (nav, script includes)
css/styles.css          All styling (mobile-first, dark theme)
icons/                  App icon: SVG source, favicons, home-screen and manifest PNGs
manifest.webmanifest    Lets phones "Add to Home Screen" with the app icon
js/content/*.js         Course content: modules, lessons, quizzes, glossary, scenarios
js/widgets.js           Interactive calculators and simulators
js/app.js               Router, progress, quiz engine, flashcards, scenarios
.nojekyll               Tells GitHub Pages to serve files as-is
```

## Adding or editing content

Each module is a plain object pushed onto `AV.modules`:

```js
AV.modules.push({
  id: 'my-module', icon: '🎧', title: 'My Module', level: 'Core',
  summary: 'One-line description.',
  lessons: [
    { title: 'Lesson title', html: `<p>Lesson HTML…</p><div data-widget="db"></div>` }
  ],
  quiz: [
    { q: 'Question?', o: ['A', 'B', 'C'], a: 1, e: 'Why B is right.' }
  ]
});
```

- Embed any tool in a lesson with `<div data-widget="TOOL_ID"></div>`. Tool IDs are the keys in `js/widgets.js` (`db`, `ohms`, `spl`, `seventy`, `impedance`, `wireloss`, `spacing`, `pag`, `gain`, `bandwidth`, `display`, `projector`, `power`, `poe`, `margin`, `chain`).
- Add glossary terms to `js/content/07-glossary.js`. They appear in flashcards automatically.
- Add scenarios and signal chains in `js/content/08-practice.js`.
- New content files need a `<script>` tag in `index.html` before `widgets.js`.

## Accuracy note

The calculators give design *estimates* for learning. Real designs should be checked against current standards (AVIXA/ANSI, AES, TIA, local electrical and building codes) and manufacturer data.
