import { Camera, Play, Sparkles } from "lucide-react";

// Add the shared Instagram Reel URL here when it is ready.
const instagramReelUrl: string | null = null;

function getInstagramEmbedUrl(reelUrl: string) {
  const cleanUrl = reelUrl.split("?")[0].replace(/\/$/, "");
  return `${cleanUrl}/embed/`;
}

export default function CreatorPortfolio() {
  return (
    <main className="modernPortfolio creatorPortfolio">
      <section className="modernRoleIntro creatorIntro">
        <span className="modernEyebrow">
          <Sparkles size={15} aria-hidden="true" />
          Ideas, framed
        </span>
        <h1>
          Making the process
          <span> worth watching.</span>
        </h1>
        <p>
          Short-form stories about designing, building, and the curious bits in
          between.
        </p>
      </section>

      <section className="creatorReelSection" aria-labelledby="reel-title">
        <div className="creatorReelCopy">
          <span className="modernEyebrow">
            <Camera size={15} aria-hidden="true" />
            Instagram reel
          </span>
          <h2 id="reel-title">The next story lands here.</h2>
          <p>
            A native reel embed is ready for the final link, presented inside
            the same quiet, dimensional visual system as the rest of the Modern
            portfolio.
          </p>
          <span className="projectStatus">
            <span className="statusPulse" aria-hidden="true" />
            Embed slot ready
          </span>
        </div>

        <div className="creatorReelFrame">
          {instagramReelUrl ? (
            <iframe
              src={getInstagramEmbedUrl(instagramReelUrl)}
              title="Instagram Reel by Harsh Mishra"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="reelPlaceholder">
              <div className="reelAmbient" aria-hidden="true" />
              <span className="reelAccount">
                <Camera size={16} aria-hidden="true" />
                @heyaharshu
              </span>
              <span className="reelPlay" aria-hidden="true">
                <Play size={24} fill="currentColor" />
              </span>
              <span className="reelPlaceholderLabel">Reel coming into frame</span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
