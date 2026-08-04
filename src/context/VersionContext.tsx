"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type ViewMode = "modern" | "classic" | "init";

interface VersionContextType {
  mode: ViewMode;
  isOldVersion: boolean;
  isInitVersion: boolean;
  setMode: (mode: ViewMode) => void;
  toggleVersion: () => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export function VersionProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>("modern");

  useEffect(() => {
    // Ensure we are running on client
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const requestedMode = params.get("view");
      if (requestedMode === "classic" || requestedMode === "init" || requestedMode === "modern") {
        const timer = setTimeout(() => setModeState(requestedMode), 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const setMode = (nextMode: ViewMode) => {
    setModeState(nextMode);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("view", nextMode);
      window.history.pushState(null, "", `?${params.toString()}`);
    }
  };

  const toggleVersion = () => setMode(mode === "classic" ? "modern" : "classic");

  return (
    <VersionContext.Provider
      value={{
        mode,
        isOldVersion: mode === "classic",
        isInitVersion: mode === "init",
        setMode,
        toggleVersion,
      }}
    >
      {children}
    </VersionContext.Provider>
  );
}

export function useVersion() {
  const context = useContext(VersionContext);
  if (context === undefined) {
    throw new Error("useVersion must be used within a VersionProvider");
  }
  return context;
}
