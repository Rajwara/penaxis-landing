"use client";

import Reveal from "./Reveal";

// Ported from a shared "dimensional interface cards" UI pattern (3D tilt on
// hover via CSS perspective/transform-style, layered glass plane, concentric
// orbit circles, social row). Structure and animation mechanics kept as-is;
// recolored entirely to the Penaxis palette (violet / ember / volt / ink) and
// switched to the site's existing display/body fonts. Repurposed to show the
// office locations (Pakistan, Dubai) instead of the original generic
// shape-variant placeholder content.

const CARDS = [
  {
    theme: "violet",
    title: "Pakistan Office",
    text: "2nd floor, 3, DHA Block P Tip Block Rahbar, Lahore, Pakistan",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("2nd floor, 3, DHA Block P Tip Block Rahbar, Lahore, Pakistan"),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#fff" d="M12 2a7 7 0 0 0-7 7c0 5.25 6.14 11.6 6.4 11.86a.85.85 0 0 0 1.2 0C12.86 20.6 19 14.25 19 9a7 7 0 0 0-7-7zm0 9.75A2.75 2.75 0 1 1 12 6.25a2.75 2.75 0 0 1 0 5.5z" />
      </svg>
    ),
  },
  {
    theme: "ember",
    title: "Dubai Office",
    text: "Leaders Building - Office No. 1 - 409 Sheikh Zayed Rd - Al Qouz First - Al Quoz - Dubai - United Arab Emirates",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(
        "Leaders Building - Office No. 1 - 409 Sheikh Zayed Rd - Al Qouz First - Al Quoz - Dubai - United Arab Emirates"
      ),
    cut: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#fff" d="M12 2a7 7 0 0 0-7 7c0 5.25 6.14 11.6 6.4 11.86a.85.85 0 0 0 1.2 0C12.86 20.6 19 14.25 19 9a7 7 0 0 0-7-7zm0 9.75A2.75 2.75 0 1 1 12 6.25a2.75 2.75 0 0 1 0 5.5z" />
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
            Two countries, one team.
          </p>
        </Reveal>

        <div className="shape-grid">
          {CARDS.map((card, i) => (
            <Reveal as="div" key={card.title} delay={i * 0.06}>
              <div
                className={`ux-parent ux-parent--${card.theme} ${card.cut ? "ux-parent--cut" : ""}`}
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
                    <a
                      href={card.mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ux-more"
                      aria-label={`Open ${card.title} location in Google Maps`}
                    >
                      <span className="ux-more-btn">Open</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </a>
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
