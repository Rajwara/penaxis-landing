"use client";

import Reveal from "./Reveal";

export default function CaseStudyOverview({
  blurb,
  title,
}: {
  blurb: string;
  title: string;
}) {
  return (
    <section className="cso-section">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="cso-heading">Project Overview</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="cso-p">{blurb}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="cso-p">
            Throughout the engagement we kept scope tight and feedback loops short - shipping
            working pieces early, testing them against real usage, and refining from there. The
            result was a system built around how the team actually works, not a generic template
            stretched to fit.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
