import { NextRequest, NextResponse } from "next/server";
import { sendFormSubmission, type FormAttachment } from "@/lib/mailer";

// Shared endpoint for every form on the site (homepage "Let's Connect",
// the /contact page form, and the Quick Quote modal). Each form sends a
// `source` label plus its own field set — this route just validates the
// basics and emails the submission via lib/mailer.ts.
//
// The /contact page form can also attach files. Those come in as
// multipart/form-data instead of JSON — Vercel's serverless functions cap
// request bodies at ~4.5MB, so limits here are deliberately conservative.

const MAX_FILE_BYTES = 3 * 1024 * 1024; // 3MB per file
const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // 4MB combined, staying under Vercel's ~4.5MB body cap
const MAX_FILES = 3;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let source = "Unknown form";
    let fields: Record<string, string> = {};
    let attachments: FormAttachment[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      source = String(formData.get("source") || "Unknown form");

      const rawFields = formData.get("fields");
      if (typeof rawFields === "string") {
        try {
          fields = JSON.parse(rawFields);
        } catch {
          return NextResponse.json({ error: "Malformed form fields." }, { status: 400 });
        }
      }

      const files = formData.getAll("attachments").filter((f): f is File => f instanceof File);

      if (files.length > MAX_FILES) {
        return NextResponse.json({ error: `Please attach at most ${MAX_FILES} files.` }, { status: 400 });
      }

      let totalBytes = 0;
      for (const file of files) {
        if (!ALLOWED_TYPES.has(file.type)) {
          return NextResponse.json(
            { error: `"${file.name}" isn't a supported file type. Use JPG, PNG, PDF, or Word documents.` },
            { status: 400 }
          );
        }
        if (file.size > MAX_FILE_BYTES) {
          return NextResponse.json(
            { error: `"${file.name}" is too large. Max size per file is 3MB.` },
            { status: 400 }
          );
        }
        totalBytes += file.size;
        if (totalBytes > MAX_TOTAL_BYTES) {
          return NextResponse.json({ error: "Attachments are too large overall. Max total is 4MB." }, { status: 400 });
        }
      }

      attachments = await Promise.all(
        files.map(async (file) => ({
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
          contentType: file.type,
        }))
      );
    } else {
      const body = await req.json();
      source = body.source || "Unknown form";
      fields = body.fields || {};
    }

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
      source,
      fields,
      attachments: attachments.length > 0 ? attachments : undefined,
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
