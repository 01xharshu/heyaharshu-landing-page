"use client";

import React from "react";

interface RefButtonProps {
  onClick: () => void;
  text: string;
  variant?: "dark" | "light";
}

export default function RefButton({ onClick, text, variant = "dark" }: RefButtonProps) {
  const isDark = variant === "dark";
  
  return (
    <button 
      onClick={onClick}
      className={`refButton ${isDark ? 'refButtonDark' : 'refButtonLight'}`}
    >
      <span className="cornerDot top-left"></span>
      <span className="cornerDot top-right"></span>
      <span className="cornerDot bottom-left"></span>
      <span className="cornerDot bottom-right"></span>
      <span className="refButtonText">{text}</span>
      <div className="refButtonDivider"></div>
      <span className="refButtonIcon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
        </svg>
      </span>
    </button>
  );
}
