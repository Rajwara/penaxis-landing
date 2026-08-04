"use client";

import Reveal from "./Reveal";

// Ported UI pattern: a sticky left intro column (eyebrow + heading + CTA)
// stays pinned in place while a right column of process-step cards
// scrolls past it — a common `position: sticky` sidebar technique, not
// tied to any specific site. Recreated with Penaxis's own real pillar
// content (title + description) per service instead of the reference's
// copy, and abstract wireframe-block mockups in the brand palette
// (violet/ember/ink) instead of the reference's black+lime UI previews.

const MOCK_VARIANTS = ["tags", "screens", "app", "chart"] as const;

function StepMock({ variant, index }: { variant: (typeof MOCK_VARIANTS)[number]; index: number }) {
  if (variant === "tags") {
    return (
      <div className="svp-mock svp-mock--tags">
        <span className="svp-block svp-block--ink" style={{ width: "34%" }} />
        <span className="svp-block" style={{ width: "48%", marginLeft: "18%" }} />
        <span className="svp-block svp-block--accent" style={{ width: "30%", marginLeft: "40%" }} />
        <span className="svp-block" style={{ width: "40%" }} />
        <svg className="svp-mock-icon" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="10" cy="10" r="6" />
          <path d="M20 20l-5.5-5.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (variant === "screens") {
    return (
      <div className="svp-mock svp-mock--screens">
        <span className="svp-block svp-block--ghost" style={{ width: "40%" }} />
        <span className="svp-block svp-block--ghost" style={{ width: "22%", marginLeft: "auto" }} />
        <span className="svp-block svp-block--ink" style={{ width: "44%", marginTop: "1.5rem" }}>
          Onboarding screens
        </span>
        <span className="svp-block svp-block--ghost" style={{ width: "18%" }} />
      </div>
    );
  }
  if (variant === "app") {
    return (
      <div className="svp-mock svp-mock--app">
        <span className="svp-block svp-block--ghost svp-block--tall" />
        <span className="svp-phone">
          <span className="svp-phone-bar" />
        </span>
        <span className="svp-block svp-block--ghost svp-block--tall" />
      </div>
    );
  }
  return (
    <div className="svp-mock svp-mock--chart">
      {[0.3, 0.55, 0.4, 1, 0.5].map((h, i) => (
        <span
          key={i}
          className={`svp-bar ${i === 3 ? "svp-bar--accent" : ""}`}
          style={{ height: `${h * 100}%` }}
        />
      ))}
    </div>
  );
}

export default function ServiceProcess({
  pillars,
}: {
  pillars: { title: string; copy: string; image?: string }[];
}) {
  return (
    <section className="svp-section">
      <div className="mx-auto max-w-7xl px-6 svp-grid">
        <div className="svp-sticky">
          <Reveal>
            <span className="svp-eyebrow">Process</span>
            <h2 className="svp-heading">
              Combine Creativity
              <br />
              With Strategy
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="svp-sub">Every step designed to deliver clarity, impact, and results.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="/contact" className="btn-grad svp-cta">
              Start a Project
            </a>
          </Reveal>
        </div>

        <div className="svp-steps">
          {pillars.map((p, i) => (
            <Reveal key={p.title} y={24} delay={i * 0.05}>
              <div className="svp-card">
                {p.image ? (
                  <div className="svp-mock svp-mock--photo">
                    <img src={p.image} alt="" className="svp-mock-photo" />
                  </div>
                ) : (
                  <StepMock variant={MOCK_VARIANTS[i % MOCK_VARIANTS.length]} index={i} />
                )}
                <span className="svp-card-num">{`//${String(i + 1).padStart(2, "0")}`}</span>
                <h3 className="svp-card-title">{p.title}</h3>
                <p className="svp-card-copy">{p.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
