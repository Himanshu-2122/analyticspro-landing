import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { comparePassword, signToken, setAuthCookie } from "@/lib/auth";
import { rateLimit, getRateLimitKey } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(getRateLimitKey(req, "login"), 10, 15 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again in 15 minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { email, password } = parsed.data;
    const user = db.findUserByEmail(email);

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Account lockout check
    if (user.lockout_until && new Date(user.lockout_until) > new Date()) {
      const mins = Math.ceil((new Date(user.lockout_until).getTime() - Date.now()) / 60000);
      return NextResponse.json(
        { error: `Account locked. Try again in ${mins} minute${mins !== 1 ? "s" : ""}.` },
        { status: 423 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: "This account uses Google Sign-In. Please sign in with Google." },
        { status: 400 }
      );
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      db.incrementLoginAttempts(user.id);
      const remaining = 4 - user.login_attempts;
      const msg = remaining > 0
        ? `Invalid email or password. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining before lockout.`
        : "Invalid email or password. Account locked for 15 minutes.";
      return NextResponse.json({ error: msg }, { status: 401 });
    }

    db.resetLoginAttempts(user.id);
    const token = signToken({ userId: user.id, email: user.email, name: user.name, role: user.role });
    const res = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: Boolean(user.email_verified),
      },
    });
    setAuthCookie(res, token);
    return res;
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
