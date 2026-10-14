"use client";

import Link from "next/link";
import { useVersion } from "@/context/VersionContext";
import RefButton from "./RefButton";

export default function Navbar() {
  const { mode, setMode } = useVersion();

  // If we are in the Old Version context, don't render the modern Navbar at all.
  if (mode !== "modern") return null;

  return (
    <>
      {/* Progressive blur background at the top */}
      <div className="topBlur"></div>
      <nav className="navbarContainer">
        <div className="navbarContent">
          {/* Left: Navigation Links */}
          <div className="navLinks" style={{ justifySelf: 'start' }}>
            <Link href="#about" className="navItem">About</Link>
          </div>

          {/* Right: Action Buttons */}
          <div className="navActions">
            <RefButton onClick={() => setMode("classic")} text="Classic" variant="dark" />
            <RefButton onClick={() => setMode("init")} text="Init" variant="dark" />
            <div onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              <RefButton onClick={() => {}} text="Hire Me" variant="light" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
