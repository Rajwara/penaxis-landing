"use client";

import Reveal from "./Reveal";

// Ported layout pattern (dark section: stat card + circular arrow CTA,
// a photo, two icon/title/description feature cards, and decorative
// glow/sphere shapes) — not the reference's specific placeholder copy
// ("670+ Project Launched", lorem-ipsum body text, "Motion Graphics" /
// "3D Rendering") or its exact ribbed-sphere texture. Uses a real Penaxis
// stat, real per-service pillar content for the two feature cards, and a
// simpler CSS radial-ring sphere in the brand palette instead.

export default function ServiceHighlights({
  stat,
  photo,
  pillars,
}: {
  stat: { value: string; prefix?: string; suffix?: string; label: string };
  photo: string;
  pillars: { title: string; copy: string }[];
}) {
  const featured = pillars.slice(0, 2);

  return (
    <section className="svh-section">
      <span className="svh-glow" aria-hidden="true" />
      <span className="svh-sphere" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} style={{ transform: `scale(${1 - i * 0.09})`, opacity: 1 - i * 0.05 }} />
        ))}
      </span>

      <div className="mx-auto max-w-7xl px-6 svh-grid">
        <Reveal className="svh-card">
          <div>
            <p className="svh-stat">
              {stat.prefix}
              {stat.value}
              {stat.suffix} <span>{stat.label}</span>
            </p>
            <p className="svh-copy">
              We pair hands-on delivery with clear communication, so you always know what&apos;s
              shipping next and why it matters.
            </p>
          </div>
          <a href="/contact" className="svh-arrow" aria-label="Start a project">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>

        <Reveal delay={0.06} className="svh-photo">
          <img src={photo} alt="Penaxis at work" />
        </Reveal>

        <div className="svh-features">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.05} className="svh-feature">
              <span className="svh-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
                  {i % 2 === 0 ? (
                    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
                  ) : (
                    <>
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </span>
              <h3>{p.title}</h3>
              <p>{p.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
