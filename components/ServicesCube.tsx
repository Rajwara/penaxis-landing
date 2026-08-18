"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/data";

// Ported mechanism: a fixed 3D cube rotates through 6 stops as the page
// scrolls, driven by velocity-based inertia (wheel events accumulate
// momentum, eased toward a target scroll position) rather than native
// scroll-snap. HUD shows scroll %, a progress bar, the active scene name,
// a left-side scene-dot strip, and a bottom-center face caption. Text
// cards reveal on scroll via IntersectionObserver.
//
// Not reused from the reference: its specific narrative copy and hosted
// demo images. Content here is Penaxis's own real service descriptions;
// cube faces are brand-gradient panels with simple icons instead of
// photography we don't have rights to use.

const ICONS = {
  intro: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.4">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  ),
  s1: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.4">
      <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
    </svg>
  ),
  s2: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.4">
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M17 3v5h-5M7 21v-5h5" />
    </svg>
  ),
  s3: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.4">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="#fff" />
    </svg>
  ),
  s4: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.4">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  ),
  outro: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.4">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};

const SCENE_BG = ["intro", "s1", "s2", "s3", "s4", "outro"];

const STOPS = [
  { rx: 90, ry: 0 },
  { rx: 0, ry: 0 },
  { rx: 0, ry: -90 },
  { rx: 0, ry: -180 },
  { rx: 0, ry: -270 },
  { rx: -90, ry: -360 },
];

const FACES = [
  { key: "top", cls: "sv-face--intro", icon: ICONS.intro },
  { key: "front", cls: "sv-face--s1", icon: ICONS.s1 },
  { key: "right", cls: "sv-face--s2", icon: ICONS.s2 },
  { key: "back", cls: "sv-face--s3", icon: ICONS.s3 },
  { key: "left", cls: "sv-face--s4", icon: ICONS.s4 },
  { key: "bottom", cls: "sv-face--outro", icon: ICONS.outro },
];

const SCENES = [
  { name: "Overview", tag: "Services - Penaxis" },
  { name: services[0].title, tag: `01 - ${services[0].title}` },
  { name: services[1].title, tag: `02 - ${services[1].title}` },
  { name: services[2].title, tag: `03 - ${services[2].title}` },
  { name: services[3].title, tag: `04 - ${services[3].title}` },
  { name: "Start a project", tag: "05 - Let's build" },
];

