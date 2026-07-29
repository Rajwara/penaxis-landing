"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { services } from "@/lib/data";

// Ported technique: a row of panels that expand on click (one wide,
// the rest narrow) using GSAP's elastic easing — a generic accordion
// pattern. The original used random Unsplash portrait photos as
// filler; those don't communicate anything about a service, so this
// version uses brand-gradient panels labeled with the real 4 Penaxis
// services instead, with each service's short description revealed
// once its panel expands.

const THEMES = ["se-item--01", "se-item--02", "se-item--03", "se-item--04"];

export default function ServicesExpand() {
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
          it.style.width = clicked[idx] ? "42vw" : idx === i ? "15vw" : "15vw";
        });
        return;
      }

      gsap.to(items, {
        width: (idx) => (idx === i ? undefined : "8vw"),
        duration: 2,
        ease: "elastic(1, .6)",
      });
      gsap.to(item, {
        width: clicked[i] ? "42vw" : "15vw",
        duration: 2.5,
        ease: "elastic(1, .3)",
      });
      if (!clicked.some(Boolean)) {
        gsap.to(items, { width: "15vw", duration: 2, ease: "elastic(1, .6)" });
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
    <section className="se-section">
      <div className="se-head">
        <h2>Four ways we help you grow</h2>
        <p>Click a panel to see what it actually involves.</p>
      </div>
      <div ref={groupRef} className="se-group">
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
    </section>
  );
}
