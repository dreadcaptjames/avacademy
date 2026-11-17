/* Signal Path — Module content: Audio */
AV.modules.push({
  id: 'audio',
  icon: '🎙️',
  title: 'Audio Systems',
  level: 'Core',
  summary: 'Microphones, DSP, gain structure, amplifiers, 70 V systems, loudspeakers, acoustics and feedback control.',
  lessons: [
    {
      title: 'Microphones',
      html: `
<h3>Transducer types</h3>
<table>
<tr><th>Type</th><th>How it works</th><th>Strengths</th><th>Typical use</th></tr>
<tr><td>Dynamic</td><td>A coil moves in a magnetic field</td><td>Rugged, handles high SPL, no power needed</td><td>Handheld vocal, lecterns, loud sources</td></tr>
<tr><td>Condenser</td><td>A charged diaphragm changes capacitance</td><td>Sensitive and detailed, can be very small</td><td>Lavaliers, goosenecks, boundary and ceiling mics</td></tr>
<tr><td>Ribbon</td><td>A thin metal ribbon in a magnetic field</td><td>Smooth sound</td><td>Studios, rarely seen in installs</td></tr>
</table>
<p>Condensers need power, usually <b>phantom power</b> (+48 V DC sent down the same balanced cable from the mixer or DSP input).</p>

<h3>Polar patterns</h3>
<ul>
<li><b>Omnidirectional:</b> picks up equally in all directions. Natural sound, but more room noise and more feedback risk.</li>
<li><b>Cardioid:</b> heart-shaped, rejects sound from the rear. The workhorse pattern.</li>
<li><b>Supercardioid / hypercardioid:</b> tighter at the front, with a small rear lobe.</li>
<li><b>Figure-8 (bidirectional):</b> front and back, rejects the sides.</li>
<li><b>Beamforming / steerable:</b> arrays of many capsules whose DSP forms “lobes” that point at talkers. These are common in ceiling microphone arrays.</li>
</ul>

<h3>Form factors in commercial rooms</h3>
<table>
<tr><th>Form</th><th>Where</th><th>Watch out for</th></tr>
<tr><td>Gooseneck</td><td>Lecterns, council chambers</td><td>Talkers who drift off-axis</td></tr>
<tr><td>Boundary (table)</td><td>Conference tables</td><td>Paper and keyboard noise, getting covered</td></tr>
<tr><td>Ceiling array</td><td>Clean-table meeting rooms</td><td>Ceiling height, HVAC noise, room reverberation</td></tr>
<tr><td>Lavalier / headset</td><td>Presenters, worship, training</td><td>Placement, clothing noise, batteries</td></tr>
<tr><td>Handheld</td><td>Q&amp;A, events</td><td>People who hold it at their waist</td></tr>
</table>

<h3>Wireless microphones</h3>
<ul>
<li>Analog and digital systems operate in UHF TV-band spectrum, in license-free DECT / 1.9 GHz bands, or at 2.4 GHz. Each has trade-offs in range, channel count and interference.</li>
<li>The available UHF spectrum has shrunk in many countries as TV bands were reallocated to mobile carriers. Always check local rules and <b>coordinate frequencies</b> with a scan before an event.</li>
<li>Use proper antenna placement (line of sight, antenna distribution, directional antennas for large spaces) and a charging and battery plan.</li>
</ul>
<div class="callout tip"><b>The #1 microphone rule:</b> get the mic close to the source. Halving the distance to the talker raises their level about 6 dB while the room noise stays put. No DSP can beat good placement.</div>
`
    },
    {
      title: 'Mixers, DSP & processing',
      html: `
<p>In modern installs, the “mixer” is usually a <b>DSP</b> (digital signal processor): a box or software platform where you build the signal flow from processing blocks. Common platforms include Q-SYS, Biamp Tesira, BSS, Symetrix and Shure IntelliMix, and many conferencing products have DSP built in.</p>
<table>
<tr><th>Block</th><th>What it does</th></tr>
<tr><td>Input gain / preamp</td><td>Brings mic-level signals up to line level. It's the most important gain setting in the system.</td></tr>
<tr><td>High-pass filter</td><td>Removes rumble, handling noise and HVAC low end. Use it on almost every speech mic (around 80–120 Hz).</td></tr>
<tr><td>Parametric EQ</td><td>Shapes tone. Each band has frequency, gain and bandwidth (Q).</td></tr>
<tr><td>Compressor / limiter</td><td>Reduces dynamic range. A limiter sets a hard ceiling that protects loudspeakers and keeps levels predictable.</td></tr>
<tr><td>Gate / expander</td><td>Turns down signals below a threshold to reduce background noise.</td></tr>
<tr><td>Automixer</td><td>Manages many open mics. <i>Gain-sharing</i> automixers distribute gain smoothly. <i>Gated</i> automixers turn mics on and off. Both limit the <b>number of open mics (NOM)</b>, which improves gain before feedback and reduces noise.</td></tr>
<tr><td>AEC (acoustic echo cancellation)</td><td>Removes the far-end audio that the room speakers play into the room mics, so remote callers don't hear themselves.</td></tr>
<tr><td>Feedback suppression</td><td>Detects ringing frequencies and inserts narrow notch filters.</td></tr>
<tr><td>Delay</td><td>Time-aligns speaker zones and audio to video.</td></tr>
<tr><td>Matrix mixer / router</td><td>Sends any input to any output at independent levels: room speakers, program feed, record, far end.</td></tr>
<tr><td>Crossover</td><td>Splits frequency bands between subwoofers and full-range speakers.</td></tr>
<tr><td>Ducker</td><td>Automatically lowers background music when a page or voice signal is present.</td></tr>
</table>

<h3>How AEC works (and how it breaks)</h3>
<p>The AEC needs a <b>reference</b>: a copy of exactly what's being sent to the room loudspeakers from the far end. It learns how that sound arrives back at each microphone and subtracts it. Common causes of echo:</p>
<ul>
<li>Wrong reference signal selected, such as a reference that includes local mics.</li>
<li>Nonlinear processing after the reference point, such as a speaker clipping or a limiter on the speaker path after the reference tap.</li>
<li>Loudspeakers so loud that the mics clip.</li>
<li>Remember: the room with the AEC problem is usually the room that <i>doesn't</i> hear the echo. Remote people hear their own voice coming back from your room.</li>
</ul>

<h3>Gain structure</h3>
<p>Gain structure means setting the level at every stage so the signal sits well above the noise floor and well below clipping. The classic approach:</p>
<ol>
<li>Set <b>preamp gain</b> so normal speech peaks around −20 to −12 dBFS, leaving headroom for loud talkers.</li>
<li>Keep processing blocks and faders near <b>unity (0 dB)</b>.</li>
<li>Set DSP output levels so the amplifier reaches full power just before the DSP output would clip.</li>
<li>Use the <b>amplifier input attenuator</b> to set the maximum loudness, not to fix earlier gain mistakes.</li>
</ol>
<div data-widget="gain"></div>
`
    },
    {
      title: 'Amplifiers & 70 V / 100 V systems',
      html: `
<h3>Low-impedance (direct) systems</h3>
<p>Speakers connect directly to the amplifier at 2, 4 or 8 Ω. This gives the best fidelity and efficiency and is used for performance spaces, subwoofers, line arrays and high-quality meeting room audio.</p>
<ul>
<li>Parallel wiring <b>lowers</b> the total impedance. Two 8 Ω speakers in parallel make 4 Ω. Don't go below the amp's rated minimum load.</li>
<li>Series wiring <b>adds</b> impedances, but one failed speaker silences the whole string.</li>
<li>Long runs need heavy-gauge cable to avoid power loss.</li>
</ul>
<div data-widget="impedance"></div>

<h3>Constant-voltage (70 V / 100 V) distributed systems</h3>
<p>When you need many speakers spread over a large area (offices, retail, schools, paging), use a <b>constant-voltage</b> system. The amplifier produces a fixed maximum voltage at full power: <b>70.7 V</b> (“70 V”, common in North America), <b>100 V</b> (common in Europe and Asia), or 25 V in some code-driven applications. Each speaker has a transformer with <b>power taps</b> (for example ½, 1, 2, 4 or 8 W).</p>
<ul>
<li><b>Design rule:</b> add up all the taps on a line and keep the total at or below about <b>80% of the amplifier's rated power</b>. The margin covers transformer losses and inaccuracies.</li>
<li>Pros: dozens of speakers daisy-chained on one pair, long runs on thinner wire, easy level setting per speaker, and simple math.</li>
<li>Cons: transformers add cost and slight loss, and they <b>saturate at low frequencies</b>. Always apply a high-pass filter (often 70–100 Hz or higher, per the speaker spec).</li>
<li>The effective load impedance of a line is <code>Z = V² ÷ P</code>. For example, 70.7 V into 100 W of taps ≈ 50 Ω.</li>
</ul>
<div data-widget="seventy"></div>

<h3>Amplifier details</h3>
<ul>
<li><b>Class D</b> (switching) amplifiers dominate installs because they're efficient and run cool. Multichannel units can power many zones in one rack space.</li>
<li>Many amps offer <b>DSP, network control and Dante</b> inputs, plus power-sharing between channels.</li>
<li>Check <b>input sensitivity</b>: the input level that produces full rated output. This links the amp to your DSP gain structure.</li>
<li>Power-on order is <b>amps last on, first off</b>, to avoid loud pops through the speakers.</li>
</ul>
<div data-widget="wireloss"></div>
`
    },
    {
      title: 'Loudspeakers & coverage',
      html: `
<h3>Loudspeaker types</h3>
<table>
<tr><th>Type</th><th>Where it shines</th></tr>
<tr><td>In-ceiling</td><td>Offices, meeting rooms and classrooms with standard drop ceilings. It's the most common install speaker.</td></tr>
<tr><td>Pendant</td><td>Open ceilings such as warehouses, retail, restaurants and atriums</td></tr>
<tr><td>Surface-mount / wall</td><td>Where ceilings aren't accessible, foreground music, divisible rooms</td></tr>
<tr><td>Column / steerable arrays</td><td>Reverberant spaces such as churches, transit halls and atriums, where you need to aim sound at listeners and away from hard surfaces</td></tr>
<tr><td>Line arrays</td><td>Large venues and events that need long throw with controlled vertical coverage</td></tr>
<tr><td>Subwoofers</td><td>Low-frequency extension for music and cinema-style rooms</td></tr>
<tr><td>Horn-loaded / weather-resistant</td><td>Outdoor paging, stadiums, high-noise industrial spaces</td></tr>
</table>

<h3>Specs that matter</h3>
<ul>
<li><b>Sensitivity</b> (dB SPL at 1 W / 1 m): how loud a speaker plays for a given input. A 3 dB higher sensitivity is like doubling amplifier power.</li>
<li><b>Maximum SPL</b> and <b>power handling</b>: how loud it can get before damage or distortion.</li>
<li><b>Dispersion / coverage angle</b>: the angle where output is within 6 dB of on-axis. It's often different horizontally and vertically.</li>
<li><b>Frequency response</b>: the usable range, such as 70 Hz–20 kHz ±3 dB.</li>
</ul>
<div data-widget="spl"></div>

<h3>Laying out ceiling speakers</h3>
<p>The goal is <b>even coverage</b> at listener ear height. ANSI/AVIXA A102.01 describes measuring and specifying coverage uniformity. For distributed ceiling systems, designers use three classic spacing densities:</p>
<ul>
<li><b>Edge-to-edge:</b> coverage circles touch. Cheapest, but with uneven gaps between them. Fine for background music.</li>
<li><b>Minimum overlap:</b> the circles overlap to cover the gaps. A good choice for paging and speech.</li>
<li><b>Edge-to-center:</b> each circle reaches the next speaker's center. The most even coverage, used for critical speech such as conference rooms and mass notification.</li>
</ul>
<div data-widget="spacing"></div>
`
    },
    {
      title: 'Room acoustics & intelligibility',
      html: `
<p>The room is part of the audio system. A great sound system in a bad room still sounds bad.</p>
<h3>Key concepts</h3>
<ul>
<li><b>Reverberation time (RT60):</b> how long it takes sound to decay by 60 dB after the source stops. Hard surfaces such as glass, drywall and concrete lengthen it. Absorptive materials such as acoustic panels, carpet and ceiling tile shorten it.</li>
<li><b>Absorption</b> removes energy. <b>Diffusion</b> scatters reflections. <b>Isolation</b> keeps sound from passing between rooms, and it needs mass, airtight seals and decoupling rather than foam.</li>
<li><b>Background noise</b> from HVAC, traffic and projector fans masks speech. It's often specified as an <b>NC (noise criteria)</b> rating or in dBA.</li>
<li><b>Critical distance:</b> the distance from a source at which direct and reverberant sound are equal. Microphones should be well inside it, and listeners intelligibly reached by direct sound.</li>
<li><b>Signal-to-noise ratio</b> at the listener: speech should be clearly above the noise. A common target is 15 dB or more for good intelligibility, and more for hearing-impaired listeners.</li>
</ul>

<table>
<tr><th>Space</th><th>Typical RT60 target</th></tr>
<tr><td>Conference / video meeting room</td><td>≈ 0.4–0.6 s</td></tr>
<tr><td>Classroom</td><td>≤ 0.6 s for typical classrooms (ANSI/ASA S12.60)</td></tr>
<tr><td>Lecture hall</td><td>≈ 0.7–1.0 s</td></tr>
<tr><td>Contemporary worship</td><td>≈ 1.0–1.5 s</td></tr>
<tr><td>Concert hall (orchestral)</td><td>≈ 1.8–2.2 s</td></tr>
</table>

<h3>Measuring intelligibility</h3>
<p>The <b>Speech Transmission Index (STI)</b> rates intelligibility from 0 (unintelligible) to 1 (perfect). Around 0.60 and above is generally “good”, and emergency voice systems commonly target at least 0.50 in occupied areas. STIPA is a faster test method for STI.</p>

<h3>Assistive listening</h3>
<p>Assistive listening systems (ALS) deliver audio straight to people with hearing loss. The main technologies are <b>RF</b> (FM or digital), <b>infrared</b> (good for privacy, line of sight), <b>induction hearing loops</b> (which work directly with hearing aids' telecoil), and newer Wi-Fi and Bluetooth LE Audio (Auracast) broadcast systems. In the US, the ADA Standards set the number of receivers required by seating capacity and require a portion of them to be hearing-aid compatible.</p>
<div class="callout tip">For video meetings, acoustics matter twice. Echo and reverberation reduce intelligibility in the room, and they make AEC and noise reduction work harder for the far end. Treating a glass-walled meeting room often helps more than buying better microphones.</div>
`
    },
    {
      title: 'Feedback & gain before feedback (PAG/NAG)',
      html: `
<p><b>Feedback</b> is the squeal or ring that happens when a microphone picks up a loudspeaker, which re-amplifies it, which the mic picks up again… When the loop gain reaches unity at some frequency, it rings.</p>
<h3>What controls feedback</h3>
<ul>
<li>Distance: keep the talker close to the mic and the mic far from the loudspeakers.</li>
<li>Directivity: use directional mics and speakers aimed away from each other.</li>
<li><b>Number of open mics:</b> each doubling of NOM costs 3 dB of gain before feedback. That's why automixers matter.</li>
<li>Equalization and notch filters can recover a few dB. They don't fix bad placement.</li>
</ul>

<h3>PAG and NAG</h3>
<p>Designers predict whether a reinforcement system can work before it's built:</p>
<ul>
<li><b>NAG (Needed Acoustic Gain)</b> is how much gain is needed so the farthest listener hears the talker as if they were at the <b>equivalent acoustic distance (EAD)</b>, the distance where unamplified speech would be comfortably intelligible.<br><code>NAG = 20·log(D0) − 20·log(EAD)</code></li>
<li><b>PAG (Potential Acoustic Gain)</b> is how much gain the geometry allows before feedback:<br><code>PAG = 20·log(D0) − 20·log(Ds) + 20·log(D1) − 20·log(D2) − 10·log(NOM) − FSM</code></li>
</ul>
<table>
<tr><th>Term</th><th>Meaning</th></tr>
<tr><td>D0</td><td>Talker to farthest listener</td></tr>
<tr><td>Ds</td><td>Talker to microphone</td></tr>
<tr><td>D1</td><td>Microphone to nearest loudspeaker</td></tr>
<tr><td>D2</td><td>Loudspeaker to farthest listener</td></tr>
<tr><td>NOM</td><td>Number of open microphones</td></tr>
<tr><td>FSM</td><td>Feedback stability margin, typically 6 dB</td></tr>
</table>
<p>If <b>PAG ≥ NAG</b>, the system should be stable. Try it, and notice how much Ds (mic distance) matters:</p>
<div data-widget="pag"></div>
`
    }
  ],
  quiz: [
    { q: 'Which microphone type typically requires phantom power?', o: ['Dynamic', 'Condenser', 'Ribbon (passive)', 'None of them'], a: 1, e: 'Condensers need power for their capsule and electronics, usually +48 V phantom power.' },
    { q: 'Halving the distance between talker and microphone raises the talker’s level by about…', o: ['1 dB', '3 dB', '6 dB', '12 dB'], a: 2, e: 'Inverse square law: about 6 dB per halving of distance.' },
    { q: 'What does an AEC need in order to cancel echo?', o: ['A noise gate', 'A reference of the far-end signal being sent to the room speakers', 'Phantom power', 'A 70 V line'], a: 1, e: 'The reference tells the AEC what to subtract from the microphone signal.' },
    { q: 'Remote participants hear their own voices echo back. Where is the AEC problem most likely?', o: ['In the remote participants’ room', 'In your room, the one they hear the echo from', 'In the cloud service', 'In their headphones'], a: 1, e: 'Echo is caused by the room that sends it back. The far end hears it, not the room with the problem.' },
    { q: 'A 70 V line has taps totaling 160 W. What is the minimum amplifier rating using the 80% rule?', o: ['128 W', '160 W', '200 W', '320 W'], a: 2, e: '160 ÷ 0.8 = 200 W.' },
    { q: 'Four 8 Ω speakers wired in parallel present what load?', o: ['32 Ω', '8 Ω', '4 Ω', '2 Ω'], a: 3, e: '8 Ω ÷ 4 = 2 Ω, which is too low for many amplifiers.' },
    { q: 'Why should you apply a high-pass filter on 70 V speaker zones?', o: ['To increase bass', 'Speaker transformers saturate at low frequencies', 'It is required for Dante', 'To lower latency'], a: 1, e: 'Low-frequency energy saturates the transformers and causes distortion and wasted power.' },
    { q: 'Doubling the number of open microphones reduces gain before feedback by…', o: ['1 dB', '3 dB', '6 dB', '10 dB'], a: 1, e: '10·log(2) ≈ 3 dB, which is why automixers help.' },
    { q: 'A reinforcement system is predicted to be stable when…', o: ['NAG > PAG', 'PAG ≥ NAG', 'PAG = 0', 'NOM > 4'], a: 1, e: 'Potential gain must meet or exceed needed gain.' },
    { q: 'RT60 measures…', o: ['Time for sound to decay 60 dB', 'Maximum SPL at 60 ft', 'Noise at 60 Hz', 'Delay through a DSP'], a: 0, e: 'Reverberation time is the time for a 60 dB decay after the source stops.' },
    { q: 'Which ceiling speaker spacing gives the most uniform coverage?', o: ['Edge-to-edge', 'Minimum overlap', 'Edge-to-center', 'Random'], a: 2, e: 'Edge-to-center is the densest and most even layout.' },
    { q: 'Power-on sequencing for a sound system should be…', o: ['Amps first on, first off', 'Amps last on, first off', 'All at once', 'Order doesn’t matter'], a: 1, e: 'Turning amps on last and off first prevents speaker pops from upstream gear.' },
    { q: 'Where should preamp gain normally be set for speech?', o: ['So peaks hit 0 dBFS', 'So normal speech peaks around −20 to −12 dBFS', 'As low as possible', 'Maximum gain'], a: 1, e: 'This keeps the signal well above the noise with headroom for loud talkers.' },
    { q: 'An STI of about 0.60 or above indicates…', o: ['Unintelligible speech', 'Good intelligibility', 'Feedback', 'Clipping'], a: 1, e: 'STI runs from 0 to 1, and around 0.60+ is generally considered good.' }
  ]
});
