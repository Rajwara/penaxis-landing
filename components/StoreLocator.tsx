"use client";

import { useEffect, useState } from "react";
import { contact } from "@/lib/data";

// Ported from a reference "Find a Store" popup: floating button, tab row
// for each location, and a card with address/phone/email/hours plus Call
// Now + Get Directions actions.
//
// Per client instruction: real per-office addresses for Dubai/Jordan
// aren't ready yet, so all three tabs use the real Pakistan office address
// for now. Phone numbers are clearly-placeholder (country code + a
// repeating placeholder digit string), not real numbers, pending the
// client's real numbers for each location. Hours are Mon–Sat 10am–7pm as
// given, Sunday closed.

const LOCATIONS = [
  { key: "pk", label: "Pakistan", countryCode: "+92" },
  { key: "ae", label: "Dubai", countryCode: "+971" },
  { key: "jo", label: "Jordan", countryCode: "+962" },
];

const PLACEHOLDER_LINE = "123456";

export default function StoreLocator() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [ccCleared, setCcCleared] = useState(false);

  useEffect(() => {
    try {
      setCcCleared(!!window.localStorage.getItem("penaxis_cookie_consent"));
    } catch {
      setCcCleared(false);
    }
    const onResolved = () => setCcCleared(true);
    window.addEventListener("penaxis-cookie-consent-resolved", onResolved);
    return () => window.removeEventListener("penaxis-cookie-consent-resolved", onResolved);
  }, []);

  const location = LOCATIONS[active];
  const phone = `${location.countryCode} ${PLACEHOLDER_LINE}`;
  const telHref = `tel:${location.countryCode}${PLACEHOLDER_LINE}`.replace(/\s/g, "");
  const mapsHref = `https://www.google.com/maps?q=${encodeURIComponent(contact.address)}`;

  return (
    <>
      <button type="button" className={`sl-tab ${ccCleared ? "cc-cleared" : ""}`} onClick={() => setOpen(true)}>
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.4" />
        </svg>
        Store Locator
      </button>

      {open && (
        <div className="sl-overlay" onClick={() => setOpen(false)}>
          <div className="sl-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Find a location">
            <div className="sl-header">
              <span className="sl-header-title">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
                  <circle cx="12" cy="9" r="2.4" />
                </svg>
                Find a Location
              </span>
              <button type="button" className="sl-close" onClick={() => setOpen(false)} aria-label="Close">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="sl-tabs">
              {LOCATIONS.map((loc, i) => (
                <button
                  key={loc.key}
                  type="button"
                  className={`sl-tab-btn ${i === active ? "is-active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  {loc.label}
                </button>
              ))}
            </div>

            <div className="sl-card">
              <div className="sl-card-head">
                <span className="sl-pin">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
                    <circle cx="12" cy="9" r="2.4" />
                  </svg>
                </span>
                <span className="sl-card-title">{location.label} Office</span>
              </div>

              <div className="sl-row">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7" />
                </svg>
                <span>{contact.address}</span>
              </div>
              <div className="sl-row">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2z" />
                </svg>
                <span>{phone}</span>
              </div>
              <div className="sl-row">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                <span>{contact.email}</span>
              </div>

              <div className="sl-hours">
                <p className="sl-hours-label">Opening Hours</p>
                <div className="sl-row">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" strokeLinecap="round" />
                  </svg>
                  <span>Mon–Sat: 10:00am – 7:00pm</span>
                </div>
                <p className="sl-hours-closed">Sunday: Closed</p>
              </div>

              <div className="sl-actions">
                <a href={telHref} className="sl-btn sl-btn--primary">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2z" />
                  </svg>
                  Call Now
                </a>
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="sl-btn sl-btn--ghost">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 11l18-8-8 18-2-8-8-2z" />
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
