"use client";

import { useState } from "react";
import Reveal from "./Reveal";

// Ported UI mechanism: 3 overlapping/fanned image cards, with the
// hovered one popping to the front (scale up, straighten, higher
// z-index) while the others recede slightly — not the reference's
// specific product screenshot/branding, just the stacked-hover
// interaction, rebuilt with Penaxis's own real photos.
//
// Case studies with real product imagery pass their own `images` prop
// (see bannerImages in lib/data.ts); the rest fall back to this generic
// office-photo placeholder set.
const DEFAULT_BANNER_IMAGES = [
  "/images/hero/team-huddle.jpg",
  "/images/hero/office-logo-desk.jpg",
  "/images/team/hamza-designer.webp",
];

export default function CaseStudyBanner({
  title,
  tags,
  images,
}: {
  title: string;
  tags: string[];
  images?: string[];
}) {
  const bannerImages = images && images.length > 0 ? images : DEFAULT_BANNER_IMAGES;
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="csb-section">
      <div className="mx-auto max-w-6xl px-6 csb-row">
        <div className="csb-col-text">
          <Reveal delay={0.05}>
            <div className="csb-tags">
              {tags.map((t) => (
                <span key={t} className="csb-tag">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="csb-title">{title}</h1>
          </Reveal>
        </div>

        <div className="csb-col-images">
          <Reveal delay={0.1}>
            <div className="csb-stack" onMouseLeave={() => setActive(null)}>
              {bannerImages.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className={`csb-stack-img ${active === i ? "is-active" : ""}`}
                  style={{ zIndex: active === i ? 10 : 3 - i }}
                  onMouseEnter={() => setActive(i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
