"use client";

import { useEffect, useRef, useState } from "react";

// Signature moment #2: a poster-scale headline that "melts" into a
// warping, color-cycling material on hover — an SVG displacement
// filter (vanilla JS driving feTurbulence / feDisplacementMap each
// frame) instead of a literal photo texture, so it stays true to the
// brand's own violet/orange/volt palette rather than borrowing someone
// else's look.

export default function MaterialHeading() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let raf = 0;
    let scale = 0;
    let hue = 0;
    let freq = 0.01;
    let t = 0;

    const targetScale = hovering ? 34 : 0;

    function tick() {
      scale += (targetScale - scale) * 0.08;
      t += 0.016;

      if (hovering) {
        hue = (hue + 2.2) % 360;
        freq = 0.012 + Math.sin(t * 0.8) * 0.006;
      }

      if (dispRef.current) dispRef.current.setAttribute("scale", String(scale));
      if (turbRef.current)
        turbRef.current.setAttribute(
          "baseFrequency",
          `${freq.toFixed(4)} ${(freq * 1.6).toFixed(4)}`
        );

      if (headingRef.current) {
        headingRef.current.style.filter = `url(#materic-warp) hue-rotate(${
          hovering ? hue : 0
        }deg) saturate(${hovering ? 1.4 : 1})`;
      }

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovering]);

  return (
    <section
      className="relative flex items-center justify-center min-h-[70vh] md:min-h-screen overflow-hidden bg-paper"
      aria-label="Penaxis brand statement"
    >
      {/* Hidden SVG filter definition driving the warp/material effect */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="materic-warp" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.01 0.016"
              numOctaves={2}
              seed={7}
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[900px] aspect-square orbit-ring" />
      </div>

      <div className="relative text-center px-6">
        <p className="eyebrow text-ink/35 mb-6">Penaxis // Company Profile 2026</p>

        <h1
          ref={headingRef}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onTouchStart={() => setHovering(true)}
          onTouchEnd={() => setHovering(false)}
          className="select-none cursor-pointer font-display font-black uppercase leading-[0.92] text-violet-600 text-[15vw] md:text-[9.5vw] lg:text-[8.2rem] tracking-tight transition-colors"
        >
          Growth,
          <br />
          Engineered.
        </h1>

        <p className="mt-8 text-sm text-ink/45 eyebrow">
          {hovering ? "keep going." : "hover the headline."}
        </p>
      </div>

      <a
        href="#top"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink/40 hover:text-violet-600 transition-colors"
        aria-label="Scroll to explore"
      >
        <span className="eyebrow text-[10px]">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4v15M6 13l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
