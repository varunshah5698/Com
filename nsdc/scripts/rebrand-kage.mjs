/**
 * Rebrand the verified ThreeUI "Kage" landing-page document into the
 * NSDC × INFORMATRIX experience.
 *
 * Input : vendor/threeui/kage-original-reference.html  (SHA-256 c8e06b90397ac246…,
 *         byte-identical to the registered revision bundled in
 *         @designcodeio/threeui — the authentic Three.js experience)
 * Output: public/landing-pages/kage.html               (deployed, rebranded copy)
 *
 * Every replacement is an exact, unique match. If a target string is missing
 * or ambiguous the script throws instead of guessing. The untouched original
 * stays in vendor/ so changes remain auditable.
 *
 * Run: node scripts/rebrand-kage.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = 'vendor/threeui/kage-original-reference.html';
const DEST = 'public/landing-pages/kage.html';

let html = readFileSync(SRC, 'utf8');

/** Replace exactly one occurrence of `from` with `to`; throw otherwise. */
function one(from, to) {
  const first = html.indexOf(from);
  if (first === -1) throw new Error(`Rebrand target not found:\n${from}`);
  if (html.indexOf(from, first + 1) !== -1) throw new Error(`Rebrand target is not unique:\n${from}`);
  html = html.slice(0, first) + to + html.slice(first + from.length);
}

/* ------------------------------------------------------------------ metadata */
one('<title>Kage — Where stillness reveals the unseen</title>',
    '<title>NSDC × INFORMATRIX — Where curiosity reveals the unseen</title>');
one('<meta name="description" content="A five-chapter night walk through a Kyoto mountain temple. Charred cypress, lantern light and a vermilion moon, rendered live in WebGL.">',
    '<meta name="description" content="A five-chapter walk through the six worlds of NSDC × INFORMATRIX — the DJSCE AI &amp; Data Science committee and its tech club, rendered live in WebGL.">');
one(`<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2305070a'/%3E%3Ccircle cx='16' cy='17' r='8' fill='%23e0231c'/%3E%3Crect x='4' y='8' width='24' height='2.6' fill='%23dfe7e0'/%3E%3Crect x='7' y='13' width='18' height='2' fill='%23dfe7e0'/%3E%3C/svg%3E">`,
    `<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2305050A'/%3E%3Ccircle cx='16' cy='17' r='8' fill='%237443FF'/%3E%3Crect x='4' y='8' width='24' height='2.6' fill='%23F5F5F2'/%3E%3Crect x='7' y='13' width='18' height='2' fill='%23F5F5F2'/%3E%3C/svg%3E">`);

/* ------------------------------------------------------------ palette tokens */
one('  --vermilion:#e0231c;', '  --vermilion:#7443FF;');

/* --------------------------------------------------------------- loading UI */
one(`<div class="pre-mark">
      <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <circle cx="22" cy="24" r="9.5" stroke="#e0231c" stroke-width="1.2"/>
        <path d="M6 12h32M9.5 17h25M22 8v28" stroke="#dfe7e0" stroke-width="1.2"/>
      </svg>
    </div>
    <div class="pre-jp jp">影の道</div>`,
    `    <div class="pre-mark">
      <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <circle cx="22" cy="24" r="9.5" stroke="#7443FF" stroke-width="1.2"/>
        <path d="M6 12h32M9.5 17h25M22 8v28" stroke="#F5F5F2" stroke-width="1.2"/>
      </svg>
    </div>`,
    `<div class="pre-mark">
      <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <circle cx="22" cy="24" r="9.5" stroke="#7443FF" stroke-width="1.2"/>
        <path d="M6 12h32M9.5 17h25M22 8v28" stroke="#F5F5F2" stroke-width="1.2"/>
      </svg>
    </div>`);
one('<span>Raising the mountain temple</span>', '<span>Raising the committee world</span>');

/* ---------------------------------------------------------------- brand/nav */
one(`<svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="22" cy="25" r="8.6" fill="#e0231c" fill-opacity=".9"/>
      <path d="M5 13h34M9 18.4h26M22 8.5v27" stroke="#dfe7e0" stroke-width="1.5"/>
      <path d="M14 35.5h16" stroke="#dfe7e0" stroke-width="1.2" stroke-opacity=".6"/>
    </svg>
    <span class="brand-tx"><b>KAGE</b><i>HIDDEN REALMS OF KYOTO</i></span>`,
    `<svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="22" cy="25" r="8.6" fill="#7443FF" fill-opacity=".9"/>
      <path d="M5 13h34M9 18.4h26M22 8.5v27" stroke="#F5F5F2" stroke-width="1.5"/>
      <path d="M14 35.5h16" stroke="#F5F5F2" stroke-width="1.2" stroke-opacity=".6"/>
    </svg>
    <span class="brand-tx"><b>NSDC × INFORMATRIX</b><i>EXPLORE DATA · BUILD TOGETHER</i></span>`);

