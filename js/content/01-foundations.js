/* Signal Path — Module content: Industry + Fundamentals */
window.AV = window.AV || { modules: [], glossary: [], scenarios: [], chains: [], widgets: {} };

AV.modules.push({
  id: 'industry',
  icon: '🏢',
  title: 'The Commercial AV Industry',
  level: 'Start here',
  summary: 'What commercial AV is, who does the work, how projects are bought and sold, and where you might fit.',
  lessons: [
    {
      title: 'What “commercial AV” actually means',
      html: `
<p><b>Commercial audiovisual</b> (also called <b>Pro AV</b>) is the design, integration, and support of systems that help people communicate with sound, images, and control — in places that aren't homes. The meeting room with a video bar and a touch panel, the lecture hall that records every class, the arena's LED ribbon boards, the airport paging system, and the hospital's patient-education displays are all commercial AV.</p>

<h3>Where commercial AV lives</h3>
<p>The industry is organized by <b>vertical markets</b>. Each has its own buyers, budgets, standards and habits.</p>
<table>
<tr><th>Market</th><th>Typical systems</th></tr>
<tr><td>Corporate</td><td>Conference rooms, Microsoft Teams / Zoom Rooms, boardrooms, town halls, lobby video walls, digital signage</td></tr>
<tr><td>Education</td><td>Classroom displays, lecture capture, hybrid classrooms, auditoriums, assistive listening</td></tr>
<tr><td>Government &amp; military</td><td>Council chambers, courtrooms, command centers, secure spaces with strict IT rules</td></tr>
<tr><td>Healthcare</td><td>Telehealth carts, operating-room video routing, simulation labs, patient TV</td></tr>
<tr><td>Hospitality &amp; venues</td><td>Divisible ballrooms, background music, paging, stadium and arena displays</td></tr>
<tr><td>Houses of worship</td><td>Speech and music reinforcement, image magnification (IMAG), live streaming</td></tr>
<tr><td>Retail &amp; DOOH</td><td>Digital signage, video walls, experiential installations, background music</td></tr>
<tr><td>Live events (rental &amp; staging)</td><td>Concert and corporate event sound, LED walls, projection, show control</td></tr>
</table>

<h3>Commercial vs. residential vs. broadcast</h3>
<ul>
<li><b>Residential</b> (home theater, whole-home audio): one decision-maker, consumer gear is often fine.</li>
<li><b>Broadcast</b> (TV production): governed by SMPTE standards, frame-accurate timing, SDI and SMPTE ST 2110.</li>
<li><b>Commercial</b> sits in between: many users with every skill level, systems that must work every time for someone who has never seen the room before, gear that lives on a corporate network, building codes to meet, and a 5–10 year service life.</li>
</ul>
<div class="callout tip"><b>The prime directive:</b> “It works every time, for anyone who walks in.” In commercial AV, reliability and simplicity beat features.</div>

<h3>The pillars</h3>
<p>Almost everything you'll learn falls under <b>audio</b>, <b>video</b>, <b>control</b>, and the <b>network and infrastructure</b> that tie them together. Wrapped around those technical pillars are the <b>process</b> (how projects are designed, installed and verified) and the <b>business</b> (how the work is sold and paid for). This course follows that structure.</p>
`
    },
    {
      title: 'Who’s who: the AV ecosystem',
      html: `
<p>A single conference room can involve a dozen companies. Knowing who does what is the fastest way to make sense of the industry.</p>
<div class="flow"><span>Manufacturer</span><b>→</b><span>Distributor / Rep</span><b>→</b><span>Integrator</span><b>→</b><span>End user</span></div>
<p class="muted small">…with consultants, architects, engineers, contractors and IT all influencing the design.</p>

<table>
<tr><th>Player</th><th>What they do</th></tr>
<tr><td><b>Manufacturers</b></td><td>Design and build the products (microphones, DSPs, displays, control processors, cameras). Many also offer design support, training and certification.</td></tr>
<tr><td><b>Manufacturers' reps</b></td><td>Independent firms that represent several non-competing brands in a region, provide demos and help with designs.</td></tr>
<tr><td><b>Distributors</b></td><td>Stock and ship product, offer credit terms and logistics to integrators.</td></tr>
<tr><td><b>Integrators</b> (AV contractors)</td><td>Sell, engineer, install, program, commission and service systems. Range from two-person shops to global firms.</td></tr>
<tr><td><b>Consultants</b></td><td>Independent designers hired by the owner. They write the design and specifications but don't sell equipment, so their advice is vendor-neutral.</td></tr>
<tr><td><b>End users / technology managers</b></td><td>The owner's AV or IT team who live with the systems: standards, help desk, refresh cycles.</td></tr>
<tr><td><b>Architects, MEP engineers, GC</b></td><td>Design and build the building. AV must coordinate with them for power, conduit, backboxes, ceilings, HVAC noise and lighting.</td></tr>
<tr><td><b>Rental &amp; staging companies</b></td><td>Own gear inventories and provide crews for events and tours.</td></tr>
<tr><td><b>Managed service providers</b></td><td>Monitor, support and maintain systems after installation, often for a monthly fee.</td></tr>
</table>

<h3>How projects get delivered</h3>
<ul>
<li><b>Design-bid-build:</b> A consultant designs the system, several integrators bid on the documents, and usually the lowest qualified bid wins. Common in government, education and large construction projects.</li>
<li><b>Design-build:</b> One integrator designs and installs. Faster and more flexible, and the integrator carries the design responsibility.</li>
<li><b>Negotiated / sole-source:</b> The owner works directly with a trusted integrator, often under a standards program or master agreement.</li>
<li><b>As-a-service (AVaaS) and managed services:</b> The owner pays a recurring fee for equipment, support, or both, instead of a large upfront purchase.</li>
</ul>
<div class="callout"><b>Why it matters:</b> Who wrote the design changes who's responsible when something doesn't work. On a design-bid-build job, the integrator builds what's drawn and raises a <i>Request for Information (RFI)</i> when the drawings are unclear.</div>
`
    },
    {
      title: 'Organizations, standards & certifications',
      html: `
<h3>AVIXA</h3>
<p><b>AVIXA</b> (the Audiovisual and Integrated Experience Association, known as <i>InfoComm International</i> until 2017) is the industry's main trade association. It runs the <b>InfoComm</b> show in the United States, co-owns <b>ISE</b> (Integrated Systems Europe, held in Barcelona), publishes market research, writes ANSI-accredited standards and administers the core certifications:</p>
<ul>
<li><b>CTS</b> — Certified Technology Specialist (general AV knowledge)</li>
<li><b>CTS-D</b> — Design specialty</li>
<li><b>CTS-I</b> — Installation specialty</li>
</ul>

<h3>Key AVIXA / ANSI standards</h3>
<table>
<tr><th>Standard</th><th>What it covers</th></tr>
<tr><td>ANSI/AVIXA V202.01 (DISCAS)</td><td>Display Image Size for 2D Content in Audiovisual Systems — how big an image must be for viewers to read it</td></tr>
<tr><td>ANSI/INFOCOMM 3M-2011</td><td>Projected image system contrast ratio</td></tr>
<tr><td>ANSI/AVIXA A102.01</td><td>Audio coverage uniformity in listener areas</td></tr>
<tr><td>ANSI/AVIXA 10:2013</td><td>AV systems performance verification (the commissioning checklist standard)</td></tr>
<tr><td>ANSI/INFOCOMM 2M-2010</td><td>Design and coordination processes for AV systems</td></tr>
<tr><td>ANSI/INFOCOMM F501.01</td><td>Cable labeling for AV systems</td></tr>
</table>

<h3>Other bodies you'll run into</h3>
<ul>
<li><b>AES</b> (Audio Engineering Society): audio standards such as AES3 and AES67.</li>
<li><b>SMPTE</b>: broadcast video standards (SDI, ST 2110).</li>
<li><b>HDMI Forum / HDMI LA</b> and <b>VESA</b> (DisplayPort): display interfaces.</li>
<li><b>HDBaseT Alliance</b>, <b>SDVoE Alliance</b>, <b>AIMS</b> (IPMX): signal transport ecosystems.</li>
<li><b>IEEE</b>: Ethernet (802.3), Power over Ethernet, AVB/TSN (802.1).</li>
<li><b>TIA</b> and <b>BICSI</b>: structured cabling standards (TIA-568) and the RCDD credential.</li>
<li><b>NFPA</b>: the National Electrical Code (NFPA 70) and fire alarm / mass notification (NFPA 72).</li>
<li><b>ADA</b>: in the US, the ADA Standards require assistive listening systems in many assembly areas.</li>
</ul>

<h3>Manufacturer training</h3>
<p>Most platforms have their own certification tracks — for example Audinate's Dante Certification (Levels 1–3), Q-SYS Levels 1 and 2, Crestron, Extron, Biamp, and Shure. Several entry-level courses are free online, and they're often the fastest way to become useful on a job site.</p>
`
    },
    {
      title: 'Careers & roles',
      html: `
<p>AV is a skills-based industry with many entry points. You can come in through electrical work, IT, live sound, broadcast, music, or straight out of school.</p>
<table>
<tr><th>Role</th><th>What they do</th><th>Core skills</th></tr>
<tr><td>Installer / field technician</td><td>Mount gear, pull and terminate cable, build racks</td><td>Tools, safety, neat work, reading drawings</td></tr>
<tr><td>Lead tech / site lead</td><td>Run the crew on site and coordinate with other trades</td><td>Leadership, troubleshooting, scheduling</td></tr>
<tr><td>Commissioning / systems tech</td><td>Configure DSPs and network gear, tune audio, verify the system</td><td>Signal flow, networking, measurement</td></tr>
<tr><td>Control programmer</td><td>Write control code and design touch-panel interfaces</td><td>Programming logic, protocols, UX</td></tr>
<tr><td>Design engineer</td><td>Turn needs into drawings, BOMs and specs</td><td>Standards, CAD/Revit, acoustics, video math</td></tr>
<tr><td>Project manager</td><td>Own scope, schedule, budget and the customer relationship</td><td>Organization, communication, contracts</td></tr>
<tr><td>Estimator / sales engineer</td><td>Price systems, write proposals, support sales</td><td>Product knowledge, labor estimating</td></tr>
<tr><td>Account manager</td><td>Find and grow customers</td><td>Relationships, needs discovery</td></tr>
<tr><td>Service technician</td><td>Repair, maintain and support live systems</td><td>Diagnosis, customer service</td></tr>
<tr><td>AV / technology manager (end user)</td><td>Run AV for a campus or company: standards, support, budgets</td><td>IT fluency, vendor management</td></tr>
</table>
<div class="callout tip"><b>A common path:</b> installer → lead tech → commissioning or programming → design or project management. Earn your CTS early, add Dante and a DSP platform certification, and learn basic networking. AV/IT convergence makes network skills one of the most valuable things you can have.</div>
`
    }
  ],
  quiz: [
    { q: 'Which organization administers the CTS, CTS-D and CTS-I certifications?', o: ['AVIXA', 'AES', 'SMPTE', 'BICSI'], a: 0, e: 'AVIXA (formerly InfoComm International) runs the CTS family of certifications.' },
    { q: 'In a design-bid-build project, who usually produces the design documents?', o: ['The winning integrator', 'An independent AV consultant', 'The manufacturer', 'The distributor'], a: 1, e: 'In design-bid-build, a consultant designs the system and integrators bid on the finished documents.' },
    { q: 'What is the top design priority that sets commercial AV apart from many residential systems?', o: ['Maximum feature count', 'The lowest possible price', 'Reliable operation by non-technical users, every time', 'Using only consumer-grade gear'], a: 2, e: 'Commercial rooms serve many users of varying skill, so systems must be simple and dependable.' },
    { q: 'A firm that represents several non-competing manufacturers in a region is a…', o: ['Consultant', 'Manufacturers’ rep', 'Managed service provider', 'General contractor'], a: 1, e: 'Rep firms provide regional sales, demos and design support for the lines they carry.' },
    { q: 'ANSI/AVIXA V202.01 (DISCAS) is about…', o: ['Cable labeling', 'Display image size for 2D content', 'Audio coverage uniformity', 'Network security'], a: 1, e: 'DISCAS is the standard for sizing displays so viewers can read the content.' },
    { q: 'When drawings on a bid project are unclear, the integrator should…', o: ['Guess and keep going', 'Submit an RFI', 'Change the design', 'Stop work permanently'], a: 1, e: 'A Request for Information asks the designer to clarify the documents in writing.' },
    { q: 'Which standard covers AV system performance verification (commissioning)?', o: ['ANSI/AVIXA 10:2013', 'TIA-568', 'NFPA 72', 'ANSI/INFOCOMM 3M-2011'], a: 0, e: 'ANSI/AVIXA 10:2013 defines verification items to check across the life of an AV project.' },
    { q: 'Which certification is a prerequisite path toward CTS-D and CTS-I?', o: ['RCDD', 'CTS', 'CCNA', 'Dante Level 3'], a: 1, e: 'The general CTS comes first, and the D and I specialties build on it.' },
    { q: 'Which body publishes the TIA-568 family of cabling standards?', o: ['AVIXA', 'TIA', 'VESA', 'AES'], a: 1, e: 'The Telecommunications Industry Association publishes TIA-568. BICSI builds training and the RCDD credential around this kind of practice.' },
    { q: 'What best describes the consultant’s relationship to equipment sales?', o: ['They earn margin on equipment', 'They are vendor-neutral and don’t sell equipment', 'They work for a manufacturer', 'They are the distributor'], a: 1, e: 'Independent consultants are paid for design, which keeps their recommendations unbiased.' }
  ]
});

