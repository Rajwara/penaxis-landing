"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import CountStat from "./CountStat";
import { missionVision, momentum, stats } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const chartRef = useRef<HTMLDivElement>(null);
  const max = Math.max(...momentum.map((m) => m.value));

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const bars = el.querySelectorAll(".momentum-bar");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bars,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          transformOrigin: "bottom",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        }
      );
    }, chartRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal as="p" className="eyebrow text-ember-500 mb-5">
              About Us
            </Reveal>
            <Reveal>
              <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight text-ink mb-6">
                We Build, Transform &amp;{" "}
                <span className="text-violet-600">Accelerate Businesses</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-ink/65 text-lg leading-relaxed max-w-xl">
                Penaxis combines AI, software development, digital strategy,
                and sales expertise to help businesses operate smarter and
                grow faster. We turn ideas into scalable solutions, stronger
                digital experiences, and measurable commercial opportunities.
              </p>
            </Reveal>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {missionVision.map((m, i) => (
                <Reveal key={m.label} delay={0.1 * i}>
                  <div className="rounded-2xl border border-violet-100 bg-white p-6 h-full card-hover">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-ember-500/10 text-ember-500 mb-4">
                      {m.icon === "target" ? <TargetIcon /> : <EyeIcon />}
                    </span>
                    <h3 className="font-display font-semibold text-lg text-violet-700 mb-2">
                      {m.label}
                    </h3>
                    <p className="text-sm text-ink/60 leading-relaxed">
                      {m.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-violet-100 bg-white p-8">
              <p className="eyebrow text-violet-600 mb-1">
                Project Delivery Momentum
              </p>
              <p className="text-xs text-ink/45 mb-8">
                Milestones shipped per quarter
              </p>
              <div
                ref={chartRef}
                className="flex items-end justify-between gap-3 h-48"
              >
                {momentum.map((m) => (
                  <div
                    key={m.period}
                    className="flex-1 flex flex-col items-center gap-3"
                  >
                    <div className="w-full h-40 flex items-end">
                      <div
                        className="momentum-bar w-full rounded-t-lg bg-gradient-to-t from-violet-600 to-violet-400"
                        style={{ height: `${(m.value / max) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-ink/45 eyebrow tracking-tight">
                      {m.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 rounded-3xl bg-ink text-white px-8 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <div className="font-display font-bold text-3xl md:text-4xl text-volt">
                  <CountStat
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                </div>
                <p className="text-xs text-white/55 mt-2 leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TargetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12S5.5 5 12 5s10 7 10 7-3.5 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
