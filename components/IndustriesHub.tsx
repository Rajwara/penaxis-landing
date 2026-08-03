"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { industries, slugify } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Ported mechanism: a hub-and-spoke hero diagram (pulsing rings,
// connecting lines drawing in, tiles springing into place, mouse
// parallax, 3D hover-tilt on tiles), followed by a scroll-revealed
// card grid and a closing CTA — from a shared design. That design's
// own credit ("@DERMEXCEL"), its specific tagline copy, and the real
// third-party tool logos it displayed (Krisp, Loom, Otter, etc. —
// irrelevant to an industries section anyway) were not reused. Icons
// and all copy here are original, for Penaxis's real 13 industries —
// 6 featured in the hub diagram, all 13 in the grid below.

const HUB_ICONS = [
  // Software/IT
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 6L3 12l5 6M16 6l5 6-5 6" />
  </svg>,
  // Education
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9l10-5 10 5-10 5-10-5z" />
    <path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
  </svg>,
  // Automotive
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" />
    <path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4z" />
    <circle cx="7.5" cy="17.5" r="1.2" />
    <circle cx="16.5" cy="17.5" r="1.2" />
  </svg>,
  // Logistics
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="7" width="13" height="10" rx="1" />
    <path d="M14 10h4l4 4v3h-8z" />
    <circle cx="6" cy="19" r="1.6" />
    <circle cx="17.5" cy="19" r="1.6" />
  </svg>,
  // E-Commerce
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18l-1.5 11a2 2 0 0 1-2 1.7H6.5a2 2 0 0 1-2-1.7L3 6z" />
    <path d="M8 6V5a4 4 0 0 1 8 0v1" />
  </svg>,
  // Healthcare
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.8 8.6c0 5.4-8.8 10.4-8.8 10.4S3.2 14 3.2 8.6a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8z" />
  </svg>,
];

const HUB_INDUSTRY_INDICES = [0, 1, 2, 4, 6, 11]; // Software, Education, Automotive, E-Commerce, Retail-adjacent, Healthcare

