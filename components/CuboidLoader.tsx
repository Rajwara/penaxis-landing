"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Ported technique: three "cuboid" words (front/back/top/bottom faces
// built from CSS 3D transforms) elastically drop in, then spin
// continuously while gently wobbling toward the cursor, and the type
// itself reacts to pointer position by varying font-weight — a
// generic CSS-3D + GSAP + variable-font technique from a shared
// CodePen-style demo. That demo's font (Bandeins Strange) is licensed
// for demo-only use, so this uses the project's own Space Grotesk
// Variable font instead — it only has a weight axis (no width/stretch
// axis), so the pointer effect here varies weight only. Location
// swapped to Lahore (Penaxis's real HQ) instead of the demo's Dublin.
// Used as a page loader: shows for ~10s then fades, scroll locked
// while visible.

const WORDS = ["Hello", "From", "Penaxis"];
const SHOW_DURATION_MS = 10000;
const FADE_DURATION_MS = 500;

export default function CuboidLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLParagraphElement[]>([]);
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const container = containerRef.current;
    if (!container) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const cuboids = Array.from(container.querySelectorAll<HTMLElement>(".cl-cuboid"));
    const hiWords = wordsRef.current;

    let winW = window.innerWidth;
    let winH = window.innerHeight;
    const pointer = { x: winW / 2, y: winH / 2 };

    const ctx = gsap.context(() => {
      gsap.set(container, { autoAlpha: 1 });

      if (prefersReduced) {
        gsap.set(cuboids, { y: 0 });
      } else {
        gsap
          .timeline({ delay: 0.3 })
          .from(cuboids, { y: winH, duration: 1.6, stagger: 0.14, ease: "elastic(0.4,0.3)" }, 0);

        gsap.to(cuboids, { rotateX: -360, duration: 8, repeat: -1, ease: "none" });

        gsap.fromTo(
          cuboids,
          { rotateY: 8, rotate: -10 },
          { rotateY: -8, rotate: 10, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut" }
        );
      }
    }, container);

    const calcOffset = (xPos: number, yPos: number) => {
      const dX = (2 * (xPos - winW / 2)) / winW;
      const dY = (-2 * (yPos - winH / 2)) / winH;
      return [dX, dY];
    };

    const followPointer = (pX: number, pY: number) => {
      if (prefersReduced) return;
      const [nX, nY] = calcOffset(pX, pY);
      const positiveY = Math.sqrt(nY * nY);
      const deltaW = 350 * positiveY;
      gsap.to(hiWords, { fontWeight: 700 - deltaW, duration: 2 });
    };

    const onMouseMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      followPointer(pointer.x, pointer.y);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      pointer.x = t.clientX;
      pointer.y = t.clientY;
      followPointer(pointer.x, pointer.y);
    };
    const onResize = () => {
      winW = window.innerWidth;
      winH = window.innerHeight;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchstart", onTouchMove);
    window.addEventListener("resize", onResize);

    const dismissTimer = setTimeout(() => {
      setFading(true);
      document.body.style.overflow = prevOverflow;
    }, SHOW_DURATION_MS);
    const removeTimer = setTimeout(() => setHidden(true), SHOW_DURATION_MS + FADE_DURATION_MS);

    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(dismissTimer);
      clearTimeout(removeTimer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchMove);
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="cl-root"
      style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? "none" : "auto" }}
      aria-hidden="true"
    >
      <div ref={containerRef} className="cl-container">
        <div className="cl-hi">
          {WORDS.map((word, i) => (
            <div className="cl-cuboid" key={word}>
              <div className="cl-face cl-face--front">
                <p
                  className="cl-word"
                  ref={(el) => {
                    if (el) wordsRef.current[i * 4 + 0] = el;
                  }}
                >
                  {word}
                </p>
              </div>
              <div className="cl-face cl-face--back">
                <p
                  className="cl-word"
                  ref={(el) => {
                    if (el) wordsRef.current[i * 4 + 1] = el;
                  }}
                >
                  {word}
                </p>
              </div>
              <div className="cl-face cl-face--top">
                <p
                  className="cl-word"
                  ref={(el) => {
                    if (el) wordsRef.current[i * 4 + 2] = el;
                  }}
                >
                  {word}
                </p>
              </div>
              <div className="cl-face cl-face--bottom">
                <p
                  className="cl-word"
                  ref={(el) => {
                    if (el) wordsRef.current[i * 4 + 3] = el;
                  }}
                >
                  {word}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="cl-base">
          <div className="cl-base-plate" />
        </div>
      </div>
    </div>
  );
}
