"use client";

import { useState } from "react";
import Reveal from "./Reveal";

// FAQ accordion: eyebrow + headline + expandable question cards, each
// answer sliding open/closed. Layout inspired by a generic
// agency-template FAQ section; questions/answers are original,
// written for Penaxis's actual services. Redesigned for a cleaner
// look: bigger cards/text, stronger soft shadows, more pronounced
// entrance animation.

const FAQS = [
  {
    q: "What's the typical timeline from idea to v1?",
    a: "Most MVPs launch in about 3 weeks. We scope tight, ship something real fast, and iterate from there based on what we learn.",
  },
  {
    q: "What do we need to start?",
    a: "A clear problem statement, access to any existing data or systems, and a stakeholder who can make decisions. We'll run a kickoff call to align on scope.",
  },
  {
    q: "Which industries do you work with?",
    a: "13 and counting — from software and healthcare to logistics, retail, and real estate. If yours isn't listed yet, tell us about it.",
  },
  {
    q: "Do you only build software, or do you help with growth too?",
    a: "Both. Penaxis combines AI-powered product development with fractional sales and digital transformation support, so the systems we build actually get used.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-haze/50">
      <Reveal as="div" y={30} scale={0.96} className="text-center mb-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm px-4 py-1.5 text-xs font-semibold text-ember-500">
          <span className="w-1.5 h-1.5 rounded-full bg-ember-500" />
          FAQs
        </span>
        <h2 className="mt-6 font-display font-bold text-4xl md:text-6xl text-ink">
          Frequently Asked
          <br />
          Questions
        </h2>
      </Reveal>

      <div className="max-w-3xl mx-auto space-y-5">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal as="div" key={item.q} delay={i * 0.1} y={32} scale={0.96}>
              <div
                className={`rounded-3xl bg-white transition-shadow duration-300 overflow-hidden ${
                  isOpen
                    ? "shadow-[0_25px_55px_-15px_rgba(46,31,66,0.28)]"
                    : "shadow-[0_12px_30px_-12px_rgba(46,31,66,0.15)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left"
                >
                  <span className="font-display font-bold text-lg md:text-xl text-ink">{item.q}</span>
                  <span
                    className={`shrink-0 w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center shadow-[0_10px_20px_-6px_rgba(33,33,33,0.5)] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    {isOpen ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    )}
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-7 pb-7 -mt-1 text-base text-ink/60 leading-relaxed border-t border-ink/10 pt-5">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
