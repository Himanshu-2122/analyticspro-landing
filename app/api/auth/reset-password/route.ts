import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword, signToken, setAuthCookie } from "@/lib/auth";

export const runtime = "nodejs";

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { token, password } = parsed.data;
    const user = db.findUserByResetToken(token);

    if (!user) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired." },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);
    db.updatePassword(user.id, hashed);

    const jwtToken = signToken({ userId: user.id, email: user.email, name: user.name, role: user.role });
    const res = NextResponse.json({
      success: true,
      message: "Password updated successfully.",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
    setAuthCookie(res, jwtToken);
    return res;
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