one(`<a class="nav-link" href="#gate" data-cursor><span>Temples</span><span class="alt">伽藍</span></a>
    <a class="nav-link" href="#pathways" data-cursor><span>Gardens</span><span class="alt">庭園</span></a>
    <a class="nav-link" href="#lessons" data-cursor><span>Rituals</span><span class="alt">神事</span></a>
    <a class="nav-link" href="#eternity" data-cursor><span>Afterlight</span><span class="alt">残光</span></a>`,
    `<a class="nav-link" href="#gate" data-cursor><span>Overview</span></a>
    <a class="nav-link" href="#pathways" data-cursor><span>Domains</span></a>
    <a class="nav-link" href="#lessons" data-cursor><span>Practice</span></a>
    <a class="nav-link" href="#eternity" data-cursor><span>Afterlight</span></a>`);

/* --------------------------------------------------------------------- hero */
one(`<div class="eyebrow" data-rv="fade"><span class="dot"></span> Chapter 00 — The Hidden Gate</div>
    <h1 class="display h-hero">
      <span class="mask-line"><span>Where stillness</span></span>
      <span class="mask-line"><span>reveals the</span></span>
      <span class="mask-line"><span>unseen.</span></span>
    </h1>
    <p class="hero-sub body" data-rv="up">Enter Kyoto through its quiet thresholds, where ritual,
      craft, and memory shape the path.</p>`,
    `<div class="eyebrow" data-rv="fade"><span class="dot"></span> One community — six worlds of data</div>
    <h1 class="display h-hero">
      <span class="mask-line"><span>Where curiosity</span></span>
      <span class="mask-line"><span>reveals the</span></span>
      <span class="mask-line"><span>unseen.</span></span>
    </h1>
    <p class="hero-sub body" data-rv="up">NSDC × INFORMATRIX — the AI &amp; Data Science community and its
      tech club at DJSCE, walking the same path. Explore data. Build together.</p>`);

one(`<div class="chip" data-chip="0" data-rv="up" data-cursor><span class="num">01</span>
        <span class="tx"><b>Thresholds</b><p>Discover the hidden gates that open on to deeper paths.</p></span></div>
      <div class="chip" data-chip="1" data-rv="up" data-cursor><span class="num">02</span>
        <span class="tx"><b>Still Gardens</b><p>Witness the courts where silence gently unfolds.</p></span></div>
      <div class="chip" data-chip="2" data-rv="up" data-cursor><span class="num">03</span>
        <span class="tx"><b>Sacred Craft</b><p>Embrace the hands and heritage that shape devotion.</p></span></div>
      <div class="chip" data-chip="3" data-rv="up" data-cursor><span class="num">04</span>
        <span class="tx"><b>Night Rituals</b><p>Explore the rites that awaken when the day is done.</p></span></div>`,
    `<div class="chip" data-chip="0" data-rv="up" data-cursor><span class="num">01</span>
        <span class="tx"><b>The Gate</b><p>One connected community — the committee and the club, together.</p></span></div>
      <div class="chip" data-chip="1" data-rv="up" data-cursor><span class="num">02</span>
        <span class="tx"><b>Six Domains</b><p>AI, machine learning, data science, finance, web, and design.</p></span></div>
      <div class="chip" data-chip="2" data-rv="up" data-cursor><span class="num">03</span>
        <span class="tx"><b>Student Builds</b><p>Chatbots, dashboards, vision — real projects, shipped.</p></span></div>
      <div class="chip" data-chip="3" data-rv="up" data-cursor><span class="num">04</span>
        <span class="tx"><b>Gatherings</b><p>HackOps, Technograd and the nights that made the community.</p></span></div>`);

one('<span class="peek-cap"><b class="jp">山門</b><i>Sanmon — before the bell</i></span>',
    '<span class="peek-cap"><i>The approach — before the bell</i></span>');

one('<div class="word-fb" aria-hidden="true">KAGE</div>',
    '<div class="word-fb" aria-hidden="true"></div>');

