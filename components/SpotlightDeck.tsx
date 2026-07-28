"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

// Ported from the same shared UI pattern's "spotlight deck" — a stable
// horizontal carousel (no 3D cylinder) with arrows, dots, keyboard nav,
// and pointer-drag/swipe. Logic re-implemented in React (refs + state)
// instead of the original vanilla-JS DOM queries; recolored to the
// Penaxis palette. Not wired into the page yet.

const PANELS = [
  { tag: "01", theme: "violet", title: "Signal", text: "Latency budgets and live traces." },
  { tag: "02", theme: "ember", title: "Mesh", text: "Distributed nodes with health rings." },
  { tag: "03", theme: "volt", title: "Vault", text: "Encrypted payloads at rest." },
  { tag: "04", theme: "void", title: "Pulse", text: "Realtime fan-out to edge regions." },
];

export default function SpotlightDeck() {
  const [idx, setIdx] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const swipe = useRef({ active: false, startX: 0, pid: null as number | null });
  const n = PANELS.length;

  const go = (delta: number) => setIdx((i) => (i + delta + n * 100) % n);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      swipe.current.active = true;
      swipe.current.startX = e.clientX;
      swipe.current.pid = e.pointerId;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {}
    };
    const onUp = (e: PointerEvent) => {
      if (!swipe.current.active || e.pointerId !== swipe.current.pid) return;
      swipe.current.active = false;
      swipe.current.pid = null;
      const dx = e.clientX - swipe.current.startX;
      if (Math.abs(dx) < 40) return;
      go(dx < 0 ? 1 : -1);
    };
    const onCancel = () => {
      swipe.current.active = false;
      swipe.current.pid = null;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onCancel);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onCancel);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setIdx(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setIdx(n - 1);
    }
  };

  return (
    <section className="relative py-24 md:py-32 bg-paper" aria-labelledby="spotlight-title">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal as="div" className="text-center mb-14 max-w-xl mx-auto">
          <h2 id="spotlight-title" className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight">
            Spotlight deck
          </h2>
          <p className="mt-3 text-ink/60">
            Four panels in a stable horizontal stage — arrows, dots, keyboard, and swipe.
          </p>
        </Reveal>

        <div
          className="stage-wrap"
          role="region"
          aria-roledescription="carousel"
          aria-labelledby="spotlight-title"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <span className="sr-only" aria-live="polite">
            Slide {idx + 1} of {n}
          </span>
          <div className="stage-shell">
            <button
              type="button"
              className="stage-fab stage-fab--prev"
              aria-label="Previous slide"
              onClick={() => go(-1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            <div className="stage-viewport" ref={viewportRef}>
              <div
                className="stage-track"
                style={{
                  transform: `translate3d(${-idx * 100}%,0,0)`,
                  transition: "transform 0.55s cubic-bezier(0.2,0.85,0.25,1)",
                }}
              >
                {PANELS.map((p) => (
                  <article key={p.tag} className="stage-card">
                    <div className={`stage-card__inner stage-card--${p.theme}`}>
                      <div className="stage-card__body">
                        <span className="stage-card__tag">{p.tag}</span>
                        <h3>{p.title}</h3>
                        <p>{p.text}</p>
                      </div>
                      <div className="stage-card__actions">
                        <div className="ux-social">
                          <button type="button" className="ux-social-btn" aria-label="Action A">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /></svg>
                          </button>
                          <button type="button" className="ux-social-btn" aria-label="Action B">
                            <svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2" /></svg>
                          </button>
                        </div>
                        <button type="button" className="ux-more-btn">
                          Open
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="stage-fab stage-fab--next"
              aria-label="Next slide"
              onClick={() => go(1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
              </svg>
            </button>
          </div>

          <div className="stage-dots" role="group" aria-label="Slide indicators">
            {PANELS.map((p, j) => (
              <button
                key={p.tag}
                type="button"
                className={j === idx ? "is-active" : ""}
                aria-label={`Slide ${j + 1}`}
                aria-selected={j === idx}
                onClick={() => setIdx(j)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
