import NSDCInformatrixExperience from '../threeui-landing/NSDCInformatrixExperience';
import '@designcodeio/threeui/style.css';

/**
 * The immersive NSDC × INFORMATRIX world — the registered Three.js night-walk
 * experience, full-viewport. The frame manages its own scrolling story; the
 * homepage continues below it. A visible, keyboard-focusable skip link plus
 * the frame's aria-label keep the scene's interface out of the way of
 * assistive tech without removing the genuine experience.
 */
export default function HomeExperience() {
  return (
    <>
      <a className="experience-skip" href="#footer">
        Skip the immersive scene — go to site content
      </a>
      <section className="experience" aria-label="NSDC × INFORMATRIX immersive introduction">
        <NSDCInformatrixExperience
          headingFont="onest"
          bodyFont="onest"
          headingWeight="400"
          bodyWeight="300"
          primaryColor="#7443FF"
          headingSize={46}
          bodySize={17}
          headingLetterSpacing={-0.012}
        />
      </section>
    </>
  );
}
