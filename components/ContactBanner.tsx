"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contact } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Ported technique: each line's text fill scrubs in as it scrolls
// through the middle of the viewport (via a background-clip:text
// gradient scrubbed by ScrollTrigger), and hovering swaps in a solid
// color block with a second line of copy using a clip-path reveal.
// Originally demoed by Minh Pham (twitter.com/juxtopposed); that
// credit link and the placeholder demo lines aren't reused — copy
// here is written fresh for the Penaxis contact page, colors mapped
// to the brand palette.
//
// The reveal is driven by a click/tap toggle (activeIndex) rather than
// pure CSS :hover. Touch devices don't have real hover, and some mobile
// browsers get stuck simulating a hover state after a tap-scroll — which
// made every line's hidden sub-text appear stacked on the main text at
// once. The CSS :hover variant is now gated to real pointer devices via
// @media(hover:hover), and this click toggle covers touch instead.

const LINES: { main: string; hover: React.ReactNode }[] = [
  { main: "LET'S TALK", hover: "ABOUT YOUR PROJECT" },
  { main: "GOT AN IDEA", hover: "WE'LL HELP SHAPE IT" },
  { main: "NO BRIEF YET", hover: "THAT'S OKAY, START ANYWAY" },
  { main: "READY WHEN", hover: "YOU ARE" },
  {
    main: "SAY HELLO",
    hover: (
      <a href={`mailto:${contact.email}`}>{contact.email}</a>
    ),
  },
];

export default function ContactBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const textElements = gsap.utils.toArray<HTMLElement>(".ct-text");
      if (prefersReduced) {
        textElements.forEach((el) => (el.style.backgroundSize = "100%"));
        return;
      }
      textElements.forEach((text) => {
        gsap.to(text, {
          backgroundSize: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: text,
            start: "center 80%",
            end: "center 20%",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ct-banner">
      <div ref={containerRef} className="ct-container">
        {LINES.map((line, i) => (
          <h1
            className={`ct-text ${activeIndex === i ? "ct-active" : ""}`}
            key={i}
            onClick={() => setActiveIndex((prev) => (prev === i ? null : i))}
          >
            {line.main}
            <span className="ct-text-span">{line.hover}</span>
          </h1>
        ))}
      </div>
    </section>
  );
}
