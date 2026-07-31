"use client";

import Reveal from "./Reveal";

// Ported layout pattern (not the specific reference site's brand/logo or
// its exact flowing-line generative background texture): dark full-bleed
// banner, oversized stacked heading, a vertical "Scroll" hint with an
// arrow, a description panel on the right, and a stat card bottom-right.
// Background here is a simpler animated glow (two slow-drifting radial
// gradients) in Penaxis's own brand colors rather than recreating the
// reference's specific green wave-line artwork. Stat card uses one of
// Penaxis's real, already-published numbers instead of an invented one.

export default function ServiceBanner({
  service,
  stat,
}: {
  service: { title: string; short: string; number: string };
  stat: { value: string; prefix?: string; suffix?: string; label: string };
}) {
  return (
    <section className="svb-section">
      <div className="svb-glow svb-glow--a" aria-hidden="true" />
      <div className="svb-glow svb-glow--b" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6 svb-inner">
        <div className="svb-row">
          <div className="svb-scroll" aria-hidden="true">
            <span>Scroll</span>
            <svg viewBox="0 0 24 24" width="14" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 2v20M7 17l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <Reveal delay={0.05} className="svb-title-wrap">
            <span className="svd-number">{service.number}</span>
            <h1 className="svb-title">{service.title}</h1>
          </Reveal>

          <div className="svb-side">
            <Reveal delay={0.1}>
              <p className="svb-desc">{service.short}</p>
              <a href="/contact" className="btn-grad svb-cta">
                Start a Project
              </a>
            </Reveal>

            <Reveal delay={0.15} className="svb-stat">
              <span className="svb-stat-value">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </span>
              <span className="svb-stat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
                </svg>
              </span>
              <span className="svb-stat-label">{stat.label}</span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
