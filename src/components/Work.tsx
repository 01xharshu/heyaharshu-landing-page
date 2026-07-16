"use client";

import { WorkProvider, useWorkContext } from "@/context/WorkContext";
import WorkGallery from "./WorkGallery";
import Toolbar from "./Toolbar";
import InteractiveCanvas from "./InteractiveCanvas";

function WorkContent() {
  const { layoutMode, setLayoutMode } = useWorkContext();

  return (
    <section id="work" className="workSection" style={{ position: "relative" }}>
      {/* Title & Layout Toggles */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "4rem" }}>
        <h2 className="title" style={{ marginBottom: "2rem" }}>Work</h2>
        
        <div className="segmentedControl" style={{ 
          width: "fit-content", 
          padding: "0.4rem", 
          borderRadius: "9999px", 
          background: "rgba(255, 255, 255, 0.04)", 
          border: "1px solid rgba(255, 255, 255, 0.08)", 
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
          display: "flex", 
          gap: "0.25rem" 
        }}>
          {["compact", "pinteresty", "dynamic"].map((mode) => (
            <button
              key={mode}
              onClick={() => setLayoutMode(mode as "compact" | "pinteresty" | "dynamic")}
              style={{
                padding: "0.6rem 1.8rem",
                borderRadius: "9999px",
                border: "none",
                background: layoutMode === mode ? "rgba(255, 255, 255, 0.08)" : "transparent",
                color: layoutMode === mode ? "#fff" : "rgba(255, 255, 255, 0.5)",
                boxShadow: layoutMode === mode ? "0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12)" : "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.95rem",
                letterSpacing: "0.01em",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                textTransform: "capitalize"
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: "relative", width: "100%", height: layoutMode === "dynamic" ? "80vh" : "auto", display: "flex" }}>
        {/* Toolbar for dynamic mode */}
        {layoutMode === "dynamic" && <Toolbar />}

        {/* The interactive canvas overlay */}
        {layoutMode === "dynamic" && <InteractiveCanvas />}

        {/* The Gallery */}
        <div style={{ flexGrow: 1, position: "relative" }}>
          <WorkGallery />
        </div>
      </div>
    </section>
  );
}

export default function Work() {
  return (
    <WorkProvider>
      <WorkContent />
    </WorkProvider>
  );
}
