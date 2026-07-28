"use client";

import Reveal from "./Reveal";
import { industries } from "@/lib/data";

export default function Industries() {
  return (
    <section id="industries" className="relative py-28 md:py-36 bg-haze/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <Reveal as="p" className="eyebrow text-ember-500 mb-4">
            Industries We Serve
          </Reveal>
          <Reveal>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink">
              Built for how <span className="text-violet-600">your</span>{" "}
              industry actually works.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-ink/60 mt-4">
              We partner with businesses across diverse industries, delivering
              digital solutions that solve real challenges and drive
              measurable growth.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.title} delay={(i % 6) * 0.05}>
              <div className="group rounded-2xl border border-violet-100 bg-white p-6 h-full card-hover">
                <span className="inline-flex w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-violet-400 mb-4 items-center justify-center text-white text-xs font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display font-semibold text-ink mb-2">
                  {ind.title}
                </h3>
                <p className="text-sm text-ink/55 leading-relaxed">
                  {ind.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
