"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Monitor, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedName from "./AnimatedName";
import RetroSubpageLayout from "./RetroSubpageLayout";
import { useVersion } from "@/context/VersionContext";

export default function ModeSubpageLayout({
  children,
  pageName,
}: {
  children: ReactNode;
  pageName: string;
}) {
  const { mode, setMode } = useVersion();

  if (mode === "classic") {
    return <RetroSubpageLayout>{children}</RetroSubpageLayout>;
  }

  return (
    <div className={`modeSubpage modeSubpage${mode === "init" ? "Init" : "Modern"}`}>
      <header className="modeSubpageHeader">
        <Link href={`/?view=${mode}`} aria-label={`Return to the ${mode} homepage`}>
          <AnimatedName className="modeSubpageName" />
        </Link>
        <nav aria-label="Switch website view">
          <button
            type="button"
            className={mode === "modern" ? "active" : ""}
            onClick={() => setMode("modern")}
          >
            <Monitor size={14} aria-hidden="true" /> Modern
          </button>
          <button
            type="button"
            className={mode === "init" ? "active" : ""}
            onClick={() => setMode("init")}
          >
            <Terminal size={14} aria-hidden="true" /> Init
          </button>
          <button type="button" onClick={() => setMode("classic")}>
            <span className="modeClassicMark" aria-hidden="true" /> Classic
          </button>
        </nav>
      </header>

      <div className="modeSubpageGrid">
        <aside className="modeSubpageIndex">
          <span>Page</span>
          <strong>{pageName}</strong>
          <Link href={`/?view=${mode}`}>
            <ArrowLeft size={14} aria-hidden="true" /> Back to index
          </Link>
        </aside>

        <motion.main
          className="modeSubpageContent"
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
