"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Hero.module.css";
import InteractiveVideo, { VideoState } from "./InteractiveVideo";

const playfair = Playfair_Display({ subsets: ["latin"], style: "italic" });

const words = ["Design", "Build Product", "Vibe Code", "Create Content"];

export default function Hero() {
  const [videoState, setVideoState] = useState<VideoState>("hidden");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    // Interactive video temporarily disabled
    // if (videoState === "floating" || videoState === "hidden") {
    //   setMousePos({ x: e.clientX, y: e.clientY });
    // }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    // Interactive video temporarily disabled
    // if (videoState === "hidden") {
    //   setVideoState("floating");
    //   setMousePos({ x: e.clientX, y: e.clientY });
    // }
  };

  return (
    <>
      <section className={styles.heroSection} onPointerMove={handlePointerMove}>
        {/* Full bleed image */}
        <div className={styles.imageBackground}>
          <Image
            src="/Harsh-hero.png"
            alt="Harsh Hero"
            fill
            sizes="100vw"
            className={styles.image}
            priority
          />
        </div>

        {/* Progressive blur overlay from top */}
        <div className={styles.progressiveBlur}></div>

        {/* Content */}
        <div className={styles.contentContainer}>
          <h1 className={styles.mainText}>
            I can{" "}
            <span className={`${styles.cursiveWrapper} ${playfair.className}`}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={styles.cursiveWord}
                  // onMouseEnter={handleMouseEnter} // Disabled for now
                >
                  {words[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <p className={styles.subtitle}>
            I have multiple personalities choose one that suits your need
          </p>
        </div>
      </section>

      {/* Interactive video is temporarily hidden as requested */}
      {/* <InteractiveVideo
        videoState={videoState}
        setVideoState={setVideoState}
        mousePos={mousePos}
      /> */}
    </>
  );
}
