"use client";

import { industries, contact } from "@/lib/data";

// Ported mechanism: a hover-triggered mega menu with a dark sidebar
// (pill tags + a featured teaser) and a grid of categorized links —
// seen on a real company's live site (Exergy Systems). That
// company's specific service categories, branding, and blog post
// weren't reused; this groups Penaxis's own real 13 industries into
// 5 categories, with Penaxis's own content in the sidebar.

const CATEGORIES = [
  {
    heading: "Technology & Digital",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
    items: ["Software, IT & SaaS", "Education & EdTech", "Fintech & Financial Services"],
  },
  {
    heading: "Commerce & Retail",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 6h18l-1.5 11a2 2 0 0 1-2 1.7H6.5a2 2 0 0 1-2-1.7L3 6z" />
        <path d="M8 6V5a4 4 0 0 1 8 0v1" />
      </svg>
    ),
    items: ["E-Commerce & Retail", "Food Delivery & Grocery", "Real Estate & Property"],
  },
  {
    heading: "Health & Lifestyle",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.8 8.6c0 5.4-8.8 10.4-8.8 10.4S3.2 14 3.2 8.6a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8z" />
      </svg>
    ),
    items: ["Healthcare & Wellness", "Sports & Fitness", "Pet Care & Veterinary"],
  },
  {
    heading: "Operations & Mobility",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="7" width="13" height="10" rx="1" />
        <path d="M14 10h4l4 4v3h-8z" />
      </svg>
    ),
    items: ["Logistics & Transportation", "Automotive & Auto Care", "Home Services & Maintenance"],
  },
  {
    heading: "Professional Services",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" />
      </svg>
    ),
    items: ["Consulting, Staffing & Immigration"],
  },
];

const findIndustry = (title: string) => industries.find((i) => i.title === title);

export default function IndustriesMegaMenu() {
  return (
    <div className="w-full min-h-[26rem] rounded-3xl bg-paper shadow-2xl border border-ink/5 overflow-hidden grid grid-cols-[220px_1fr] xl:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <div className="bg-ink text-white p-7 flex flex-col">
        <h4 className="font-display font-bold text-sm mb-3">Explore</h4>
        <div className="flex flex-wrap gap-2 mb-8">
          {["AI", "Software", "Growth"].map((tag) => (
            <span key={tag} className="rounded-full bg-white/10 px-3 py-1.5 text-xs">
              {tag}
            </span>
          ))}
        </div>
        <h4 className="font-display font-bold text-sm mb-3">13 industries, one team</h4>
        <a
          href="/industries"
          className="block rounded-xl overflow-hidden h-36 mb-4 relative group"
        >
          <img
            src="/images/hero/industries-network.webp"
            alt="Global industry network"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-colors" />
          <span className="absolute inset-0 flex items-end p-4 text-xs font-semibold text-white">
            See all industries →
          </span>
        </a>
        <a href="/contact" className="mt-auto text-xs text-white/60 hover:text-white transition-colors">
          Don't see yours? {contact.email}
        </a>
      </div>

      {/* Categories grid */}
      <div className="p-8 xl:p-9 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-7 gap-y-9 content-start">
        {CATEGORIES.map((cat) => (
          <div key={cat.heading}>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-ink text-white mb-3.5">
              <span className="w-4 h-4">{cat.icon}</span>
            </span>
            <h5 className="font-display font-bold text-sm text-ink mb-2.5">{cat.heading}</h5>
            <ul className="space-y-2">
              {cat.items.map((title) => {
                const ind = findIndustry(title);
                return (
                  <li key={title}>
                    <a
                      href="/industries"
                      title={ind?.copy}
                      className="text-sm text-ink/55 hover:text-violet-700 transition-colors"
                    >
                      {title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