one(`<div class="hero-side" data-rv="up">
    <span class="v jp">影の道</span>
  </div>`, '');

/* -------------------------------------------------------- chapter I — gate */
one(`    <span class="k"><b>01</b> — The Sanmon</span><span class="rule"></span><span class="k jp">山門</span>`,
    `    <span class="k"><b>01</b> — The Gateway</span><span class="rule"></span>`);
one('<h2 class="display h-sec" data-rv="up">Charred cypress, worn stone, one gate left open.</h2>',
    '<h2 class="display h-sec" data-rv="up">One committee, one club, one gate left open.</h2>');
one(`<p class="lead" data-rv="up">Kage begins where the city stops: a mountain gate of cedar burned black,
        standing in its own weather. The soot is not decoration. It is how a board is taught to survive a
        hundred rainy seasons, and the first thing this place asks you to understand.</p>`,
    `<p class="lead" data-rv="up">NSDC × INFORMATRIX begins where curiosity starts: National Student Data Corps'
        DJSCE chapter and Team INFORMATRIX, joined as one gateway. The name is not decoration — it is how
        two communities learned they build better on the same path, and the first thing we ask you to understand.</p>`);
one(`<p class="body" data-rv="up">Climb the worn steps and the worship hall lifts out of the mist, its paper
        screens lit from inside like a lantern the size of a house. Above the eaves a vermilion moon holds
        its place, patient, half hidden. Nothing here is in a hurry. Neither, for the next ninety minutes,
        are you.</p>`,
    `<p class="body" data-rv="up">Walk in and the six domains lift out of the mist — artificial intelligence,
        machine learning, data science, computational finance, web development and UI/UX design — each lit
        from inside like a lantern the size of a house. Nothing here is in a hurry. Neither, for the next
        ninety minutes, are you.</p>`);
one(`<div><b>05</b><span>Chapters</span></div>
    <div><b>92</b><span>Minutes</span></div>
    <div><b>1611</b><span>Hall raised</span></div>
    <div><b>∞</b><span>Stillness</span></div>`,
    `<div><b>06</b><span>Domains</span></div>
    <div><b>02</b><span>Teams, one community</span></div>
    <div><b>05</b><span>Chapters</span></div>
    <div><b>∞</b><span>Curiosity</span></div>`);

/* ---------------------------------------------------- chapter II — student builds */
one(`    <span class="k"><b>02</b> — Still Gardens</span><span class="rule"></span><span class="k jp">庭園</span>`,
    `    <span class="k"><b>02</b> — Student Builds</span><span class="rule"></span>`);
/* The three live WebGL views now carry the committee's real flagship projects,
   as recorded in src/data/homepage.ts (titles verbatim from the Informatrix archive). */
one('<div class="card-lab"><b>Approach</b><span class="jp">参道</span></div>',
    '<div class="card-lab"><b>Chatbots</b></div>');
one('<div class="card-meta"><span>The long climb</span><span>01 / 03</span></div>',
    '<div class="card-meta"><span>AI Chatbot for Customer Support</span><span>01 / 03</span></div>');
one('<div class="card-lab"><b>Lanterns</b><span class="jp">灯籠</span></div>',
    '<div class="card-lab"><b>Dashboards</b></div>');
one('<div class="card-meta"><span>Lantern court</span><span>02 / 03</span></div>',
    '<div class="card-meta"><span>Financial Dashboard for Stock Analysis</span><span>02 / 03</span></div>');
one('<div class="card-lab"><b>Moonwater</b><span class="jp">月影</span></div>',
    '<div class="card-lab"><b>Vision</b></div>');
one('<div class="card-meta"><span>The wet court</span><span>03 / 03</span></div>',
    '<div class="card-meta"><span>Image Recognition Model — TensorFlow</span><span>03 / 03</span></div>');

/* ------------------------------------------------ chapter III — gatherings */
/* The five lesson slots become the committee's five documented gatherings —
   the same records shown on the /events page (HackOps and Technograd are the
   featured events in public/events/; the other three are from the site's own
   archive). Times are replaced by the archive status so nothing is invented. */
one(`    <span class="k"><b>03</b> — Sacred Craft</span><span class="rule"></span><span class="k jp">手業</span>`,
    `    <span class="k"><b>03</b> — Gatherings</span><span class="rule"></span>`);
one('<h2 class="display h-sec" data-rv="up">Five chapters. Ninety minutes. One quiet mind.</h2>',
    '<h2 class="display h-sec" data-rv="up">Gatherings on the path.</h2>');
