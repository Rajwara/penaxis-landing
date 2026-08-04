"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";

// Ported from a shared "testimonial slider" pattern (Swiper-based in the
// original inspect HTML): a text panel synced to an image panel, arrows +
// fraction pagination on the left, a peeking image stack on the right.
// Re-implemented as a single hand-rolled carousel (matching the pattern
// already used by SpotlightDeck in this project) instead of pulling in the
// Swiper library. Client photos are real (Zohaib Khalid, Malih, Amar
// Jeet). Quotes/roles/companies are still placeholder copy — client has
// confirmed the photos are real but will supply the actual testimonial
// content (quote, role, company) separately later.

const TESTIMONIALS = [
  {
    quote:
      "We shipped our first copilot in 7 weeks and cut support tickets by 31%. The eval dashboards made every decision obvious.",
    name: "Zohaib Khalid",
    role: "Cantos SaaS's VP Product",
    image: "/images/team/zohaib-khalid.webp",
  },
  {
    quote:
      "SSO/SAML and RBAC landed smoothly. Latency stayed <300ms on p95 — huge win for our agents.",
    name: "Malih",
    role: "VectorPay's CTO",
    image: "/images/team/malih.webp",
  },
  {
    quote:
      "The best partner for agentic work. Multi-step planning, tool use, and audit trails — done right the first time.",
    name: "Amar Jeet",
    role: "Northway's Ecommerce Director",
    image: "/images/team/amar-jeet.webp",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const swipe = useRef({ active: false, startX: 0, pid: null as number | null });
  const n = TESTIMONIALS.length;

  const go = (delta: number) => setIdx((i) => (i + delta + n * 100) % n);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    swipe.current = { active: true, startX: e.clientX, pid: e.pointerId };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!swipe.current.active || e.pointerId !== swipe.current.pid) return;
    swipe.current.active = false;
    const dx = e.clientX - swipe.current.startX;
    if (Math.abs(dx) < 40) return;
    go(dx < 0 ? 1 : -1);
  };

  const active = TESTIMONIALS[idx];

  return (
    <section className="tm-section" aria-labelledby="tm-title">
      <div className="mx-auto max-w-7xl px-6">
        <div className="tm-grid">
          {/* Text panel */}
          <div className="tm-col-text">
            <Reveal as="div" className="mb-12">
              <span className="tm-badge">Testimonials</span>
              <h2 id="tm-title" className="tm-heading">
                What Our
                <br />
                Clients Say
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="tm-quote-wrap">
                <div className="tm-stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85z" />
                    </svg>
                  ))}
                </div>
                <p className="tm-desc">{active.quote}</p>
                <div className="tm-cite">
                  <span className="tm-cite-name">{active.name}</span>
                  <span className="tm-cite-divider" aria-hidden="true" />
                  <span className="tm-cite-role">{active.role}</span>
                </div>
              </div>
            </Reveal>

            <div className="tm-controls">
              <div className="tm-arrows">
                <button
                  type="button"
                  className="tm-arrow"
                  aria-label="Previous testimonial"
                  onClick={() => go(-1)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="tm-arrow tm-arrow--fill"
                  aria-label="Next testimonial"
                  onClick={() => go(1)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor" />
                  </svg>
                </button>
              </div>
              <div className="tm-fraction">
                <span className="tm-fraction-current">{idx + 1}</span> / {n}
              </div>
            </div>
          </div>

          {/* Image panel */}
          <div className="tm-col-image">
            <div
              className="tm-media-outer"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              <div
                className="tm-media-peek"
                style={{
                  backgroundImage: `url(${TESTIMONIALS[(idx + 1) % n].image})`,
                }}
                aria-hidden="true"
              />
              <div className="tm-media-main">
                {TESTIMONIALS.map((t, i) => (
                  <img
                    key={i}
                    src={t.image}
                    alt={t.name}
                    className={`tm-media-img${i === idx ? " is-active" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
