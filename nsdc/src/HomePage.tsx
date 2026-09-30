import HomeExperience from './components/HomeExperience';
import JointHomepage from './JointHomepage';

/**
 * The home route's content: the immersive NSDC × INFORMATRIX experience
 * (registered Three.js scene, rebranded) followed by the existing editorial
 * homepage sections. Kept as its own component so App stays a pure router
 * and tests can server-render the homepage without a DOM history.
 */
export default function HomePage() {
  return (
    <>
      <HomeExperience />
      <JointHomepage />
    </>
  );
}