one(`<p class="body-lg" data-rv="up">Each chapter is a walk, not a lecture. You arrive at the gate, climb the
      steps, sit with the lantern, and leave with one thing worth keeping.</p>`,
    `<p class="body-lg" data-rv="up">Sessions, seminars and build nights — the committee's gatherings, pictured in
      our gallery below. Current schedules live with the committee; nothing here is invented.</p>`);
one(`<h3>The Hidden Gate<em class="jp">山門</em></h3>
      <p>Why a gate is a sentence, and what you agree to when you walk under one.</p>
      <span class="t">14 min</span><i class="bar"></i>`,
    `<h3>HackOps</h3>
      <p>A night of building with the committee — the featured event in our gallery.</p>
      <span class="t">FEATURED</span><i class="bar"></i>
      <img class="les-ph" src="secret-pathways-assets/events/event-hackops.webp" alt="" width="320" height="240" loading="lazy" decoding="async">`);
one(`<h3>Borrowed Scenery<em class="jp">借景</em></h3>
      <p>Shakkei: composing with a mountain you will never own.</p>
      <span class="t">18 min</span><i class="bar"></i>`,
    `<h3>Technograd</h3>
      <p>The committee's flagship technology event — winners celebrated on stage.</p>
      <span class="t">FEATURED</span><i class="bar"></i>
      <img class="les-ph" src="secret-pathways-assets/events/event-technograd.webp" alt="" width="320" height="240" loading="lazy" decoding="async">`);
one(`<h3>Charred Cypress<em class="jp">焼杉</em></h3>
      <p>Yakisugi: burning a board black so the weather will let it live.</p>
      <span class="t">21 min</span><i class="bar"></i>`,
    `<h3>Synergy</h3>
      <p>Archive — the synergy of data and building, from earlier editions.</p>
      <span class="t">ARCHIVE</span><i class="bar"></i>
      <img class="les-ph" src="secret-pathways-assets/events/event-synergy.webp" alt="" width="320" height="240" loading="lazy" decoding="async">`);
one(`<h3>Lantern Light<em class="jp">灯籠</em></h3>
      <p>How a single ember decides the scale of everything around it.</p>
      <span class="t">17 min</span><i class="bar"></i>`,
    `<h3>Design Dojo</h3>
      <p>Archive — design practice, session after session.</p>
      <span class="t">ARCHIVE</span><i class="bar"></i>
      <img class="les-ph" src="secret-pathways-assets/events/event-design-dojo.webp" alt="" width="320" height="240" loading="lazy" decoding="async">`);
one(`<h3>The Vermilion Moon<em class="jp">朱月</em></h3>
      <p>Why the moon burns red over the valley, and what the garden does with it.</p>
      <span class="t">22 min</span><i class="bar"></i>`,
    `<h3>Inauguration</h3>
      <p>Archive — where the chapter began.</p>
      <span class="t">ARCHIVE</span><i class="bar"></i>
      <img class="les-ph" src="secret-pathways-assets/events/event-inauguration.webp" alt="" width="320" height="240" loading="lazy" decoding="async">`);

/* Real event photography on each Gatherings plate: a small framed thumb at the
   row's tail, absolutely positioned so the authored grid template stays as-is. */
one(`.les:hover .bar{ transform:scaleX(1); }`,
    `.les:hover .bar{ transform:scaleX(1); }
.les .les-ph{
  position:absolute; right:0; top:50%; transform:translateY(-50%);
  width:clamp(64px,6.4vw,104px); aspect-ratio:4/3; height:auto;
  object-fit:cover; border-radius:6px; border:1px solid var(--line-soft);
  filter:saturate(.92) brightness(.94); opacity:.92;
  transition:opacity .45s var(--ease), transform .45s var(--ease);
  pointer-events:none;
}
.les:hover .les-ph{ opacity:1; transform:translateY(-50%) scale(1.04); }
@media (max-width:1080px){ .les .les-ph{ width:56px; } }
@media (max-width:560px){ .les .les-ph{ display:none; } }
body[data-layout-curriculum="b"] .les{ padding-right:clamp(84px,9vw,140px); }
body[data-layout-curriculum="b"] .les .les-ph{ right:24px; top:24px; transform:none; width:clamp(88px,8vw,132px); }
body[data-layout-curriculum="b"] .les:hover .les-ph{ transform:scale(1.04); }
@media (max-width:820px){
  body[data-layout-curriculum="b"] .les{ padding-right:20px; }
  body[data-layout-curriculum="b"] .les .les-ph{ position:static; order:-1; width:100%; aspect-ratio:16/7; }
}`);

