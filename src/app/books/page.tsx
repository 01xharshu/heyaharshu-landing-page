"use client";

import RetroSubpageLayout from "@/components/RetroSubpageLayout";

export default function BooksPage() {
  return (
    <RetroSubpageLayout>
      <div className="retroLabel">ABOUT / BOOKS / 2026</div>
      <h1 className="retroSectionTitle">Books.</h1>
      <p className="retroParagraph" style={{ maxWidth: '800px' }}>
        Books that shaped my thinking, challenged my assumptions, and helped me grow as a builder and a person.
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
