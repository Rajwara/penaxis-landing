"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Trigger positions are calculated once on mount. If page height shifts
  // afterward (web fonts finishing load, images loading, or other sections
  // being added), those positions go stale and reveals can fire at the
  // wrong scroll point. Refresh once everything has actually settled.
  window.addEventListener("load", () => ScrollTrigger.refresh());
  if ((document as any).fonts?.ready) {
    (document as any).fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  duration = 0.9,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  className?: string;
  as?: any;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y, x, scale },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [delay, y, x, scale, duration]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