/* ------------------------------------------------- chapter IV — afterlight */
one('<div class="eyebrow" data-rv="fade">Chapter 04 — Afterlight</div>',
    '<div class="eyebrow" data-rv="fade">Chapter 04 — Afterlight</div>');
one(`<h2 class="display" data-rv="up">Afterlight</h2>
  <p class="body-lg" data-rv="up">The gate does not close behind you. Take the walk whenever the noise
    gets loud — it is always the same path, and never the same light.</p>`,
    `<h2 class="display" data-rv="up">Afterlight</h2>
  <p class="body-lg" data-rv="up">The gate does not close behind you. Come back whenever the noise gets
    loud — it is always the same community, and never the same light.</p>`);
one(`<a class="cta" href="#top" data-rv="fade" data-cursor>
    <i></i><span>Begin the walk</span>`,
    `<a class="cta" href="#top" data-rv="fade" data-cursor>
    <i></i><span>Walk it again</span>`);

/* ------------------------------------------------------------------- footer */
one(`<svg viewBox="0 0 44 44" fill="none" width="34" height="34" aria-hidden="true">
        <circle cx="22" cy="25" r="8.6" fill="#e0231c" fill-opacity=".9"/>
        <path d="M5 13h34M9 18.4h26M22 8.5v27" stroke="#dfe7e0" stroke-width="1.5"/>
      </svg>
      <p>A five-chapter night walk through a Kyoto mountain temple. Three illustrated garden field notes
        sit inside a live Three.js sanctuary.</p>`,
    `<svg viewBox="0 0 44 44" fill="none" width="34" height="34" aria-hidden="true">
        <circle cx="22" cy="25" r="8.6" fill="#7443FF" fill-opacity=".9"/>
        <path d="M5 13h34M9 18.4h26M22 8.5v27" stroke="#F5F5F2" stroke-width="1.5"/>
      </svg>
      <p>A five-chapter walk through the worlds of NSDC × INFORMATRIX — the DJSCE AI &amp; Data Science
        committee and its tech club, exploring data and building together inside a live Three.js sanctuary.</p>`);
one(`<div><h4>Chapters</h4><ul>
      <li><a href="#gate" data-cursor>The Sanmon</a></li>
      <li><a href="#pathways" data-cursor>Still Gardens</a></li>
      <li><a href="#lessons" data-cursor>Sacred Craft</a></li>
      <li><a href="#eternity" data-cursor>Afterlight</a></li>
    </ul></div>`,
    `<div><h4>Chapters</h4><ul>
      <li><a href="#gate" data-cursor>The Gateway</a></li>
      <li><a href="#pathways" data-cursor>Six Domains</a></li>
      <li><a href="#lessons" data-cursor>The Craft</a></li>
      <li><a href="#eternity" data-cursor>Afterlight</a></li>
    </ul></div>`);
one(`<div><h4>Practice</h4><ul>
      <li><a href="#lessons" data-cursor>Borrowed scenery</a></li>
      <li><a href="#lessons" data-cursor>Lantern light</a></li>
      <li><a href="#lessons" data-cursor>Charred cypress</a></li>
      <li><a href="#lessons" data-cursor>Raked gravel</a></li>
    </ul></div>
    <div><h4>Elsewhere</h4><ul>
      <li><a href="#top" data-cursor>Journal</a></li>
      <li><a href="#top" data-cursor>Field notes</a></li>
      <li><a href="#top" data-cursor>Colophon</a></li>
    </ul></div>`,
    `<div><h4>Domains</h4><ul>
      <li><a href="#pathways" data-cursor>Artificial Intelligence</a></li>
      <li><a href="#pathways" data-cursor>Machine Learning</a></li>
      <li><a href="#pathways" data-cursor>Data Science</a></li>
      <li><a href="#pathways" data-cursor>Computational Finance</a></li>
      <li><a href="#pathways" data-cursor>Web Development</a></li>
      <li><a href="#pathways" data-cursor>UI/UX Design</a></li>
    </ul></div>
    <div><h4>Committee</h4><ul>
      <li><a href="#top" data-cursor>DJSCE AI &amp; DS</a></li>
      <li><a href="#top" data-cursor>NSDC Chapter</a></li>
      <li><a href="#top" data-cursor>Team INFORMATRIX</a></li>
    </ul></div>`);
