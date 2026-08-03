"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { contact } from "@/lib/data";
import { submitForm } from "@/lib/submitForm";

// Two-column contact section: gradient background, eyebrow + headline
// + a 3-card info row (email/phone/location) and social pills on the
// left, a form card on the right. Layout inspired by a generic
// agency-template contact section; content, colors, and copy are all
// Penaxis's own. Submits to /api/contact, which emails the submission
// to the Penaxis mailbox via Hostinger SMTP. Added an email field (not
// in the original layout) since a reply-to address is required to
// actually get back to whoever submits. The "Add an attachment" button
// stays decorative — file uploads need separate storage wiring and
// weren't part of this pass.

const INFO_CARDS = [
  {
    label: "E-mail address",
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2z" />
      </svg>
    ),
  },
  {
    label: "Our Location",
    value: contact.address,
    href: null,
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await submitForm("Contact page", form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative bg-haze/50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Info cards row */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20">
          {INFO_CARDS.map((card, i) => {
            const Wrapper = card.href ? "a" : "div";
            return (
              <Reveal as="div" key={card.label} delay={i * 0.12} y={36} scale={0.94} duration={0.7}>
                <Wrapper
                  {...(card.href ? { href: card.href } : {})}
                  className="block rounded-3xl bg-white p-8 text-center shadow-[0_20px_45px_-12px_rgba(46,31,66,0.18)] hover:-translate-y-1.5 transition-transform duration-300"
                >
                  <span className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-ink text-white mb-5 shadow-[0_14px_24px_-6px_rgba(33,33,33,0.55)]">
                    {card.icon}
                  </span>
                  <div className="font-display font-bold text-xl text-ink">{card.label}</div>
                  <div className="text-base text-ink/55 mt-1.5">{card.value}</div>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left column */}
          <div>
            <Reveal as="div" y={24} scale={0.96}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm px-4 py-1.5 text-xs font-semibold text-violet-700">
                <span className="w-1.5 h-1.5 rounded-full bg-ember-500" />
                Contact
              </span>
              <h2 className="mt-5 font-display font-bold text-4xl md:text-5xl text-ink leading-tight">
                Let's build
                <br />
                what's next.
              </h2>
              <p className="mt-4 max-w-md text-ink/60 text-lg">
                Combining strategy, technology, and execution to build systems
                that think, adapt, and grow. Tell us what you're working on.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-wrap gap-3">
              {SOCIALS.map((s, i) => (
                <Reveal as="div" key={s.label} delay={i * 0.08} y={20} scale={0.94}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-white shadow-[0_10px_25px_-8px_rgba(46,31,66,0.2)] px-5 py-3 text-sm font-semibold text-ink hover:-translate-y-0.5 transition-transform"
                  >
                    {s.label}
                    <span className="w-7 h-7 rounded-full bg-ink text-white flex items-center justify-center text-[0.65rem]">
                      →
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right column — form card */}
          <Reveal as="div" delay={0.15} y={40} scale={0.95} className="rounded-3xl bg-white shadow-[0_25px_60px_-15px_rgba(46,31,66,0.22)] p-8 md:p-10">
            <h3 className="font-display font-bold text-2xl text-ink mb-6">Fill this form below</h3>
            {status === "success" ? (
              <div className="rounded-2xl border border-emerald-600/20 bg-emerald-50 px-6 py-8 text-center">
                <p className="font-semibold text-emerald-800 mb-1">Thanks — message sent!</p>
                <p className="text-sm text-emerald-700/80">We&apos;ll get back to you within one business day.</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm font-medium text-violet-700 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="border-b border-ink/10 pb-2">
                  <label className="text-xs font-semibold text-ink/70">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="block w-full mt-1 bg-transparent text-ink placeholder:text-ink/35 focus:outline-none"
                  />
                </div>
                <div className="border-b border-ink/10 pb-2">
                  <label className="text-xs font-semibold text-ink/70">Your Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="block w-full mt-1 bg-transparent text-ink placeholder:text-ink/35 focus:outline-none"
                  />
                </div>
                <div className="border-b border-ink/10 pb-2">
                  <label className="text-xs font-semibold text-ink/70">Your Phone</label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="block w-full mt-1 bg-transparent text-ink placeholder:text-ink/35 focus:outline-none"
                  />
                </div>
                <div className="border-b border-ink/10 pb-2">
                  <label className="text-xs font-semibold text-ink/70">More About The Project</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us a bit about what you're building"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="block w-full mt-1 bg-transparent text-ink placeholder:text-ink/35 focus:outline-none resize-none"
                  />
                </div>

                <button type="button" className="flex items-center gap-2 text-sm text-ink/40 cursor-not-allowed" title="File attachments aren't wired up yet">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.49" />
                  </svg>
                  Add an attachment
                </button>

                {status === "error" && (
                  <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-grad w-full py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending…" : "Submit Message"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
