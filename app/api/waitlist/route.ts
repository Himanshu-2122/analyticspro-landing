import { NextRequest, NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { sendWaitlistConfirmation } from "@/lib/email";
import { rateLimit, getRateLimitKey } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(getRateLimitKey(req, "waitlist"), 3, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = waitlistSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { name, email, company } = parsed.data;
    if (db.waitlistExists(email)) {
      return NextResponse.json({ error: "You're already on the waitlist!" }, { status: 409 });
    }

    db.addToWaitlist(name, email, company ?? "");
    await sendWaitlistConfirmation(name, email);
    return NextResponse.json({
      success: true,
      message: "You're on the waitlist! Check your email for confirmation.",
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
