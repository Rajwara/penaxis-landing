"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { team, stats } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const avatarPalette = ["bg-violet-600", "bg-ember-500", "bg-violet-900"];

// Decorative hero cards — abstract brand-gradient panels (no stock photos),
// each with its resting rotation / parallax depth, matching the original's choreography
const HERO_CARDS = [
  { cls: "ab-card--v1", rot: -9, depth: 14, w: 130, h: 180, left: "4%", top: 30 },
  { cls: "ab-card--v2", rot: -5, depth: 10, w: 160, h: 220, left: "12%", top: 50 },
  { cls: "ab-card--e1", rot: -2, depth: 8, w: 200, h: 270, left: "22%", top: 20 },
  { cls: "ab-card--x1", rot: 3, depth: 12, w: 150, h: 200, left: "36%", top: 70 },
  { cls: "ab-card--v1", rot: 0, depth: 6, w: 230, h: 310, left: "44%", top: 0 },
  { cls: "ab-card--e1", rot: 4, depth: 11, w: 160, h: 215, left: "59%", top: 55 },
  { cls: "ab-card--v2", rot: 7, depth: 9, w: 175, h: 240, left: "70%", top: 30 },
  { cls: "ab-card--x1", rot: -4, depth: 13, w: 130, h: 175, left: "84%", top: 50 },
];

const CARD_ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="6" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l9 16H3L12 2z" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="#fff"><rect x="5" y="5" width="14" height="14" rx="3" /></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="#fff"><path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" /></svg>,
];

const heroWords = ["Small", "team,"];
const bigLetters = "big results".split("");

