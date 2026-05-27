import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { COOKIE_NAME } from "@/lib/constants";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) redirect("/?auth=required");

  const payload = verifyToken(token);
  if (!payload || payload.role !== "admin") redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[#020817]">
      <header className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l5-5 4 4 5-6 4 3" />
              </svg>
            </div>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-white font-semibold text-sm">Admin Panel</span>
          <span className="px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm transition-colors">
            Dashboard
          </Link>
          <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
            Home
          </Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
