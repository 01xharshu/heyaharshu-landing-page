"use client";

import RecentProjects from "@/components/RecentProjects";
import RetroSubpageLayout from "@/components/RetroSubpageLayout";
import { figmaPlugins } from "@/data/figma-plugins";
import Image from "next/image";
import Link from "next/link";

const builderDemos: { id: number; image: string; title: string; desc: string; link: string; internal?: boolean }[] = [
  ...figmaPlugins.map((plugin, index) => ({ id: 100 + index, image: plugin.image, title: plugin.name, desc: plugin.description, link: plugin.href, internal: false })),
  { id: 1, image: "/thumb2.jpg", title: "Video Transcribe", desc: "Transcribe videos directly on your Mac. A simple and efficient tool for video creators.", link: "https://video-transcribe-mac.vercel.app/" },
  { id: 4, image: "/thumb2.jpg", title: "Prompt Library", desc: "Accelerate your AI workflows with our beautifully designed collection of copy-pasteable production-ready prompts.", link: "https://prompt-library-pearl.vercel.app" },
  { id: 5, image: "/Opener.png", title: "Opener", desc: "Choose which browser opens a link on your Mac.", link: "/portfolio/builder/apps/opener?view=classic", internal: true }
];

export default function BuilderPage() {
  return (
    <RetroSubpageLayout>
      <div className="retroLabel">PORTFOLIO / ENGINEERING / 2026</div>
      <h1 className="retroSectionTitle">As Builder.</h1>
      <p className="retroParagraph" style={{ maxWidth: '800px' }}>
        Writing code, designing systems, and bringing ideas to life.
        I focus on creating seamless user experiences powered by robust and scalable architecture.
      </p>

      <RecentProjects variant="classic" />
      <section className="retroSection">
        <div className="retroCardGrid">
          {builderDemos.map((demo) => {
            if (demo.internal) {
              return (
                <Link href={demo.link} className="retroCard" key={demo.id} style={{ textDecoration: 'none' }}>
                  <Image src={demo.image} alt={demo.title} width={600} height={400} className="retroCardImage" />
                  <div className="retroCardContent">
                    <h3 className="retroCardTitle">{demo.title}</h3>
                    <p className="retroCardDesc">{demo.desc}</p>
                  </div>
                </Link>
              );
            }

            return (
              <a href={demo.link} target="_blank" rel="noopener noreferrer" className="retroCard" key={demo.id} style={{ textDecoration: 'none' }}>
                <Image src={demo.image} alt={demo.title} width={600} height={400} className="retroCardImage" />
                <div className="retroCardContent">
                  <h3 className="retroCardTitle">{demo.title}</h3>
                  <p className="retroCardDesc">{demo.desc}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </RetroSubpageLayout>
  );
}
