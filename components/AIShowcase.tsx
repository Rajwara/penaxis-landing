"use client";

import dynamic from "next/dynamic";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

const ParticleX = dynamic(() => import("./ParticleX"), { ssr: false });

export default function AIShowcase() {
  return (
    <section data-nav-theme="dark" className="relative py-32 md:py-44 bg-ink overflow-hidden">
      <div className="absolute inset-0">
        <ParticleX />
      </div>

      {/* Readability scrim so copy stays legible over the particles */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal as="p" className="eyebrow text-volt mb-5">
          AI &amp; Automation
        </Reveal>
        <Reveal>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-white max-w-3xl">
            Human expertise.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-ember-400">
              AI-scale execution.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-white/55 text-lg max-w-lg mt-6 leading-relaxed">
            We actively use AI, automation, and modern workflows to improve
            efficiency and speed — without losing the strategic judgment
            that makes execution actually work.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10">
            <MagneticButton
              href="#services"
              className="rounded-full bg-white/10 border border-white/20 hover:border-volt hover:bg-white/15 text-white font-semibold px-8 py-4 text-sm inline-flex"
            >
              See how we build with AI →
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
