"use client";

import React from "react";
import { useVersion } from "@/context/VersionContext";
import RefButton from "./RefButton";
import Link from "next/link";

interface RetroSubpageLayoutProps {
  children: React.ReactNode;
}

export default function RetroSubpageLayout({ children }: RetroSubpageLayoutProps) {
  const { toggleVersion } = useVersion();

  return (
    <div className="retroWrapper">
      {/* HEADER BAR */}
      <header className="retroHeader">
        <div className="retroHeaderLogo">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Harsh</Link>
        </div>
        
        <nav className="retroHeaderNav">
          <Link href="/#projects" className="retroNavItem">Projects</Link>
          
          <div className="retroDropdownContainer">
            <Link href="/#work" className="retroNavItem">Work</Link>
            <div className="retroDropdownMenu">
              <Link href="/#as-designer" className="retroDropdownCard">As Designer</Link>
              <Link href="/#as-content-creator" className="retroDropdownCard">As Content Creator</Link>
              <Link href="/#as-builder" className="retroDropdownCard">As Builder</Link>
            </div>
          </div>

          <Link href="/#about-me" className="retroNavItem">About Me</Link>
          <Link href="/places" className="retroNavItem">Places</Link>
          <Link href="/books" className="retroNavItem">Books</Link>
          <Link href="/kamai" className="retroNavItem">Kamai</Link>
          <Link href="/letter" className="retroNavItem">Letter</Link>
        </nav>

        <div className="retroHeaderActions">
          <RefButton onClick={toggleVersion} text="Modern" variant="light" />
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
