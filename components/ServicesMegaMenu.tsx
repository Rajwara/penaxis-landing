"use client";

import { services } from "@/lib/data";

// Ported mechanism from a reference product/services mega menu (a row of
// icon+title+description items with one highlighted card, plus a side card
// with an image and supporting links) — restyled with Penaxis's own 4 real
// services and brand palette instead of the reference's product lineup.
// Side card uses the real Penaxis team group photo.

const ICONS: Record<string, JSX.Element> = {
  "ai-mvp": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2a5 5 0 0 0-5 5c0 1.8.9 3 1.5 4.2C9 12.6 9 13 9 14v2h6v-2c0-1 0-1.4.5-2.8.6-1.2 1.5-2.4 1.5-4.2a5 5 0 0 0-5-5z" />
      <path d="M9 19h6M10 22h4" />
    </svg>
  ),
  "digital-transformation": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v5h-5" />
    </svg>
  ),
  "sales-growth": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 17l6-6 4 4 8-8M21 7v6" />
    </svg>
  ),
  "web-crm-software": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18M8 21h8" />
    </svg>
  ),
};

const HIGHLIGHT_SLUG = "ai-mvp";
const TEAM_PHOTO = "/images/hero/team-group.webp";

export default function ServicesMegaMenu() {
  return (
    <div className="w-full min-h-[26rem] rounded-3xl bg-paper shadow-2xl border border-ink/5 overflow-hidden grid grid-cols-[1fr_240px] xl:grid-cols-[1fr_280px]">
      {/* Main area */}
      <div className="p-8 xl:p-9 flex flex-col">
        <h4 className="font-display font-bold text-lg text-ink mb-1">Services</h4>
        <p className="text-sm text-ink/50 mb-8 max-w-md">
          Automate and manage the full journey — from first build to ongoing growth.
        </p>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 flex-1">
          {services.map((s) => {
            const isHighlight = s.slug === HIGHLIGHT_SLUG;
            return (
              <a
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`group relative rounded-2xl p-5 transition-colors flex flex-col ${
                  isHighlight ? "bg-violet-600 text-white" : "hover:bg-ink/[0.04]"
                }`}
              >
                {isHighlight && (
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="absolute top-4 right-4 opacity-70"
                  >
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                )}
                <span
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-4 ${
                    isHighlight ? "bg-white/15" : "bg-ink/[0.06] text-ink"
                  }`}
                >
                  <span className="w-4 h-4">{ICONS[s.slug]}</span>
                </span>
                <h5 className={`font-display font-bold text-sm mb-2 ${isHighlight ? "text-white" : "text-ink"}`}>
                  {s.title}
                </h5>
                <p className={`text-xs leading-relaxed ${isHighlight ? "text-white/75" : "text-ink/50"}`}>
                  {s.short.length > 100 ? s.short.slice(0, 100).trimEnd() + "…" : s.short}
                </p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Side card */}
      <div className="bg-haze p-6 flex flex-col">
        <a
          href="/game-changers"
          className="block rounded-xl overflow-hidden h-60 mb-5 relative bg-gradient-to-br from-violet-200 to-volt/40"
        >
          <img src={TEAM_PHOTO} alt="The Penaxis team" className="w-full h-full object-cover object-top" />
        </a>
        <h5 className="font-display font-bold text-sm text-ink mb-2">Our team</h5>
        <a href="/game-changers" className="text-sm text-ink/55 hover:text-violet-700 transition-colors mb-2.5">
          Meet the people behind the work
        </a>
        <a
          href="/contact"
          className="btn-grad mt-auto text-sm px-5 py-3"
        >
          Start a project
        </a>
      </div>
    </div>
  );
}
