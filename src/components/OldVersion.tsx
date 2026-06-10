"use client";

import React from "react";
import { useVersion } from "@/context/VersionContext";
import RefButton from "./RefButton";
import Image from "next/image";
import Link from "next/link";

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
        </nav>

        <div className="retroHeaderActions">

          <RefButton onClick={toggleVersion} text="Modern" variant="light" />
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="retroMain">
        
        {/* LEFT COLUMN - TEXT CONTENT */}
        <section className="retroLeft">
          <div className="retroLabel">SOFTWARE ENGINEER & MAKER / 2024 / PORTFOLIO</div>
          
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

          <div className="retroTableContainer">
            <div className="retroNote">
              <div className="retroNoteTitle">Engineer's Note</div>
              <p style={{ fontSize: '0.8rem', lineHeight: 1.6, opacity: 0.8, fontFamily: 'var(--font-geist-mono), monospace' }}>
                The design is structured as a technical schematic. All projects are carefully assembled from scratch, much like a handmade cyberdeck.
              </p>
            </div>

            <div className="retroTable">
              <div className="retroTableRow" style={{ fontWeight: 600, color: '#000000' }}>
                <span>PROJECT</span>
                <span>STATUS</span>
              </div>
              <div className="retroTableRow">
                <span>storybook.ai</span>
                <span>Shipped</span>
              </div>
              <div className="retroTableRow">
                <span>quickplayer</span>
                <span>10k+ Users</span>
              </div>
              <div className="retroTableRow">
                <span>kabir chatbot</span>
                <span>100+ Lives Impacted</span>
              </div>
              <div className="retroTableRow">
                <span>Read Write Own</span>
                <span>Currently Reading</span>
              </div>
            </div>
          </div>
        </section>

        {/* AS DESIGNER SECTION */}
        <section id="as-designer" className="retroSection">
          <div className="retroLabel">PORTFOLIO / DESIGN / 2024</div>
          <h2 className="retroSectionTitle">As Designer.</h2>
          <p className="retroParagraph" style={{ maxWidth: '800px' }}>
            Designing high-converting thumbnails and crafting visual identities. 
            My approach is rooted in human psychology and data-driven design, ensuring every pixel serves a purpose.
          </p>
          <div className="retroTableContainer">
            <div className="retroTable">
              <div className="retroTableRow" style={{ fontWeight: 600, color: '#000000' }}>
                <span>CLIENT / PROJECT</span>
                <span>METRICS</span>
              </div>
              <div className="retroTableRow">
                <span>Vercel</span>
                <span>2.5M+ Views</span>
              </div>
              <div className="retroTableRow">
                <span>Frontend Masters</span>
                <span>1.2M+ Views</span>
              </div>
            </div>
          </div>
        </section>

        {/* AS CONTENT CREATOR SECTION */}
        <section id="as-content-creator" className="retroSection">
          <div className="retroLabel">PORTFOLIO / CONTENT / 2024</div>
          <h2 className="retroSectionTitle">As Content Creator.</h2>
          <p className="retroParagraph" style={{ maxWidth: '800px' }}>
            Sharing my journey, learnings, and insights with a growing community. 
            From breaking down complex technical concepts to documenting the process of building products from scratch.
          </p>
          <div className="retroTableContainer">
            <div className="retroTable">
              <div className="retroTableRow" style={{ fontWeight: 600, color: '#000000' }}>
                <span>PLATFORM</span>
                <span>AUDIENCE</span>
              </div>
              <div className="retroTableRow">
                <span>YouTube</span>
                <span>50k+ Subscribers</span>
              </div>
              <div className="retroTableRow">
                <span>Twitter / X</span>
                <span>15k+ Followers</span>
              </div>
            </div>
          </div>
        </section>

        {/* AS BUILDER SECTION */}
        <section id="as-builder" className="retroSection">
          <div className="retroLabel">PORTFOLIO / ENGINEERING / 2024</div>
          <h2 className="retroSectionTitle">As Builder.</h2>
          <p className="retroParagraph" style={{ maxWidth: '800px' }}>
            Writing code, designing systems, and bringing ideas to life.
            I focus on creating seamless user experiences powered by robust and scalable architecture.
          </p>
          <div className="retroTableContainer">
            <div className="retroTable">
              <div className="retroTableRow" style={{ fontWeight: 600, color: '#000000' }}>
                <span>PRODUCT</span>
                <span>STATUS</span>
              </div>
              <div className="retroTableRow">
                <span>storybook.ai</span>
                <span>Shipped - Active</span>
              </div>
              <div className="retroTableRow">
                <span>quickplayer</span>
                <span>10k+ MAU</span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
