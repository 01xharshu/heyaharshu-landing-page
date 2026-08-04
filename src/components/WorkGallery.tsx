"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";
import workData from "../data/work.json";
import { useWorkContext } from "@/context/WorkContext";
import RefButton from "./RefButton";

interface WorkItem {
  id: string;
  title: string;
  channelName: string;
  views: string;
  subscribers: string;
  image: string;
  link: string;
  testimonial?: {
    text: string;
    image: string;
  };
}

function DockItem({ mouse, children, onClick }: { mouse: MotionValue<number>, children: React.ReactNode, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouse, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      className="dock-item"
    >
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(12px)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "1.2rem",
        cursor: "pointer"
      }}>
        {children}
      </div>
    </motion.div>
  );
}

function MacDock({ items, onUndock }: { items: WorkItem[], onUndock: (id: string) => void }) {
  const mouseX = useMotionValue(Infinity);

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
        padding: "0.5rem",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        pointerEvents: "auto",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
      }}
    >
      {items.map((item) => (
        <DockItem key={item.id} mouse={mouseX} onClick={() => onUndock(item.id)}>
          {item.id}
        </DockItem>
      ))}
    </motion.div>
  );
}

export default function WorkGallery() {
  const { layoutMode, activeTool } = useWorkContext();
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const [cardScales, setCardScales] = useState<Record<string, number>>({});
  const [dockedCards, setDockedCards] = useState<Record<string, boolean>>({});
  const [resetKey, setResetKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const items: WorkItem[] = workData;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const workParam = searchParams.get("work");
    const timer = setTimeout(() => setSelectedWorkId(workParam), 0);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Reset positions and states when entering dynamic mode
  useEffect(() => {
    if (layoutMode === "dynamic") {
      const timer = setTimeout(() => {
        setResetKey(Date.now());
        setCardScales({});
        setDockedCards({});
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [layoutMode]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedWorkId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedWorkId]);

  const openModal = (id: string) => {
    setSelectedWorkId(id);
    const params = new URLSearchParams(searchParams.toString());
    params.set("work", id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeModal = () => {
    setSelectedWorkId(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("work");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
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

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: { point: { x: number, y: number } }, id: string) => {
    if (layoutMode !== "dynamic") return;
    
    // Check if thrown to any edge of the screen
    const { x, y } = info.point;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (x < 100 || x > w - 100 || y > h - 150 || y < 100) {
      setDockedCards(prev => ({ ...prev, [id]: true }));
    }
  };

  const handleUndock = (id: string) => {
    setDockedCards(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const selectedItem = items.find((item) => item.id === selectedWorkId);

  const getContainerStyle = (): React.CSSProperties => {
    if (layoutMode === "compact") {
      return {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        gap: "2rem",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "auto",
        padding: "2rem",
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none" // Hide scrollbar for cleaner look
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
        minHeight: "100vh",
        position: "relative" as const,
        overflow: "hidden", 
        backgroundImage: layoutMode === "dynamic" ? "radial-gradient(rgba(255, 255, 255, 0.1) 1.5px, transparent 1.5px)" : "none",
        backgroundSize: "30px 30px"
      };
    }
  };
  return (
    <>
      <div style={{ width: "100%", position: "relative", display: "flex", flexDirection: "column" }}>
        <div ref={containerRef} style={getContainerStyle()}>
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            // If docked, don't render it in the main flow
            if (dockedCards[item.id]) return null;

            // Dynamic mode ordered initial positions
            const initialX = (index % 3) * 340 + 250;
            const initialY = Math.floor(index / 3) * 360 + 50;
            const currentScale = cardScales[item.id] || 1;

            const hasCreatorImage = layoutMode === "compact" && !!item.testimonial?.image;
            const cardContent = layoutMode === "dynamic" ? (
              <article className="dynamicWorkCard">
                <div className="dynamicWorkCardMedia">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="300px"
                    className="dynamicWorkCardImage"
                    onError={(event) => { event.currentTarget.style.display = "none"; }}
                  />
                  <span className="dynamicWorkCardIndex">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <footer className="dynamicWorkCardMeta">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.channelName}</p>
                  </div>
                  <span aria-hidden="true">↗</span>
                </footer>
              </article>
            ) : layoutMode === "compact" ? (
              <div 
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(20px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  width: "100%",
                  cursor: "pointer"
                }}
              >
                <div style={{ 
                  position: "relative", 
                  width: "100%", 
                  paddingTop: "55%",
                  background: hasCreatorImage ? "#fff" : "#000",
                  overflow: "hidden",
                  ...(hasCreatorImage ? { filter: "grayscale(100%) contrast(150%)" } : {})
                }}>
                  <Image 
                    src={hasCreatorImage ? item.testimonial!.image : item.image} 
                    alt={item.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ 
                      objectFit: hasCreatorImage ? "cover" : "contain",
                      ...(hasCreatorImage ? { opacity: 0.8 } : {})
                    }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {hasCreatorImage && (
                    <div style={{
                      position: "absolute",
                      top: 0, left: 0, width: "100%", height: "100%",
                      backgroundImage: "radial-gradient(circle, #fff, #000)",
                      backgroundSize: "4px 4px",
                      mixBlendMode: "hard-light",
                      opacity: 0.5
                    }} />
                  )}
                </div>
                <div style={{ padding: "1.2rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", flex: 1, overflow: "hidden" }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#fff", marginBottom: "0.25rem", lineHeight: 1.2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.title}</h3>
                  <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.95rem", marginBottom: "0" }}>{item.channelName}</p>
                </div>
              </div>
            ) : (
              <div 
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(20px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  height: "auto"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.7), 0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.14)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)";
                  e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                }}
              >
                <div style={{ 
                  position: "relative", 
                  width: "100%", 
                  paddingTop: "60%",
                  background: "transparent"
                }}>
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", flex: 1 }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#fff", marginBottom: "0.25rem", lineHeight: 1.3 }}>{item.title}</h3>
                  <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.95rem", marginBottom: "0" }}>{item.channelName}</p>
                </div>
              </div>
            );

            if (layoutMode === "dynamic") {
              return (
                <motion.div
                  key={`dynamic-${resetKey}-${item.id}`}
                  drag={activeTool === "pointer"}
                  dragConstraints={containerRef}
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
                  onClick={() => handleCardInteraction(item.id)}
                  onDragEnd={(e, info) => handleDragEnd(e, info, item.id)}
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
                  display: layoutMode === "compact" ? "flex" : (layoutMode === "pinteresty" ? "inline-block" : "block"),
                  width: layoutMode === "compact" ? "400px" : "100%",
                  flexShrink: layoutMode === "compact" ? 0 : 1,
                  scrollSnapAlign: layoutMode === "compact" ? "center" : "none",
                  breakInside: "avoid",
                  height: layoutMode === "compact" ? "400px" : "auto"
                }}
                onClick={() => handleCardInteraction(item.id)}
              >
                {cardContent}
              </motion.div>
            );
          })}
        </AnimatePresence>
        </div>
        
        {layoutMode === "compact" && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", padding: "1rem 2rem 0", maxWidth: "100vw", width: "100%" }}>
            <button 
              onClick={() => { if(containerRef.current) containerRef.current.scrollBy({ left: -420, behavior: 'smooth' }) }} 
              style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", color: "white", fontSize: "1.2rem" }}
            >
              ‹
            </button>
            <button 
              onClick={() => { if(containerRef.current) containerRef.current.scrollBy({ left: 420, behavior: 'smooth' }) }} 
              style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", color: "white", fontSize: "1.2rem" }}
            >
              ›
            </button>
          </div>
        )}

        {/* Sticky Dock Container */}
        {items.filter(item => dockedCards[item.id]).length > 0 && (
          <div style={{
            position: "sticky",
            bottom: "2rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 1000,
            paddingBottom: "1rem" // ensures it doesn't clip directly into the footer when resting
          }}>
            <MacDock 
              items={items.filter(item => dockedCards[item.id])} 
              onUndock={handleUndock} 
            />
          </div>
        )}
      </div>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedItem && (
          <motion.div
            key="work-modal"
            initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "#050505", // Fully opaque dark background like a new page
              zIndex: 999999,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              padding: "0"
            }}
          >
            {/* Navigation Bar for "New Page" */}
            <div style={{
              position: "sticky",
              top: 0,
              left: 0,
              width: "100%",
              padding: "1.5rem 2rem",
              background: "rgba(5, 5, 5, 0.8)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
            }}>
              <RefButton onClick={closeModal} text="Bring me back" variant="dark" />
            </div>

            {/* Content Area */}
            <div style={{
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "1rem 2rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem"
            }}>
              <div style={{ position: "relative", width: "100%", height: "40vh", borderRadius: "24px", overflow: "hidden" }}>
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  style={{ objectFit: "cover" }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h2 style={{ fontSize: "3.5rem", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>{selectedItem.title}</h2>
                
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginTop: "1rem" }}>
                  <span style={{ fontSize: "1.4rem", color: "rgba(255, 255, 255, 0.7)", fontWeight: 500 }}>{selectedItem.channelName}</span>
                </div>

                {selectedItem.testimonial && (
                  <div style={{
                    marginTop: "2rem",
                    padding: "2rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}>
                    <p style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "1.2rem", fontStyle: "italic", lineHeight: 1.6 }}>
                      &quot;{selectedItem.testimonial.text}&quot;
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <img 
                        src={selectedItem.testimonial.image} 
                        alt={selectedItem.channelName}
                        style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
                      />
                      <span style={{ color: "#fff", fontWeight: 600, fontSize: "1.1rem" }}>{selectedItem.channelName}</span>
                    </div>
                  </div>
                )}

                <a
                  href={selectedItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: "2rem",
                    alignSelf: "flex-start",
                    background: "#fff",
                    color: "#000",
                    padding: "1rem 2.5rem",
                    borderRadius: "99px",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    textDecoration: "none",
                    transition: "transform 0.2s ease",
                    boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2)"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Watch Video
                </a>
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
