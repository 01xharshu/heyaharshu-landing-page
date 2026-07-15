"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Eye, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import workData from "../data/work.json";
import { useWorkContext } from "@/context/WorkContext";

interface WorkItem {
  id: string;
  title: string;
  channelName: string;
  views: string;
  subscribers: string;
  image: string;
  link: string;
}

export default function WorkGallery() {
  const { layoutMode, activeTool } = useWorkContext();
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const [cardScales, setCardScales] = useState<Record<string, number>>({});
  const items: WorkItem[] = workData;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const workParam = params.get("work");
      if (workParam) {
        setSelectedWorkId(workParam);
      }
    }
  }, []);

  const openModal = (id: string) => {
    setSelectedWorkId(id);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("work", id);
      window.history.pushState(null, "", `?${params.toString()}`);
    }
  };

  const closeModal = () => {
    setSelectedWorkId(null);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.delete("work");
      window.history.pushState(null, "", `?${params.toString()}`);
    }
  };

  const handleCardInteraction = (id: string) => {
    if (layoutMode === "dynamic" && activeTool === "scale") {
      setCardScales(prev => {
        const currentScale = prev[id] || 1;
        let nextScale = 1.25;
        if (currentScale === 1.25) nextScale = 1.5;
        if (currentScale === 1.5) nextScale = 0.75;
        if (currentScale === 0.75) nextScale = 1;
        return { ...prev, [id]: nextScale };
      });
    } else if (activeTool === "pointer") {
      openModal(id);
    }
  };

  const selectedItem = items.find((item) => item.id === selectedWorkId);

  const getContainerStyle = () => {
    if (layoutMode === "compact") {
      return {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1.5rem",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 2rem"
      };
    } else if (layoutMode === "pinteresty") {
      return {
        columnCount: "auto",
        columnWidth: "300px",
        columnGap: "1.5rem",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 2rem"
      };
    } else {
      return {
        width: "100%",
        height: "100%",
        position: "absolute" as any,
        top: 0,
        left: 0,
        overflow: "visible"
      };
    }
  };

  return (
    <>
      <div style={getContainerStyle()}>
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            // Dynamic mode ordered initial positions
            const initialX = (index % 3) * 340 + 250;
            const initialY = Math.floor(index / 3) * 360 + 50;
            const currentScale = cardScales[item.id] || 1;

            const cardContent = (
              <div 
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  display: "flex",
                  flexDirection: "column",
                  cursor: (layoutMode === "dynamic" && activeTool === "pointer") ? "grab" : (activeTool === "scale" ? "zoom-in" : "pointer")
                }}
              >
                <div style={{ position: "relative", width: "100%", paddingTop: "60%" }}>
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    style={{ objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#fff", marginBottom: "0.25rem", lineHeight: 1.3 }}>{item.title}</h3>
                  <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.95rem" }}>{item.channelName}</p>
                  
                  <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Eye size={14} /> {item.views}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Users size={14} /> {item.subscribers}</span>
                  </div>
                </div>
              </div>
            );

            if (layoutMode === "dynamic") {
              return (
                <motion.div
                  key={`dynamic-${item.id}`}
                  drag={activeTool === "pointer"}
                  dragMomentum={true}
                  whileDrag={{ scale: currentScale * 1.05, cursor: "grabbing" }}
                  initial={{ x: initialX, y: initialY, scale: currentScale, opacity: 0 }}
                  animate={{ scale: currentScale, opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", damping: 20, stiffness: 200 }}
                  style={{
                    position: "absolute",
                    width: "300px",
                    zIndex: 10
                  }}
                  onPointerDown={() => handleCardInteraction(item.id)}
                >
                  {cardContent}
                </motion.div>
              );
            }

            return (
              <motion.div 
                key={`${layoutMode}-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                style={{
                  marginBottom: layoutMode === "pinteresty" ? "1.5rem" : "0",
                  display: layoutMode === "pinteresty" ? "inline-block" : "block",
                  width: "100%",
                  breakInside: "avoid"
                }}
                onClick={() => handleCardInteraction(item.id)}
              >
                {cardContent}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem"
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{
                width: "100%",
                maxWidth: "800px",
                background: "rgba(25, 25, 30, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                borderRadius: "24px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "#fff",
                  zIndex: 10
                }}
              >
                <X size={20} />
              </button>

              <div style={{ position: "relative", width: "100%", height: "400px" }}>
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  style={{ objectFit: "cover" }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(25, 25, 30, 1), transparent)" }} />
              </div>

              <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", marginTop: "-3rem", zIndex: 5 }}>
                <h2 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>{selectedItem.title}</h2>
                
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                  <span style={{ fontSize: "1.2rem", color: "rgba(255, 255, 255, 0.7)", fontWeight: 500 }}>{selectedItem.channelName}</span>
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.3)" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255, 255, 255, 0.7)" }}>
                    <Eye size={16} /> {selectedItem.views}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255, 255, 255, 0.7)" }}>
                    <Users size={16} /> {selectedItem.subscribers}
                  </div>
                </div>

                <a
                  href={selectedItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: "1.5rem",
                    alignSelf: "flex-start",
                    background: "#fff",
                    color: "#000",
                    padding: "0.75rem 2rem",
                    borderRadius: "99px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "transform 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Watch Video
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
