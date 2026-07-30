"use client";

import { useEffect, useState } from "react";

// Ported from a reference cookie-consent banner (Cookiebot-style): logo +
// heading + description on the left, action buttons on the right, and a
// bottom row — but with the granular Necessary/Preferences/Statistics/
// Marketing toggles replaced by Privacy Policy / Terms & Conditions links,
// per request. Remembers the visitor's choice in localStorage so it only
// shows once. NOTE: the linked Privacy Policy / Terms pages are placeholder
// boilerplate, not reviewed legal copy — flagged clearly on those pages and
// should be replaced with real, lawyer-reviewed text before this is
// considered a complete cookie-compliance solution.

const STORAGE_KEY = "penaxis_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      if (!existing) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* localStorage unavailable — banner just won't persist across visits */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cc-banner" role="dialog" aria-label="Cookie consent">
      <div className="cc-inner">
        <div className="cc-main">
          <span className="cc-mark-badge" aria-hidden="true">
            <img src="/images/logo/penaxis-mark.png" alt="" className="cc-mark" />
          </span>
          <div>
            <p className="cc-title">This website uses cookies</p>
            <p className="cc-copy">
              We use cookies to personalize content, provide social features, and analyze our
              traffic. We may share information about your use of this site with our analytics
              and advertising partners.
            </p>
          </div>
        </div>

        <div className="cc-actions">
          <button
            type="button"
            className="rounded-full bg-white/10 border border-white/20 hover:border-volt hover:bg-white/15 text-white font-semibold px-6 py-3 text-sm transition-colors"
            onClick={() => choose("accepted")}
          >
            Accept All
          </button>
          <button type="button" className="cc-btn cc-btn--ghost" onClick={() => choose("declined")}>
            Decline
          </button>
        </div>
      </div>

      <div className="cc-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <span className="cc-links-divider" aria-hidden="true" />
        <a href="/terms-conditions">Terms &amp; Conditions</a>
      </div>
    </div>
  );
}
