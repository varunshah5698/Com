# Joint NSDC × InfoMatrix Homepage Correction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the homepage into a balanced NSDC × DJS InfoMatrix experience with a quiet hero and a real data playground below it.

**Architecture:** Keep Vite/React and the existing canvas lab. Replace the one-brand composition and cloud video usage, restore the lab, and keep domain/project sections as focused lower-page content. Use localized public logos and preserve official destination links.

**Tech Stack:** React 18, TypeScript 5.5, Vite 5.4, Tailwind 3.4, CSS, Canvas 2D.

**Spec:** `docs/superpowers/specs/2026-09-25-joint-homepage-correction.md`

## Global Constraints

- Homepage only.
- No cloud video or beam in the hero.
- Both NSDC and InfoMatrix visible, with authentic marks.
- Interactive playground below the first screen, not in it.
- No fabricated statistics or time-bound event promises.
- Reduced-motion, keyboard and mobile usable.

---

### Task 1: Contract and identity

**Files:** Create `tests/homepage.test.mjs`; modify `src/App.tsx`, `src/components/HomeNav.tsx`, `index.html`; use `public/brands/infomatrix-alt.png`, `public/brands/nsdc-mark.png`.

**Interfaces:** App renders the single homepage; navigation targets section IDs `#lab`, `#about`, `#domains`, `#projects`, `#join`.

- [ ] Write a rendering test using Vite SSR and React static markup. Assert both names/marks, that the lab follows the hero, and that no video is rendered.
- [ ] Run `node --test tests/homepage.test.mjs` and confirm it fails on the current implementation.
- [ ] Build the simple co-branded hero, navigation, and metadata; run the test and confirm it passes.

### Task 2: Interactive below-fold content

**Files:** Modify `src/App.tsx`, `src/components/LiveDataPlayground.tsx`, `src/components/DomainConstellation.tsx`, `src/components/FeaturedProjects.tsx`, `src/data/homepage.ts`.

**Interfaces:** `LiveDataPlayground` remains self-contained and exposes clustering, regression, residuals, and reset controls. Domain and project components render inside the homepage.

- [ ] Extend the rendering test to require the three lab modes, a reset control, and the domains/project anchors; watch it fail.
- [ ] Place the lab as the first full content section and revise copy to describe a demo accurately. Rebalance organization, domains and project content.
- [ ] Run `node --test tests/homepage.test.mjs` and confirm it passes.

### Task 3: Visual system and verification

**Files:** Modify `src/index.css`, `index.html`, `src/components/SpotlightCard.tsx` if needed.

**Interfaces:** CSS classes used in App and the existing components; no new runtime dependency.

- [ ] Replace the prior oversized uppercase/card-heavy styling with a quieter hero, readable geometric typography, concentrated violet/ion/plasma accents, and purposeful lower-section motion.
- [ ] Run `npm run build` and `node --test tests/homepage.test.mjs`.
- [ ] Inspect desktop and mobile in a browser; exercise lab tabs, reset, domains, navigation, and reduced-motion state. Correct any overflow or contrast problems found.
