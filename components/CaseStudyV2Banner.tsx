"use client";

import Reveal from "./Reveal";

// Ported from a reference "philosophy" banner: light gradient background,
// small pill badge, two-line heading with the second line's key word
// accent-colored, and a large rounded photo underneath.

export default function CaseStudyV2Banner() {
  return (
    <section className="csv2-banner">
      <div className="mx-auto max-w-5xl px-6 pt-36 pb-4 md:pt-44">
        <Reveal>
          <span className="csv2-pill">Our Work</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="csv2-heading">
            Real Projects, <span className="text-violet-600">Real Impact</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1} className="mb-10 md:mb-14">
          <div className="csv2-image">
            <img src="/images/hero/team-huddle.jpg" alt="Penaxis at work" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
