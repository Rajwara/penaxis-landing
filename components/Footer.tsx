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

      <div className="footer-scene" aria-hidden="true">
        <svg
          className="footer-scene-skyline"
          viewBox="0 0 1400 160"
          preserveAspectRatio="xMidYMax slice"
          fill="none"
        >
          {/* mountains */}
          <path d="M1180 160L1250 70L1300 120L1340 60L1400 160H1180Z" fill="#734FA0" opacity="0.35" />
          {/* buildings */}
          <g fill="#B49FDA" opacity="0.3">
            <rect x="0" y="70" width="46" height="90" />
            <rect x="55" y="40" width="60" height="120" />
            <rect x="125" y="90" width="40" height="70" />
            <rect x="600" y="55" width="50" height="105" />
            <rect x="660" y="30" width="42" height="130" />
            <rect x="712" y="75" width="55" height="85" />
            <rect x="930" y="60" width="46" height="100" />
            <rect x="985" y="35" width="60" height="125" />
            <rect x="1055" y="85" width="40" height="75" />
          </g>
          {/* trees near bus stop */}
          <g fill="#5C3E82" opacity="0.4">
            <circle cx="820" cy="95" r="26" />
            <circle cx="850" cy="85" r="22" />
            <rect x="815" y="100" width="8" height="40" />
            <rect x="845" y="95" width="6" height="35" />
          </g>
          {/* bus stop bench */}
          <g stroke="#D6F23C" strokeWidth="3" opacity="0.4" fill="none">
            <path d="M900 40v100M960 40v100M900 45h60" />
            <rect x="905" y="118" width="50" height="6" fill="#D6F23C" stroke="none" />
          </g>
          {/* street line */}
          <line x1="0" y1="160" x2="1400" y2="160" stroke="#F2EEFE" strokeOpacity="0.15" strokeWidth="1" />
          {/* hot air balloon */}
          <g opacity="0.4">
            <ellipse cx="1350" cy="30" rx="16" ry="20" fill="#734FA0" />
            <path d="M1344 48h12l-4 8h-4z" fill="#734FA0" />
          </g>
        </svg>

        <svg
          className="footer-scene-car"
          viewBox="0 0 90 40"
          fill="none"
          style={{ left: "-15%" }}
        >
          <path
            d="M6 30 L10 18 Q14 12 24 12 L52 12 Q60 12 64 18 L70 30 Z"
            fill="#734FA0"
          />
          <path d="M20 18 L26 13 L46 13 L52 18 Z" fill="#212121" opacity="0.5" />
          <circle cx="22" cy="31" r="7" fill="#171717" />
          <circle cx="58" cy="31" r="7" fill="#171717" />
          <circle cx="22" cy="31" r="3" fill="#D6F23C" />
          <circle cx="58" cy="31" r="3" fill="#D6F23C" />
        </svg>

        <svg
          className="footer-scene-cyclist"
          viewBox="0 0 60 46"
          fill="none"
          style={{ left: "-10%" }}
        >
          <circle cx="12" cy="36" r="9" stroke="#F2EEFE" strokeWidth="2" />
          <circle cx="46" cy="36" r="9" stroke="#F2EEFE" strokeWidth="2" />
          <path
            d="M12 36 L26 20 L34 20 M26 20 L20 36 M34 20 L46 36 M34 20 L38 12 L44 12"
            stroke="#F2EEFE"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="34" cy="8" r="5" fill="#FC6607" />
          <path d="M30 20 Q34 24 30 30" stroke="#FC6607" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
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
