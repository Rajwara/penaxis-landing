"use client";

import Reveal from "./Reveal";

// Ported layout pattern: centered heading + subtext + CTA + trust line,
// then a card pairing a device mockup with a featured-item badge,
// title, description, and CTA. Not the reference's product ("Notion
// Templates") or its actual software UI — the device mockup here shows
// an abstract wireframe dashboard instead of anyone's real product
// interface, and the featured item is one of Penaxis's own real case
// studies instead of a template being sold.

export default function CaseStudyFeaturedCTA({
  featured,
}: {
  featured: { slug: string; title: string; blurb: string; tags: string[] };
}) {
  return (
    <section className="csf-section">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="csf-heading">See How We Turn Ideas Into Impact</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="csf-sub">
            Real projects, real results — explore how we&apos;ve helped businesses like yours.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <a href="/case-studies" className="btn-grad csf-cta">
            Browse All Case Studies
          </a>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="csf-trust">Trusted by 100+ clients we&apos;ve helped grow</p>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mx-auto max-w-5xl px-6">
        <div className="csf-card">
          <div className="csf-mock">
            <div className="csf-mock-bezel">
              <div className="csf-mock-screen">
                <div className="csf-mock-row">
                  <span className="csf-mock-block" style={{ width: "40%" }} />
                  <span className="csf-mock-pill" />
                </div>
                <div className="csf-mock-row">
                  <span className="csf-mock-block" style={{ width: "60%" }} />
                </div>
                <div className="csf-mock-grid">
                  <span className="csf-mock-tile" />
                  <span className="csf-mock-tile" />
                  <span className="csf-mock-tile csf-mock-tile--accent" />
                </div>
              </div>
            </div>
          </div>

          <div className="csf-info">
            <span className="csf-badge">Featured Case Study</span>
            <h3 className="csf-title">{featured.title}</h3>
            <p className="csf-desc">{featured.blurb}</p>
            <a href={`/case-studies/${featured.slug}`} className="csf-link">
              View Case Study
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
