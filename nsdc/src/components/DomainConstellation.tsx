import { useState, type CSSProperties } from 'react';
import { ArrowUpRight, Cpu, LineChart, Code, Network, PenTool, Database } from 'lucide-react';
import { domains } from '../data/homepage';

const icons = [Cpu, Network, Database, LineChart, Code, PenTool];

export default function DomainConstellation() {
  const [active, setActive] = useState(0);
  const selected = domains[active];
  const ActiveIcon = icons[active % icons.length];

  return (
    <section id="domains" className="section domains-section">
      <div className="site-shell">
        <div className="section-heading reveal">
          <span className="eyebrow"><i /> 01 / AREAS TO EXPLORE</span>
          <div className="section-heading-copy">
            <h2>Follow what <em>interests you.</em></h2>
            <p>Technology connects different disciplines. Move between these areas, see what catches your attention, and build with us.</p>
          </div>
        </div>

        <div className="domain-layout reveal" style={{ '--active-color': selected.color } as CSSProperties}>
          <div className="domain-list" role="tablist" aria-label="Explore domains">
            {domains.map((domain, index) => {
              const Icon = icons[index % icons.length];
              return (
                <button
                  className={`domain-tab ${active === index ? 'is-active' : ''}`}
                  key={domain.id}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-controls={`domain-panel-${domain.id}`}
                  onClick={() => setActive(index)}
                >
                  <div className="domain-tab-content">
                    <span className="domain-index">{domain.index}</span>
                    <span className="domain-name">{domain.name}</span>
                  </div>
                  <div className="domain-tab-indicator">
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="domain-panel" id={`domain-panel-${selected.id}`} role="tabpanel" aria-live="polite">
            <div className="domain-panel-bg" aria-hidden="true" />
            <div className="domain-panel-content">
              <div className="domain-visual-graphic">
                <div className="domain-icon-wrapper">
                  <ActiveIcon size={48} strokeWidth={1.5} />
                </div>
                <div className="domain-graphic-rings">
                  <div className="ring ring-1" />
                  <div className="ring ring-2" />
                  <div className="ring ring-3" />
                </div>
              </div>
              <div className="domain-details">
                <span className="domain-short">{selected.short}</span>
                <h3>{selected.name}</h3>
                <p>{selected.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
