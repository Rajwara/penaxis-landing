import nodemailer from "nodemailer";

// Sends form submissions straight to a Penaxis mailbox via Hostinger's
// SMTP server. No third-party form service — just your own mail server.
//
// Required environment variables (set these in Vercel → Project Settings
// → Environment Variables, never committed to the repo):
//   SMTP_HOST        e.g. smtp.hostinger.com
//   SMTP_PORT        e.g. 465
//   SMTP_USER        the mailbox that authenticates, e.g. adeel.aslam@penaxis.com
//   SMTP_PASS        that mailbox's password
//   CONTACT_TO_EMAIL where submissions should be delivered (defaults to SMTP_USER if unset)

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Missing SMTP configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS as environment variables."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: { user, pass },
  });
}

export type FormSubmission = {
  source: string; // which form/section this came from, e.g. "Homepage — Let's Connect"
  fields: Record<string, string>;
};

export async function sendFormSubmission({ source, fields }: FormSubmission) {
  const transporter = getTransporter();
  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER!;
  const from = process.env.SMTP_USER!;

  const rows = Object.entries(fields)
    .filter(([, value]) => value && value.trim().length > 0)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 12px;color:#666;font-family:sans-serif;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(
          key
        )}</td><td style="padding:6px 12px;font-family:sans-serif;font-size:14px;">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:560px;">
      <h2 style="color:#734FA0;margin-bottom:4px;">New form submission</h2>
      <p style="color:#888;margin-top:0;margin-bottom:20px;font-size:13px;">${escapeHtml(source)}</p>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
    </div>
  `;

  const text = Object.entries(fields)
    .filter(([, value]) => value && value.trim().length > 0)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  await transporter.sendMail({
    from: `"Penaxis Website" <${from}>`,
    to,
    replyTo: fields.email || undefined,
    subject: `New form submission — ${source}`,
    text: `${source}\n\n${text}`,
    html,
  });
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
