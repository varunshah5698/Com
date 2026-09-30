import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Menu, X } from 'lucide-react';
import NetworkField from './NetworkField';

export default function HeroPreview() {
  const [entering, setEntering] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const enteringRef = useRef(false);

  const enterSite = () => {
    if (enteringRef.current) return;
    enteringRef.current = true;
    setEntering(true);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(() => window.location.assign('/'), reduceMotion ? 60 : 1050);
  };

  useEffect(() => {
    let wheelDistance = 0;
    let touchStart = 0;

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY <= 0) return;
      event.preventDefault();
      wheelDistance += event.deltaY;
      if (wheelDistance >= 65) enterSite();
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStart = event.changedTouches[0]?.screenY ?? 0;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const touchEnd = event.changedTouches[0]?.screenY ?? touchStart;
      if (touchStart - touchEnd > 45) enterSite();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        enterSite();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div className={`hp-page ${entering ? 'is-entering' : ''}`}>
      <section className="hp-hero" aria-label="Explore DJS NSDC/InfoMatrix">
        <div className="hp-grain" aria-hidden="true" />
        <div className="hp-grid" aria-hidden="true" />
        <div className="hp-world"><NetworkField /></div>
        <header className="hp-header">
          <a className="hp-brand" href="/" aria-label="DJS NSDC/InfoMatrix home">
            <img src="/brands/djs-nsdc-logo.png" alt="" />
            <span>DJS NSDC<span className="hp-brand-slash">/</span>InfoMatrix</span>
          </a>
          <nav className={`hp-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="/#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="/#events" onClick={() => setMenuOpen(false)}>Events</a>
            <a href="https://djs-infomatrix.vercel.app/team" onClick={() => setMenuOpen(false)}>Team</a>
          </nav>
          <button className="hp-menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>
        <button className="hp-explore" type="button" onClick={enterSite}>
          Explore us <ArrowDown size={17} aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}
