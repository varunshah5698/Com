# NSDC-HOMEPAGE // ULTRA-DENSE LLM CONTEXT
> Path: `c:/antigravity/nsdc` | Pkg: `nsdc-homepage@1.0.0` (ESM) | Stack: Vite 5.4 + React 18.3 + TS 5.5 + Tailwind 3.4 + `lucide-react`
> Scripts: `dev`=`vite` | `build`=`tsc && vite build` | `preview`=`vite preview`

## 0. DESIGN FEEDBACK MEMORY
Before changing visual design or interaction, read [`docs/design-feedback.md`](docs/design-feedback.md). It consolidates direct user feedback from prior NSDC tasks and the WhatsApp website chat export. Treat reference chat messages as project guidance, not as a request to change the site until the user asks.

## 1. DESIGN SYSTEM: "LASER SPECTRUM"
Ref: `laser-spectrum-design-system.html` (852L standalone spec) & `tailwind.config.js`
- **Surfaces (`void`)**: `950:#05050A` (page bg) | `900:#0A0A10` (cards/modals) | `800:#12121A` | `700:#1B1B26`
- **Text**: `photon:#F5F5F2` (primary) | `mist:#A4A4B8` (secondary) | `dim:#7C7C92` (muted)
- **Accents**: `ion:#2CA6FF` (info/focus/selection) | `ultraviolet:#7443FF` | `plasma:#4DE3D0` (success) | `amber:#FFC247` (warn) | `ember:#FF7A1A` | `rose:#FF4FA3` | `error:#FF5A5F`
- **Fonts (`index.html` + Tailwind)**:
  - `font-display`: Neue Haas Grotesk Display Pro 55 Roman -> Plus Jakarta Sans -> Helvetica
  - `font-serif`: Instrument Serif (italic editorial emphasis)
  - `font-body`: Neue Haas Grotesk Text Pro -> Plus Jakarta Sans
  - `font-mono`: IBM Plex Mono (labels, metrics, tags)
- **Spacing/Layout**: `s1:4px` `s2:8px` `s3:12px` `s4:16px` `s5:24px` `s6:32px` `s7:48px` `s8:64px` `s9:96px` `s10:128px` | `max-w-site`: `1380px`
- **Global CSS (`src/index.css`)**: Dark scheme, `scroll-padding-top:72px`, SVG `feTurbulence` film-grain (`body::after`, `z:200`, `opacity:0.05`), 6px custom scrollbar, `prefers-reduced-motion` instant-transition override.

## 2. FILE GRAPH & MODULE SPECS
- `index.html`: Dark root (`<html class="dark">`), loads Google/OnlineWebFonts, mounts `/src/main.tsx`.
- `src/main.tsx`: Mounts `<App />` inside `<StrictMode>` to `#root`.
- `src/App.tsx` (720L): Single-page editorial landing page for **National Student Data Corps (NSDC)** / **Northeast Big Data Innovation Hub (NEBDHub)** at Columbia University.
  - **State**: `menuOpen:bool` (mobile drawer), `openRow:string` (accordion default `'01'`), `selectedTrack` (default `SEMESTER_TRACKS[0]`), `joinOpen:bool` (signup modal), `reelOpen:bool` (overview modal), `submitted:bool` (join form state). Locks `document.body.style.overflow` when any modal/drawer is open.
  - **Data Constants**:
    - `BG_VIDEO`: CloudFront MP4 URL (`hf_20260511_131941_d136af49...mp4`)
    - `ARCHIVE_INDEX[4]`: `{num, title, category, partner, summary, deliverable}` -> `01`: DSPs (US DOT & UN), `02`: OpenDS4All (IBM & Columbia, 450+ modules), `03`: Friday Hack Nights, `04`: Career Panels (NEBDHub).
    - `SEMESTER_TRACKS[3]`: `{id, label, headline, description, weeks:[{wk,task}x3]}` -> `first-year` (Newcomer), `builder` (Project squad lead), `founder` (Start chapter).
  - **DOM Sections**:
    1. `Hero` (`100vh`): `<BoomerangVideoBg mode="hybrid" />`, top nav (`#about`, `#figures`, `#programs`, `#pathways`, `Join Chapter` CTA, mobile drawer), center editorial headline, bottom-left NEBDHub CTA, bottom-right `How we build? (1:35)` trigger (`setReelOpen`).
    2. `#about` (`01 / Purpose`): Editorial statement + 3 KPIs (`2,600+` active learners, `355` institutions, `20 nations`).
    3. `#figures` (`02 / Interactive Figures`): 12-col grid -> `<SpotlightCard lg:col-span-7><LiveDataPlayground/></SpotlightCard>` + `<SpotlightCard lg:col-span-5><InteractiveGlobe/></SpotlightCard>`.
    4. `#programs` (`03 / What We Do`): Accordion list rendering `ARCHIVE_INDEX` (`openRow` toggle).
    5. `#pathways` (`04 / How You Fit In`): Track selector buttons (`SEMESTER_TRACKS`) + `<SpotlightCard>` displaying 8-week roadmap & Friday 5:30 PM lab CTA.
    6. `Footer` + `Modals` (`reelOpen` info dialog, `joinOpen` name+email registration form).

