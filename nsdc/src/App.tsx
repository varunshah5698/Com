import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SiteNav from './components/SiteNav';
import { SiteFooter } from './JointHomepage';
import HomePage from './HomePage';
import {
  AboutPage,
  ContactPage,
  EventsPage,
  NotFoundPage,
  ProjectsPage,
  ScrollToTop,
  TeamPage,
} from './pages';

/**
 * The homepage composes the immersive NSDC × INFORMATRIX experience (the
 * registered Three.js night-walk scene, rebranded) followed by the existing
 * editorial sections. All other routes render inside the shared shell.
 */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="page">
        <SiteNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}
