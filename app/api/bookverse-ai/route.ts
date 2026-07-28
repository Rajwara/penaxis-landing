import { NextRequest, NextResponse } from "next/server";

// Server-side proxy for BookVerse's AI Studio features. Keeps the
// Anthropic API key on the server (set ANTHROPIC_API_KEY in your
// Vercel project's environment variables) instead of exposing it in
// client-side code, which is what the original Artifacts-only version
// relied on Anthropic's own proxy to avoid.

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "ANTHROPIC_API_KEY is not set on the server. Add it in your Vercel project's Environment Variables to enable BookVerse's AI Studio features.",
      },
      { status: 500 }
    );
  }

  try {
    const { prompt, system } = await req.json();

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to reach the Claude API." },
      { status: 500 }
    );
  }
}
