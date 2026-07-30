"use client";

import Reveal from "./Reveal";
import { contact } from "@/lib/data";

// Two-column contact section: gradient background, eyebrow + headline
// + a 3-card info row (email/phone/location) and social pills on the
// left, a form card on the right. Layout inspired by a generic
// agency-template contact section; content, colors, and copy are all
// Penaxis's own. Form is UI-only (no backend wired up) — matches how
// other forms on this site work. Facebook/Instagram links are
// best-guess placeholders, same as in the Footer, pending real URLs.

const INFO_CARDS = [
  {
    label: "E-mail address",
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m3 6 9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "Phone number",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2z" />
      </svg>
    ),
  },
  {
    label: "Our Location",
    value: contact.address,
    href: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
];

const SOCIALS = [
  { label: "LinkedIn", href: `https://linkedin.com${contact.linkedin}` },
  { label: "Facebook", href: "https://facebook.com/penaxis" },
  { label: "Instagram", href: "https://instagram.com/penaxis" },
  { label: "YouTube", href: "https://youtube.com/@penaxis" },
];

export default function ContactFormSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-300 via-white to-ember-400" />
      <div className="relative max-w-6xl mx-auto px-6 pt-20">
        {/* Info cards row */}
        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {INFO_CARDS.map((card, i) => {
            const Wrapper = card.href ? "a" : "div";
            return (
              <Reveal as="div" key={card.label} delay={i * 0.08} y={24}>
                <Wrapper
                  {...(card.href ? { href: card.href } : {})}
                  className="block rounded-2xl bg-paper/90 backdrop-blur shadow-md p-6 text-center hover:-translate-y-1 transition-transform"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-ink text-white mb-4">
                    {card.icon}
                  </span>
                  <div className="font-display font-bold text-ink">{card.label}</div>
                  <div className="text-sm text-ink/55 mt-1">{card.value}</div>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start pb-20">
          {/* Left column */}
          <div>
            <Reveal as="div" y={20}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold text-violet-700">
                <span className="w-1.5 h-1.5 rounded-full bg-ember-500" />
                Contact
              </span>
              <h2 className="mt-5 font-display font-bold text-4xl md:text-5xl text-ink leading-tight">
                Let's build
                <br />
                what's next.
              </h2>
              <p className="mt-4 max-w-md text-ink/60">
                Combining strategy, technology, and execution to build systems
                that think, adapt, and grow. Tell us what you're working on.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-wrap gap-3">
              {SOCIALS.map((s, i) => (
                <Reveal as="div" key={s.label} delay={i * 0.06} y={16}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-white/85 backdrop-blur px-5 py-2.5 text-sm font-semibold text-ink hover:bg-white transition-colors"
                  >
                    {s.label}
                    <span className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center text-[0.6rem]">
                      →
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right column — form card */}
          <Reveal as="div" delay={0.15} y={30} className="rounded-3xl bg-paper/95 backdrop-blur shadow-xl p-8 md:p-10">
            <h3 className="font-display font-bold text-2xl text-ink mb-6">Fill this form below</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="border-b border-ink/10 pb-2">
                <label className="text-xs font-semibold text-ink/70">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="block w-full mt-1 bg-transparent text-ink placeholder:text-ink/35 focus:outline-none"
                />
              </div>
              <div className="border-b border-ink/10 pb-2">
                <label className="text-xs font-semibold text-ink/70">Your Phone</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="block w-full mt-1 bg-transparent text-ink placeholder:text-ink/35 focus:outline-none"
                />
              </div>
              <div className="border-b border-ink/10 pb-2">
                <label className="text-xs font-semibold text-ink/70">More About The Project</label>
                <textarea
                  rows={3}
                  placeholder="Tell us a bit about what you're building"
                  className="block w-full mt-1 bg-transparent text-ink placeholder:text-ink/35 focus:outline-none resize-none"
                />
              </div>

              <button type="button" className="flex items-center gap-2 text-sm text-ink/60 hover:text-ink transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.49" />
                </svg>
                Add an attachment
              </button>

              <button
                type="submit"
                className="w-full rounded-full bg-ink hover:bg-ink/90 transition-colors text-white font-semibold py-4"
              >
                Submit Message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
