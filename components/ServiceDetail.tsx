"use client";

import Reveal from "./Reveal";
import { services } from "@/lib/data";

// Template for a single service's detail page — number/title hero, long
// description + CTA, a pillars grid, engagement models, tech stack chips,
// and prev/next navigation between the 4 real services.

export default function ServiceDetail({ slug }: { slug: string }) {
  const index = services.findIndex((s) => s.slug === slug);
  const service = services[index];
  if (!service) return null;

  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];

  return (
    <>
      <section className="svd-hero">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <a href="/services" className="svd-back">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All Services
            </a>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="svd-number">{service.number}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="svd-title">{service.title}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="svd-long">{service.long}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <a href="/contact" className="btn-grad svd-cta">
              Start a Project
            </a>
          </Reveal>
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
        <div className="mx-auto max-w-7xl px-6 svd-two-col">
          <Reveal>
            <div>
              <h2 className="svd-h2">Ways to engage</h2>
              <ul className="svd-list">
                {service.engagements.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <h2 className="svd-h2">Tools &amp; stack</h2>
              <div className="svd-chips">
                {service.stack.map((t) => (
                  <span key={t} className="svd-chip">
                    {t}
                  </span>
                ))}
              </div>
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
