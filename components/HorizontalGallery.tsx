"use client";

// Intro/video/press section only — the pinned horizontal-scroll photo
// + panel gallery that used to follow this has been removed entirely,
// so ServicesShowcase now sits directly after this section instead.

const PRESS_LOGOS = [
  { src: "/images/press/bidmore.webp", alt: "BidMore" },
  { src: "/images/press/seka.webp", alt: "Seka" },
  { src: "/images/press/orbital.webp", alt: "Orbital Installation Technologies" },
  { src: "/images/press/oktabytes.webp", alt: "OktaBytes" },
  { src: "/images/press/nhs.webp", alt: "NHS" },
  { src: "/images/press/e2e-worx.webp", alt: "E2E Worx" },
  { src: "/images/press/the-plate-agent.webp", alt: "The Plate Agent" },
];

export default function HorizontalGallery() {
  // Tripled (not just duplicated) for a smoother, less repetitive-looking
  // loop. Add more real, confirmed logos to PRESS_LOGOS above whenever
  // available — the marquee handles any number of items the same way.
  const track = [...PRESS_LOGOS, ...PRESS_LOGOS, ...PRESS_LOGOS];

  return (
    <section className="hg-intro">
      <div className="hg-intro-eyebrow">From our founders</div>
      <h2>Work that moves sideways</h2>
      <p>Scroll through a few of the things Penaxis has been building lately.</p>
      <div className="hg-intro-video">
        <video controls poster="/images/hero/founders-video-poster.webp" preload="metadata">
          {/* Swap this src once the real CEO/founder interview video is uploaded */}
          <source src="" type="video/mp4" />
        </video>
      </div>
      <div className="hg-intro-press">
        <div className="hg-intro-press-label">Featured in</div>
        <div className="hg-intro-press-viewport">
          <div className="hg-intro-press-track">
            {track.map((logo, i) => (
              <img key={i} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
