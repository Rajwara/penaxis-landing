import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import {
  stats,
  services,
  industries,
  whyUs,
  team,
  contact,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Penaxis — AI-Powered Growth",
  description: "A fresh homepage concept for Penaxis, inspired by modern AI-agency layouts.",
};

// Rebuilt to closely match the visual STRUCTURE of a purchased
// commercial template's homepage (section-by-section layout, dark
// navy + neon-accent aesthetic, card shapes, flow) — using Penaxis's
// own ink + volt-green + violet palette (not the template's literal
// hex values), original CSS/SVG graphics instead of its bundled
// photos/3D renders, and 100% real Penaxis content. Two sections from
// the reference (testimonials, blog posts) are intentionally left out
// — there's no real client testimonial or blog content to put there,
// and inventing fake quotes/posts would be misleading.

const FEATURES = [
  { title: "AI-Powered Insights", copy: "Real data, real decisions — automation and modern workflows that speed everything up." },
  { title: "Integrated Systems", copy: "We wire your CRM, AI tools, and workflows together, so nothing lives in a silo." },
  { title: "End-to-End Delivery", copy: "Strategy, design, technology, and growth — handled by one accountable team." },
];

const PROJECT_CARDS = [
  { title: "AI-Powered MVP Development", industry: "Software / SaaS", country: "Pakistan · Remote", theme: "violet" },
  { title: "Digital Transformation Programs", industry: "Enterprise Ops", country: "GCC · UK", theme: "ember" },
  { title: "Fractional Sales & Growth", industry: "B2B / SaaS", country: "North America", theme: "volt" },
  { title: "Web, CRM & Software Solutions", industry: "Multi-industry", country: "Global", theme: "void" },
];

const ICONS: Record<string, JSX.Element> = {
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 2c3 2 5 6 5 10 0 2-1 4-2 5l-1 3-2-2-2 2-1-3c-1-1-2-3-2-5 0-4 2-8 5-10z" />
      <circle cx="12" cy="10" r="1.5" />
    </svg>
  ),
  badge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="9" r="5" /><path d="M8 13.5 6 21l6-3 6 3-2-7.5" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 3 3 8l9 5 9-5-9-5z" /><path d="M3 13l9 5 9-5" />
    </svg>
  ),
  cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="6" y="6" width="12" height="12" rx="1.5" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 12a8 8 0 1 1-3.2-6.4L21 4l-1 4.5A8 8 0 0 1 21 12z" />
    </svg>
  ),
};

const INDUSTRY_ICON_SET = [ICONS.cpu, ICONS.rocket, ICONS.layers, ICONS.badge, ICONS.chat, ICONS.target];

