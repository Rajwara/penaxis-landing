"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// The pinned horizontal-scroll photo/panel gallery that used to be
// part of HorizontalGallery, split out into its own component so it
// can live on /home-v2 only, while the main homepage no longer
// includes it (HorizontalGallery there is now intro/video/press only).

export default function PinnedGallery() {
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

    const refreshPin = () => {
      const pinWrapWidth = pinWrap.scrollWidth;
      const horizontalScrollLength = Math.max(0, pinWrapWidth - window.innerWidth);
      if (tween?.scrollTrigger) {
        tween.scrollTrigger.vars.end = `+=${Math.max(horizontalScrollLength, window.innerHeight * 0.5)}`;
      }
      ScrollTrigger.refresh();
    };

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
              width: (idx) => (idx === i ? undefined : "18vw"),
              duration: 2,
              ease: "elastic(1, .6)",
              onComplete: refreshPin,
            });
            gsap.to(card, {
              width: clicked[i] ? "46vw" : "34vw",
              height: clicked[i] ? "92vh" : "70vh",
              duration: 2.5,
              ease: "elastic(1, .3)",
              onComplete: refreshPin,
            });
            if (!clicked.some(Boolean)) {
              gsap.to(cards, { width: "34vw", duration: 2, ease: "elastic(1, .6)", onComplete: refreshPin });
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
    <div ref={pinOuterRef} className="hg-pin-outer">
      <div ref={pinWrapRef} className="hg-pin-wrap">
        <h2 className="hg-pin-heading">
          AI-powered products, digital transformation, fractional sales,
          and the web/CRM/software systems that hold it all together.
        </h2>
        <div ref={cardsRef} style={{ display: "contents" }}>
          <img
            className="hg-pin-img hg-card"
            src="/images/hero/team-huddle.jpg"
            alt="The Penaxis team"
          />
          <div className="hg-pin-panel hg-pin-panel--violet hg-card">
            <span className="hg-pin-panel-title">AI-Powered MVPs</span>
            <p className="hg-pin-panel-desc">
              Turning ideas into launch-ready SaaS products, AI assistants,
              automation tools, and scalable MVPs built for real-world
              validation and growth.
            </p>
          </div>
          <div className="hg-pin-panel hg-pin-panel--ember hg-card">
            <span className="hg-pin-panel-title">Fractional Growth</span>
            <p className="hg-pin-panel-desc">
              Providing dedicated sales and growth support to identify
              prospects, generate qualified leads, build pipelines, and
              convert opportunities into revenue.
            </p>
          </div>
          <div className="hg-pin-panel hg-pin-panel--volt hg-card">
            <span className="hg-pin-panel-title">Web &amp; CRM Systems</span>
            <p className="hg-pin-panel-desc">
              Building and integrating the websites, CRMs, and custom
              software that keep a growing business running smoothly day
              to day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
