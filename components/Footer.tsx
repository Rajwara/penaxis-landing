"use client";

import Reveal from "./Reveal";
import { contact } from "@/lib/data";

// Footer layout matching a purchased template's structure (confirmed
// owned by the user): a full-bleed giant background wordmark with a
// centered gradient email pill overlapping it, five link columns
// (eyebrow + big title), a four-column social row with dividers, and
// a bottom bar with address/copyright/phone/back-to-top. Colors are
// Penaxis's own violet/volt instead of the reference's blue-teal
// gradient; link destinations are real site pages. Facebook,
// Instagram, and YouTube URLs below are best-guess placeholders
// (facebook.com/penaxis, etc.) pending the real account links —
// only LinkedIn is a confirmed real account.

const LINK_COLUMNS = [
  { eyebrow: "What we do?", title: "Services", href: "/services" },
  { eyebrow: "Who we are?", title: "About Us", href: "/about" },
  { eyebrow: "How we deliver", title: "Contact Us", href: "/contact" },
  { eyebrow: "What we're good at?", title: "Case Studies", href: "/case-studies" },
  { eyebrow: "Where we work", title: "Industries", href: "/industries" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com/penaxis",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/penaxis",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: `https://linkedin.com${contact.linkedin}`,
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@penaxis",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
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
      {/* Giant full-bleed wordmark with the email pill centered over it */}
      <div className="relative min-h-[18rem] md:min-h-[24rem] py-20 flex items-center justify-center overflow-hidden">
        <span className="absolute inset-0 flex items-center justify-center font-display font-black text-[20vw] leading-none text-white/[0.05] whitespace-nowrap select-none pointer-events-none">
          PENAXIS
        </span>
        <a
          href={`mailto:${contact.email}`}
          className="btn-grad relative gap-4 px-10 py-6 font-display text-xl md:text-2xl"
        >
          <span className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m3 6 9 6 9-6" />
            </svg>
          </span>
          {contact.email}
        </a>
      </div>

      {/* Link columns */}
      <div className="relative max-w-7xl mx-auto px-6 pb-16 grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-4 text-center">
        {LINK_COLUMNS.map((col, i) => (
          <Reveal as="div" key={col.title} delay={i * 0.08} y={0} x={-30}>
            <div className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-white/40 mb-2">
              {col.eyebrow}
            </div>
            <a href={col.href} className="font-display font-bold text-2xl md:text-4xl hover:text-[#D6F23C] transition-colors">
              {col.title}
            </a>
          </Reveal>
        ))}
      </div>

      {/* Social row — 4 columns with dividers, matching the reference layout */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {SOCIALS.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between px-6 py-4 border-b md:border-b-0 border-white/10 hover:bg-white/[0.03] transition-colors ${
                i < SOCIALS.length - 1 ? "md:border-r" : ""
              }`}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase">
                <span className="w-6 h-6 rounded-full bg-white text-ink flex items-center justify-center">
                  {s.icon}
                </span>
                {s.label}
              </span>
              <ArrowIcon />
            </a>
          ))}
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
