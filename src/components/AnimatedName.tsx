"use client";

import { motion } from "framer-motion";

export default function AnimatedName({
  className,
  text = "Harsh Mishra",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } },
        hover: { transition: { staggerChildren: 0.025 } },
      }}
    >
      {Array.from(text).map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          aria-hidden="true"
          className="animatedNameCharacter"
          variants={{
            hidden: { opacity: 0, y: 14, filter: "blur(7px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
            },
            hover: {
              y: index % 2 === 0 ? -2 : 2,
              transition: { duration: 0.2, ease: "easeOut" },
            },
          }}
        >
          {character === " " ? "\u00a0" : character}
        </motion.span>
      ))}
    </motion.span>
  );
}
