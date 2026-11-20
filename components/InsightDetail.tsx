import Reveal from "./Reveal";
import type { insights } from "@/lib/data";

type Insight = (typeof insights)[number];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function InsightDetail({ post, next }: { post: Insight; next: Insight }) {
  return (
    <>
      <section className="insd-banner">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <span className="insd-tag">{post.category}</span>
            <h1 className="insd-title">{post.title}</h1>
            <div className="insd-meta">
              <span>{formatDate(post.date)}</span>
              <span className="insd-meta-dot" aria-hidden="true" />
              <span>{post.readTime}</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="insd-hero">
              <img src={post.image} alt={post.title} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="insd-body">
        <div className="mx-auto max-w-4xl px-6">
          <div className="insd-body-inner">
            <Reveal delay={0.04}>
              {post.body.map((block, i) =>
                block.type === "h3" ? (
                  <h3 key={i} className="insd-h3">
                    {block.text}
                  </h3>
                ) : (
                  <p key={i} className="insd-p">
                    {block.text}
                  </p>
                )
              )}
            </Reveal>

            <Reveal delay={0.06}>
              <div className="insd-cta">
                <span className="insd-cta-label">Next up</span>
                <a href={`/insights/${next.slug}`} className="btn-grad px-6 py-3 text-sm">
                  {next.title}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
