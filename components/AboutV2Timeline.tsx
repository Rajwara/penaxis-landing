"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { momentum } from "@/lib/data";

// Ported the mechanism from a reference decades-spanning history timeline
// (background photo + an overlay card + clickable year tabs). Penaxis
// doesn't have that kind of long, dated company history to draw on
// honestly, so this uses the real quarterly momentum data already tracked
// elsewhere on the site (project counts per quarter) instead of inventing
// founding dates or fake corporate milestones like acquisitions. Photo is
// real (a Penaxis team meeting).

export default function AboutV2Timeline() {
  const [active, setActive] = useState(momentum.length - 1);
  const current = momentum[active];

  return (
    <section className="av2-timeline">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="av2-timeline-frame">
          <img src="/images/hero/momentum-team.webp" alt="The Penaxis team at work" className="av2-timeline-bg" />

          <div className="av2-timeline-card">
            <span className="av2-timeline-pill">{current.period}</span>
            <span className="av2-timeline-mark" aria-hidden="true">
              *
            </span>
            <h3 className="av2-timeline-title">Momentum</h3>
            <p className="av2-timeline-copy">
              Penaxis delivered {current.value} project{current.value === 1 ? "" : "s"} in{" "}
              {current.period} — part of a steady, quarter-over-quarter climb as our team
              and client base keep growing.
            </p>
          </div>

          <div className="av2-timeline-tabs">
            {momentum.map((m, i) => (
              <button
                key={m.period}
                type="button"
                onClick={() => setActive(i)}
                className={`av2-timeline-tab ${i === active ? "is-active" : ""}`}
              >
                {m.period}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
