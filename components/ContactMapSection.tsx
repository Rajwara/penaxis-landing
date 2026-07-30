"use client";

import Reveal from "./Reveal";
import { contact } from "@/lib/data";

// Embeds a real Google Maps view of Penaxis's actual office address,
// replacing a reference screenshot's own placeholder ("Tower of
// London"). Standard Google Maps embed iframe — no API key needed.

export default function ContactMapSection() {
  const query = encodeURIComponent(contact.address);

  return (
    <section className="py-4 px-6">
      <Reveal as="div" y={30} className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-ink/10">
        <iframe
          title="Penaxis office location"
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          width="100%"
          height="420"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Reveal>
    </section>
  );
}
