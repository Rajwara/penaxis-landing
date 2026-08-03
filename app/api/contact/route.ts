import { NextRequest, NextResponse } from "next/server";
import { sendFormSubmission } from "@/lib/mailer";

// Shared endpoint for every form on the site (homepage "Let's Connect",
// the /contact page form, and the Quick Quote modal). Each form sends a
// `source` label plus its own field set — this route just validates the
// basics and emails the submission via lib/mailer.ts.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { source, fields } = body as { source?: string; fields?: Record<string, string> };

    if (!fields || typeof fields !== "object") {
      return NextResponse.json({ error: "Missing form fields." }, { status: 400 });
    }

    // Basic honeypot check — if the hidden field is filled, silently
    // pretend success without sending an email (bot submission).
    if (fields.company_website) {
      return NextResponse.json({ ok: true });
    }

    const name = (fields.name || "").trim();
    const email = (fields.email || "").trim();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    await sendFormSubmission({
      source: source || "Unknown form",
      fields,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form submission failed:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
