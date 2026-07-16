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
        touchAction: "none",
        cursor: activeTool === "pencil" 
          ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${encodeURIComponent(activeColor)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>') 0 24, crosshair`
          : activeTool === "brush"
          ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${encodeURIComponent(activeColor)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"></path><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"></path></svg>') 0 24, crosshair`
          : "default"
      }}
    />
  );
}
