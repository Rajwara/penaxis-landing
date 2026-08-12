"use client";

// Intro/video/press section only — the pinned horizontal-scroll photo
// + panel gallery that used to follow this has been removed entirely,
// so ServicesShowcase now sits directly after this section instead.

const PRESS_LOGOS = [
  { src: "/images/press/meerab-properties.webp", alt: "Meerab Properties" },
  { src: "/images/press/drivelo.webp", alt: "Drivelo" },
  { src: "/images/press/devminds.webp", alt: "DevMindz" },
  { src: "/images/press/creative-nodes.webp", alt: "Creative Nodes" },
  { src: "/images/press/bidmore.webp", alt: "BidMore" },
  { src: "/images/press/seka.webp", alt: "Seka" },
  { src: "/images/press/qovex-studio.webp", alt: "Qovex Studio" },
  { src: "/images/press/the-plate-agent.webp", alt: "The Plate Agent" },
  { src: "/images/press/orbital.webp", alt: "Orbital Installation Technologies" },
  { src: "/images/press/oktabytes.webp", alt: "OktaBytes" },
  { src: "/images/press/nas-enterprises.webp", alt: "NAS Enterprises" },
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
