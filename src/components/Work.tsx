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
        
        <div className="segmentedControl" style={{ width: "fit-content", padding: "0.25rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", gap: "0.5rem" }}>
          {["compact", "pinteresty", "dynamic"].map((mode) => (
            <button
              key={mode}
              onClick={() => setLayoutMode(mode as any)}
              style={{
                padding: "0.5rem 1.5rem",
                borderRadius: "99px",
                border: "none",
                background: layoutMode === mode ? "rgba(255, 255, 255, 0.15)" : "transparent",
                color: layoutMode === mode ? "#fff" : "rgba(255, 255, 255, 0.5)",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.2s ease",
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
