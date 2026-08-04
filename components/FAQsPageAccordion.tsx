"use client";

import { useState } from "react";
import Reveal from "./Reveal";

// Ported from a reference "projects" accordion (breadcrumb eyebrow, big
// heading, date-tagged expandable rows with an image + description +
// "Explore more" link) and applied to FAQs instead. Content reuses the
// same real Q&A already used in FAQSection.tsx (contact page) — written
// for Penaxis's actual services — with category tags standing in for the
// reference's year tags. Images are real, topic-matched illustrations
// (one per question) supplied for this page specifically.

const FAQS = [
  {
    tag: "Process",
    q: "What's the typical timeline from idea to v1?",
    a: "Most MVPs launch in about 3 weeks. We scope tight, ship something real fast, and iterate from there based on what we learn.",
    image: "/images/hero/faq-timeline.webp",
    href: "/services/ai-mvp",
  },
  {
    tag: "Getting Started",
    q: "What do we need to start?",
    a: "A clear problem statement, access to any existing data or systems, and a stakeholder who can make decisions. We'll run a kickoff call to align on scope.",
    image: "/images/hero/faq-getting-started.webp",
    href: "/contact",
  },
  {
    tag: "Industries",
    q: "Which industries do you work with?",
    a: "13 and counting — from software and healthcare to logistics, retail, and real estate. If yours isn't listed yet, tell us about it.",
    image: "/images/hero/faq-industries.webp",
    href: "/industries",
  },
  {
    tag: "Services",
    q: "Do you only build software, or do you help with growth too?",
    a: "Both. Penaxis combines AI-powered product development with fractional sales and digital transformation support, so the systems we build actually get used.",
    image: "/images/hero/faq-software-growth.webp",
    href: "/services/ai-mvp",
  },
];

export default function FAQsPageAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faqp-section">
      <div className="faqp-head">
        <Reveal>
          <p className="faqp-breadcrumb">/ faqs /</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="faqp-heading">
            Answers to help you
            <br />
            move forward with Penaxis
          </h1>
        </Reveal>
      </div>

      <div className="faqp-list">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} y={20} delay={0.03 * i}>
              <div className="faqp-row">
                <button
                  type="button"
                  className="faqp-row-head"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="faqp-tag">{item.tag}</span>
                  <span className="faqp-q">{item.q}</span>
                  <span className={`faqp-chevron ${isOpen ? "is-open" : ""}`} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                <div className={`faqp-body ${isOpen ? "is-open" : ""}`}>
                  <div className="faqp-body-inner">
                    <img src={item.image} alt="" className="faqp-image" />
                    <p className="faqp-a">{item.a}</p>
                    <a href={item.href} className="faqp-explore">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Explore more
                    </a>
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
