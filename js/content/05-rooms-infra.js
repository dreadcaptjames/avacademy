/* Signal Path — Module content: Conferencing + Infrastructure */
AV.modules.push({
  id: 'conferencing',
  icon: '📹',
  title: 'Conferencing & Collaboration',
  level: 'Applied',
  summary: 'Room types, Teams/Zoom Rooms, BYOD vs. native, cameras and meeting equity, audio pickup, and wireless presentation.',
  lessons: [
    {
      title: 'Meeting spaces & room standards',
      html: `
<table>
<tr><th>Space</th><th>Size</th><th>Typical system</th></tr>
<tr><td>Focus / phone room</td><td>1–2 people</td><td>Display, webcam or personal device, sometimes nothing at all</td></tr>
<tr><td>Huddle room</td><td>2–6</td><td>Single display plus an all-in-one <b>video bar</b> (camera, mics, speakers)</td></tr>
<tr><td>Medium conference room</td><td>6–12</td><td>Video bar or separate camera, table or ceiling mics, one or two displays, touch controller</td></tr>
<tr><td>Boardroom</td><td>12–30</td><td>Multiple cameras with speaker tracking, ceiling arrays or gooseneck mics, large displays, custom control</td></tr>
<tr><td>Training / divisible room</td><td>20–200</td><td>Partition sensors, combine and divide logic, multiple displays, presenter and audience mics</td></tr>
<tr><td>Town hall / auditorium</td><td>100+</td><td>Reinforcement, IMAG, broadcast-style camera production, streaming</td></tr>
<tr><td>Hybrid classroom</td><td>20–100</td><td>Lecture capture, instructor tracking camera, student mics, displays for remote students</td></tr>
</table>

<h3>Why organizations standardize</h3>
<p>Large organizations define <b>room standards</b>: a small number of room types, each with a fixed bill of materials, layout, UI and support process. Standards make rooms faster to deploy, easier to support and identical for users. Expect to work from a customer's standards document on many corporate projects.</p>
<div class="callout tip">A good room standard specifies more than equipment. It covers furniture layout, camera field of view, display height, lighting, acoustics and network ports.</div>
`
    },
    {
      title: 'UC platforms: native, BYOD & BYOM',
      html: `
<h3>Native room systems</h3>
<p>A dedicated room system runs the meeting software itself:</p>
<ul>
<li><b>Microsoft Teams Rooms (MTR):</b> Windows-based (compute plus touch console) or Android-based (often all-in-one video bars). Uses Microsoft-certified peripherals.</li>
<li><b>Zoom Rooms</b>, <b>Google Meet hardware</b> and <b>Cisco Webex</b> devices are the main alternatives.</li>
<li>Users join with one touch from a calendar-integrated console. It's consistent, managed and reliable.</li>
<li>Many devices can join other platforms' meetings (for example, a Teams Room joining a Zoom meeting) through direct guest join, with some feature limits.</li>
</ul>

<h3>BYOD / BYOM</h3>
<ul>
<li><b>BYOD (bring your own device)</b> and <b>BYOM (bring your own meeting)</b>: the user's laptop runs the meeting, and the room provides camera, mics, speakers and display over a <b>USB</b> connection (often USB-C for both video and USB).</li>
<li>Pros: any platform works, and it's cheaper.</li>
<li>Cons: setup depends on the user's laptop, drivers and settings, and it's harder to support and monitor.</li>
</ul>
<div class="callout">Many organizations deploy both: native for scheduled meetings and a BYOD/USB path for external platforms, all controlled from one interface.</div>

<h3>Certification &amp; interoperability</h3>
<p>Platform certification programs test peripherals (cameras, mics, speakerphones, video bars) for audio quality, echo performance and management. Specifying certified devices protects you from many support headaches. Some older standards-based systems (SIP/H.323 codecs) still exist and join cloud meetings through interop services.</p>
`
    },
    {
      title: 'Cameras, audio pickup & meeting equity',
      html: `
<p><b>Meeting equity</b> means remote participants can see, hear and contribute as well as people in the room. It's the main design goal for modern conference rooms.</p>
<h3>Cameras</h3>
<ul>
<li>Mount cameras at roughly <b>eye level, close to the display</b>, so remote people feel looked at, not looked down on.</li>
<li><b>Field of view</b> must cover every seat without heavy distortion. Wide lenses suit small rooms. PTZ (pan-tilt-zoom) cameras suit larger rooms.</li>
<li><b>Intelligent framing:</b> auto-framing of the group, speaker tracking that switches to whoever is talking, and multi-stream “people” views that put individual faces in tiles.</li>
<li><b>Multi-camera</b> systems (front plus side cameras) capture people's faces, not their profiles, around long tables.</li>
<li><b>Content cameras</b> capture physical whiteboards.</li>
</ul>

<h3>Lighting for video</h3>
<ul>
<li>Even, diffuse <b>front lighting</b> on faces. Overhead downlights alone cause dark eye sockets.</li>
<li>Avoid bright windows behind participants, which silhouette them.</li>
<li>Keep color temperature consistent and use lights with high CRI.</li>
</ul>

<h3>Audio pickup</h3>
<ul>
<li>Choose mic coverage for the seating plan: video-bar mics for small rooms, table or ceiling mics for larger ones.</li>
<li>Coverage and AEC performance matter more than raw specs. Test with real people at the far end of the table.</li>
<li>Room acoustics directly affect what the far end hears. Hard glass rooms need treatment.</li>
<li>Speakers should cover the room evenly at conversation level without overpowering the mics.</li>
</ul>

<h3>Displays for hybrid meetings</h3>
<ul>
<li>Dual displays (people on one, content on the other) or one large display with layouts designed for rooms, such as front-row style layouts that put remote faces at eye level.</li>
<li>Size displays with DISCAS so content is readable from every seat.</li>
</ul>
`
    },
    {
      title: 'Wireless presentation & connectivity',
      html: `
<h3>Wireless presentation systems</h3>
<ul>
<li><b>Dongle- or button-based</b> systems: plug a USB button into the laptop and press to share. Very simple for guests.</li>
<li><b>App-based</b> systems: software on the laptop shares to the room receiver, often with multiple simultaneous sources.</li>
<li><b>Native protocols</b> such as AirPlay, Google Cast and Miracast let devices share without extra software, depending on the receiver.</li>
<li>Many room systems now include wireless sharing natively.</li>
</ul>
<p>Design concerns: which <b>network</b> guests connect to (keep guests off the corporate LAN), Wi-Fi congestion, discovery across VLANs (AirPlay discovery uses mDNS/Bonjour, which doesn't cross subnets without help), and security policies.</p>

<h3>Wired table connectivity</h3>
<ul>
<li>A single <b>USB-C</b> cable that carries video, USB to the room camera and mics, and laptop charging is the modern ideal.</li>
<li>Keep an <b>HDMI</b> option with retractable or cable-retention hardware for devices without USB-C.</li>
<li>Use <b>cable cubbies or retractors</b> so cables don't walk away or get damaged.</li>
<li>Extending USB beyond a few meters needs active USB extenders or HDBaseT/AV-over-IP systems with USB support.</li>
</ul>
<div class="callout tip">Test the connection with the customer's <i>actual</i> laptops. Corporate security policies, docking drivers and display settings cause more problems than the AV gear.</div>
`
    }
  ],
  quiz: [
    { q: 'An all-in-one device with camera, microphones and speakers for a small room is a…', o: ['Matrix switcher', 'Video bar', 'DSP', 'Scaler'], a: 1, e: 'Video bars integrate the core conferencing peripherals in one unit.' },
    { q: 'In a BYOD/BYOM room, what runs the meeting software?', o: ['A dedicated room PC', 'The user’s own laptop', 'The display', 'The DSP'], a: 1, e: 'The laptop runs the meeting, and the room supplies peripherals over USB.' },
    { q: 'Where should a conference camera usually be mounted?', o: ['High in a back corner', 'Near eye level, close to the display', 'Under the table', 'On the ceiling pointing down'], a: 1, e: 'This gives natural eye contact for remote participants.' },
    { q: 'What does “meeting equity” mean?', o: ['Equal room sizes', 'Remote participants can see, hear and contribute as well as in-room participants', 'Splitting costs', 'Equal display brightness'], a: 1, e: 'Equity is the central design goal of hybrid meeting rooms.' },
    { q: 'A bright window behind participants will…', o: ['Improve the image', 'Silhouette faces on camera', 'Improve AEC', 'Reduce latency'], a: 1, e: 'Backlighting makes faces dark. Light faces from the front.' },
    { q: 'Why might AirPlay discovery fail across a corporate network?', o: ['HDCP', 'mDNS/Bonjour discovery doesn’t cross subnets without extra configuration', 'PoE budget', 'EDID'], a: 1, e: 'Discovery is local-link by default and needs gateways or configuration to span VLANs.' },
    { q: 'Why do organizations create room standards?', o: ['To increase custom programming', 'Faster deployment, easier support and a consistent user experience', 'To avoid IT involvement', 'To use more vendors'], a: 1, e: 'Standards simplify everything from purchasing to training.' },
    { q: 'Platform-certified peripherals are recommended because…', o: ['They’re always cheaper', 'They’ve been tested for audio, echo and management with that platform', 'They don’t need networks', 'They remove the need for displays'], a: 1, e: 'Certification reduces compatibility and quality problems.' }
  ]
});

