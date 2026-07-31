"use client";

import Reveal from "./Reveal";

// Ported from a shared "dimensional interface cards" UI pattern (3D tilt on
// hover via CSS perspective/transform-style, layered glass plane, concentric
// orbit circles, social row). Structure and animation mechanics kept as-is;
// recolored entirely to the Penaxis palette (violet / ember / volt / ink) and
// switched to the site's existing display/body fonts. Not wired into the
// page yet — placeholder content until we decide which section uses it.

const CARDS = [
  {
    theme: "violet",
    title: "Orb glass",
    text: "Soft pill body with stacked glass and concentric depth cues.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="5" fill="#fff" />
      </svg>
    ),
  },
  {
    theme: "ember",
    title: "Chamfer cut",
    text: "Precision corners via clip-path — reads sharp on light UI.",
    cut: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#fff" d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.2l5.5 3.4L12 10.9 6.5 7.6 12 4.2zM6 9.9l5 3v6.1l-5-3.1V9.9zm12 6.1l-5 3.1v-6.2l5-3v6.1z" />
      </svg>
    ),
  },
  {
    theme: "volt",
    title: "Neo surface",
    text: "High-contrast rim, hard shadow, and an electric accent rail.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" fill="none" stroke="#111" strokeWidth="2" />
      </svg>
    ),
  },
  {
    theme: "cinema",
    title: "Cinema wide",
    text: "Landscape canvas for metrics, testimonials, or dashboard hero tiles.",
    wide: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#fff" d="M8 5v14l11-7-11-7z" />
      </svg>
    ),
  },
  {
    theme: "prism",
    title: "Crystal facet",
    text: "Angular gradient break with a prismatic highlight pass.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#111" d="M12 2l9 16H3L12 2zm0 4.5L7.5 16h9L12 6.5z" />
      </svg>
    ),
  },
  {
    theme: "void",
    title: "Layered stack",
    text: "Three floating sheets with a subtle parallax on hover.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#fff" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
      </svg>
    ),
  },
];

function CardIcons() {
  const glyphs = [
    <svg key="a" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /></svg>,
    <svg key="b" viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2" /></svg>,
    <svg key="c" viewBox="0 0 24 24"><path d="M12 5l7 12H5z" /></svg>,
  ];
  return (
    <div className="ux-social">
      {glyphs.map((g, i) => (
        <button key={i} type="button" className="ux-social-btn" aria-label={`Action ${i + 1}`}>
          {g}
        </button>
      ))}
    </div>
  );
}

export default function ShapeGrid() {
  return (
    <section className="relative py-24 md:py-32 bg-paper" aria-labelledby="shape-grid-title">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal as="div" className="text-center mb-16 max-w-xl mx-auto">
          <h2 id="shape-grid-title" className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight">
            Where we work from
          </h2>
          <p className="mt-3 text-ink/60">
            Three countries, one team.
          </p>
        </Reveal>

        <div className="shape-grid">
          {CARDS.map((card, i) => (
            <Reveal as="div" key={card.title} delay={i * 0.06}>
              <div
                className={`ux-parent ux-parent--${card.theme} ${card.cut ? "ux-parent--cut" : ""} ${
                  card.wide ? "ux-parent--wide ux-parent--span-2" : ""
                }`}
              >
                <div className="ux-card">
                  <div className="ux-logo" aria-hidden="true">
                    <span className="ux-circle" />
                    <span className="ux-circle" />
                    <span className="ux-circle" />
                    <span className="ux-circle" />
                    <span className="ux-circle">{card.icon}</span>
                  </div>
                  <div className="ux-glass" />
                  <div className="ux-content">
                    <span className="ux-title">{card.title}</span>
                    <span className="ux-text">{card.text}</span>
                  </div>
                  <div className="ux-bottom">
                    <CardIcons />
                    <div className="ux-more">
                      <button type="button" className="ux-more-btn">
                        Open
                      </button>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
