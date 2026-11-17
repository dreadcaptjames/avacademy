/* Signal Path — Module content: Video */
AV.modules.push({
  id: 'video',
  icon: '🖥️',
  title: 'Video & Displays',
  level: 'Core',
  summary: 'Resolution and bandwidth, HDMI/EDID/HDCP, display technologies, image sizing, projection, and switching.',
  lessons: [
    {
      title: 'Video signal basics',
      html: `
<h3>Resolution &amp; frame rate</h3>
<table>
<tr><th>Name</th><th>Pixels</th><th>Notes</th></tr>
<tr><td>720p (HD)</td><td>1280 × 720</td><td>Legacy, still common in streaming and conferencing</td></tr>
<tr><td>1080p (Full HD)</td><td>1920 × 1080</td><td>Still the workhorse of commercial AV</td></tr>
<tr><td>WUXGA</td><td>1920 × 1200</td><td>16:10, common in projectors and laptops</td></tr>
<tr><td>4K UHD</td><td>3840 × 2160</td><td>Standard for new large displays</td></tr>
<tr><td>DCI 4K</td><td>4096 × 2160</td><td>Cinema</td></tr>
<tr><td>8K UHD</td><td>7680 × 4320</td><td>Niche: large dvLED, signage, specialty</td></tr>
</table>
<p>Frame rates are usually 24, 25, 30, 50 or 60 frames per second, with 120 Hz and higher for gaming, simulation and some LED walls. <b>Progressive</b> (p) scanning draws every line each frame. <b>Interlaced</b> (i) alternates odd and even lines and is a broadcast legacy.</p>

<h3>Color: bit depth &amp; chroma subsampling</h3>
<ul>
<li><b>Bit depth</b>: 8-bit gives 256 levels per color channel (16.7 million colors), and 10-bit gives 1,024 levels. HDR needs 10-bit or more to avoid banding.</li>
<li><b>Chroma subsampling</b> saves bandwidth by storing color at lower resolution than brightness, because eyes are less sensitive to color detail:
  <ul>
  <li><b>4:4:4</b>: full color. Needed for crisp small text from computers.</li>
  <li><b>4:2:2</b>: half horizontal color resolution. Common in production.</li>
  <li><b>4:2:0</b>: quarter color resolution. Used by streaming, Blu-ray and many 4K60 links.</li>
  </ul></li>
<li><b>HDR</b> (HDR10, HLG, Dolby Vision) expands the brightness range and color. It needs compatible sources, links and displays end to end.</li>
</ul>

<h3>Bandwidth</h3>
<p>Uncompressed video bandwidth is width × height × frames per second × bits per pixel, plus blanking intervals and link encoding overhead. That's why 4K60 4:4:4 needs about 18 Gbps on an HDMI 2.0 link, and why AV-over-IP on 1 Gb networks must compress.</p>
<div data-widget="bandwidth"></div>
`
    },
    {
      title: 'Interfaces: HDMI, DisplayPort, USB-C, SDI, HDBaseT',
      html: `
<table>
<tr><th>Interface</th><th>Highlights</th><th>Practical distance</th></tr>
<tr><td>HDMI 1.4</td><td>Up to 10.2 Gbps, 4K30</td><td>Passive copper: a few meters for high rates, longer at 1080p</td></tr>
<tr><td>HDMI 2.0</td><td>18 Gbps, 4K60</td><td>Passive: ~3–5 m reliable at full rate. Active or fiber cables go further.</td></tr>
<tr><td>HDMI 2.1</td><td>Up to 48 Gbps (FRL), 4K120, 8K60, DSC compression</td><td>Short passive runs. Use certified Ultra High Speed cables or active optical cables.</td></tr>
<tr><td>HDMI 2.2</td><td>Up to 96 Gbps, announced 2025</td><td>Emerging</td></tr>
<tr><td>DisplayPort 1.4 / 2.x</td><td>Computer-centric, MST daisy-chaining, up to 80 Gbps on DP 2.x</td><td>Short passive runs</td></tr>
<tr><td>USB-C (DP Alt Mode)</td><td>Video, USB data and power on one cable. It's the modern laptop connection.</td><td>~1–2 m passive. Extend with dedicated USB-C extenders.</td></tr>
<tr><td>SDI (3G / 12G)</td><td>Broadcast coax with BNC connectors. Locking, robust and long-run.</td><td>~100 m at 3G, shorter at 12G (cable-dependent)</td></tr>
<tr><td>HDBaseT</td><td>Video, audio, control (IR/RS-232), Ethernet, USB and power over one category cable</td><td>Up to 100 m on Cat6A / shielded cable</td></tr>
<tr><td>Fiber extenders</td><td>Immune to electrical interference, very long runs</td><td>Hundreds of meters (multimode) to kilometers (singlemode)</td></tr>
<tr><td>VGA (legacy)</td><td>Analog RGB on a DE-15 connector</td><td>Being retired in most installs</td></tr>
</table>

<h3>EDID: the display's résumé</h3>
<p><b>EDID</b> (Extended Display Identification Data) is how a display tells a source what it supports: resolutions, refresh rates, color formats and audio formats. The source reads it over the cable through the HDMI <b>hot plug</b> and DDC lines and picks an output format.</p>
<ul>
<li>Problems start when switchers and extenders sit in the middle. The source might see the wrong EDID, or a different one after each switch, so it renegotiates and goes blank.</li>
<li><b>EDID management</b> fixes this. Set each switcher input to a known EDID, such as 1080p60 stereo or 4K60 4:2:0, chosen to suit every display it may feed.</li>
<li>Audio problems such as no sound or surround sound into a 2-channel DSP are often EDID problems too.</li>
</ul>

<h3>HDCP: content protection</h3>
<p><b>HDCP</b> (High-bandwidth Digital Content Protection) encrypts protected content between devices. Each device in the chain must authenticate.</p>
<ul>
<li>Versions: 1.x, plus 2.2 and 2.3, which 4K protected content generally requires. If any device can't support the required version, you get a black or error screen.</li>
<li>Repeaters (switchers, splitters) have limits on how many downstream devices they can authenticate.</li>
<li>Recorders, capture devices and streaming encoders generally <b>can't</b> receive HDCP-protected signals legally.</li>
<li>Many switchers let you disable HDCP on inputs that don't need it, which avoids handshake delays.</li>
</ul>
<p><b>CEC</b> (Consumer Electronics Control) lets HDMI devices control each other, such as turning a TV on. It's inconsistent between brands, so commercial systems usually control displays over RS-232 or IP instead.</p>
`
    },
    {
      title: 'Display technologies',
      html: `
<table>
<tr><th>Technology</th><th>How it works</th><th>Strengths</th><th>Watch-outs</th></tr>
<tr><td>LCD (LED-backlit)</td><td>Liquid crystals filter a backlight</td><td>Affordable, bright, huge range of sizes</td><td>Blacks limited by backlight, viewing angle varies by panel type</td></tr>
<tr><td>OLED</td><td>Each pixel emits its own light</td><td>Perfect blacks, thin, wide viewing angle</td><td>Lower peak brightness, burn-in risk with static content, cost</td></tr>
<tr><td>Direct-view LED (dvLED)</td><td>Modules of tiny LEDs tiled together</td><td>Seamless, any size or shape, very bright</td><td>Cost, power and heat, needs specialist processing and service</td></tr>
<tr><td>Projection</td><td>Light projected onto a screen</td><td>Very large images at lower cost</td><td>Sensitive to ambient light, needs screen and mounting design</td></tr>
<tr><td>Interactive flat panels</td><td>LCD plus touch overlay, often with built-in compute</td><td>Education, collaboration</td><td>OS updates and management</td></tr>
</table>

<h3>Commercial vs. consumer displays</h3>
<p>A consumer TV may look similar and cost less, but commercial displays typically offer:</p>
<ul>
<li>Rated duty cycles (16/7 or 24/7) and commercial warranties, often with on-site service.</li>
<li><b>RS-232 and LAN control</b>, power-on behavior settings, and the ability to lock out the IR remote and buttons.</li>
<li>Portrait mounting support, higher brightness, anti-glare finishes and no TV tuner.</li>
<li>Built-in system-on-chip (SoC) media players for signage, plus remote management.</li>
<li>Consistent models across years, so a company can standardize rooms.</li>
</ul>

<h3>Direct-view LED essentials</h3>
<ul>
<li><b>Pixel pitch</b> is the distance between pixel centers in millimeters. Smaller pitch means more resolution and more cost. Fine-pitch indoor walls run about 0.9–2.5 mm. Outdoor walls are often 4 mm and up.</li>
<li>A common rule of thumb puts the minimum comfortable viewing distance in meters at about the pixel pitch in millimeters. Some designers use 2–3× that for a more seamless look.</li>
<li>The <b>LED processor</b> (sending card) maps the content to the cabinets. Receiving cards in each cabinet drive the LEDs.</li>
<li>Consider refresh rate (camera flicker and scan lines on video), viewing angle, color calibration between batches, and front or rear service access.</li>
<li>Chip-on-board (COB) and similar packages improve durability against bumps.</li>
</ul>

<h3>Video walls (LCD)</h3>
<p>LCD video walls tile narrow-bezel panels. Specs to compare: <b>bezel-to-bezel gap</b> (for example 0.88 mm), brightness uniformity, and whether content is driven by daisy-chain, a video wall processor, or a matrix with per-output scaling. Mounts with pop-out service access are essential.</p>
`
    },
    {
      title: 'Image size & viewing geometry (DISCAS)',
      html: `
<p>A display that's too small is one of the most common AV design mistakes. If people can't read a spreadsheet from the back row, the system has failed, however good the picture looks.</p>
<h3>The legacy 4-6-8 rule</h3>
<p>For decades designers sized screens from the <b>farthest viewer distance</b>:</p>
<ul>
<li><b>÷ 4</b> for detailed / analytical viewing (inspecting drawings, reading fine detail)</li>
<li><b>÷ 6</b> for basic decision making / reading (presentations, spreadsheets)</li>
<li><b>÷ 8</b> for passive viewing (video, signage)</li>
</ul>
<p>…which gives the minimum <b>image height</b>. It's quick, but it ignores resolution and content.</p>

<h3>DISCAS (ANSI/AVIXA V202.01)</h3>
<p>DISCAS sizes images from what viewers actually need to see:</p>
<ul>
<li><b>Basic Decision Making (BDM):</b> the viewer must read and understand content, but not every pixel. The rule is based on <b>element height</b> (for example, the height of a lowercase letter as a percentage of image height). The farthest viewer should be no more than <b>200 × the element height</b> away.</li>
<li><b>Analytical Decision Making (ADM):</b> the viewer must see every detail, down to a single pixel or line (medical imaging, engineering). The calculation uses the display's resolution, based on a viewer resolving about one arc-minute of detail (a ratio of about 3,438 : 1).</li>
</ul>
<div data-widget="display"></div>

<h3>Viewing angles &amp; mounting</h3>
<ul>
<li>Keep viewers within the display's horizontal viewing angle, and avoid seats far off to the side.</li>
<li>Limit the <b>vertical angle</b> from the eye to the top of the image (about 30° is a common comfort limit) to prevent neck strain. Screens mounted too high are a classic mistake.</li>
<li>In video conference rooms, mount the camera close to the display, near eye level, so people appear to look at each other.</li>
</ul>
`
    },
    {
      title: 'Projection design',
      html: `
<h3>Throw ratio</h3>
<p><b>Throw ratio = throw distance ÷ image width.</b> A 1.5:1 lens fills a 10 ft-wide screen from 15 ft away.</p>
<ul>
<li><b>Short throw</b> (below about 1:1) and <b>ultra-short throw</b> (about 0.2–0.4:1) mount near the screen. That reduces shadows and glare in presenters' eyes, which suits classrooms.</li>
<li>Zoom lenses cover a range of throw ratios. Large-venue projectors take interchangeable lenses.</li>
<li><b>Lens shift</b> moves the image optically with no quality loss. <b>Digital keystone</b> correction throws away pixels and softens the image, so use it as a last resort.</li>
</ul>

<h3>Brightness &amp; screens</h3>
<ul>
<li>Projector brightness is rated in <b>lumens</b>. Screen luminance in foot-lamberts ≈ <code>lumens × screen gain ÷ screen area (ft²)</code>.</li>
<li><b>Screen gain</b> of 1.0 is a matte white surface that reflects evenly in all directions. Higher gain is brighter on-axis but narrows the good viewing angle and can show hot-spotting.</li>
<li><b>Ambient light rejecting (ALR)</b> screens reflect light from the projector's direction and reject light from other angles, such as ceiling lights.</li>
<li>Light sources: <b>laser-phosphor</b> projectors (about 20,000+ hours, instant on and off) have largely replaced lamps. Imaging technologies include DLP, 3LCD and LCoS.</li>
</ul>

<h3>Contrast: the real enemy is ambient light</h3>
<p>ANSI/INFOCOMM 3M-2011 defines <b>image system contrast ratio</b> as measured in the room, with ambient light included. Minimum ratios by viewing type:</p>
<table>
<tr><th>Viewing category</th><th>Minimum contrast ratio</th></tr>
<tr><td>Passive viewing</td><td>7 : 1</td></tr>
<tr><td>Basic decision making</td><td>15 : 1</td></tr>
<tr><td>Analytical decision making</td><td>50 : 1</td></tr>
<tr><td>Full-motion video</td><td>80 : 1</td></tr>
</table>
<p>Ambient light on the screen raises the black level, so doubling projector lumens doesn't double contrast in a bright room. Lighting control (zoning, dimming, shades) is often the most effective fix.</p>
<div data-widget="projector"></div>
`
    },
    {
      title: 'Switching, scaling & signal management',
      html: `
<table>
<tr><th>Device</th><th>Role</th></tr>
<tr><td>Presentation switcher</td><td>A few inputs to one or two outputs, often with a built-in scaler, audio DSP, amplifier and control. Ideal for classrooms and meeting rooms.</td></tr>
<tr><td>Matrix switcher</td><td>Any input to any output, in sizes from 4×4 to hundreds of ports. Modular frames accept cards for HDMI, HDBaseT and fiber.</td></tr>
<tr><td>Scaler</td><td>Converts resolution and frame rate so every source matches the display's native format.</td></tr>
<tr><td>Seamless switcher</td><td>Keeps outputs locked to a constant signal (a scaler on every output), so switching sources doesn't cause a blank screen while the display resyncs.</td></tr>
<tr><td>Distribution amplifier (DA) / splitter</td><td>One source to many displays</td></tr>
<tr><td>Extenders (TX/RX)</td><td>Carry signals over HDBaseT or fiber</td></tr>
<tr><td>Multiviewer / windowing processor</td><td>Shows several sources on one screen</td></tr>
<tr><td>Video wall processor</td><td>Splits and positions content across many displays</td></tr>
<tr><td>AV-over-IP encoders / decoders</td><td>Replace a hardware matrix with a network switch, so it scales to any size</td></tr>
</table>

<h3>Choosing an architecture</h3>
<ul>
<li><b>Small room:</b> a presentation switcher or a single-cable USB-C/HDMI table connection to a display, or a native conferencing system.</li>
<li><b>Divisible ballroom or training center:</b> a matrix, or AV-over-IP, plus processing for combining rooms.</li>
<li><b>Campus or stadium:</b> AV-over-IP distribution across the network, with a central control and monitoring system.</li>
</ul>
<div class="callout tip"><b>Design question to always ask:</b> “What happens when someone plugs in a device we never planned for?” Good EDID management, scaling, and a known default state answer it.</div>
`
    }
  ],
  quiz: [
    { q: 'Which chroma subsampling is needed for sharp small computer text?', o: ['4:2:0', '4:2:2', '4:4:4', '4:1:1'], a: 2, e: '4:4:4 keeps full color resolution, which matters for fine colored text.' },
    { q: 'What does EDID communicate?', o: ['Content encryption keys', 'Display capabilities such as resolutions and audio formats', 'IP address of the display', 'Control commands'], a: 1, e: 'EDID tells the source what the display can accept.' },
    { q: 'A Blu-ray player shows a black screen through a switcher, but a laptop works. The most likely cause is…', o: ['EDID', 'HDCP', 'Gain structure', 'PoE budget'], a: 1, e: 'Protected content needs every device in the chain to support HDCP at the required version.' },
    { q: 'HDBaseT can carry video, audio, control, Ethernet and power up to about…', o: ['15 m', '50 m', '100 m', '1 km'], a: 2, e: 'HDBaseT supports up to 100 m over suitable category cable.' },
    { q: 'Using the legacy 4-6-8 rule, a 36 ft farthest viewer reading spreadsheets (÷6) needs a minimum image height of…', o: ['4.5 ft', '6 ft', '9 ft', '12 ft'], a: 1, e: '36 ÷ 6 = 6 ft image height.' },
    { q: 'A projector with a 1.2:1 throw ratio filling a 10 ft-wide image sits about how far away?', o: ['8.3 ft', '10 ft', '12 ft', '15 ft'], a: 2, e: 'Throw distance = ratio × width = 1.2 × 10 = 12 ft.' },
    { q: 'Why is lens shift preferred over digital keystone correction?', o: ['It is cheaper', 'It moves the image optically without losing resolution', 'It increases brightness', 'It removes HDCP'], a: 1, e: 'Keystone correction discards pixels and softens the image.' },
    { q: 'Per ANSI/INFOCOMM 3M-2011, the minimum contrast ratio for basic decision making is…', o: ['7:1', '15:1', '50:1', '80:1'], a: 1, e: 'Passive 7:1, BDM 15:1, ADM 50:1, full-motion video 80:1.' },
    { q: 'On a dvLED wall, a smaller pixel pitch means…', o: ['Lower resolution', 'Higher resolution and closer viewing possible', 'Lower cost', 'Lower brightness always'], a: 1, e: 'Pixel pitch is the spacing between pixels, so smaller spacing means more pixels per area.' },
    { q: 'Why do commercial systems usually control displays via RS-232 or IP rather than CEC?', o: ['CEC is illegal', 'CEC implementations vary and are unreliable across brands', 'CEC requires fiber', 'CEC only works on projectors'], a: 1, e: 'Direct control protocols give predictable, two-way control with feedback.' },
    { q: 'A seamless switcher avoids blank screens on source change by…', o: ['Disabling HDCP', 'Keeping a scaled, constant output signal so the display never resyncs', 'Using analog video', 'Lowering resolution to 720p'], a: 1, e: 'Each output has a scaler that keeps the output timing locked.' },
    { q: 'Which is the main factor that destroys projected image contrast in a lit room?', o: ['Projector fan noise', 'Ambient light falling on the screen', 'Cable length', 'Frame rate'], a: 1, e: 'Ambient light raises the black level, which crushes contrast.' }
  ]
});
