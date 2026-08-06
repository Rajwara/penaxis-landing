"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import CountStat from "./CountStat";
import { caseStudies, stats } from "@/lib/data";

// Ported from a reference "awards" accordion (date + title row, +/- toggle,
// expanded description, and a thumbnail that appears on hover) and applied
// to case studies instead. These are Penaxis's real, delivered (and a
// couple of proposed/concept) case studies. Hover thumbnails use real
// product screenshots where available (see `image` in lib/data.ts); rows
// without one simply skip the thumbnail.

const FEATURED = caseStudies.slice(0, 5);

export default function CaseStudiesAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="csa-section">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-14">
          <span className="csa-eyebrow">
            <span className="csa-eyebrow-dot" />
            Case Studies
          </span>
          <h2 className="csa-heading">Work That Speaks for Itself</h2>
        </Reveal>

        <div className="csa-list">
          {FEATURED.map((study, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={study.title} y={16} delay={i * 0.04}>
                <div className={`csa-row ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="csa-row-head"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="csa-tag">{study.tags[0]}</span>
                    <span className="csa-title">{study.title}</span>
                    <span className="csa-toggle" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {study.image && (
                    <img
                      src={study.image}
                      alt=""
                      className="csa-thumb"
                      aria-hidden="true"
                    />
                  )}

                  <div className="csa-row-body" aria-hidden={!isOpen}>
                    <div className="csa-row-body-inner">
                      <p>{study.blurb}</p>
                      <a href="/case-studies" className="csa-readall btn-grad">
                        Read All
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.08} className="text-center mt-10">
          <a href="/case-studies" className="btn-grad csa-view-all">
            View All Case Studies
          </a>
        </Reveal>

        <Reveal delay={0.1} className="csa-stats-wrap">
          <div className="csa-stats">
            {stats.map((s) => (
              <div key={s.label} className="csa-stat">
                <div className="csa-stat-value">
                  <CountStat value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="csa-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
