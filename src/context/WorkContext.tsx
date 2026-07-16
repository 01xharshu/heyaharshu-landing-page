"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type LayoutMode = "compact" | "pinteresty" | "dynamic";
export type Tool = "pointer" | "pencil" | "brush" | "scale" | "eraser";

interface WorkContextType {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  activeColor: string;
  setActiveColor: (color: string) => void;
  clearCanvas: boolean;
  setClearCanvas: (clear: boolean) => void;
}

const WorkContext = createContext<WorkContextType | undefined>(undefined);

export function WorkProvider({ children }: { children: ReactNode }) {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("compact");
  const [activeTool, setActiveTool] = useState<Tool>("pointer");
  const [activeColor, setActiveColor] = useState<string>("#38bdf8");
  const [clearCanvas, setClearCanvas] = useState(false);

  // Clear canvas whenever layout changes
  React.useEffect(() => {
    // Avoid synchronous setState in effect
    const timer = setTimeout(() => {
      setClearCanvas(true);
      // Switch to pointer mode by default when leaving dynamic
      if (layoutMode !== "dynamic") {
        setActiveTool("pointer");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [layoutMode]);

  return (
    <WorkContext.Provider value={{
      layoutMode, setLayoutMode,
      activeTool, setActiveTool,
      activeColor, setActiveColor,
      clearCanvas, setClearCanvas
    }}>
      {children}
    </WorkContext.Provider>
  );
}

export function useWorkContext() {
  const context = useContext(WorkContext);
  if (context === undefined) {
    throw new Error("useWorkContext must be used within a WorkProvider");
  }
  return context;
}
