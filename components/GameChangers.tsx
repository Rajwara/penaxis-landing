"use client";

import Reveal from "./Reveal";
import { team, contact } from "@/lib/data";

const linkedinUrl = contact.linkedin.startsWith("http")
  ? contact.linkedin
  : `https://www.linkedin.com${contact.linkedin}`;

// Pick the three spotlighted people by name from the shared team data,
// so bios/roles/photos stay in sync with the rest of the site.
// Adeel is listed second so he lands in the center slot (which gets the
// vertical offset + bottom-corner accent treatment).
const featuredNames = ["Shahzad Ali", "Adeel Aslam", "Laiba Zafar"];
const featured = featuredNames
  .map((name) => team.find((m) => m.name === name))
  .filter((m): m is (typeof team)[number] => Boolean(m));

export default function GameChangers() {
  return (
    <section className="gc-section">
      <div className="mx-auto max-w-7xl px-6 relative">
        <span className="gc-watermark" aria-hidden="true">
          Game Changers
        </span>

        <Reveal as="p" className="eyebrow text-volt mb-4">
          Meet the
        </Reveal>
        <Reveal>
          <h2 className="gc-heading">Game Changers</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="gc-sub">
            The people setting the pace at Penaxis — leading strategy,
            driving new business, and shaping how the world sees us.
          </p>
        </Reveal>

        <div className="gc-cards">
          {featured.map((member, i) => (
            <Reveal key={member.name} delay={0.1 + i * 0.08}>
              <div className="gc-card">
                <div className="gc-card-accent" aria-hidden="true" />
                <img src={member.image} alt={member.name} />
                <div className="gc-card-dim" aria-hidden="true" />
                <div className="gc-card-shade" aria-hidden="true" />
                <div className="gc-card-content">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <ul>
                    <li>
                      <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M4.98 3.5a2.5 2.5 0 11-.01 5.001A2.5 2.5 0 014.98 3.5zM.5 8.98h9v14.02h-9V8.98zM8.03 8.98h4.31v1.91h.06c.6-1.14 2.07-2.34 4.26-2.34 4.55 0 5.39 3 5.39 6.9v7.55h-4.5v-6.69c0-1.6-.03-3.65-2.23-3.65-2.23 0-2.57 1.74-2.57 3.54v6.8h-4.5V8.98z" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