const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function ServicesCube() {
  const cubeRef = useRef<HTMLDivElement>(null);
  const scrollElRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [pct, setPct] = useState(0);
  const prefersReducedRef = useRef(false);

  useEffect(() => {
    prefersReducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = STOPS.length;
    const sections = Array.from(
      scrollElRef.current!.querySelectorAll<HTMLElement>("section")
    );

    let sectionTops: number[] = [];
    let maxScroll = 1; // full page range — used to clamp real window scrolling
    let cubeMaxScroll = 1; // range across just the 6 cube sections — drives rotation/HUD
    let lastScrollHeight = 0;
    let lastInnerHeight = 0;

    const footerEl = document.querySelector("footer");
    let footerTop = Infinity;
    const measureFooter = () => {
      if (footerEl) footerTop = footerEl.getBoundingClientRect().top + window.scrollY;
    };

    const buildSectionTops = () => {
      sectionTops = sections.map((s) => s.getBoundingClientRect().top + window.scrollY);
    };

    const resize = () => {
      const h = document.documentElement.scrollHeight;
      const vh = innerHeight;
      if (h === lastScrollHeight && vh === lastInnerHeight) return;
      lastScrollHeight = h;
      lastInnerHeight = vh;
      maxScroll = Math.max(1, h - vh);
      buildSectionTops();
      // Progress reaches 1.0 once the top of the last section reaches the
      // top of the viewport — i.e. right as the cube sections end, not
      // diluted by whatever comes after (footer) in the full page height.
      cubeMaxScroll = Math.max(1, sectionTops[N - 1] ?? maxScroll);
      measureFooter();
    };
    resize();

    const sectionIndexFromScroll = (y: number) => {
      const mid = y + innerHeight * 0.5;
      let idx = 0;
      for (let i = 0; i < sectionTops.length; i++) {
        if (mid >= sectionTops[i]) idx = i;
      }
      return Math.min(idx, N - 1);
    };

    const setCubeTransform = (s: number) => {
      const cube = cubeRef.current;
      if (!cube || N < 2) return;
      const t = s * (N - 1);
      const i = Math.min(Math.floor(t), N - 2);
      const f = easeIO(t - i);
      const a = STOPS[i];
      const b = STOPS[i + 1];
      const rx = a.rx + (b.rx - a.rx) * f;
      const ry = a.ry + (b.ry - a.ry) * f;
      cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };

    let lastFaceIdx = -1;
    const updateHUD = (s: number) => {
      const p = Math.round(s * 100);
      const si = sectionIndexFromScroll(scrollY);
      setPct(p);
      if (si !== lastFaceIdx) {
        lastFaceIdx = si;
        setActiveIdx(si);
      }
    };

    // Hide the fixed cube/HUD overlay only once the real <footer> element's
    // top edge is about to enter the viewport — checked against the actual
    // footer position, not an assumption about section heights.
    const updateOverlayVisibility = () => {
      const el = overlayRef.current;
      if (!el) return;
      const pastEnd = scrollY + innerHeight >= footerTop;
      el.style.opacity = pastEnd ? "0" : "1";
    };

    if (prefersReducedRef.current) {
      // Reduced motion: skip physics/rotation entirely, cube sits at first face
      setCubeTransform(0);
      const onScrollSimple = () => {
        const s = cubeMaxScroll > 0 ? Math.max(0, Math.min(1, scrollY / cubeMaxScroll)) : 0;
        updateHUD(s);
        updateOverlayVisibility();
      };
      window.addEventListener("scroll", onScrollSimple, { passive: true });
      window.addEventListener("resize", resize);
      return () => {
        window.removeEventListener("scroll", onScrollSimple);
        window.removeEventListener("resize", resize);
      };
    }

    let tgt = 0;
    let smooth = 0;
    let velocity = 0;
    let rafId = 0;
    let lastNow = performance.now();
    let anchorAnim = 0;
    let isAnchorScrolling = false;

    const stopAnchorAnim = () => {
      if (anchorAnim) cancelAnimationFrame(anchorAnim);
      anchorAnim = 0;
      isAnchorScrolling = false;
    };

    const onResize = () => {
      resize();
      tgt = cubeMaxScroll > 0 ? Math.max(0, Math.min(1, scrollY / cubeMaxScroll)) : 0;
      smooth = tgt;
    };
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(onResize);
    });
    ro.observe(document.documentElement);

    const onScroll = () => {
      tgt = cubeMaxScroll > 0 ? scrollY / cubeMaxScroll : 0;
      tgt = Math.max(0, Math.min(1, tgt));
      updateOverlayVisibility();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const dynamicFriction = (v: number) => (Math.abs(v) > 200 ? 0.8 : 0.9);
    const ease = 0.18;
    const WHEEL_GAIN = 1.7;
    const VELOCITY_CAP = 1300;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const linePx = 16;
      const pagePx = innerHeight * 0.9;
      const delta =
        e.deltaMode === 1 ? e.deltaY * linePx : e.deltaMode === 2 ? e.deltaY * pagePx : e.deltaY;
      if (Math.abs(delta) < 5) return;
      stopAnchorAnim();
      velocity += delta * WHEEL_GAIN;
      velocity = Math.max(-VELOCITY_CAP, Math.min(VELOCITY_CAP, velocity));
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    const smoothScrollToY = (targetY: number, duration = 900) => {
      stopAnchorAnim();
      velocity = 0;
      isAnchorScrolling = true;
      const startY = window.scrollY;
      const diff = targetY - startY;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const y = startY + diff * easeInOutCubic(p);
        window.scrollTo(0, y);
        tgt = cubeMaxScroll > 0 ? Math.max(0, Math.min(1, y / cubeMaxScroll)) : 0;
        smooth = tgt;
        updateOverlayVisibility();
        if (p < 1) {
          anchorAnim = requestAnimationFrame(tick);
        } else {
          anchorAnim = 0;
          isAnchorScrolling = false;
        }
      };
      anchorAnim = requestAnimationFrame(tick);
    };

    const stopInteraction = () => stopAnchorAnim();
    window.addEventListener("touchstart", stopInteraction, { passive: true });
    window.addEventListener("mousedown", stopInteraction, { passive: true });
    window.addEventListener("keydown", stopAnchorAnim);

    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const a = target.closest('a[data-scene-jump]') as HTMLAnchorElement | null;
      if (!a) return;
      const idx = parseInt(a.dataset.sceneJump || "0", 10);
      const el = sections[idx];
      if (!el) return;
      e.preventDefault();
      smoothScrollToY(Math.max(0, sectionTops[idx] || 0));
    };
    document.addEventListener("click", onAnchorClick);

    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".sv-reveal"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("sv-visible");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));

    const frame = (now: number) => {
      rafId = requestAnimationFrame(frame);
      if (document.hidden) {
        lastNow = now;
        return;
      }
      const dt = Math.min((now - lastNow) / 1000, 0.05);
      lastNow = now;

      velocity *= Math.pow(dynamicFriction(velocity), dt * 60);
      if (Math.abs(velocity) < 0.01) velocity = 0;

      if (Math.abs(velocity) > 0.2 && !isAnchorScrolling) {
        const next = Math.max(0, Math.min(scrollY + velocity * ease, maxScroll));
        window.scrollTo(0, next);
        tgt = cubeMaxScroll > 0 ? Math.max(0, Math.min(1, next / cubeMaxScroll)) : 0;
      }

      smooth += (tgt - smooth) * (1 - Math.exp(-dt * 8));
      smooth = Math.max(0, Math.min(1, smooth));

      updateHUD(smooth);
      setCubeTransform(smooth);
      updateOverlayVisibility();
    };
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      stopAnchorAnim();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", stopInteraction);
      window.removeEventListener("mousedown", stopInteraction);
      window.removeEventListener("keydown", stopAnchorAnim);
      document.removeEventListener("click", onAnchorClick);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={overlayRef} style={{ transition: "opacity 0.4s ease" }}>
        <div className="sv-bg" aria-hidden="true">
          {SCENE_BG.map((key, i) => (
            <div
              key={key}
              className={`sv-bg-layer sv-bg-layer--${key} ${i === activeIdx ? "is-active" : ""}`}
            />
          ))}
        </div>

        <div className="sv-scene" aria-hidden="true">
          <div ref={cubeRef} className="sv-cube">
            {FACES.map((f) => (
              <div key={f.key} className={`sv-face ${f.cls}`} data-face={f.key}>
                {f.icon}
              </div>
            ))}
          </div>
        </div>

        <div className="sv-hud" aria-hidden="true">
          <div>{String(pct).padStart(3, "0")}%</div>
          <div className="sv-progress-bar">
            <div className="sv-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="sv-scene-label">{SCENES[activeIdx]?.name}</div>
        </div>

        <div className="sv-strip" role="group" aria-label="Section indicators" aria-hidden="true">
          {SCENES.map((_, i) => (
            <span key={i} className={`sv-dot ${i === activeIdx ? "is-active" : ""}`} />
          ))}
        </div>

        <div className="sv-caption" aria-hidden="true">
          <div className="sv-caption-num">{String(activeIdx + 1).padStart(2, "0")}</div>
          <div className="sv-caption-name">{SCENES[activeIdx]?.name}</div>
        </div>
      </div>

      <div ref={scrollElRef} className="sv-scroll">
        {/* INTRO */}
        <section className="sv-section sv-intro">
          <div className="sv-card sv-center sv-reveal">
            <p className="sv-tag sv-reveal">Services - Penaxis</p>
            <h1 className="sv-reveal">
              Four ways
              <br />
              we build growth.
            </h1>
            <p className="sv-body sv-reveal">
              AI-powered products, digital transformation, fractional sales,
              and the web/CRM/software systems that hold it all together.
              Scroll to move through each one.
            </p>
            <div className="sv-cta-row sv-reveal">
              <a className="sv-cta" href="#" data-scene-jump="1">
                Start
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 6h10M6 1l5 5-5 5" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* 4 SERVICES */}
        {services.map((svc, i) => (
          <section key={svc.slug} className="sv-section">
            <div className={`sv-card ${i % 2 === 1 ? "sv-right" : ""} sv-reveal`}>
              <div className="sv-hline sv-reveal" />
              <p className="sv-tag sv-reveal">{svc.number} - {svc.title}</p>
              <h2 className="sv-reveal">{svc.title}</h2>
              <p className="sv-body sv-reveal">{svc.short}</p>
              <div className="sv-cta-row sv-reveal">
                <a className="sv-cta-back" href="#" data-scene-jump={i}>
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M11 6H1M6 11L1 6l5-5" />
                  </svg>
                  Back
                </a>
                <a className="sv-cta" href="#" data-scene-jump={i + 2}>
                  {i === services.length - 1 ? "Finish" : "Next"}
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 6h10M6 1l5 5-5 5" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        ))}

        {/* OUTRO */}
        <section className="sv-section sv-outro">
          <div className="sv-card sv-center sv-reveal">
            <p className="sv-tag sv-reveal">Let's build</p>
            <h2 className="sv-reveal">
              Ready when
              <br />
              you are.
            </h2>
            <p className="sv-body sv-reveal">
              Tell us what you're building and we'll tell you which of these
              four fits - or how we'd combine them.
            </p>
            <div className="sv-cta-row sv-reveal">
              <a className="sv-cta-back" href="#" data-scene-jump="4">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M11 6H1M6 11L1 6l5-5" />
                </svg>
                Back
              </a>
              <a className="sv-cta" href="/#contact">
                Start a project
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 6h10M6 1l5 5-5 5" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
