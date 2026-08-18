"use client";

import Reveal from "./Reveal";
import { whyUs } from "@/lib/data";

// Ported from a reference "how we operate" section: heading + intro copy
// side by side, then a row of icon+title+description cards. Reuses
// Penaxis's real whyUs data (same content used in the WhyUs section
// elsewhere on the site) rather than inventing new copy — just a
// different visual treatment here.

const FEATURED = whyUs.filter((w) =>
  ["Results-Driven Approach", "End-to-End Solutions", "Proven Expertise", "AI & Automation Driven"].includes(w.title)
);

const ICONS: Record<string, JSX.Element> = {
  target: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  ),
  rocket: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 15l4 4M13 4c3 1 6 4 7 7-3 1-6 2-8 4-2-2-3-5-4-8 1-2 3-2 5-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  badge: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l2.4 2.4H18v3.6L20.4 12 18 14.4V18h-3.6L12 20.4 9.6 18H6v-3.6L3.6 12 6 9.6V6h3.6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  ),
  cpu: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function AboutV2Values() {
  return (
    <section className="av2-values">
      <div className="mx-auto max-w-7xl px-6">
        <div className="av2-values-head">
          <Reveal>
            <h2 className="av2-values-heading">
              We Operate with Unwavering <span className="text-violet-600">Focus</span> &
              Integrity
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="av2-values-intro">
              We offer a deeply personalized approach - practical strategy, hands-on
              execution, and honest communication, all designed to help your business
              reach its goals and grow with confidence.
            </p>
          </Reveal>
        </div>

        <div className="av2-values-grid">
          {FEATURED.map((item, i) => (
            <Reveal key={item.title} y={20} delay={i * 0.06}>
              <div className="av2-value-card">
                <span className="av2-value-icon">{ICONS[item.icon]}</span>
                <div className="av2-value-body">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
