"use client";

// Ported UI pattern: a bold, high-contrast ticker strip with words
// separated by star dividers, scrolling continuously — a common
// "skills/services ticker" marquee technique. Recolored to Penaxis
// violet instead of the reference's lime green, with Penaxis's own
// service-related words instead of the reference's copy.

const WORDS = [
  { text: "Strategy" },
  { text: "Design", underline: true },
  { text: "Development" },
  { text: "Marketing", underline: true },
  { text: "AI & Automation" },
  { text: "Growth", underline: true },
];

export default function ServiceTicker() {
  const track = [...WORDS, ...WORDS, ...WORDS];

  return (
    <div className="svt-viewport">
      <div className="svt-track">
        {track.map((w, i) => (
          <span key={i} className="svt-item">
            <span className={w.underline ? "svt-underline" : ""}>{w.text}</span>
            <svg className="svt-star" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M12 2l1.2 6.5L18 3l-3 6.5L21 8l-6.5 1.2L21 12l-6.5 1.2L21 16l-6 -1.5L18 21l-4.8-5.5L12 22l-1.2-6.5L6 21l3-6.5L3 16l6.5-1.2L3 12l6.5-1.2L3 8l6.5 3.5L6 3l4.8 5.5z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
