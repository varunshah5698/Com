import { ArrowUpRight } from 'lucide-react';
import { projects, SITE_URL } from '../data/homepage';

export default function FeaturedProjects() {
  return <section id="projects" className="section projects-section"><div className="site-shell">
    <div className="section-topline"><span className="eyebrow"><i /> 05 / STUDENT WORK</span><span>FROM THE INFOMATRIX PROJECT ARCHIVE</span></div>
    <div className="projects-heading reveal"><h2>Ideas, made <em>real.</em></h2><p>Some of the projects shared by the DJS InfoMatrix community. Different disciplines, one habit: learning by making.</p></div>
    <div className="project-grid">
      {projects.map(project => <article className={`project-card project-${project.visual} reveal`} key={project.index} style={{ '--project-color': project.color } as React.CSSProperties}>
        <div className="project-poster" aria-hidden="true"><div className="project-poster-grid" /><span className="project-poster-number">{project.index}</span><div className="project-poster-form"><i /><i /><i /></div><span className="project-poster-label">DJS / {project.category.toUpperCase()}</span></div>
        <div className="project-copy"><div className="project-meta"><span>{project.category}</span><span>IM—{project.index}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-card-bottom"><div className="project-tags">{project.tags.slice(0, 2).map(tag => <span key={tag}>{tag}</span>)}</div><a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${project.title}`}><ArrowUpRight size={21} /></a></div></div>
      </article>)}
    </div>
    <a className="projects-all" href={`${SITE_URL}/projects`} target="_blank" rel="noopener noreferrer">View all InfoMatrix projects <ArrowUpRight size={18} /></a>
  </div></section>;
}
