"use client";

import Reveal from "./Reveal";
import { stats } from "@/lib/data";

// Ported from a reference "core belief" section: pill + big heading up
// top, then a split panel below (intro text + icon/number/label stat rows
// on one side, a photo with a dotted overlay and checkerboard corner
// accent on the other). Client asked for the whole section in a dark
// color scheme instead of the reference's light-top/dark-bottom split.
// Uses Penaxis's real stats (already used elsewhere on the site) instead
// of the reference's specific unverified numbers (300% ROI, 4.9/5 rating).

const FEATURED_STATS = [
  { ...stats[1], icon: "wave" }, // 50+ websites/platforms/CRMs
  { ...stats[3], icon: "check" }, // 100% on schedule
  { ...stats[4], icon: "star" }, // 80% retained/renewed
];

const ICONS: Record<string, JSX.Element> = {
  wave: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 15l4-6 4 8 4-10 3 6 3-4" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
    </svg>
  ),
};

export default function AboutV2Beliefs() {
  return (
    <section className="avb-section">
      <div className="avb-top">
        <Reveal>
          <span className="avb-pill">
            <span className="avb-pill-dot" />
            About Us
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="avb-heading">
            At our core, we believe good technology is more than code, it&apos;s
            partnership
          </h2>
        </Reveal>
      </div>

      <div className="avb-split">
        <div className="avb-left">
          <Reveal>
            <p className="avb-intro">
              Our results speak for themselves. Each number reflects the trust we&apos;ve
              built.
            </p>
          </Reveal>

          <div className="avb-stats">
            {FEATURED_STATS.map((s, i) => (
              <Reveal key={s.label} y={16} delay={0.05 + i * 0.06}>
                <div className="avb-stat">
                  <span className="avb-stat-icon">{ICONS[s.icon]}</span>
                  <div>
                    <p className="avb-stat-value">
                      {s.prefix}
                      {s.value}
                      {s.suffix}
                    </p>
                    <p className="avb-stat-label">{s.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="avb-right">
          <img src="/images/hero/office-logo-desk.jpg" alt="Penaxis at work" className="avb-photo" />
          <div className="avb-dots" aria-hidden="true" />
          <div className="avb-checker" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
