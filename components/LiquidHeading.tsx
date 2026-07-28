"use client";

import { useEffect, useRef } from "react";

// New standalone banner, sits right after MaterialHeading.
// Technique: a solid black headline acts as a stencil. An original
// abstract material video sits on top with mix-blend-mode: screen —
// against the white page, screen-blending makes the video invisible
// everywhere except where the text is black, so the video only ever
// "shows through" inside the letterforms. A radial mask (computed and
// applied directly via inline styles, in pixels, every frame) further
// restricts that to a soft circle that drifts on its own and follows
// the cursor on hover/touch.

export default function LiquidHeading() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef(0);
  const size = useRef({ w: 0, h: 0 });
  const state = useRef({
    x: 0.5,
    y: 0.42,
    tx: 0.5,
    ty: 0.42,
    r: 90,
    tr: 90,
    hovering: false,
  });
  const t = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      video.style.display = "none";
      return;
    }

    const measure = () => {
      const rect = container.getBoundingClientRect();
      size.current.w = rect.width;
      size.current.h = rect.height;
    };
    measure();
    window.addEventListener("resize", measure);

    function tick() {
      t.current += 0.016;
      const s = state.current;

      if (!s.hovering) {
        s.tx = 0.5 + Math.sin(t.current * 0.35) * 0.3;
        s.ty = 0.45 + Math.sin(t.current * 0.5) * 0.2 + Math.cos(t.current * 0.22) * 0.05;
        s.tr = 90;
      }

      s.x += (s.tx - s.x) * 0.07;
      s.y += (s.ty - s.y) * 0.07;
      s.r += (s.tr - s.r) * 0.07;

      const px = s.x * size.current.w;
      const py = s.y * size.current.h;
      const mask = `radial-gradient(circle ${s.r.toFixed(0)}px at ${px.toFixed(
        0
      )}px ${py.toFixed(0)}px, black 0%, black 60%, transparent 100%)`;

      video!.style.maskImage = mask;
      (video!.style as any).webkitMaskImage = mask;

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const s = state.current;
    s.tx = (e.clientX - rect.left) / rect.width;
    s.ty = (e.clientY - rect.top) / rect.height;
    s.tr = 140;
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    if (!touch) return;
    const s = state.current;
    s.tx = (touch.clientX - rect.left) / rect.width;
    s.ty = (touch.clientY - rect.top) / rect.height;
    s.tr = 140;
    s.hovering = true;
  };

  return (
    <section
      className="relative flex items-center justify-center min-h-[60vh] md:min-h-[85vh] overflow-hidden bg-paper py-20"
      aria-label="Growth, engineered"
    >
      <div
        ref={containerRef}
        className="relative select-none w-full"
        onMouseEnter={() => (state.current.hovering = true)}
        onMouseLeave={() => (state.current.hovering = false)}
        onMouseMove={handleMove}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        onTouchEnd={() => (state.current.hovering = false)}
      >
        {/* Base stencil — always visible, this is the real accessible headline */}
        <h2 className="font-display font-black uppercase leading-[0.92] text-ink text-[15vw] md:text-[9.5vw] lg:text-[8.2rem] tracking-tight text-center px-6">
          Growth,
          <br />
          Engineered.
        </h2>

        {/* Material video — screen-blended, only reads through the black glyphs,
            and only within the moving circular mask (applied via inline JS) */}
        <video
          ref={videoRef}
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 w-full h-full object-cover mix-blend-screen"
          style={{
            maskImage:
              "radial-gradient(circle 90px at 50% 42%, black 0%, black 60%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(circle 90px at 50% 42%, black 0%, black 60%, transparent 100%)",
          }}
          src="/videos/liquid-material.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>
  );
}
