"use client";

import React from "react";
import { useVersion } from "@/context/VersionContext";
import RefButton from "./RefButton";
import Image from "next/image";
import Link from "next/link";

const designerDemos = [
  { id: 1, image: "/thumb1.jpg", title: "ChainZoku", desc: "Antinomy Studio launched the first phase of ChainZoku's website, home of the Zokus. Pick your favorite clan between the Oni Zoku and the Boso Zoku and begin the adventure." },
  { id: 2, image: "/thumb2.jpg", title: "CyberDeck UI", desc: "A conceptual redesign of a modern operating system using brutalist design principles and terminal-inspired typography for maximum focus." }
];

const creatorDemos = [
  { id: 1, image: "/thumb3.jpg", title: "The State of Next.js", desc: "A deep dive into the App Router ecosystem, covering the latest paradigms in server components and edge rendering for a growing audience." },
  { id: 2, image: "/thumb4.jpg", title: "Building Glassmorphism UI", desc: "Documenting the journey of building an open-source UI library from scratch, sharing challenges and architectural decisions." }
];

const builderDemos = [
  { id: 1, image: "/thumb5.jpg", title: "storybook.ai", desc: "An AI-powered documentation generation tool that analyzes your component library and instantly outputs beautiful interactive docs." },
  { id: 2, image: "/Harsh-hero.png", title: "quickplayer", desc: "A lightweight, highly customizable video player for React applications focused on performance and seamless streaming." },
  { id: 3, image: "/thumb3.jpg", title: "Texometric", desc: "A Figma plugin for typography. My 2nd plugin for Figma, built to help designers get maximum text precision.", link: "https://www.figma.com/community/plugin/1644918796465469562/texometric" },
  { id: 4, image: "/thumb4.jpg", title: "Carousel Export Plugin", desc: "A Figma plugin made to help designers easily export Carousels in a combined PDF or as separate PNGs in just one go.", link: "https://www.figma.com/community/plugin/1638502049583160269/carousel-export-plugin" },
  { id: 5, image: "/thumb2.jpg", title: "PromptLib", desc: "Accelerate your AI workflows with our beautifully designed collection of copy-pasteable production-ready prompts.", link: "https://prompt-library-pearl.vercel.app" }
];