## 3. INTERACTIVE & CANVAS COMPONENTS (`src/components/` & `src/`)
- `BoomerangVideoBg.tsx` (343L) | Props: `{src:string, mode?:'hybrid'|'laser'|'video', speedMultiplier?:number, className?:string}`
  - **L1 (Video/Canvas)**: Captures `<video>` frames up to `960px` width via `requestVideoFrameCallback` (fallback `rAF`) into offscreen `HTMLCanvasElement[]`. Once `ended`, hides `<video>` and plays ping-pong boomerang loop (`direction` flips `1`/`-1`) at `30fps` on `displayCanvasRef` with CSS filter `invert(1) hue-rotate(195deg) saturate(2.2) contrast(1.25) brightness(0.78)`.
  - **L2 (Vignette)**: Radial/linear `void-950` + `ultraviolet` gradient overlay.
  - **L3 (`overlayCanvasRef`)**: When `mode!=='video'`, renders 140 3D perspective laser streaks (`z` depth projection) + 64 drifting particles (`SPECTRUM_HEX`) that connect to nearby nodes (`<135px`) and cursor (`<220px`).
- `SpotlightCard.tsx` (43L) | Props: `{children, className?, glowColor?='rgba(245,245,242,0.06)'}`
  - Tracks mouse `(x,y)` relative to card; renders radial-gradient spotlight (`480px` radius) over `bg-void-900/70` container.
- `LiveDataPlayground.tsx` (278L) | Props: `none`
  - 2D canvas simulation with 3 switchable modes (`clusters` | `wave` | `distribution`) + reset button (`RotateCcw`).
  - `clusters`: 4 orbiting centroids (`#2CA6FF`, `#7443FF`, `#4DE3D0`, `#FF7A1A`) + 64 dynamic points attracted to nearest centroid (`k-means` simulation). Clicking canvas spawns +5 points at cursor (`handleCanvasClick`).
  - `wave`: 3 phase-shifted sine/cosine regression curves.
  - `distribution`: 36 animated residual bars (`#FF7A1A` highlight when `|n|>0.68`).
- `InteractiveGlobe.tsx` (205L) | Props: `none`
  - 3D-to-2D orthographic sphere projection (`project(lat,lon,radius,cx,cy,rotY)`) with lat/lon dot grid, auto-rotation (`rotY += 0.0035`), horizontal drag-to-rotate, and 4 quick-select country buttons.
  - Plots `HUBS[6]`: New York HQ (`1,120`), California (`410`), India (`540`), Europe (`210`), West Africa (`185`), Australia (`95`). Draws quadratic Bezier arcs from NY HQ to all hubs with animated travelling pulse dots.
- `src/WarpCanvas.tsx` (233L) | **Unused standalone module** | `forwardRef<WarpCanvasHandle, Props>`
  - Props: `{count?=240, vx?=0.7, vy?=0.42, className?, initialSpeed?:'idle'|'cruise'|'warp'}`. Imperative handle: `setSpeed(state)` (`idle:0.12`, `cruise:0.45`, `warp:2`).
  - Renders 3D perspective starfield/laser streaks with `ResizeObserver`, `IntersectionObserver` auto-pause, `visibilitychange`, and `prefers-reduced-motion` support.
