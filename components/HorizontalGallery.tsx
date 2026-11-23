"use client";

import { pressLogos } from "@/lib/data";

// Intro/video/press section only — the pinned horizontal-scroll photo
// + panel gallery that used to follow this has been removed entirely,
// so ServicesShowcase now sits directly after this section instead.

export default function HorizontalGallery() {
  // Tripled (not just duplicated) for a smoother, less repetitive-looking
  // loop. Add more real, confirmed logos to lib/data.ts's pressLogos
  // whenever available — the marquee handles any number of items the same way.
  const track = [...pressLogos, ...pressLogos, ...pressLogos];

  return (
    <section className="hg-intro">
      <div className="hg-intro-eyebrow">From our founders</div>
      <h2>Work that moves sideways</h2>
      <p>Scroll through a few of the things Penaxis has been building lately.</p>
      <div className="hg-intro-video">
        <video controls poster="/images/hero/founders-video-poster.webp" preload="metadata">
          <source src="/videos/founders-video.mp4" type="video/mp4" />
        </video>
      </div>
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
