import Reveal from "./Reveal";
import { insights } from "@/lib/data";

// Homepage "Insights" teaser — ported from a reference "News & Articles"
// layout (dark banner, eyebrow + heading on the left, a pill "All
// articles" button on the right, 3 cards with image / category tag /
// title / read link below). Restyled with Penaxis's own palette (ink
// background, ember/volt accent instead of the reference's green) and
// font stack, and showing Penaxis's own editorial insights instead of
// generic blog placeholders. Deliberately labeled "Insights" rather than
// "Blog" throughout, per how the content is actually positioned on this
// site (thought leadership, not a running blog).

const FEATURED = insights.slice(0, 3);

export default function InsightsSection() {
  return (
    <section className="ins-section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="ins-head">
          <Reveal as="div">
            <span className="ins-eyebrow">Insights</span>
            <h2 className="ins-heading">News &amp; Articles</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <a href="/insights" className="ins-all-link">
              <span>All articles</span>
              <span className="ins-all-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </Reveal>
        </div>

        <div className="ins-grid">
          {FEATURED.map((post, i) => (
            <Reveal key={post.slug} y={20} delay={0.05 + i * 0.06}>
              <a href={`/insights/${post.slug}`} className="ins-card">
                <div className="ins-card-media">
                  <img src={post.image} alt="" className="ins-card-img" />
                </div>
                <div className="ins-card-body">
                  <span className="ins-card-tag">{post.category}</span>
                  <h3 className="ins-card-title">{post.title}</h3>
                  <span className="ins-card-link">
                    Read article
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
