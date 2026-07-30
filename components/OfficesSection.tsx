"use client";

import Reveal from "./Reveal";
import { offices } from "@/lib/data";

// Ported from a reference "style swatch" card design (concentric decorative
// rings top-right, icon badge, title/description, dot row + "OPEN" link
// bottom) and repurposed to show our three registered office locations.

const ICONS: Record<string, JSX.Element> = {
  violet: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  ),
  ember: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  ),
  ink: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  ),
};

export default function OfficesSection() {
  return (
    <section className="ofc-section">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal as="p" className="eyebrow text-violet-600 mb-3 text-center">
          Where we work from
        </Reveal>
        <Reveal>
          <h2 className="ofc-heading">Three countries, one team</h2>
        </Reveal>

        <div className="ofc-grid">
          {offices.map((office, i) => {
            const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(office.address)}`;
            return (
              <Reveal key={office.country} y={30} delay={i * 0.08} className="h-full">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ofc-card ofc-card--${office.theme} h-full`}
                >
                  <div className="ofc-rings" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="ofc-icon">{ICONS[office.theme]}</div>

                  <div className="ofc-body">
                    <h3>
                      {office.city}
                      <span className="ofc-country">{office.country}</span>
                    </h3>
                    <p>{office.blurb}</p>
                  </div>

                  <div className="ofc-footer">
                    <div className="ofc-dots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="ofc-open">
                      View map
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
