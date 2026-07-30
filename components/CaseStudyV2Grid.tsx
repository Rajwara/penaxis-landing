"use client";

import { useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";
import { industries, caseStudyPlaceholders, caseStudyGradients } from "@/lib/data";

// Ported from a reference "customer success stories" filter grid: an intro
// line, a row of pill filters ("See All" + categories), and a card grid
// (image + tags + title) that filters live.
//
// There are no real case studies yet, so this uses Penaxis's real 13
// industries to drive real, honest filter tags — but the case studies
// themselves are clearly-placeholder, non-attributed project descriptions
// (no invented client names, quotes, or stats) with abstract gradient
// thumbnails instead of real or fabricated project photos, pending real
// work to feature here.

const FILTER_INDUSTRIES = [
  "Software, IT & SaaS",
  "E-Commerce & Retail",
  "Fintech & Financial Services",
  "Healthcare & Wellness",
  "Education & EdTech",
  "Real Estate & Property",
  "Logistics & Transportation",
  "Automotive & Auto Care",
];

const GRADIENTS = caseStudyGradients;
const PLACEHOLDER_STUDIES = caseStudyPlaceholders;

const findIndustry = (title: string) => industries.find((i) => i.title === title);

export default function CaseStudyV2Grid() {
  const [active, setActive] = useState<string>("all");
  const filterScrollRef = useRef<HTMLDivElement>(null);

  const scrollFilters = (dir: 1 | -1) => {
    filterScrollRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  const filtered = useMemo(
    () => (active === "all" ? PLACEHOLDER_STUDIES : PLACEHOLDER_STUDIES.filter((s) => s.tags.includes(active))),
    [active]
  );

  return (
    <section className="csv2-grid-section">
      <div className="mx-auto max-w-6xl px-6">
        <div className="csv2-grid-head">
          <Reveal>
            <h2 className="csv2-grid-heading">Browse Our Work</h2>
          </Reveal>
          <Reveal delay={0.03}>
            <p className="csv2-intro">
              Insights and inspiration from Penaxis&apos;s project work. Spanning industries
              and services, we&apos;re proud of what we build alongside our partners.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="csv2-filters-wrap">
              <button
                type="button"
                onClick={() => scrollFilters(-1)}
                className="csv2-filter-arrow"
                aria-label="Scroll filters left"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>

              <div
                ref={filterScrollRef}
                className="csv2-filters"
                role="tablist"
                aria-label="Filter case studies by industry"
              >
                <button
                  type="button"
                  onClick={() => setActive("all")}
                  className={`csv2-filter ${active === "all" ? "is-active" : ""}`}
                >
                  See All
                </button>
                {FILTER_INDUSTRIES.map((title) => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => setActive(title)}
                    className={`csv2-filter ${active === title ? "is-active" : ""}`}
                  >
                    {title}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollFilters(1)}
                className="csv2-filter-arrow"
                aria-label="Scroll filters right"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </Reveal>
        </div>

        <div className="csv2-cards">
          {filtered.map((study, i) => (
            <Reveal key={study.title} y={24} delay={0.05 + (i % 4) * 0.06}>
              <a href="/case-studies" className="csv2-card">
                <div className="csv2-card-thumb" style={{ background: GRADIENTS[i % GRADIENTS.length] }} />
                <div className="csv2-card-tags">
                  {study.tags.map((tag) => (
                    <span key={tag} className="csv2-tag" title={findIndustry(tag)?.copy}>
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.6 12.4l-8-8a2 2 0 0 0-1.4-.6H5a2 2 0 0 0-2 2v6.2c0 .5.2 1 .6 1.4l8 8a2 2 0 0 0 2.8 0l6.2-6.2a2 2 0 0 0 0-2.8z" />
                        <circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none" />
                      </svg>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="csv2-card-title">{study.title}</h3>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
