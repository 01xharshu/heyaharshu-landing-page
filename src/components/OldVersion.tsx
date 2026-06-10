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
          Harsh Mishra MK.I
        </div>
        
        <nav className="retroHeaderNav">
          <Link href="#about" className="retroNavItem">About Us</Link>
          <Link href="#experiences" className="retroNavItem">Experiences</Link>
          <Link href="#partners" className="retroNavItem">Partners</Link>
        </nav>

        <div className="retroHeaderActions">
          <div className="retroStatus">
            <div className="retroStatusDot"></div>
            Online
          </div>
          <RefButton onClick={toggleVersion} text="Modern" variant="light" />
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="retroMain">
        
        {/* LEFT COLUMN - TEXT CONTENT */}
        <section className="retroLeft">
          <div className="retroLabel">THUMBNAIL DESIGNER / 2024 / PORTFOLIO</div>
          
          <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '2rem', border: '2px solid #DE4E25' }}>
            <Image 
              src="/Harsh-hero.png" 
              alt="Harsh Mishra" 
              fill 
              style={{ objectFit: 'cover' }}
            />
          </div>

          <h1 className="retroTitle">
            I can Build.<br/>
            <span>Design. Create.</span>
          </h1>

          <p className="retroParagraph">
            I'm Harsh Mishra and welcome to my little corner on the Internet. 
            My journey of learning about YouTube started when I was in the 8th Standard, 
            driven by a dream of becoming a Tech YouTuber ;)
          </p>

          <p className="retroParagraph">
            I am incredibly grateful to have had the opportunity to work with some truly amazing creators, 
            reaching a combined audience of over 20M+ and counting.
          </p>

          <div className="retroStats">
            <div className="retroStatBox">
              <div className="retroStatLabel">Experience</div>
              <div className="retroStatValue">Since 2021</div>
            </div>
            <div className="retroStatBox">
              <div className="retroStatLabel">Audience</div>
              <div className="retroStatValue">20M+ Reached</div>
            </div>
            <div className="retroStatBox">
              <div className="retroStatLabel">Role</div>
              <div className="retroStatValue">Designer</div>
            </div>
            <div className="retroStatBox">
              <div className="retroStatLabel">Status</div>
              <div className="retroStatValue">Open to work</div>
            </div>
          </div>

          <div className="retroActions">
            <button className="retroButtonPrimary" onClick={() => window.open('mailto:harsh@example.com')}>Contact Me</button>
            <button className="retroButtonSecondary" onClick={() => window.open('https://twitter.com')}>Twitter</button>
          </div>

          <div className="retroTableContainer">
            <div className="retroNote">
              <div className="retroNoteTitle">Designer's Note</div>
              <p style={{ fontSize: '0.8rem', lineHeight: 1.6, opacity: 0.8, fontFamily: 'var(--font-geist-mono), monospace' }}>
                The design is structured as a technical schematic. All projects are carefully assembled from scratch, much like a handmade cyberdeck.
              </p>
            </div>

            <div className="retroTable">
              <div className="retroTableRow" style={{ fontWeight: 600, color: '#DE4E25' }}>
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

      </main>
    </div>
  );
}
