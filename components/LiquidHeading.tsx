"use client";

import { useEffect, useRef } from "react";

// New standalone banner: same bold poster-scale headline treatment as
// MaterialHeading, but the "material" here is a moving liquid-chrome
// reveal instead of a displacement warp. A solid black base headline
// sits underneath; a second identical headline is masked to a soft
// circle that drifts on its own and follows the cursor on hover, and
// is filled with a shifting metallic gradient rather than flat ink.

export default function LiquidHeading() {
  const chromeRef = useRef<HTMLHeadingElement>(null);
  const rafRef = useRef(0);
  const state = useRef({
    x: 0.5,
    y: 0.42,
    tx: 0.5,
    ty: 0.42,
    r: 26,
    tr: 26,
    hovering: false,
  });
  const t = useRef(0);

  useEffect(() => {
    const el = chromeRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    function tick() {
      t.current += 0.016;
      const s = state.current;

      if (!s.hovering) {
        // Slow autonomous drift so the effect feels alive even before interaction
        s.tx = 0.5 + Math.sin(t.current * 0.35) * 0.3;
        s.ty = 0.45 + Math.sin(t.current * 0.5) * 0.2 + Math.cos(t.current * 0.22) * 0.05;
        s.tr = 24;
      }

      s.x += (s.tx - s.x) * 0.07;
      s.y += (s.ty - s.y) * 0.07;
      s.r += (s.tr - s.r) * 0.07;

      el!.style.setProperty("--mx", `${(s.x * 100).toFixed(2)}%`);
      el!.style.setProperty("--my", `${(s.y * 100).toFixed(2)}%`);
      el!.style.setProperty("--mr", `${s.r.toFixed(1)}%`);
      el!.style.backgroundPosition = `${(t.current * 16) % 240}% ${(
        Math.sin(t.current * 0.4) * 24 +
        50
      ).toFixed(1)}%`;

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const s = state.current;
    s.tx = (e.clientX - rect.left) / rect.width;
    s.ty = (e.clientY - rect.top) / rect.height;
    s.tr = 40;
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    if (!touch) return;
    const s = state.current;
    s.tx = (touch.clientX - rect.left) / rect.width;
    s.ty = (touch.clientY - rect.top) / rect.height;
    s.tr = 40;
    s.hovering = true;
  };

  return (
    <section
      className="relative flex items-center justify-center min-h-[60vh] md:min-h-[85vh] overflow-hidden bg-paper py-20"
      aria-label="Growth, engineered"
    >
      <div
        className="relative select-none w-full"
        onMouseEnter={() => (state.current.hovering = true)}
        onMouseLeave={() => (state.current.hovering = false)}
        onMouseMove={handleMove}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        onTouchEnd={() => (state.current.hovering = false)}
      >
        <h2 className="font-display font-black uppercase leading-[0.92] text-ink text-[15vw] md:text-[9.5vw] lg:text-[8.2rem] tracking-tight text-center px-6">
          Growth,
          <br />
          Engineered.
        </h2>
        <h2
          ref={chromeRef}
          aria-hidden="true"
          className="liquid-chrome pointer-events-none absolute inset-0 font-display font-black uppercase leading-[0.92] text-[15vw] md:text-[9.5vw] lg:text-[8.2rem] tracking-tight text-center px-6"
        >
          Growth,
          <br />
          Engineered.
        </h2>
      </div>
    </section>
  );
}
