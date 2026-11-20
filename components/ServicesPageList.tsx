import Reveal from "./Reveal";
import { services } from "@/lib/data";

// Full services listing for /services — image card grid (image, number,
// title, short description, "Learn more") linking into each service's
// own /services/[slug] detail page.

export default function ServicesPageList() {
  return (
    <section className="sphl-section">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal as="div" className="sphl-head">
          <span className="sphl-eyebrow">What We Do</span>
          <h2 className="sphl-heading">Every service, in detail.</h2>
        </Reveal>

        <div className="sphl-grid">
          {services.map((s, i) => (
            <Reveal key={s.slug} y={20} delay={0.05 + i * 0.06}>
              <a href={`/services/${s.slug}`} className="sphl-card">
                <div className="sphl-card-media">
                  <img src={s.heroImage} alt={s.title} />
                </div>
                <div className="sphl-card-body">
                  <span className="sphl-card-num">{s.number}</span>
                  <h3 className="sphl-card-title">{s.title}</h3>
                  <p className="sphl-card-copy">{s.short}</p>
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
