"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PersonaCard {
  id: string;
  title: string;
  image: string;
  route: string;
}

const personas: PersonaCard[] = [
  {
    id: "contentcreator",
    title: "Content creator",
    image: "/cards/content.png",
    route: "/portfolio/contentcreator",
  },
  {
    id: "designer",
    title: "Designer",
    image: "/cards/design.png",
    route: "/portfolio/designer",
  },
  {
    id: "builder",
    title: "Builder",
    image: "/cards/build.png",
    route: "/portfolio/builder",
  }
];

// Entry directions for each card
const cardVariants = [
  { initial: { x: -120, y: 80, rotate: -12, opacity: 0, scale: 0.7 } },
  { initial: { x: 0, y: 100, rotate: 0, opacity: 0, scale: 0.7 } },
  { initial: { x: 120, y: 80, rotate: 12, opacity: 0, scale: 0.7 } },
];

interface FloatingCardsProps {
  visible: boolean;
}

export default function FloatingCards({ visible }: FloatingCardsProps) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCardClick = (persona: PersonaCard) => {
    if (isTransitioning) return;

    // Navigate with transition
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(persona.route);
    }, 400);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="floatingCardsContainer"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            filter: isTransitioning ? "blur(20px)" : "none",
            transform: isTransitioning ? "scale(1.1)" : "scale(1)",
            transition: "filter 0.4s ease, transform 0.4s ease",
          }}
        >
          {personas.map((persona, index) => (
            <motion.div
              key={persona.id}
              className="arenaCard"
              initial={cardVariants[index].initial}
              animate={{
                x: 0,
                y: 0,
                rotate: 0,
                opacity: 1,
                scale: 1,
              }}
              exit={cardVariants[index].initial}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => handleCardClick(persona)}
            >
              <div className="arenaCardImageWrapper">
                <Image
                  src={persona.image}
                  alt={persona.title.replace('\n', ' ')}
                  fill
                  className="arenaCardImage"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <div className="arenaFadeOverlay"></div>
              </div>
              
              <div className="arenaCardContent">
                <h2 className="arenaCardTitle">
                  {persona.title}
                </h2>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
