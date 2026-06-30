"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, Users } from "lucide-react";
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
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const items: WorkItem[] = workData;

  const handleCardClick = (index: number) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem", width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "2rem 0" }}>
      {items.map((item, index) => {
        const isFlipped = flippedIndex === index;

        return (
          <div 
            key={item.id} 
            className="cardWrapper" 
            style={{ position: "relative", width: "100%", height: "240px", perspective: "1000px" }}
            onClick={() => handleCardClick(index)}
          >
            <div className={`cardInner ${isFlipped ? "flipped" : ""}`} style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d", transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)" }}>
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

              {/* Back side (Details) */}
              <div className="cardBack" style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", borderRadius: "16px", transform: "rotateY(180deg)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(10px)", padding: "1.5rem", textAlign: "center", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <h3 className="backTitle" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{item.title}</h3>
                <p className="channelName" style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "1rem" }}>{item.channelName}</p>
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: "#38bdf8", textDecoration: "underline" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Watch Video
                </a>
              </div>
            </div>

            {/* Hover Data (Only visible on front when not flipped) */}
            {!isFlipped && (
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
            )}
          </div>
        );
      })}
    </div>
  );
}
