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
// GSAP ScrollTrigger pin+scrub pattern, against native scrolling
// (no Locomotive Scroll, which would conflict with this site's other
// scroll-driven sections). Four equal-width cards, one per real
// Penaxis service, each with a heading and a paragraph of copy.

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
          {services.map((svc, i) => (
            <div key={svc.slug} className={`hg-pin-panel hg-pin-panel--${THEMES[i % THEMES.length]}`}>
              <span className="hg-pin-panel-title">{svc.title}</span>
              <p className="hg-pin-panel-desc">{svc.short}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
