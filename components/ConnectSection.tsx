"use client";

import Reveal from "./Reveal";
import { contact } from "@/lib/data";

// Ported layout from a reference "Let's Connect" split contact section:
// a cream form card on the left, a full-height photo on the right with a
// floating "call us" pill overlapping the bottom edge. Replaces CTA.tsx on
// the main homepage only (CTA.tsx / /home-v2 are untouched). Real Penaxis
// phone number + a real office photo; form is UI-only (no backend wired
// up yet), same as every other form on this site.

export default function ConnectSection() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[1fr_1.15fr] rounded-[2rem] overflow-hidden border border-ink/5 shadow-[0_30px_60px_-25px_rgba(46,31,66,0.15)]">
          {/* Left — form card */}
          <div className="bg-haze p-8 md:p-12">
            <Reveal>
              <span className="inline-flex rounded-full border border-ink/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink/60 mb-8">
                Schedule a Consultation
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-violet-900 mb-4">
                Let&apos;s Connect
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-ink/60 leading-relaxed max-w-md mb-8">
                Connect with our team for a free consultation and a plan
                tailored to your project.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Your name" placeholder="e.g. John Smith" />
                  <Field label="Email address" placeholder="e.g. john@email.com" type="email" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Phone number" placeholder="e.g. +1 222 444 66" type="tel" />
                  <Field label="Company name" placeholder="e.g. Acme Inc." />
                </div>
                <div>
                  <label className="block text-sm text-ink/70 mb-2">Your message</label>
                  <textarea
                    rows={4}
                    placeholder="Type here …"
                    className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-violet-600/30 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-full bg-violet-600 text-white font-semibold px-8 py-3.5 text-sm hover:bg-violet-700 transition-colors"
                >
                  Start a Conversation
                </button>
              </form>
            </Reveal>
          </div>

          {/* Right — photo + floating call pill */}
          <Reveal delay={0.1} className="relative min-h-[22rem] lg:min-h-[36rem]">
            <img
              src="/images/hero/team-huddle.jpg"
              alt="Penaxis team consultation"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute left-4 right-4 md:left-8 md:right-8 bottom-6 rounded-full bg-white/95 backdrop-blur-sm shadow-lg px-5 py-3.5 flex items-center gap-4">
              <span className="shrink-0 w-11 h-11 rounded-full bg-volt text-ink flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 2-2Z" />
                </svg>
              </span>
              <p className="text-sm text-ink/80 leading-snug">
                Call us at{" "}
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="font-semibold text-ink underline">
                  {contact.phone}
                </a>{" "}
                or fill out our form, and we&apos;ll contact you within one business day.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-ink/70 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-violet-600/30"
      />
    </div>
  );
}
