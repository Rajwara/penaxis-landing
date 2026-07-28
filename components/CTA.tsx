"use client";

import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { contact } from "@/lib/data";

export default function CTA() {
  return (
    <section
      id="contact"
      data-nav-theme="dark"
      className="relative py-28 md:py-32 bg-ink text-white overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-violet-600/25 blur-3xl" />
        <div className="absolute -left-24 bottom-0 w-[380px] h-[380px] rounded-full bg-ember-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal as="p" className="eyebrow text-volt mb-5">
            Let&apos;s Talk
          </Reveal>
          <Reveal>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-6">
              Ready to move <span className="text-ember-400">forward?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/60 leading-relaxed max-w-md mb-10">
              Let&apos;s build a high-performance digital foundation for your
              brand that turns fans into dedicated subscribers and maximizes
              your commercial brand value on a global scale.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <MagneticButton
              href={`mailto:${contact.email}`}
              className="rounded-full bg-volt text-ink font-semibold px-8 py-4 text-sm inline-flex"
            >
              Start a Conversation →
            </MagneticButton>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm space-y-6">
            <ContactRow label="Phone" value={contact.phone} icon="phone" />
            <ContactRow label="Email" value={contact.email} icon="mail" />
            <ContactRow
              label="LinkedIn"
              value={contact.linkedin}
              icon="linkedin"
            />
            <ContactRow label="Website" value={contact.website} icon="globe" />
            <ContactRow
              label="Office"
              value={contact.address}
              icon="pin"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-volt">
        <RowIcon name={icon} />
      </span>
      <div>
        <p className="text-[11px] eyebrow text-white/40">{label}</p>
        <p className="text-sm text-white/85 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function RowIcon({ name }: { name: string }) {
  const common = { width: 16, height: 16, fill: "none" as const };
  switch (name) {
    case "phone":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path
            d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "mail":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="m4 7 8 6 8-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7.5 10v6M7.5 7.5v.01M11.5 16v-3.5c0-1.4 1-2.3 2.2-2.3 1.2 0 1.8.9 1.8 2.3V16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "globe":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    default:
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path
            d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}
