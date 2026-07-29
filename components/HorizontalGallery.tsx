"use client";

// Intro/video/press section only — the pinned horizontal-scroll photo
// + panel gallery that used to follow this has been removed entirely,
// so ServicesShowcase now sits directly after this section instead.

export default function HorizontalGallery() {
  return (
    <section className="hg-intro">
      <div className="hg-intro-eyebrow">From our founders</div>
      <h1>
        <span><i>Work that</i></span>
        <span><i>moves sideways</i></span>
      </h1>
      <p>Scroll through a few of the things Penaxis has been building lately.</p>
      <div className="hg-intro-video">
        <video controls poster="/images/hero/team-huddle.jpg" preload="metadata">
          {/* Swap this src once the real CEO/founder interview video is uploaded */}
          <source src="" type="video/mp4" />
        </video>
      </div>
      <div className="hg-intro-press">
        <div className="hg-intro-press-label">Featured in</div>
        <div className="hg-intro-press-row">
          <img src="/images/press/breakit.svg" alt="Breakit" />
          <img src="/images/press/forbes.svg" alt="Forbes" />
          <img src="/images/press/etn.svg" alt="ETN" />
          <img src="/images/press/fortune-logo.png" alt="Fortune" />
          <img src="/images/press/dagens-industri.png" alt="Dagens Industri" />
        </div>
      </div>
    </section>
  );
}
