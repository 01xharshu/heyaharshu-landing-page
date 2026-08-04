"use client";

import React from "react";
import { useVersion } from "@/context/VersionContext";
import RefButton from "./RefButton";
import Link from "next/link";
import AnimatedName from "./AnimatedName";

interface RetroSubpageLayoutProps {
  children: React.ReactNode;
}

export default function RetroSubpageLayout({ children }: RetroSubpageLayoutProps) {
  const { setMode } = useVersion();

  return (
    <div className="retroWrapper">
      {/* HEADER BAR */}
      <header className="retroHeader">
        <div className="retroHeaderLogo">
          <Link href="/?view=classic" style={{ textDecoration: 'none', color: 'inherit' }}><AnimatedName /></Link>
        </div>
        
        <nav className="retroHeaderNav">
          <Link href="/?view=classic#projects" className="retroNavItem">Projects</Link>
          
          <div className="retroDropdownContainer">
            <Link href="/?view=classic#work" className="retroNavItem">Work</Link>
            <div className="retroDropdownMenu">
              <Link href="/?view=classic#as-designer" className="retroDropdownCard">As Designer</Link>
              <Link href="/?view=classic#as-content-creator" className="retroDropdownCard">As Content Creator</Link>
              <Link href="/?view=classic#as-builder" className="retroDropdownCard">As Builder</Link>
            </div>
          </div>

          <Link href="/?view=classic#about-me" className="retroNavItem">About Me</Link>
          <Link href="/places?view=classic" className="retroNavItem">Places</Link>
          <Link href="/books?view=classic" className="retroNavItem">Books</Link>
          <Link href="/kamai?view=classic" className="retroNavItem">Kamai</Link>
          <Link href="/letter?view=classic" className="retroNavItem">Letter</Link>
        </nav>

        <div className="retroHeaderActions">
          <RefButton onClick={() => setMode("modern")} text="Modern" variant="light" />
          <RefButton onClick={() => setMode("init")} text="Init" variant="light" />
        </div>
      </header>

      {/* CENTER-ONLY CONTENT */}
      <main className="retroSubpageMain">
        {children}
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
        </div>
      </footer>
    </div>
  );
}
