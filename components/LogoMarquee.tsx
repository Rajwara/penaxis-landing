"use client";

// Continuous logo marquee, ported from the reference (soft striped
// background + a scrolling row of client marks). The reference logos were
// a mix of confirmed-real and unconfirmed companies (some large, named
// brands like Chase, Nissan, Mercedes-Benz) — since that wasn't resolved,
// this ships with neutral placeholder marks instead of any specific real
// company's trademark, so nothing implies an unconfirmed client
// relationship. Swap PLACEHOLDER_LOGOS for the real, confirmed logos
// whenever that list is settled.

const PLACEHOLDER_LOGOS = [
  "Partner One",
  "Partner Two",
  "Partner Three",
  "Partner Four",
  "Partner Five",
  "Partner Six",
  "Partner Seven",
  "Partner Eight",
];

function PlaceholderMark({ name, i }: { name: string; i: number }) {
  const shapes = [
    <circle key="c" cx="12" cy="12" r="8" />,
    <rect key="r" x="4" y="4" width="16" height="16" rx="4" />,
    <path key="t" d="M12 4l8 14H4z" />,
    <path key="d" d="M12 3l9 9-9 9-9-9z" />,
  ];
  return (
    <span className="lgm-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
        {shapes[i % shapes.length]}
      </svg>
      <span className="lgm-mark-label">{name}</span>
    </span>
  );
}

export default function LogoMarquee() {
  const track = [...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS];

  return (
    <section className="lgm-section">
      <div className="lgm-bg" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-6">
        <p className="lgm-heading">Trusted by teams around the world</p>
        <div className="lgm-viewport">
          <div className="lgm-track">
            {track.map((name, i) => (
              <PlaceholderMark key={i} name={name} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
