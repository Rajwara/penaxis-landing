"use client";

import Reveal from "./Reveal";

export default function AboutV2TeamPhoto() {
  return (
    <section className="av2-photo-section">
      <div className="mx-auto max-w-6xl px-6">
        <p className="av2-photo-eyebrow">Who We Are</p>
        <h2 className="av2-photo-heading">We turn ambitious ideas into products, systems and growth.</h2>
        <Reveal className="av2-photo-frame">
          <img src="/images/who-we-are/team-photo.webp" alt="The Penaxis team" />
        </Reveal>
      </div>
    </section>
  );
}
