"use client";

import Reveal from "./Reveal";
import { stats } from "@/lib/data";

// Ported from a reference "who we are" banner: pill badge, two-line accent
// heading, large rounded photo, and a stat row underneath. Uses Penaxis's
// own real stats (already used elsewhere on the site) instead of inventing
// numbers. Image is a placeholder — client will swap in real photos shortly.

const FEATURED_STATS = [stats[1], stats[2], stats[3], stats[0]];

export default function AboutV2Banner() {
  return (
    <section className="av2-banner">
      <div className="mx-auto max-w-6xl px-6 pt-32 md:pt-40 pb-16">
        <Reveal>
          <span className="av2-pill">Who We Are</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="av2-heading">
            A Trusted Partner Committed to Your{" "}
            <span className="text-violet-600">Digital Growth</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1} className="av2-image-wrap">
          <div className="av2-image">
            <img src="/images/hero/office-logo-desk.jpg" alt="The Penaxis office" />
          </div>
        </Reveal>

        <div className="av2-stats">
          {FEATURED_STATS.map((s) => (
            <Reveal key={s.label} y={16}>
              <div className="av2-stat">
                <p className="av2-stat-value">
                  {s.prefix}
                  {s.value}
                  <span className="text-violet-600">{s.suffix}</span>
                </p>
                <p className="av2-stat-label">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
