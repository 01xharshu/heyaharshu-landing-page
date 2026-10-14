"use client";

import { use } from "react";
import { redirect, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import RefButton from "@/components/RefButton";
import About from "@/components/About";
import Clientele from "@/components/Clientele";
import Work from "@/components/Work";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import DesignerWorkInProgress from "@/components/DesignerWorkInProgress";
import BuilderPortfolio from "@/components/BuilderPortfolio";
import CreatorPortfolio from "@/components/CreatorPortfolio";
import ModePortfolioDetail from "@/components/ModePortfolioDetail";
import { useVersion } from "@/context/VersionContext";

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
  const { mode } = useVersion();

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
  const builderAppSlug =
    personaSlug === "builder" && persona[1] === "apps" ? persona[2] : undefined;

  if (mode !== "modern") {
    return <ModePortfolioDetail persona={personaSlug} appSlug={builderAppSlug} />;
  }

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
          <RefButton
            onClick={() =>
              router.push(builderAppSlug ? "/portfolio/builder?view=modern" : "/?view=modern")
            }
            text="Bring me Back"
            variant="dark"
          />
        </div>

        <div className="personaGalleryLink">
          <RefButton
            onClick={() => router.push(`/gallery?view=modern&from=${personaSlug}`)}
            text="Gallery"
            variant="dark"
          />
        </div>

        <div className="personaHeaderContent">
          {personaSlug === "contentcreator" && (
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
            <Testimonials />
            <div className="designerWorkCurtain">
              <div className="designerHiddenProjects" aria-hidden="true">
                <Work />
              </div>
              <DesignerWorkInProgress />
            </div>
          </main>
          <Footer />
        </>
      ) : personaSlug === "builder" ? (
        <BuilderPortfolio appSlug={builderAppSlug} />
      ) : (
        <CreatorPortfolio />
      )}
    </motion.div>
  );
}
