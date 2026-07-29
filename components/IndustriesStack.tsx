"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { industries } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("ind-cubic", "0.83, 0, 0.17, 1");
}

// Ported technique: a stack of cards fanned out in 3D (perspective +
// z-depth via GSAP), the front card cycling to the back on click with
// a split-character title reveal — a generic CustomEase card-cycling
// pattern (no attribution on the shared source). Populated with all
// 13 real Penaxis industries instead of "Lorem, ipsum." placeholders.
// Placeholder images are duplicated across the 13 cards until real
// per-industry photos are provided — swap the IMAGES array below.

const IMAGES = [
  "https://images.unsplash.com/photo-1689602037070-fec2eca3f5b2?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1718125188885-7ce699512931?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1718116088537-212b192d1ad9?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1718194822494-47de8fb7922c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1713970700051-556d05c59fce?q=80&w=1200&auto=format&fit=crop",
];

export default function IndustriesStack() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const splitTitle = (h1: HTMLElement) => {
      const text = h1.textContent || "";
      h1.innerHTML = text
        .split("")
        .map((char) => `<span>${char === " " ? "&nbsp;" : char}</span>`)
        .join("");
    };

    slider.querySelectorAll<HTMLElement>(".ind-copy h1").forEach(splitTitle);

    const initializeCards = () => {
      const cards = Array.from(slider.querySelectorAll<HTMLElement>(".ind-card"));
      gsap.to(cards, {
        y: (i) => -15 + 15 * Math.min(i, 4) + "%",
        z: (i) => 15 * Math.min(i, 4),
        duration: 1,
        ease: prefersReduced ? "power2.out" : "ind-cubic",
        stagger: -0.1,
      });
    };

    gsap.set(slider, { autoAlpha: 1 });
    initializeCards();
    gsap.set("h1 span", { y: -200 });
    const lastCard = slider.querySelector(".ind-card:last-child");
    if (lastCard) gsap.set(lastCard.querySelectorAll("h1 span"), { y: 0 });

    const onClick = () => {
      if (isAnimating.current || prefersReduced) return;
      isAnimating.current = true;

      const cards = Array.from(slider.querySelectorAll<HTMLElement>(".ind-card"));
      const lastCardEl = cards.pop()!;
      const nextCard = cards[cards.length - 1];

      gsap.to(lastCardEl.querySelectorAll("h1 span"), { y: 200, duration: 0.75, ease: "ind-cubic" });
      gsap.to(lastCardEl, {
        y: "+=150%",
        duration: 0.75,
        ease: "ind-cubic",
        onComplete: () => {
          slider.prepend(lastCardEl);
          initializeCards();
          gsap.set(lastCardEl.querySelectorAll("h1 span"), { y: -200 });
          setTimeout(() => {
            isAnimating.current = false;
          }, 1000);
        },
      });

      if (nextCard) {
        gsap.to(nextCard.querySelectorAll("h1 span"), { y: 0, duration: 1, ease: "ind-cubic", stagger: 0.05 });
      }
    };

    slider.addEventListener("click", onClick);
    return () => slider.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="ind-container">
      <div className="ind-eyebrow-wrap">
        <div className="eyebrow">Where we work</div>
        <h2>13 industries, one team</h2>
      </div>

      <div ref={sliderRef} className="ind-slider" style={{ visibility: "hidden" }}>
        {industries.map((ind, i) => (
          <div className="ind-card" key={ind.title}>
            <img src={IMAGES[i % IMAGES.length]} alt="" />
            <div className="ind-copy">
              <h1>{ind.title}</h1>
            </div>
          </div>
        ))}
      </div>

      <div className="ind-hint">Click anywhere to cycle through industries</div>
    </div>
  );
}
