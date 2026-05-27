import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signToken, setAuthCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (error || !code) {
    return NextResponse.redirect(new URL("/?auth=cancelled", appUrl));
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${appUrl}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenRes.json();
    if (!tokens.access_token) throw new Error("No access token");

    // Get user info
    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const profile = await userRes.json() as {
      sub: string; name: string; email: string; picture?: string;
    };

    // Find or create user; link Google ID if account already exists by email
    let user = db.findUserByGoogleId(profile.sub);
    if (!user) {
      const existing = db.findUserByEmail(profile.email);
      if (existing) {
        if (!existing.google_id) db.updateUserGoogleId(existing.id, profile.sub);
        user = db.findUserById(existing.id)!;
      } else {
        user = db.createUser({
          name: profile.name,
          email: profile.email,
          googleId: profile.sub,
          avatarUrl: profile.picture,
          emailVerified: true,
        });
      }
    }

    const jwtToken = signToken({ userId: user.id, email: user.email, name: user.name, role: user.role });
    const res = NextResponse.redirect(new URL("/dashboard", appUrl));
    setAuthCookie(res, jwtToken);
    return res;
  } catch {
    return NextResponse.redirect(new URL("/?auth=error", appUrl));
  }
}
