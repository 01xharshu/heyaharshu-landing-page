"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Maximize2, Minimize2, X } from "lucide-react";

export type VideoState = "hidden" | "floating" | "docked" | "modal" | "pip";

interface Props {
  videoState: VideoState;
  setVideoState: (state: VideoState) => void;
  mousePos: { x: number; y: number };
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

/* ─── Shared Glass Button Style ─── */
const glassBtn = (size: "sm" | "md"): React.CSSProperties => ({
  background: "rgba(255, 255, 255, 0.06)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow:
    "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
  color: "white",
  padding: size === "sm" ? "8px" : "10px",
  borderRadius: "50%",
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function InteractiveVideo({
  videoState,
  setVideoState,
  mousePos,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { width: winWidth, height: winHeight } = useWindowSize();
  const [isPlaying, setIsPlaying] = useState(true);

  // Handle video playback
  useEffect(() => {
    if (videoState === "hidden") {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsPlaying(true);
      return;
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current
          .play()
          .catch((err) => console.log("Autoplay prevented:", err));
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoState, isPlaying]);

  // Handle scroll for PiP
  useEffect(() => {
    const handleScroll = () => {
      if (
        videoState === "hidden" ||
        videoState === "floating" ||
        videoState === "docked"
      )
        return;

      if (window.scrollY > 150) {
        setVideoState("pip");
      } else {
        setVideoState("modal");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [videoState, setVideoState]);

  const handleEnded = () => {
    setVideoState("hidden");
  };

  const handleVideoClick = () => {
    if (videoState === "floating") {
      setVideoState("docked");
    } else if (
      videoState === "docked" ||
      videoState === "modal" ||
      videoState === "pip"
    ) {
      setIsPlaying(!isPlaying);
    }
  };

  // Dimensions
  const floatingWidth = 320;
  const floatingHeight = floatingWidth * (9 / 16);

  const dockedWidth = 360;
  const dockedHeight = dockedWidth * (9 / 16);
  const dockedMargin = 32;

  const modalWidth = Math.min(900, winWidth * 0.9);
  const modalHeight = modalWidth * (9 / 16);

  const pipWidth = 320;
  const pipHeight = 180;
  const pipMargin = 24;

  return (
    <AnimatePresence>
      {videoState !== "hidden" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: mousePos.x, y: mousePos.y }}
          animate={
            videoState === "floating"
              ? {
                  opacity: 1,
                  scale: 1,
                  x: mousePos.x + 20,
                  y: mousePos.y + 20,
                  width: floatingWidth,
                  height: floatingHeight,
                  borderRadius: "16px",
                  filter: "grayscale(0%)",
                }
              : videoState === "docked"
              ? {
                  opacity: 1,
                  scale: 1,
                  x: winWidth - dockedWidth - dockedMargin,
                  y: winHeight - dockedHeight - dockedMargin - 80,
                  width: dockedWidth,
                  height: dockedHeight,
                  borderRadius: "20px",
                  filter: isPlaying ? "grayscale(0%)" : "grayscale(100%)",
                }
              : videoState === "modal"
              ? {
                  opacity: 1,
                  scale: 1,
                  x: (winWidth - modalWidth) / 2,
                  y: (winHeight - modalHeight) / 2,
                  width: modalWidth,
                  height: modalHeight,
                  borderRadius: "24px",
                  filter: isPlaying ? "grayscale(0%)" : "grayscale(100%)",
                }
              : {
                  opacity: 1,
                  scale: 1,
                  x: winWidth - pipWidth - pipMargin,
                  y: winHeight - pipHeight - pipMargin,
                  width: pipWidth,
                  height: pipHeight,
                  borderRadius: "16px",
                  filter: isPlaying ? "grayscale(0%)" : "grayscale(100%)",
                }
          }
          exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 100,
            overflow: "hidden",
            cursor: "pointer",
            /* Glassmorphism + Skeuomorphism on the video frame */
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.7), 0 4px 16px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
          }}
          onClick={handleVideoClick}
        >
          <video
            ref={videoRef}
            src="/harsh-speaking.mov"
            onEnded={handleEnded}
            muted={false}
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />

          {/* ─── Overlays ─── */}
          <AnimatePresence>
            {/* Pause overlay */}
            {!isPlaying && videoState !== "floating" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.45)",
                  backdropFilter: "blur(2px)",
                }}
              >
                <div
                  style={{
                    padding: "20px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow:
                      "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Play size={36} fill="white" color="white" />
                </div>
              </motion.div>
            )}

            {/* Floating tooltip */}
            {videoState === "floating" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow:
                    "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
                  color: "white",
                  padding: "6px 16px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                Click to dock
              </motion.div>
            )}

            {/* ─── Docked controls ─── */}
            {videoState === "docked" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVideoState("modal");
                  }}
                  style={glassBtn("sm")}
                  title="Expand"
                >
                  <Maximize2 size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVideoState("hidden");
                  }}
                  style={glassBtn("sm")}
                  title="Close"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}

            {/* ─── Modal controls ─── */}
            {videoState === "modal" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  display: "flex",
                  gap: "12px",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVideoState("docked");
                  }}
                  style={glassBtn("md")}
                  title="Minimize"
                >
                  <Minimize2 size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVideoState("hidden");
                  }}
                  style={glassBtn("md")}
                  title="Close"
                >
                  <X size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
