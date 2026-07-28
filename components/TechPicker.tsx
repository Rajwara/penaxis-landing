"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

// Circular radial <select> built on very new CSS APIs: appearance:
// base-select, ::picker(select), CSS anchor positioning, and
// sibling-count()/sibling-index(). As of this build these only work in
// recent Chromium (138+) — Safari and Firefox don't support them yet.
// Because the interactive part is a real <select>/<option> underneath,
// browsers without support just render it as an ordinary native
// dropdown — functional, just not the circular/animated version.
//
// Ported from a shared CodePen-style demo. The original's personal
// footer (its author's social links, browser-support badge) is not
// part of the reusable widget and isn't included here. Emoji set
// swapped from animals to technology; colors mapped to the Penaxis
// palette instead of the original's cyan accent.

const TECH_EMOJIS = [
  "💻",
  "🤖",
  "⚙️",
  "📱",
  "☁️",
  "🔒",
  "📊",
  "🌐",
  "🚀",
  "🔗",
  "🗄️",
  "🧠",
];
const DEFAULT_INDEX = 0; // 💻 — a generic "technology" default

export default function TechPicker() {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const s = selectRef.current;
    if (!s) return;

    const n = s.length;
    const d = 360 / n;
    let i = s.selectedIndex;
    let o = s.selectedOptions[0]?.getAttribute("data-emoji") || "";
    let r = -i * d;
    let h = 0;

    const delta = (a: number, b: number) => (((a - b + 180) % 360) + 360) % 360 - 180;

    const set = (k: number = i) => {
      const t = r + k * d;
      h += delta(t, h);
      s.style.setProperty("--tp-active", `"${o}"`);
      s.style.setProperty("--tp-rotation", `${r}deg`);
      s.style.setProperty("--tp-hover-angle", `${h}deg`);
    };

    const onMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches?.("option")) {
        set((target as HTMLOptionElement).index);
      }
    };
    const onMouseLeave = () => set();
    const onChange = () => {
      const j = s.selectedIndex;
      r -= (((j - i + n / 2) % n) + n) % n * d - (n / 2) * d;
      i = j;
      o = s.selectedOptions[0]?.getAttribute("data-emoji") || "";
      set();
    };

    s.addEventListener("mouseover", onMouseOver);
    s.addEventListener("mouseleave", onMouseLeave);
    s.addEventListener("change", onChange);
    set();

    return () => {
      s.removeEventListener("mouseover", onMouseOver);
      s.removeEventListener("mouseleave", onMouseLeave);
      s.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <section className="relative py-28 md:py-36 bg-ink text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[800px] aspect-square rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal as="p" className="eyebrow text-volt mb-4">
          Our Stack
        </Reveal>
        <Reveal>
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-4">
            Pick a piece of the stack.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-white/55 max-w-lg mx-auto mb-12">
            Click the circle to spin through the technology behind Penaxis
            builds — AI, cloud, security, data, and everything in between.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="tech-picker-wrap flex justify-center">
            <select ref={selectRef} tabIndex={0} aria-label="Select a technology">
              {TECH_EMOJIS.map((emoji, idx) => (
                <option key={emoji} data-emoji={emoji} selected={idx === DEFAULT_INDEX} />
              ))}
            </select>
          </div>
        </Reveal>

        <p className="mt-10 text-xs text-white/30 eyebrow">
          Best experienced in a recent Chromium browser — falls back to a
          plain dropdown elsewhere.
        </p>
      </div>
    </section>
  );
}
