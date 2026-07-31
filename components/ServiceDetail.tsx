"use client";

import Reveal from "./Reveal";
import { services, stats } from "@/lib/data";

// Template for a single service's detail page. Ported the "we craft
// detailed service solutions" layout (pixel-block corner decoration,
// heading + subtext, a framed visual, an approach paragraph, a
// checklist beside a photo, and stat cards) — this time applied per
// service, using each service's own real title/short/long/engagements —
// plus a fuller pillars grid, tools/stack chips, and prev/next nav.
//
// Frame/split photos cycle through Penaxis's real team/office photos
// (no dedicated photo exists per service); stat cards reuse Penaxis's
// own real, already-published stats rather than inventing numbers.

const FRAME_PHOTOS = [
  "/images/hero/office-logo-desk.jpg",
  "/images/hero/team-huddle.jpg",
  "/images/hero/office-logo-desk.jpg",
  "/images/hero/team-huddle.jpg",
];
const SPLIT_PHOTOS = [
  "/images/team/zaid-bin-arif.webp",
  "/images/team/laiba-zafar.webp",
  "/images/team/abdullah-sadiq.webp",
  "/images/team/hamza-designer.webp",
];
const STAT_PAIRS: [number, number][] = [
  [0, 3],
  [1, 3],
  [1, 4],
  [0, 1],
];

export default function ServiceDetail({ slug }: { slug: string }) {
  const index = services.findIndex((s) => s.slug === slug);
  const service = services[index];
  if (!service) return null;

  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];
  const [statAIdx, statBIdx] = STAT_PAIRS[index % STAT_PAIRS.length];
  const statA = stats[statAIdx];
  const statB = stats[statBIdx];

  return (
    <>
      <section className="svi-section svi-section--service">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <a href="/services" className="svd-back">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All Services
            </a>
          </Reveal>

          <div className="svi-head">
            <span className="svi-pixels svi-pixels--tl" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} />
              ))}
            </span>
            <Reveal delay={0.05}>
              <span className="svd-number">{service.number}</span>
              <h1 className="svi-heading">{service.title}</h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="svi-sub">{service.short}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <a href="/contact" className="btn-grad svd-cta" style={{ marginTop: "1.5rem" }}>
                Start a Project
              </a>
            </Reveal>
            <span className="svi-pixels svi-pixels--br" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} />
              ))}
            </span>
          </div>

          <Reveal delay={0.12} className="svi-frame">
            <img src={FRAME_PHOTOS[index % FRAME_PHOTOS.length]} alt="Penaxis at work" />
          </Reveal>

          <div className="svi-approach">
            <Reveal>
              <h2 className="svi-eyebrow">About This Service</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="svi-copy">{service.long}</p>
            </Reveal>
          </div>

          <div className="svi-split">
            <Reveal>
              <div>
                <h2 className="svi-eyebrow">Ways to Engage</h2>
                <ul className="svi-checklist">
                  {service.engagements.map((e) => (
                    <li key={e}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <circle cx="12" cy="12" r="9" />
                        <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
                      </svg>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="svi-split-image">
              <img src={SPLIT_PHOTOS[index % SPLIT_PHOTOS.length]} alt="The Penaxis team" />
            </Reveal>
          </div>

          <div className="svi-stats">
            <Reveal>
              <div className="svi-stat-card">
                <span className="svi-stat-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="svi-stat-title">
                    {statA.prefix}
                    {statA.value}
                    {statA.suffix}
                  </p>
                  <p className="svi-stat-copy">{statA.label}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="svi-stat-card">
                <span className="svi-stat-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
                  </svg>
                </span>
                <div>
                  <p className="svi-stat-title">
                    {statB.prefix}
                    {statB.value}
                    {statB.suffix}
                  </p>
                  <p className="svi-stat-copy">{statB.label}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="svd-section">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="svd-h2">What&apos;s included</h2>
          </Reveal>
          <div className="svd-pillars">
            {service.pillars.map((p, i) => (
              <Reveal key={p.title} y={20} delay={i * 0.06}>
                <div className="svd-pillar">
                  <span className="svd-pillar-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.title}</h3>
                  <p>{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="svd-section svd-section--alt">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="svd-h2">Tools &amp; stack</h2>
            <div className="svd-chips">
              {service.stack.map((t) => (
                <span key={t} className="svd-chip">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="svd-nav-section">
        <div className="mx-auto max-w-7xl px-6 svd-nav-row">
          <a href={`/services/${prev.slug}`} className="svd-nav-link svd-nav-link--prev">
            <span className="svd-nav-label">Previous</span>
            <span className="svd-nav-title">{prev.title}</span>
          </a>
          <a href={`/services/${next.slug}`} className="svd-nav-link svd-nav-link--next">
            <span className="svd-nav-label">Next</span>
            <span className="svd-nav-title">{next.title}</span>
          </a>
        </div>
      </section>
    </>
  );
}
