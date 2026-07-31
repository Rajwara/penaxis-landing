"use client";

import Reveal from "./Reveal";
import { stats } from "@/lib/data";

// Ported from a reference "we craft detailed service solutions" intro
// layout: pixel-block corner decoration, heading + subtext, a large
// framed visual, an approach paragraph, a core-process checklist beside a
// photo, and two stat cards. Adapted to Penaxis:
//   - pixel blocks recolored to the brand palette instead of green
//   - the reference's fake laptop/browser mockup graphic is dropped in
//     favor of a real Penaxis office photo, since we don't have an
//     actual product screenshot to show there
//   - the process checklist uses Penaxis's real delivery process
//   - the two stat cards use Penaxis's own real, already-published stats
//     instead of the reference's unverified "99% Success Rate" style claims

const PROCESS_STEPS = [
  "Discovery & Strategy",
  "Design & Development",
  "Testing & Refinement",
  "Launch & Iteration",
];

export default function ServicesIntro() {
  const statA = stats[3]; // 100% Milestones delivered on schedule
  const statB = stats[0]; // 3 Weeks average MVP launch timeline

  return (
    <section className="svi-section">
      <div className="mx-auto max-w-6xl px-6">
        <div className="svi-head">
          <span className="svi-pixels svi-pixels--tl" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} />
            ))}
          </span>
          <Reveal>
            <h1 className="svi-heading">
              We craft detailed
              <br />
              service solutions.
            </h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="svi-sub">
              We turn ideas into scalable digital products through thoughtful strategy and
              disciplined execution. Our approach blends AI, engineering, and growth expertise
              to build solutions that last.
            </p>
          </Reveal>
          <span className="svi-pixels svi-pixels--br" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} />
            ))}
          </span>
        </div>

        <Reveal delay={0.1} className="svi-frame">
          <img src="/images/hero/office-logo-desk.jpg" alt="Inside the Penaxis studio" />
        </Reveal>

        <div className="svi-approach">
          <Reveal>
            <h2 className="svi-eyebrow">Our Approach to Every Engagement</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="svi-copy">
              Every engagement starts with understanding the problem, not jumping to a
              solution. We combine data-driven strategy with hands-on execution — moving fast
              without skipping the groundwork that makes a product actually work for the people
              using it.
            </p>
          </Reveal>
        </div>

        <div className="svi-split">
          <Reveal>
            <div>
              <h2 className="svi-eyebrow">Core Process</h2>
              <ul className="svi-checklist">
                {PROCESS_STEPS.map((step) => (
                  <li key={step}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
                    </svg>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="svi-split-image">
            <img src="/images/hero/team-huddle.jpg" alt="The Penaxis team collaborating" />
          </Reveal>
        </div>

        <div className="svi-stats">
          <Reveal>
            <div className="svi-stat-card">
              <span className="svi-stat-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="svi-stat-title">
                  {statA.prefix}
                  {statA.value}
                  {statA.suffix}
                </p>
                <p className="svi-stat-copy">{statA.label}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="svi-stat-card">
              <span className="svi-stat-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
                </svg>
              </span>
              <div>
                <p className="svi-stat-title">
                  {statB.prefix}
                  {statB.value}
                  {statB.suffix}
                </p>
                <p className="svi-stat-copy">{statB.label}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
