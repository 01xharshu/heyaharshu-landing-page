"use client";

import RetroSubpageLayout from "@/components/RetroSubpageLayout";

export default function KamaiPage() {
  return (
    <RetroSubpageLayout>
      <div className="retroLabel">ABOUT / KAMAI / 2026</div>
      <h1 className="retroSectionTitle">Kamai.</h1>
      <p className="retroParagraph" style={{ maxWidth: '800px' }}>
        Documenting the financial journey — earnings, experiments, and everything I&apos;ve learned about making money as a builder.
      </p>

      {/* Content placeholder — user will fill in later */}
      <section className="retroSection">
        <p className="retroParagraph" style={{ opacity: 0.5, fontStyle: 'italic' }}>
          Coming soon — content to be added.
        </p>
      </section>
    </RetroSubpageLayout>
  );
}
