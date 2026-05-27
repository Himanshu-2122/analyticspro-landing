import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/email";
import { rateLimit, getRateLimitKey } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(getRateLimitKey(req, "newsletter"), 3, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { email } = parsed.data;
    if (db.subscriberExists(email)) {
      return NextResponse.json({ success: true, message: "You're already subscribed — thanks!" });
    }

    db.addSubscriber(email);
    await sendWelcomeEmail(email);
    return NextResponse.json({ success: true, message: "Subscribed! Check your inbox." });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
