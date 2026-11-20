"use client";

import { useEffect, useRef } from "react";
import { services } from "@/lib/data";

// Ported from an uploaded reference "services marquee" design: a
// full-bleed dark section with a looping text marquee, followed by
// stacked service cards that slide out from under the card above as you
// scroll. Recolored into Penaxis's ink/violet/orange palette instead of
// the reference's green agriculture-site colors; content is constrained
// to the site's standard max-w-7xl (matching the nav) inside the
// full-width dark background.

const MAX_ROT = 5; // degrees
const START = 1.3; // fraction of viewport height where a card starts sliding in
const END = 0.5;
const SMOOTH = 0.12; // lower = smoother / laggier

// The default heroImage for web-crm-software is an abstract graphic that
// doesn't match the other 3 services' real photos — use the on-brand
// product-mockup image already shipped for this service instead.
const CARD_IMAGES: Record<string, string> = {
  "web-crm-software": "/images/services/pillar-website-ecommerce-development.webp",
};

export default function ServicesPageList() {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = itemRefs.current.filter((el): el is HTMLDivElement => !!el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const current = items.map(() => 0);
    let raf = 0;

    function targetProgress(i: number) {
      if (i === 0) return 1;
      const vh = window.innerHeight;
      const restingTop = list!.getBoundingClientRect().top + items[i].offsetTop;
      const p = (START * vh - restingTop) / ((START - END) * vh);
      return Math.min(1, Math.max(0, p));
    }

    function apply(i: number, p: number) {
      if (i === 0) return;
      const h = items[i].offsetHeight;
      const y = -h * (1 - p);
      const r = -MAX_ROT * (1 - p);
      items[i].style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotate(${r.toFixed(3)}deg)`;
    }

    items.forEach((_, i) => {
      current[i] = targetProgress(i);
      apply(i, current[i]);
    });

    function tick() {
      items.forEach((_, i) => {
        const t = targetProgress(i);
        current[i] += (t - current[i]) * (reduce ? 1 : SMOOTH);
        if (Math.abs(t - current[i]) < 0.0005) current[i] = t;
        apply(i, current[i]);
      });
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section data-nav-theme="dark" className="svcl-section">
      <div className="svcl-container">
        <div className="svcl-marquee">
          {[0, 1, 2].map((i) => (
            <div key={i} className="svcl-marquee-track" aria-hidden={i > 0 ? "true" : undefined}>
              <h2 className="svcl-marquee-text">
                Services <span className="svcl-accent">* Capabilities *</span> Offerings *
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div className="svcl-list" ref={listRef}>
        {services.map((s, i) => (
          <div
            key={s.slug}
            className="svcl-item"
            style={{ zIndex: services.length - i }}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
          >
            <div className="svcl-container">
              <div className="svcl-inner">
                <div className="svcl-image">
                  <img src={CARD_IMAGES[s.slug] || s.heroImage} alt={s.title} />
                </div>
                <div className="svcl-text">
                  <div className="svcl-number">{s.number}.</div>
                  <div className="svcl-main">
                    <div className="svcl-heading-wrap">
                      <h3 className="svcl-heading">{s.title}</h3>
                      <a href={`/services/${s.slug}`} className="svcl-more">
                        <svg className="svcl-arrow-l" viewBox="0 0 33 11" fill="none">
                          <path d="M0.5 0V6.5H31.5M31.5 6.5L28 3.5M31.5 6.5L28 9.5" stroke="currentColor" />
                        </svg>
                        <span className="svcl-more-in">
                          Read more
                          <svg className="svcl-arrow-r" viewBox="0 0 27 7" fill="none">
                            <path d="M0 3.5H26M26 3.5L23 0.5M26 3.5L23 6.5" stroke="currentColor" />
                          </svg>
                        </span>
                      </a>
                    </div>
                    <div className="svcl-desc-wrap">
                      <p className="svcl-desc">{s.short}</p>
                      <div className="svcl-tags">
                        {s.stack.slice(0, 4).map((tag) => (
                          <div key={tag} className="svcl-tag">
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
