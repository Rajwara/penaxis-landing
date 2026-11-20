"use client";

import { useEffect, useRef } from "react";
import { services } from "@/lib/data";

const IMG = "/images/services-hero";

// Ported mechanism from a reference "Mindly" app hero: a 1140×780 canvas
// that scales to fit any screen, a rotating text badge, two floating info
// cards with subtle parallax, bottom-corner trust/tag notes, and a 3D
// perspective ring of cards (drag to spin, momentum, slows on hover)
// orbiting a center portrait. Per the client's own instruction, this is a
// recolor only — same section, same cards, same reference images
// (portrait, avatars, mood photos, all shipped in public/images/services-hero),
// just Penaxis's palette and font stack instead of the reference's warm
// neutral tones and serif/sans pairing. The reference's own in-hero nav
// pill and app-store CTA were dropped (the site's real Navbar already
// floats above every page) and copy was rewritten for Penaxis's actual
// services instead of the reference's "Mindly" product.

const SERVICE_ICONS: Record<string, JSX.Element> = {
  "ai-mvp": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2a5 5 0 0 0-5 5c0 1.8.9 3 1.5 4.2C9 12.6 9 13 9 14v2h6v-2c0-1 0-1.4.5-2.8.6-1.2 1.5-2.4 1.5-4.2a5 5 0 0 0-5-5z" />
      <path d="M9 19h6M10 22h4" />
    </svg>
  ),
  "digital-transformation": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v5h-5" />
    </svg>
  ),
  "sales-growth": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 17l6-6 4 4 8-8M21 7v6" />
    </svg>
  ),
  "web-crm-software": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18M8 21h8" />
    </svg>
  ),
};

const SERVICE_TAGLINES: Record<string, string> = {
  "ai-mvp": "Idea to launch, fast.",
  "digital-transformation": "Modernize how you operate.",
  "sales-growth": "Pipeline, without the hire.",
};

// Small static icon+label tags layered on the portrait (matching the
// reference's "Focus / Ideas / Plan" stickers) — fixed positions, no
// spinning carousel, so nothing overlaps or gets clipped.
const MINI_TAGS: { slug: string; cls: string }[] = [
  { slug: "ai-mvp", cls: "sph-mtag--1" },
  { slug: "digital-transformation", cls: "sph-mtag--2" },
  { slug: "sales-growth", cls: "sph-mtag--3" },
];

const TRUST_AVATARS = [`${IMG}/avatar-1.jpg`, `${IMG}/avatar-2.jpg`, `${IMG}/avatar-3.jpg`, `${IMG}/avatar-4.jpg`];
const RIGHT_CARD_AVATARS = [`${IMG}/avatar-1.jpg`, `${IMG}/avatar-2.jpg`, `${IMG}/avatar-3.jpg`];

