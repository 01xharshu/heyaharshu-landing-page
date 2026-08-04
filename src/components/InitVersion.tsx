"use client";

import { useEffect, useState, type FocusEvent, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CircleUserRound,
  Code2,
  FilePenLine,
  Hand,
  Handshake,
  IndianRupee,
  Link2,
  MapPin,
  Palette,
  Rocket,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { useVersion } from "@/context/VersionContext";

type PreviewKey =
  | "harsh"
  | "designer"
  | "builder"
  | "creator"
  | "opener"
  | "texometric"
  | "carousel"
  | "hanumankind"
  | "letter";

interface PreviewData {
  title: string;
  description: string;
  image?: string;
  kind?: "hanumankind";
  portrait?: boolean;
}

interface PreviewState extends PreviewData {
  x: number;
  y: number;
}

type ShowPreview = (key: PreviewKey, clientX: number, clientY: number) => void;

interface PreviewInteractionProps {
  previewKey: PreviewKey;
  showPreview: ShowPreview;
  hidePreview: () => void;
}

const previews: Record<PreviewKey, PreviewData> = {
  harsh: {
    title: "Harsh Mishra",
    description: "Designer, builder, and content creator.",
    image: "/Harsh-hero.png",
    portrait: true,
  },
  designer: {
    title: "As designer",
    description: "Thumbnail design and visual work for creators.",
    image: "/cards/design.png",
    portrait: true,
  },
  builder: {
    title: "As builder",
    description: "Plugins, websites, and focused Mac utilities.",
    image: "/cards/build.png",
    portrait: true,
  },
  creator: {
    title: "As content creator",
    description: "Learning in public since the eighth standard.",
    image: "/cards/content.png",
    portrait: true,
  },
  opener: {
    title: "Opener",
    description: "Choose which browser opens a link on your Mac.",
    image: "/Opener.png",
  },
  texometric: {
    title: "Texometric",
    description: "More precise typography controls inside Figma.",
    image: "/cd26cd88-c1a2-4b69-86e8-258290b6d24a-icon.png",
  },
  carousel: {
    title: "Carousel Export",
    description: "Export Figma carousels as a PDF or separate PNGs.",
    image: "/a2fc4071-8e90-4df0-8e70-7bced5b2f57f-icon.png",
  },
  hanumankind: {
    title: "Hanumankind concept",
    description: "A straightforward website revamp for the Indian artist.",
    kind: "hanumankind",
  },
  letter: {
    title: "Letter",
    description: "Notes on building, confidence, evidence, and early assets.",
    image: "/Me and Harshit.png",
  },
};

const indexItems = [
  { id: "intro", label: "Intro", icon: Hand },
  { id: "now", label: "Now", icon: Zap },
  { id: "launches", label: "Recent launches", icon: Rocket },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "clients", label: "Clients", icon: Handshake },
  { id: "design", label: "Design work", icon: Palette },
  { id: "builder", label: "Builder", icon: Code2 },
  { id: "content", label: "Content journey", icon: Sparkles },
  { id: "numbers", label: "By the numbers", icon: BarChart3 },
  { id: "places", label: "Places", icon: MapPin },
  { id: "books", label: "Books", icon: BookOpen },
  { id: "kamai", label: "Kamai", icon: IndianRupee },
  { id: "letter", label: "Letter", icon: FilePenLine },
  { id: "tools", label: "Skills & tools", icon: Wrench },
  { id: "links", label: "Links", icon: Link2 },
];

const clientNames = [
  "Josh Talks",
  "Prakhar ke Pravachan",
  "Bekifaayati",
  "Ishan Sharma",
  "Umer Qureshi",
  "Food Pharmer",
  "Aaditya Iyengar",
  "Justin Moore",
];

