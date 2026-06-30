"use client";

import { use } from "react";
import { redirect, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import RefButton from "@/components/RefButton";
import About from "@/components/About";
import Clientele from "@/components/Clientele";
import Work from "@/components/Work";
import Footer from "@/components/Footer";

const validPersonas = ["designer", "builder", "contentcreator"] as const;
type Persona = (typeof validPersonas)[number];

function isValidPersona(value: string): value is Persona {
  return validPersonas.includes(value as Persona);
}

const personaMeta: Record<Persona, { title: string; accent: string }> = {
  designer: {
    title: "Designer",
    accent: "rgba(229, 213, 197, 0.3)",
  },
  builder: {
    title: "Builder",
    accent: "rgba(139, 182, 255, 0.3)",
  },
  contentcreator: {
    title: "Content Creator",
    accent: "rgba(182, 139, 255, 0.3)",
  },
};

export default function PortfolioPage({
  params,
}: {
  params: Promise<{ persona?: string[] }>;
}) {
  const { persona } = use(params);
  const router = useRouter();

  // /portfolio with no persona — redirect to home
  if (!persona || persona.length === 0) {
    redirect("/");
  }

  const personaSlug = persona[0];

  // Invalid persona — redirect home
  if (!isValidPersona(personaSlug)) {
    redirect("/");
  }

  const meta = personaMeta[personaSlug];

  return (
    <motion.div
      key={personaSlug}
      initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Persona Header */}
      <header className="personaHeader">
        <div className="personaHeaderGlow" style={{ background: `radial-gradient(ellipse at 50% 0%, ${meta.accent}, transparent 70%)` }} />
        
        <div style={{ position: "absolute", top: "2rem", left: "2rem", zIndex: 10 }}>
          <RefButton onClick={() => router.push("/")} text="Bring me Back" variant="dark" />
        </div>

        <div className="personaHeaderContent">
          {personaSlug !== "designer" && (
            <h1 className="personaHeaderTitle">{meta.title}</h1>
          )}
        </div>
      </header>

      {/* Persona Content */}
      {personaSlug === "designer" ? (
        <>
          <main>
            <About />
            <Clientele />
            <Work />
          </main>
          <Footer />
        </>
      ) : (
        <main style={{ padding: "4rem 2rem", textAlign: "center", color: "#fff" }}>
          <h2>Generic {meta.title} Content</h2>
          <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.7)" }}>
            More information about the {meta.title} personality will be added here soon.
          </p>
        </main>
      )}
    </motion.div>
  );
}

