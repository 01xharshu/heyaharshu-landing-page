"use client";

import React from "react";
import { MousePointer2, Pencil, Paintbrush, Maximize, Eraser } from "lucide-react";
import { useWorkContext, Tool } from "@/context/WorkContext";
import { motion } from "framer-motion";

const COLORS = ["#ffffff", "#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#a855f7"];

export default function Toolbar() {
  const { activeTool, setActiveTool, activeColor, setActiveColor, setClearCanvas } = useWorkContext();

  const handleClear = () => {
    setClearCanvas(true);
  };

  const ToolButton = ({ tool, icon: Icon, label }: { tool: Tool, icon: any, label: string }) => {
    const isActive = activeTool === tool;
    return (
      <button
        onClick={() => setActiveTool(tool)}
        title={label}
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: isActive ? "rgba(255, 255, 255, 0.2)" : "transparent",
          color: isActive ? "#fff" : "rgba(255, 255, 255, 0.6)",
          cursor: "pointer",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          if (!isActive) e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
        }}
        onMouseLeave={(e) => {
          if (!isActive) e.currentTarget.style.background = "transparent";
        }}
      >
        <Icon size={20} />
      </button>
    );
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      style={{
        position: "absolute",
        left: "2rem",
        top: "50%",
        transform: "translateY(-50%)",
        background: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        padding: "1rem 0.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        zIndex: 50,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
      }}
    >
      <ToolButton tool="pointer" icon={MousePointer2} label="Move Tool" />
      <ToolButton tool="scale" icon={Maximize} label="Scale Tool" />
      
      <div style={{ width: "100%", height: "1px", background: "rgba(255, 255, 255, 0.1)" }} />
      
      <ToolButton tool="pencil" icon={Pencil} label="Pencil Tool" />
      <ToolButton tool="brush" icon={Paintbrush} label="Brush Tool" />
      
      {/* Color Picker (Only relevant for drawing tools) */}
      {(activeTool === "pencil" || activeTool === "brush") && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center", padding: "0.5rem 0" }}
        >
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setActiveColor(color)}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: color,
                border: activeColor === color ? "2px solid #fff" : "2px solid transparent",
                cursor: "pointer",
                boxShadow: activeColor === color ? "0 0 10px rgba(255,255,255,0.5)" : "none",
                transition: "all 0.2s ease"
              }}
            />
          ))}
        </motion.div>
      )}

      <div style={{ width: "100%", height: "1px", background: "rgba(255, 255, 255, 0.1)" }} />

      <button
        onClick={handleClear}
        title="Clear Canvas"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "transparent",
          color: "rgba(239, 68, 68, 0.8)",
          cursor: "pointer",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
      >
        <Eraser size={20} />
      </button>
    </motion.div>
  );
}
