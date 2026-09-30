# InfoMatrix Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the DJS InfoMatrix homepage as a polished Laser Spectrum editorial experience with a calm hybrid video/signal-mesh hero, clearer content hierarchy, interactive domain and project sections, and strong dual CTAs.

**Architecture:** Keep the existing Vite/React/Tailwind application and route-preserving homepage entry point. Split the current monolithic homepage into focused data and presentation components, reuse `BoomerangVideoBg`, `SpotlightCard`, `LiveDataPlayground`, and `InteractiveGlobe` only where they serve the new structure, and add a new low-cost signal-mesh layer instead of the current beam treatment. Adapt free React Bits and Aceternity patterns locally rather than coupling the page to a new UI framework.

**Tech Stack:** React 18.3, TypeScript 5.5, Vite 5.4, Tailwind CSS 3.4, `lucide-react`, Canvas 2D for the signal mesh, CSS transitions, existing video background.

**Spec:** `docs/superpowers/specs/2026-09-25-infomatrix-homepage-design.md`

## Global Constraints

- Homepage only; preserve existing `/team`, `/projects`, `/blogs`, and `/contactus` routes.
- Preserve the Laser Spectrum tokens already defined in `tailwind.config.js` and `src/index.css`.
- Use two equal primary actions: `Join InfoMatrix` and `Explore Projects`.
- Keep the hero calm and artistic; remove the current prominent beam/streak treatment.
- Do not invent new statistics, partnerships, student outcomes, or institutional claims.
- Respect `prefers-reduced-motion`, keyboard navigation, semantic structure, and accessible labels.
- Optimize canvas/video work for responsive devices and lower motion density on mobile.
- Before selecting the final major hero effect, pause for user approval and explain the chosen React Bits/Aceternity pattern.

---

### Task 1: Establish the homepage information model and copy surface

**Files:**
- Create: `src/data/homepage.ts`
- Modify: `src/App.tsx`
- Test: `npm run build`

**Interfaces:**
- Produces typed data arrays for navigation, domains, featured projects, blog previews, credibility items, and footer links.
- Keeps existing project/blog route strings and existing factual content.

- [ ] **Step 1: Extract homepage content into typed constants**

Create interfaces for `NavItem`, `DomainItem`, `ProjectItem`, `InsightItem`, `MetricItem`, and `FooterGroup`. Move the existing factual content out of `App.tsx` into these structures. Use concise rewritten copy, but keep claims grounded in the current site.

- [ ] **Step 2: Define the approved CTAs and section IDs**

Use `#domains`, `#projects`, `#insights`, and `#join` as the primary homepage anchors. Map `Join InfoMatrix` to the current join/signup behavior and `Explore Projects` to the existing projects route or homepage projects anchor, whichever is already supported by the current app.

- [ ] **Step 3: Run the build and verify no route strings were lost**

Run: `npm run build`

Expected: TypeScript and Vite complete successfully with no missing imports or JSX errors.

- [ ] **Step 4: Commit the content-model change**

Run: `git add src/data/homepage.ts src/App.tsx && git commit -m "refactor: extract homepage content model"`

If the workspace remains without Git metadata, leave the files uncommitted and report that limitation.

### Task 2: Replace the hero beam treatment with the approved signal-mesh background

**Files:**
- Create: `src/components/SignalMeshBackground.tsx`
- Modify: `src/components/BoomerangVideoBg.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Test: `npm run build` and browser visual QA

**Interfaces:**
- `SignalMeshBackground` props: `{ className?: string; density?: 'low' | 'medium'; accentColors?: string[]; paused?: boolean }`.
- The component renders an absolutely positioned canvas with a transparent overlay and no page-level layout responsibility.

- [ ] **Step 1: Pause for hero-effect approval**

Present the final hero choice to the user as a calm hybrid: existing abstract video texture plus a local signal mesh inspired by React Bits’ particle/synaptic patterns and Aceternity’s spotlight/beam layering, explicitly confirming that the current large beam treatment will be removed. Do not implement the major effect until approved.

- [ ] **Step 2: Add the failing build contract for the new component**

Add the component import and JSX placement behind the current hero overlay, then run `npm run build` so any interface mismatch is visible before implementation.

- [ ] **Step 3: Implement the signal mesh**

Use a single `requestAnimationFrame` loop and one canvas. Generate a low-density set of drifting nodes, connect only nearby nodes with low-alpha lines, add occasional spectrum-colored pulses, and map pointer movement to a small offset. Pause when the canvas is offscreen, the document is hidden, or reduced motion is enabled. Cap device pixel ratio at 1.5 and lower density on narrow viewports.

- [ ] **Step 4: Remove the prominent beam treatment**

Update `BoomerangVideoBg` so the video/canvas texture remains available, but remove or disable the current high-contrast laser-streak overlay in hybrid mode. Keep the vignette and video loop behavior intact unless visual QA shows that the background becomes too bright.

- [ ] **Step 5: Verify desktop, mobile, and reduced-motion states**

Run: `npm run build`

Then open the local app and verify: the hero remains readable, no horizontal overflow exists, the signal mesh is slower and subtler than the old beam layer, and `prefers-reduced-motion: reduce` produces a static background.

- [ ] **Step 6: Commit the hero-layer change**

Run: `git add src/components/SignalMeshBackground.tsx src/components/BoomerangVideoBg.tsx src/App.tsx src/index.css && git commit -m "feat: replace hero beams with signal mesh"`

### Task 3: Rebuild the navigation and hero composition

**Files:**
- Create: `src/components/HomeNav.tsx`
- Create: `src/components/HeroSection.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Test: browser keyboard and responsive QA