AV.modules.push({
  id: 'fundamentals',
  icon: '📐',
  title: 'AV Fundamentals',
  level: 'Core',
  summary: 'Signal flow, electricity, decibels, digital audio and video, and the physics of sound and light.',
  lessons: [
    {
      title: 'Signal flow: the most important idea in AV',
      html: `
<p>Every AV system, from a single speaker to a stadium, is a chain:</p>
<div class="flow"><span>Source</span><b>→</b><span>Processing</span><b>→</b><span>Distribution</span><b>→</b><span>Destination</span></div>
<p>…with <b>control</b> layered on top, telling everything what to do.</p>
<table>
<tr><th>Stage</th><th>Audio examples</th><th>Video examples</th></tr>
<tr><td>Source</td><td>Microphones, laptops, media players, the far end of a call</td><td>Laptops, cameras, PCs, streaming players</td></tr>
<tr><td>Processing</td><td>Mixer / DSP: EQ, dynamics, echo cancellation, routing</td><td>Switchers, scalers, video wall processors</td></tr>
<tr><td>Distribution</td><td>Amplifiers, Dante network, speaker cable</td><td>HDBaseT extenders, AV-over-IP, fiber</td></tr>
<tr><td>Destination</td><td>Loudspeakers, recorders, the far end of a call</td><td>Displays, projectors, recorders, streams</td></tr>
</table>

<h3>Reading a signal flow diagram</h3>
<ul>
<li>Signals usually flow <b>left to right</b>: sources on the left, destinations on the right.</li>
<li>Each line is a signal path, labeled with its <b>cable number</b> and type.</li>
<li>Line styles often tell you the signal type: audio, video, control, network.</li>
<li>Boxes show <b>every input and output used</b>, so you can trace any signal from end to end.</li>
</ul>
<div class="callout tip"><b>Troubleshooting superpower:</b> Follow the signal. Test halfway down the chain. If the signal is good there, the problem is downstream. If it's bad, the problem is upstream. Repeat. This “divide and conquer” approach finds most faults in minutes.</div>
<p>Try putting real-world chains in order:</p>
<div data-widget="chain"></div>
`
    },
    {
      title: 'Electricity basics for AV',
      html: `
<p>You don't need to be an electrician, but you do need four relationships:</p>
<table>
<tr><th>Law</th><th>Formula</th><th>Plain English</th></tr>
<tr><td>Ohm's law</td><td><code>V = I × R</code></td><td>Voltage = current × resistance</td></tr>
<tr><td>Power law</td><td><code>P = V × I</code></td><td>Power (watts) = voltage × current</td></tr>
<tr><td>Combined</td><td><code>P = V² / R = I² × R</code></td><td>Useful for amplifiers and loudspeakers</td></tr>
</table>
<p><b>Impedance (Z)</b> is resistance to alternating current, and it changes with frequency. A loudspeaker labeled “8 Ω” has a <i>nominal</i> impedance. Its real impedance varies across the audio band.</p>

<h3>Low output, high input (“bridging”)</h3>
<p>Line-level audio outputs have low impedance (tens to a few hundred ohms) and inputs have high impedance (often 10 kΩ or more). That mismatch is deliberate: one output can feed several inputs without losing level. Amplifier-to-speaker connections are different, because there power transfer matters and the load impedance sets how hard the amp works.</p>

<h3>Balanced vs. unbalanced audio</h3>
<ul>
<li><b>Unbalanced</b> (RCA, ¼" TS): one signal conductor plus a shield/ground. Noise picked up along the cable is heard. Keep runs short.</li>
<li><b>Balanced</b> (XLR, TRS, Euroblock): two conductors carry the signal in opposite polarity, plus a shield. The input amplifies only the <i>difference</i>, so noise induced equally on both wires cancels out. This is called <b>common-mode rejection</b>. Commercial installs use balanced lines almost everywhere.</li>
</ul>

<h3>Ground loops</h3>
<p>When equipment is grounded through more than one path at different potentials, current flows in cable shields and you hear <b>hum</b> at the mains frequency (60 Hz in North America, 50 Hz in much of the world) and its harmonics. Fixes include proper single-point bonding, balanced connections, isolation transformers, and correct shield termination.</p>
<div class="callout warn"><b>Never</b> remove or defeat the safety ground on a power cord to stop hum. It can make equipment chassis lethal in a fault.</div>
<div data-widget="ohms"></div>
`
    },
    {
      title: 'Decibels without fear',
      html: `
<p>The <b>decibel (dB)</b> is a ratio on a logarithmic scale. AV uses it constantly because our hearing and our signals span enormous ranges. A logarithmic scale compresses a millionfold pressure range into about 120 dB.</p>
<table>
<tr><th>Quantity type</th><th>Formula</th><th>Doubling equals</th></tr>
<tr><td>Power (watts, intensity)</td><td><code>10 × log10(P2/P1)</code></td><td>+3 dB</td></tr>
<tr><td>Voltage, current, sound pressure</td><td><code>20 × log10(V2/V1)</code></td><td>+6 dB</td></tr>
</table>

<h3>Rules of thumb</h3>
<ul>
<li><b>+3 dB</b> = double the power. <b>+10 dB</b> = 10× the power, and it sounds roughly twice as loud.</li>
<li><b>+6 dB</b> = double the voltage or sound pressure.</li>
<li><b>Inverse square law:</b> from a point source in free space, level drops <b>6 dB for each doubling of distance</b>. A line source in its near field drops about 3 dB per doubling.</li>
<li>Two identical uncorrelated sources add <b>+3 dB</b>, not double the number.</li>
<li>About <b>1 dB</b> is a just-noticeable difference under careful listening. In everyday conditions, 3 dB is clearly noticeable.</li>
</ul>

<h3>dB with a reference (“dB-something”)</h3>
<table>
<tr><th>Unit</th><th>Reference (0 dB =)</th><th>Used for</th></tr>
<tr><td>dB SPL</td><td>20 µPa sound pressure</td><td>Acoustic loudness</td></tr>
<tr><td>dBu</td><td>0.775 V rms</td><td>Pro audio line levels (+4 dBu nominal = 1.228 V)</td></tr>
<tr><td>dBV</td><td>1.0 V rms</td><td>Consumer line levels (−10 dBV nominal = 0.316 V)</td></tr>
<tr><td>dBFS</td><td>Digital full scale</td><td>Digital meters. 0 dBFS is the maximum, so everything else is negative.</td></tr>
<tr><td>dBm</td><td>1 milliwatt</td><td>RF and telecom power</td></tr>
</table>
<p>Pro (+4 dBu) and consumer (−10 dBV) levels differ by about <b>11.8 dB</b>. That's why plugging a consumer device into a pro input can sound weak, and why interfaces have level switches.</p>

<h3>Typical sound pressure levels</h3>
<table>
<tr><th>Situation</th><th>Approx. dB SPL</th></tr>
<tr><td>Quiet conference room background</td><td>30–40</td></tr>
<tr><td>Normal conversation at 1 m</td><td>~60</td></tr>
<tr><td>Busy restaurant</td><td>~75–85</td></tr>
<tr><td>Loud concert near the stage</td><td>105–115</td></tr>
<tr><td>Threshold of pain</td><td>~120–130</td></tr>
</table>
<div data-widget="db"></div>
`
    },
    {
      title: 'Analog, digital & latency',
      html: `
<h3>Sampling</h3>
<p>An analog-to-digital converter (ADC) measures the signal thousands of times per second. Two numbers define the result:</p>
<ul>
<li><b>Sample rate:</b> how often the signal is measured. The <b>Nyquist theorem</b> says the highest frequency you can capture is half the sample rate. <b>48 kHz</b> is the standard in pro AV and video (44.1 kHz is the CD rate), and 96 kHz is used in some systems.</li>
<li><b>Bit depth:</b> how finely each sample is measured. Each bit adds about <b>6 dB</b> of dynamic range, so 16-bit gives about 96 dB and 24-bit about 144 dB in theory. 24-bit is standard in pro systems.</li>
</ul>

<h3>Uncompressed vs. compressed</h3>
<p>Uncompressed signals keep every bit but use a lot of bandwidth. <b>Codecs</b> reduce bandwidth:</p>
<ul>
<li><b>Lossless</b> compression reconstructs the original exactly.</li>
<li><b>Lossy</b> compression discards information people are unlikely to notice. Audio examples are AAC and Opus. Video examples are H.264, H.265/HEVC and AV1.</li>
<li><b>Mezzanine / light</b> compression (such as JPEG XS or VESA DSC) uses modest ratios with very low latency and is effectively visually lossless. It's popular for AV-over-IP and high-resolution links.</li>
</ul>

<h3>Latency</h3>
<p>Every conversion, processing block, network buffer and codec adds delay. Latency matters because:</p>
<ul>
<li>Live sound reinforcement needs very low latency, or talkers hear themselves late and the sound feels disconnected.</li>
<li><b>Lip sync:</b> audio and video must arrive together. People notice audio arriving early more readily than audio arriving late. ITU guidance puts detectability around 45 ms early to 125 ms late.</li>
<li>Interactive uses such as a mouse over AV-over-IP, or KVM, feel sluggish beyond a frame or two of delay.</li>
</ul>
<div class="callout"><b>Design habit:</b> Add up the latency of every device in the path, and use audio delay blocks to re-align audio to video where needed.</div>
`
    },
    {
      title: 'The physics of sound and light',
      html: `
<h3>Sound</h3>
<ul>
<li>Sound travels about <b>343 m/s (1,125 ft/s)</b> in air at room temperature. That's roughly 1 ft per millisecond, a handy number for delay alignment.</li>
<li><b>Wavelength = speed ÷ frequency.</b> 20 Hz ≈ 17 m (56 ft), 1 kHz ≈ 34 cm (13 in), 20 kHz ≈ 1.7 cm. Long low-frequency waves bend around objects and are hard to absorb, which is why bass “leaks” through walls.</li>
<li>Human hearing spans about <b>20 Hz–20 kHz</b>. Speech fundamentals sit around 100–250 Hz, but <b>intelligibility</b> lives in the consonants, roughly 1–4 kHz.</li>
<li>Frequency is often described in <b>octaves</b> (each a doubling of frequency) and fractional-octave bands (1/3 octave) when measuring and equalizing.</li>
</ul>

<h3>Light</h3>
<table>
<tr><th>Measure</th><th>Unit</th><th>What it describes</th></tr>
<tr><td>Luminous flux</td><td>Lumens (lm)</td><td>Total light output of a source, such as a projector</td></tr>
<tr><td>Illuminance</td><td>Lux (lm/m²) or foot-candles (lm/ft²)</td><td>Light falling on a surface, such as room light hitting a screen. 1 fc ≈ 10.76 lux</td></tr>
<tr><td>Luminance</td><td>Nits (cd/m²) or foot-lamberts (fL)</td><td>Brightness of a surface as seen by the eye, such as a display. 1 fL ≈ 3.426 nits</td></tr>
</table>
<ul>
<li>Flat panels are rated in <b>nits</b>. Projectors are rated in <b>lumens</b> (ISO 21118 is the common rating method). Rooms are measured in <b>lux or foot-candles</b>.</li>
<li>Typical office lighting is about 300–500 lux. Indoor commercial displays run roughly 350–700 nits. Window-facing and outdoor displays run 2,500 nits and up.</li>
<li><b>Color temperature</b> is measured in kelvin: about 3000 K is warm, and 5000–6500 K is daylight. Video white is D65, about 6500 K. For people on camera, light with a high color rendering index (CRI 90+) makes skin tones look natural.</li>
</ul>
<div class="callout tip">Ambient light is the enemy of contrast. The same projector that looks stunning in a dark room can look washed out with the lights on. See the Video module's projection lesson for the math.</div>
`
    }
  ],
  quiz: [
    { q: 'Signal flow diagrams conventionally show signals moving…', o: ['Right to left', 'Left to right', 'Bottom to top', 'In no particular direction'], a: 1, e: 'Sources sit on the left and destinations on the right.' },
    { q: 'Doubling the power into a loudspeaker raises its output by about…', o: ['+1 dB', '+3 dB', '+6 dB', '+10 dB'], a: 1, e: 'Power ratios use 10·log, and 10·log(2) ≈ 3 dB.' },
    { q: 'Moving from 2 m to 4 m from a point source in free field, the level changes by about…', o: ['−3 dB', '−6 dB', '−10 dB', '−12 dB'], a: 1, e: 'Inverse square law: −6 dB per doubling of distance.' },
    { q: 'What is the reference voltage for dBu?', o: ['1.0 V', '0.775 V', '1.228 V', '0.316 V'], a: 1, e: '0 dBu = 0.775 V rms. +4 dBu ≈ 1.228 V.' },
    { q: 'Why do balanced audio lines reject noise?', o: ['They use thicker copper', 'The input amplifies the difference between two opposite-polarity conductors, so common noise cancels', 'They operate at higher voltage', 'They are digital'], a: 1, e: 'Noise is induced equally on both conductors and is rejected by the differential input (common-mode rejection).' },
    { q: 'At a 48 kHz sample rate, the highest frequency that can be captured is…', o: ['48 kHz', '24 kHz', '20 kHz', '96 kHz'], a: 1, e: 'Nyquist: the maximum frequency is half the sample rate.' },
    { q: 'Each bit of digital audio resolution adds roughly how much dynamic range?', o: ['1 dB', '3 dB', '6 dB', '10 dB'], a: 2, e: 'About 6 dB per bit, so 24-bit ≈ 144 dB in theory.' },
    { q: 'Which unit describes how bright a flat-panel display is?', o: ['Lumens', 'Lux', 'Nits (cd/m²)', 'Kelvin'], a: 2, e: 'Luminance of an emitting surface is measured in nits. Projectors are rated in lumens.' },
    { q: 'Sound travels roughly how far in one millisecond?', o: ['1 inch', '1 foot', '1 meter', '10 feet'], a: 1, e: 'About 1.1 ft per ms. That makes delay-alignment math quick.' },
    { q: 'Hum at 60 Hz plus harmonics in a North American install most often points to…', o: ['A bad DSP firmware', 'A ground loop', 'Wrong sample rate', 'HDCP failure'], a: 1, e: 'Ground loops cause current to flow in shields, producing mains-frequency hum.' },
    { q: 'The safe way to eliminate hum is to…', o: ['Cut the ground pin off the power cord', 'Use balanced connections, isolation, and correct shield/bonding practice', 'Turn the volume down', 'Use longer cables'], a: 1, e: 'Never defeat a safety ground. Fix the grounding scheme instead.' },
    { q: 'Pro line level (+4 dBu) vs. consumer level (−10 dBV) differ by about…', o: ['4 dB', '6 dB', '11.8 dB', '20 dB'], a: 2, e: '+4 dBu ≈ 1.228 V and −10 dBV ≈ 0.316 V, a ratio of about 11.8 dB.' }
  ]
});