one('<span>© 2026 Kage — Kage no Michi</span>',
    '<span>© 2026 NSDC × INFORMATRIX</span>');
one('<span class="jp">静けさは一つの技である</span>',
    '<span>Explore data · Build together</span>');
one('<span>WebGL · Onest · Kyoto</span>',
    '<span>WebGL · Onest · DJSCE</span>');

/* NSDC integration: the host application owns global navigation (its bar sits
   over the scene), so the scene's own bar is retired to avoid a double deck.
   The chapter rail, burger sheet and the full scroll story stay intact. */
one(`.nav{
  /* Width comes from --vw, not from right:0. A fixed element resolves its
     inset against the initial containing block, and the page's own horizontal
     overflow makes that block wider than the screen — 437 against a 390 phone,
     860 against a 768 tablet — which carried the burger off the right edge.
     --vw is the layout viewport, written on every resize. */
  position:fixed; top:0; left:0; width:var(--vw, 100%); height:var(--nav-h); z-index:50;
  display:flex; align-items:center; gap:24px; padding:0 var(--pad);
  transition:transform .55s var(--ease);
}`, `.nav{
  position:fixed; top:0; left:0; width:var(--vw, 100%); height:var(--nav-h); z-index:50;
  pointer-events:none; visibility:hidden;
}`);

/* NSDC integration: the scene's red family is re-toned into the site's
   ultraviolet/amber design system (--vermilion already rides the documented
   primaryColor prop to #7443FF; everything below is the scene's own reds).
   Hues are preserved per role — crimson → violet, ember/amber → orchid/amber —
   so the night grading keeps its structure. */
