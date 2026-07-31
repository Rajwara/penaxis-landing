"use client";

import { useEffect, useRef } from "react";

// Cursor "erases" a solid ink layer to reveal a photo underneath — both
// the ink layer and the photo are clipped to the shape of the wordmark
// text via an SVG luminance mask, so at rest it just reads as bold solid
// text, and the reveal only ever happens within the letters themselves.
//
// Ported the mechanism (a fading trail of erased circles — the 2D-canvas
// equivalent of the framebuffer trail in BlobCursorEffect) rather than
// the specific reference's brand wordmark or hosted promotional video —
// using Penaxis's own wordmark and a Penaxis photo as the revealed media
// instead. Swap the photo for a real Penaxis video whenever one's
// available; the mask/clip mechanism works the same either way.

const WORDMARK = "PENAXIS";
const MASK_ID = "pen-text-reveal-mask";

export default function TextRevealMedia() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let disposed = false;
    let pointer: { x: number; y: number; active: boolean } = { x: -1000, y: -1000, active: false };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      // repaint solid after a resize so we don't reveal stretched old pixels
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#171717";
      ctx.fillRect(0, 0, rect.width, rect.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onLeave = () => {
      pointer.active = false;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    const tick = () => {
      if (disposed) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;

      // Slowly re-ink everywhere so erased holes fade shut over time,
      // giving the same trailing/decaying reveal feel as the
      // framebuffer-based version on the effect above.
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(23,23,23,0.06)";
      ctx.fillRect(0, 0, w, h);

      if (pointer.active) {
        ctx.globalCompositeOperation = "destination-out";
        const r = Math.max(w, h) * 0.09;
        const grad = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, r);
        grad.addColorStop(0, "rgba(0,0,0,1)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="trv-section">
      <div className="mx-auto max-w-6xl px-6">
        <p className="trv-eyebrow">Move your cursor over the letters</p>
        <div ref={wrapRef} className="trv-wrap">
          <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
            <defs>
              <mask id={MASK_ID} maskContentUnits="objectBoundingBox">
                <text
                  x="0.5"
                  y="0.62"
                  textAnchor="middle"
                  fontFamily="var(--font-display)"
                  fontWeight={800}
                  fontSize="0.34"
                  fill="#fff"
                >
                  {WORDMARK}
                </text>
              </mask>
            </defs>
          </svg>

          <img
            src="/images/hero/team-huddle.jpg"
            alt=""
            className="trv-media"
            style={{ mask: `url(#${MASK_ID})`, WebkitMask: `url(#${MASK_ID})` }}
          />
          <canvas
            ref={canvasRef}
            className="trv-canvas"
            style={{ mask: `url(#${MASK_ID})`, WebkitMask: `url(#${MASK_ID})` }}
          />
        </div>
      </div>
    </section>
  );
}
