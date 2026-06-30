"use client";

import RetroSubpageLayout from "@/components/RetroSubpageLayout";
import Image from "next/image";

const builderDemos = [
  { id: 1, image: "/thumb2.jpg", title: "Video Transcribe", desc: "Transcribe videos directly on your Mac. A simple and efficient tool for video creators.", link: "https://video-transcribe-mac.vercel.app/" },
  { id: 2, image: "/cd26cd88-c1a2-4b69-86e8-258290b6d24a-icon.png", title: "Texometric", desc: "A Figma plugin for typography. My 2nd plugin for Figma, built to help designers get maximum text precision.", link: "https://www.figma.com/community/plugin/1644918796465469562/texometric" },
  { id: 3, image: "/a2fc4071-8e90-4df0-8e70-7bced5b2f57f-icon.png", title: "Carousel Export Plugin", desc: "A Figma plugin made to help designers easily export Carousels in a combined PDF or as separate PNGs in just one go.", link: "https://www.figma.com/community/plugin/1638502049583160269/carousel-export-plugin" },
  { id: 4, image: "/thumb2.jpg", title: "Prompt Library", desc: "Accelerate your AI workflows with our beautifully designed collection of copy-pasteable production-ready prompts.", link: "https://prompt-library-pearl.vercel.app" }
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

      <section className="retroSection">
        <div className="retroCardGrid">
          {builderDemos.map((demo) => {
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
