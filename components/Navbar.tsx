"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { navLeft, navRight, navCta, navMobile, services, caseStudies, industries, slugify } from "@/lib/data";
import IndustriesMegaMenu from "./IndustriesMegaMenu";
import ServicesMegaMenu from "./ServicesMegaMenu";
import CaseStudiesMegaMenu from "./CaseStudiesMegaMenu";

const LOGO_FULL_LIGHT = "/images/logo/penaxis-logo-purple.png"; // light nav surface
const LOGO_FULL_DARK = "/images/logo/penaxis-logo-white.png"; // dark nav surface
const LOGO_MARK = "/images/logo/penaxis-mark.png"; // compact/scrolled state

const DARK_SECTION_SELECTOR = "[data-nav-theme='dark']";
const SCROLL_COLLAPSE_THRESHOLD = 140;
const NAV_REFERENCE_Y = 46; // approx vertical centre of the floating nav

function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex items-center justify-center rounded-full bg-paper shrink-0"
      style={{ width: size + 12, height: size + 12 }}
    >
      <Image
        src={LOGO_MARK}
        alt="Penaxis"
        width={size}
        height={size}
        style={{ width: size, height: "auto" }}
        priority
      />
    </span>
  );
}

const MOBILE_SUBMENUS: Record<string, { items: { label: string; href: string }[] }> = {
  Services: {
    items: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  },
  Industries: {
    items: industries.map((ind) => ({ label: ind.title, href: `/industries#${slugify(ind.title)}` })),
  },
  "Case Studies": {
    items: caseStudies.map((c) => ({ label: c.title, href: `/case-studies/${c.slug}` })),
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] = useState<"industries" | "services" | "caseStudies" | "about" | null>(null);
  const menuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (name: "industries" | "services" | "caseStudies" | "about") => {
    if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current);
    setActiveMenu(name);
  };
  const scheduleCloseMenu = () => {
    menuCloseTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };
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
    if (!mobileOpen) setMobileAccordion(null);
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollToTop = () => {
    if (pathname !== "/") {
      router.push("/");
      return;
    }
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
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-4 md:pt-5 hidden lg:flex items-center justify-between">
          {/* LEFT CAPSULE */}
          <nav
            aria-label="Primary"
            className={`relative pointer-events-auto flex items-center gap-1 rounded-full border backdrop-blur-md px-2 py-2 transition-colors duration-500 ${capsuleSurface}`}
          >
            {navLeft.map((item, i) =>
              item.href ? (
                <a
                  key={item.href + item.label}
                  href={item.href}
                  onMouseEnter={() => {
                    setHoverIdx(i);
                    if (item.label === "Industries") openMenu("industries");
                    else if (item.label === "Case Studies") openMenu("caseStudies");
                    else scheduleCloseMenu();
                  }}
                  onMouseLeave={() => {
                    setHoverIdx(null);
                    if (item.label === "Industries" || item.label === "Case Studies") {
                      scheduleCloseMenu();
                    }
                  }}
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
              ) : (
                <button
                  type="button"
                  key={item.label}
                  onMouseEnter={() => {
                    setHoverIdx(i);
                    if (item.label === "Services") openMenu("services");
                  }}
                  onMouseLeave={() => {
                    setHoverIdx(null);
                    if (item.label === "Services") scheduleCloseMenu();
                  }}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-default ${
                    hoverIdx === i
                      ? isDark
                        ? "bg-white/10"
                        : "bg-ink/[0.06]"
                      : ""
                  } ${isDark ? "hover:text-white" : "hover:text-violet-700"}`}
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          {/* Industries mega menu panel — spans the full nav row width */}
          <div
            onMouseEnter={() => openMenu("industries")}
            onMouseLeave={scheduleCloseMenu}
            className={`absolute left-4 right-4 md:left-6 md:right-6 top-full mt-3 transition-all duration-200 ${
              activeMenu === "industries" ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <IndustriesMegaMenu />
          </div>

          {/* Services mega menu panel */}
          <div
            onMouseEnter={() => openMenu("services")}
            onMouseLeave={scheduleCloseMenu}
            className={`absolute left-4 right-4 md:left-6 md:right-6 top-full mt-3 transition-all duration-200 ${
              activeMenu === "services" ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <ServicesMegaMenu />
          </div>

          {/* Case Studies mega menu panel */}
          <div
            onMouseEnter={() => openMenu("caseStudies")}
            onMouseLeave={scheduleCloseMenu}
            className={`absolute left-4 right-4 md:left-6 md:right-6 top-full mt-3 transition-all duration-200 ${
              activeMenu === "caseStudies" ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <CaseStudiesMegaMenu />
          </div>

          {/* CENTER CAPSULE — brand + scroll-progress */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Penaxis home"
            className={`pointer-events-auto relative flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 ease-out overflow-hidden ${capsuleSurface} ${
              scrolled ? "w-14 h-14" : "w-[168px] h-14"
            }`}
          >
            {/* Expanded: full logo lockup */}
            <span
              className={`absolute inset-0 flex items-center justify-center px-6 transition-opacity duration-300 ${
                scrolled ? "opacity-0" : "opacity-100"
              }`}
            >
              <Image
                src={isDark ? LOGO_FULL_DARK : LOGO_FULL_LIGHT}
                alt="Penaxis"
                width={140}
                height={40}
                style={{ height: 24, width: "auto" }}
                priority
              />
            </span>

            {/* Collapsed: mark + scroll-progress ring */}
            <span
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                scrolled ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="relative flex items-center justify-center w-12 h-14">
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
                    strokeWidth="2.5"
                    className={isDark ? "stroke-white/25" : "stroke-ink/15"}
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r={RING_R}
                    fill="none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    className={isDark ? "text-volt" : "text-violet-600"}
                    strokeDasharray={RING_C}
                    strokeDashoffset={ringOffset}
                    style={{ transition: "stroke-dashoffset 120ms linear" }}
                  />
                </svg>
                <LogoMark size={20} />
              </span>
            </span>
          </button>

          {/* RIGHT CAPSULE */}
          <div
            className={`pointer-events-auto flex items-center gap-1 rounded-full border backdrop-blur-md px-2 py-2 transition-colors duration-500 ${capsuleSurface}`}
          >
            {navRight.map((item, i) => (
              <div
                key={item.href + item.label}
                className="relative"
                onMouseEnter={() => {
                  setHoverIdx(100 + i);
                  if (item.children) openMenu("about");
                }}
                onMouseLeave={() => {
                  setHoverIdx(null);
                  if (item.children) scheduleCloseMenu();
                }}
              >
                <a
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    hoverIdx === 100 + i ? (isDark ? "bg-white/10" : "bg-ink/[0.06]") : ""
                  } ${isDark ? "hover:text-white" : "hover:text-violet-700"}`}
                >
                  {item.label}
                </a>

                {item.children && (
                  <div
                    className={`absolute right-0 top-full mt-2 transition-all duration-200 ${
                      activeMenu === "about"
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <ul className="nav-about-dropdown">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a href={child.href}>{child.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            <a
              href={navCta.href}
              className="btn-grad ml-1 px-5 py-2.5 text-sm"
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
            aria-label="Penaxis home"
            className={`flex items-center justify-center rounded-full border backdrop-blur-md w-12 h-12 transition-colors duration-500 ${capsuleSurface}`}
          >
            <span className="relative flex items-center justify-center w-7 h-7">
              {scrolled && (
                <svg viewBox="0 0 44 44" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
                  <circle cx="22" cy="22" r={RING_R} fill="none" strokeWidth="2.5" className={isDark ? "stroke-white/25" : "stroke-ink/15"} />
                  <circle
                    cx="22" cy="22" r={RING_R} fill="none" strokeWidth="2.5" strokeLinecap="round"
                    stroke="currentColor" className={isDark ? "text-volt" : "text-violet-600"}
                    strokeDasharray={RING_C} strokeDashoffset={ringOffset}
                    style={{ transition: "stroke-dashoffset 120ms linear" }}
                  />
                </svg>
              )}
              <LogoMark size={18} />
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
          <Image src={LOGO_FULL_DARK} alt="Penaxis" width={130} height={36} style={{ height: 26, width: "auto" }} />
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

        <nav aria-label="Mobile" className="flex flex-col gap-2 px-6 pt-16 overflow-y-auto max-h-[calc(100dvh-7rem)]">
          {navMobile.map((item, i) => {
            const submenu = MOBILE_SUBMENUS[item.label];
            const isOpen = mobileAccordion === item.label;

            if (!submenu) {
              return (
                <a
                  key={item.href + item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-4xl font-medium py-3 border-b border-white/10 transition-colors hover:text-volt"
                  style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <div
                key={item.href + item.label}
                className="border-b border-white/10"
                style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
              >
                <button
                  type="button"
                  onClick={() => setMobileAccordion(isOpen ? null : item.label)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-3 font-display text-4xl font-medium transition-colors hover:text-volt"
                >
                  {item.label}
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                  style={{ overflow: "hidden" }}
                >
                  <ul className="flex flex-col gap-1 pb-4 pl-1 min-h-0">
                    {submenu.items.map((sub) => (
                      <li key={sub.href}>
                        <a
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-base text-white/70 hover:text-volt transition-colors"
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          <a
            href={navCta.href}
            onClick={() => setMobileOpen(false)}
            className="btn-grad mt-8 text-base px-6 py-4"
          >
            {navCta.label}
          </a>
        </nav>
      </div>
    </>
  );
}
