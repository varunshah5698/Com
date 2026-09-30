import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Events', to: '/events' },
  { label: 'Projects', to: '/projects' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the drawer whenever the route changes.
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Lock body scroll while the drawer is open (and clean up on unmount).
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  return (
    <header className="site-nav">
      <div className="site-shell nav-inner">
        <Link className="brand-lockup" to="/" aria-label="NSDC × Informatrix — home">
          <span className="brand-nsdc">
            <img src="/brands/djs-nsdc-logo.png" alt="DJS NSDC logo" />
            <img src="/brands/infomatrix-alt.png" alt="Informatrix wordmark" />
            <strong>NSDC × Informatrix</strong>
          </span>
        </Link>
        <nav className="desktop-links" aria-label="Main navigation">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <nav id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!open}>
        {links.map((link, index) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setOpen(false)}>
            <span>0{index + 1}</span>{link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
