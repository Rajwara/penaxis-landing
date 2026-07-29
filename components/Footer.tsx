"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { navMobile, contact } from "@/lib/data";

// Rebuilt from a generic 4-column footer template (newsletter signup +
// link columns + decorative bottom bar). Kept the overall layout idea;
// dropped the template's own credit line ("Made with <3 in CakeCounter")
// and its two hotlinked decorative GIFs (pulled from an unrelated
// third-party blog CDN) since neither belongs on this site. Content
// throughout is real Penaxis info instead of the template's generic
// placeholders (app-store download links, etc. don't apply here).

const RESOURCES = [
  { label: "Our Team", href: "/about#team" },
  { label: "Careers", href: "#" },
  { label: "Insights", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

export default function Footer() {
  return (
    <footer data-nav-theme="dark" className="relative bg-ink text-white overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Get in touch */}
          <Reveal as="div" delay={0.2} y={0} x={-40}>
            <h3 className="font-display font-semibold text-lg mb-4">Get in touch</h3>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Tell us what you're building — we'll follow up within one
              business day.
            </p>
            <form
              className="flex items-stretch gap-0"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="flex-1 min-w-0 rounded-l-full bg-white/5 border border-white/15 border-r-0 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-violet-400"
              />
              <button
                type="submit"
                className="rounded-r-full bg-violet-600 hover:bg-violet-700 transition-colors px-5 py-2.5 text-sm font-semibold whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </Reveal>

          {/* Company */}
          <Reveal as="div" delay={0.4} y={0} x={-40}>
            <h3 className="font-display font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-white/60">
              {navMobile.map((item) => (
                <li key={item.href + item.label}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Resources */}
          <Reveal as="div" delay={0.6} y={0} x={-40}>
            <h3 className="font-display font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-white/60">
              {RESOURCES.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Connect */}
          <Reveal as="div" delay={0.8} y={0} x={-40}>
            <h3 className="font-display font-semibold text-lg mb-4">Connect</h3>
            <ul className="space-y-3 text-sm text-white/60 mb-6">
              <li>{contact.phone}</li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  {contact.email}
                </a>
              </li>
              <li className="max-w-[220px]">{contact.address}</li>
            </ul>
            <div className="flex gap-3">
              <a
                href={`https://linkedin.com${contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-violet-600 hover:border-violet-600 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Penaxis. All rights reserved.
          </p>
          <a href="#top" aria-label="Penaxis home" className="opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src="/images/logo/penaxis-logo-white.png"
              alt="Penaxis"
              width={110}
              height={30}
              style={{ height: 20, width: "auto" }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
