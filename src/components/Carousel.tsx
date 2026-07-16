"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Eye, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import workData from "../data/work.json";

interface WorkItem {
  id: string;
  title: string;
  channelName: string;
  views: string;
  subscribers: string;
  image: string;
  link: string;
}

export default function Carousel() {
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);

  const items: WorkItem[] = workData;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const workParam = params.get("work");
      if (workParam) {
        const timer = setTimeout(() => setSelectedWorkId(workParam), 0);
        return () => clearTimeout(timer);
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

  const selectedItem = items.find((item) => item.id === selectedWorkId);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem", width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "2rem 0" }}>
      {items.map((item) => {
        return (
          <div 
            key={item.id} 
            className="cardWrapper" 
            style={{ position: "relative", width: "100%", height: "240px", perspective: "1000px" }}
            onClick={() => openModal(item.id)}
          >
            <div className="cardInner" style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d", transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)" }}>
              {/* Front side (Thumbnail) */}
              <div className="cardFront" style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", borderRadius: "16px", overflow: "hidden" }}>
                <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1e293b, #0f172a)" }}>
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    style={{ objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              </div>
            </div>

            {/* Hover Data */}
              <div className="hoverButtons" style={{ position: "absolute", bottom: "15px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "10px", opacity: 0, transition: "opacity 0.3s ease" }}
                   onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                   onMouseLeave={(e) => e.currentTarget.style.opacity = "0"}>
                <div className="statButton" style={{ background: "rgba(0,0,0,0.6)", padding: "4px 12px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#fff", backdropFilter: "blur(4px)" }}>
                  <Eye size={14} /> {item.views}
                </div>
                <div className="statButton" style={{ background: "rgba(0,0,0,0.6)", padding: "4px 12px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#fff", backdropFilter: "blur(4px)" }}>
                  <Users size={14} /> {item.subscribers}
                </div>
              </div>
          </div>
        );
      })}

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
    </div>
  );
}
