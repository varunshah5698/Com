import { useEffect, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects, insights } from './data/homepage';

function useRouteTitle(title: string) {
  const { pathname } = useLocation();
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} — NSDC × Informatrix`;
    return () => { document.title = previous; };
  }, [title, pathname]);
}

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead: string }) {
  return (
    <section className="page-hero">
      <div className="site-shell">
        <p className="eyebrow"><i /> {eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-lead">{lead}</p>
      </div>
    </section>
  );
}

export function AboutPage() {
  useRouteTitle('About');
  return (
    <main id="main">
      <PageHero
        eyebrow="ABOUT THE COMMITTEE"
        title={<>Two teams, <em>one gateway.</em></>}
        lead="NSDC × Informatrix is the shared home of the DJSCE chapter of the National Student Data Corps and Team Informatrix — the college's AI & Data Science community and its tech club, walking the same path."
      />
      <section className="page-section" aria-label="Who we are">
        <div className="site-shell prose-grid">
          <div>
            <h2>National Student Data Corps — DJSCE chapter</h2>
            <p>
              The National Student Data Corps (NSDC), founded by the Northeast Big Data Innovation Hub
              at Columbia University, builds data-science fluency for students everywhere. Our DJSCE
              chapter brings that mission to campus: study circles, semester tracks and first steps
              into data for anyone curious enough to start.
            </p>
          </div>
          <div>
            <h2>Team Informatrix — the tech club</h2>
            <p>
              Team Informatrix is the committee's building half: a student-run tech club that turns
              questions into projects — support chatbots, financial dashboards, vision experiments and
              full web applications, shipped through its public project archive and blog.
            </p>
          </div>
          <div>
            <h2>Why “×”</h2>
            <p>
              One is a gateway into data science; the other is a workshop for building with it. Joined,
              they give DJSCE students a single path: explore the six domains, learn the craft together,
              and leave with something you made. <em>Explore data. Build together.</em>
            </p>
          </div>
        </div>
      </section>
      <section className="page-section page-section--alt" aria-label="The six domains">
        <div className="site-shell">
          <h2 className="section-title">Six domains, one community</h2>
          <ul className="domain-grid">
            <li><strong>Artificial Intelligence</strong><span>Intelligent systems, language models, responsible AI.</span></li>
            <li><strong>Machine Learning</strong><span>Patterns into models you can test and improve.</span></li>
            <li><strong>Data Science</strong><span>The story inside complex data, told honestly.</span></li>
            <li><strong>Computational Finance</strong><span>Quantitative thinking applied to markets.</span></li>
            <li><strong>Web Development</strong><span>From first sketch to working application.</span></li>
            <li><strong>UI/UX Design</strong><span>Technology made clearer, more useful, more human.</span></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

const eventRecords: Record<string, { note: string; image: string; alt: string }> = {
  hackops: { note: 'Hackathon — build through the night with the committee.', image: '/events/hackops.webp', alt: 'HackOps event artwork' },
  technograd: { note: 'The committee\'s flagship technology gradation event.', image: '/events/technograd.webp', alt: 'Technograd event artwork' },
  'technograd-winners': { note: 'Winners celebrated on stage at Technograd.', image: '/globe/technograd-winners.jpg', alt: 'Technograd winners on stage' },
  'seminar-audience': { note: 'A full seminar room during a committee session.', image: '/globe/seminar-audience.jpg', alt: 'Audience at a committee seminar' },
  synergy: { note: 'Archive — the synergy of data and building.', image: '/globe/previous/synergy.jpg', alt: 'Synergy event artwork' },
  'design-dojo': { note: 'Archive — design practice, session after session.', image: '/globe/previous/design-dojo.jpg', alt: 'Design Dojo event artwork' },
  inauguration: { note: 'Archive — where the chapter began.', image: '/globe/previous/inauguration.jpg', alt: 'Inauguration event artwork' },
};

export function EventsPage() {
  useRouteTitle('Events');
  return (
    <main id="main">
      <PageHero
        eyebrow="EVENTS"
        title={<>Gatherings on <em>the path.</em></>}
        lead="Sessions, seminars and build nights from the committee. Dates, venues and registration move with each semester — the official committee channels carry the current ones."
      />
      <section className="page-section" aria-label="Event gallery">
        <div className="site-shell">
          <div className="event-grid">
            {Object.entries(eventRecords).map(([id, ev]) => (
              <figure className="event-card" key={id}>
                <img src={ev.image} alt={ev.alt} loading="lazy" decoding="async" />
                <figcaption>
                  <strong>{id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</strong>
                  <span>{ev.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="page-note">
            Verification note: past editions of these gatherings are documented by the committee's own
            photo archive (shown here). Current schedules live with the committee, not on this page —
            nothing invented here.
          </p>
        </div>
      </section>
    </main>
  );
}

export function ProjectsPage() {
  useRouteTitle('Projects');
  return (
    <main id="main">
      <PageHero
        eyebrow="PROJECTS"
        title={<>Ideas, made <em>real.</em></>}
        lead="Selected student builds from the Informatrix archive — each one a walk through one of the six domains. The full archive lives on the official Informatrix site."
      />
      <section className="page-section" aria-label="Project archive highlights">
        <div className="site-shell">
          <div className="project-grid">
            {projects.map(project => (
              <article className="project-card" key={project.index}>
                <div className="project-copy">
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <span>IM—{project.index}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-card-bottom">
                    <div className="project-tags">{project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
                    <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} in the Informatrix archive`}>
                      <ArrowRight size={18} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="page-note">Descriptions are drawn from the committee's existing project records.</p>
        </div>
      </section>
      <section className="page-section page-section--alt" aria-label="Committee reading">
        <div className="site-shell">
          <h2 className="section-title">From the committee blog</h2>
          <ul className="insight-list">
            {insights.map(insight => (
              <li key={insight.href}>
                <a href={insight.href} target="_blank" rel="noopener noreferrer">
                  <span className="insight-cat">{insight.category}</span>
                  <strong>{insight.title}</strong>
                  <span>{insight.author} · {insight.date} · {insight.readTime}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export function TeamPage() {
  useRouteTitle('Team');
  return (
    <main id="main">
      <PageHero
        eyebrow="TEAM"
        title={<>The people on <em>the path.</em></>}
        lead="The committee's members, mentors and faculty are listed on the official Informatrix site, which stays in sync with the current teams."
      />
      <section className="page-section" aria-label="Team directory">
        <div className="site-shell">
          <a
            className="team-link"
            href={`${import.meta.env.VITE_INFO_SITE ?? 'https://djs-infomatrix.vercel.app'}/team`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open the official team directory <ArrowRight size={18} aria-hidden="true" />
          </a>
          <p className="page-note">
            Verification note: this site does not duplicate member names or photographs; it links to the
            live directory so no identity goes stale or invented here.
          </p>
        </div>
      </section>
    </main>
  );
}

export function ContactPage() {
  useRouteTitle('Contact');
  return (
    <main id="main">
      <PageHero
        eyebrow="CONTACT"
        title={<>Find the <em>gateway.</em></>}
        lead="Reach the committee through Informatrix's official channels — or find us on campus at DJSCE, Mumbai."
      />
      <section className="page-section" aria-label="Contact channels">
        <div className="site-shell">
          <div className="contact-grid">
            <a className="contact-card" href="https://djs-infomatrix.vercel.app" target="_blank" rel="noopener noreferrer">
              <strong>Informatrix website</strong>
              <span>djs-infomatrix.vercel.app — projects, blogs and the official directory.</span>
            </a>
            <a className="contact-card" href="https://github.com/DJS-INFOMATRIX" target="_blank" rel="noopener noreferrer">
              <strong>GitHub</strong>
              <span>github.com/DJS-INFOMATRIX — the committee's public code.</span>
            </a>
            <div className="contact-card">
              <strong>Campus</strong>
              <span>Dwarkadas J. Sanghvi College of Engineering, Mumbai — AI &amp; Data Science department.</span>
            </div>
          </div>
          <p className="page-note">
            Verification note: a dedicated committee email address is not published on the existing
            sites, so none is listed here. Channels above are the committee's own.
          </p>
        </div>
      </section>
    </main>
  );
}

export function NotFoundPage() {
  useRouteTitle('Not found');
  return (
    <main id="main" className="notfound">
      <div className="site-shell">
        <p className="eyebrow"><i /> 404 — OFF THE PATH</p>
        <h1>This path is <em>unlit.</em></h1>
        <p className="page-lead">
          The page you were walking towards is not on the map. The gate, as always, is back at the start.
        </p>
        <Link className="committee-cta" to="/">Back to the gate <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </main>
  );
}
