"use client";

import Reveal from "./Reveal";
import { services } from "@/lib/data";

// Reuses the same 3D-tilt hover-card treatment as ShapeGrid (the
// .ux-parent/.ux-card/.ux-glass/.ux-logo styles already defined in
// globals.css) instead of the earlier click-to-expand accordion —
// same animation, populated with the real 4 Penaxis services.

const THEMES = ["violet", "ember", "volt", "void"];

const ICONS = [
  <svg key="1" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 12a9 9 0 0 1-15 6.7L3 16" />
    <path d="M17 3v5h-5M7 21v-5h5" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" fill="#fff" />
  </svg>,
  <svg key="4" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5" />
  </svg>,
];

export default function ServicesExpand() {
  return (
    <section className="relative py-28 md:py-32 bg-paper">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal as="div" className="text-center mb-16 max-w-xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight">
            Four ways we help you grow
          </h2>
          <p className="mt-3 text-ink/60">
            AI-powered products, digital transformation, fractional sales,
            and the web/CRM/software systems that hold it all together.
          </p>
        </Reveal>

        <div className="shape-grid">
          {services.map((svc, i) => (
            <Reveal as="div" key={svc.slug} delay={i * 0.06}>
              <div className={`ux-parent ux-parent--${THEMES[i % THEMES.length]}`}>
                <div className="ux-card">
                  <div className="ux-logo" aria-hidden="true">
                    <span className="ux-circle" />
                    <span className="ux-circle" />
                    <span className="ux-circle" />
                    <span className="ux-circle" />
                    <span className="ux-circle">{ICONS[i % ICONS.length]}</span>
                  </div>
                  <div className="ux-glass" />
                  <div className="ux-content">
                    <span className="ux-title">{svc.title}</span>
                    <span className="ux-text">{svc.short}</span>
                  </div>
                  <div className="ux-bottom">
                    <span className="text-xs font-mono opacity-60">{svc.number}</span>
                    <div className="ux-more">
                      <button type="button" className="ux-more-btn">
                        Learn more
                      </button>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
