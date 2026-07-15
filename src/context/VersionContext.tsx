"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface VersionContextType {
  isOldVersion: boolean;
  toggleVersion: () => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export function VersionProvider({ children }: { children: ReactNode }) {
  const [isOldVersion, setIsOldVersion] = useState(false);

  useEffect(() => {
    // Ensure we are running on client
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("view") === "classic") {
        setIsOldVersion(true);
      }
    }
  }, []);

  const toggleVersion = () => {
    setIsOldVersion((prev) => {
      const nextState = !prev;
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (nextState) {
          params.set("view", "classic");
        } else {
          params.set("view", "modern");
        }
        window.history.pushState(null, "", `?${params.toString()}`);
      }
      return nextState;
    });
  };

  return (
    <VersionContext.Provider value={{ isOldVersion, toggleVersion }}>
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
