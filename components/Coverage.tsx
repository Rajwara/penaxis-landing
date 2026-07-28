"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import { regions, geoStats } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Coverage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".geo-pin",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: "back.out(2.4)",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        }
      );
      gsap.fromTo(
        ".geo-path",
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        }
      );
    }, mapRef);
    return () => ctx.revert();
  }, []);

  const pathD = regions
    .map((r, i) => `${i === 0 ? "M" : "L"} ${r.x} ${r.y}`)
    .join(" ");

  return (
    <section className="relative py-20 md:py-28 bg-haze/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <Reveal as="p" className="eyebrow text-ember-500 mb-4">
              Regions We Have Worked In
            </Reveal>
            <Reveal>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-ink">
                Geographical <span className="text-violet-600">Coverage</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-ink/60 mt-3 max-w-md">
                Supporting businesses across multiple international markets.
              </p>
            </Reveal>
          </div>
          <div className="flex gap-3 flex-wrap">
            {geoStats.map((g) => (
              <Reveal key={g.label} delay={0.05}>
                <div className="rounded-xl border border-violet-200 bg-white px-5 py-3 text-center min-w-[104px]">
                  <p className="font-display font-bold text-xl text-violet-700">
                    {g.value}
                  </p>
                  <p className="text-[11px] text-ink/50 eyebrow">{g.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div
            ref={mapRef}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl border border-violet-100 bg-white overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #C9BEF7 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d={pathD}
                fill="none"
                stroke="#734FA0"
                strokeWidth="0.25"
                strokeDasharray="1000"
                className="geo-path"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {regions.map((r) => (
              <button
                key={r.id}
                onMouseEnter={() => setActive(r.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(r.id)}
                onBlur={() => setActive(null)}
                className="geo-pin absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${r.x}%`, top: `${r.y}%` }}
              >
                <span className="relative flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-ember-500/20 node-pulse" />
                  <span className="w-3 h-3 rounded-full bg-ember-500 border-2 border-white shadow" />
                </span>
                <span
                  className={`absolute left-1/2 -translate-x-1/2 -top-10 whitespace-nowrap rounded-lg bg-ink text-white text-[11px] px-3 py-1.5 transition-opacity duration-200 ${
                    active === r.id
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <strong>{r.name}</strong>
                  <span className="block text-white/60">{r.detail}</span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
