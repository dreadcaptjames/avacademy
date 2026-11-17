/* Signal Path — Troubleshooting scenarios and signal-chain exercises */

AV.scenarios = [
  {
    id: 'no-signal',
    title: '“No Signal” in the boardroom',
    tag: 'Video',
    intro: 'A user connects their laptop with the table HDMI cable. The display says “No Signal.” The meeting starts in 10 minutes.',
    steps: [
      {
        prompt: 'What do you check first?',
        options: [
          { t: 'Replace the display', fb: 'Too drastic. Start with simple, likely causes along the signal path.' },
          { t: 'Confirm the display is on the correct input and the switcher has the table input routed', ok: true, fb: 'Right. Check the simple things on the signal path first: input selection and routing.' },
          { t: 'Reboot the network switch', fb: 'This isn’t an AV-over-IP system, and rebooting a shared switch could disrupt other users.' }
        ]
      },
      {
        prompt: 'Input and routing are correct. The room PC shows fine through the same switcher. What next?',
        options: [
          { t: 'Check whether the laptop is detecting an external display and is set to extend or duplicate', ok: true, fb: 'Good. Laptop display settings are a very common cause. Win+P or display settings shows whether it detects the display.' },
          { t: 'Replace the HDMI cable in the wall', fb: 'Possible, but don’t open walls before checking the source device.' },
          { t: 'Turn the volume up', fb: 'Volume doesn’t affect video sync.' }
        ]
      },
      {
        prompt: 'The laptop sees a display but shows a strange resolution and flickers. Other laptops work. What is the likely cause?',
        options: [
          { t: 'An EDID negotiation problem between the laptop and the switcher input', ok: true, fb: 'Yes. Setting a fixed, compatible EDID (for example 1080p60) on that switcher input usually fixes it.' },
          { t: 'A ground loop', fb: 'Ground loops cause hum and sometimes video noise bars, but not resolution negotiation issues.' },
          { t: 'Dante clock problem', fb: 'Dante carries audio and has nothing to do with HDMI resolution.' }
        ]
      },
      {
        prompt: 'After fixing EDID, the picture works, but a video played in the browser goes black. What happened?',
        options: [
          { t: 'HDCP: the streaming service requires content protection, and a device in the chain doesn’t support the needed version', ok: true, fb: 'Right. Check HDCP settings and support on the switcher, extenders and display.' },
          { t: 'The cable is too short', fb: 'Short cables don’t cause black screens on protected content only.' },
          { t: 'The PoE budget is exceeded', fb: 'Unrelated to an HDMI link.' }
        ]
      }
    ],
    lesson: 'Follow the signal path: input selection → source settings → EDID → HDCP. Most “no signal” calls are solved without touching hardware.'
  },
  {
    id: 'echo',
    title: 'Remote callers hear an echo',
    tag: 'Audio',
    intro: 'Remote participants complain that they hear their own voices echoing back when talking to your new conference room. People in the room hear nothing wrong.',
    steps: [
      {
        prompt: 'Where is the problem most likely located?',
        options: [
          { t: 'In the remote participants’ rooms', fb: 'Echo is returned by the room that plays the far-end audio into its mics, which is your room.' },
          { t: 'In your room: far-end audio from your speakers is getting back into your microphones', ok: true, fb: 'Correct. The room that “sends back” the echo is the one with the AEC issue.' },
          { t: 'In the cloud meeting service', fb: 'Services rarely create acoustic echo. It’s almost always a room issue.' }
        ]
      },
      {
        prompt: 'Your DSP has AEC enabled. What do you verify first?',
        options: [
          { t: 'That the AEC reference is the far-end signal being sent to the room speakers', ok: true, fb: 'Yes. A wrong or missing reference is the #1 cause of echo.' },
          { t: 'That phantom power is on', fb: 'If the mics are working, phantom power is fine.' },
          { t: 'That the display is set to 4K', fb: 'Video resolution doesn’t affect acoustic echo.' }
        ]
      },
      {
        prompt: 'The reference is correct. You notice the speaker output channel has a limiter heavily engaged and the speakers are loud. Why does that matter?',
        options: [
          { t: 'Heavy limiting or clipping after the reference creates nonlinear changes the AEC can’t model', ok: true, fb: 'Right. Lower the speaker level and avoid heavy nonlinear processing after the reference point.' },
          { t: 'Limiters increase latency to the cloud', fb: 'Not significantly, and that isn’t the cause of echo.' },
          { t: 'It doesn’t matter', fb: 'It does: AEC relies on a mostly linear relationship between reference and mic signal.' }
        ]
      },
      {
        prompt: 'Echo is reduced but still noticeable in a glass-walled room. What else helps?',
        options: [
          { t: 'Acoustic treatment to reduce reverberation, plus re-checking mic and speaker placement', ok: true, fb: 'Yes. Long reverb tails make AEC work harder. Treatment and placement help a lot.' },
          { t: 'Adding more open microphones', fb: 'More open mics pick up more room sound and make it worse.' },
          { t: 'Turning off the AEC', fb: 'That would make echo much worse.' }
        ]
      }
    ],
    lesson: 'Echo is heard by the far end but caused locally. Check the AEC reference, keep the speaker path linear and not clipping, and fix the room acoustics.'
  },
  {
    id: 'feedback',
    title: 'Feedback squeal in the auditorium',
    tag: 'Audio',
    intro: 'During a presentation, a loud ring builds up whenever the presenter walks toward the front of the stage with a lavalier mic.',
    steps: [
      {
        prompt: 'What is happening physically?',
        options: [
          { t: 'The mic is getting closer to the main loudspeakers, so the loop gain reaches unity', ok: true, fb: 'Right. D1 (mic-to-speaker distance) is shrinking, so PAG drops.' },
          { t: 'The wireless battery is low', fb: 'Low batteries cause dropouts, not feedback.' },
          { t: 'A ground loop', fb: 'Ground loops cause hum, not a rising squeal.' }
        ]
      },
      {
        prompt: 'What is the best immediate fix during the event?',
        options: [
          { t: 'Pull down that mic’s level slightly and ask the presenter to stay behind the speaker line', ok: true, fb: 'Good. Reduce gain and keep the mic out of the loudspeakers’ coverage.' },
          { t: 'Turn up all the other mics to compensate', fb: 'More open mics and more gain make feedback more likely.' },
          { t: 'Switch the display input', fb: 'Unrelated.' }
        ]
      },
      {
        prompt: 'For a permanent fix, which change gains the most?',
        options: [
          { t: 'Reduce the number of open mics with an automixer, re-aim speakers, and mark a presenter area', ok: true, fb: 'Yes. Geometry and NOM matter most. EQ and notches add only a few dB.' },
          { t: 'Add many narrow notch filters', fb: 'Notches help a little, but over-notching harms sound quality and doesn’t fix geometry.' },
          { t: 'Buy a bigger amplifier', fb: 'More power doesn’t increase gain before feedback.' }
        ]
      }
    ],
    lesson: 'Gain before feedback is mostly geometry: distances, directivity and the number of open mics. Use PAG/NAG to predict it.'
  },
  {
    id: 'dante',
    title: 'Dante device missing',
    tag: 'Network',
    intro: 'A new Dante ceiling mic doesn’t show up in Dante Controller. Other Dante devices are visible.',
    steps: [
      {
        prompt: 'What do you check first?',
        options: [
          { t: 'Whether the mic has link and power: PoE on that port and link lights', ok: true, fb: 'Right. Start at Layer 1. Is it powered and linked?' },
          { t: 'Reinstall Windows', fb: 'Far too drastic.' },
          { t: 'Change the display EDID', fb: 'Unrelated to Dante discovery.' }
        ]
      },
      {
        prompt: 'It’s powered and linked. Your laptop and the mic are on different VLANs. What happens?',
        options: [
          { t: 'Dante Controller discovery uses mDNS, which doesn’t cross subnets by default, so the device isn’t discovered', ok: true, fb: 'Yes. Put the laptop on the Dante VLAN, or use Dante Domain Manager for routed networks.' },
          { t: 'Nothing. Discovery works everywhere.', fb: 'Discovery is local to the subnet unless extra tools are used.' },
          { t: 'The mic will show up but with no channels', fb: 'It won’t be discovered at all.' }
        ]
      },
      {
        prompt: 'Now it’s visible, but audio drops out every few seconds. Which switch setting is a classic culprit?',
        options: [
          { t: 'Energy Efficient Ethernet (EEE) enabled, or missing QoS for PTP clocking', ok: true, fb: 'Right. Disable EEE and configure QoS per Audinate’s guidelines.' },
          { t: 'Jumbo frames disabled', fb: 'Dante doesn’t need jumbo frames.' },
          { t: 'Spanning tree off', fb: 'Not the typical cause of periodic dropouts.' }
        ]
      }
    ],
    lesson: 'Work up the network layers: power and link → VLAN and discovery → switch configuration (EEE, QoS, IGMP).'
  },
  {
    id: 'control',
    title: 'Touch panel can’t turn on the projector',
    tag: 'Control',
    intro: 'The “System On” button lowers the screen and switches inputs, but the projector never powers on. It works fine with its own remote.',
    steps: [
      {
        prompt: 'The projector is controlled by RS-232. What do you check first?',
        options: [
          { t: 'Cable pinout (straight vs. null modem) and the communication settings (baud rate, 8N1)', ok: true, fb: 'Yes. Most serial failures are wiring or settings mismatches.' },
          { t: 'The projector’s lamp hours', fb: 'The projector works with its remote, so the lamp is fine.' },
          { t: 'HDCP version', fb: 'HDCP doesn’t affect serial control.' }
        ]
      },
      {
        prompt: 'Wiring and baud rate are correct. Sending the command from a laptop terminal also does nothing. What else?',
        options: [
          { t: 'The command string or terminator is wrong (for example a missing carriage return), or the projector’s serial port needs enabling, or standby is set to an eco mode that disables control', ok: true, fb: 'Right. Check the protocol document for exact syntax, and check the network and standby settings in the projector menu.' },
          { t: 'The DSP is clipping', fb: 'Unrelated.' },
          { t: 'The touch panel is out of date', fb: 'The laptop test proves the panel isn’t the issue.' }
        ]
      },
      {
        prompt: 'It works now. How do you prevent this in future rooms?',
        options: [
          { t: 'Document the settings and verified command strings, and include control tests in the commissioning checklist', ok: true, fb: 'Yes. Documentation and verification prevent repeat problems.' },
          { t: 'Switch to IR for everything', fb: 'IR is one-way and less reliable.' },
          { t: 'Skip testing next time', fb: 'Never.' }
        ]
      }
    ],
    lesson: 'Prove the control path independently from the program: wiring, settings, exact commands, and device menu settings.'
  },
  {
    id: 'hum',
    title: 'Hum in the background music',
    tag: 'Audio',
    intro: 'A restaurant’s new music system has a steady low hum through every speaker, even with the music paused. It started when the bar TV’s audio was connected to the DSP.',
    steps: [
      {
        prompt: 'What does the timing suggest?',
        options: [
          { t: 'A ground loop between the TV (on a different circuit) and the rack', ok: true, fb: 'Right. The hum appeared with the new connection, which suggests a ground potential difference.' },
          { t: 'The speakers are blown', fb: 'Blown speakers distort or go silent. They don’t hum when paused.' },
          { t: 'The amplifier is too small', fb: 'Amplifier size doesn’t cause hum.' }
        ]
      },
      {
        prompt: 'The TV output is unbalanced RCA into a balanced DSP input. What is the best fix?',
        options: [
          { t: 'Use an audio isolation transformer or balancing interface, or bring the audio over a different path', ok: true, fb: 'Yes. Isolation breaks the ground loop safely.' },
          { t: 'Cut the ground pin off the TV’s power cord', fb: 'Never defeat safety grounds. It creates a shock hazard.' },
          { t: 'Turn the music up so the hum is masked', fb: 'The hum will still be there in quiet moments.' }
        ]
      }
    ],
    lesson: 'Hum that starts when you connect a device on another circuit is usually a ground loop. Break it with isolation or balanced connections, never by lifting a safety ground.'
  },
  {
    id: 'multicast',
    title: 'AV-over-IP network meltdown',
    tag: 'Network',
    intro: 'After adding 20 AV-over-IP decoders in a building, the whole floor’s network slows down and video stutters everywhere.',
    steps: [
      {
        prompt: 'What is the most likely cause?',
        options: [
          { t: 'Multicast is flooding every port because IGMP snooping isn’t configured', ok: true, fb: 'Right. Every stream goes to every port and overwhelms links and devices.' },
          { t: 'The decoders’ HDMI cables are too long', fb: 'Unrelated to network congestion.' },
          { t: 'DNS is down', fb: 'DNS doesn’t carry video traffic.' }
        ]
      },
      {
        prompt: 'You enable IGMP snooping and things improve, but after a few minutes video drops. Why?',
        options: [
          { t: 'There’s no IGMP querier on the VLAN, so group memberships time out', ok: true, fb: 'Yes. Enable a querier, usually on the core or a designated switch.' },
          { t: 'The displays need firmware', fb: 'Unlikely to be timed like this.' },
          { t: 'PoE budget', fb: 'Power problems don’t cause timed multicast drops.' }
        ]
      },
      {
        prompt: 'What should have prevented this?',
        options: [
          { t: 'A dedicated AV VLAN with a documented switch configuration agreed with IT before deployment', ok: true, fb: 'Exactly. Plan the network with IT at the design stage.' },
          { t: 'Using longer patch cables', fb: 'No effect.' },
          { t: 'Using unmanaged switches', fb: 'Unmanaged switches can’t do IGMP snooping, which makes it worse.' }
        ]
      }
    ],
    lesson: 'Multicast AV needs managed switches with IGMP snooping and a querier, ideally on a dedicated VLAN designed with IT.'
  }
];