const VIOLET_MAP = [
  /* --- CSS tokens & UI --- */
  ['#ff5a3c', '#a78bfa'],                                   /* ember accent → light violet */
  ['rgba(224,35,28,', 'rgba(116,67,255,'],                  /* UI washes → NSDC ultraviolet */
  ['rgba(232,52,28,', 'rgba(160,110,255,'],                 /* moon disc in no-webgl CSS → violet */
  ['rgba(158,20,16,', 'rgba(76,29,149,'],                   /* deep red → deep violet */
  ['rgba(96,12,12,', 'rgba(40,16,80,'],                     /* darkest red → darkest violet */
  ['rgba(228,104,24,', 'rgba(167,110,255,'],                /* orange halo → orchid halo */
  ['rgba(122,42,10,', 'rgba(66,32,120,'],                   /* deep orange → deep violet */
  /* --- inline card glows --- */
  ['rgba(255,142,108,', 'rgba(196,150,255,'],
  ['rgba(212,56,38,', 'rgba(124,58,237,'],
  ['rgba(255,138,104,', 'rgba(190,140,255,'],
  ['rgba(208,54,36,', 'rgba(118,52,235,'],
  ['rgba(255,198,124,', 'rgba(255,206,140,'],               /* flame glow kept warm-amber */
  ['rgba(226,118,40,', 'rgba(210,170,255,'],                /* flame glow → pale violet */
  /* --- script: wood/lacquer and scene surfaces --- */
  ['#7c1610', '#3d1f6e'],                                   /* gate lacquer coat → deep violet */
  ['hdr(1.72, 1.02, .94)', 'hdr(.95, .55, 1.6)'],           /* torii lacquer tint: flip R/B → violet */
  ['color: 0x120c0c,', 'color: 0x120c16,'],                 /* dark red metal → dark violet */
  ['emissive: 0x080000,', 'emissive: 0x080010,'],           /* red-black emissive → violet-black */
  ['#1a0c0b', '#160b26'],                                   /* no-webgl card gradient tail → violet */
  ['#241010', '#1d1030'],                                   /* no-webgl peek gradient tail → violet */
  ['rgba(180,40,16,', 'rgba(124,58,237,'],                  /* gate bloom → violet */
  ['rgba(140,32,14,', 'rgba(76,29,149,'],
  ['rgba(190,48,22,', 'rgba(139,92,246,'],
  ['rgba(196,110,76,', 'rgba(167,130,255,'],                /* path ruling → violet */
  ['rgba(150,66,26,', 'rgba(110,58,200,'],                  /* window glow on wall → violet */
  /* --- script: lights, glows, particles --- */
  ["texGlow('rgba(255,150,66,.80)', 'rgba(240,96,26,.24)')", "texGlow('rgba(200,150,255,.80)', 'rgba(150,90,255,.24)')"],
  ["texGlow('rgba(255,124,112,.90)', 'rgba(206,52,48,.26)')", "texGlow('rgba(180,140,255,.90)', 'rgba(124,58,237,.26)')"],
  ["texGlow('rgba(255,120,60,.9)', 'rgba(255,60,24,.28)')", "texGlow('rgba(190,130,255,.9)', 'rgba(140,70,255,.28)')"],
  ["texGlow('rgba(255,190,140,1)', 'rgba(255,120,60,.35)')", "texGlow('rgba(226,190,255,1)', 'rgba(180,120,255,.35)')"],
  /* --- script: three.js light & material tints --- */
  ['new THREE.PointLight(0xff5a24,', 'new THREE.PointLight(0x8b5cf6,'],   /* lantern light → violet */
  ['new THREE.PointLight(0xff8a26,', 'new THREE.PointLight(0xa78bfa,'],   /* hall light → orchid */
  ['new THREE.PointLight(0xff8420,', 'new THREE.PointLight(0x9d6ffa,'],   /* window lights → violet */
  ['new THREE.PointLight(0xffa049,', 'new THREE.PointLight(0xc4a8ff,'],   /* stair light → pale violet */
  ['new THREE.PointLight(0xff3a1c,', 'new THREE.PointLight(0x7443ff,'],   /* moon light → NSDC ultraviolet */
  ['new THREE.DirectionalLight(0xff6a42,', 'new THREE.DirectionalLight(0x8f6bff,'], /* moon key → violet */
  /* The MOON: the disc texture is neutral gray, so the color IS the grade.
     R must stay ≤ 1 so it never clips to white before B — that clipping is
     what turned every earlier attempt pink. B-led (B >> R > G) = violet. */
  ['hdr(3.6, .64, .61)', 'hdr(1.0, .5, 1.9)'],
  ['hdr(1.06, .48, .18)', 'hdr(1.06, .62, 1.05)'],          /* window paper glow → violet */
  ['hdr(2.3, .30, .085)', 'hdr(1.9, .95, 2.3)'],            /* shoji pane emissive → violet-white (B-led, never pink) */
  /* --- foliage & dark reds below the first pass's threshold --- */
  ['color: 0x2b0406, alphaTest', 'color: 0x2b1055, alphaTest'],  /* falling-leaf tint → deep purple */
  ['color: 0x40080a, roughness', 'color: 0x3b1a6e, roughness'],  /* 3D maple canopy → rich purple */
  ['emissive: 0x780200, emissiveIntensity: .72', 'emissive: 0x5b21b6, emissiveIntensity: .72'], /* canopy emissive → purple */
  /* --- canvas-tinted foliage in texBranchCutout: the leaf art is painted
     white then tinted red per-leaf; move the tint formula to violet (B-led) --- */
  ['hex(96 + v * 96, 14 + v * 22, 16 + v * 18)', 'hex(88 + v * 96, 22 + v * 30, 132 + v * 110)'], /* purple: R and B together, B ahead */
  ['0x7a5d2a', '0x6e5f45'],                                 /* torii gold trim: bronze, red-neutral */
  ['rgba(96,44,22,.12)', 'rgba(60,40,120,.12)'],            /* texSky warm valley bloom → violet */
  ["'rgba(12,4,4,.24)'", "'rgba(8,6,14,.24)'"],             /* wood rain shadow → neutral violet */
  ["'rgba(210,150,120,.05)'", "'rgba(150,130,210,.05)'"],   /* wood rain sheen → violet-gray */
];
for (const [from, to] of VIOLET_MAP) {
  let idx = 0, count = 0;
  while ((idx = html.indexOf(from, idx)) !== -1) { html = html.slice(0, idx) + to + html.slice(idx + from.length); idx += to.length; count++; }
  if (count === 0) throw new Error('violet remap: target not found: ' + from);
}

/* The giant text is retired entirely; the no-WebGL fallback shows the two
   committee logos instead, blended onto the dark scene like the site nav does. */
