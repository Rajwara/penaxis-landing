import Reveal from "./Reveal";
import type { industries, caseStudies } from "@/lib/data";

type Industry = (typeof industries)[number];
type CaseStudy = (typeof caseStudies)[number];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function IndustryDetail({
  industry,
  relatedCaseStudies,
}: {
  industry: Industry;
  relatedCaseStudies: CaseStudy[];
}) {
  return (
    <>
      <section className="indd-banner">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <span className="indd-eyebrow">Industries</span>
            <h1 className="indd-title">{industry.title}</h1>
            <p className="indd-intro">{industry.copy}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="indd-hero">
              <img src={industry.image} alt={industry.title} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="indd-challenge">
        <div className="mx-auto max-w-7xl px-6">
          <div className="indd-challenge-grid">
            <Reveal>
              <h2 className="indd-solutions-heading">The challenge</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="indd-challenge-copy">{industry.challenge}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="indd-solutions">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="indd-solutions-heading">What we build</h2>
          </Reveal>
          <div className="indd-solutions-grid">
            {industry.solutions.map((point, i) => (
              <Reveal key={point} y={16} delay={0.05 + i * 0.06}>
                <div className="indd-solution-card">
                  <span className="indd-solution-icon">
                    <CheckIcon />
                  </span>
                  <p>{point}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="indd-outcomes">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="indd-solutions-heading">What this looks like in practice</h2>
          </Reveal>
          <div className="indd-outcomes-list">
            {industry.outcomes.map((point, i) => (
              <Reveal key={point} y={16} delay={0.05 + i * 0.06}>
                <div className="indd-outcome-row">
                  <span className="indd-outcome-num">{String(i + 1).padStart(2, "0")}</span>
                  <p>{point}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {relatedCaseStudies.length > 0 && (
        <section className="indd-related">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <h2 className="indd-solutions-heading">Related work</h2>
            </Reveal>
            <div className="indd-related-grid">
              {relatedCaseStudies.map((study, i) => (
                <Reveal key={study.slug} y={16} delay={0.05 + i * 0.06}>
                  <a href={`/case-studies/${study.slug}`} className="csv2-card">
                    <div
                      className="csv2-card-thumb"
                      style={
                        study.gridImage
                          ? { backgroundImage: `url(${study.gridImage})`, backgroundSize: "cover", backgroundPosition: "center" }
                          : { background: "linear-gradient(150deg, #734FA0, #2a1d43)" }
                      }
                    />
                    <h3 className="csv2-card-title">{study.title}</h3>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="indd-cta">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="indd-cta-inner">
              <h2>
                Building for {industry.title.split(",")[0].split("&")[0].trim()}? <em>Let&apos;s talk.</em>
              </h2>
              <a href="/contact-us" className="btn-grad px-7 py-3.5">
                Start a project
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
