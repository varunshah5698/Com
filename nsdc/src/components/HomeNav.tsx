import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navigation, SITE_URL } from '../data/homepage';

export default function HomeNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);

  return (
    <header className="site-nav">
      <div className="site-shell site-nav-inner">
        <a href="#top" className="wordmark" aria-label="InfoMatrix home" onClick={() => setOpen(false)}>
          <span className="wordmark-symbol" aria-hidden="true"><i /><i /><i /><i /></span>
          <span className="wordmark-name">INFO<span>MATRIX</span><small>DJSCE / MUMBAI</small></span>
        </a>
        <nav className="desktop-links" aria-label="Main navigation">
          {navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="nav-actions">
          <a className="nav-join" href={`${SITE_URL}/contactus`}>Join the club <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <nav id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!open}>
        {navigation.map((item, i) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{item.label}<ArrowUpRight size={18} /></a>)}
        <a href={`${SITE_URL}/contactus`} onClick={() => setOpen(false)}><span>06</span>Join InfoMatrix<ArrowUpRight size={18} /></a>
      </nav>
    </header>
  );
}
