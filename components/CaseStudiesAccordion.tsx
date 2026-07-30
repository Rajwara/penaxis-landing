"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import CountStat from "./CountStat";
import { caseStudyPlaceholders, stats, team } from "@/lib/data";

// Ported from a reference "awards" accordion (date + title row, +/- toggle,
// expanded description, and a thumbnail that appears on hover) and applied
// to case studies instead. No real case studies exist yet, so this reuses
// the same clearly-placeholder project descriptions as casestudy-v2 (shared
// via lib/data). Hover thumbnails use team photos as temporary stand-ins
// (client's request) until real project photos exist — a fixed shuffle
// order (not Math.random) so the order matches between server and client
// render and doesn't cause a hydration mismatch.

const FEATURED = caseStudyPlaceholders.slice(0, 5);
const pictured = team.filter((m) => m.image);
const THUMB_SHUFFLE = [4, 0, 7, 2, 6, 1, 5, 3, 8];
const thumbImages = THUMB_SHUFFLE.map((i) => pictured[i % pictured.length]?.image).filter(Boolean);

export default function CaseStudiesAccordion() {
  const [open, setOpen] = useState<number | null>(3);

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

                  {thumbImages.length > 0 && (
                    <img
                      src={thumbImages[i % thumbImages.length]}
                      alt=""
                      className="csa-thumb"
                      aria-hidden="true"
                    />
                  )}

                  <div className="csa-row-body" aria-hidden={!isOpen}>
                    <div className="csa-row-body-inner">
                      <p>{study.blurb}</p>
                      <a href="/casestudy-v2" className="csa-readall btn-grad">
                        Read All
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

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
