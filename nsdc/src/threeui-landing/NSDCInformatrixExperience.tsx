/**
 * NSDCInformatrixExperience — application-facing wrapper for the immersive
 * NSDC × INFORMATRIX scene.
 *
 * This is the package's documented `KageLandingPage` component, re-composed
 * from the verified registered sources vendored in this folder (each
 * SHA-256-checked against the registered bundle; see
 * vendor/threeui/kage-landing-page.json). `LandingPages.tsx` could not be
 * vendored verbatim because its module graph spans the whole ThreeUI catalog;
 * the two lines that component adds on top of the documented exports
 * (`usePageTypography(KAGE_TYPOGRAPHY, …)` + `LandingPageFrame`) are
 * reproduced here exactly, so the scene, its customization contract and the
 * typography recipe are the registered ones.
 *
 * Two intentional differences from `KageLandingPage`, both documented:
 *  1. `title` is "NSDC × INFORMATRIX — …" instead of the template's name, so
 *     the accessible name of the scene frame never exposes template branding.
 *  2. The brand props below use the NSDC design system's ultraviolet accent
 *     (`#7443FF`, from the existing site's `tailwind.config.js` / `index.css`)
 *     instead of the template's red, via the documented `primaryColor` prop.
 *
 * The scene document served to the frame is `public/landing-pages/kage.html`,
 * generated from the byte-verified original by `scripts/rebrand-kage.mjs`
 * (the untouched original stays in `vendor/threeui/` for audit).
 */
import { LandingPageFrame } from "./LandingPageFrame";
import { KAGE_TYPOGRAPHY } from "./pageRecipes";
import { splitTypographyProps, usePageTypography, type PageTypographyProps } from "./pageTypography";
import type { LandingPageProps } from "./LandingPageFrame";

/* Cache-buster: the scene document changes on every pipeline run (rebrand,
   image re-tone), so the frame URL carries the build timestamp. Without it a
   stale cached kage.html keeps showing retired content (the old peek card,
   red leaves) even after regeneration. */
const SCENE_URL = `/landing-pages/kage.html?v=${Date.now()}`;

export default function NSDCInformatrixExperience(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(KAGE_TYPOGRAPHY, type);
  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="NSDC × INFORMATRIX — Where curiosity reveals the unseen"
      sourceUrl={SCENE_URL}
    />
  );
}
