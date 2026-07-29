"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const THEMES = ["violet", "ember", "volt", "void"];

// Ported technique: a pinned section whose inner track scrolls
// horizontally as the page scrolls past it vertically — a generic
// GSAP ScrollTrigger pin+scrub pattern. The original reference paired
// this with Locomotive Scroll for its smooth-scroll feel, but that
// library takes over scrolling for the ENTIRE page, which would
// conflict with this site's other native-scroll-driven sections
// (the pinned zoom hero, starfield, etc.). This version gets the same
// horizontal-pin effect against ordinary native scrolling instead.
//
// Copy and the closing credit link ("Made by Beings") from the
// reference were not reused — everything here is written fresh for
// Penaxis. Two of the three gallery items are brand-gradient panels
// since real photography isn't available for them yet; the third
// uses the real Penaxis team photo already in the project.

export default function HorizontalGallery() {
  const pinOuterRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pinOuter = pinOuterRef.current;
    const pinWrap = pinWrapRef.current;
    if (!pinOuter || !pinWrap) return;

    if (prefersReduced) return;

    let tween: gsap.core.Tween | null = null;
    let rafId = 0;

    // Recompute the horizontal scroll distance whenever the track's total
    // width changes (e.g. a card expands/collapses on click).
    const refreshPin = () => {
      const pinWrapWidth = pinWrap.scrollWidth;
      const horizontalScrollLength = Math.max(0, pinWrapWidth - window.innerWidth);
      if (tween?.scrollTrigger) {
        tween.scrollTrigger.vars.end = `+=${Math.max(horizontalScrollLength, window.innerHeight * 0.5)}`;
      }
      ScrollTrigger.refresh();
    };

    const ctx = gsap.context(() => {
      // Delay one frame so layout (including image intrinsic sizing) is
      // settled before measuring widths — avoids a mis-measured, near-zero
      // scroll distance on first paint.
      rafId = requestAnimationFrame(() => {
        const pinWrapWidth = pinWrap.scrollWidth;
        const horizontalScrollLength = Math.max(0, pinWrapWidth - window.innerWidth);

        tween = gsap.to(pinWrap, {
          x: -horizontalScrollLength,
          ease: "none",
          scrollTrigger: {
            trigger: pinOuter,
            pin: true,
            scrub: true,
            start: "top top",
            end: () => `+=${Math.max(horizontalScrollLength, window.innerHeight * 0.5)}`,
            invalidateOnRefresh: true,
          },
        });

        ScrollTrigger.refresh();

        // Click-to-expand — same interaction as the Services accordion,
        // applied to the photo + two color panels in this track.
        const cards = cardsRef.current
          ? Array.from(cardsRef.current.querySelectorAll<HTMLElement>(".hg-card"))
          : [];
        const clicked = new Array(cards.length).fill(false);

        cards.forEach((card, i) => {
          card.addEventListener("click", () => {
            cards.forEach((_, idx) => {
              if (i !== idx) clicked[idx] = false;
            });
            clicked[i] = !clicked[i];
            cards.forEach((c, idx) => c.classList.toggle("is-expanded", clicked[idx]));

            gsap.to(cards, {
              width: (idx) => (idx === i ? undefined : "12vw"),
              duration: 2,
              ease: "elastic(1, .6)",
              onComplete: refreshPin,
            });
            gsap.to(card, {
              width: clicked[i] ? "50vw" : "30vw",
              duration: 2.5,
              ease: "elastic(1, .3)",
              onComplete: refreshPin,
            });
            if (!clicked.some(Boolean)) {
              gsap.to(cards, { width: "30vw", duration: 2, ease: "elastic(1, .6)", onComplete: refreshPin });
            }
          });
        });
      });
    }, pinOuter);

    return () => {
      cancelAnimationFrame(rafId);
      tween?.scrollTrigger?.kill();
      tween?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section className="hg-intro">
        <div className="hg-intro-eyebrow">From our founders</div>
        <h1>
          <span><i>Work that</i></span>
          <span><i>moves sideways</i></span>
        </h1>
        <p>Scroll through a few of the things Penaxis has been building lately.</p>
        <div className="hg-intro-video">
          <video controls poster="/images/hero/team-huddle.jpg" preload="metadata">
            {/* Swap this src once the real CEO/founder interview video is uploaded */}
            <source src="" type="video/mp4" />
          </video>
        </div>
        <div className="hg-intro-press">
          <div className="hg-intro-press-label">Featured in</div>
          <div className="hg-intro-press-row">
            <img src="/images/press/breakit.svg" alt="Breakit" />
            <img src="/images/press/forbes.svg" alt="Forbes" />
            <img src="/images/press/etn.svg" alt="ETN" />
            <img src="/images/press/fortune-logo.png" alt="Fortune" />
            <img src="/images/press/dagens-industri.png" alt="Dagens Industri" />
          </div>
        </div>
      </section>

      <div ref={pinOuterRef} className="hg-pin-outer">
        <div ref={pinWrapRef} className="hg-pin-wrap">
          <div ref={cardsRef} style={{ display: "contents" }}>
            {services.map((svc, i) => (
              <div
                key={svc.slug}
                className={`hg-pin-panel hg-pin-panel--${THEMES[i % THEMES.length]} hg-card`}
              >
                <span className="hg-pin-panel-num">{svc.number}</span>
                <span className="hg-pin-panel-title">{svc.title}</span>
                <span className="hg-pin-panel-desc">{svc.short}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
