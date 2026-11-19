/* Signal Path — the 68-minute AV Crash Course.
   A fast path through the existing academy, with hands-on checks and
   deep links back into the original lessons. */
window.AV = window.AV || { modules: [], glossary: [], scenarios: [], chains: [], widgets: {} };
AV.crashCourse = [
  {
    id: 'av-in-a-room', icon: '🎛️', title: 'AV in one room', minutes: 6,
    subtitle: 'See the whole system before you touch a cable.',
    skill: 'Identify source, transport, processing, and output.',
    deep: { module: 'fundamentals', lesson: 0, title: 'Signal flow fundamentals' },
    html: `<p class="crash-kicker">The big picture</p>
      <h2>A room is a collection of signal paths.</h2>
      <p>Commercial AV is how people <strong>hear, see, share, and collaborate</strong> in spaces like classrooms, meeting rooms, theaters, and houses of worship. The equipment changes; the basic jobs do not.</p>
      <div class="signal-demo" aria-label="AV signal path">
        <span>Source<small>Laptop / microphone</small></span><b>→</b>
        <span>Transport<small>HDMI / XLR / network</small></span><b>→</b>
        <span>Processing<small>Switcher / DSP</small></span><b>→</b>
        <span>Output<small>Display / speakers</small></span>
      </div>
      <div class="crash-note"><strong>Field rule:</strong> Before guessing at a fault, say where the signal starts, where it should end, and every device or connection in between.</div>
      <h3>In a meeting room, spot the roles</h3>
      <ul><li><strong>Sources:</strong> laptop, camera, room PC, wireless mic.</li>
      <li><strong>Transport:</strong> physical cabling or network links.</li>
      <li><strong>Processing:</strong> routing, mixing, scaling, echo cancellation, or control.</li>
      <li><strong>Outputs:</strong> display, loudspeaker, remote meeting participant, recording.</li></ul>`,
    question: { q: 'A laptop image appears on a wall display. Which device is the source?', options: ['The wall display', 'The laptop', 'The amplifier', 'The control touchscreen'], answer: 1,
      explanation: 'The laptop originates the picture. The display receives and shows it.' }
  },
  {
    id: 'follow-the-signal', icon: '🔀', title: 'Follow the signal', minutes: 8,
    subtitle: 'Read a system from left to right, not by guessing.',
    skill: 'Trace the audio and video paths separately.',
    deep: { module: 'fundamentals', lesson: 0, title: 'Signal flow: the most important idea in AV' },
    html: `<p class="crash-kicker">Signal flow</p>
      <h2>Trace it from source to destination.</h2>
      <p>One room usually has several paths running at once. A control command is not the same thing as an audio or video signal.</p>
      <div class="crash-chain"><strong>Audio</strong><div>Microphone <span>→</span> DSP / mixer <span>→</span> amplifier <span>→</span> loudspeaker</div></div>
      <div class="crash-chain"><strong>Video</strong><div>Laptop <span>→</span> switcher / extender <span>→</span> display</div></div>
      <div class="crash-chain"><strong>Control</strong><div>Touchpanel <span>→</span> control processor <span>→</span> devices</div></div>
      <div class="crash-note"><strong>Field rule:</strong> Ask what the <em>last known working point</em> is. If the source works locally but not at the far end, focus on the equipment between them.</div>
      <h3>Try this in the room</h3>
      <ol><li>Pick a signal: laptop picture, microphone audio, or camera feed.</li><li>Write down the source and destination.</li><li>Name every device or cable between them.</li><li>Test at the midpoint to narrow the fault.</li></ol>`,
    question: { q: 'The microphone meter moves on the DSP, but the room speakers are silent. Where should you investigate next?', options: ['The microphone capsule first', 'The display EDID', 'The DSP output, amplifier, and speaker path', 'The room lighting'], answer: 2,
      explanation: 'The moving DSP input meter confirms signal is reaching the DSP. Continue tracing downstream through routing, output level, amplifier, and speakers.' }
  },
  {
    id: 'audio-essentials', icon: '🎤', title: 'Audio that works', minutes: 10,
    subtitle: 'Know microphones, DSP, amplifiers, and feedback.',
    skill: 'Explain the audio chain and set a sensible gain path.',
    deep: { module: 'audio', lesson: 1, title: 'Mixers, DSP & processing' },
    html: `<p class="crash-kicker">Audio essentials</p>
      <h2>Good audio starts before the speaker.</h2>
      <p><strong>Microphones</strong> turn sound into signals. A <strong>DSP</strong> mixes, equalizes, routes, and often handles acoustic echo cancellation. An <strong>amplifier</strong> supplies power to passive loudspeakers. Active speakers have their own amplification.</p>
      <div class="signal-demo"><span>Mic<small>Pickup</small></span><b>→</b><span>DSP<small>Process / route</small></span><b>→</b><span>Amp<small>Power</small></span><b>→</b><span>Speaker<small>Sound</small></span></div>
      <h3>Four concepts to remember</h3>
      <ul><li><strong>Gain structure:</strong> strong enough above the noise, low enough to avoid clipping.</li>
      <li><strong>Feedback:</strong> a microphone hears amplified sound, sending it around the loop again.</li>
      <li><strong>70 V systems:</strong> used to distribute audio to many tapped speakers; add tap wattages to estimate amplifier load.</li>
      <li><strong>Speech clarity:</strong> mic position, speaker coverage, room acoustics, and noise level matter as much as volume.</li></ul>
      <div class="crash-note"><strong>Field rule:</strong> If a mic sounds quiet, don't just crank up the loudspeakers. Check placement, input gain, DSP routing, and output level in order.</div>`,
    question: { q: 'What is the primary job of a DSP in a typical meeting-room audio system?', options: ['It generates the microphone signal', 'It routes and processes audio', 'It turns HDMI into copper wire', 'It powers every passive speaker directly'], answer: 1,
      explanation: 'A DSP routes and processes audio. Passive speakers usually need a separate power amplifier, although some integrated devices combine these functions.' }
  },
  {
    id: 'video-essentials', icon: '🖥️', title: 'Video without the mystery', minutes: 9,
    subtitle: 'Follow pictures through sources, switchers, and displays.',
    skill: 'Distinguish a physical link problem from a handshake problem.',
    deep: { module: 'video', lesson: 1, title: 'Video interfaces: HDMI, USB-C, HDBaseT' },
    html: `<p class="crash-kicker">Video essentials</p>
      <h2>Picture failures are often negotiation failures.</h2>
      <p>A video path must carry enough data <em>and</em> agree on a format. The source, any switchers/extenders, and the display must cooperate.</p>
      <div class="crash-chain"><strong>Typical path</strong><div>Laptop <span>→</span> HDMI / USB-C adapter <span>→</span> switcher <span>→</span> extender <span>→</span> display</div></div>
      <h3>Know these terms</h3>
      <ul><li><strong>Resolution and frame rate:</strong> how many pixels, how often they update.</li>
      <li><strong>EDID:</strong> display capability information used by the source to choose an output format.</li>
      <li><strong>HDCP:</strong> copy-protection handshake that can cause a black screen with protected content.</li>
      <li><strong>HDBaseT:</strong> technology for extending AV over suitable category cabling (not ordinary Ethernet traffic in every implementation).</li></ul>
      <div class="crash-note"><strong>Field rule:</strong> Test a known-good source and short cable directly at the display, then restore each link to find the failure.</div>`,
    question: { q: 'A laptop works directly into the display but not through the room switcher. What is the best next step?', options: ['Replace the display immediately', 'Check switcher input selection, cabling, and signal format/EDID', 'Turn up the audio amplifier', 'Change the Wi‑Fi password'], answer: 1,
      explanation: 'A successful direct connection isolates the problem to the path through the switcher or its configuration.' }
  },
  {
    id: 'cables-racks-power', icon: '🔌', title: 'Cables, racks & power', minutes: 8,
    subtitle: 'Recognize the common connections and install safely.',
    skill: 'Choose a starting test for bad cabling or power.',
    deep: { module: 'infrastructure', lesson: 0, title: 'Cables & connectors' },
    html: `<p class="crash-kicker">Infrastructure</p>
      <h2>Most systems are only as reliable as their connections.</h2>
      <div class="crash-spec-grid">
       <div><strong>HDMI / DisplayPort</strong><small>Digital video + audio</small></div>
       <div><strong>USB / USB-C</strong><small>Data, peripherals, sometimes AV and power</small></div>
       <div><strong>XLR</strong><small>Often balanced microphone or line-level audio</small></div>
       <div><strong>RJ45 / Cat cable</strong><small>Ethernet or proprietary AV transport—verify which</small></div>
       <div><strong>Speaker cable</strong><small>Amplifier to passive loudspeaker</small></div>
       <div><strong>Fiber</strong><small>High bandwidth and long-distance links</small></div>
      </div>
      <h3>Three habits worth learning on day one</h3>
      <ol><li>Label <strong>both ends</strong> of a cable and document its destination.</li><li>Respect cable bend radius, strain relief, separation from mains power, and manufacturer limits.</li><li>Check power and link/status lights <strong>before</strong> changing configuration.</li></ol>
      <div class="crash-note"><strong>Safety:</strong> Don't work inside energized electrical equipment. Follow the site's electrical and rigging safety procedures.</div>`,
    question: { q: 'A category cable with an RJ45 connector is plugged into an AV extender. What can you safely assume?', options: ['It always carries ordinary IP/Ethernet packets', 'It always carries PoE', 'You must verify what protocol the equipment uses', 'It is always interchangeable with an HDMI cable'], answer: 2,
      explanation: 'RJ45 is a connector, not proof of a protocol. Some AV extenders use category cable without sending normal IP traffic.' }
  },
  {
    id: 'network-and-control', icon: '🌐', title: 'Networks & control', minutes: 9,
    subtitle: 'Get comfortable with IP addresses, PoE, and touchpanels.',
    skill: 'Tell the difference between a network fault and a routing fault.',
    deep: { module: 'network', lesson: 0, title: 'Networking essentials for AV' },
    html: `<p class="crash-kicker">Connected AV</p>
      <h2>Modern AV shares the network with IT.</h2>
      <p>Networked devices need correct addressing, switching, and sometimes carefully planned traffic. A touchscreen sends <strong>commands</strong>; it does not necessarily carry the audio or video signals itself.</p>
      <h3>Five terms, plain English</h3>
      <ul><li><strong>IP address:</strong> identifies a device on the network.</li>
      <li><strong>Subnet:</strong> defines which local addresses can talk directly.</li>
      <li><strong>DHCP:</strong> automatically provides network settings where enabled.</li>
      <li><strong>PoE:</strong> supplies electrical power over supported network cable and ports.</li>
      <li><strong>Multicast:</strong> one stream distributed to interested receivers; some AV-over-IP systems need IGMP configuration.</li></ul>
      <div class="crash-chain"><strong>Control path</strong><div>Touchpanel <span>→</span> processor / network <span>→</span> display, switcher, DSP</div></div>
      <div class="crash-note"><strong>Field rule:</strong> Check link lights, addressing, and basic reachability before blaming the control program. Coordinate network changes with IT.</div>`,
    question: { q: 'A networked control touchpanel loses communication with the processor. What should you check first?', options: ['Speaker impedance', 'IP addressing, physical link, and power', 'Projector brightness', 'HDCP compliance'], answer: 1,
      explanation: 'Start at physical connectivity and addressing, then investigate the control software or device services.' }
  },
  {
    id: 'conference-room', icon: '📹', title: 'The meeting-room walkthrough', minutes: 8,
    subtitle: 'Connect the camera, microphones, speakers, and call platform.',
    skill: 'Explain why local audio can work while a call still fails.',
    deep: { module: 'conferencing', lesson: 2, title: 'Cameras, audio pickup & meeting equity' },
    html: `<p class="crash-kicker">Applied systems</p>
      <h2>A conference room has two audiences.</h2>
      <p>People in the room and people on the call both need to hear and see clearly. That means checking <strong>local</strong> and <strong>far-end</strong> audio/video paths separately.</p>
      <div class="crash-chain"><strong>Send</strong><div>Room mics <span>→</span> DSP / echo cancellation <span>→</span> conferencing computer <span>→</span> far end</div></div>
      <div class="crash-chain"><strong>Receive</strong><div>Far end <span>→</span> conferencing computer <span>→</span> DSP / speaker output <span>→</span> room</div></div>
      <h3>Walk the room in this order</h3>
      <ol><li>Confirm the correct camera, microphone, and speaker are selected in the call app.</li><li>Verify local playback and local mic meters.</li><li>Make a real test call and check both directions.</li><li>Try screen sharing, mute/unmute, and a normal user workflow.</li></ol>
      <div class="crash-note"><strong>Field rule:</strong> Being able to hear the other person does not prove they can hear you. Test both directions every time.</div>`,
    question: { q: 'In a test call, the room hears the remote participant but the remote participant hears nothing. Which path should you test?', options: ['Room microphones through DSP to the conferencing computer', 'The display backlight', 'Only the receive-speaker path', 'The building lighting controller'], answer: 0,
      explanation: 'The room receive path works. Focus on the outgoing microphone path and the conferencing app microphone selection.' }
  },
  {
    id: 'troubleshoot-handoff', icon: '🛠️', title: 'Troubleshoot & hand off', minutes: 10,
    subtitle: 'Diagnose methodically and leave a system ready for users.',
    skill: 'Use a repeatable fault-isolation and commissioning checklist.',
    deep: { module: 'projects', lesson: 4, title: 'Commissioning & performance verification' },
    html: `<p class="crash-kicker">Field-ready</p>
      <h2>Don't guess. Isolate, prove, document.</h2>
      <div class="crash-chain"><strong>The fault-isolation loop</strong><div>Observe <span>→</span> Trace <span>→</span> Isolate <span>→</span> Test <span>→</span> Record</div></div>
      <h3>When a room isn't working</h3>
      <ol><li><strong>Reproduce:</strong> what exactly fails? Audio, video, control, network, or only a particular workflow?</li>
      <li><strong>Check simple things:</strong> power, mute, source select, input/output levels, connection status.</li>
      <li><strong>Divide the signal path:</strong> test a known-good source or cable and a midpoint.</li>
      <li><strong>Change one thing:</strong> confirm the result before making another change.</li>
      <li><strong>Verify the full use case:</strong> make a call, share content, listen, and confirm control functions.</li></ol>
      <div class="crash-note"><strong>Professional finish:</strong> Label and document final connections, note settings and unresolved issues, and show the user the basic workflow. A room that only works for the technician is not finished.</div>`,
    question: { q: 'You resolve a no-audio fault. What should you do before signing off?', options: ['Leave without touching anything else', 'Verify the complete user workflow and document the fix', 'Disable every DSP limiter', 'Disconnect the backup input'], answer: 1,
      explanation: 'A repair is complete only when the expected user workflow has been tested and the resulting configuration and fix are documented.' }
  }
];