function InitPreview({ preview }: { preview: PreviewState | null }) {
  return (
    <AnimatePresence>
      {preview && (
        <motion.aside
          className={`initHoverPreview ${preview.portrait ? "initHoverPreviewPortrait" : ""}`}
          style={{ left: preview.x, top: preview.y }}
          initial={{ opacity: 0, scale: .94, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: .97, y: 4 }}
          transition={{ duration: .18, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="initHoverPreviewMedia">
            {preview.kind === "hanumankind" ? (
              <div className="initHanumankindPreview">
                <span>INDIA / CONCEPT</span>
                <strong>HANUMAN<br />KIND</strong>
              </div>
            ) : preview.image ? (
              <Image
                src={preview.image}
                alt=""
                fill
                sizes="(max-width: 760px) 0px, 480px"
                className="initHoverPreviewImage"
              />
            ) : null}
          </div>
          <div className="initHoverPreviewCopy">
            <strong>{preview.title}</strong>
            <p>{preview.description}</p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function getPreviewBindings(
  previewKey: PreviewKey,
  showPreview: ShowPreview,
  hidePreview: () => void,
) {
  return {
    onMouseEnter: (event: MouseEvent<HTMLElement>) =>
      showPreview(previewKey, event.clientX, event.clientY),
    onMouseMove: (event: MouseEvent<HTMLElement>) =>
      showPreview(previewKey, event.clientX, event.clientY),
    onMouseLeave: hidePreview,
    onFocus: (event: FocusEvent<HTMLElement>) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      showPreview(previewKey, bounds.right, bounds.top);
    },
    onBlur: hidePreview,
  };
}

function InlineChip({
  previewKey,
  showPreview,
  hidePreview,
  children,
}: PreviewInteractionProps & { children: ReactNode }) {
  return (
    <button
      type="button"
      className="initInlineChip"
      {...getPreviewBindings(previewKey, showPreview, hidePreview)}
    >
      {children}
    </button>
  );
}

function HoverLink({
  previewKey,
  showPreview,
  hidePreview,
  href,
  children,
  external = false,
}: PreviewInteractionProps & {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const bindings = getPreviewBindings(previewKey, showPreview, hidePreview);

  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className="initTextLink" {...bindings}>
      {children}
    </a>
  ) : (
    <Link href={href} className="initTextLink" {...bindings}>
      {children}
    </Link>
  );
}

export default function InitVersion() {
  const { setMode } = useVersion();
  const [activeSection, setActiveSection] = useState("intro");
  const [preview, setPreview] = useState<PreviewState | null>(null);

  useEffect(() => {
    const sections = indexItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -64%", threshold: [0, .2, .5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const positionPreview = (data: PreviewData, clientX: number, clientY: number) => {
    if (typeof window === "undefined" || window.matchMedia("(hover: none)").matches) return;
    const width = data.portrait ? 390 : 480;
    const height = data.portrait ? 500 : 360;
    const gap = 22;
    let x = clientX + gap;
    let y = clientY + gap;

    if (x + width > window.innerWidth - 20) x = clientX - width - gap;
    if (y + height > window.innerHeight - 20) y = window.innerHeight - height - 20;

    setPreview({ ...data, x: Math.max(20, x), y: Math.max(20, y) });
  };

  const showPreview: ShowPreview = (key, clientX, clientY) =>
    positionPreview(previews[key], clientX, clientY);
  const hidePreview = () => setPreview(null);
  const previewInteraction = { showPreview, hidePreview };

  return (
    <div className="initPage">
      <aside className="initIndex" aria-label="Init view index">
        <span className="initIndexLabel">Index</span>
        <nav>
          {indexItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? "active" : ""}
              >
                <Icon size={15} strokeWidth={1.7} aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>

      <div className="initModeSwitch" aria-label="Switch website view">
        <span>Init</span>
        <button type="button" onClick={() => setMode("modern")}>Modern</button>
        <button type="button" onClick={() => setMode("classic")}>Classic</button>
      </div>

      <main className="initMain">
        <header id="intro" className="initIntro initAnchorSection">
          <div className="initSignature">harsh mishra</div>
          <h1>
            Hello there.<br />
            My name is <InlineChip previewKey="harsh" {...previewInteraction}><Image src="/Harsh-hero.png" alt="" width={42} height={42} /></InlineChip> Harsh.<br />
            I design <InlineChip previewKey="designer" {...previewInteraction}><Image src="/cards/design.png" alt="" width={42} height={42} /></InlineChip>, build <InlineChip previewKey="builder" {...previewInteraction}><Image src="/cards/build.png" alt="" width={42} height={42} /></InlineChip>, and create <InlineChip previewKey="creator" {...previewInteraction}><Image src="/cards/content.png" alt="" width={42} height={42} /></InlineChip>.
          </h1>

          <div className="initIntroCopy">
            <p>
              I&apos;m a freelance <HoverLink previewKey="designer" href="/portfolio/designer" {...previewInteraction}>thumbnail designer</HoverLink> and builder. Since 2021, I&apos;ve designed for creators reaching a combined audience of <strong>20M+ and counting.</strong>
            </p>
            <p>
              On the side I&apos;m making <HoverLink previewKey="opener" href="/portfolio/builder/apps/opener" {...previewInteraction}>Opener</HoverLink> for macOS, publishing Figma tools like <HoverLink previewKey="texometric" href="https://www.figma.com/community/plugin/1644918796465469562/texometric" external {...previewInteraction}>Texometric</HoverLink>, and rebuilding a concept site for <HoverLink previewKey="hanumankind" href="https://github.com/01xharshu/hanumankind-india" external {...previewInteraction}>Hanumankind</HoverLink>.
            </p>
            <p>
              I started making content in the eighth standard with a dream of becoming a tech YouTuber. Creating made me more confident; building taught me to keep following curiosity.
            </p>
          </div>

          <a href="#launches" className="initPrimaryButton">See what I&apos;m making</a>
        </header>

        <section id="now" className="initSection initAnchorSection">
          <h2>Now</h2>
          <div className="initDisclosureList">
            <details>
              <summary>Designing for creators</summary>
              <p>Thumbnail systems and visual direction for creators across education, finance, food, and culture.</p>
            </details>
            <details>
              <summary>Building Opener</summary>
              <p>A small Mac utility that puts a browser choice between clicking a link and opening the web.</p>
            </details>
            <details>
              <summary>Making Figma tools</summary>
              <p>Texometric and Carousel Export remove repetitive steps from typography and carousel workflows.</p>
            </details>
            <details>
              <summary>Writing the Letter</summary>
              <p>Longer notes on confidence, evidence, early assets, and learning to build things that once felt unreachable.</p>
            </details>
          </div>
        </section>

        <section id="launches" className="initSection initAnchorSection">
          <h2>Recent launches</h2>
          <div className="initProjectList">
            <HoverLink previewKey="opener" href="/portfolio/builder/apps/opener" {...previewInteraction}><span>Opener</span><small>Mac app</small><b>2026</b></HoverLink>
            <HoverLink previewKey="texometric" href="https://www.figma.com/community/plugin/1644918796465469562/texometric" external {...previewInteraction}><span>Texometric</span><small>Figma plugin</small><b>2026</b></HoverLink>
            <HoverLink previewKey="carousel" href="https://www.figma.com/community/plugin/1638502049583160269/carousel-export-plugin" external {...previewInteraction}><span>Carousel Export</span><small>Figma plugin</small><b>2026</b></HoverLink>
            <HoverLink previewKey="hanumankind" href="https://github.com/01xharshu/hanumankind-india" external {...previewInteraction}><span>Hanumankind</span><small>Concept website</small><b>2026</b></HoverLink>
          </div>
        </section>

        <section id="experience" className="initSection initAnchorSection">
          <h2>Experience</h2>
          <div className="initTimeline">
            <div><span>2021 — now</span><strong>Freelance thumbnail designer</strong><p>Designing high-converting visual work for creators and their audiences.</p></div>
            <div><span>2022 — now</span><strong>Figma to published plugins</strong><p>From opening Figma for the first time to shipping tools in the community.</p></div>
            <div><span>8th standard — now</span><strong>Content creator</strong><p>Learning confidence by making, speaking, and documenting the process.</p></div>
          </div>
        </section>

        <section id="clients" className="initSection initAnchorSection">
          <h2>Selected clients</h2>
          <div className="initClientCloud">
            {clientNames.map((name) => <span key={name}>{name}</span>)}
          </div>
        </section>

        <section id="design" className="initSection initAnchorSection initSplitSection">
          <div><span>01</span><h2>Designer</h2></div>
          <p>I design thumbnails and visual systems that make an idea clear before somebody presses play. <HoverLink previewKey="designer" href="/portfolio/designer" {...previewInteraction}>Open the design portfolio.</HoverLink></p>
        </section>

        <section id="builder" className="initSection initAnchorSection initSplitSection">
          <div><span>02</span><h2>Builder</h2></div>
          <p>Plugins, small Mac utilities, and web experiments made to solve precise problems. <HoverLink previewKey="builder" href="/portfolio/builder" {...previewInteraction}>Open the builder portfolio.</HoverLink></p>
        </section>

        <section id="content" className="initSection initAnchorSection initSplitSection">
          <div><span>03</span><h2>Content creator</h2></div>
          <p>I started with a Samsung Galaxy J1 Ace and a curiosity for tech. The format changed; the instinct to make things public stayed. <HoverLink previewKey="creator" href="/portfolio/contentcreator" {...previewInteraction}>Open the creator portfolio.</HoverLink></p>
        </section>

        <section id="numbers" className="initSection initAnchorSection">
          <h2>By the numbers</h2>
          <div className="initNumbers">
            <div><strong>2021</strong><span>Designing since</span></div>
            <div><strong>20M+</strong><span>Combined creator audience</span></div>
            <div><strong>02</strong><span>Figma plugins shipped</span></div>
            <div><strong>03</strong><span>Mac app experiments</span></div>
          </div>
        </section>

        <section id="places" className="initSection initAnchorSection initPersonalRow">
          <MapPin size={19} aria-hidden="true" /><div><h2>Places</h2><p>Where I&apos;ve been and where I still want to go.</p></div><Link href="/places">Open</Link>
        </section>
        <section id="books" className="initSection initAnchorSection initPersonalRow">
          <BookOpen size={19} aria-hidden="true" /><div><h2>Books</h2><p>Books that shaped my thinking and challenged my assumptions.</p></div><Link href="/books">Open</Link>
        </section>
        <section id="kamai" className="initSection initAnchorSection initPersonalRow">
          <IndianRupee size={19} aria-hidden="true" /><div><h2>Kamai</h2><p>Earnings, experiments, and lessons from making money as a builder.</p></div><Link href="/kamai">Open</Link>
        </section>
        <section id="letter" className="initSection initAnchorSection initPersonalRow">
          <FilePenLine size={19} aria-hidden="true" /><div><h2>Letter</h2><p>Thoughts on confidence, evidence, building, and personal assets.</p></div><HoverLink previewKey="letter" href="/letter" {...previewInteraction}>Open</HoverLink>
        </section>

        <section id="tools" className="initSection initAnchorSection">
          <h2>Skills &amp; tools</h2>
          <div className="initToolRows">
            <p><span>Design</span> Figma, thumbnail systems, visual identities, typography</p>
            <p><span>Build</span> Next.js, React, Swift, macOS utilities, Figma plugins</p>
            <p><span>Create</span> Short-form content, writing, visual storytelling</p>
          </div>
        </section>

        <section id="links" className="initSection initAnchorSection initLinksSection">
          <h2>Elsewhere</h2>
          <a href="https://behance.net/heyaharshu" target="_blank" rel="noreferrer">Behance</a>
          <a href="https://fueler.io/heyaharshu" target="_blank" rel="noreferrer">Fueler</a>
          <a href="https://github.com/01xharshu" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://twitter.com/heyaharshu" target="_blank" rel="noreferrer">X / Twitter</a>
        </section>

        <footer className="initFooter">
          <CircleUserRound size={17} aria-hidden="true" />
          <span>Harsh Mishra · India · 2026</span>
        </footer>
      </main>

      <InitPreview preview={preview} />
    </div>
  );
}
