"use client";

import Image from "next/image";
import Link from "next/link";
import RetroSubpageLayout from "@/components/RetroSubpageLayout";

const features = [
  ["01", "Choose a browser", "Decide where a link should open instead of accepting one default every time."],
  ["02", "Stay on the Mac", "A focused macOS utility designed around one small job."],
  ["03", "Keep links moving", "Add a useful decision between clicking a URL and reaching the web."],
];

export default function ClassicOpenerPage() {
  return (
    <RetroSubpageLayout>
      <article className="retroOpenerPage">
        <div className="retroLabel">MAC APP / UTILITY / OPENER</div>

        <header className="retroOpenerHero">
          <Image
            src="/Opener.png"
            alt="Opener app icon"
            width={220}
            height={220}
            className="retroOpenerIcon"
            priority
          />
          <div>
            <h1>Opener.</h1>
            <p>
              A Mac app that lets you choose which browser should open a link.
            </p>
          </div>
        </header>

        <div className="retroOpenerActions">
          <button type="button" className="retroButtonPrimary" aria-label="Download Opener for Mac (download coming soon)">
            Download for Mac
          </button>
          <Link href="/builder" className="retroButtonSecondary">
            Bring me back
          </Link>
        </div>

        <section className="retroOpenerFeatures" aria-label="Opener features">
          {features.map(([number, title, description]) => (
            <div className="retroOpenerFeature" key={number}>
              <span>{number}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          ))}
        </section>

        <footer className="retroOpenerFootnote">
          <span>Platform</span>
          <strong>macOS</strong>
          <span>Release</span>
          <strong>Coming soon</strong>
        </footer>
      </article>
    </RetroSubpageLayout>
  );
}
