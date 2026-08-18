"use client";

import { useEffect, useState } from "react";
import { contact } from "@/lib/data";
import { submitForm } from "@/lib/submitForm";

// Fixed vertical tab on the left edge of the viewport. Clicking it opens a
// modal with a short lead-capture form (name, email, phone, preferred
// contact method). Submits to /api/contact, which emails the submission
// to the Penaxis mailbox via Hostinger SMTP.

const CONTACT_METHODS = ["WhatsApp", "Call", "Email"];

export default function QuickQuote() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", contactMethod: "" });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeAndReset = () => {
    setOpen(false);
    setSubmitted(false);
    setError("");
    setForm({ name: "", email: "", phone: "", contactMethod: "" });
  };

  return (
    <>
      <button type="button" className="qq-tab" onClick={() => setOpen(true)}>
        Quick Quote
      </button>

      {open && (
        <div className="qq-overlay" onClick={closeAndReset}>
          <div className="qq-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Request a quick quote">
            <button type="button" className="qq-close" onClick={closeAndReset} aria-label="Close">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            {submitted ? (
              <div className="qq-success">
                <span className="qq-success-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3>Thanks - got it!</h3>
                <p>We&apos;ll reach out using your preferred contact method shortly.</p>
                <button type="button" className="qq-submit btn-grad" onClick={closeAndReset}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="qq-eyebrow">Let&apos;s talk</p>
                <h3 className="qq-title">Get a Quick Quote</h3>
                <p className="qq-sub">
                  Share a few details and we&apos;ll get back to you fast - or reach us directly
                  at {contact.email}.
                </p>

                <form
                  className="qq-form"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setError("");
                    setSubmitting(true);
                    try {
                      await submitForm("Quick Quote modal", form);
                      setSubmitted(true);
                    } catch (err) {
                      setError(err instanceof Error ? err.message : "Something went wrong.");
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  <label className="qq-field">
                    <span>Name</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </label>
                  <label className="qq-field">
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </label>
                  <label className="qq-field">
                    <span>Phone number</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 222 444 66"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </label>
                  <label className="qq-field">
                    <span>Preferred way to contact</span>
                    <select
                      name="contactMethod"
                      value={form.contactMethod}
                      onChange={(e) => setForm({ ...form, contactMethod: e.target.value })}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {CONTACT_METHODS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </label>

                  {error && <p className="qq-error">{error}</p>}

                  <button type="submit" className="qq-submit btn-grad" disabled={submitting}>
                    {submitting ? "Sending…" : "Request Quote"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
