"use client";

import Reveal from "./Reveal";

// Structured case study body: a left-hand section label paired with rich
// content on the right (paragraph, bullet list, tech-stack groups, or a
// metric grid) — following the "Client Overview / The Challenge / Our
// Solution / Technology / Business Impact" format used in Penaxis's own
// case study source document. Two projects (the AI receptionist kiosk and
// the tender-intelligence platform) are proposed/concept work rather than
// delivered, so a status badge makes that distinction clear rather than
// presenting unbuilt work as an achieved result.

type TechGroup = { label: string; items: string };
type Metric = { value: string; label: string };

export type CaseStudyDetailData = {
  title: string;
  status: string;
  region?: string;
  overview: string;
  challenge?: string;
  solutionIntro: string;
  solutionPoints: string[];
  solutionNote?: string;
  techStack: TechGroup[];
  impactIntro: string;
  impactPoints: string[];
  metrics: Metric[];
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="csd-row">
      <div className="csd-label">{label}</div>
      <div className="csd-body">{children}</div>
    </div>
  );
}

export default function CaseStudyDetail({ study }: { study: CaseStudyDetailData }) {
  const isConcept = study.status === "concept";

  return (
    <section className="csd-section">
      <div className="mx-auto max-w-5xl px-6">
        {isConcept && (
          <Reveal>
            <div className="csd-status-badge">
              Proposed Solution - designed, not yet built or deployed
            </div>
          </Reveal>
        )}

        {study.region && (
          <Reveal delay={0.02}>
            <Row label="Region">
              <p className="csd-p">{study.region}</p>
            </Row>
          </Reveal>
        )}

        <Reveal delay={0.04}>
          <Row label="Client Overview">
            <p className="csd-p">{study.overview}</p>
          </Row>
        </Reveal>

        {study.challenge && (
          <Reveal delay={0.06}>
            <Row label="The Challenge">
              <p className="csd-p">{study.challenge}</p>
            </Row>
          </Reveal>
        )}

        <Reveal delay={0.08}>
          <Row label={isConcept ? "Proposed Solution" : "Our Solution"}>
            <p className="csd-p">{study.solutionIntro}</p>
            {study.solutionPoints.length > 0 && (
              <ul className="csd-list">
                {study.solutionPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            {study.solutionNote && <p className="csd-p csd-note">{study.solutionNote}</p>}
          </Row>
        </Reveal>

        {study.techStack.length > 0 && (
          <Reveal delay={0.1}>
            <Row label="Technology">
              <div className="csd-tech-groups">
                {study.techStack.map((group) => (
                  <div className="csd-tech-group" key={group.label}>
                    <span className="csd-tech-label">{group.label}</span>
                    <span className="csd-tech-items">{group.items}</span>
                  </div>
                ))}
              </div>
            </Row>
          </Reveal>
        )}

        <Reveal delay={0.12}>
          <Row label={isConcept ? "Expected Business Impact" : "Business Impact"}>
            <p className="csd-p">{study.impactIntro}</p>
            {study.impactPoints.length > 0 && (
              <ul className="csd-list">
                {study.impactPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </Row>
        </Reveal>

        {study.metrics.length > 0 && (
          <Reveal delay={0.14}>
            <Row label="Metrics">
              <div className="csd-metrics">
                {study.metrics.map((m) => (
                  <div className="csd-metric" key={m.label}>
                    <span className="csd-metric-value">{m.value}</span>
                    <span className="csd-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            </Row>
          </Reveal>
        )}
      </div>
    </section>
  );
}
