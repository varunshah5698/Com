# InfoMatrix Homepage Redesign

## Approved direction

Redesign the homepage only for DJS InfoMatrix using the existing `Laser Spectrum` visual language from `laser-spectrum-design-system.html` and the current NSDC draft components as the starting point. Keep the important current content, but rewrite and restructure it for stronger clarity, credibility, and student appeal.

The homepage should serve students, recruiters/industry partners, and faculty equally. The hero must provide two equal primary actions: `Join InfoMatrix` and `Explore Projects`.

## Visual direction

- Deep void-black surfaces with ultraviolet, ion-blue, plasma-cyan, amber, ember, and rose accents.
- Editorial uppercase display typography, monospaced labels, sharp rectangular panels, and a 12-column layout.
- Calm, artistic motion rather than a loud hyperspeed tunnel or oversized 3D object.
- Hybrid hero background: retain the existing abstract video texture, then layer a restrained animated signal mesh above it.
- Replace the current draft's prominent beam/streak treatment with slow particles, faint connection paths, soft gradient bloom, and low-amplitude depth response.
- Use React Bits and Aceternity patterns as reference/adaptable source material where appropriate, but keep the implementation local to this Vite app and visually consistent with the approved system.

## Homepage structure

1. Sticky editorial navigation with Home, Domains, Projects, Insights, Team, plus the two primary actions.
2. Hero with the hybrid signal mesh, concise value proposition, and two CTAs.
3. Intro/manifesto section rewriting the current club description.
4. Six-domain interactive constellation for AI, ML, Data Science, Computational Finance, Web Development, and UI/UX.
5. Credibility strip with restrained animated metrics and institutional context.
6. Featured projects using visual cards, category labels, technology tags, descriptions, and existing project routes.
7. Learning/community section explaining mentorship, collaboration, and practical building.
8. Insights preview using existing blog routes and content structure.
9. Final CTA and a simplified, organized footer.

## Interaction and accessibility requirements

- Use pointer interaction only as a subtle enhancement; content remains fully usable without it.
- Respect `prefers-reduced-motion` by disabling canvas animation and motion-heavy transitions.
- Keep all current routes working; homepage-only scope means no redesign of `/team`, `/projects`, `/blogs`, or `/contactus` in this pass.
- Provide accessible labels for icon-only controls, visible focus states, semantic headings, and meaningful image alt text.
- Avoid inventing statistics, partnerships, or outcomes; use current facts until updated data is supplied.
- Keep the hero and card effects responsive, with lower particle density and no costly 3D effect on small screens.

