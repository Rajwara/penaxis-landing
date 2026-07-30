"use client";

import Reveal from "./Reveal";
import { whyUs } from "@/lib/data";

// Ported from a reference "why choose us" layout: bordered light-gray
// panel, small square-bullet eyebrow, big two-line heading, an abstract
// tiled-block decoration top-right, a dashed-divider 4-column feature row
// with corner dot markers, and a diagonally-striped bottom bar. Reuses
// Penaxis's real whyUs content (same data used elsewhere on the site).

const FEATURED = [
  { title: "Results-Driven Approach", copy: whyUs.find((w) => w.title === "Results-Driven Approach")?.copy, icon: "target" },
  { title: "AI & Automation Driven", copy: whyUs.find((w) => w.title === "AI & Automation Driven")?.copy, icon: "bolt" },
  { title: "Responsive Collaboration", copy: whyUs.find((w) => w.title === "Responsive Collaboration")?.copy, icon: "handshake" },
  { title: "Proven Expertise", copy: whyUs.find((w) => w.title === "Proven Expertise")?.copy, icon: "award" },
];

const ICONS: Record<string, JSX.Element> = {
  target: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 12l4-4 4 2 4-3 4 3 4-1M2 12l4 5 3-2 3 3 3-3 3 2 4-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="5" />
      <path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5" />
    </svg>
  ),
};

export default function WhyChooseUs() {
  return (
    <section className="wcu-section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="wcu-panel">
          <div className="wcu-tiles" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="wcu-head">
            <Reveal>
              <span className="wcu-eyebrow">
                <span className="wcu-eyebrow-dot" />
                Why Choose Us
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="wcu-heading">
                We Help Businesses
                <br />
                Grow With Clarity
              </h2>
            </Reveal>
          </div>

          <div className="wcu-grid">
            {FEATURED.map((item, i) => (
              <Reveal key={item.title} y={20} delay={0.05 + i * 0.06}>
                <div className="wcu-item">
                  <span className="wcu-item-corner wcu-item-corner--tl" aria-hidden="true" />
                  <span className="wcu-item-corner wcu-item-corner--tr" aria-hidden="true" />
                  <span className="wcu-icon">{ICONS[item.icon]}</span>
                  <h3 className="wcu-item-title">{item.title}</h3>
                  <p className="wcu-item-copy">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="wcu-stripe" aria-hidden="true">
            <span className="wcu-item-corner wcu-item-corner--tl" />
            <span className="wcu-item-corner wcu-item-corner--tr" />
          </div>
        </div>
      </div>
    </section>
  );
}
