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

const THEMES = ["fp--violet", "fp--ink", "fp--ember", "fp--volt"];

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
            className={`fp-slide ${THEMES[i % THEMES.length]} ${i === active ? "is-active" : ""}`}
            onMouseEnter={() => setActive(i)}
          >
            <div className="fp-title">{s.title}</div>
            <div className="fp-about">
              <p>{s.short}</p>
              <a href={`/services#${s.slug}`} className="fp-link">
                Learn more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
