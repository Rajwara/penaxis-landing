"use client";

import Reveal from "./Reveal";
import { contact } from "@/lib/data";

// Rebuilt footer layout matching a purchased template's structure
// (confirmed owned by the user): giant background wordmark, a
// centered gradient email pill, five link columns (eyebrow + big
// title), a social row, and a bottom bar with address/copyright/
// phone/back-to-top. Colors are Penaxis's own violet/volt instead of
// the template's blue-teal gradient; only real destinations and real
// confirmed social accounts are linked — no fabricated "News" page or
// social handles we don't actually have.

const LINK_COLUMNS = [
  { eyebrow: "What we do?", title: "Services", href: "/services" },
  { eyebrow: "Who we are?", title: "About Us", href: "/about" },
  { eyebrow: "How we deliver", title: "Contact Us", href: "/contact" },
  { eyebrow: "What we're good at?", title: "Case Studies", href: "/case-studies" },
  { eyebrow: "Where we work", title: "Industries", href: "/industries" },
];

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer data-nav-theme="dark" className="relative bg-ink text-white overflow-hidden">
      {/* Giant background wordmark */}
      <div className="absolute inset-x-0 top-0 flex justify-center pt-2 pointer-events-none select-none overflow-hidden">
        <span className="font-display font-black text-[16vw] leading-none text-white/[0.04] whitespace-nowrap">
          PENAXIS
        </span>
      </div>

      {/* Email pill */}
      <div className="relative flex justify-center pt-24 pb-16 px-6">
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-display font-semibold text-lg text-ink bg-gradient-to-r from-violet-500 to-[#D6F23C] hover:brightness-105 transition"
        >
          <span className="w-7 h-7 rounded-full bg-white/70 flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m3 6 9 6 9-6" />
            </svg>
          </span>
          {contact.email}
        </a>
      </div>

      {/* Link columns */}
      <div className="relative max-w-7xl mx-auto px-6 pb-14 grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-4 text-center">
        {LINK_COLUMNS.map((col, i) => (
          <Reveal as="div" key={col.title} delay={i * 0.08} y={0} x={-30}>
            <div className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-white/40 mb-2">
              {col.eyebrow}
            </div>
            <a href={col.href} className="font-display font-bold text-2xl md:text-3xl hover:text-[#D6F23C] transition-colors">
              {col.title}
            </a>
          </Reveal>
        ))}
      </div>

      {/* Social row — only real, confirmed accounts */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-4">
          <a
            href={`https://linkedin.com${contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-6 py-4 border-b sm:border-b-0 sm:border-r border-white/10 hover:bg-white/[0.03] transition-colors"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase">
              <span className="w-6 h-6 rounded-full bg-white text-ink flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
              </span>
              LinkedIn
            </span>
            <ArrowIcon />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <span className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D6F23C" strokeWidth="2">
              <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {contact.address}
          </span>
          <span>© {new Date().getFullYear()} Penaxis. All rights reserved.</span>
          <span className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D6F23C" strokeWidth="2">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2z" />
              </svg>
              {contact.phone}
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-8 h-8 rounded-lg bg-[#D6F23C] text-ink flex items-center justify-center hover:brightness-95 transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
}
