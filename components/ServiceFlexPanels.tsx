"use client";

import { useState } from "react";
import { services } from "@/lib/data";
import StarfieldBackground from "./StarfieldBackground";

// Services section header unchanged. The listing below was previously a
// hover-flip panel row (ported from a reference "flex slide" design);
// replaced with a click-to-expand accordion list (ported from a client-
// supplied reference mockup) restyled with Penaxis's brand palette,
// fonts, and real service content (short description + tech stack as
// tags) instead of the reference's generic placeholder copy.

export default function ServiceFlexPanels() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="fp-section">
      <StarfieldBackground />
      <div className="fp-vignette" aria-hidden="true" />
      <div className="fp-header">
        <div className="fp-header-left">
          <span className="fp-eyebrow">Our Services</span>
          <h2 className="fp-heading">
            Explore ways we can move your
            <br />
            business <span className="fp-underline">forward</span>
          </h2>
        </div>
        <div className="fp-header-right">
          <p className="fp-header-copy">
            From AI-powered MVPs to fractional sales support - everything you
            need under one team.
          </p>
          <a href="/contact-us" className="fp-cta">
            <span>Start a Project</span>
            <span className="fp-cta-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <ul className="svc-acc-list">
        {services.map((s, i) => {
          const isOpen = openIndex === i;
          return (
            <li key={s.slug} className={`svc-acc-item ${isOpen ? "is-open" : ""}`}>
              <button
                type="button"
                className="svc-acc-toggle"
                aria-expanded={isOpen}
                aria-controls={`svc-acc-panel-${s.slug}`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span className="svc-acc-row">
                  <span className="svc-acc-num">{s.number}</span>
                  <span className="svc-acc-name">{s.title}</span>
                  <span className="svc-acc-icon" aria-hidden="true">
                    <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M11 3v16M3 11h16" />
                    </svg>
                  </span>
                </span>
              </button>
              <div className="svc-acc-panel" id={`svc-acc-panel-${s.slug}`} role="region">
                <div className="svc-acc-panel-inner">
                  <div className="svc-acc-body">
                    <span />
                    <div className="svc-acc-content">
                      <p>{s.short}</p>
                      <ul className="svc-acc-tags">
                        {s.stack.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      <a href={`/services/${s.slug}`} className="svc-acc-learn">
                        Learn more
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
