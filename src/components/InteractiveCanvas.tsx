"use client";

import React, { useRef, useEffect, useState } from "react";
import { useWorkContext } from "@/context/WorkContext";

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { activeTool, activeColor, clearCanvas, setClearCanvas } = useWorkContext();
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const isDrawingTool = activeTool === "pencil" || activeTool === "brush";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resize = () => {
      if (canvas.parentElement) {
        // High DPI canvas support
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      }
    };
    
    window.addEventListener("resize", resize);
    // Initial resize needs a slight delay to ensure parent is rendered
    setTimeout(resize, 100);
    
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (clearCanvas && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      setClearCanvas(false);
    }
  }, [clearCanvas, setClearCanvas]);

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isDrawingTool || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = activeColor;
    
    if (activeTool === "pencil") {
      ctx.lineWidth = 3;
      ctx.globalAlpha = 1;
    } else if (activeTool === "brush") {
      ctx.lineWidth = 30;
      ctx.globalAlpha = 0.4; // Brush effect
    }

    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    lastPos.current = { x, y };
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={(e) => {
        if (!isDrawingTool) return;
        setIsDrawing(true);
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          lastPos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          };
          // Draw a single dot
          draw(e);
        }
      }}
      onPointerMove={draw}
      onPointerUp={() => {
        setIsDrawing(false);
        lastPos.current = null;
      }}
      onPointerLeave={() => {
        setIsDrawing(false);
        lastPos.current = null;
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 20, 
        pointerEvents: isDrawingTool ? "auto" : "none",
        touchAction: "none"
      }}
    />
  );
}
