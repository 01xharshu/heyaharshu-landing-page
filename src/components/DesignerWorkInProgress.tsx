import Image from "next/image";

export default function DesignerWorkInProgress() {
  return (
    <section className="designerWipSection" aria-label="Work in progress">
      <div className="designerBlurVeil" aria-hidden="true" />
      <div className="designerWipContent">
        <h2>Work in progress</h2>

        <nav className="designerPortfolioLinks" aria-label="Design portfolios">
          <a
            href="https://behance.net/heyaharshu"
            target="_blank"
            rel="noreferrer"
            className="designerLogoLink behanceLogo"
            aria-label="View Harsh on Behance"
          >
            Bē
          </a>
          <a
            href="https://fueler.io/heyaharshu"
            target="_blank"
            rel="noreferrer"
            className="designerLogoLink fuelerLogo"
            aria-label="View Harsh on Fueler"
          >
            <Image
              src="/fueler-logo.png"
              alt=""
              width={64}
              height={67}
              aria-hidden="true"
            />
          </a>
        </nav>
      </div>
      <div className="designerBottomShadow" aria-hidden="true" />
    </section>
  );
}
