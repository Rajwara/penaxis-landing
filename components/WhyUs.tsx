"use client";

import Reveal from "./Reveal";
import { whyUs } from "@/lib/data";

const icons: Record<string, JSX.Element> = {
  target: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  ),
  rocket: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 15l4 4M13 4c3 1 6 4 7 7-3 1-6 2-8 4-2-2-3-5-4-8 1-2 3-2 5-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  badge: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l2.4 2.4H18v3.6L20.4 12 18 14.4V18h-3.6L12 20.4 9.6 18H6v-3.6L3.6 12 6 9.6V6h3.6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  ),
  layers: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3 3 8l9 5 9-5-9-5ZM3 16l9 5 9-5M3 12l9 5 9-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  cpu: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect
        x="7"
        y="7"
        width="10"
        height="10"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  chat: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 5h16v11H8l-4 4V5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-16">
          <div>
            <Reveal as="p" className="eyebrow text-ember-500 mb-4">
              Why Choose Us
            </Reveal>
            <Reveal>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight mb-6">
                Insight-led execution, not{" "}
                <span className="text-violet-600">guesswork.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-ink/60 leading-relaxed max-w-md mb-10">
                We partner with businesses across diverse industries,
                delivering digital solutions that solve real challenges and
                drive measurable growth.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-4">
              <Reveal>
                <div className="rounded-2xl bg-ember-500 text-white p-6 h-full">
                  <p className="font-display font-bold text-3xl mb-1">12+</p>
                  <p className="text-xs text-white/85 leading-snug">
                    Industries served with insight-led execution
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="rounded-2xl bg-violet-900 text-white p-6 h-full">
                  <p className="font-display font-bold text-3xl mb-1">4</p>
                  <p className="text-xs text-white/70 leading-snug">
                    Core verticals — Strategy, Design, Technology, Growth
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-violet-100 p-6 h-full">
                  <p className="font-display font-bold text-3xl text-violet-700 mb-1">
                    100%
                  </p>
                  <p className="text-xs text-ink/55">Client Satisfaction</p>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="rounded-2xl border border-violet-100 p-6 h-full">
                  <p className="font-display font-bold text-3xl text-violet-700 mb-1">
                    24/7
                  </p>
                  <p className="text-xs text-ink/55">Future-Ready Execution</p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 content-start">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 0.06}>
                <div className="rounded-2xl border border-violet-100 bg-white p-6 h-full card-hover">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-violet-50 text-violet-600 mb-4">
                    {icons[item.icon]}
                  </span>
                  <h3 className="font-display font-semibold text-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink/55 leading-relaxed">
                    {item.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