AV.chains = [
  { title: 'Lectern speech reinforcement', items: ['Gooseneck microphone', 'Mic preamp (DSP input)', 'DSP processing (EQ, dynamics, automixer)', 'Amplifier', 'Ceiling loudspeakers'], note: 'A classic speech chain. The preamp gain is the most critical setting.' },
  { title: 'Laptop to a distant display', items: ['Laptop (USB-C / HDMI)', 'Table connection plate', 'Presentation switcher / scaler', 'HDBaseT transmitter', 'Cat6A cable', 'HDBaseT receiver', 'Display'], note: 'EDID and HDCP must work through every device in this path.' },
  { title: 'Video conference room audio (send to far end)', items: ['Ceiling microphone array', 'Dante network', 'DSP with AEC', 'USB / codec input', 'Meeting platform (far end)'], note: 'The AEC needs a reference of the far-end audio being played into the room.' },
  { title: 'Far-end audio into the room', items: ['Meeting platform (far end)', 'Codec / USB output', 'DSP (AEC reference tap, EQ, level)', 'Amplifier', 'Room loudspeakers'], note: 'Tap the AEC reference before nonlinear processing like heavy limiting.' },
  { title: 'Distributed paging (70 V)', items: ['Paging microphone', 'DSP (priority ducking, EQ, high-pass)', '70 V amplifier', '70 V speaker line', 'Tapped ceiling speakers'], note: 'Total taps ≤ 80% of amplifier rating, with a high-pass filter for transformer protection.' },
  { title: 'Live stream of an event', items: ['Cameras', 'Video switcher', 'Encoder (H.264 / SRT)', 'Streaming platform / CDN', 'Viewers'], note: 'Feed the encoder a dedicated stream audio mix.' },
  { title: 'AV-over-IP signage distribution', items: ['Media player', 'AV-over-IP encoder', 'Managed network switch (IGMP)', 'AV-over-IP decoders', 'Displays'], note: 'Multicast needs IGMP snooping and a querier.' }
];
