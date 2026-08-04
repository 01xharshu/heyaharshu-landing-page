"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "@/components/Hero";
import OldVersion from "@/components/OldVersion";
import InitVersion from "@/components/InitVersion";
import { useVersion } from "@/context/VersionContext";

export default function Home() {
  const { mode } = useVersion();
  const [cardsVisible, setCardsVisible] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {mode === "classic" ? (
        <motion.div
          key="old"
          initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <OldVersion />
        </motion.div>
      ) : mode === "init" ? (
        <motion.div
          key="init"
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <InitVersion />
        </motion.div>
      ) : (
        <motion.div
          key="new"
          initial={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence>
            {!cardsVisible && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Navbar />
              </motion.div>
            )}
          </AnimatePresence>
          <main>
            <Hero cardsVisible={cardsVisible} setCardsVisible={setCardsVisible} />
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