export default function AboutContent() {
  const cardsRowRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".ab-word > span", { y: "0%" });
        gsap.set(".ab-letter", { y: 0, opacity: 1 });
        gsap.set(".ab-card", { y: 0, opacity: 1, scale: 1 });
        gsap.set("#ab-subline", { opacity: 1, y: 0 });
        return;
      }

      gsap.set(".ab-word > span", { y: "105%" });
      gsap.set(".ab-letter", { y: 80, opacity: 0 });
      gsap.set("#ab-subline", { opacity: 0, y: 20 });

      document.querySelectorAll<HTMLElement>(".ab-card").forEach((card) => {
        const rot = parseFloat(card.dataset.rot || "0");
        gsap.set(card, { y: -800, rotation: rot + 25, opacity: 0, scale: 0.7 });
      });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(".ab-word > span", { y: "0%", duration: 0.9, stagger: 0.08 }, 0.2)
        .to(".ab-letter", { y: 0, opacity: 1, duration: 0.9, stagger: 0.05, ease: "back.out(1.6)" }, 0.45)
        .to(
          ".ab-card",
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: (_i: number, el: Element) => parseFloat((el as HTMLElement).dataset.rot || "0"),
            duration: 1.1,
            stagger: { each: 0.08, from: "center" },
            ease: "back.out(1.4)",
          },
          0.7
        )
        .to("#ab-subline", { opacity: 1, y: 0, duration: 0.8 }, 1.5);

      // Continuous float
      document.querySelectorAll<HTMLElement>(".ab-card").forEach((card, i) => {
        const rot = parseFloat(card.dataset.rot || "0");
        gsap.to(card, {
          y: `+=${8 + (i % 3) * 5}`,
          rotation: rot + (i % 2 === 0 ? 1.5 : -1.5),
          duration: 3 + (i % 4) * 0.5,
          delay: 1.7 + i * 0.1,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // Mouse parallax
      const hero = heroRef.current;
      let mx = 0, my = 0, tx = 0, ty = 0, raf = 0;
      const onMove = (e: MouseEvent) => {
        const r = hero!.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      const onLeave = () => {
        mx = 0;
        my = 0;
      };
      function parallaxTick() {
        tx += (mx - tx) * 0.05;
        ty += (my - ty) * 0.05;
        document.querySelectorAll<HTMLElement>(".ab-card").forEach((card) => {
          const d = parseFloat(card.dataset.depth || "8");
          card.style.translate = `${tx * d}px ${ty * d * 0.5}px`;
        });
        raf = requestAnimationFrame(parallaxTick);
      }
      hero?.addEventListener("mousemove", onMove);
      hero?.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(parallaxTick);

      // Hover 3D tilt per card
      const cleanups: Array<() => void> = [];
      document.querySelectorAll<HTMLElement>(".ab-card").forEach((card) => {
        const onCardMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, {
            rotateX: -py * 16,
            rotateY: px * 16,
            scale: 1.12,
            zIndex: 20,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 700,
            overwrite: "auto",
          });
        };
        const onCardLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.6)",
            overwrite: "auto",
          });
        };
        card.addEventListener("mousemove", onCardMove);
        card.addEventListener("mouseleave", onCardLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onCardMove);
          card.removeEventListener("mouseleave", onCardLeave);
        });
      });

      // Scroll fan-out
      const moves = [
        { x: -260, y: -40, rot: -25 },
        { x: -200, y: 20, rot: -18 },
        { x: -120, y: 80, rot: -10 },
        { x: -40, y: 120, rot: -4 },
        { x: 40, y: 120, rot: 4 },
        { x: 120, y: 80, rot: 12 },
        { x: 200, y: 20, rot: 22 },
        { x: 260, y: -40, rot: 28 },
      ];
      const st = ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(".ab-big-results", { scale: 1 + 0.15 * p, opacity: 1 - 0.4 * p });
          gsap.set(".ab-small-team", { y: -60 * p, opacity: 1 - p * 1.5 });
          document.querySelectorAll<HTMLElement>(".ab-card").forEach((card, i) => {
            const m = moves[i];
            const rest = parseFloat(card.dataset.rot || "0");
            gsap.set(card, { x: m.x * p, y: m.y * p, rotation: rest + m.rot * p });
          });
          gsap.set("#ab-subline", { opacity: 1 - p * 2 });
        },
      });

      // Team grid reveal
      gsap.from(".ab-team-head > *", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ab-team-head", start: "top 80%" },
      });
      gsap.to(".ab-t-card", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ab-team-grid", start: "top 80%" },
      });
      gsap.set(".ab-t-card", { opacity: 0, y: 60 });
      gsap.from(".ab-t-card", {
        scale: 0.9,
        rotation: (i: number) => (i % 2 === 0 ? -3 : 3),
        duration: 1,
        stagger: 0.06,
        ease: "back.out(1.3)",
        scrollTrigger: { trigger: ".ab-team-grid", start: "top 80%" },
      });

      // Stats reveal + counters
      gsap.set(".ab-stats-inner", { opacity: 0, y: 60 });
      gsap.to(".ab-stats-inner", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ab-stats", start: "top 80%" },
      });

      ScrollTrigger.create({
        trigger: ".ab-stats",
        start: "top 75%",
        onEnter: () => {
          document.querySelectorAll<HTMLElement>(".ab-stat-block .ab-num").forEach((el) => {
            const target = parseFloat(el.dataset.count || "0");
            const span = el.querySelector("span");
            if (!span) return;
            gsap.to(
              { v: 0 },
              {
                v: target,
                duration: 1.8,
                ease: "power2.out",
                onUpdate: function () {
                  span.textContent = Math.floor((this.targets()[0] as any).v).toLocaleString();
                },
              }
            );
          });
        },
        once: true,
      });

      return () => {
        hero?.removeEventListener("mousemove", onMove);
        hero?.removeEventListener("mouseleave", onLeave);
        cancelAnimationFrame(raf);
        cleanups.forEach((fn) => fn());
        st.kill();
      };
    }, cardsRowRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef as any} className="ab-hero-shell">
        <div className="ab-grain" aria-hidden="true" />

        <h1 className="ab-small-team">
          {heroWords.map((w, i) => (
            <span key={i} className="ab-word">
              <span>{w}</span>
            </span>
          ))}
        </h1>

        <div className="ab-big-results-wrap">
          <div className="ab-big-results">
            {bigLetters.map((l, i) => (
              <span key={i} className="ab-letter">
                {l === " " ? "\u00A0" : l}
              </span>
            ))}
          </div>
        </div>

        <div ref={cardsRowRef} className="ab-cards-row">
          {HERO_CARDS.map((c, i) => (
            <div
              key={i}
              className={`ab-card ${c.cls}`}
              data-rot={c.rot}
              data-depth={c.depth}
              style={{ width: c.w, height: c.h, left: c.left, top: c.top }}
              aria-hidden="true"
            >
              {CARD_ICONS[i % CARD_ICONS.length]}
            </div>
          ))}
        </div>

        <div id="ab-subline" className="ab-subline">
          <a href="#ab-team" className="ab-arrow-pill">
            Meet the crew
            <span className="ab-ar">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </a>
          <div className="ab-subline-text">
            {team.length} people. 50+ shipped projects. Zero filler.
          </div>
        </div>
      </section>

      {/* TEAM GRID */}
      <section id="ab-team" className="ab-team-section">
        <div className="ab-team-head">
          <div>
            <p className="eyebrow text-ember-500 mb-4">The Crew · {team.length} strong</p>
            <h2>
              Strategists, builders
              <br />
              and the <em>quietly brilliant</em>.
            </h2>
          </div>
          <p>
            Every person you see here touches every project we ship. No middle
            layer, no handoffs to strangers — just direct work with the people
            doing it.
          </p>
        </div>

        <div className="ab-team-grid">
          {team.map((member, i) => (
            <div key={member.name} className="ab-t-card">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-hidden="true"
                />
              ) : (
                <>
                  <div
                    className={`absolute inset-0 ${avatarPalette[i % avatarPalette.length]}`}
                    aria-hidden="true"
                  />
                  <span className="ab-t-initials">{initials(member.name)}</span>
                </>
              )}
              <div className="ab-t-meta">
                <div className="ab-nm">{member.name}</div>
                <div className="ab-rl">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="ab-stats">
        <div className="ab-stats-inner">
          <h3>
            {team.length} humans.
            <br />
            One <em>tight ship</em>.
          </h3>
          {stats.slice(0, 3).map((s, i) => (
            <div key={i} className="ab-stat-block">
              <div className="ab-num" data-count={parseFloat(s.value) || 0}>
                {s.prefix}
                <span>0</span>
                {s.suffix}
              </div>
              <div className="ab-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
