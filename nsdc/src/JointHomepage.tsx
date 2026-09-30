import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
    items.forEach(item => observer.observe(item));
    document.documentElement.classList.add('reveal-ready');
    return () => { observer.disconnect(); document.documentElement.classList.remove('reveal-ready'); };
  }, []);
}

export function SiteFooter() {
  return (
    <footer id="footer" className="site-footer">
      <div className="site-shell">
        <div className="footer-top">
          <div className="footer-identity">
            <img className="footer-nsdc" src="/brands/djs-nsdc-logo.png" alt="DJS NSDC logo" />
            <img className="footer-nsdc" src="/brands/infomatrix-alt.png" alt="Informatrix wordmark" />
            <span>NSDC × Informatrix</span>
          </div>
          <p>Events that bring us together. Projects that take us further.<br />DJSCE AI &amp; DS.</p>
          <Link to="/">BACK TO TOP <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NSDC × INFORMATRIX</span>
          <div>
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/about">EXPLORE</Link>
          </div>
          <span>MADE FOR THE CURIOUS</span>
        </div>
      </div>
    </footer>
  );
}

export default function JointHomepage() {
  useScrollReveal();
  /* The domain explorer is retired: the immersive scene now owns the homepage,
     and the six domains live on /about. Footer and reveal logic remain. */
  return null;
}
