"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Ported mechanism: a pinned hero that zooms a full-bleed image toward
// the viewer as you scroll, while a giant split title flies apart in
// opposite directions and floating badges/stars scatter — a generic
// GSAP ScrollTrigger pin+scrub technique. The original demo's own
// credit link and its literal "FUTURE IS NOW" copy weren't reused;
// text and colors here are original, mapped to the Penaxis palette.
//
// IMAGE: swap the placeholder <div> below for a real <img src="...">
// once a photo is available — see the comment at the img slot.

export default function RetroHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const plasmaRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (!root) return;

    // Custom cursor — tracked only while inside this section
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    root.addEventListener("mousemove", onMouseMove);

    const cursorTick = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (cursorRef.current) gsap.set(cursorRef.current, { x: mx, y: my });
      if (ringRef.current) gsap.set(ringRef.current, { x: rx, y: ry });
    };
    gsap.ticker.add(cursorTick);

    // Background plasma drift
    const bv = { b1x: 20, b1y: 30, b2x: 80, b2y: 15, b3x: 55, b3y: 85, b4x: 10, b4y: 80 };
    const plasmaTick = () => {
      if (!plasmaRef.current) return;
      plasmaRef.current.style.background = `
        radial-gradient(ellipse 70% 70% at ${bv.b1x}% ${bv.b1y}%, rgba(115,79,160,0.85) 0%, transparent 55%),
        radial-gradient(ellipse 60% 60% at ${bv.b2x}% ${bv.b2y}%, rgba(214,242,60,0.85) 0%, transparent 55%),
        radial-gradient(ellipse 65% 65% at ${bv.b3x}% ${bv.b3y}%, rgba(252,102,7,0.8) 0%, transparent 55%),
        radial-gradient(ellipse 50% 50% at ${bv.b4x}% ${bv.b4y}%, rgba(180,159,218,0.7) 0%, transparent 50%),
        #f1eefb
      `;
    };
    let plasmaTween: gsap.core.Tween | null = null;
    if (!prefersReduced) {
      gsap.ticker.add(plasmaTick);
      plasmaTween = gsap.to(bv, {
        b1x: 40, b1y: 55, b2x: 65, b2y: 35, b3x: 30, b3y: 60, b4x: 85, b4y: 25,
        duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    } else {
      plasmaTick();
    }

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        ["rh-s1", "rh-s2", "rh-s3", "rh-s4"].forEach((id, i) => {
          gsap.to(`#${id}`, {
            y: -20, rotation: 25 + i * 10, scale: 1.15,
            duration: 2.5 + i * 0.6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.3,
          });
        });
        ["rh-badgeLeft", "rh-badgeMid", "rh-badgeBot"].forEach((id, i) => {
          gsap.to(`#${id}`, {
            y: -8, duration: 1.8 + i * 0.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.4,
          });
        });
      }

      const rowA = document.getElementById("rh-rowA");
      const rowB = document.getElementById("rh-rowB");

      gsap.set([rowA, rowB], { yPercent: prefersReduced ? 0 : 105 });
      gsap.set(["#rh-badgeLeft", "#rh-badgeMid", "#rh-badgeBot"], {
        opacity: prefersReduced ? 1 : 0,
        scale: prefersReduced ? 1 : 0.8,
      });
      gsap.set([".rh-bracket"], { opacity: prefersReduced ? 1 : 0 });

      if (!prefersReduced) {
        const intro = gsap.timeline({ delay: 0.15 });
        intro
          .to(rowA, { yPercent: 0, duration: 0.9, ease: "power3.out" })
          .to(rowB, { yPercent: 0, duration: 0.9, ease: "power3.out" }, "-=0.65")
          .to(".rh-bracket", { opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" }, "-=0.4")
          .to(
            ["#rh-badgeLeft", "#rh-badgeMid", "#rh-badgeBot"],
            { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.8)" },
            "-=0.3"
          );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#rh-wrapper",
            start: "top top",
            end: "+=180%",
            pin: true,
            scrub: 1,
          },
        });

        tl
          .fromTo(
            heroImgRef.current,
            { scale: 1, z: 0 },
            { scale: 2.2, z: 350, transformOrigin: "center center", ease: "power1.inOut" },
            0
          )
          .fromTo(rowA, { yPercent: 0, opacity: 1 }, { yPercent: -120, opacity: 0, ease: "power2.in" }, 0)
          .fromTo(rowB, { yPercent: 0, opacity: 1 }, { yPercent: 120, opacity: 0, ease: "power2.in" }, 0)
          .fromTo("#rh-badgeLeft", { x: 0, opacity: 1 }, { x: -120, opacity: 0, ease: "power2.in" }, 0)
          .fromTo("#rh-badgeMid", { y: 0, opacity: 1 }, { y: -80, opacity: 0, ease: "power2.in" }, 0)
          .fromTo("#rh-badgeBot", { x: 0, opacity: 1 }, { x: 120, opacity: 0, ease: "power2.in" }, 0)
          .fromTo("#rh-s1", { x: 0, y: 0, opacity: 1 }, { x: -80, y: -60, opacity: 0, ease: "power2.in" }, 0)
          .fromTo("#rh-s2", { x: 0, y: 0, opacity: 1 }, { x: -60, y: 80, opacity: 0, ease: "power2.in" }, 0)
          .fromTo("#rh-s3", { x: 0, y: 0, opacity: 1 }, { x: 80, y: -80, opacity: 0, ease: "power2.in" }, 0)
          .fromTo("#rh-s4", { x: 0, y: 0, opacity: 1 }, { x: 60, y: 80, opacity: 0, ease: "power2.in" }, 0)
          .fromTo(["#rh-bTL", "#rh-bBR"], { scale: 1, opacity: 1 }, { scale: 0.5, opacity: 0, ease: "power2.in" }, 0)
          .fromTo(["#rh-bTR", "#rh-bBL"], { scale: 1, opacity: 1 }, { scale: 0.5, opacity: 0, ease: "power2.in" }, 0)
          .fromTo("#rh-bgPlasma", { opacity: 1 }, { opacity: 0, ease: "power2.in" }, 0.3)
          .fromTo(".rh-scanlines", { opacity: 0.6 }, { opacity: 1.5, ease: "none" }, 0);

        const hud = document.getElementById("rh-hudPct");
        ScrollTrigger.create({
          trigger: "#rh-wrapper",
          start: "top top",
          end: "+=180%",
          scrub: true,
          onUpdate: (self) => {
            if (hud) hud.textContent = `${Math.round(self.progress * 100)}%`;
          },
        });

        gsap.from("#rh-belowText", {
          scrollTrigger: { trigger: ".rh-section-below", start: "top 80%", toggleActions: "play none none reverse" },
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
        });
      }
    }, root);

    return () => {
      root.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(cursorTick);
      if (!prefersReduced) gsap.ticker.remove(plasmaTick);
      plasmaTween?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="rh-root">
      <div ref={cursorRef} className="rh-cursor" aria-hidden="true" />
      <div ref={ringRef} className="rh-cursor-ring" aria-hidden="true" />

      <div className="rh-wrapper" id="rh-wrapper">
        <div ref={plasmaRef} className="rh-bg-plasma" id="rh-bgPlasma" />

        <div className="rh-image-container">
          <div ref={heroImgRef} style={{ width: "100%", height: "100%" }}>
            <img
              src="/images/hero/office-logo-desk.jpg"
              alt="Penaxis team members working at the office"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
            />
          </div>
        </div>

        <div className="rh-scanlines" />

        <div className="rh-brackets">
          <div className="rh-bracket rh-bracket-tl" id="rh-bTL" />
          <div className="rh-bracket rh-bracket-tr" id="rh-bTR" />
          <div className="rh-bracket rh-bracket-bl" id="rh-bBL" />
          <div className="rh-bracket rh-bracket-br" id="rh-bBR" />
        </div>

        <div className="rh-hero-overlay">
          <div className="rh-hero-title">
            <div className="rh-row">
              <span id="rh-rowA">BUILT</span>
            </div>
            <div className="rh-row">
              <span id="rh-rowB">TO MOVE</span>
            </div>
          </div>
        </div>

        <div className="rh-badge-float" id="rh-badgeLeft" style={{ top: "18%", left: "5%" }}>
          ★ AI-Powered
        </div>
        <div className="rh-badge-float rh-violet-bg" id="rh-badgeMid" style={{ top: "12%", right: "8%" }}>
          Our Work
        </div>
        <div className="rh-badge-float rh-ember-bg" id="rh-badgeBot" style={{ bottom: "22%", right: "6%" }}>
          Penaxis
        </div>

        <div className="rh-deco-star" id="rh-s1" style={{ top: "25%", left: "28%", color: "#734fa0" }}>✦</div>
        <div className="rh-deco-star" id="rh-s2" style={{ top: "60%", left: "10%", color: "#212121" }}>★</div>
        <div className="rh-deco-star" id="rh-s3" style={{ top: "30%", right: "25%", color: "#fc6607" }}>✦</div>
        <div className="rh-deco-star" id="rh-s4" style={{ bottom: "28%", left: "22%", color: "#b49fda" }}>★</div>

        <div className="rh-hud-bar">
          <span className="rh-hud-label">Scroll to enter</span>
          <div className="rh-hud-line" />
          <span className="rh-hud-label" id="rh-hudPct">0%</span>
        </div>
      </div>

      <div className="rh-section-below">
        <div className="rh-bg-plasma" />
        <div className="rh-below-text" id="rh-belowText">
          THE WORK
          <em>DELIVERS.</em>
        </div>
      </div>
    </div>
  );
}
