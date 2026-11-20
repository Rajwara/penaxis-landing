import Reveal from "./Reveal";
import { services } from "@/lib/data";

// Full services listing for /services — a horizontal, icon-chip card per
// service (number, icon, title, description, tech stack pills, "Learn
// more") linking into its own /services/[slug] detail page. Deliberately
// not another plain image-top card grid (already the pattern on
// Industries/Insights/Case Studies) so /services has its own identity.

const SERVICE_ICONS: Record<string, JSX.Element> = {
  "ai-mvp": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2a5 5 0 0 0-5 5c0 1.8.9 3 1.5 4.2C9 12.6 9 13 9 14v2h6v-2c0-1 0-1.4.5-2.8.6-1.2 1.5-2.4 1.5-4.2a5 5 0 0 0-5-5z" />
      <path d="M9 19h6M10 22h4" />
    </svg>
  ),
  "digital-transformation": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v5h-5" />
    </svg>
  ),
  "sales-growth": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 17l6-6 4 4 8-8M21 7v6" />
    </svg>
  ),
  "web-crm-software": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18M8 21h8" />
    </svg>
  ),
};

// The default heroImage for web-crm-software is an abstract graphic that
// doesn't match the other 3 services' real photos — use the on-brand
// product-mockup image already shipped for this service instead.
const CARD_IMAGES: Record<string, string> = {
  "web-crm-software": "/images/services/pillar-website-ecommerce-development.webp",
};

export default function ServicesPageList() {
  return (
    <section className="sphl-section">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal as="div" className="sphl-head">
          <span className="sphl-eyebrow">What We Do</span>
          <h2 className="sphl-heading">Every service, in detail.</h2>
        </Reveal>

        <div className="sphl-list">
          {services.map((s, i) => (
            <Reveal key={s.slug} y={20} delay={0.05 + i * 0.06}>
              <a href={`/services/${s.slug}`} className="sphl-card">
                <div className="sphl-card-media">
                  <img src={CARD_IMAGES[s.slug] || s.heroImage} alt={s.title} />
                  <span className="sphl-card-icon">{SERVICE_ICONS[s.slug]}</span>
                </div>
                <div className="sphl-card-body">
                  <span className="sphl-card-num">{s.number}</span>
                  <h3 className="sphl-card-title">{s.title}</h3>
                  <p className="sphl-card-copy">{s.short}</p>
                  <ul className="sphl-card-stack">
                    {s.stack.slice(0, 4).map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <span className="sphl-card-link">
                    Learn more
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
