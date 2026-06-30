"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import FloatingCards from "./FloatingCards";

const playfair = Playfair_Display({ subsets: ["latin"], style: "italic" });

const words = ["design", "build product", "vibe code", "create content"];

interface HeroProps {
  cardsVisible: boolean;
  setCardsVisible: (visible: boolean) => void;
}

export default function Hero({ cardsVisible, setCardsVisible }: HeroProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // Prevent page scrolling
      e.preventDefault();

      if (e.deltaY > 0 && !cardsVisible) {
        // Scrolling down — show cards
        setCardsVisible(true);
      } else if (e.deltaY < 0 && cardsVisible) {
        // Scrolling up — hide cards
        setCardsVisible(false);
      }
    },
    [cardsVisible]
  );

  useEffect(() => {
    // Use passive: false so we can preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Also handle touch swipe for mobile
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchDelta = touchStartY - e.touches[0].clientY;
      if (touchDelta > 30 && !cardsVisible) {
        setCardsVisible(true);
      } else if (touchDelta < -30 && cardsVisible) {
        setCardsVisible(false);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [cardsVisible]);

  return (
    <section className="heroSection heroSectionLocked">
      {/* Full bleed image */}
      <div className={`imageBackground ${cardsVisible ? "imageGreyscale" : ""}`}>
        <Image
          src="/Harsh-hero.png"
          alt="Harsh Hero"
          fill
          sizes="100vw"
          className="image"
          priority
        />
      </div>

      {/* Progressive blur overlay from top */}
      <div className={`progressiveBlur ${cardsVisible ? "progressiveBlurDimmed" : ""}`}></div>

      {/* Dark overlay that appears when cards show */}
      <AnimatePresence>
        {cardsVisible && (
          <motion.div
            className="heroDarkOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Content — fades out when cards appear */}
      <motion.div
        className="contentContainer"
        animate={{
          opacity: cardsVisible ? 0 : 1,
          y: cardsVisible ? -40 : 0,
          filter: cardsVisible ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="mainText" style={{ color: "#d0d0d0ff" }}>
          I can{" "}
          <span className={`cursiveWrapper ${playfair.className}`} style={{ color: "#fff" }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWordIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="cursiveWord"
              >
                {words[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>
        <p className="subtitle">
          I have multiple personalities choose one that suits your need
        </p>
      </motion.div>

      {/* Floating Cards */}
      <FloatingCards visible={cardsVisible} />
    </section>
  );
}
