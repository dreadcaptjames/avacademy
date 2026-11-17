/* Signal Path — Module content: Projects, Business, Live & Specialty */
AV.modules.push({
  id: 'projects',
  icon: '📋',
  title: 'The AV Project Lifecycle',
  level: 'Applied',
  summary: 'From needs analysis to design documents, installation, commissioning, handover and service.',
  lessons: [
    {
      title: 'The phases of an AV project',
      html: `
<ol class="steps">
<li><b>Needs analysis / discovery:</b> understand the users, tasks, rooms, budget and constraints.</li>
<li><b>Program report:</b> a written summary of requirements, room by room, that everyone signs off on.</li>
<li><b>Design:</b> schematic design, then design development, then construction documents (drawings and specifications).</li>
<li><b>Bid or proposal:</b> integrators price the work, or a design-build firm produces a proposal.</li>
<li><b>Contract &amp; submittals:</b> the integrator submits product data and shop drawings for approval.</li>
<li><b>Procurement &amp; pre-build:</b> order equipment, program, and build and test racks in the shop.</li>
<li><b>Installation:</b> rough-in (infrastructure), cable pulls, mounting, termination, rack installation, trim-out.</li>
<li><b>Commissioning &amp; verification:</b> configure, tune, test and verify against the design and the standards.</li>
<li><b>Training &amp; handover:</b> train users and support staff, and deliver as-built drawings and manuals.</li>
<li><b>Closeout:</b> punch list completion, final acceptance, warranty begins.</li>
<li><b>Service &amp; lifecycle:</b> support, maintenance, upgrades and eventual refresh (often 5–7 years).</li>
</ol>
<p>ANSI/INFOCOMM 2M-2010 describes the design and coordination process and the documents produced at each phase.</p>
<div class="callout tip">The cheapest time to change anything is earlier. A design change on paper costs minutes, and the same change after drywall costs days.</div>
`
    },
    {
      title: 'Needs analysis: asking the right questions',
      html: `
<p>Great systems start with understanding people, not products. A needs analysis is a structured conversation with stakeholders.</p>
<h3>Who to talk to</h3>
<ul>
<li>The actual <b>users</b> (presenters, meeting hosts, instructors, worship leaders)</li>
<li><b>Decision makers</b> and budget holders</li>
<li><b>IT and security</b></li>
<li><b>Facilities</b> and building operations</li>
<li>The <b>support staff</b> who will maintain the system</li>
</ul>

<h3>Questions to ask</h3>
<ul>
<li>What will people <b>do</b> in this space? (Present, collaborate, video call, teach, record, perform.)</li>
<li>How many people, where do they sit, and how is the room arranged and rearranged?</li>
<li>What content: spreadsheets, video, CAD, live cameras? This drives display size and resolution.</li>
<li>Which meeting platforms? Will guests bring their own devices?</li>
<li>Recording, streaming, lecture capture, or assistive listening needs?</li>
<li>What's the technical skill level of users? Who provides support?</li>
<li>Are there existing standards, preferred vendors or a network policy?</li>
<li>Budget, schedule, aesthetic constraints (hidden gear, architect requirements)?</li>
<li>How should the system grow in the future?</li>
</ul>
<div class="callout">Describe needs as <b>tasks and outcomes</b> (“everyone in the back row can read a spreadsheet”, “remote participants can hear every seat”) rather than products (“a 75-inch display”). Products come later.</div>
`
    },
    {
      title: 'Design documentation',
      html: `
<table>
<tr><th>Document</th><th>Purpose</th></tr>
<tr><td>Signal flow (functional) diagram</td><td>Every device, every connection, every cable number</td></tr>
<tr><td>Floor plans / reflected ceiling plans</td><td>Device locations: speakers, mics, displays, projectors, floor boxes</td></tr>
<tr><td>Elevations</td><td>Display heights, wall plates, lectern and credenza views</td></tr>
<tr><td>Rack elevations</td><td>What goes in each rack unit</td></tr>
<tr><td>Details</td><td>Mounting, backbox, plate and custom fabrication details</td></tr>
<tr><td>Schedules</td><td>Cable schedules, plate and panel schedules, IP schedules</td></tr>
<tr><td>Specifications</td><td>Written requirements for products, execution, testing and warranty</td></tr>
<tr><td>Bill of materials (BOM)</td><td>Every part, with quantities and pricing</td></tr>
<tr><td>Infrastructure drawings</td><td>Conduit, boxes, power and blocking for other trades</td></tr>
<tr><td>Control and UI narrative</td><td>How the system should behave, screen by screen</td></tr>
</table>
<p>In construction specifications, AV usually lives in <b>CSI MasterFormat Division 27 (Communications)</b>, for example section 27 41 00, Audio-Video Systems.</p>
<p>Common tools include AutoCAD and Revit (BIM), Visio, and AV-specific design and documentation software such as D-Tools, XTEN-AV and Stardraw.</p>
<div class="callout tip">Drawings are a contract. If it's not on the drawings or in the specs, it's probably not in the price, and it will become a change order.</div>
`
    },
    {
      title: 'Installation',
      html: `
<h3>Phases on site</h3>
<ul>
<li><b>Rough-in:</b> backboxes, conduit, sleeves and blocking, usually installed by the electrical contractor or the AV contractor depending on the contract.</li>
<li><b>Cable pull:</b> pull, label and dress cable before ceilings and walls close.</li>
<li><b>Trim-out / finish:</b> mount displays, speakers, mics and plates after paint and ceilings are complete.</li>
<li><b>Rack installation</b> and termination of all cables to plates and equipment.</li>
</ul>

<h3>Workmanship that separates pros from amateurs</h3>
<ul>
<li>Neat, consistent cable dressing with hook-and-loop ties (not overtightened zip ties), service loops and strain relief.</li>
<li>Every cable labeled at both ends to match the drawings.</li>
<li>Correct mounting hardware rated for the load, into structure or blocking.</li>
<li>Clean up every day. You're a guest in someone's building.</li>
<li>Photograph infrastructure before walls close, for the record.</li>
</ul>

<h3>Safety</h3>
<ul>
<li>Ladders, lifts and fall protection: follow site safety rules and use the right equipment.</li>
<li>Lifting: displays and projectors are heavy and awkward, so use two people and proper technique.</li>
<li>Electrical: lock-out/tag-out practices. Never work on live circuits.</li>
<li>PPE as required by the site (hard hat, safety glasses, vest, boots).</li>
<li>Many sites require formal safety training, such as OSHA 10 or 30 in the US.</li>
</ul>
`
    },
    {
      title: 'Commissioning & performance verification',
      html: `
<p>Commissioning proves the system works as designed. ANSI/AVIXA 10:2013 provides a framework of reference verification items across four phases: <b>pre-integration</b>, <b>systems integration</b>, <b>post-integration</b> and <b>closeout</b>.</p>

<h3>Audio commissioning</h3>
<ul>
<li>Verify every input and output, polarity and routing.</li>
<li>Set gain structure from preamps to amplifiers.</li>
<li>Tune the system: play pink noise, measure with a calibrated measurement microphone and analysis software (RTA or transfer-function tools such as Smaart or Room EQ Wizard), and apply EQ toward a target curve.</li>
<li>Set delays to align zones, set limiters to protect speakers, and verify maximum SPL and coverage uniformity.</li>
<li>Verify AEC and conferencing audio with real calls to a remote endpoint, from every seat.</li>
</ul>

<h3>Video commissioning</h3>
<ul>
<li>Test every source at every destination: resolution, EDID, HDCP behavior and audio embedding.</li>
<li>Display settings: picture mode, sharpness, overscan off, color, brightness and uniformity. Use test patterns.</li>
<li>Check projector focus, convergence and geometry, and screen alignment.</li>
<li>Check lip sync and camera framing and presets.</li>
</ul>

<h3>Control &amp; system</h3>
<ul>
<li>Test every button and function, including edge cases and power-up and power-down sequences.</li>
<li>Network: verify IP schedule, VLANs, multicast behavior and remote monitoring.</li>
<li>Produce a <b>punch list</b> of open items, fix them, and re-verify.</li>
</ul>

<h3>Closeout deliverables</h3>
<ul>
<li><b>As-built drawings</b> that show what was actually installed</li>
<li>Operation and maintenance (O&amp;M) manuals, configuration and program files, passwords handed over securely</li>
<li>User and support-staff training, quick reference guides</li>
<li>Test reports and the signed acceptance</li>
</ul>
`
    },
    {
      title: 'Service, support & managed services',
      html: `
<ul>
<li><b>Warranty</b>: manufacturer warranties on products, plus the integrator's workmanship warranty (often one year).</li>
<li><b>Service agreements</b> define response times (<b>SLAs</b>), coverage hours, preventive maintenance visits, loaner equipment and remote support.</li>
<li><b>Preventive maintenance</b>: firmware updates, filter cleaning, battery replacement, testing rarely used rooms, verifying backups of configuration files.</li>
<li><b>Managed services</b>: proactive remote monitoring, help desk, analytics and lifecycle planning, often sold as a monthly subscription.</li>
<li><b>Lifecycle planning</b>: forecasting refresh budgets as equipment ages and platforms change.</li>
</ul>
<div class="callout">For integrators, service revenue is predictable and often higher-margin than equipment. For customers, it means rooms that work on Monday morning.</div>
`
    }
  ],
  quiz: [
    { q: 'What should come first on an AV project?', o: ['Equipment selection', 'Needs analysis', 'Rack build', 'Commissioning'], a: 1, e: 'Understanding needs drives every later decision.' },
    { q: 'A drawing that shows every device and connection with cable numbers is a…', o: ['Reflected ceiling plan', 'Signal flow diagram', 'Rack elevation', 'Elevation'], a: 1, e: 'Signal flow (functional) diagrams document connectivity.' },
    { q: 'In CSI MasterFormat, AV systems are usually found in…', o: ['Division 08', 'Division 16', 'Division 27 (Communications)', 'Division 33'], a: 2, e: 'Section 27 41 00 covers audio-video systems.' },
    { q: 'What are “as-built” drawings?', o: ['Preliminary sketches', 'Drawings updated to show what was actually installed', 'Bid documents', 'Marketing renderings'], a: 1, e: 'As-builts document the final installed condition for future service.' },
    { q: 'Which standard provides a framework for AV performance verification?', o: ['ANSI/AVIXA 10:2013', 'TIA-568', 'HDMI 2.1', 'IEEE 802.3bt'], a: 0, e: 'It defines verification items across project phases.' },
    { q: 'Pink noise and a measurement microphone are used during…', o: ['Needs analysis', 'Audio system tuning', 'Cable pulling', 'Rack elevation design'], a: 1, e: 'Measurement-based tuning sets EQ, delay and levels.' },
    { q: 'A list of open items to fix before acceptance is a…', o: ['BOM', 'Punch list', 'Submittal', 'RFI'], a: 1, e: 'The punch list tracks remaining deficiencies.' },
    { q: 'Needs should first be expressed as…', o: ['Model numbers', 'Tasks and outcomes', 'Prices', 'Cable types'], a: 1, e: 'Outcomes such as “readable from the back row” let designers choose the right products.' },
    { q: '“Trim-out” refers to…', o: ['Installing conduit', 'Final mounting of devices after finishes are complete', 'Cutting the budget', 'Editing video'], a: 1, e: 'Trim-out happens after paint and ceilings are done.' },
    { q: 'An SLA in a service agreement defines…', o: ['Signal levels', 'Response times and service commitments', 'Speaker layout', 'Software licenses'], a: 1, e: 'Service Level Agreements set expectations for support.' }
  ]
});

