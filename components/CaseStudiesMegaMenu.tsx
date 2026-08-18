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
    <div className="w-full min-h-[26rem] rounded-3xl bg-paper shadow-2xl border border-ink/5 overflow-hidden grid grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr]">
      {/* Directions */}
      <div className="bg-ink/[0.02] border-r border-ink/5 p-7 flex flex-col">
        <span className="block text-[11px] font-semibold tracking-widest text-ink/40 uppercase mb-4">
          Directions
        </span>
        <div className="flex flex-col gap-2">
          {DIRECTIONS.map((d) => {
            const count = d.key === "industry" ? industries.length : pillarsByService.length;
            const isActive = active === d.key;
            return (
              <button
                key={d.key}
                type="button"
                onMouseEnter={() => setActive(d.key)}
                onFocus={() => setActive(d.key)}
                className={`relative text-left flex items-start gap-3 rounded-xl p-3.5 border transition-colors ${
                  isActive ? "bg-white border-ink/10 shadow-sm" : "border-transparent hover:bg-white/60"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-3.5 bottom-3.5 w-[3px] rounded-full bg-violet-600" />
                )}
                <span
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0 transition-colors ${
                    isActive ? "bg-violet-600 text-white" : "bg-violet-600/10 text-violet-700"
                  }`}
                >
                  <span className="w-4 h-4">{d.icon}</span>
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm text-ink">{d.title}</span>
                    <span className="text-[10px] font-semibold text-ink/35 bg-ink/[0.06] rounded-full px-1.5 py-0.5">
                      {count}
                    </span>
                  </span>
                  <span className="block text-xs text-ink/50 mt-0.5 leading-snug">{d.desc}</span>
                </span>
              </button>
            );
          })}
        </div>

        <a
          href="/case-studies"
          className="mt-auto text-xs font-semibold text-violet-700 hover:text-violet-900 transition-colors inline-flex items-center gap-1"
        >
          View all case studies
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      {/* Results */}
      <div className="p-8 xl:p-9 flex flex-col">
        <span className="block text-[11px] font-semibold tracking-widest text-violet-600 uppercase mb-5">
          {rightHeading}
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-1 flex-1 max-h-[19rem] overflow-y-auto pr-2 content-start">
          {[colA, colB].map((col, ci) => (
            <ul key={ci} className="space-y-1">
              {col.map((item) => (
                <li key={item.label}>
                  <a
                    href="/case-studies"
                    className="group flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-sm text-ink/70 hover:bg-ink/[0.04] hover:text-violet-700 transition-colors"
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink/20 group-hover:bg-violet-600 transition-colors shrink-0" />
                      <span className="truncate">{item.label}</span>
                      {item.sub && <span className="text-xs text-ink/35 shrink-0">- {item.sub}</span>}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all shrink-0"
                    >
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-ink/5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-ink">Don't see yours yet?</p>
            <p className="text-xs text-ink/50 mt-0.5">We're always adding new work - tell us what you're building.</p>
          </div>
          <a
            href="/contact"
            className="btn-grad shrink-0 text-sm px-5 py-2.5"
          >
            Talk to us
          </a>
        </div>
      </div>
    </div>
  );
}
