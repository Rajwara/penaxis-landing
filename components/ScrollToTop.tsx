"use client";

import { useEffect, useState } from "react";

// Fixed bottom-right button that appears once the visitor has scrolled
// past 30% of the scrollable page height, and smooth-scrolls back to top
// on click.

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [ccCleared, setCcCleared] = useState(false);

  useEffect(() => {
    try {
      setCcCleared(!!window.localStorage.getItem("penaxis_cookie_consent"));
    } catch {
      setCcCleared(false);
    }
    const onResolved = () => setCcCleared(true);
    window.addEventListener("penaxis-cookie-consent-resolved", onResolved);
    return () => window.removeEventListener("penaxis-cookie-consent-resolved", onResolved);
  }, []);

  useEffect(() => {
    let raf: number | null = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        setVisible(progress > 0.3);
        raf = null;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToTop = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`stt-btn ${visible ? "is-visible" : ""} ${ccCleared ? "cc-cleared" : ""}`}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
