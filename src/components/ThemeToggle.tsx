"use client";

import React from "react";
import { useVersion } from "@/context/VersionContext";

export default function ThemeToggle({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const { isOldVersion, toggleVersion } = useVersion();

  return (
    <div 
      className="segmentedControl" 
      data-theme={theme}
      data-active={isOldVersion ? "right" : "left"}
      onClick={toggleVersion}
    >
      <div className="segmentSlider"></div>
      <div className="segmentOption" style={{ color: !isOldVersion && theme === 'light' ? '#000' : 'inherit' }}>Modern</div>
      <div className="segmentOption" style={{ color: isOldVersion && theme === 'light' ? '#000' : 'inherit' }}>Classic</div>
    </div>
  );
}
