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
            The people setting the pace at Penaxis - leading strategy,
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
                        <svg viewBox="0 0 370 370" width="16" height="16" fill="currentColor">
                          <path d="M251.4,203.9c-.5-15.1-5.2-27.9-21-28.8-14.2-.9-25.5,10.6-25.6,25v76.1s-44.2,0-44.2,0v-132.9c0,0,44.1,0,44.1,0l.2,18.5c6.4-9.3,14.3-16.6,25.2-19.6s20.7-2.6,30.8.3c24.3,7,34.1,30.5,34.6,55v78.7s-44.2,0-44.2,0v-72.2Z" />
                          <rect x="92" y="143.2" width="44.2" height="133" />
                          <path d="M131.6,118.9c-5.7,5.1-13,6.4-20.2,6-10.4-.6-19-7.5-21.2-16.8s1.6-21.2,11.4-26c8.2-4,17.9-3.9,25.9.2s10.3,9.9,11.3,16.1-1.1,15.3-7,20.6Z" />
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