export default function IndustriesHub() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.set(".ih-eyebrow", { opacity: 0, y: -10 });
      gsap.set(".ih-ring", { transformOrigin: "400px 250px", scale: 0, opacity: 0 });
      gsap.set(".ih-mark", { scale: 0, opacity: 0 });
      gsap.set(".ih-tile", { scale: 0, opacity: 0 });
      gsap.set(".ih-link", { strokeDashoffset: 600 });
      gsap.set(".ih-headline .ih-inner", { y: "105%" });
      gsap.set(".ih-sub", { opacity: 0, y: 10 });
      gsap.set(".ih-card", { opacity: 0, y: 40 });
      gsap.set(".ih-cta-inner", { opacity: 0, y: 40 });

      if (prefersReduced) {
        gsap.set([".ih-eyebrow", ".ih-ring", ".ih-mark", ".ih-tile", ".ih-headline .ih-inner", ".ih-sub"], {
          opacity: 1,
          scale: 1,
          y: 0,
        });
        gsap.set(".ih-link", { strokeDashoffset: 0 });
      } else {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .to(".ih-eyebrow", { opacity: 1, y: 0, duration: 0.8 }, 0.1)
          .to(".ih-ring", { scale: 1, opacity: 1, duration: 1.4, stagger: 0.12 }, 0.3)
          .to(".ih-mark", { scale: 1, opacity: 1, duration: 1.1, ease: "back.out(1.8)" }, 0.5)
          .from(".ih-tile", { y: (i) => (i % 2 === 0 ? -60 : 60), x: (i) => (i < 3 ? -40 : 40), duration: 1, ease: "back.out(1.6)" }, 0.9)
          .to(".ih-tile", { scale: 1, opacity: 1, duration: 1, stagger: 0.07, ease: "back.out(1.6)" }, 0.9)
          .to(".ih-link", { strokeDashoffset: 0, duration: 1.2, stagger: 0.08, ease: "power2.inOut" }, 1.3)
          .to(".ih-headline .ih-inner", { y: "0%", duration: 1, stagger: 0.15 }, 1.6)
          .to(".ih-sub", { opacity: 1, y: 0, duration: 0.8 }, 2.0);

        // Continuous ring pulse
        ["ih-ring-1", "ih-ring-2", "ih-ring-3", "ih-ring-4"].forEach((cls, i) => {
          gsap.to(`.${cls}`, {
            attr: { r: 60 + i * 50 + 8 },
            opacity: 0.3,
            duration: 2.2,
            delay: 2.2 + i * 0.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

        // Mark gentle bob
        gsap.to(".ih-mark", { y: "+=8", rotation: "+=3", duration: 3, delay: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1 });

        // Tile hover-tilt
        root.querySelectorAll<HTMLElement>(".ih-tile").forEach((tile) => {
          tile.addEventListener("mousemove", (e) => {
            const r = tile.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(tile, { rotateX: -py * 18, rotateY: px * 18, scale: 1.12, duration: 0.4, ease: "power2.out", transformPerspective: 600, overwrite: "auto" });
          });
          tile.addEventListener("mouseleave", () => {
            gsap.to(tile, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.6)", overwrite: "auto" });
          });
        });

        // Diagram mouse parallax
        const diagram = root.querySelector<HTMLElement>(".ih-diagram");
        if (diagram) {
          let mx = 0, my = 0, tx = 0, ty = 0;
          diagram.addEventListener("mousemove", (e) => {
            const r = diagram.getBoundingClientRect();
            mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
            my = ((e.clientY - r.top) / r.height - 0.5) * 2;
          });
          diagram.addEventListener("mouseleave", () => { mx = 0; my = 0; });

          let raf = 0;
          const parallax = () => {
            raf = requestAnimationFrame(parallax);
            tx += (mx - tx) * 0.06;
            ty += (my - ty) * 0.06;
            root.querySelectorAll<HTMLElement>(".ih-tile").forEach((tile, i) => {
              const depth = 6 + (i % 3) * 3;
              tile.style.translate = `${tx * depth}px ${ty * depth}px`;
            });
            const mark = root.querySelector<HTMLElement>(".ih-mark");
            if (mark) mark.style.translate = `${tx * 4}px ${ty * 4}px`;
          };
          parallax();
        }

        // Scroll contract on the poster
        ScrollTrigger.create({
          trigger: ".ih-poster",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(".ih-tile-1", { x: -120 * p, y: -60 * p, rotation: -10 * p });
            gsap.set(".ih-tile-2", { x: 120 * p, y: -60 * p, rotation: 10 * p });
            gsap.set(".ih-tile-3", { x: -150 * p, rotation: -6 * p });
            gsap.set(".ih-tile-4", { x: 150 * p, rotation: 6 * p });
            gsap.set(".ih-tile-5", { x: -120 * p, y: 60 * p, rotation: 10 * p });
            gsap.set(".ih-tile-6", { x: 120 * p, y: 60 * p, rotation: -10 * p });
            gsap.set(".ih-mark", { scale: 1 - 0.2 * p, opacity: 1 - 0.6 * p });
            gsap.set(".ih-link", { opacity: 1 - p * 1.5 });
            gsap.set(".ih-ring", { opacity: (1 - p * 1.5) * 0.5 });
          },
        });

        gsap.to(".ih-card", {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ih-grid", start: "top 85%" },
        });

        gsap.to(".ih-cta-inner", {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ih-cta-section", start: "top 85%" },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section className="ih-poster">
        <div className="ih-eyebrow">Where we work</div>

        <div className="ih-diagram">
          <svg className="ih-bg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
            <circle className="ih-ring ih-ring-1" cx="400" cy="250" r="60" />
            <circle className="ih-ring ih-ring-2" cx="400" cy="250" r="110" />
            <circle className="ih-ring ih-ring-3" cx="400" cy="250" r="160" />
            <circle className="ih-ring ih-ring-4" cx="400" cy="250" r="210" />
            <path className="ih-link" d="M 140 75 Q 250 170, 395 247" />
            <path className="ih-link" d="M 660 75 Q 545 170, 405 247" />
            <path className="ih-link" d="M 80 270 Q 230 258, 388 250" />
            <path className="ih-link" d="M 720 270 Q 570 258, 412 250" />
            <path className="ih-link" d="M 140 425 Q 250 335, 395 253" />
            <path className="ih-link" d="M 660 425 Q 545 335, 405 253" />
          </svg>

          <div className="ih-mark">
            <img src="/images/logo/penaxis-mark.png" alt="" />
          </div>

          {HUB_INDUSTRY_INDICES.map((idx, i) => (
            <div className={`ih-tile ih-tile-${i + 1}`} key={idx} title={industries[idx].title}>
              {HUB_ICONS[i]}
            </div>
          ))}
        </div>

        <h1 className="ih-headline">
          <span className="ih-line ih-line-1"><span className="ih-inner">GROWTH ACROSS</span></span>
          <span className="ih-line ih-line-2"><span className="ih-inner">EVERY INDUSTRY</span></span>
        </h1>
        <p className="ih-sub">
          13 industries, one team — from software and healthcare to logistics
          and real estate, we build for how each one actually works.
        </p>
      </section>

      <section className="ih-section-grid">
        <div className="ih-grid-head">
          <div className="ih-eyebrow2">All 13, in detail</div>
          <h2>Every industry we build for.</h2>
        </div>
        <div className="ih-grid">
          {industries.map((ind, i) => (
            <article className="ih-card" id={slugify(ind.title)} key={ind.title}>
              <span className="ih-card-num">{String(i + 1).padStart(2, "0")} / 13</span>
              <h3>{ind.title}</h3>
              <p>{ind.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ih-cta-section">
        <div className="ih-cta-inner">
          <div className="ih-cta-tag">START A PROJECT</div>
          <h2>
            Whatever your industry, <em>we build for it.</em>
          </h2>
          <p>
            13 industries and counting. If yours isn't on the list yet,
            that's usually just because we haven't met you.
          </p>
          <a href="/contact" className="ih-cta-btn">
            Start a project
          </a>
        </div>
      </section>
    </div>
  );
}
