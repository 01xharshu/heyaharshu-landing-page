import Image from "next/image";
import { figmaPlugins } from "@/data/figma-plugins";

export default function FigmaPlugins({ variant }: { variant: "init" | "classic" }) {
  if (variant === "init") return <section aria-label="Figma plugins" className="initCatalogRows">
    {figmaPlugins.map((plugin) => <div className="initCatalogRow" key={plugin.href}>
      <a href={plugin.href} target="_blank" rel="noreferrer">
        <Image src={plugin.image} alt="" width={40} height={40} />
        <strong>{plugin.name}</strong><small>Figma plugin</small><span aria-hidden="true">↗</span>
      </a>
    </div>)}
  </section>;
  return <section aria-label="Figma plugins" className={`recentProjects recentProjects-${variant}`}>
    {figmaPlugins.map((plugin) => <article className="recentProject" key={plugin.href}>
      <Image src={plugin.image} alt={`${plugin.name} logo`} width={64} height={64} style={{ objectFit: "contain", display: "block", marginBottom: 16 }} />
      <span className="recentProjectStatus">Figma plugin</span>
      <h3>{plugin.name}</h3><p>{plugin.description}</p>
      <div className="recentProjectLinks"><a href={plugin.href} target="_blank" rel="noreferrer">Open in Figma ↗<span className="sr-only"> — {plugin.name}</span></a></div>
    </article>)}
  </section>;
}