export default function OldVersion() {
  const { toggleVersion } = useVersion();

  return (
    <div className="retroWrapper">
      {/* HEADER BAR */}
      <header className="retroHeader">
        <div className="retroHeaderLogo">
          Harsh
        </div>
        
        <nav className="retroHeaderNav">
          <Link href="#projects" className="retroNavItem">Projects</Link>
          
          <div className="retroDropdownContainer">
            <Link href="#work" className="retroNavItem">Work</Link>
            <div className="retroDropdownMenu">
              <Link href="#as-designer" className="retroDropdownCard">As Designer</Link>
              <Link href="#as-content-creator" className="retroDropdownCard">As Content Creator</Link>
              <Link href="#as-builder" className="retroDropdownCard">As Builder</Link>
            </div>
          </div>

          <Link href="#about-me" className="retroNavItem">About Me</Link>
          <Link href="/places" className="retroNavItem">Places</Link>
          <Link href="/books" className="retroNavItem">Books</Link>
          <Link href="/kamai" className="retroNavItem">Kamai</Link>
        </nav>

        <div className="retroHeaderActions">

          <RefButton onClick={toggleVersion} text="Modern" variant="light" />
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="retroMain">
        
        {/* LEFT SIDEBAR - TOC */}
        <aside className="retroSidebarLeft">
          <h4 className="retroSidebarTitle">Table of Contents</h4>
          <ul className="retroSidebarList">
            <li className="retroSidebarItem"><Link href="#" className="retroSidebarLink">Introduction</Link></li>
            <li className="retroSidebarItem"><Link href="#as-designer" className="retroSidebarLink">As Designer</Link></li>
            <li className="retroSidebarItem"><Link href="#as-content-creator" className="retroSidebarLink">As Content Creator</Link></li>
            <li className="retroSidebarItem"><Link href="#as-builder" className="retroSidebarLink">As Builder</Link></li>
            <li className="retroSidebarItem"><Link href="#about-me" className="retroSidebarLink">More About Me</Link></li>
          </ul>

          <h4 className="retroSidebarTitle" style={{ marginTop: '48px' }}>Pages</h4>
          <ul className="retroSidebarList">
            <li className="retroSidebarItem"><Link href="/places" className="retroSidebarLink">Places</Link></li>
            <li className="retroSidebarItem"><Link href="/books" className="retroSidebarLink">Books</Link></li>
            <li className="retroSidebarItem"><Link href="/kamai" className="retroSidebarLink">Kamai</Link></li>
          </ul>
        </aside>

        {/* CENTER COLUMN - TEXT CONTENT */}
        <section className="retroCenter">

          
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px', marginBottom: '2rem' }}>
            <Image 
              src="/Harsh-hero.png" 
              alt="Harsh Mishra" 
              width={1920}
              height={1080}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          <h1 className="retroTitle">
            I can Build.<br/>
            <span>Design. Create.</span>
          </h1>

          <p className="retroParagraph">
            I'm Harsh Mishra and welcome to my little corner on the Internet. 
            My journey into the world of tech started with a curiosity for how things work under the hood,
            driven by a relentless passion for building tools that solve real problems.
          </p>

          <p className="retroParagraph">
            I am incredibly grateful to spend my days writing code, crafting scalable systems, 
            and shipping products that impact thousands of users around the globe.
          </p>

          <div className="retroStats">
            <div className="retroStatBox">
              <div className="retroStatLabel">Experience</div>
              <div className="retroStatValue">Since 2021</div>
            </div>
            <div className="retroStatBox">
              <div className="retroStatLabel">Impact</div>
              <div className="retroStatValue">10k+ Users</div>
            </div>
            <div className="retroStatBox">
              <div className="retroStatLabel">Role</div>
              <div className="retroStatValue">Engineer</div>
            </div>
            <div className="retroStatBox">
              <div className="retroStatLabel">Status</div>
              <div className="retroStatValue">Building</div>
            </div>
          </div>

          <div className="retroActions">
            <button className="retroButtonPrimary" onClick={() => window.open('mailto:harsh@example.com')}>Contact Me</button>
            <button className="retroButtonSecondary" onClick={() => window.open('https://twitter.com')}>Twitter</button>
          </div>

          {/* AS DESIGNER SECTION */}
          <section id="as-designer" className="retroSection">
            <div className="retroLabel">PORTFOLIO / DESIGN / 2026</div>
            <h2 className="retroSectionTitle">As Designer.</h2>
            <p className="retroParagraph" style={{ maxWidth: '800px' }}>
              Designing high-converting thumbnails and crafting visual identities. 
              My approach is rooted in human psychology and data-driven design, ensuring every pixel serves a purpose.
            </p>
            <div className="retroCardGrid">
              {designerDemos.map((demo) => {
                return (
                  <div className="retroCard" key={demo.id}>
                    <Image src={demo.image} alt={demo.title} width={600} height={400} className="retroCardImage" />
                    <div className="retroCardContent">
                      <h3 className="retroCardTitle">{demo.title}</h3>
                      <p className="retroCardDesc">{demo.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* AS CONTENT CREATOR SECTION */}
          <section id="as-content-creator" className="retroSection">
            <div className="retroLabel">PORTFOLIO / CONTENT / 2026</div>
            <h2 className="retroSectionTitle">As Content Creator.</h2>
            <p className="retroParagraph" style={{ maxWidth: '800px' }}>
              Sharing my journey, learnings, and insights with a growing community. 
              From breaking down complex technical concepts to documenting the process of building products from scratch.
            </p>
            <div className="retroCardGrid">
              {creatorDemos.map((demo) => {
                return (
                  <div className="retroCard" key={demo.id}>
                    <Image src={demo.image} alt={demo.title} width={600} height={400} className="retroCardImage" />
                    <div className="retroCardContent">
                      <h3 className="retroCardTitle">{demo.title}</h3>
                      <p className="retroCardDesc">{demo.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* AS BUILDER SECTION */}
          <section id="as-builder" className="retroSection">
            <div className="retroLabel">PORTFOLIO / ENGINEERING / 2026</div>
            <h2 className="retroSectionTitle">As Builder.</h2>
            <p className="retroParagraph" style={{ maxWidth: '800px' }}>
              Writing code, designing systems, and bringing ideas to life.
              I focus on creating seamless user experiences powered by robust and scalable architecture.
            </p>
            <div className="retroCardGrid">
              {builderDemos.map((demo) => {
                return (
                  <div className="retroCard" key={demo.id}>
                    <Image src={demo.image} alt={demo.title} width={600} height={400} className="retroCardImage" />
                    <div className="retroCardContent">
                      <h3 className="retroCardTitle">{demo.title}</h3>
                      <p className="retroCardDesc">{demo.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* MORE ABOUT ME SECTION */}
          <section id="about-me" className="retroSection">
            <div className="retroLabel">ABOUT / PERSONAL / 2026</div>
            <h2 className="retroSectionTitle">More About Me.</h2>
            <p className="retroParagraph" style={{ maxWidth: '800px' }}>
              Beyond the screen, I&apos;m someone who loves exploring new places, reading books that challenge my thinking, 
              and constantly learning about how the world works. I believe in building things that matter and sharing the journey along the way.
            </p>
            <div className="retroAboutGrid">
              <Link href="/places" className="retroAboutCard">
                <span className="retroAboutCardIcon">📍</span>
                <span className="retroAboutCardTitle">Places</span>
                <span className="retroAboutCardArrow">→</span>
              </Link>
              <Link href="/books" className="retroAboutCard">
                <span className="retroAboutCardIcon">📚</span>
                <span className="retroAboutCardTitle">Books</span>
                <span className="retroAboutCardArrow">→</span>
              </Link>
              <Link href="/kamai" className="retroAboutCard">
                <span className="retroAboutCardIcon">💰</span>
                <span className="retroAboutCardTitle">Kamai</span>
                <span className="retroAboutCardArrow">→</span>
              </Link>
            </div>
          </section>

        </section>

        {/* RIGHT SIDEBAR - LATEST */}
        <aside className="retroSidebarRight">
          <h4 className="retroSidebarTitle">Latest</h4>
          <ul className="retroSidebarList">
            <li className="retroSidebarItem"><a href="https://prompt-library-pearl.vercel.app" target="_blank" rel="noopener noreferrer" className="retroSidebarLink">PromptLib</a></li>
            <li className="retroSidebarItem"><a href="https://www.figma.com/community/plugin/1644918796465469562/texometric" target="_blank" rel="noopener noreferrer" className="retroSidebarLink">Texometric Plugin</a></li>
            <li className="retroSidebarItem"><a href="https://www.figma.com/community/plugin/1638502049583160269/carousel-export-plugin" target="_blank" rel="noopener noreferrer" className="retroSidebarLink">Carousel Export Plugin</a></li>
          </ul>
        </aside>

      </main>

      {/* FOOTER BAR */}
      <footer className="retroFooter">
        <div className="retroHeaderLogo" style={{ fontSize: '0.8rem', opacity: 0.6 }}>
          © 2026 Harsh
        </div>
        
        <nav className="retroHeaderNav">
          <Link href="https://twitter.com" className="retroNavItem">Twitter</Link>
          <Link href="https://github.com" className="retroNavItem">GitHub</Link>
          <Link href="https://linkedin.com" className="retroNavItem">LinkedIn</Link>
        </nav>

        <div className="retroHeaderActions">
          <div className="retroNavItem" style={{ opacity: 0.6, fontSize: '0.8rem', pointerEvents: 'none' }}>
            System Online
          </div>
        </div>
      </footer>
    </div>
  );
}
