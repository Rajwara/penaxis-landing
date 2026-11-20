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
    a: "Most MVPs launch in about 5 business days. We scope tight, ship something real fast, and iterate from there based on what we learn.",
    image: "/images/hero/faq-timeline.webp",
    href: "/services/ai-mvp",
  },
  {
    tag: "Getting Started",
    q: "What do we need to start?",
    a: "A clear problem statement, access to any existing data or systems, and a stakeholder who can make decisions. We'll run a kickoff call to align on scope.",
    image: "/images/hero/faq-getting-started.webp",
    href: "/contact-us",
  },
  {
    tag: "Industries",
    q: "Which industries do you work with?",
    a: "13 and counting - from software and healthcare to logistics, retail, and real estate. If yours isn't listed yet, tell us about it.",
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
  {
    tag: "Pricing",
    q: "How much does a typical project cost?",
    a: "It depends on scope, but most engagements fall into a few clear models - fixed-price for a defined MVP, or a monthly retainer for ongoing work. We'll give you a real number after a short discovery call, not a generic range.",
    image: "/images/hero/momentum-team.webp",
    href: "/contact-us",
  },
  {
    tag: "Team",
    q: "Who actually works on my project?",
    a: "A dedicated team matched to your project - typically a project lead, engineers, and a designer, backed by our wider team of 27+ specialists across product, engineering, and growth.",
    image: "/images/hero/team-group.webp",
    href: "/game-changers",
  },
  {
    tag: "Tech Stack",
    q: "What technologies do you build with?",
    a: "We pick the stack to fit the project, not the other way around - commonly React, Next.js, Node, Django, Flutter, and AI tooling, plus whatever your existing systems already run on.",
    image: "/images/services/web-crm-software-about.webp",
    href: "/services/web-crm-software",
  },
  {
    tag: "Support",
    q: "Do you offer support after launch?",
    a: "Yes. Every engagement includes a handover period, and most clients move into an ongoing support or retainer arrangement afterward so the product keeps improving post-launch.",
    image: "/images/hero/trusted-partner-office.webp",
    href: "/contact-us",
  },
  {
    tag: "Process",
    q: "How do you communicate during a project?",
    a: "Weekly check-ins at minimum, plus a shared channel for day-to-day questions. You'll always know what's shipped, what's in progress, and what's next.",
    image: "/images/hero/team-huddle.jpg",
    href: "/contact-us",
  },
  {
    tag: "Ownership",
    q: "Who owns the code and IP once the project is done?",
    a: "You do. Once the final payment clears, full ownership of the code, designs, and any custom IP built for you transfers entirely to your business.",
    image: "/images/hero/office-logo-desk.jpg",
    href: "/contact-us",
  },
  {
    tag: "Existing Products",
    q: "Can you work with an existing codebase, or only build from scratch?",
    a: "Both. We regularly take over existing products - auditing the code first, then improving, extending, or migrating it rather than starting over unless that's genuinely the better path.",
    image: "/images/services/digital-transformation-about.webp",
    href: "/services/digital-transformation",
  },
  {
    tag: "Design",
    q: "Do you handle design, or just development?",
    a: "Both, under one roof. Our designers and engineers work side by side, so what you approve in design is what actually ships - no handoff gaps.",
    image: "/images/services/ai-mvp-about.webp",
    href: "/services/ai-mvp",
  },
  {
    tag: "AI",
    q: "What do you mean by \"AI-powered\" development?",
    a: "We use AI to speed up the parts of building software that are mechanical - scaffolding, boilerplate, testing - so our engineers spend their time on the decisions that actually need a human. It also shows up directly in some products, like AI assistants or smart search.",
    image: "/images/services/pillar-ai-assistants-intelligent-features.webp",
    href: "/services/ai-mvp",
  },
  {
    tag: "Security",
    q: "How do you handle data security and compliance?",
    a: "Security is built in from the start, not bolted on - proper authentication, encrypted data, and access controls by default, with extra compliance work (like healthcare or fintech requirements) scoped in up front when relevant.",
    image: "/images/services/pillar-custom-software-integrated-systems.webp",
    href: "/industries/fintech-and-financial-services",
  },
  {
    tag: "Engagement",
    q: "Do you only do fixed projects, or can we hire your team on retainer?",
    a: "Both. Some clients need a defined project with a clear end date; others keep our team on as a fractional extension of theirs for ongoing development, sales, or growth work.",
    image: "/images/services/sales-growth-about.webp",
    href: "/services/sales-growth",
  },
  {
    tag: "Remote Work",
    q: "We're in a different time zone - how does that work?",
    a: "We work with clients across North America, Europe, and the Gulf already, with team overlap hours built into the schedule and async updates so nothing waits on a single meeting slot.",
    image: "/images/hero/industries-network.webp",
    href: "/contact-us",
  },
  {
    tag: "Proof of Work",
    q: "Can we see examples of what you've built before?",
    a: "Yes - explore our case studies for real, delivered projects across industries like logistics, healthcare, and e-commerce, with the actual problems we solved and what we built.",
    image: "/images/case-studies/grid/drivelo-logistics-platform-grid.webp",
    href: "/case-studies",
  },
  {
    tag: "Scope Changes",
    q: "What happens if we need to change scope mid-project?",
    a: "It happens on almost every project, and that's fine - we document the change, its impact on timeline and cost, and get your sign-off before any work starts, so there are never surprise invoices.",
    image: "/images/hero/team-celebration.webp",
    href: "/contact-us",
  },
  {
    tag: "Getting Started",
    q: "Is there a minimum project size you work with?",
    a: "We're set up for everything from a focused 5-day MVP sprint to multi-month platform builds. If you're not sure where your project fits, the fastest way to find out is a quick call.",
    image: "/images/panels/service-panel-team-1.webp",
    href: "/contact-us",
  },
  {
    tag: "Payments",
    q: "How are payments structured?",
    a: "Typically a milestone-based schedule tied to project phases, or a recurring monthly payment for retainer work - agreed upfront before any work starts, with no hidden fees.",
    image: "/images/hero/lets-connect-team.webp",
    href: "/contact-us",
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