AV.modules.push({
  id: 'business',
  icon: '💼',
  title: 'The Business of AV',
  level: 'Applied',
  summary: 'How integrators make money, the sales and bid process, estimating, margin vs. markup, and project management.',
  lessons: [
    {
      title: 'How AV companies make money',
      html: `
<table>
<tr><th>Revenue stream</th><th>Description</th></tr>
<tr><td>Equipment</td><td>Resale of hardware and software at a margin over cost</td></tr>
<tr><td>Labor</td><td>Installation, engineering, programming, project management, billed at hourly rates or as fixed price</td></tr>
<tr><td>Design / consulting</td><td>Fees for design work (the consultant's main revenue)</td></tr>
<tr><td>Service &amp; support</td><td>Service contracts, managed services, monitoring, help desk</td></tr>
<tr><td>Rental &amp; staging</td><td>Equipment rental and crews for events</td></tr>
<tr><td>As-a-service (AVaaS)</td><td>Recurring fees that bundle equipment, support and refresh</td></tr>
</table>
<p>Equipment margins have been squeezed over time as products become commodities and are sold online. Many integrators now emphasize engineering, programming, and especially <b>recurring services</b>.</p>
<div class="callout tip">Labor is where projects make or lose money. A job estimated at 200 hours that takes 300 can wipe out the whole profit.</div>
`
    },
    {
      title: 'The sales & bid process',
      html: `
<ul>
<li><b>Lead → discovery → solution design → proposal → negotiation → contract.</b></li>
<li><b>RFI</b> (Request for Information): the owner surveys vendors' capabilities. (On a construction project, an RFI is also a question to the design team.)</li>
<li><b>RFQ</b> (Request for Qualifications/Quotation): asks for qualifications or pricing on a defined scope.</li>
<li><b>RFP</b> (Request for Proposal): asks vendors to propose a solution and price. It's evaluated on more than price.</li>
<li><b>Bid:</b> price on fixed documents (design-bid-build). Public projects may require <b>bid bonds</b>, <b>performance and payment bonds</b>, and payment of prevailing wages.</li>
<li><b>Value engineering:</b> proposing lower-cost alternatives that still meet the intent.</li>
<li><b>Change orders:</b> formal additions or deductions when scope changes after contract. Never do extra work without a signed change order.</li>
<li><b>Scope creep:</b> gradual, unpriced expansion of the work. It's a top margin killer.</li>
</ul>
<h3>Reading a scope of work</h3>
<p>A scope of work lists what's included <i>and excluded</i>. Typical exclusions are electrical work, conduit, network switches, patching and painting, furniture, permits and after-hours work. Unclear exclusions cause disputes.</p>
`
    },
    {
      title: 'Estimating, margin & markup',
      html: `
<h3>Building an estimate</h3>
<ul>
<li><b>Equipment</b> from the BOM, with shipping, taxes and contingencies.</li>
<li><b>Labor</b> by category: engineering, drafting, programming, project management, shop build, field installation, commissioning, training.</li>
<li>Labor is often estimated with <b>labor units</b>: standard hours per device (for example, per ceiling speaker or per display) adjusted for site conditions such as high ceilings, occupied buildings, union rules or after-hours work.</li>
<li><b>Miscellaneous:</b> consumables (connectors, ties, labels), lifts, travel, permits, freight.</li>
<li><b>Contingency</b> for risk.</li>
</ul>

<h3>Margin vs. markup: don't confuse them</h3>
<ul>
<li><b>Markup</b> is profit as a percentage of <i>cost</i>: <code>(price − cost) ÷ cost</code>.</li>
<li><b>Margin</b> is profit as a percentage of <i>price</i>: <code>(price − cost) ÷ price</code>.</li>
<li>A 25% markup is only a 20% margin. Mixing them up is a classic, expensive mistake.</li>
<li>To hit a target margin: <code>price = cost ÷ (1 − margin)</code>.</li>
</ul>
<div data-widget="margin"></div>
`
    },
    {
      title: 'Project management',
      html: `
<ul>
<li><b>Kickoff:</b> confirm scope, schedule, contacts, site access and responsibilities.</li>
<li><b>Schedule:</b> AV depends on other trades, so track construction milestones such as walls closed, ceilings in and power on, and plan around them.</li>
<li><b>Submittals:</b> product data and shop drawings sent for approval before ordering.</li>
<li><b>RFIs:</b> written questions to the design team, with written answers. Keep a log.</li>
<li><b>Procurement:</b> track lead times. Some products take weeks or months, and supply shortages have caused major delays in recent years.</li>
<li><b>Coordination meetings</b> with the general contractor and other trades.</li>
<li><b>Change management:</b> document every change, its cost and schedule impact.</li>
<li><b>Budget tracking:</b> compare hours and costs to the estimate weekly.</li>
<li><b>Billing:</b> progress billing as work is completed. Many contracts withhold <b>retainage</b> (often 5–10%) until final completion.</li>
<li><b>Closeout:</b> punch list, as-builts, O&amp;M manuals, training, warranty start, final payment.</li>
</ul>
<div class="callout tip">The best project managers communicate early and often. Bad news delivered early is a problem to solve. Bad news delivered late is a crisis.</div>
`
    }
  ],
  quiz: [
    { q: 'An item costs $800 and sells for $1,000. What is the margin?', o: ['20%', '25%', '80%', '125%'], a: 0, e: 'Margin = 200 ÷ 1,000 = 20%. The markup is 25%.' },
    { q: 'To achieve a 30% margin on a $700 cost, the price should be…', o: ['$910', '$1,000', '$1,050', '$930'], a: 1, e: 'Price = 700 ÷ (1 − 0.30) = $1,000.' },
    { q: 'What is a change order?', o: ['A purchase order to a distributor', 'A formal, signed change in scope and price after contract', 'An RFI response', 'A warranty claim'], a: 1, e: 'Change orders document added or removed scope and cost.' },
    { q: '“Scope creep” refers to…', o: ['Slow cable pulls', 'Gradual unpriced expansion of the work', 'Equipment theft', 'Late payments'], a: 1, e: 'Unmanaged scope creep erodes profit.' },
    { q: 'Retainage is…', o: ['A portion of payment withheld until final completion', 'A type of rack', 'A warranty term', 'A bid bond'], a: 0, e: 'Owners commonly withhold a percentage until closeout.' },
    { q: 'Labor units are…', o: ['Employees', 'Standard hours per device used to estimate labor', 'Union fees', 'Billing codes'], a: 1, e: 'They make estimates consistent and adjustable for site conditions.' },
    { q: 'Which document asks vendors to propose a solution and a price, evaluated on more than price?', o: ['RFP', 'Change order', 'Punch list', 'BOM'], a: 0, e: 'Request for Proposal.' },
    { q: 'Which revenue stream is most predictable for integrators?', o: ['One-time equipment sales', 'Recurring service and managed services', 'Rental', 'Design fees'], a: 1, e: 'Recurring service contracts provide steady revenue.' }
  ]
});

