import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { hashPassword, signToken, setAuthCookie } from "@/lib/auth";
import { sendAuthWelcome } from "@/lib/email";
import { rateLimit, getRateLimitKey } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(getRateLimitKey(req, "signup"), 5, 15 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in 15 minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { name, email, password } = parsed.data;

    if (db.findUserByEmail(email)) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = db.createUser({ name, email, password: hashedPassword });

    const token = signToken({ userId: user.id, email: user.email, name: user.name, role: user.role });
    const res = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, emailVerified: false },
    });
    setAuthCookie(res, token);

    await sendAuthWelcome(name, email, user.email_verify_token ?? "");
    return res;
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
