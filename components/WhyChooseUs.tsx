"use client";

import Reveal from "./Reveal";
import { whyUs } from "@/lib/data";

// Ported from a reference "why choose us" layout: bordered light-gray
// panel, small square-bullet eyebrow, big two-line heading, an abstract
// tiled-block decoration top-right, a dashed-divider 4-column feature row
// with corner dot markers, and a diagonally-striped bottom bar. Reuses
// Penaxis's real whyUs content (same data used elsewhere on the site).

const FEATURED = [
  { title: "Results-Driven Approach", copy: whyUs.find((w) => w.title === "Results-Driven Approach")?.copy, icon: "data-driven" },
  { title: "AI & Automation Driven", copy: whyUs.find((w) => w.title === "AI & Automation Driven")?.copy, icon: "bolt" },
  { title: "Responsive Collaboration", copy: whyUs.find((w) => w.title === "Responsive Collaboration")?.copy, icon: "handshake" },
  { title: "Proven Expertise", copy: whyUs.find((w) => w.title === "Proven Expertise")?.copy, icon: "award" },
];

const ICONS: Record<string, JSX.Element> = {
  "data-driven": (
    <svg viewBox="0 0 100 100" width="20" height="20" fill="currentColor">
      <path d="M74.65,49.92c0,13.58-11,24.58-24.58,24.58s-24.58-11-24.58-24.58,11-24.58,24.58-24.58,24.58,11,24.58,24.58ZM39.42,45.97l5.7-4.95c.64.09,1.26,0,1.87-.24l5.18,2.57c.17,1.4,1.42,2.16,2.65,1.9,1.14-.24,1.94-1.4,1.67-2.68l5.99-6.25c1.44.27,2.58-.81,2.64-2.06.06-1.38-1.14-2.41-2.36-2.3-1.38.13-2.28,1.34-1.98,2.74l-5.96,6.21c-.6-.01-1.07.08-1.69.29l-5.17-2.58c-.23-1.34-1.3-2.07-2.5-1.92-1.27.15-1.87,1.34-1.9,2.51l-5.69,5.01c-1.38-.35-2.62.51-2.83,1.78-.22,1.34.84,2.52,2.1,2.55,1.4.03,2.41-1.11,2.28-2.56ZM64.55,64.89c.35,0,.68-.38.68-.75v-21.24c-.06-.43-.4-.71-.78-.71h-3.09c-.32,0-.74.32-.74.71v21.23c0,.43.37.73.72.76h3.21ZM47.41,64.89c.31,0,.64-.37.69-.69v-15.25c-.06-.39-.42-.71-.78-.71h-3.15c-.31,0-.63.33-.69.67v15.21c0,.38.36.75.7.75h3.23ZM56.04,64.9c.31-.09.62-.42.62-.75v-12.02c0-.37-.38-.7-.7-.74h-3.13c-.37,0-.71.28-.79.68v12.15c.08.4.41.68.78.68h3.21ZM38.89,64.9c.33-.1.6-.41.64-.74v-7.35c0-.41-.32-.77-.73-.77h-3.13c-.4,0-.77.34-.77.77v7.35c0,.42.38.73.76.73h3.21Z" />
      <path d="M68.21,69.83l1.61,1.52c-1.83,2.42-1.86,5.53-.23,8.02-11.08,7.29-25.15,7.88-36.84,1.34-10.52-5.88-17.65-17.17-17.99-29.62h8.4c.38,10.17,6.69,19.24,15.7,23.33,9.92,4.49,21.26,2.7,29.34-4.58Z" />
      <path d="M14.77,48.75c.14-4.46,1.11-8.73,2.83-12.76,3.17,1.63,6.86.63,8.8-2.17s1.54-6.65-1.13-9.01l1.1-1.08c1.86,2.27,5.03,2.77,7.43,1.21s3.3-4.62,1.94-7.31c4.2-1.86,8.59-2.86,13.16-3.02v8.4c-13.87.57-25.15,11.77-25.73,25.73h-8.4Z" />
      <path d="M68.27,30.05c-4.73-4.26-10.56-6.76-17.01-7.04l-.02-8.4c8.6.28,16.66,3.64,22.96,9.5l-5.93,5.94Z" />
      <path d="M77,48.75c-.32-6.33-2.72-12.28-7.07-17.02l5.94-5.94c5.88,6.31,9.22,14.37,9.51,22.95h-8.38Z" />
      <path d="M79.19,69.92c-2.36-1.59-5.22-1.68-7.61-.18l-1.64-1.64c4.31-4.73,6.75-10.66,7.04-17.01h8.4c-.24,6.78-2.34,13.21-6.19,18.84Z" />
      <circle cx="75.24" cy="75.49" r="4.47" />
      <circle cx="20.78" cy="29.95" r="4.47" />
      <circle cx="30.76" cy="20.23" r="3.26" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 12l4-4 4 2 4-3 4 3 4-1M2 12l4 5 3-2 3 3 3-3 3 2 4-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="5" />
      <path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5" />
    </svg>
  ),
};

export default function WhyChooseUs() {
  return (
    <section className="wcu-section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="wcu-panel">
          <div className="wcu-head">
            <Reveal>
              <span className="wcu-eyebrow">
                <span className="wcu-eyebrow-dot" />
                Why Choose Us
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="wcu-heading">
                We Help Businesses
                <br />
                Grow With Clarity
              </h2>
            </Reveal>
          </div>

          <div className="wcu-grid">
            {FEATURED.map((item, i) => (
              <Reveal key={item.title} y={20} delay={0.05 + i * 0.06}>
                <div className="wcu-item">
                  <span className="wcu-item-corner wcu-item-corner--tl" aria-hidden="true" />
                  <span className="wcu-item-corner wcu-item-corner--tr" aria-hidden="true" />
                  <span className="wcu-icon">{ICONS[item.icon]}</span>
                  <h3 className="wcu-item-title">{item.title}</h3>
                  <p className="wcu-item-copy">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="wcu-stripe" aria-hidden="true">
            <span className="wcu-item-corner wcu-item-corner--tl" />
            <span className="wcu-item-corner wcu-item-corner--tr" />
          </div>
        </div>
      </div>
    </section>
  );
}