AV.modules.push({
  id: 'specialty',
  icon: '🎤',
  title: 'Live Events, Streaming & Specialty Systems',
  level: 'Explore',
  summary: 'Rental and staging, live production and streaming, digital signage, and control rooms.',
  lessons: [
    {
      title: 'Live events, rental & staging',
      html: `
<ul>
<li><b>Front of house (FOH):</b> the main mix position, usually in the audience, where the engineer mixes for the crowd.</li>
<li><b>Monitors:</b> wedges or <b>in-ear monitors (IEMs)</b> let performers hear themselves, often with a separate monitor mixer.</li>
<li><b>PA systems:</b> line arrays flown with rigging, subwoofers, front-fill and delay speakers, time-aligned to the main system.</li>
<li><b>Rigging:</b> hanging speakers, LED and truss overhead is high-risk. Use rated hardware, engineered load calculations and certified riggers (for example ETCP certification in North America).</li>
<li><b>Power distribution:</b> generators or venue power with portable distribution and heavy feeder cable. Calculated by qualified people.</li>
<li><b>Video:</b> camera switching for IMAG (image magnification), LED walls with processing, media servers, projection mapping.</li>
<li><b>Show control &amp; communication:</b> intercom (wired and wireless), cue lights, timecode, playback systems.</li>
<li>Logistics: load-in and load-out schedules, labor calls, case packing, transport and insurance.</li>
</ul>
<div class="callout tip">Live events reward preparation: a clear input list, stage plot, rehearsal time and spares for everything critical.</div>
`
    },
    {
      title: 'Streaming & production',
      html: `
<ul>
<li><b>Production chain:</b> cameras → video switcher (with graphics and replay) → encoder → streaming platform or CDN → viewers.</li>
<li><b>Encoders</b> (hardware or software) compress video with H.264, H.265/HEVC or AV1, and send it with protocols such as <b>RTMP</b> or <b>SRT</b> (Secure Reliable Transport, which is resilient over unreliable internet links).</li>
<li>Delivery to viewers usually uses adaptive streaming formats such as HLS, which offer multiple quality levels.</li>
<li><b>Upload bandwidth:</b> plan for well above your stream bitrate. About 1.5–2× is a common safety margin, and use a wired connection.</li>
<li><b>Audio</b> is the most common streaming failure. Create a dedicated stream mix, because the room PA mix rarely sounds right online.</li>
<li><b>Accessibility:</b> captions (live or post-produced) are increasingly expected, and sometimes required.</li>
<li><b>Lecture capture</b> automates recording of classes on a schedule, with presenter tracking and content capture.</li>
</ul>
`
    },
    {
      title: 'Digital signage',
      html: `
<ul>
<li><b>Components:</b> displays or LED, <b>media players</b> (external or built-in SoC), a <b>content management system (CMS)</b> and network connectivity.</li>
<li><b>Scheduling and dayparting:</b> different content by time of day, location or audience. Triggers can come from sensors, data feeds or emergency alerts.</li>
<li><b>Content</b> must be designed for the display's resolution, orientation (portrait or landscape) and viewing distance. Content is usually the hardest part to sustain.</li>
<li><b>Brightness:</b> indoor about 350–700 nits, window-facing about 2,500 nits and up, and direct sunlight outdoor often 2,500–5,000+ nits with weatherproof (IP-rated) enclosures.</li>
<li><b>DOOH</b> (digital out-of-home) is advertising on signage networks, with proof-of-play reporting and audience analytics.</li>
<li><b>Management:</b> remote monitoring, screenshot verification, security patching of players, and replacement planning for 24/7 operation.</li>
</ul>
`
    },
    {
      title: 'Control rooms & specialty environments',
      html: `
<ul>
<li><b>Command and control rooms</b> (utilities, security operations, transportation, emergency operations) run 24/7 and need redundancy everywhere: power, network, processors and displays.</li>
<li><b>Video wall processing</b> shows many sources such as cameras, maps, dashboards and computers in flexible layouts.</li>
<li><b>KVM</b> (keyboard, video, mouse) systems, often over IP, let operators control many computers from one workstation and keep the computers in a secure room.</li>
<li><b>Ergonomics:</b> sightlines, console design and lighting matter for long shifts. ISO 11064 covers control-center design.</li>
<li><b>Other specialty areas:</b> simulation and visualization, courtrooms (evidence presentation, recording), healthcare (OR video, nurse call integration), museums and themed entertainment, esports arenas, and secure government facilities with strict emission and network rules.</li>
</ul>
<div class="callout">Specialty markets often pay a premium for expertise. They're good areas to specialize in once you know the fundamentals.</div>
`
    }
  ],
  quiz: [
    { q: 'FOH stands for…', o: ['Frequency Optimized Headroom', 'Front of House', 'Field of Hearing', 'Fiber Over HDMI'], a: 1, e: 'Front of house is the main mix position for the audience.' },
    { q: 'Which streaming transport is designed to be resilient over unreliable internet links?', o: ['SRT', 'VGA', 'RS-232', 'CEC'], a: 0, e: 'Secure Reliable Transport handles packet loss and jitter.' },
    { q: 'IMAG means…', o: ['Image magnification: showing live camera shots of presenters on large screens', 'Integrated amplifier gain', 'An IP addressing method', 'Infrared management'], a: 0, e: 'IMAG helps large audiences see presenters.' },
    { q: 'A window-facing signage display typically needs at least about…', o: ['300 nits', '700 nits', '2,500 nits', '50 nits'], a: 2, e: 'Sunlight overwhelms normal displays, so high-brightness models are used.' },
    { q: 'KVM systems let operators…', o: ['Mix audio', 'Control many computers from one workstation', 'Hang speakers', 'Calibrate projectors'], a: 1, e: 'Keyboard-video-mouse switching and extension.' },
    { q: 'Who should rig loudspeakers and LED overhead?', o: ['Anyone with a ladder', 'Qualified, certified riggers using rated hardware and engineered loads', 'The audio engineer alone', 'The venue usher'], a: 1, e: 'Overhead rigging is life-safety work.' },
    { q: 'What is the most common failure in live streams?', o: ['Too many cameras', 'Poor audio', 'Too high resolution', 'Too many viewers'], a: 1, e: 'A dedicated, well-mixed stream audio feed is essential.' },
    { q: 'A CMS in digital signage is a…', o: ['Content Management System for scheduling and publishing content', 'Camera Mount System', 'Cable Management Sleeve', 'Color Matching Standard'], a: 0, e: 'The CMS manages what plays where and when.' }
  ]
});
