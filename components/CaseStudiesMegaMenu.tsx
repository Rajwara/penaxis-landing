"use client";

import { useState } from "react";
import { industries, services } from "@/lib/data";

// Ported mechanism from a reference mega menu (Moonday): a left-hand list
// of "directions," each with an icon/title/description and an active state
// with a soft border, driving a right-hand grid of items that swaps based
// on which direction is hovered — plus a bottom CTA row.
//
// Since there's no dedicated case-studies content yet (per the project
// handoff, /case-studies is a placeholder page), this uses Penaxis's real
// data to browse *by*: the 13 real industries, and every real capability
// (pillar) across the 4 real services — rather than inventing case-study
// categories (by region, company size, etc.) that don't reflect anything
// real yet. Every link goes to /case-studies for now.

const pillarsByService = services.flatMap((s) =>
  s.pillars.map((p) => ({ title: p.title, service: s.title }))
);

const DIRECTIONS = [
  {
    key: "industry" as const,
    title: "By Industry",
    desc: "Work grouped by the industries we've built for.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    key: "service" as const,
    title: "By Service",
    desc: "Work grouped by the capability we delivered.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
      </svg>
    ),
  },
];

export default function CaseStudiesMegaMenu() {
  const [active, setActive] = useState<"industry" | "service">("industry");

  const rightHeading = active === "industry" ? "Case studies by industry" : "Case studies by service";
  const rightItems =
    active === "industry"
      ? industries.map((i) => ({ label: i.title, sub: null as string | null }))
      : pillarsByService.map((p) => ({ label: p.title, sub: p.service }));

  const half = Math.ceil(rightItems.length / 2);
  const colA = rightItems.slice(0, half);
  const colB = rightItems.slice(half);

  return (
    <div className="w-full rounded-3xl bg-paper shadow-2xl border border-ink/5 overflow-hidden grid grid-cols-[260px_1fr]">
      {/* Directions */}
      <div className="bg-ink/[0.02] border-r border-ink/5 p-6">
        <span className="block text-[11px] font-semibold tracking-widest text-ink/40 uppercase mb-4">
          Directions
        </span>
        <div className="flex flex-col gap-1.5">
          {DIRECTIONS.map((d) => (
            <button
              key={d.key}
              type="button"
              onMouseEnter={() => setActive(d.key)}
              onFocus={() => setActive(d.key)}
              className={`text-left flex items-start gap-3 rounded-xl p-3 border transition-colors ${
                active === d.key ? "bg-white border-ink/10 shadow-sm" : "border-transparent hover:bg-white/60"
              }`}
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-violet-600/10 text-violet-700 shrink-0">
                <span className="w-4 h-4">{d.icon}</span>
              </span>
              <span>
                <span className="block font-display font-bold text-sm text-ink">{d.title}</span>
                <span className="block text-xs text-ink/50 mt-0.5 leading-snug">{d.desc}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="p-7 flex flex-col">
        <span className="block text-[11px] font-semibold tracking-widest text-violet-600 uppercase mb-4">
          {rightHeading}
        </span>

        <div className="grid grid-cols-2 gap-x-8 gap-y-2 flex-1">
          {[colA, colB].map((col, ci) => (
            <ul key={ci} className="space-y-2">
              {col.map((item) => (
                <li key={item.label}>
                  <a
                    href="/case-studies"
                    className="group flex items-center gap-2 text-sm text-ink/70 hover:text-violet-700 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-ink/20 group-hover:bg-violet-600 transition-colors shrink-0" />
                    {item.label}
                    {item.sub && <span className="text-xs text-ink/35">— {item.sub}</span>}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-ink/5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-ink">Don't see yours yet?</p>
            <p className="text-xs text-ink/50 mt-0.5">We're always adding new work — tell us what you're building.</p>
          </div>
          <a
            href="/contact"
            className="shrink-0 rounded-full bg-violet-600 text-white text-sm font-semibold px-5 py-2.5 hover:bg-violet-700 transition-colors"
          >
            Talk to us
          </a>
        </div>
      </div>
    </div>
  );
}
