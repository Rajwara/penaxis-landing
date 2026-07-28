"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Reveal from "./Reveal";
import { services } from "@/lib/data";

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = services[activeIdx];

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [activeIdx]);

  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <Reveal as="p" className="eyebrow text-ember-500 mb-4">
            Our Services
          </Reveal>
          <Reveal>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight">
              From Strategy and Software to{" "}
              <span className="text-ember-500">
                Marketing and Sales Execution.
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-8">
          <Reveal className="flex lg:flex-col gap-3 overflow-x-auto scrollbar-thin pb-2 lg:pb-0">
            {services.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => setActiveIdx(i)}
                className={`text-left shrink-0 lg:shrink w-[240px] lg:w-auto rounded-2xl border px-5 py-4 transition-all duration-300 ${
                  activeIdx === i
                    ? "border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                    : "border-violet-100 bg-white hover:border-violet-300 text-ink"
                }`}
              >
                <span
                  className={`font-mono text-xs ${
                    activeIdx === i ? "text-violet-200" : "text-ink/35"
                  }`}
                >
                  {s.number}
                </span>
                <p className="font-display font-semibold mt-1 leading-snug">
                  {s.title}
                </p>
              </button>
            ))}
          </Reveal>

          <div
            ref={panelRef}
            className="rounded-3xl border border-violet-100 bg-white p-8 md:p-10"
          >
            <h3 className="font-display font-bold text-2xl md:text-3xl text-ink mb-4">
              {active.title}
            </h3>
            <p className="text-ink/60 leading-relaxed max-w-2xl mb-8">
              {active.long}
            </p>

            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {active.pillars.map((p, i) => (
                <div
                  key={p.title}
                  className="rounded-xl bg-haze/60 p-5 card-hover border border-transparent"
                >
                  <span className="font-mono text-xs text-violet-500">
                    {`0${i + 1}`}
                  </span>
                  <p className="font-semibold text-ink mt-1 mb-1.5 text-sm">
                    {p.title}
                  </p>
                  <p className="text-xs text-ink/55 leading-relaxed">
                    {p.copy}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <p className="eyebrow text-ink/40 mb-3">Engagement Types</p>
                <ul className="space-y-2">
                  {active.engagements.map((e) => (
                    <li
                      key={e}
                      className="flex items-start gap-2 text-sm text-ink/70"
                    >
                      <span className="text-ember-500 mt-0.5">▸</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-ink/40 mb-3">Tools &amp; Stack</p>
                <div className="flex flex-wrap gap-2">
                  {active.stack.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
