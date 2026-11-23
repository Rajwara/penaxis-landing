"use client";

import { pressLogos } from "@/lib/data";

// Standalone "Featured in" logo marquee, split out of HorizontalGallery
// (which also carries the founders-video intro section that this page
// doesn't use) so the homepage can show just the trust-logo strip.

export default function FeaturedLogos() {
  const track = [...pressLogos, ...pressLogos, ...pressLogos];

  return (
    <section className="fl-section">
      <div className="hg-intro-press">
        <div className="hg-intro-press-label">Featured in</div>
        <div className="hg-intro-press-viewport">
          <div className="hg-intro-press-track">
            {track.map((logo, i) => (
              <span className="hg-intro-press-logo" key={i}>
                <img src={logo.src} alt={logo.alt} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
