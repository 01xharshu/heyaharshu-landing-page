"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedName from "./AnimatedName";
import RetroSubpageLayout from "./RetroSubpageLayout";
import { useVersion } from "@/context/VersionContext";

type Persona = "designer" | "builder" | "contentcreator";

const openerDownload = "https://github.com/01xharshu/Opener-app/releases/download/V1.0/Opener.dmg";
const openerRepo = "https://github.com/01xharshu/Opener-app";

const personaCopy: Record<Persona, { eyebrow: string; title: string; intro: string }> = {
  designer: {
    eyebrow: "01 / DESIGN",
    title: "Designer",
    intro: "Thumbnail systems and visual direction made to communicate an idea before somebody presses play.",
  },
  builder: {
    eyebrow: "02 / BUILD",
    title: "Builder",
    intro: "Focused Mac utilities, Figma plugins, and web experiments built around precise problems.",
  },
  contentcreator: {
    eyebrow: "03 / CREATE",
    title: "Content creator",
    intro: "A practice that began in the eighth standard and became a way to build confidence in public.",
  },
};

function ClassicPortfolioDetail({ persona, appSlug }: { persona: Persona; appSlug?: string }) {
  const copy = personaCopy[persona];
  const isOpener = persona === "builder" && appSlug === "opener";

  return (
    <RetroSubpageLayout>
      <div className="retroLabel">{isOpener ? "MAC APP / OPENER / V1.0" : `PORTFOLIO / ${copy.eyebrow} / 2026`}</div>
      <h1 className="retroSectionTitle">{isOpener ? "Opener." : `${copy.title}.`}</h1>
      <p className="retroParagraph" style={{ maxWidth: "760px" }}>
        {isOpener ? "Choose which browser opens a link on your Mac." : copy.intro}
      </p>

      {isOpener ? (
        <section className="retroSection">
          <Image src="/Opener.png" alt="Opener app icon" width={180} height={180} className="retroOpenerIcon" />
          <div className="retroOpenerActions">
            <a href={openerDownload} className="retroButtonPrimary">Download for Mac</a>
            <a href={openerRepo} target="_blank" rel="noreferrer" className="retroButtonSecondary">View source</a>
            <Link href="/portfolio/builder?view=classic" className="retroButtonSecondary">Bring me back</Link>
          </div>
        </section>
      ) : (
        <section className="retroSection modeClassicPortfolioLinks">
          {persona === "designer" && (
            <>
              <a href="https://behance.net/heyaharshu" target="_blank" rel="noreferrer">Behance ↗</a>
              <a href="https://fueler.io/heyaharshu" target="_blank" rel="noreferrer">Fueler ↗</a>
            </>
          )}
          {persona === "builder" && (
            <>
              <Link href="/portfolio/builder/apps/opener?view=classic">Opener →</Link>
              <a href="https://www.figma.com/community/plugin/1644918796465469562/texometric" target="_blank" rel="noreferrer">Texometric ↗</a>
              <a href="https://www.figma.com/community/plugin/1638502049583160269/carousel-export-plugin" target="_blank" rel="noreferrer">Carousel Export ↗</a>
            </>
          )}
          {persona === "contentcreator" && <p className="retroParagraph">Instagram reels will be added here without leaving Classic view.</p>}
        </section>
      )}
    </RetroSubpageLayout>
  );
}

function InitPortfolioDetail({ persona, appSlug }: { persona: Persona; appSlug?: string }) {
  const copy = personaCopy[persona];
  const isOpener = persona === "builder" && appSlug === "opener";

  return (
    <div className="initDetailPage">
      <aside className="initDetailIndex">
        <span>Index</span>
        <Link href="/?view=init"><ArrowLeft size={14} aria-hidden="true" /> Home</Link>
        {!isOpener && <a href="#overview">Overview</a>}
        <a href="#selected">{isOpener ? "Details" : "Selected"}</a>
        <a href="#links">Links</a>
        <div><Terminal size={14} aria-hidden="true" /> Init</div>
      </aside>

      <main className="initDetailMain">
        <AnimatedName className="initDetailName" />
        <motion.header
          id="overview"
          className="initDetailHero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>{isOpener ? "MAC APP / V1.0" : copy.eyebrow}</span>
          {isOpener && <Image src="/Opener.png" alt="Opener app icon" width={116} height={116} />}
          <h1>{isOpener ? "Opener" : copy.title}</h1>
          <p>{isOpener ? "A small Mac utility that lets you choose which browser should open a link." : copy.intro}</p>
        </motion.header>

        <section id="selected" className="initDetailSection">
          <h2>{isOpener ? "What it does" : "Selected"}</h2>
          {isOpener ? (
            <div className="initDetailRows">
              <p><span>01</span>Choose a browser for every link.</p>
              <p><span>02</span>Stay inside a focused macOS workflow.</p>
              <p><span>03</span>Download the current V1.0 release.</p>
            </div>
          ) : persona === "designer" ? (
            <div className="initDetailStatement">Design work for creators across education, finance, food, and culture—reaching a combined audience of 20M+.</div>
          ) : persona === "builder" ? (
            <div className="initDetailRows">
              <Link href="/portfolio/builder/apps/opener?view=init"><span>01</span>Opener <small>Mac app</small></Link>
              <a href="https://www.figma.com/community/plugin/1644918796465469562/texometric" target="_blank" rel="noreferrer"><span>02</span>Texometric <small>Figma plugin</small></a>
              <a href="https://www.figma.com/community/plugin/1638502049583160269/carousel-export-plugin" target="_blank" rel="noreferrer"><span>03</span>Carousel Export <small>Figma plugin</small></a>
              <a href="https://github.com/01xharshu/hanumankind-india" target="_blank" rel="noreferrer"><span>04</span>Hanumankind <small>Concept website</small></a>
            </div>
          ) : (
            <div className="initDetailStatement">I started with a Samsung Galaxy J1 Ace and a dream of becoming a tech YouTuber. The format changed, but the instinct to make things public stayed.</div>
          )}
        </section>

        <section id="links" className="initDetailSection initDetailLinks">
          <h2>Links</h2>
          {isOpener ? (
            <>
              <a href={openerDownload}>Download V1.0 <Download size={16} aria-hidden="true" /></a>
              <a href={openerRepo} target="_blank" rel="noreferrer">View source <ArrowUpRight size={16} aria-hidden="true" /></a>
              <Link href="/portfolio/builder?view=init">Bring me back <ArrowLeft size={16} aria-hidden="true" /></Link>
            </>
          ) : persona === "designer" ? (
            <>
              <a href="https://behance.net/heyaharshu" target="_blank" rel="noreferrer">Behance <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a href="https://fueler.io/heyaharshu" target="_blank" rel="noreferrer">Fueler <ArrowUpRight size={16} aria-hidden="true" /></a>
            </>
          ) : persona === "builder" ? (
            <a href="https://github.com/01xharshu" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
          ) : (
            <span>Instagram reel embed is ready for the reel URL.</span>
          )}
        </section>
      </main>
    </div>
  );
}

export default function ModePortfolioDetail({
  persona,
  appSlug,
}: {
  persona: Persona;
  appSlug?: string;
}) {
  const { mode } = useVersion();

  if (mode === "classic") return <ClassicPortfolioDetail persona={persona} appSlug={appSlug} />;
  if (mode === "init") return <InitPortfolioDetail persona={persona} appSlug={appSlug} />;
  return null;
}
