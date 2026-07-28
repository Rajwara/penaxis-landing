"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { navLeft, navRight, navCta, navMobile } from "@/lib/data";

const DARK_SECTION_SELECTOR = "[data-nav-theme='dark']";
const SCROLL_COLLAPSE_THRESHOLD = 140;
const NAV_REFERENCE_Y = 46; // approx vertical centre of the floating nav

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <span className="font-display font-bold leading-none">x</span>
      <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-ember-500" />
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const measure = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > SCROLL_COLLAPSE_THRESHOLD);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(docHeight > 0 ? Math.min(100, Math.max(0, (y / docHeight) * 100)) : 0);

    const darkSections = document.querySelectorAll(DARK_SECTION_SELECTOR);
    let onDark = false;
    darkSections.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= NAV_REFERENCE_Y && rect.bottom >= NAV_REFERENCE_Y) onDark = true;
    });
    setTheme(onDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    measure();
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        measure();
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [measure]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollToTop = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isDark = theme === "dark";
  const capsuleSurface = isDark
    ? "bg-ink/70 border-white/10 text-paper"
    : "bg-paper/80 border-ink/10 text-ink";

  const RING_R = 19;
  const RING_C = 2 * Math.PI * RING_R;
  const ringOffset = RING_C - (progress / 100) * RING_C;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="mx-auto max-w-7xl px-4 md:px-6 pt-4 md:pt-5 hidden lg:flex items-center justify-between">
          {/* LEFT CAPSULE */}
          <nav
            aria-label="Primary"
            className={`pointer-events-auto flex items-center gap-1 rounded-full border backdrop-blur-md px-2 py-2 transition-colors duration-500 ${capsuleSurface}`}
          >
            {navLeft.map((item, i) => (
              <a
                key={item.href + item.label}
                href={item.href}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  hoverIdx === i
                    ? isDark
                      ? "bg-white/10"
                      : "bg-ink/[0.06]"
                    : ""
                } ${isDark ? "hover:text-white" : "hover:text-violet-700"}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CENTER CAPSULE — brand + scroll-progress */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`pointer-events-auto group flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 ease-out overflow-hidden ${capsuleSurface} ${
              scrolled ? "w-14 h-14 px-0" : "w-auto h-14 px-6"
            }`}
          >
            <span className="relative flex items-center justify-center shrink-0 w-8 h-8">
              {scrolled && (
                <svg
                  viewBox="0 0 44 44"
                  className="absolute inset-0 w-full h-full -rotate-90"
                  aria-hidden="true"
                >
                  <circle
                    cx="22"
                    cy="22"
                    r={RING_R}
                    fill="none"
                    strokeWidth="1.5"
                    className={isDark ? "stroke-white/15" : "stroke-ink/10"}
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r={RING_R}
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    className={isDark ? "text-volt" : "text-violet-600"}
                    strokeDasharray={RING_C}
                    strokeDashoffset={ringOffset}
                    style={{ transition: "stroke-dashoffset 120ms linear" }}
                  />
                </svg>
              )}
              <LogoMark className="text-xl relative z-10" />
            </span>
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-out ${
                scrolled ? "max-w-0 opacity-0 ml-0" : "max-w-[140px] opacity-100 ml-2"
              }`}
            >
              <span className="font-display font-semibold text-base tracking-tight">
                enaxis
              </span>
            </span>
          </button>

          {/* RIGHT CAPSULE */}
          <div
            className={`pointer-events-auto flex items-center gap-1 rounded-full border backdrop-blur-md px-2 py-2 transition-colors duration-500 ${capsuleSurface}`}
          >
            {navRight.map((item, i) => (
              <a
                key={item.href + item.label}
                href={item.href}
                onMouseEnter={() => setHoverIdx(100 + i)}
                onMouseLeave={() => setHoverIdx(null)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  hoverIdx === 100 + i ? (isDark ? "bg-white/10" : "bg-ink/[0.06]") : ""
                } ${isDark ? "hover:text-white" : "hover:text-violet-700"}`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={navCta.href}
              className={`ml-1 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                isDark
                  ? "bg-volt text-ink hover:bg-white"
                  : "bg-violet-600 text-white hover:bg-violet-700"
              }`}
            >
              {navCta.label}
            </a>
          </div>
        </div>

        {/* MOBILE BAR */}
        <div className="lg:hidden pointer-events-auto flex items-center justify-between px-4 pt-4">
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`flex items-center justify-center rounded-full border backdrop-blur-md w-12 h-12 transition-colors duration-500 ${capsuleSurface}`}
          >
            <span className="relative flex items-center justify-center w-7 h-7">
              {scrolled && (
                <svg viewBox="0 0 44 44" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
                  <circle cx="22" cy="22" r={RING_R} fill="none" strokeWidth="1.5" className={isDark ? "stroke-white/15" : "stroke-ink/10"} />
                  <circle
                    cx="22" cy="22" r={RING_R} fill="none" strokeWidth="1.5" strokeLinecap="round"
                    stroke="currentColor" className={isDark ? "text-volt" : "text-violet-600"}
                    strokeDasharray={RING_C} strokeDashoffset={ringOffset}
                    style={{ transition: "stroke-dashoffset 120ms linear" }}
                  />
                </svg>
              )}
              <LogoMark className="text-lg" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className={`flex items-center justify-center rounded-full border backdrop-blur-md w-12 h-12 transition-colors duration-500 ${capsuleSurface}`}
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block w-5 h-[1.5px] bg-current" />
              <span className="block w-5 h-[1.5px] bg-current" />
            </span>
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      <div
        className={`fixed inset-0 z-[60] bg-ink text-paper transition-opacity duration-400 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <LogoMark className="text-xl" />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center rounded-full border border-white/15 w-12 h-12"
          >
            <span className="relative w-5 h-5 block">
              <span className="absolute inset-0 block w-5 h-[1.5px] bg-current rotate-45 top-1/2 -translate-y-1/2" />
              <span className="absolute inset-0 block w-5 h-[1.5px] bg-current -rotate-45 top-1/2 -translate-y-1/2" />
            </span>
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-col gap-2 px-6 pt-16">
          {navMobile.map((item, i) => (
            <a
              key={item.href + item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-4xl font-medium py-3 border-b border-white/10 transition-colors hover:text-volt"
              style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={navCta.href}
            onClick={() => setMobileOpen(false)}
            className="mt-8 text-center rounded-full bg-volt text-ink text-base font-semibold px-6 py-4"
          >
            {navCta.label}
          </a>
        </nav>
      </div>
    </>
  );
}
