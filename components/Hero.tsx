"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".hero-line",
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
          "-=0.25"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          ".hero-canvas-wrap",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1.1 },
          "-=0.9"
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
    >
      {/* Ambient background rings, echoing the brand's orbit motif */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] orbit-ring" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] orbit-ring" />
        <div className="absolute inset-0 bg-gradient-to-b from-haze/70 via-paper to-paper" />
      </div>

      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center w-full">
        <div>
          <p className="hero-eyebrow eyebrow text-violet-600 mb-6">
            Company Profile 2026
          </p>
          <h1 className="font-display font-bold text-[13vw] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5.2rem] tracking-tight text-ink">
            <span className="hero-line block">Growth &amp;</span>
            <span className="hero-line block">Technology</span>
            <span className="hero-line block text-violet-600">Partner</span>
          </h1>
          <p className="hero-sub mt-7 text-lg text-ink/65 max-w-md leading-relaxed">
            From websites and CRMs to MVPs and sales pipelines, we help
            businesses scale smarter.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#contact"
              className="hero-cta rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-4 text-sm"
            >
              Let&apos;s Build Together
            </MagneticButton>
            <MagneticButton
              href="#services"
              className="hero-cta rounded-full border border-ink/15 hover:border-violet-400 text-ink font-semibold px-8 py-4 text-sm"
            >
              Explore Services →
            </MagneticButton>
          </div>

          <div className="hero-cta mt-14 flex items-center gap-6 text-xs text-ink/50 eyebrow">
            <span>9 Regions</span>
            <span className="w-1 h-1 rounded-full bg-ink/25" />
            <span>14+ Countries</span>
            <span className="w-1 h-1 rounded-full bg-ink/25" />
            <span>30+ Professionals</span>
          </div>
        </div>

        <div className="hero-canvas-wrap relative h-[380px] sm:h-[460px] lg:h-[560px]">
          <Hero3D />
        </div>
      </div>
    </section>
  );
}
