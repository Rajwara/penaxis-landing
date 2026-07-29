"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Scroll-driven multi-scene parallax page. The MECHANISM — a pinned
// full-screen SVG scrubbed by scroll position, with layered shapes
// moving at different speeds and a warm-to-night color/mood
// transition — is a generic scroll-parallax technique. The visual
// content is original: abstract layered "peak" shapes (a growth-curve
// motif) in the Penaxis palette, replacing a reference's own
// hand-illustrated nature scene (which was a specific credited
// artist's original artwork, not reused here).

// Simple jagged mountain-range polygon generator
function peakPoints(baseY: number, amplitude: number, seed: number): string {
  const pts: string[] = ["0,500"];
  const steps = 14;
  for (let i = 0; i <= steps; i++) {
    const x = (750 / steps) * i;
    const n = Math.sin(i * 1.3 + seed) * 0.6 + Math.sin(i * 0.6 + seed * 2) * 0.4;
    const y = baseY - n * amplitude;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  pts.push("750,500");
  return pts.join(" ");
}

export default function TestingPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const speed = 60;

      gsap.set("#tst-scene2-copy", { opacity: 0 });
      gsap.set("#tst-stars", { opacity: 0 });
      gsap.set("#tst-fstar", { opacity: 0, x: 0, y: -60 });

      // Scene 1 — peaks parallax apart as you scroll
      const scene1 = gsap.timeline({
        scrollTrigger: { trigger: ".tst-scroll-spacer", start: "top top", end: "45% 100%", scrub: 2 },
      });
      scene1.to("#tst-peak-1", { y: 1.4 * speed, x: -0.3 * speed }, 0);
      scene1.to("#tst-peak-2", { y: 2 * speed, x: 0.3 * speed }, 0);
      scene1.to("#tst-peak-3", { y: 2.6 * speed, x: -0.2 * speed }, 0);
      scene1.to("#tst-peak-4", { y: 3.2 * speed, x: 0.2 * speed }, 0);
      scene1.to("#tst-scene1-copy", { y: -3 * speed, opacity: 0 }, 0);

      // Warm glow -> night gradient shift, scrubbed across the whole scroll
      const glow = gsap.timeline({
        scrollTrigger: { trigger: ".tst-scroll-spacer", start: "top top", end: "bottom bottom", scrub: 2 },
      });
      glow.fromTo("#tst-bg-grad", { attr: { cy: "-20" } }, { attr: { cy: "260" } }, 0);
      glow.to("#tst-glow-stop-1", { attr: { "stop-color": "#3a2f52" } }, 0.5);
      glow.to("#tst-glow-stop-2", { attr: { "stop-color": "#171717" } }, 0.5);

      // Scene 2 — stars + shooting star + new copy fade in
      const scene2 = gsap.timeline({
        scrollTrigger: { trigger: ".tst-scroll-spacer", start: "45% top", end: "85% 100%", scrub: 2 },
      });
      scene2.to("#tst-stars", { opacity: 1 }, 0);
      scene2.fromTo("#tst-scene2-copy", { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, 0.2);
      scene2.to("#tst-fstar", { opacity: 1, x: -260, y: 160, ease: "power2.out" }, 0.3);

      // Twinkling stars
      gsap.utils.toArray<SVGCircleElement>("#tst-stars circle").forEach((star, i) => {
        gsap.fromTo(
          star,
          { opacity: 0.2 },
          { opacity: 1, duration: 0.6, repeat: -1, yoyo: true, repeatDelay: 0.5 + (i % 5) * 0.3 }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="tst-wrapper">
      <svg className="tst-svg" viewBox="0 0 750 500" preserveAspectRatio="xMidYMax slice">
        <defs>
          <radialGradient id="tst-bg-grad" cx="375" cy="-20" r="420" gradientUnits="userSpaceOnUse">
            <stop id="tst-glow-stop-1" offset="0.1" stopColor="#fc6607" />
            <stop id="tst-glow-stop-2" offset="0.85" stopColor="#5c3e82" />
          </radialGradient>
          <linearGradient id="tst-peak-grad-1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8768b7" />
            <stop offset="1" stopColor="#5c3e82" />
          </linearGradient>
          <linearGradient id="tst-peak-grad-2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6a4a94" />
            <stop offset="1" stopColor="#452f61" />
          </linearGradient>
          <linearGradient id="tst-peak-grad-3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a3468" />
            <stop offset="1" stopColor="#2e1f42" />
          </linearGradient>
          <linearGradient id="tst-peak-grad-4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2e1f42" />
            <stop offset="1" stopColor="#171717" />
          </linearGradient>
        </defs>

        <rect width="750" height="500" fill="url(#tst-bg-grad)" />

        <g id="tst-stars" fill="#fff">
          {Array.from({ length: 40 }).map((_, i) => {
            const x = (i * 37.3) % 750;
            const y = (i * 53.7) % 260;
            const r = 0.8 + (i % 3) * 0.5;
            return <circle key={i} cx={x} cy={y} r={r} />;
          })}
        </g>
        <g id="tst-fstar">
          <circle cx="600" cy="80" r="2.5" fill="#d6f23c" />
          <line x1="600" y1="80" x2="630" y2="65" stroke="#d6f23c" strokeWidth="1.5" opacity="0.6" />
        </g>

        <polygon id="tst-peak-4" points={peakPoints(340, 60, 4)} fill="url(#tst-peak-grad-4)" />
        <polygon id="tst-peak-3" points={peakPoints(380, 80, 3)} fill="url(#tst-peak-grad-3)" />
        <polygon id="tst-peak-2" points={peakPoints(420, 100, 2)} fill="url(#tst-peak-grad-2)" />
        <polygon id="tst-peak-1" points={peakPoints(460, 120, 1)} fill="url(#tst-peak-grad-1)" />
      </svg>

      <div className="tst-copy">
        <div id="tst-scene1-copy">
          <h2>Growth, Engineered.</h2>
          <p>Scroll to see how we get there</p>
        </div>
        <div id="tst-scene2-copy" className="tst-scene2-copy" style={{ position: "absolute" }}>
          <h2>Built for the long climb.</h2>
          <p>Penaxis — AI, strategy, and software, working together</p>
        </div>
      </div>

      <div className="tst-scroll-spacer" />

      <a href="/" className="tst-back">
        ← Back to Penaxis
      </a>
    </div>
  );
}
