"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { caseStudyPlaceholders, caseStudyGradients } from "@/lib/data";

// Ported from a reference "awards" accordion (date + title row, +/- toggle,
// expanded description, and a thumbnail that appears on hover) and applied
// to case studies instead. No real case studies exist yet, so this reuses
// the same clearly-placeholder project descriptions as casestudy-v2 (shared
// via lib/data) with abstract gradient thumbnails rather than real or
// fabricated project photos. Swap for real work whenever it exists.

const FEATURED = caseStudyPlaceholders.slice(0, 5);

export default function CaseStudiesAccordion() {
  const [open, setOpen] = useState<number | null>(3);

  return (
    <section className="csa-section">
      <div className="mx-auto max-w-6xl px-6">
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

                  <div className="csa-thumb" style={{ background: caseStudyGradients[i % caseStudyGradients.length] }} aria-hidden="true" />

                  {isOpen && (
                    <div className="csa-row-body">
                      <p>{study.blurb}</p>
                      <a href="/casestudy-v2" className="csa-readall">
                        Read All
                      </a>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
