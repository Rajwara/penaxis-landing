"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";

// Ported mechanism: layered "pieces" sliding in infinite loops behind
// growing circles and a big echoing "404," each layer moving at a
// different depth as the cursor moves — from a shared 404 template.
// That template's own credited floating "about" widget (a real
// designer's portfolio/Dribbble/LinkedIn links + logo) was dropped
// entirely; parallax is re-implemented here with plain mousemove
// instead of pulling in the external parallax.js library the
// original used, since the effect itself is simple to reproduce
// directly. Colors and copy are Penaxis's own; the real site Navbar
// replaces the demo's placeholder nav.

export default function NotFound() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const layers = Array.from(scene.querySelectorAll<HTMLElement>("[data-depth]"));
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      layers.forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "0.5");
        const amount = depth * 30;
        el.style.transform = `translate(${cx * amount}px, ${cy * amount}px)`;
      });
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <Navbar />
      <section className="e404-wrapper">
        <div className="e404-container">
          <div ref={sceneRef} className="e404-scene">
            <div className="e404-circle" data-depth="1.2" />
            <div className="e404-one" data-depth="0.9">
              <div className="e404-content">
                <span className="e404-piece" />
                <span className="e404-piece" />
                <span className="e404-piece" />
              </div>
            </div>
            <div className="e404-two" data-depth="0.6">
              <div className="e404-content">
                <span className="e404-piece" />
                <span className="e404-piece" />
                <span className="e404-piece" />
              </div>
            </div>
            <div className="e404-three" data-depth="0.4">
              <div className="e404-content">
                <span className="e404-piece" />
                <span className="e404-piece" />
                <span className="e404-piece" />
              </div>
            </div>
            <p className="e404-num" data-depth="0.5">404</p>
            <p className="e404-num e404-num-back" data-depth="0.1">404</p>
          </div>

          <div className="e404-text">
            <article>
              <p>
                Looks like this page took a wrong turn.
                <br />
                Let's get you back on track.
              </p>
              <a href="/" className="e404-btn">
                Take me home
              </a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