one(`.no-webgl .word-fb{
  display:block; position:absolute; left:0; right:0; bottom:16%; z-index:1;
  font-family:'Wordmark','Onest',sans-serif; font-weight:600; font-size:21.4vw; line-height:.78;
  letter-spacing:.052em; text-align:center; pointer-events:none;
  background:linear-gradient(#e2ece5, #97a89c); -webkit-background-clip:text; background-clip:text;
  color:transparent;
}`, `.no-webgl .word-fb{
  display:flex; position:absolute; left:0; right:0; bottom:16%; z-index:1;
  align-items:center; justify-content:center; gap:5vw; pointer-events:none;
}
.no-webgl .word-fb img{ width:auto; height:clamp(72px, 15vw, 190px); object-fit:contain; mix-blend-mode:screen; }`);

/* The peek/play section ("The approach — before the bell" preview card) is
   retired per request: the hero stays clean, no video-play teaser. Anchored
   splice instead of one(): the block's exact bytes shift with earlier rebrands. */
{
  const pStart = html.indexOf('  <a class="peek"');
  if (pStart === -1) throw new Error('peek block not found');
  const pEnd = html.indexOf('  </a>', pStart);
  if (pEnd === -1) throw new Error('peek block end not found');
  html = html.slice(0, pStart) + '  <!-- peek/play teaser retired -->' + html.slice(pEnd + '  </a>'.length);
}

/* ------------------------------------------------------------ runtime copy */
one(`/* =====================================================================
   KAGE — a live Kyoto mountain temple, after dark.
   Everything on this page is generated at runtime: no photographs,
   no video, no external assets beyond three.js and two subset fonts.
   ===================================================================== */`,
    `/* =====================================================================
   NSDC × INFORMATRIX — a live mountain-temple world, after dark.
   Everything on this page is generated at runtime: no photographs,
   no video, no external assets beyond three.js and two subset fonts.
   ===================================================================== */`);
/* The hero foreground is intentionally blank: the authored giant word (and the
   interim logo lockup) are retired so the valley, gate and moon open the scene
   unaccompanied. The reveal/dissolve choreography no-ops safely on an empty
   glyph list, and layoutWord() early-returns without a group. */
const fnStart = html.indexOf('function buildWordmark() {');
const fnEndMarker = 'const WORD = { glyphs: [], group: null, ink: null, reveal: 0 };';
const fnEnd = html.indexOf(fnEndMarker, fnStart);
if (fnStart === -1 || fnEnd === -1) throw new Error('buildWordmark span not found');
const BLANK_FN = `function buildWordmark() {
  /* NSDC × INFORMATRIX integration: no giant word, no lockup — the hero stays
     clear. Every consumer (frame(), layoutWord(), the polishing job) already
     guards on an empty glyph list, so nothing else changes. */
  WORD.glyphs = [];
}`;
html = html.slice(0, fnStart) + BLANK_FN + '\n\n' + html.slice(fnEnd);
one("console.error('[kage] job", "console.error('[nsdc] job");

/* ------------------------------------------------------------------- checks */
/* Internal debug globals (window.__kage etc.), CSS asset filenames (kage-*.webp)
   and internal style-sheet comments stay per integration rules: renaming them
   would break the packaged asset contract. Name branding must not appear in the
   visible DOM or the runtime script. Scene-noun comments ("temple") stay too:
   the authored Japanese temple scene is preserved by design and is never
   presented as NSDC activity anywhere. */
const scriptStart = html.indexOf('<script>\n/* ==');
const bodyStart = html.indexOf('<body>');
const visibleDom = html.slice(bodyStart, scriptStart);
for (const rx of [/Kage/i, /Kyoto/i, /\bKAGE\b/]) {
  const m = visibleDom.match(rx);
  if (m) throw new Error(`Template branding remains in visible markup: ${m[0]} at index ${m.index}`);
}
const scriptPart = html.slice(scriptStart);
for (const rx of [/(?<!__)kage/i, /kyoto/i]) {
  const m = scriptPart.match(rx);
  if (m) throw new Error(`Template branding leaks into the runtime script: ${m[0]} at index ${m.index}`);
}

/* English-only gate: no CJK may remain anywhere in the document. */
{
  const re = new RegExp('[\u3400-\u9fff\uf900-\ufaff\u3040-\u30ff]+', 'g');
  const hit = re.exec(html);
  if (hit) {
    const line = html.slice(0, hit.index).split('\n').length;
    throw new Error(`CJK text remains at line ${line}: ${hit[0]}`);
  }
}

writeFileSync(DEST, html);
const { createHash } = await import('node:crypto');
console.log('rebranded ->', DEST, Buffer.byteLength(html), 'bytes, sha256',
  createHash('sha256').update(html).digest('hex').slice(0, 16), '…');
console.log('script branding check: clean; markup branding check: clean');
