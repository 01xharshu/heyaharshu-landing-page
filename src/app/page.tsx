"use client";

import Navbar from "@/components/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "@/components/Hero";
import OldVersion from "@/components/OldVersion";
import { useVersion } from "@/context/VersionContext";

export default function Home() {
  const { isOldVersion } = useVersion();

  return (
    <AnimatePresence mode="wait">
      {isOldVersion ? (
        <motion.div
          key="old"
          initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <OldVersion />
        </motion.div>
      ) : (
        <motion.div
          key="new"
          initial={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Navbar />
          <main>
            <Hero />
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
