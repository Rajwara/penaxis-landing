"use client";

import { useState } from "react";
import { services } from "@/lib/data";

// Ported from a reference "flex slide" panel design: narrow vertical
// strips with rotated titles that flip horizontal and expand wide on
// hover (mouse enters one -> "active" moves to it; mouse leaves the whole
// row -> resets to the first panel). Recreated with React state instead
// of direct DOM class manipulation, and restyled with Penaxis's brand
// palette instead of the reference's black/gray/orange/purple. Content is
// Penaxis's own 4 real services instead of the reference's (Spanish,
// real-estate-specific) placeholder copy.
//
// All cards share the same photo background with no color tint. Closed
// cards get a dark overlay (for the rotated title's contrast); the
// overlay fades away on the open/active card for a clean look.
//
// The arrow button sits in a "corner notch": it pokes out half outside
// the card's bottom-right corner, with two small quarter-circle fillets
// (matching the page background) smoothing the transition from the
// card's straight edges into the circle — the same technique as the
// Elementor reference's box-shadow/border-radius corner decoration.

export default function ServiceFlexPanels() {
  const [active, setActive] = useState(0);

  return (
    <section className="fp-section">
      <div
        className="fp-container"
        onMouseLeave={() => setActive(0)}
      >
        {services.map((s, i) => (
          <div
            key={s.slug}
            className={`fp-slide ${i === active ? "is-active" : ""}`}
            onMouseEnter={() => setActive(i)}
          >
            <div className="fp-slide-inner">
              <div className="fp-content">
                <div className="fp-title">{s.title}</div>
                <div className="fp-about">
                  <p>{s.short}</p>
                </div>
              </div>
            </div>
            <div className="fp-corner">
              <span className="fp-corner-fillet fp-corner-fillet--top" aria-hidden="true" />
              <span className="fp-corner-fillet fp-corner-fillet--left" aria-hidden="true" />
              <a href={`/services#${s.slug}`} className="fp-arrow" aria-label={`Learn more about ${s.title}`}>
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
          </div>
        ))}
      </div>
    </section>
  );
}
