"use client";

import { useState } from "react";
import { services } from "@/lib/data";
import StarfieldBackground from "./StarfieldBackground";

// Ported from a reference "flex slide" panel design: narrow vertical
// strips with rotated titles that flip horizontal and expand wide on
// hover (mouse enters one -> "active" moves to it; mouse leaves the whole
// row -> resets to the first panel). Recreated with React state instead
// of direct DOM class manipulation, and restyled with Penaxis's brand
// palette instead of the reference's black/gray/orange/purple. Content is
// Penaxis's own 4 real services instead of the reference's (Spanish,
// real-estate-specific) placeholder copy.
//
// Each card has its own photo background (cards 1-2 use dedicated
// photos; cards 3-4 share the original photo). No color tint. Closed
// cards get a dark overlay (for the rotated title's contrast); the
// overlay fades away on the open/active card for a clean look.
//
// (A "corner notch" treatment for the arrow button was tried and
// reverted — it disrupted the card's look, so the button is back to a
// plain circle sitting inside the card's own padding.)

const BACKGROUNDS = [
  "/images/panels/service-panel-bg-1.webp",
  "/images/panels/service-panel-bg-2.webp",
  "/images/panels/service-panel-bg.webp",
  "/images/panels/service-panel-bg.webp",
];

export default function ServiceFlexPanels() {
  const [active, setActive] = useState(0);

  return (
    <section className="fp-section">
      <StarfieldBackground />
      <div className="fp-header">
        <div className="fp-header-left">
          <span className="fp-eyebrow">Our Services</span>
          <h2 className="fp-heading">
            Explore ways we can move your
            <br />
            business <span className="fp-underline">forward</span>
          </h2>
        </div>
        <div className="fp-header-right">
          <p className="fp-header-copy">
            From AI-powered MVPs to fractional sales support — everything you
            need under one team.
          </p>
          <a href="/contact" className="fp-cta">
            <span>Start a Project</span>
            <span className="fp-cta-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <div
        className="fp-container"
        onMouseLeave={() => setActive(0)}
      >
        {services.map((s, i) => (
          <div
            key={s.slug}
            className={`fp-slide ${i === active ? "is-active" : ""}`}
            onMouseEnter={() => setActive(i)}
            style={{ backgroundImage: `url(${BACKGROUNDS[i % BACKGROUNDS.length]})` }}
          >
            <div className="fp-content">
              <div className="fp-title">{s.title}</div>
              <div className="fp-about">
                <p>{s.short}</p>
              </div>
            </div>
            <a href={`/services/${s.slug}`} className="fp-arrow" aria-label={`Learn more about ${s.title}`}>
              <span className="fp-arrow-track">
                <span className="fp-arrow-slot">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="fp-arrow-slot">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
