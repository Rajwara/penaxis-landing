"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

// Circular radial menu — rebuilt with plain React state and standard
// CSS transforms/transitions after the experimental CSS version
// (appearance:base-select, ::picker(), anchor positioning,
// sibling-count()) turned out to render inconsistently even in recent
// Chromium. This version works identically in every modern browser.

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
const RADIUS = 90; // px, distance of each option from center

export default function TechPicker() {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(DEFAULT_INDEX);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const selectOption = (idx: number) => {
    setActiveIdx(idx);
    setOpen(false);
  };

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
          <p className="text-white/55 max-w-lg mx-auto mb-16">
            Click the circle to browse the technology behind Penaxis builds —
            AI, cloud, security, data, and everything in between.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div ref={wrapRef} className="flex justify-center">
            <div className="tp-circle">
              <button
                type="button"
                className={`tp-center-btn ${open ? "is-open" : ""}`}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label="Browse technologies"
              >
                {TECH_EMOJIS[activeIdx]}
              </button>

              <div className="tp-ring" aria-hidden={!open}>
                {TECH_EMOJIS.map((emoji, idx) => {
                  const angle = (idx / TECH_EMOJIS.length) * 2 * Math.PI - Math.PI / 2;
                  const x = open ? Math.cos(angle) * RADIUS : 0;
                  const y = open ? Math.sin(angle) * RADIUS : 0;
                  return (
                    <button
                      key={emoji}
                      type="button"
                      className={`tp-option ${idx === activeIdx ? "is-selected" : ""}`}
                      style={{
                        transform: `translate(${x}px, ${y}px) scale(${open ? 1 : 0.4})`,
                        opacity: open ? 1 : 0,
                        transitionDelay: open ? `${idx * 20}ms` : "0ms",
                      }}
                      onClick={() => selectOption(idx)}
                      tabIndex={open ? 0 : -1}
                      aria-label={`Select technology ${idx + 1}`}
                    >
                      {emoji}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