AV.modules.push({
  id: 'infrastructure',
  icon: '🔌',
  title: 'Cabling, Racks & Power',
  level: 'Applied',
  summary: 'Connectors and cable types, rack design and heat, power and grounding, and coordinating with the building trades.',
  lessons: [
    {
      title: 'Cables & connectors',
      html: `
<table>
<tr><th>Connector</th><th>Carries</th><th>Notes</th></tr>
<tr><td>XLR (3-pin)</td><td>Balanced mic or line audio, AES3 digital</td><td>Pin 1 shield, pin 2 hot (+), pin 3 cold (−). Locking.</td></tr>
<tr><td>¼" TRS</td><td>Balanced line, or stereo headphones</td><td>Tip, ring, sleeve</td></tr>
<tr><td>¼" TS</td><td>Unbalanced instrument / line</td><td>Tip, sleeve</td></tr>
<tr><td>RCA</td><td>Consumer unbalanced audio, composite video, S/PDIF coax</td><td>Keep runs short</td></tr>
<tr><td>Euroblock / Phoenix (captive screw)</td><td>Balanced audio, control, GPIO, sometimes speaker lines</td><td>The install standard: secure, compact, field-terminated</td></tr>
<tr><td>Speakon</td><td>Loudspeaker connections</td><td>Locking, high current</td></tr>
<tr><td>RJ45 on Cat6/6A</td><td>Ethernet, Dante, HDBaseT, AV-over-IP</td><td>Terminate to T568A or T568B and stay consistent. Test and certify.</td></tr>
<tr><td>HDMI / DisplayPort / USB-C</td><td>Digital video, audio, data</td><td>Use cable retention, certified cables and short runs</td></tr>
<tr><td>BNC</td><td>SDI video, word clock, RF</td><td>Locking bayonet coax connector</td></tr>
<tr><td>LC / SC / MPO</td><td>Fiber optic</td><td>LC duplex is most common. MPO/MTP for high-density trunks.</td></tr>
<tr><td>DB9</td><td>RS-232 control</td><td>Check the pinout for each device</td></tr>
</table>

<h3>Choosing and installing cable</h3>
<ul>
<li><b>Speaker wire gauge (AWG):</b> a lower number is thicker. Long low-impedance runs need heavy gauge (12–14 AWG), while 70 V lines tolerate thinner wire. Use the wire-loss calculator in the Audio module.</li>
<li><b>Fire ratings</b> must match the space: plenum (CMP) for air-handling spaces, riser (CMR) for vertical shafts, and general purpose (CM) elsewhere, per local code.</li>
<li><b>Separation:</b> keep signal cables away from power wiring, and cross at 90° when they must cross.</li>
<li><b>Bend radius &amp; pull tension:</b> exceeding them damages category and fiber cables invisibly.</li>
<li><b>Test everything:</b> continuity and pinout for copper, certification testers for network cabling, and light meters or OTDR for fiber.</li>
</ul>
<div class="callout tip"><b>Label both ends of every cable</b> with a unique number that matches the drawings (see ANSI/INFOCOMM F501.01). Future technicians will thank you.</div>
`
    },
    {
      title: 'Equipment racks',
      html: `
<ul>
<li>Standard AV racks use <b>19-inch</b> rails (EIA-310). Height is counted in <b>rack units (RU or U)</b>, and <b>1 RU = 1.75 in (44.45 mm)</b>.</li>
<li>Rack types: floor-standing, wall-mount, swing-out wall racks for service access, credenza and furniture-integrated racks, and slide-out or rotating rack systems.</li>
<li>Check <b>depth</b>: some amplifiers and processors are deep, and you need room behind them for cables.</li>
</ul>

<h3>Layout good practice</h3>
<ul>
<li>Put <b>heavy gear low</b> (UPS, amplifiers) for stability.</li>
<li>Group by function and signal type, and keep amplifier outputs away from sensitive mic and line inputs.</li>
<li>Plan <b>airflow</b> to match the equipment: front-to-back airflow needs a clear front intake and rear exhaust. Vent heat out of closed furniture with fans or thermostat-controlled cooling.</li>
<li>Use <b>blanking panels</b> to prevent hot exhaust from recirculating to the front.</li>
<li>Leave spare space (often 20–25%) for future equipment.</li>
<li>Include cable management, power distribution, service loops and a laptop shelf or service port.</li>
<li>Build and test racks in the shop when possible (a <b>shop build</b>), then ship them to the site. It's faster and better quality than building in place.</li>
</ul>

<h3>Heat &amp; power math</h3>
<p>Nearly every watt a device draws ends up as heat in the room. <code>BTU/hr = watts × 3.412</code>. Share heat loads with the mechanical engineer so the equipment room or closet gets enough cooling.</p>
<div data-widget="power"></div>
`
    },
    {
      title: 'Power, grounding & protection',
      html: `
<h3>Power basics for AV</h3>
<ul>
<li>In North America, typical branch circuits are 120 V at 15 A or 20 A. Many other regions use 230 V. Large amps and LED walls may need dedicated circuits or 208/230 V.</li>
<li>Electrical code limits <b>continuous loads to 80%</b> of the breaker rating, so a 20 A circuit carries about 16 A continuous.</li>
<li>Request <b>dedicated circuits</b> for AV racks and large displays, on the same electrical phase and panel where possible to minimize ground potential differences.</li>
<li><b>Isolated ground (IG)</b> receptacles, often orange or marked with a triangle, provide a separate ground conductor back to the panel. They're sometimes specified for technical power.</li>
<li><b>UPS</b> (uninterruptible power supply): protects control processors, network switches and DSPs from brief outages and lets them ride through power blips. Size for the load and the run time needed.</li>
<li><b>Surge protection</b> and power conditioning protect equipment from spikes.</li>
<li><b>Power sequencing</b> turns equipment on in order (sources and processing first, amplifiers last) and reverses it when turning off.</li>
<li>Network-managed <b>PDUs</b> allow remote reboots, which saves many service visits.</li>
</ul>

<h3>Grounding &amp; noise</h3>
<ul>
<li>Bond racks and equipment per code, and coordinate with the electrical contractor.</li>
<li>Use balanced connections and correct shield termination. The so-called “pin 1 problem” is a product design issue where shield current enters the circuit ground.</li>
<li>For stubborn hum between systems on different power, use audio isolation transformers or a different signal path such as fiber or networked audio.</li>
<li>Never “lift” the safety ground on a power cord.</li>
</ul>
<div class="callout warn">Only licensed electricians should perform electrical work, such as installing receptacles and circuits, in most jurisdictions. AV technicians coordinate requirements and stay on the low-voltage side.</div>
`
    },
    {
      title: 'Coordinating with the building',
      html: `
<p>AV equipment lives inside walls, ceilings, floors and furniture that other trades build. Many AV problems are really <b>coordination failures</b>: no power behind the display, no conduit to the table, a speaker where the sprinkler goes.</p>
<table>
<tr><th>Trade</th><th>What AV needs from them</th></tr>
<tr><td>Architect</td><td>Room shapes, finishes, sightlines, ceiling heights, millwork for racks and lecterns</td></tr>
<tr><td>Structural</td><td>Wall blocking or backing for display mounts, supports for projectors, LED walls and speaker arrays</td></tr>
<tr><td>Electrical</td><td>Receptacles at display and rack locations, dedicated circuits, conduit and backboxes, lighting control integration</td></tr>
<tr><td>Mechanical (HVAC)</td><td>Quiet air handling (background noise), cooling for equipment rooms</td></tr>
<tr><td>Lighting</td><td>Zoned and dimmable lighting for presentations and video, control interfaces</td></tr>
<tr><td>IT / telecom</td><td>Network ports, VLANs, PoE, IP addresses, Wi-Fi, firewall rules</td></tr>
<tr><td>Furniture</td><td>Table boxes, grommets, cable paths through table legs, rack furniture</td></tr>
<tr><td>Security / life safety</td><td>Paging and mass-notification interfaces, fire alarm shutdown of audio where required</td></tr>
</table>

<h3>Infrastructure details</h3>
<ul>
<li><b>Backboxes</b> sized for AV plates and connectors (deep boxes for HDMI and USB-C), and <b>recessed display boxes</b> behind flat panels.</li>
<li><b>Conduit:</b> size for the cables plus future growth. For more than two cables, code fill limits are typically 40% of the conduit's cross-section. Include pull strings and limit bends between pull points.</li>
<li><b>Floor boxes</b> with AV, power and data compartments for tables in the middle of a room.</li>
<li><b>Ceiling devices</b> (speakers, mics, projectors) need support independent of the ceiling tiles, and must coordinate with lights, sprinklers and diffusers.</li>
<li><b>Fire-stopping</b> wherever cables pass through rated walls or floors.</li>
</ul>
<div class="callout tip">Walk the site at <b>rough-in</b> (before walls close) and verify every box, conduit, blocking location and power outlet against the drawings. Fixing it later means cutting finished walls.</div>
`
    }
  ],
  quiz: [
    { q: 'On a standard XLR connector, pin 2 is…', o: ['Shield', 'Hot (+)', 'Cold (−)', 'Phantom only'], a: 1, e: 'Pin 1 shield, pin 2 hot, pin 3 cold (AES convention).' },
    { q: 'One rack unit (1 RU) equals…', o: ['1 inch', '1.5 inches', '1.75 inches', '2 inches'], a: 2, e: '1 RU = 1.75 in (44.45 mm).' },
    { q: 'A rack draws 1,000 W. Approximately how much heat does it produce?', o: ['341 BTU/hr', '1,000 BTU/hr', '3,412 BTU/hr', '10,000 BTU/hr'], a: 2, e: 'Watts × 3.412 = BTU/hr.' },
    { q: 'What is the continuous load limit on a 20 A breaker under typical code rules?', o: ['10 A', '16 A', '20 A', '25 A'], a: 1, e: '80% of 20 A = 16 A continuous.' },
    { q: 'Cable run through an air-handling ceiling space generally needs which rating?', o: ['CM', 'CMR (riser)', 'CMP (plenum)', 'Outdoor only'], a: 2, e: 'Plenum-rated cable is required in air-handling spaces under most codes.' },
    { q: 'Speaker wire labeled 12 AWG compared to 18 AWG is…', o: ['Thinner', 'Thicker', 'The same', 'Fiber'], a: 1, e: 'Lower AWG numbers mean thicker wire with lower resistance.' },
    { q: 'What should you install where cables pass through a fire-rated wall?', o: ['Nothing', 'Fire-stopping', 'Foam', 'A larger cable'], a: 1, e: 'Penetrations in rated assemblies must be fire-stopped to maintain the rating.' },
    { q: 'Why build racks in the shop when possible?', o: ['It’s required by HDMI', 'Better quality and faster site work, with testing before arrival', 'It avoids labeling', 'Racks can’t be built on site'], a: 1, e: 'Shop builds allow controlled, tested assembly before installation.' },
    { q: 'The best time to verify backboxes, conduit and blocking is…', o: ['After the ceiling is closed', 'At rough-in, before walls close', 'At final commissioning', 'During training'], a: 1, e: 'Fixing infrastructure after finishes are installed is expensive.' }
  ]
});
