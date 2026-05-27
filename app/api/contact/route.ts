import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";
import { rateLimit, getRateLimitKey } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(getRateLimitKey(req, "contact"), 5, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { name, email, message } = parsed.data;
    db.addContact(name, email, message);
    await sendContactNotification(name, email, message);
    return NextResponse.json({
      success: true,
      message: "Message sent! We'll get back to you within 2 hours.",
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
