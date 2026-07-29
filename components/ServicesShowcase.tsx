"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { services } from "@/lib/data";

// Duplicate of ServicesExpand — same content, same click-to-expand
// elastic animation, same 4 real services — with an image added on
// the left (~30% of the section) and the cards column resized to
// ~70%. Rebuilt with container-relative (%) width targets instead of
// vw, since vw sizing only works when a section spans the full page
// width; now that the cards share space with the image column, % is
// what correctly resolves against the narrower column.
//
// IMAGE: no real photo specified yet for this slot — using the team
// photo as a placeholder. Swap the src below once a real image is
// provided.

const THEMES = ["se-item--01", "se-item--02", "se-item--03", "se-item--04"];

export default function ServicesShowcase() {
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const items = Array.from(group.querySelectorAll<HTMLDivElement>(".se-item"));
    const clicked = new Array(items.length).fill(false);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const expand = (item: HTMLDivElement, i: number) => {
      items.forEach((_, idx) => {
        if (i !== idx) clicked[idx] = false;
      });
      clicked[i] = !clicked[i];

      items.forEach((it, idx) => {
        it.classList.toggle("is-expanded", clicked[idx]);
      });

      if (prefersReduced) {
        items.forEach((it, idx) => {
          it.style.width = clicked[idx] ? "58%" : idx === i ? "22%" : "22%";
        });
        return;
      }

      gsap.to(items, {
        width: (idx) => (idx === i ? undefined : "10%"),
        duration: 2,
        ease: "elastic(1, .6)",
      });
      gsap.to(item, {
        width: clicked[i] ? "58%" : "22%",
        duration: 2.5,
        ease: "elastic(1, .3)",
      });
      if (!clicked.some(Boolean)) {
        gsap.to(items, { width: "22%", duration: 2, ease: "elastic(1, .6)" });
      }
    };

    const handlers: Array<() => void> = [];
    items.forEach((item, i) => {
      const handler = () => expand(item, i);
      item.addEventListener("click", handler);
      handlers.push(handler);
    });

    return () => {
      items.forEach((item, i) => item.removeEventListener("click", handlers[i]));
    };
  }, []);

  return (
    <section className="ssh-section">
      <div className="ssh-head">
        <h2>Four ways we help you grow</h2>
        <p>Click a panel to see what it actually involves.</p>
      </div>
      <div className="ssh-layout">
        <div className="ssh-image-col">
          {/* Placeholder — swap for the real image once provided */}
          <img src="/images/hero/team-huddle.jpg" alt="The Penaxis team" />
        </div>
        <div ref={groupRef} className="ssh-cards-col">
          {services.map((svc, i) => (
            <div key={svc.slug} className={`se-item ${THEMES[i % THEMES.length]}`}>
              <div className="se-item-label">
                <span className="se-item-num">{svc.number}</span>
                <span className="se-item-title">{svc.title}</span>
                <span className="se-item-desc">{svc.short}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
