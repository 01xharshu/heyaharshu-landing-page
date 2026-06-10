"use client";

import React from "react";
import Link from "next/link";
import { X, Mail, PlaySquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footerContainer">
      <div className="footerContent">
        <div className="footerLeft">
          <h3 className="footerLogo">Harsh Mishra</h3>
          <p className="footerDesc">Designing high-converting thumbnails for the top creators on YouTube.</p>
        </div>
        
        <div className="footerRight">
          <div className="footerLinksGroup">
            <h4>Navigation</h4>
            <Link href="#about" className="footerLink">About</Link>
            <Link href="#work" className="footerLink">Work</Link>
            <Link href="#partners" className="footerLink">Partners</Link>
          </div>
          
          <div className="footerLinksGroup">
            <h4>Connect</h4>
            <div className="footerSocials">
              <Link href="https://twitter.com" target="_blank" className="socialIcon" aria-label="X (Twitter)">
                <X size={18} />
              </Link>
              <Link href="https://youtube.com" target="_blank" className="socialIcon" aria-label="YouTube">
                <PlaySquare size={18} />
              </Link>
              <Link href="mailto:harsh@example.com" className="socialIcon" aria-label="Email">
                <Mail size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footerBottom">
        <p>© {new Date().getFullYear()} Harsh Mishra. All rights reserved.</p>
      </div>
    </footer>
  );
}
