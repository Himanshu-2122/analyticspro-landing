import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/?verify=invalid", req.url));
  }

  const user = db.verifyEmail(token);
  if (!user) {
    return NextResponse.redirect(new URL("/?verify=invalid", req.url));
  }

  return NextResponse.redirect(new URL("/?verify=success", req.url));
}