export default function HomeAivoraPage() {
  return (
    <>
      <Navbar />
      <main className="bg-ink text-paper overflow-x-hidden">
        {/* ===== HERO ===== */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute -top-40 right-[-10%] w-[520px] h-[520px] rounded-full bg-violet-700/25 blur-[120px]" />
          <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1fr_auto] gap-10 items-start">
            <div>
              <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.05] max-w-2xl">
                Empower your business with smarter growth systems
              </h1>
              <p className="mt-5 max-w-lg text-white/55">
                Unlock growth and efficiency with tailored AI and software
                solutions. We use automation and data-driven strategy to help
                you innovate and scale.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#D6F23C] text-ink font-bold px-6 py-3.5 hover:brightness-95 transition">
                  Book Free Consultancy →
                </a>
              </div>
            </div>
            <div className="hidden lg:flex w-40 h-40 rounded-full border border-white/10 items-center justify-center relative shrink-0 mt-2">
              <div className="absolute inset-3 rounded-full border border-[#D6F23C]/30 animate-[spin_18s_linear_infinite]" />
              <svg viewBox="0 0 24 24" className="w-14 h-14 text-[#D6F23C]" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
              </svg>
            </div>
          </div>

          <div className="relative max-w-6xl mx-auto mt-16 grid sm:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <Reveal as="div" key={f.title} delay={i * 0.08} className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                <div className="w-11 h-11 rounded-xl bg-[#D6F23C]/15 text-[#D6F23C] flex items-center justify-center mb-4">
                  {ICONS.cpu}
                </div>
                <h3 className="font-display font-bold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.copy}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== WHY US TEXT + 3 TILES ===== */}
        <section className="py-20 px-6">
          <Reveal as="div" className="max-w-3xl mx-auto text-center mb-12">
            <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#D6F23C] mb-3">— Why Us —</div>
            <h2 className="font-display font-bold text-2xl md:text-4xl leading-tight">
              We help ambitious businesses grow and scale with data-driven, AI-powered execution.
            </h2>
          </Reveal>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Reveal as="div" className="h-56 rounded-2xl bg-gradient-to-br from-violet-700 to-violet-900">{null}</Reveal>
            <Reveal as="div" delay={0.08} className="h-56 rounded-2xl bg-gradient-to-br from-ember-400 to-ember-600">{null}</Reveal>
            <Reveal as="div" delay={0.16} className="h-56 rounded-2xl bg-gradient-to-br from-[#eaffa0] to-[#a7bd2c]">{null}</Reveal>
          </div>
        </section>

        {/* ===== SERVICES: tabs + preview ===== */}
        <section className="py-20 px-6">
          <Reveal as="div" className="max-w-3xl mx-auto text-center mb-12">
            <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#D6F23C] mb-3">— Our Services —</div>
            <h2 className="font-display font-bold text-2xl md:text-4xl">Helping you grow with the power of AI</h2>
          </Reveal>
          <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 overflow-hidden grid md:grid-cols-[repeat(3,minmax(0,1fr))_2fr]">
            {services.slice(0, 3).map((svc, i) => (
              <div key={svc.slug} className={`p-6 flex items-center justify-center text-center border-white/10 ${i > 0 ? "border-l" : ""}`}>
                <span className="font-display font-semibold text-sm">{svc.title}</span>
              </div>
            ))}
            <div className="bg-white/[0.04] p-8 border-l border-white/10">
              <h3 className="font-display font-bold text-xl mb-2">{services[3].title}</h3>
              <p className="text-sm text-white/55 mb-5 max-w-sm">{services[3].short}</p>
              <div className="h-32 rounded-xl bg-gradient-to-br from-violet-700 to-violet-900 mb-5" />
              <a href="/services" className="inline-flex items-center gap-2 rounded-full bg-[#D6F23C] text-ink text-sm font-bold px-5 py-2.5">
                Read more →
              </a>
            </div>
          </div>
        </section>

        {/* ===== MISSION / WHY CHOOSE US ===== */}
        <section className="py-20 px-6 bg-white/[0.02]">
          <Reveal as="div" className="max-w-3xl mx-auto text-center mb-14">
            <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#D6F23C] mb-3">— Why Should Choose Us —</div>
            <h2 className="font-display font-bold text-2xl md:text-4xl">Your success is our mission</h2>
          </Reveal>
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
            <div className="grid gap-4">
              {whyUs.slice(0, 3).map((w, i) => (
                <Reveal as="div" key={w.title} delay={i * 0.06} className="flex gap-3 items-start">
                  <span className="w-9 h-9 shrink-0 rounded-lg bg-[#D6F23C]/15 text-[#D6F23C] flex items-center justify-center">
                    {ICONS[w.icon] ?? ICONS.target}
                  </span>
                  <div>
                    <div className="font-semibold text-sm">{w.title}</div>
                    <p className="text-xs text-white/45 mt-1">{w.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="w-40 h-40 rounded-full mx-auto bg-gradient-to-br from-violet-600 via-[#D6F23C]/60 to-violet-900 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-ink flex items-center justify-center">
                <span className="font-display font-bold text-xs text-white/70">PENAXIS</span>
              </div>
            </div>

            <div className="grid gap-4">
              {whyUs.slice(3, 6).map((w, i) => (
                <Reveal as="div" key={w.title} delay={i * 0.06} className="flex gap-3 items-start">
                  <span className="w-9 h-9 shrink-0 rounded-lg bg-[#D6F23C]/15 text-[#D6F23C] flex items-center justify-center">
                    {ICONS[w.icon] ?? ICONS.target}
                  </span>
                  <div>
                    <div className="font-semibold text-sm">{w.title}</div>
                    <p className="text-xs text-white/45 mt-1">{w.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-14 flex flex-wrap justify-center items-center gap-8 opacity-60 text-xs font-mono tracking-widest uppercase">
            <span>Featured in</span>
            <img src="/images/press/breakit.svg" alt="Breakit" className="h-4 invert" />
            <img src="/images/press/forbes.svg" alt="Forbes" className="h-4 invert" />
            <img src="/images/press/etn.svg" alt="ETN" className="h-4 invert" />
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section className="py-20 px-6">
          <Reveal as="div" className="max-w-3xl mx-auto text-center mb-14">
            <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#D6F23C] mb-3">— Our Projects —</div>
            <h2 className="font-display font-bold text-2xl md:text-4xl">See the results that reflect our hard work</h2>
          </Reveal>
          <div className="max-w-4xl mx-auto grid gap-5">
            {PROJECT_CARDS.map((p, i) => (
              <Reveal
                as="div"
                key={p.title}
                delay={i * 0.06}
                className="rounded-2xl border border-white/10 bg-white/[0.03] grid md:grid-cols-[1fr_1fr] overflow-hidden"
              >
                <div className="p-7">
                  <h3 className="font-display font-bold text-xl mb-2">{p.title}</h3>
                  <p className="text-sm text-white/50 mb-4">
                    Industry: <span className="text-white/70">{p.industry}</span> · Location:{" "}
                    <span className="text-white/70">{p.country}</span>
                  </p>
                  <a href="/case-studies" className="inline-flex items-center gap-2 rounded-full bg-[#D6F23C] text-ink text-xs font-bold px-4 py-2">
                    Read more →
                  </a>
                </div>
                <div
                  className={`min-h-[140px] ${
                    p.theme === "violet"
                      ? "bg-gradient-to-br from-violet-600 to-violet-900"
                      : p.theme === "ember"
                      ? "bg-gradient-to-br from-ember-400 to-ember-600"
                      : p.theme === "volt"
                      ? "bg-gradient-to-br from-[#eaffa0] to-[#a7bd2c]"
                      : "bg-gradient-to-br from-[#2e1f42] to-ink"
                  }`}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== INDUSTRIES ===== */}
        <section className="py-20 px-6 bg-white/[0.02]">
          <Reveal as="div" className="max-w-3xl mx-auto text-center mb-12">
            <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#D6F23C] mb-3">— Industries Served —</div>
            <h2 className="font-display font-bold text-2xl md:text-4xl">Industries we served with tech</h2>
          </Reveal>
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
            {industries.slice(0, 7).map((ind, i) => (
              <Reveal
                as="div"
                key={ind.title}
                delay={i * 0.04}
                className="w-24 flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-5"
              >
                <span className="w-9 h-9 text-[#D6F23C]">{INDUSTRY_ICON_SET[i % INDUSTRY_ICON_SET.length]}</span>
                <span className="text-[0.65rem] text-center text-white/55 leading-tight px-1">{ind.title}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== TRUSTED STATS + CONTACT FORM ===== */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <Reveal as="div" className="rounded-3xl bg-gradient-to-br from-violet-600 to-violet-900 p-10 flex flex-col justify-center">
              <div className="text-xs font-mono tracking-[0.25em] uppercase text-white/70 mb-4">— We Are Trusted —</div>
              <h3 className="font-display font-bold text-2xl mb-6">Growth & technology agency</h3>
              <div className="flex gap-10">
                {stats.slice(0, 2).map((s) => (
                  <div key={s.label}>
                    <div className="font-display font-extrabold text-3xl">
                      {s.prefix}{s.value}{s.suffix}
                    </div>
                    <div className="text-xs text-white/60 mt-1 max-w-[9rem]">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal as="div" delay={0.1} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h3 className="font-display font-bold text-xl mb-1">Ready to collaborate with us?</h3>
              <p className="text-sm text-white/45 mb-6">Tell us a bit about your project and we'll follow up within a day.</p>
              <div className="space-y-3">
                <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/40">Your name</div>
                <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/40">Email address</div>
                <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/40">Project details</div>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D6F23C] text-ink text-sm font-bold px-5 py-3 mt-2"
                >
                  Send message →
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== TEAM (replacing testimonials — no real client quotes to show) ===== */}
        <section className="py-20 px-6 bg-white/[0.02]">
          <Reveal as="div" className="max-w-3xl mx-auto text-center mb-12">
            <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#D6F23C] mb-3">— The Team —</div>
            <h2 className="font-display font-bold text-2xl md:text-4xl">Meet the people building it</h2>
          </Reveal>
          <div className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-6">
            {team.map((m, i) => (
              <Reveal as="div" key={m.name} delay={(i % 7) * 0.05} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-violet-500 to-violet-800 flex items-center justify-center font-display font-bold text-xs">
                  {m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="mt-2 text-[0.65rem] font-semibold text-white/80">{m.name}</div>
                <div className="text-[0.6rem] text-white/40">{m.role}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== GIANT WORDMARK ===== */}
        <div className="py-10 text-center select-none">
          <span className="font-display font-black text-[16vw] leading-none text-white/5">PENAXIS</span>
        </div>
      </main>
      <Footer />
    </>
  );
}
