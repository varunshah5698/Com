import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#top' },
  { label: 'Explore', href: '#domains' },
];

export default function JointNav() {
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-nav">
      <div className="site-shell nav-inner">
        <a className="brand-lockup" href="#top" aria-label="NSDC × Informatrix — home" onClick={() => setOpen(false)}>
          <span className="brand-nsdc">
            <img src="/brands/djs-nsdc-logo.png" alt="" />
            <img src="/brands/infomatrix-alt.png" alt="" />
            <strong>NSDC × Informatrix</strong>
          </span>
        </a>
        <nav className="desktop-links" aria-label="Main navigation">
          {links.map(link => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <nav id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!open}>
        {links.map((link, index) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <span>0{index + 1}</span>{link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
