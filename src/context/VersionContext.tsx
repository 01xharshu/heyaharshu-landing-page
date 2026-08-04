"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type ViewMode = "modern" | "classic" | "init";

function isViewMode(value: string | null): value is ViewMode {
  return value === "modern" || value === "classic" || value === "init";
}

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
    const syncModeFromLocation = () => {
      const url = new URL(window.location.href);
      const requestedMode = url.searchParams.get("view");
      const rememberedMode = window.sessionStorage.getItem("harsh-view-mode");
      const nextMode = isViewMode(requestedMode)
        ? requestedMode
        : isViewMode(rememberedMode)
          ? rememberedMode
          : "modern";

      setModeState(nextMode);
      window.sessionStorage.setItem("harsh-view-mode", nextMode);

      if (!isViewMode(requestedMode)) {
        url.searchParams.set("view", nextMode);
        window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
      }
    };

    const timer = setTimeout(syncModeFromLocation, 0);
    window.addEventListener("popstate", syncModeFromLocation);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("popstate", syncModeFromLocation);
    };
  }, []);

  const setMode = (nextMode: ViewMode) => {
    setModeState(nextMode);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("view", nextMode);
      window.sessionStorage.setItem("harsh-view-mode", nextMode);
      window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
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