**Interfaces:**
- `HomeNav` props: `{ onJoin: () => void; menuOpen: boolean; onMenuToggle: () => void }`.
- `HeroSection` props: `{ onJoin: () => void; onExplore: () => void }`.

- [ ] **Step 1: Build the sticky editorial nav**

Render accessible links for Home, Domains, Projects, Insights, and Team. Keep the mobile drawer behavior, add a visible `aria-expanded` state, and retain the existing join modal trigger.

- [ ] **Step 2: Build the hero content layer**

Place the signal mesh behind a concise headline, one supporting paragraph, the two equal CTAs, and a small scroll cue. Use sharp rectangular buttons and the existing typography/colors rather than rounded frosted pills.

- [ ] **Step 3: Verify keyboard interaction**

Tab through navigation, both CTAs, and the mobile menu. Expected: every interactive element has a visible focus state, labels are announced meaningfully, and Escape closes the drawer or modal where applicable.

- [ ] **Step 4: Verify responsive layout**

Check at approximately 390px, 768px, and 1440px widths. Expected: no clipped headings, no horizontal scroll, and CTA buttons remain easy to tap.

### Task 4: Add the manifesto, domain constellation, and credibility strip

**Files:**
- Create: `src/components/ManifestoSection.tsx`
- Create: `src/components/DomainConstellation.tsx`
- Create: `src/components/CredibilityStrip.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Test: `npm run build` and browser interaction QA

**Interfaces:**
- `DomainConstellation` consumes `DomainItem[]` and exposes no external state.
- `CredibilityStrip` consumes `MetricItem[]` and renders only supplied facts.

- [ ] **Step 1: Add the manifesto section**

Use the rewritten content model to introduce InfoMatrix in one strong editorial statement followed by a short explanation of mentorship, collaboration, and practical building.

- [ ] **Step 2: Add the six-domain constellation**

Render six rectangular domain cells with spectrum accents, an active state, keyboard support, and a subtle canvas/line response. Keep the interaction understandable without hover by exposing the active domain description in normal document flow.

- [ ] **Step 3: Add the credibility strip**

Render restrained metric cards or a horizontal data strip using only facts already available. Animate counters only when motion is allowed and only after the section enters the viewport.

- [ ] **Step 4: Verify reduced-motion and touch behavior**

Expected: domain descriptions are accessible without hover, touch users can select domains, and reduced motion removes counter/mesh animation.

### Task 5: Rebuild featured projects with depth cards and existing routes

**Files:**
- Create: `src/components/FeaturedProjects.tsx`
- Modify: `src/components/SpotlightCard.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Test: route/link QA and `npm run build`

**Interfaces:**
- `FeaturedProjects` consumes `ProjectItem[]` and renders cards linking to existing project detail routes and GitHub URLs.
- `SpotlightCard` keeps its current children/className API and gains only optional accessibility-safe effect props if required.

- [ ] **Step 1: Convert project data into visual cards**

Each card must show category, project name, short description, technology tags, and an obvious project link. Use gradient/canvas art direction when an image is unavailable rather than broken remote images.

- [ ] **Step 2: Add restrained depth interaction**

Adapt the React Bits/Aceternity 3D-card or spotlight pattern locally with a small rotation cap, no rounded SaaS styling, and `prefers-reduced-motion` fallback. Ask for user confirmation before introducing a large card carousel or scroll-stack effect.

- [ ] **Step 3: Verify links and image fallbacks**

Expected: every project card has a working internal route, external GitHub link opens correctly, and missing images never create empty broken regions.

### Task 6: Add community, insights, final CTA, and footer

**Files:**
- Create: `src/components/CommunitySection.tsx`
- Create: `src/components/InsightsPreview.tsx`
- Create: `src/components/HomeFooter.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Test: `npm run build` and full-page browser QA

**Interfaces:**
- Each section consumes only its corresponding typed data and does not own global modal state.

- [ ] **Step 1: Add the community section**

Explain how students learn, collaborate, attend sessions, and build practical work. Keep the copy inviting without inventing unsupported programs or outcomes.

- [ ] **Step 2: Add the insights preview**

Use the existing blog data and routes. Provide author/date/read-time metadata and a clear link to all blogs.

- [ ] **Step 3: Add the final CTA and footer**

Repeat the two primary actions and organize footer links into navigation, social, contact, and college identity groups. Remove the repeated decorative “Crafted with ❤️” output.

- [ ] **Step 4: Verify the complete page flow**

Check anchor scrolling, modal opening/closing, mobile drawer state, footer links, and the absence of duplicated or placeholder content.

### Task 7: Integrate effects, polish tokens, and verify the homepage

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Modify: `tailwind.config.js` only if a missing approved token is required
- Modify: `package.json` only if an explicitly approved effect requires a dependency
- Test: `npm run build`, local preview, responsive browser QA

- [ ] **Step 1: Audit visual consistency**

Confirm all sections use the approved void/photon/mist/dim/spectrum tokens, rectangular panel language, editorial grid, and consistent spacing.

- [ ] **Step 2: Audit performance behavior**

Confirm there is one hero animation loop, offscreen pausing works, canvas DPR is capped, video remains muted/autoplay-safe, and no section starts an unbounded animation loop.

- [ ] **Step 3: Run the production build**

Run: `npm run build`

Expected: `tsc` and `vite build` pass with no errors.

- [ ] **Step 4: Run local visual QA**

Start the Vite dev server, inspect desktop and mobile layouts, test keyboard navigation, test reduced motion, and verify that the page remains readable if video loading fails.

- [ ] **Step 5: Record remaining decisions**

Before adding any major new effect not listed here—such as a globe, carousel, shader, or scroll-stacked scene—ask the user for approval with a short visual tradeoff explanation.

