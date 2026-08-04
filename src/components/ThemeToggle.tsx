"use client";

import React from "react";
import { useVersion } from "@/context/VersionContext";

export default function ThemeToggle({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const { mode, setMode } = useVersion();

  return (
    <div
      className="viewModeControl"
      data-theme={theme}
      aria-label="Choose website view"
    >
      {(["modern", "classic", "init"] as const).map((option) => (
        <button
          type="button"
          key={option}
          className={mode === option ? "active" : ""}
          onClick={() => setMode(option)}
        >
          {option[0].toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}
