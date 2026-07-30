import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { stats, missionVision, services, industries, team, momentum, contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Penaxis — AI-Powered Growth",
  description: "A fresh homepage concept for Penaxis, inspired by modern AI-agency layouts.",
};

// A new homepage design: inspired by the general section flow of a
// modern AI-agency template (full-bleed hero + proof strip, about,
// services, brand strip, momentum/stats, team, industries, CTA) —
// built from scratch with Penaxis's real content, colors, and
// existing components/data, not that template's specific images,
// illustrations, or copy.

export default function HomeAivoraPage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper text-ink">
        {/* HERO */}
        <section className="relative min-h-screen flex flex-col justify-center bg-ink text-paper overflow-hidden pt-28 pb-16 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(115,79,160,0.35),transparent)]" />
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-violet-300 mb-6">
              <span className="w-6 h-px bg-violet-300" />
              AI · Software · Growth
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[0.95] tracking-tight">
              AI-powered growth,
              <br />
              <span className="text-violet-300">engineered for you.</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-white/60 text-lg">
              Penaxis builds the AI products, software, and sales pipelines
              that help ambitious businesses scale — faster than they thought
              possible.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-violet-500 hover:bg-violet-600 transition-colors text-white font-semibold px-7 py-3.5"
              >
                Start a project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </a>
              <a
                href="/services"
                className="inline-flex items-center rounded-full border border-white/25 hover:border-white/50 transition-colors text-white font-semibold px-7 py-3.5"
              >
                Explore services
              </a>
            </div>
          </div>

          {/* Proof strip */}
          <div className="relative mt-20 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display font-bold text-2xl md:text-3xl text-violet-300">
                  {s.prefix}
                  {s.value}
                  {s.suffix}
                </div>
                <div className="mt-1 text-[0.7rem] uppercase tracking-wide text-white/45">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT / MISSION-VISION */}
        <section className="py-24 px-6">
          <Reveal as="div" className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-xs font-mono tracking-[0.25em] uppercase text-violet-600 mb-3">Who we are</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              A growth & technology partner, not just another vendor.
            </h2>
          </Reveal>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {missionVision.map((m, i) => (
              <Reveal as="div" key={m.label} delay={i * 0.1} className="rounded-3xl bg-haze p-8">
                <div className="text-xs font-mono uppercase tracking-widest text-violet-600 mb-2">{m.label}</div>
                <p className="text-ink/70 leading-relaxed">{m.copy}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-24 px-6 bg-ink text-paper">
          <Reveal as="div" className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-xs font-mono tracking-[0.25em] uppercase text-violet-300 mb-3">What we do</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl">Four ways we help you grow</h2>
          </Reveal>
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <Reveal as="div" key={svc.slug} delay={i * 0.08} className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <div className="font-mono text-xs text-violet-300 mb-4">{svc.number}</div>
                <h3 className="font-display font-bold text-lg mb-2">{svc.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{svc.short}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* MOMENTUM */}
        <section className="py-24 px-6">
          <Reveal as="div" className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-xs font-mono tracking-[0.25em] uppercase text-violet-600 mb-3">Momentum</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl">Growing quarter over quarter.</h2>
          </Reveal>
          <div className="max-w-3xl mx-auto flex items-end justify-between gap-3 h-48">
            {momentum.map((m, i) => {
              const max = Math.max(...momentum.map((x) => x.value));
              const heightPct = (m.value / max) * 100;
              return (
                <Reveal as="div" key={m.period} delay={i * 0.08} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-violet-700 to-violet-400"
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[0.65rem] font-mono text-ink/50">{m.period}</span>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* INDUSTRIES STRIP */}
        <section className="py-20 px-6 bg-haze">
          <Reveal as="div" className="max-w-3xl mx-auto text-center mb-12">
            <div className="text-xs font-mono tracking-[0.25em] uppercase text-violet-600 mb-3">Where we work</div>
            <h2 className="font-display font-bold text-2xl md:text-3xl">13 industries, one team</h2>
          </Reveal>
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-3">
            {industries.map((ind) => (
              <span
                key={ind.title}
                className="rounded-full bg-white border border-violet-100 px-4 py-2 text-sm text-ink/70"
              >
                {ind.title}
              </span>
            ))}
          </div>
        </section>

        {/* TEAM */}
        <section className="py-24 px-6">
          <Reveal as="div" className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-xs font-mono tracking-[0.25em] uppercase text-violet-600 mb-3">The people</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl">Meet the team building it.</h2>
          </Reveal>
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6">
            {team.map((member, i) => (
              <Reveal as="div" key={member.name} delay={(i % 7) * 0.05} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-violet-400 to-violet-700 flex items-center justify-center text-white font-display font-bold">
                  {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="mt-2 text-xs font-semibold">{member.name}</div>
                <div className="text-[0.65rem] text-ink/45">{member.role}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <Reveal as="div" className="max-w-5xl mx-auto rounded-[2.5rem] bg-ink text-paper px-10 py-16 text-center">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl mb-4">
              Let's build your <span className="text-violet-300">next chapter.</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              Tell us what you're working on — we'll follow up within one
              business day.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-white text-ink font-semibold px-7 py-3.5"
            >
              Start a project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
