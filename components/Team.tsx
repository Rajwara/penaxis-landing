"use client";

import Reveal from "./Reveal";
import { team } from "@/lib/data";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const palette = ["bg-violet-600", "bg-ember-500", "bg-violet-900"];

export default function Team() {
  return (
    <section id="team" className="relative py-28 md:py-36 bg-haze/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 mb-14 items-end">
          <div>
            <Reveal as="p" className="eyebrow text-ember-500 mb-4">
              Our Team
            </Reveal>
            <Reveal>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight">
                The people behind{" "}
                <span className="text-violet-600">
                  strategy, technology &amp; growth.
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="text-ink/60 leading-relaxed">
              Penaxis brings together a cross-functional team of strategists,
              developers, AI specialists, designers, marketers, and business
              development professionals. By combining technical expertise
              with commercial thinking, our teams work collaboratively to
              turn ideas into scalable solutions and measurable business
              outcomes.
            </p>
            <div className="flex gap-8 mt-6">
              <div>
                <p className="font-display font-bold text-2xl text-violet-700">
                  30+
                </p>
                <p className="text-xs text-ink/50 eyebrow">Professionals</p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl text-violet-700">
                  ∞
                </p>
                <p className="text-xs text-ink/50 eyebrow">
                  Multiple Disciplines
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={(i % 5) * 0.05}>
              <div className="rounded-2xl border border-violet-100 bg-white p-5 text-center card-hover h-full flex flex-col items-center">
                <div
                  className={`w-14 h-14 rounded-full ${
                    palette[i % palette.length]
                  } text-white flex items-center justify-center font-display font-bold mb-4`}
                >
                  {initials(member.name)}
                </div>
                <p className="font-semibold text-sm text-ink">
                  {member.name}
                </p>
                <p className="text-xs text-ink/50 mt-1">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
