"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface VersionContextType {
  isOldVersion: boolean;
  toggleVersion: () => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export function VersionProvider({ children }: { children: ReactNode }) {
  const [isOldVersion, setIsOldVersion] = useState(false);

  const toggleVersion = () => {
    setIsOldVersion((prev) => !prev);
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
