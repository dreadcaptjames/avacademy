/* Signal Path — Module content: Networking/AVoIP + Control */
AV.modules.push({
  id: 'network',
  icon: '🌐',
  title: 'Networking & AV-over-IP',
  level: 'Core',
  summary: 'IP fundamentals, switches, PoE, multicast and QoS, Dante/AES67/AVB, video over IP, and security.',
  lessons: [
    {
      title: 'Networking essentials for AV',
      html: `
<p>Modern AV <i>is</i> network equipment. Microphones, DSPs, displays, cameras and control processors all have IP addresses, so you need to speak IT's language.</p>
<h3>Layers that matter</h3>
<ul>
<li><b>Layer 1, physical:</b> copper and fiber cabling, connectors, link speed.</li>
<li><b>Layer 2, data link:</b> Ethernet frames, MAC addresses, switches, VLANs.</li>
<li><b>Layer 3, network:</b> IP addresses, subnets, routers. Traffic between subnets must be routed.</li>
<li><b>Layer 4, transport:</b> TCP (reliable, connection-based, used for control) and UDP (fast, no retransmission, used for real-time audio and video).</li>
</ul>

<h3>IP addressing</h3>
<ul>
<li>An IPv4 address such as <code>192.168.10.25</code> plus a <b>subnet mask</b> such as <code>255.255.255.0</code> (/24) defines which addresses are on the local network. A /24 holds 254 usable hosts.</li>
<li>Private ranges: <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code>.</li>
<li>The <b>default gateway</b> is the router address used to reach other subnets.</li>
<li><b>DHCP</b> assigns addresses automatically. AV devices often get <b>static</b> addresses or DHCP reservations so control systems can always find them. Keep an <b>IP schedule</b> document.</li>
<li><b>DNS</b> turns names into addresses, and many cloud-managed AV devices need it to work.</li>
</ul>

<h3>Switches &amp; VLANs</h3>
<ul>
<li><b>Managed switches</b> are required for most AV-over-IP. They provide VLANs, IGMP snooping, QoS and monitoring.</li>
<li><b>VLANs</b> (IEEE 802.1Q) split one physical network into separate logical networks, such as AV, control, corporate and guest. <b>Trunk</b> ports carry several VLANs between switches.</li>
<li>Check that the switch is <b>non-blocking</b> (its backplane handles every port at full rate) and has enough uplink bandwidth.</li>
</ul>

<h3>Cabling</h3>
<table>
<tr><th>Medium</th><th>Typical capability</th></tr>
<tr><td>Cat6 UTP</td><td>1 GbE to 100 m, 10 GbE to about 55 m</td></tr>
<tr><td>Cat6A</td><td>10 GbE to 100 m. Preferred for HDBaseT and 10G AV-over-IP.</td></tr>
<tr><td>Multimode fiber (OM3/OM4)</td><td>10 GbE to about 300–400 m</td></tr>
<tr><td>Singlemode fiber (OS2)</td><td>Kilometers. Campus backbones.</td></tr>
</table>

<h3>Power over Ethernet</h3>
<p>PoE powers devices such as ceiling mics, touch panels, cameras and small amplifiers through the data cable. Budget it carefully: a switch has a <b>total PoE budget</b> as well as per-port limits.</p>
<table>
<tr><th>Standard</th><th>Power at the switch port</th></tr>
<tr><td>802.3af (PoE, Type 1)</td><td>15.4 W</td></tr>
<tr><td>802.3at (PoE+, Type 2)</td><td>30 W</td></tr>
<tr><td>802.3bt Type 3 (PoE++)</td><td>60 W</td></tr>
<tr><td>802.3bt Type 4</td><td>90 W</td></tr>
</table>
<div data-widget="poe"></div>
`
    },
    {
      title: 'Multicast, IGMP, QoS & clocking',
      html: `
<h3>Unicast vs. multicast</h3>
<ul>
<li><b>Unicast</b>: one sender to one receiver.</li>
<li><b>Broadcast</b>: one to everyone on the subnet. Avoid it for media.</li>
<li><b>Multicast</b>: one stream to a <i>group</i>, and only devices that join receive it. This is how one AV-over-IP encoder feeds 50 decoders without sending 50 copies.</li>
</ul>

<h3>IGMP snooping &amp; the querier</h3>
<p>Without help, a switch floods multicast to every port like broadcast traffic, which can melt an AV network. <b>IGMP snooping</b> lets the switch learn which ports actually joined each group and forward the stream only there. An <b>IGMP querier</b> (one per VLAN) periodically asks who's still listening, so the snooping tables stay current.</p>
<div class="callout warn"><b>Classic failure:</b> video works for a few minutes and then decoders drop out, or every port is flooded. Check that IGMP snooping is on <i>and</i> that a querier exists on that VLAN.</div>

<h3>Quality of Service (QoS)</h3>
<p>QoS marks packets by priority (using <b>DSCP</b> values) so the switch sends time-critical traffic first. For Dante, the usual marking is clock (PTP) traffic at the highest priority, then audio, then everything else. Follow each manufacturer's recommended DSCP values and configure switches to trust them.</p>

<h3>Clocking: PTP</h3>
<p>Networked audio and video need every device to share one clock. <b>Precision Time Protocol</b> (IEEE 1588) elects a leader clock and keeps followers synchronized to within microseconds. Dante uses PTP version 1 natively, while AES67, SMPTE ST 2110 and IPMX use PTP version 2. Large networks may use PTP-aware switches (boundary or transparent clocks).</p>

<h3>Other switch settings to know</h3>
<ul>
<li><b>Energy Efficient Ethernet</b> (EEE, 802.3az) can cause clock and audio dropouts. Disable it on ports carrying Dante or other real-time media.</li>
<li><b>Jumbo frames</b> are used by some 10G video systems. Follow the manufacturer's guidance.</li>
<li>Spanning tree settings (such as PortFast on edge ports) speed up link-up after a device reboots.</li>
</ul>
`
    },
    {
      title: 'Audio networking: Dante, AES67, AVB & more',
      html: `
<h3>Dante (Audinate)</h3>
<p>Dante is by far the most widely used audio-over-IP technology in pro AV. It runs on standard IP networks and is built into thousands of products.</p>
<ul>
<li>Devices are discovered and routed in <b>Dante Controller</b> software: click a grid to patch any transmitter channel to any receiver channel.</li>
<li>Audio travels in <b>flows</b>. Unicast flows carry up to 4 channels to one receiver. Multicast flows go to many receivers.</li>
<li><b>Latency</b> is selectable per device, typically from 0.25 ms to 5 ms. Lower settings need a cleaner, faster network.</li>
<li><b>Redundancy</b>: many devices have primary and secondary ports that connect to two physically separate networks for seamless failover.</li>
<li><b>Dante Domain Manager</b> adds user authentication, roles, audit logs and routing across subnets for enterprise networks.</li>
<li><b>Dante AV</b> extends the ecosystem to video. Software options such as Dante Virtual Soundcard and Dante Via bring computers onto the network.</li>
</ul>

<h3>AES67</h3>
<p>AES67 is an <b>interoperability standard</b> for high-performance audio over IP. It defines common timing (PTPv2), transport (RTP over UDP) and formats so devices from different ecosystems (Dante in AES67 mode, Q-LAN, Ravenna, Livewire+ and others) can exchange audio. Expect to configure streams more manually than with native Dante.</p>

<h3>AVB / Milan</h3>
<p><b>AVB</b> (Audio Video Bridging, now part of IEEE Time-Sensitive Networking) builds timing and bandwidth reservation into the switches themselves, which guarantees delivery. It needs <b>AVB-capable switches</b>. <b>Milan</b> is a certification profile that makes AVB devices interoperate. It's popular in live sound and some install platforms.</p>

<h3>Platform-specific</h3>
<ul>
<li><b>Q-LAN</b> is Q-SYS's native audio and video networking, which also bridges to Dante and AES67.</li>
<li><b>CobraNet</b> was the pioneering Layer 2 protocol from the 1990s. It's legacy now, but you may still find it in older venues.</li>
</ul>
<div class="callout tip"><b>Free training:</b> Audinate's Dante Certification Levels 1 and 2 are a great next step after this module.</div>
`
    },
    {
      title: 'Video over IP',
      html: `
<p>AV-over-IP replaces fixed-size matrix switchers with encoders, decoders and a network switch. It's infinitely scalable, and every endpoint can be anywhere on the network.</p>
<table>
<tr><th>Approach</th><th>Network</th><th>Compression</th><th>Latency</th><th>Typical use</th></tr>
<tr><td>SDVoE</td><td>10 GbE</td><td>Uncompressed or light compression</td><td>Sub-frame</td><td>Matrix replacement, live venues, KVM</td></tr>
<tr><td>JPEG XS-based (incl. many IPMX products)</td><td>1–10 GbE</td><td>Light, visually lossless</td><td>Sub-frame to about a frame</td><td>4K on 1G, Pro AV interoperability</td></tr>
<tr><td>H.264 / H.265 encoders</td><td>1 GbE, WAN</td><td>Heavy (lossy)</td><td>Tens to hundreds of ms</td><td>Signage, overflow rooms, streaming, campus distribution</td></tr>
<tr><td>NDI</td><td>1 GbE+</td><td>Moderate (full NDI) or heavy (NDI|HX)</td><td>About a frame and up</td><td>Production, software workflows, streaming</td></tr>
<tr><td>SMPTE ST 2110</td><td>10–100 GbE</td><td>Uncompressed (or JPEG XS)</td><td>Very low</td><td>Broadcast plants</td></tr>
<tr><td>IPMX</td><td>1 GbE+</td><td>Uncompressed or compressed</td><td>Low</td><td>Open Pro AV standard built on ST 2110 and NMOS, adding HDCP and Pro AV features</td></tr>
<tr><td>Proprietary 1G systems</td><td>1 GbE</td><td>Varies</td><td>Varies</td><td>Many manufacturer ecosystems</td></tr>
</table>

<h3>Choosing a technology</h3>
<ul>
<li><b>Latency budget:</b> live IMAG and KVM mouse control need sub-frame latency. Signage doesn't care.</li>
<li><b>Network:</b> can you get a dedicated 10G network, or must you share the 1G corporate network?</li>
<li><b>Image quality:</b> 4:4:4 text from computers vs. motion video.</li>
<li><b>Interoperability:</b> open standards (IPMX, AES67, NDI) vs. a single-vendor ecosystem.</li>
<li><b>USB/KVM, audio extraction, control and HDCP</b> requirements.</li>
</ul>
<div class="callout"><b>Rule of thumb:</b> estimate the total multicast traffic each switch link will carry. A 10G uplink full of 4K streams fills up fast, so design the network topology for the worst case of every source being viewed at once.</div>
`
    },
    {
      title: 'Security & working with IT',
      html: `
<p>AV devices are network endpoints, and an unpatched touch panel with a default password is a real security risk. IT teams increasingly hold AV to the same standards as any other device.</p>
<h3>Security checklist</h3>
<ul>
<li>Change every <b>default password</b>. Use unique credentials, and a credential vault for the project.</li>
<li><b>Patch firmware</b> regularly and keep a record of versions.</li>
<li>Disable unused services such as Telnet, unsecured HTTP and unused ports. Prefer SSH, HTTPS and TLS.</li>
<li><b>Segment</b> AV onto its own VLANs with firewall rules that allow only what's needed.</li>
<li>Support <b>802.1X</b> network access control where the customer requires it.</li>
<li>Secure cloud management portals with SSO or MFA, and review who has access.</li>
<li>Keep wireless presentation and guest-connection gear off the corporate network unless it's been explicitly designed for it.</li>
</ul>

<h3>Documentation IT will ask for</h3>
<ul>
<li>A device list with MAC addresses, IP addresses, VLANs and hostnames.</li>
<li><b>Ports and protocols</b> each device uses, and which cloud services it contacts.</li>
<li>Bandwidth estimates and multicast requirements (IGMP, QoS, PTP).</li>
<li>PoE requirements per port.</li>
<li>Switch configuration requirements, or a ready-made configuration guide.</li>
</ul>
<div class="callout tip"><b>AV/IT convergence:</b> engage the IT team at the design stage, not on install day. A one-hour network requirements meeting early prevents weeks of delays later.</div>
`
    }
  ],
  quiz: [
    { q: 'How many usable host addresses are in a /24 subnet?', o: ['24', '128', '254', '65,534'], a: 2, e: '256 addresses minus network and broadcast = 254 usable.' },
    { q: 'What does IGMP snooping do?', o: ['Encrypts multicast', 'Forwards multicast only to ports that joined the group', 'Assigns IP addresses', 'Synchronizes clocks'], a: 1, e: 'Without it, multicast floods every port like broadcast.' },
    { q: 'IGMP snooping is on, but streams drop out after a few minutes. What is likely missing?', o: ['A DHCP server', 'An IGMP querier on the VLAN', 'PoE', 'An EDID'], a: 1, e: 'The querier keeps group memberships refreshed, and without it the snooping entries time out.' },
    { q: 'Which setting should usually be disabled on Dante ports?', o: ['QoS', 'Energy Efficient Ethernet (802.3az)', 'VLANs', 'IGMP'], a: 1, e: 'EEE power-saving can disrupt clocking and cause dropouts.' },
    { q: 'What is AES67?', o: ['A loudspeaker standard', 'An interoperability standard for audio over IP', 'A video codec', 'A cable type'], a: 1, e: 'AES67 lets different audio-networking ecosystems exchange streams.' },
    { q: 'Which technology requires network switches that specifically support it?', o: ['Dante', 'AVB / Milan', 'NDI', 'H.264 streaming'], a: 1, e: 'AVB/TSN depends on switch-level timing and stream reservation.' },
    { q: 'PoE+ (802.3at) provides up to how much power at the switch port?', o: ['15.4 W', '30 W', '60 W', '90 W'], a: 1, e: 'af = 15.4 W, at = 30 W, bt Type 3 = 60 W, Type 4 = 90 W.' },
    { q: 'Which AV-over-IP approach typically delivers sub-frame latency on 10 GbE?', o: ['H.264 streaming', 'SDVoE', 'NDI|HX', 'HLS'], a: 1, e: 'SDVoE is built for very low latency over 10G networks.' },
    { q: 'Which transport protocol do real-time media streams usually use?', o: ['TCP', 'UDP', 'FTP', 'SMTP'], a: 1, e: 'UDP avoids retransmission delays, and late packets are useless for real-time media anyway.' },
    { q: 'What is the first thing to do to secure a new AV device?', o: ['Enable Telnet', 'Change the default password', 'Put it on the guest Wi-Fi', 'Disable firmware updates'], a: 1, e: 'Default credentials are the most common attack path.' },
    { q: 'Dante unicast flows carry up to how many channels each?', o: ['1', '2', '4', '64'], a: 2, e: 'Each Dante unicast flow carries up to 4 channels.' }
  ]
});

