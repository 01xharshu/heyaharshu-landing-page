"use client";

import { use } from "react";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import About from "@/components/About";
import Clientele from "@/components/Clientele";
import Work from "@/components/Work";
import Footer from "@/components/Footer";

const validPersonas = ["designer", "builder", "contentcreator"] as const;
type Persona = (typeof validPersonas)[number];

function isValidPersona(value: string): value is Persona {
  return validPersonas.includes(value as Persona);
}

const personaMeta: Record<Persona, { title: string; icon: string; accent: string }> = {
  designer: {
    title: "Designer",
    icon: "🎨",
    accent: "rgba(229, 213, 197, 0.3)",
  },
  builder: {
    title: "Builder",
    icon: "🛠️",
    accent: "rgba(139, 182, 255, 0.3)",
  },
  contentcreator: {
    title: "Content Creator",
    icon: "🎬",
    accent: "rgba(182, 139, 255, 0.3)",
  },
};

export default function PortfolioPage({
  params,
}: {
  params: Promise<{ persona?: string[] }>;
}) {
  const { persona } = use(params);

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
        <Link href="/" className="personaBackLink">
          ← Back
        </Link>
        <div className="personaHeaderContent">
          <span className="personaHeaderIcon">{meta.icon}</span>
          <h1 className="personaHeaderTitle">{meta.title}</h1>
        </div>
      </header>

      {/* Persona Content */}
      <main>
        <PersonaContent persona={personaSlug} />
      </main>

      {personaSlug === "designer" && <Footer />}
    </motion.div>
  );
}

function PersonaContent({ persona }: { persona: Persona }) {
  switch (persona) {
    case "designer":
      return (
        <>
          <About />
          <Clientele />
          <Work />
        </>
      );

    case "builder":
      return (
        <section className="comingSoonSection">
          <div className="comingSoonContainer">
            <span className="comingSoonIcon">🛠️</span>
            <h2 className="comingSoonTitle">Builder</h2>
            <p className="comingSoonText">
              Engineering portfolio coming soon. Stay tuned.
            </p>
            <Link href="/" className="comingSoonBack">
              ← Go back
            </Link>
          </div>
        </section>
      );

    case "contentcreator":
      return (
        <section className="comingSoonSection">
          <div className="comingSoonContainer">
            <span className="comingSoonIcon">🎬</span>
            <h2 className="comingSoonTitle">Content Creator</h2>
            <p className="comingSoonText">
              Content portfolio coming soon. Stay tuned.
            </p>
            <Link href="/" className="comingSoonBack">
              ← Go back
            </Link>
          </div>
        </section>
      );

    default:
      return null;
  }
}
