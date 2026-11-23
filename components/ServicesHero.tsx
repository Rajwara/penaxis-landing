"use client";

import { useEffect, useRef } from "react";
import { services } from "@/lib/data";

const IMG = "/images/services-hero";

// Ported mechanism from a reference "Mindly" app hero: a 1140×780 canvas
// that scales to fit any screen, a rotating text badge, two floating info
// cards with subtle parallax, bottom-corner trust/tag notes, and a 3D
// perspective ring of cards (drag to spin, momentum, slows on hover)
// orbiting a center portrait. This is a recolor only — same section,
// same cards, same reference images (portrait, avatars, mood photos,
// all shipped in public/images/services-hero), just Penaxis's palette
// and font stack instead of the reference's warm neutral tones and
// serif/sans pairing. The reference's own in-hero nav pill and
// app-store CTA were dropped (the site's real Navbar already floats
// above every page) and copy was rewritten for Penaxis's actual
// services. The reference leaves 6 ring slots as empty frosted glass
// panels; those read as broken/missing cards rather than a deliberate
// accent, so all 9 non-feature slots use real Penaxis photos instead.
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

// 3 feat cards + 9 real photo cards orbiting the portrait. The reference
// leaves 6 of these slots as plain empty glass panels, but that read as
// broken/missing cards rather than a deliberate accent, so all 9 non-feat
// slots use real Penaxis photos instead.
type RingCard =
  | { type: "feat"; a: number; row: 0 | 1; rz: number; w: number; h: number; slug: string; sky?: string }
  | { type: "img"; a: number; row: 0 | 1; rz: number; w: number; h: number; src: string };

const RING_CARDS: RingCard[] = [
  { type: "feat", a: -22, row: 0, rz: -9, w: 186, h: 72, slug: "ai-mvp", sky: `${IMG}/card-sky.jpg` },
  { type: "feat", a: 2, row: 1, rz: -6, w: 220, h: 70, slug: "digital-transformation" },
  { type: "feat", a: 52, row: 0, rz: 7, w: 190, h: 78, slug: "sales-growth" },
  { type: "img", a: 75, row: 1, rz: 4, w: 96, h: 88, src: `${IMG}/card-moon.jpg` },
  { type: "img", a: -56, row: 1, rz: -4, w: 100, h: 136, src: `${IMG}/card-mountain.jpg` },
  { type: "img", a: -95, row: 0, rz: -3, w: 96, h: 120, src: `${IMG}/card-abstract.jpg` },
  { type: "img", a: 100, row: 0, rz: 0, w: 70, h: 96, src: "/images/services/ai-mvp-highlight.webp" },
  { type: "img", a: 150, row: 0, rz: 0, w: 80, h: 60, src: "/images/services/digital-transformation-highlight.webp" },
  { type: "img", a: 205, row: 0, rz: 0, w: 70, h: 70, src: "/images/services/sales-growth-highlight.webp" },
  { type: "img", a: 125, row: 1, rz: 0, w: 76, h: 110, src: "/images/services/web-crm-software-highlight.webp" },
  { type: "img", a: 180, row: 1, rz: 0, w: 90, h: 80, src: "/images/hero/team-celebration.webp" },
  { type: "img", a: 240, row: 1, rz: 0, w: 68, h: 100, src: "/images/hero/trusted-partner-office.webp" },
];

const TRUST_AVATARS = [`${IMG}/avatar-1.jpg`, `${IMG}/avatar-2.jpg`, `${IMG}/avatar-3.jpg`, `${IMG}/avatar-4.jpg`];
const RIGHT_CARD_AVATARS = [`${IMG}/avatar-1.jpg`, `${IMG}/avatar-2.jpg`, `${IMG}/avatar-3.jpg`];

