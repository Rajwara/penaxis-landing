"use client";

import Reveal from "./Reveal";

// Ported from a reference "bento grid" hero: a large dark card (eyebrow +
// heading + product image + pill CTA) beside a stack of three smaller
// cards (a gray feature card with decorative spheres, and two
// color-blocked link cards). The reference's own nav row is dropped since
// the site already has its own global Navbar. Content adapted to
// Penaxis: no physical product, so the black card links to starting a
// project instead of a shop, and the smaller cards link to real pages
// (case studies, services, contact) instead of a blog/history/generic
// contact trio.

export default function AboutV2Bento() {
  return (
    <section className="avbt-section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="avbt-grid">
          {/* Large card — now white/light instead of dark, since the section itself is dark */}
          <Reveal className="avbt-black">
            <span className="avbt-eyebrow">More About Us</span>
            <h2 className="avbt-heading">
              There&apos;s more to
              <br />
              how we build
            </h2>
            <img
              src="/images/hero/team-celebration.webp"
              alt="The Penaxis team celebrating"
              className="avbt-black-photo"
            />
            <a href="/contact" className="avbt-pill">
              <span className="avbt-pill-label">Start</span>
              <span className="avbt-pill-main">A Project</span>
              <span className="avbt-pill-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </Reveal>

          {/* Gray card with decorative spheres */}
          <Reveal delay={0.05} className="avbt-gray">
            <div className="avbt-card-top">
              <span className="avbt-eyebrow">Real Projects, Real Impact</span>
              <a href="/case-studies" className="avbt-corner-arrow" aria-label="See our work">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <div className="avbt-spheres" aria-hidden="true">
              <span className="avbt-sphere avbt-sphere--dot" />
              <span className="avbt-sphere avbt-sphere--big" />
              <span className="avbt-sphere avbt-sphere--big2" />
            </div>
            <a href="/case-studies" className="avbt-card-title">
              See Our Work
            </a>
          </Reveal>

          <div className="avbt-bottom-pair">
            {/* Violet card */}
            <Reveal delay={0.1} className="avbt-violet">
              <div className="avbt-card-top">
                <span className="avbt-eyebrow avbt-eyebrow--light">What We Do</span>
                <a href="/services/ai-mvp" className="avbt-corner-arrow avbt-corner-arrow--light" aria-label="Our services">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
              <a href="/services/ai-mvp" className="avbt-card-title avbt-card-title--light">
                Our Services
              </a>
            </Reveal>

            {/* Volt card */}
            <Reveal delay={0.15} className="avbt-volt">
              <div className="avbt-card-top">
                <span className="avbt-eyebrow">Have Some Questions?</span>
                <a href="/contact" className="avbt-corner-arrow" aria-label="Contact us">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
              <a href="/contact" className="avbt-card-title">
                Contact Us
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
