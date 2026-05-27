import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
import { rateLimit, getRateLimitKey } from "@/lib/rateLimit";

export const runtime = "nodejs";

const schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(getRateLimitKey(req, "forgot"), 3, 15 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Always return success to prevent user enumeration
    const user = db.findUserByEmail(parsed.data.email);
    if (user && user.password) {
      const token = db.setPasswordResetToken(user.id);
      await sendPasswordResetEmail(user.name, user.email, token);
    }

    return NextResponse.json({
      success: true,
      message: "If an account exists with that email, you'll receive a reset link shortly.",
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
