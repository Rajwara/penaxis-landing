"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pinOuter = pinOuterRef.current;
    const pinWrap = pinWrapRef.current;
    if (!pinOuter || !pinWrap) return;

    if (prefersReduced) return;

    let tween: gsap.core.Tween | null = null;
    let rafId = 0;

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
          <h2 className="hg-pin-heading">
            AI-powered products, digital transformation, fractional sales,
            and the web/CRM/software systems that hold it all together.
          </h2>
          <img
            className="hg-pin-img"
            src="/images/hero/team-huddle.jpg"
            alt="The Penaxis team"
          />
          <div className="hg-pin-panel hg-pin-panel--violet">AI-Powered MVPs</div>
          <div className="hg-pin-panel hg-pin-panel--ember">Fractional Growth</div>
        </div>
      </div>
    </>
  );
}