export default function ServicesHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    const stageWrap = stageWrapRef.current;
    if (!hero || !stage || !stageWrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    const CX = 320;
    const ROW_Y = [90, 216];
    const RX = 262;
    const TILT = -22;
    const BASE_SPEED = 9;

    const cardEls = Array.from(stage.querySelectorAll<HTMLElement>(".sph-rc"));
    const cards = cardEls.map((el) => ({
      el,
      a: Number(el.dataset.a),
      row: Number(el.dataset.row),
      rz: Number(el.dataset.rz || 0),
      w: el.offsetWidth,
      h: el.offsetHeight,
    }));

    let offset = 0;
    let speed = reduce ? 0 : BASE_SPEED;
    let target = speed;
    let last = performance.now();
    let dragging = false;
    let lastX = 0;
    let dragVel = 0;
    let raf = 0;

    function render() {
      for (const c of cards) {
        const deg = c.a + offset;
        const t = (deg * Math.PI) / 180;
        const sin = Math.sin(t);
        const cos = Math.cos(t);
        const x = CX + RX * sin - c.w / 2;
        const y = ROW_Y[c.row] + TILT * cos + 10 * sin - c.h / 2;
        const z = RX * cos;
        const depth = (cos + 1) / 2;
        c.el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${deg}deg) rotateZ(${c.rz * depth}deg)`;
        c.el.style.zIndex = String(cos > 0 ? 5 + Math.round(cos * 10) : 1);
        c.el.style.opacity = (0.35 + 0.65 * depth).toFixed(3);
        c.el.style.filter = cos < -0.2 ? `blur(${(-cos * 1.4).toFixed(2)}px)` : "none";
      }
    }

    function tick(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!dragging) {
        speed += (target - speed) * Math.min(1, dt * 2.5);
        offset += speed * dt;
      }
      render();
      raf = requestAnimationFrame(tick);
    }
    render();
    raf = requestAnimationFrame(tick);

    const handleEnter = () => {
      if (!reduce) target = BASE_SPEED * 0.35;
    };
    const handleLeave = () => {
      if (!reduce) target = BASE_SPEED;
    };
    const handleDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      dragVel = 0;
      stage!.classList.add("is-drag");
      stage!.setPointerCapture(e.pointerId);
    };
    const handleMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      offset += dx * 0.35;
      dragVel = dx * 0.35 * 60;
    };
    const handleUp = () => {
      if (!dragging) return;
      dragging = false;
      stage!.classList.remove("is-drag");
      speed = Math.max(-220, Math.min(220, dragVel));
    };
    stage.addEventListener("pointerenter", handleEnter);
    stage.addEventListener("pointerleave", handleLeave);
    stage.addEventListener("pointerdown", handleDown);
    stage.addEventListener("pointermove", handleMove);
    stage.addEventListener("pointerup", handleUp);
    stage.addEventListener("pointercancel", handleUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      stage.removeEventListener("pointerenter", handleEnter);
      stage.removeEventListener("pointerleave", handleLeave);
      stage.removeEventListener("pointerdown", handleDown);
      stage.removeEventListener("pointermove", handleMove);
      stage.removeEventListener("pointerup", handleUp);
      stage.removeEventListener("pointercancel", handleUp);
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
          <div className="sph-stage" ref={stageRef}>
            <div className="sph-person">
              <img src={`${IMG}/portrait.webp`} alt="" />
            </div>

            {RING_CARDS.map((card, i) => {
              if (card.type === "feat") {
                const s = services.find((svc) => svc.slug === card.slug)!;
                return (
                  <div
                    key={i}
                    className="sph-rc"
                    data-a={card.a}
                    data-row={card.row}
                    data-rz={card.rz}
                    style={{ "--sph-w": `${card.w}px`, "--sph-h": `${card.h}px` } as React.CSSProperties}
                  >
                    <div className="sph-rc-f">
                      {card.sky && (
                        <div className="sph-feat-sky">
                          <img src={card.sky} alt="" />
                        </div>
                      )}
                      <div className="sph-feat">
                        <span className="sph-feat-icon">
                          <span style={{ width: 14, height: 14 }}>{SERVICE_ICONS[card.slug]}</span>
                        </span>
                        <div>
                          <h4>{s.title.length > 22 ? s.title.split(" ").slice(0, 2).join(" ") : s.title}</h4>
                          <p>{SERVICE_TAGLINES[card.slug]}</p>
                        </div>
                      </div>
                    </div>
                    <div className="sph-rc-b" />
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  className="sph-rc sph-rc--img"
                  data-a={card.a}
                  data-row={card.row}
                  data-rz={card.rz}
                  style={{ "--sph-w": `${card.w}px`, "--sph-h": `${card.h}px` } as React.CSSProperties}
                >
                  <div className="sph-rc-f">
                    <div className="sph-rc-img-wrap">
                      <img src={card.src} alt="" />
                    </div>
                  </div>
                  <div className="sph-rc-b" />
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
