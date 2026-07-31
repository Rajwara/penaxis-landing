"use client";

// Intro/video/press section only — the pinned horizontal-scroll photo
// + panel gallery that used to follow this has been removed entirely,
// so ServicesShowcase now sits directly after this section instead.

const PRESS_LOGOS = [
  { src: "/images/press/breakit.svg", alt: "Breakit" },
  { src: "/images/press/forbes.svg", alt: "Forbes" },
  { src: "/images/press/etn.svg", alt: "ETN" },
  { src: "/images/press/fortune-logo.png", alt: "Fortune" },
  { src: "/images/press/dagens-industri.png", alt: "Dagens Industri" },
];

export default function HorizontalGallery() {
  // Duplicated for a seamless continuous-scroll loop. Add more real,
  // confirmed press logos to PRESS_LOGOS above whenever available — the
  // marquee handles any number of items the same way.
  const track = [...PRESS_LOGOS, ...PRESS_LOGOS];

  return (
    <section className="hg-intro">
      <div className="hg-intro-eyebrow">From our founders</div>
      <h2>Work that moves sideways</h2>
      <p>Scroll through a few of the things Penaxis has been building lately.</p>
      <div className="hg-intro-video">
        <video controls poster="/images/hero/team-huddle.jpg" preload="metadata">
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