AV.modules.push({
  id: 'control',
  icon: '🎛️',
  title: 'Control Systems',
  level: 'Core',
  summary: 'How rooms become one-touch: control platforms, protocols (IR, RS-232, IP), programming, UI design and monitoring.',
  lessons: [
    {
      title: 'What a control system does',
      html: `
<p>A control system turns a pile of equipment into one experience. Instead of five remotes, the user presses <b>“Present laptop”</b> and the control system powers on the display, selects the input, sets the volume, lowers the screen and dims the lights.</p>
<h3>Parts of a control system</h3>
<ul>
<li><b>Processor</b> (a hardware controller or software/virtual control) runs the program.</li>
<li><b>User interfaces</b>: touch panels, keypads, button panels, web and mobile UIs, scheduling panels and occupancy sensors.</li>
<li><b>Controlled devices</b>: displays, projectors, switchers, DSPs, cameras, lighting, shades, lifts.</li>
<li><b>Control paths</b>: IP, RS-232, IR, relays and I/O.</li>
</ul>

<h3>Platforms you'll encounter</h3>
<p>Major platforms include <b>Crestron</b>, <b>Extron</b>, <b>Q-SYS</b> (which combines audio, video and control), <b>AMX</b> (Harman, a long-time major player), <b>Kramer</b>, and software-based or cloud orchestration platforms. Many conferencing systems also run room control natively. Each has its own programming tools, device drivers and certification tracks.</p>

<h3>Configurable vs. custom-programmed</h3>
<ul>
<li><b>Configurable</b> systems are set up with wizards and templates instead of code. They're fast and standard, ideal for many identical rooms.</li>
<li><b>Custom programming</b> means a programmer writes logic for unique rooms such as boardrooms, divisible spaces and auditoriums. It's flexible, but it must be documented and maintained.</li>
</ul>
<div class="callout tip"><b>Ask:</b> what's the simplest system that meets the need? Every custom feature is something to support for years.</div>
`
    },
    {
      title: 'Control protocols: IR, RS-232, relays & IP',
      html: `
<table>
<tr><th>Method</th><th>How it works</th><th>Pros</th><th>Cons</th></tr>
<tr><td>Infrared (IR)</td><td>An emitter stuck over the device's IR window replays remote-control codes</td><td>Works with nearly anything</td><td>One-way (no feedback), line of sight, codes vary by model</td></tr>
<tr><td>RS-232 serial</td><td>Text or hex commands over a 3-wire cable (TX, RX, ground)</td><td>Reliable, two-way, standard on commercial gear</td><td>Short distance, settings must match, wiring mistakes are common</td></tr>
<tr><td>RS-485 / RS-422</td><td>Differential serial</td><td>Long distances, multiple devices on one bus (RS-485)</td><td>Less common in AV, mostly camera and lighting</td></tr>
<tr><td>Relays / contact closures</td><td>Open or close a circuit</td><td>Simple: screens, lifts, shades, door signs</td><td>On/off only</td></tr>
<tr><td>GPIO / digital I/O</td><td>Sense or output a voltage level</td><td>Occupancy sensors, switches, tally</td><td>Limited information</td></tr>
<tr><td>IP (TCP/UDP, Telnet, SSH, HTTP/REST, WebSocket)</td><td>Commands over the network</td><td>Two-way, rich feedback, no special cabling</td><td>Network dependencies, security, IP management</td></tr>
<tr><td>CEC</td><td>Control over HDMI</td><td>No extra cable</td><td>Inconsistent between brands</td></tr>
</table>

<h3>RS-232 in practice</h3>
<ul>
<li>On a DB9 at a typical device: <b>pin 2 = receive, pin 3 = transmit, pin 5 = ground</b>. One device's TX must reach the other's RX. A <b>null modem</b> cable swaps pins 2 and 3, and a straight-through cable doesn't. Check the manual for each device.</li>
<li>Communication settings must match on both ends: <b>baud rate</b> (9600 is very common), data bits, parity and stop bits, usually written as <code>9600 8N1</code> (9600 baud, 8 data bits, no parity, 1 stop bit).</li>
<li>Commands are <b>ASCII</b> (readable text such as <code>PWR ON</code>) or <b>hex</b> (byte strings such as <code>\\x02\\x50\\x4F\\x4E\\x03</code>). Many need a terminator such as a carriage return <code>\\r</code> (0x0D) and/or line feed <code>\\n</code> (0x0A).</li>
<li>Practical distance is about 15 m (50 ft) at common baud rates, so use extenders or HDBaseT's control pass-through for longer runs.</li>
</ul>

<h3>Protocols worth knowing by name</h3>
<ul>
<li><b>PJLink</b>: a standard projector and display control protocol over TCP port 4352.</li>
<li><b>SNMP</b>: monitoring and alerts, common for network gear and some displays.</li>
<li><b>REST APIs / JSON</b>: modern devices and cloud services.</li>
<li><b>Telnet (port 23)</b>: still common for AV control, but unencrypted. Prefer SSH where supported.</li>
</ul>
<div class="callout tip"><b>Troubleshooting control:</b> before blaming the program, prove the path. Send the command from a laptop (a serial terminal or a TCP client), watch for a response, and check the cable pinout and the communication settings.</div>
`
    },
    {
      title: 'Programming & user interface design',
      html: `
<h3>How control programs are built</h3>
<ul>
<li><b>Drivers / modules</b> encapsulate each device's protocol: send this string to turn on, parse this reply as “power is on”.</li>
<li><b>Logic</b> ties user actions to sequences: “System On” powers the display, waits for warm-up, selects an input and unmutes audio.</li>
<li><b>Feedback</b> shows true device state on the UI, such as a button lighting up only when the display confirms it's on. Two-way control (RS-232, IP) makes real feedback possible. IR can't.</li>
<li><b>Error handling</b> deals with devices that are offline, slow to respond, or changed manually.</li>
</ul>
<p>Programming environments vary by platform. Examples include Crestron SIMPL, SIMPL# and Construct, Extron Global Configurator and Control Script (Python-based), and Q-SYS Designer with Lua scripting and UCI touch-panel layouts.</p>

<h3>UI design principles</h3>
<ul>
<li><b>Start simple:</b> a welcome screen, a few big source buttons, volume, mic mute, and “End meeting”.</li>
<li><b>Mic mute and volume always visible</b> during a call. Mute state must be unmistakable, and should match LED rings on the microphones.</li>
<li><b>Consistent across rooms:</b> the same layout, icons and words everywhere, so users learn once.</li>
<li><b>Plain language:</b> “Laptop” and “Room PC”, not “HDMI 3” or “DM-RMC-2”.</li>
<li><b>Recover gracefully:</b> a “Reset room” or “Help” button, and an automatic shutdown at night.</li>
<li><b>Accessibility:</b> high contrast, large touch targets, mounting height and reach considerations.</li>
</ul>

<h3>Testing</h3>
<p>Test every button, in every state, in every order users might try. Then test what happens when devices are unplugged, powered off manually, or slow to boot. Write down the room's “default state” and make sure the system returns to it.</p>
`
    },
    {
      title: 'Scheduling, monitoring & remote management',
      html: `
<p>A single campus may have hundreds of rooms. You can't walk to each one to check it, so modern systems are managed centrally.</p>
<h3>Room scheduling</h3>
<ul>
<li>Scheduling panels outside rooms show availability and allow booking. They integrate with Microsoft 365 or Google Workspace calendars.</li>
<li><b>Occupancy sensors</b> release rooms that were booked but not used, and feed space-utilization data.</li>
<li>Calendar integration can also wake the room before a meeting and start the call with one touch.</li>
</ul>

<h3>Monitoring &amp; management</h3>
<ul>
<li>Cloud and on-premises platforms (for example Crestron XiO Cloud, Q-SYS Reflect, Extron GlobalViewer and conferencing-platform portals) show device online status, firmware versions and alerts, and allow remote configuration.</li>
<li>Track <b>usage analytics</b>: which rooms are used, which sources, call quality, and projector or light-source hours.</li>
<li>Alerting: email or ticketing when a display goes offline or a microphone battery is low.</li>
<li>Remote help: a help-desk tech can view a room's touch panel and fix it without a truck roll.</li>
</ul>
<div class="callout"><b>Why it matters to the business:</b> monitoring turns a one-time install into an ongoing <b>managed service</b>. That's recurring revenue for integrators and fewer failed meetings for customers.</div>
`
    }
  ],
  quiz: [
    { q: 'Which control method is one-way and offers no feedback?', o: ['RS-232', 'IP', 'Infrared (IR)', 'RS-485'], a: 2, e: 'IR only sends codes. It can’t tell whether the device responded.' },
    { q: 'A null modem RS-232 cable…', o: ['Swaps transmit and receive (pins 2 and 3)', 'Adds power', 'Converts to IP', 'Is shielded fiber'], a: 0, e: 'It crosses TX and RX so each device’s transmit reaches the other’s receive.' },
    { q: 'What does “9600 8N1” describe?', o: ['An IP address', 'Serial settings: 9600 baud, 8 data bits, no parity, 1 stop bit', 'A video resolution', 'A PoE class'], a: 1, e: 'Both ends of a serial link must use matching settings.' },
    { q: 'PJLink is a standard protocol for controlling…', o: ['Microphones', 'Projectors and displays', 'Lighting only', 'Network switches'], a: 1, e: 'PJLink is a common projector and display control standard (TCP 4352).' },
    { q: 'Which UI element should always be visible during a video call?', o: ['Lighting presets', 'Mic mute and volume', 'Firmware version', 'Input numbers'], a: 1, e: 'Users must always be able to mute and adjust volume, and see the mute state.' },
    { q: 'What is a control “driver” or “module”?', o: ['A cable', 'Code that wraps a device’s control protocol', 'A touch panel', 'A rack accessory'], a: 1, e: 'Drivers translate actions into device commands and parse feedback.' },
    { q: 'A relay output is a good choice to control…', o: ['A projector screen motor or lift', 'A Dante route', 'An EDID', 'A camera’s pan/tilt position'], a: 0, e: 'Screens, lifts and shades often use simple contact closures.' },
    { q: 'Why label touch panel buttons “Laptop” instead of “HDMI 3”?', o: ['It is shorter', 'Plain language means users don’t need technical knowledge', 'It’s required by HDCP', 'It reduces latency'], a: 1, e: 'Interfaces should speak the user’s language, not the equipment’s.' },
    { q: 'Remote monitoring platforms help integrators deliver…', o: ['Better EDIDs', 'Managed services and faster remote support', 'Higher SPL', 'More HDCP keys'], a: 1, e: 'Monitoring enables proactive support and recurring service revenue.' }
  ]
});