export default function ServicesHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const stageWrap = stageWrapRef.current;
    if (!hero || !stageWrap) return;

    function fit() {
      const W = hero!.clientWidth;
      if (W < 760) {
        hero!.style.height = "";
        const ms = Math.min(1, (W - 10) / 640);
        stageWrap!.style.setProperty("--sph-ms", String(ms));
        return;
      }
      const s = Math.min(W / 1140, 1.35);
      hero!.style.setProperty("--sph-s", String(s));
      hero!.style.height = 780 * s + 88 + "px";
    }
    fit();
    window.addEventListener("resize", fit);

    const handlePointerMove = (e: PointerEvent) => {
      const r = hero!.getBoundingClientRect();
      hero!.style.setProperty("--sph-mx", (((e.clientX - r.left) / r.width) - 0.5).toFixed(3));
      hero!.style.setProperty("--sph-my", (((e.clientY - r.top) / r.height) - 0.5).toFixed(3));
    };
    const handlePointerLeave = () => {
      hero!.style.setProperty("--sph-mx", "0");
      hero!.style.setProperty("--sph-my", "0");
    };
    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("resize", fit);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <section className="sph-hero" ref={heroRef}>
      <div className="sph-fit">
        <div className="sph-badge" aria-hidden="true">
          <svg className="sph-badge-ring" viewBox="0 0 100 100">
            <defs>
              <path id="sphBadgeCircle" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
            </defs>
            <text>
              <textPath href="#sphBadgeCircle" textLength="241">
                AI, SOFTWARE &amp; GROWTH •
              </textPath>
            </text>
          </svg>
          <svg className="sph-badge-star" viewBox="0 0 24 24">
            <path d="M12 0C12.6 7.8 16.2 11.4 24 12 16.2 12.6 12.6 16.2 12 24 11.4 16.2 7.8 12.6 0 12 7.8 11.4 11.4 7.8 12 0Z" fill="currentColor" />
          </svg>
        </div>

        <h1 className="sph-headline">
          <span className="sph-ln">
            <span>Four services,</span>
          </span>
          <span className="sph-ln">
            <span>one team.</span>
          </span>
        </h1>
        <p className="sph-sub">Everything you need to build, launch, and grow - under one roof.</p>
        <div className="sph-ctas">
          <a href="/contact-us" className="sph-btn sph-btn--dark">
            Start a Project
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M0 5h10.5M7 1.2 10.8 5 7 8.8" />
            </svg>
          </a>
          <a href="/case-studies" className="sph-btn sph-btn--light">
            View Case Studies
          </a>
        </div>

        <svg className="sph-wires" viewBox="0 0 1140 780" aria-hidden="true">
          <path id="sphWireL" pathLength="1" d="M168 364 C 168 440, 250 488, 372 500" />
          <path id="sphWireR" pathLength="1" d="M958 438 C 958 500, 890 532, 800 538" />
          <circle r="2.4" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" dur="4s" begin="2.6s" repeatCount="indefinite" />
            <animateMotion dur="4s" begin="2.6s" repeatCount="indefinite">
              <mpath href="#sphWireL" />
            </animateMotion>
          </circle>
          <circle r="2.4" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" dur="4s" begin="3.6s" repeatCount="indefinite" />
            <animateMotion dur="4s" begin="3.6s" repeatCount="indefinite">
              <mpath href="#sphWireR" />
            </animateMotion>
          </circle>
        </svg>

        <div className="sph-fc sph-fc--left">
          <div className="sph-fc-in">
            <span className="sph-fc-icon">
              <svg width="16" height="14" viewBox="0 0 18 16" fill="currentColor">
                <rect x="0" y="6" width="1.6" height="4" rx="0.8" />
                <rect x="3.2" y="3" width="1.6" height="10" rx="0.8" />
                <rect x="6.4" y="0" width="1.6" height="16" rx="0.8" />
                <rect x="9.6" y="4" width="1.6" height="8" rx="0.8" />
                <rect x="12.8" y="2" width="1.6" height="12" rx="0.8" />
                <rect x="16" y="6" width="1.6" height="4" rx="0.8" />
              </svg>
            </span>
            <h3>
              Idea to MVP
              <br />
              in 5 days.
            </h3>
            <p>
              Scoped tight,
              <br />
              shipped fast.
            </p>
          </div>
        </div>

        <div className="sph-fc sph-fc--right">
          <div className="sph-fc-in">
            <div className="sph-avs">
              {RIGHT_CARD_AVATARS.map((src) => (
                <img key={src} src={src} alt="" className="sph-av" />
              ))}
              <div className="sph-av sph-av--plus">+</div>
            </div>
            <h3 style={{ marginTop: 14 }}>
              27+ specialists,
              <br />
              one team.
            </h3>
            <p>
              Product, growth,
              <br />
              and engineering.
            </p>
          </div>
        </div>

        <div className="sph-stage-wrap" ref={stageWrapRef}>
          <div className="sph-stage">
            <div className="sph-person">
              <img src={`${IMG}/portrait.webp`} alt="" />
            </div>

            {MINI_TAGS.map((tag) => {
              const s = services.find((svc) => svc.slug === tag.slug)!;
              return (
                <div key={tag.slug} className={`sph-mtag ${tag.cls}`}>
                  <div className="sph-feat sph-mtag-in">
                    <span className="sph-feat-icon">
                      <span style={{ width: 14, height: 14 }}>{SERVICE_ICONS[tag.slug]}</span>
                    </span>
                    <div>
                      <h4>{s.title.length > 22 ? s.title.split(" ").slice(0, 2).join(" ") : s.title}</h4>
                      <p>{SERVICE_TAGLINES[tag.slug]}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="sph-trust">
          <span className="sph-trust-rule" />
          <p>
            50+ platforms shipped,
            <br />
            12+ industries served.
          </p>
          <div className="sph-avs">
            {TRUST_AVATARS.map((src) => (
              <img key={src} src={src} alt="" className="sph-av" />
            ))}
            <div className="sph-av sph-av--plus">+</div>
          </div>
        </div>

        <div className="sph-tag">
          <svg className="sph-tag-star" viewBox="0 0 24 24">
            <path d="M12 0C12.6 7.8 16.2 11.4 24 12 16.2 12.6 12.6 16.2 12 24 11.4 16.2 7.8 12.6 0 12 7.8 11.4 11.4 7.8 12 0Z" fill="currentColor" />
          </svg>
          <div className="sph-tag-row">
            <span className="sph-tag-rule" />
            <p>
              Less complexity.
              <br />
              More delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
