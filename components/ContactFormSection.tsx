"use client";

import { contact } from "@/lib/data";

// Two-column contact section: gradient background, eyebrow + headline
// + email/phone info cards on the left, a form card on the right.
// Layout inspired by a generic agency-template contact section;
// content, colors, and copy are all Penaxis's own. Form is UI-only
// (no backend wired up) — matches how other forms on this site work.

export default function ContactFormSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-300 via-white to-ember-400" />
      <div className="relative max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold text-violet-700">
            <span className="w-1.5 h-1.5 rounded-full bg-ember-500" />
            Contact
          </span>
          <h2 className="mt-5 font-display font-bold text-4xl md:text-5xl text-ink leading-tight">
            Let's build
            <br />
            what's next.
          </h2>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m3 6 9 6 9-6" />
                </svg>
              </span>
              <div>
                <div className="text-xs text-ink/50">E-mail address</div>
                <a href={`mailto:${contact.email}`} className="font-semibold text-ink">
                  {contact.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2z" />
                </svg>
              </span>
              <div>
                <div className="text-xs text-ink/50">Phone number</div>
                <span className="font-semibold text-ink">{contact.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column — form card */}
        <div className="rounded-3xl bg-paper/95 backdrop-blur shadow-xl p-8 md:p-10">
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
        </div>
      </div>
    </section>
  );
}
