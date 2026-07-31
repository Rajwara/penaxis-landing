"use client";

import LogoMarquee from "./LogoMarquee";

// Ported layout pattern from a personal-portfolio template reference
// (full-bleed portrait hero with dark overlay, "Hey, I'm X" intro line +
// big name/role heading, side tagline, numbered capability list, a
// trusted-by logo row, and a "behind the work" section with a 3-photo
// gallery). Not reused: the reference's own brand name, its specific
// persona ("Lilly, Interior Designer"), or its stock photo of a real
// person — rebuilt entirely with Penaxis's own real content and photos.

const CAPABILITIES = [
  { num: "#01", label: "AI-Powered MVP Development" },
  { num: "#02", label: "Digital Transformation" },
  { num: "#03", label: "Fractional Sales & Growth" },
  { num: "#04", label: "Web, CRM & Software Solutions" },
];

export default function PortfolioDemo() {
  return (
    <div className="pfd-root">
      <section className="pfd-hero">
        <img src="/images/hero/office-logo-desk.jpg" alt="" className="pfd-hero-img" />
        <div className="pfd-hero-overlay" aria-hidden="true" />

        <div className="pfd-hero-content">
          <p className="pfd-eyebrow">Hey, we&apos;re Penaxis,</p>
          <h1 className="pfd-heading">
            Growth &amp;
            <br />
            Technology Partner
          </h1>

          <div className="pfd-tagline">
            <p className="pfd-tagline-lead">Great execution should feel effortless.</p>
            <p className="pfd-tagline-sub">
              From strategy to shipped product, we build systems that connect and convert.
            </p>
          </div>

          <div className="pfd-caps">
            {CAPABILITIES.map((c) => (
              <div key={c.num} className="pfd-cap">
                <span className="pfd-cap-num">{c.num}</span>
                <span className="pfd-cap-label">{c.label}</span>
              </div>
            ))}
            <a href="/contact" className="pfd-badge">
              Start a Project
            </a>
          </div>
        </div>
      </section>

      <section className="pfd-trusted">
        <p className="pfd-trusted-label">
          Trusted by teams
          <br />
          we&apos;ve helped grow
        </p>
        <div className="pfd-trusted-marquee">
          <LogoMarquee />
        </div>
      </section>

      <section className="pfd-behind">
        <div className="pfd-behind-left">
          <p className="pfd-eyebrow pfd-eyebrow--dark">Behind the Work</p>
          <h2 className="pfd-behind-heading">Shaping Solutions That Move Business Forward</h2>
        </div>
        <div className="pfd-behind-right">
          <p className="pfd-behind-copy">
            We&apos;re a growth and technology team focused on building clear, functional systems
            that solve real business problems — not just ones that look good in a pitch deck.
          </p>
          <div className="pfd-behind-cta-row">
            <p className="pfd-behind-cta-label">
              Let&apos;s Build Something
              <br />
              Meaningful Together
            </p>
            <a href="/contact" className="pfd-cta-pill">
              Get in touch
              <span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="pfd-gallery">
        <img src="/images/hero/team-huddle.jpg" alt="The Penaxis team" />
        <img src="/images/hero/office-logo-desk.jpg" alt="Inside the Penaxis studio" />
        <img src="/images/team/laiba-zafar.webp" alt="Penaxis team member" />
      </section>
    </div>
  );
}
