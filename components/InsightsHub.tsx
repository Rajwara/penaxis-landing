"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import { insights } from "@/lib/data";

// /insights listing page — heading + a category filter row (same
// interaction pattern as the case studies industry filter) + a card
// grid. All copy is Penaxis's own editorial content from lib/data.ts.

const CATEGORIES = Array.from(new Set(insights.map((post) => post.category)));

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function InsightsHub() {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(
    () => (active === "all" ? insights : insights.filter((post) => post.category === active)),
    [active]
  );

  return (
    <section className="insh-section">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="insh-eyebrow">Insights</span>
          <h1 className="insh-heading">Ideas, lessons, and practical advice from the Penaxis team</h1>
          <p className="insh-intro">
            Notes from the projects we build, the teams we work with, and what we&apos;re learning
            about shipping software and AI products well.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="insh-filters" role="tablist" aria-label="Filter insights by category">
            <button
              type="button"
              onClick={() => setActive("all")}
              className={`insh-filter ${active === "all" ? "is-active" : ""}`}
            >
              All
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`insh-filter ${active === category ? "is-active" : ""}`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="insh-grid">
          {filtered.map((post, i) => (
            <Reveal key={post.slug} y={20} delay={0.04 + (i % 6) * 0.05}>
              <a href={`/insights/${post.slug}`} className="insh-card">
                <div className="insh-card-media">
                  <img src={post.image} alt="" className="insh-card-img" />
                </div>
                <div className="insh-card-body">
                  <span className="insh-card-meta">
                    {post.category}
                    <span className="insh-card-meta-dot" aria-hidden="true" />
                    <span className="insh-card-date">{formatDate(post.date)}</span>
                  </span>
                  <h2 className="insh-card-title">{post.title}</h2>
                  <p className="insh-card-excerpt">{post.excerpt}</p>
                  <span className="insh-card-link">
                    Read article
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
