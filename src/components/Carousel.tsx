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
  const [activeIndex, setActiveIndex] = useState(2); // Start at center if 5 items
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const items: WorkItem[] = workData;

  const handleNext = () => {
    setFlippedIndex(null);
    setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
  };

  const handlePrev = () => {
    setFlippedIndex(null);
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      setFlippedIndex((prev) => (prev === index ? null : index));
    } else {
      setFlippedIndex(null);
      setActiveIndex(index);
    }
  };

  return (
    <div className="carouselContainer">
      {items.map((item, index) => {
        // Calculate 3D transforms based on offset from active index
        const offset = index - activeIndex;
        const absOffset = Math.abs(offset);
        
        const zIndex = 100 - absOffset * 10;
        
        let translateX = offset * 250; // Distance between cards
        let translateZ = absOffset > 0 ? -200 - absOffset * 100 : 0;
        let rotateY = offset === 0 ? 0 : offset > 0 ? -45 : 45;
        let opacity = absOffset > 2 ? 0 : 1;

        // Custom style for the 3D position
        const transformStyle = {
          transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
          zIndex,
          opacity,
        };

        const isFlipped = flippedIndex === index;

        return (
          <div 
            key={item.id} 
            className="cardWrapper" 
            style={transformStyle}
            onClick={() => handleCardClick(index)}
          >
            <div className={`cardInner ${isFlipped ? "flipped" : ""}`}>
              {/* Front side (Thumbnail) */}
              <div className="cardFront">
                {/* Fallback gradient if image not found */}
                <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1e293b, #0f172a)" }}>
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="thumbnail"
                    // Handle missing local images by hiding them and showing background
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              </div>

              {/* Back side (Details) */}
              <div className="cardBack">
                <h3 className="backTitle">{item.title}</h3>
                <p className="channelName">{item.channelName}</p>
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ marginTop: "2rem", color: "#38bdf8", textDecoration: "underline" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Watch Video
                </a>
              </div>
            </div>

            {/* Hover Data (Only visible on active, front-facing card via CSS) */}
            {offset === 0 && !isFlipped && (
              <div className="hoverButtons">
                <div className="statButton">
                  <Eye size={18} /> {item.views}
                </div>
                <div className="statButton">
                  <Users size={18} /> {item.subscribers}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Basic Navigation Overlay */}
      <div style={{ position: "absolute", bottom: -80, display: "flex", gap: "2rem" }}>
        <button className="navBtn" onClick={handlePrev} disabled={activeIndex === 0}>
          &#8592;
        </button>
        <button className="navBtn" onClick={handleNext} disabled={activeIndex === items.length - 1}>
          &#8594;
        </button>
      </div>
    </div>
  );
}
