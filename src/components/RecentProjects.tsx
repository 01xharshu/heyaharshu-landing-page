import { recentProjects } from "@/data/projects";

export default function RecentProjects({ variant }: { variant: "init" | "classic" }) {
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
