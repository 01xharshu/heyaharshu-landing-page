"use client";

import React, { useState } from "react";
import { MousePointer2, Pencil, Paintbrush, Maximize, Eraser, GripHorizontal, GripVertical, RotateCcw } from "lucide-react";
import { useWorkContext, Tool } from "@/context/WorkContext";
import { motion } from "framer-motion";

const COLORS = ["#ffffff", "#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#a855f7"];

const ToolButton = ({ 
  tool, 
  icon: Icon, 
  label, 
  activeTool, 
  onClick 
}: { 
  tool: string, 
  icon: React.ElementType, 
  label: string, 
  activeTool: string, 
  onClick: (tool: string) => void 
}) => {
  const isActive = activeTool === tool;
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onClick(tool)}
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        border: "none",
        background: isActive ? "rgba(255, 255, 255, 0.15)" : "transparent",
        color: isActive ? "#fff" : "rgba(255, 255, 255, 0.5)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease",
        position: "relative"
      }}
      title={label}
      aria-label={label}
    >
      <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
      {isActive && (
        <motion.div
          layoutId="active-tool-indicator"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            pointerEvents: "none"
          }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
};

export default function Toolbar() {
  const { activeTool, setActiveTool, activeColor, setActiveColor, setClearCanvas } = useWorkContext();
  const [isHorizontal, setIsHorizontal] = useState(false);

  const handleClear = () => {
    setClearCanvas(true);
  };

  const handleToolSelect = (tool: Tool | string) => {
    setActiveTool(tool as Tool);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: -100, y: "-50%", opacity: 0 }}
      animate={{ x: 0, y: "-50%", opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      style={{
        position: "absolute",
        left: "2rem",
        top: "50%",
        background: "rgba(255, 255, 255, 0.04)", 
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "20px",
        padding: isHorizontal ? "0.5rem 1rem" : "1rem 0.5rem",
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        alignItems: "center",
        gap: "1rem",
        zIndex: 50,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)" 
      }}
    >
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          color: "rgba(255, 255, 255, 0.3)", 
          cursor: "grab",
          margin: isHorizontal ? "0 -0.5rem 0 0" : "-0.5rem 0 0 0"
        }}
      >
        {isHorizontal ? <GripVertical size={20} /> : <GripHorizontal size={20} />}
      </div>
      
      <ToolButton tool="pointer" icon={MousePointer2} label="Move Tool" activeTool={activeTool} onClick={handleToolSelect} />
      <ToolButton tool="scale" icon={Maximize} label="Scale Tool" activeTool={activeTool} onClick={handleToolSelect} />
      
      <div style={{ 
        width: isHorizontal ? "1px" : "100%", 
        height: isHorizontal ? "100%" : "1px", 
        background: "rgba(255, 255, 255, 0.1)",
        margin: isHorizontal ? "0 0.5rem" : "0.5rem 0"
      }} />
      
      <ToolButton tool="pencil" icon={Pencil} label="Pencil Tool" activeTool={activeTool} onClick={handleToolSelect} />
      <ToolButton tool="brush" icon={Paintbrush} label="Brush Tool" activeTool={activeTool} onClick={handleToolSelect} />
      
      {/* Color Picker */}
      {(activeTool === "pencil" || activeTool === "brush") && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ 
            display: "flex", 
            flexDirection: isHorizontal ? "row" : "column", 
            gap: "0.25rem", 
            background: "rgba(0,0,0,0.2)",
            padding: "0.25rem",
            borderRadius: "14px",
            alignItems: "center"
          }}
        >
          {COLORS.map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveColor(color)}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: color,
                border: activeColor === color ? "2px solid #fff" : "2px solid transparent",
                cursor: "pointer",
                padding: 0
              }}
              title={color}
              aria-label={`Color ${color}`}
            />
          ))}
        </motion.div>
      )}

      <div style={{ 
        width: isHorizontal ? "1px" : "100%", 
        height: isHorizontal ? "100%" : "1px", 
        background: "rgba(255, 255, 255, 0.1)",
        margin: isHorizontal ? "0 0.5rem" : "0.5rem 0"
      }} />

      <ToolButton tool="rotate" icon={RotateCcw} label="Rotate Toolbar" activeTool={activeTool} onClick={() => setIsHorizontal(!isHorizontal)} />

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
