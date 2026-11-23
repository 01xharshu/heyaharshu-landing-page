import { recentProjects } from "@/data/projects";

export default function RecentProjects({ variant }: { variant: "init" | "classic" | "modern" }) {
  if (variant === "init") return (
    <div className="initCatalogRows" aria-label="Live web projects">
      {recentProjects.map((project) => <div className="initCatalogRow" key={project.repoUrl}>
        <a href={project.liveUrl} target="_blank" rel="noreferrer"><strong>{project.name}</strong><small>{project.status}</small><span aria-hidden="true">↗</span></a>
        <a className="initCatalogSource" href={project.repoUrl} target="_blank" rel="noreferrer">GitHub<span className="sr-only"> — {project.name}</span> ↗</a>
      </div>)}
    </div>
  );
  return (
    <div className={`recentProjects recentProjects-${variant}`}>
      {recentProjects.map((project) => (
        <article className="recentProject" key={project.repoUrl}>
          <span className="recentProjectStatus">{project.status}</span>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="recentProjectLinks">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Visit website ↗</a>}
            <a href={project.repoUrl} target="_blank" rel="noreferrer">GitHub ↗<span className="sr-only"> — {project.name}</span></a>
          </div>
        </article>
      ))}
    </div>
  );
}
