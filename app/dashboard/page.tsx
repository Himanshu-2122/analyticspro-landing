import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

const stats = [
  { label: "Total Visitors", value: "124,847", delta: "+18.2%", up: true, icon: "👤" },
  { label: "Pageviews", value: "841,230", delta: "+12.5%", up: true, icon: "📄" },
  { label: "Bounce Rate", value: "28.1%", delta: "-3.4%", up: false, icon: "↩️" },
  { label: "Avg Session", value: "4m 12s", delta: "+0:38", up: true, icon: "⏱️" },
];

const topPages = [
  { path: "/pricing", views: "24,481", conv: "8.2%" },
  { path: "/features", views: "18,923", conv: "5.6%" },
  { path: "/blog/seo-tips", views: "12,304", conv: "3.1%" },
  { path: "/integrations", views: "9,847", conv: "2.8%" },
  { path: "/", views: "8,231", conv: "1.9%" },
];

const sources = [
  { name: "Organic Search", pct: 42, color: "bg-violet-500" },
  { name: "Direct", pct: 28, color: "bg-indigo-500" },
  { name: "Social Media", pct: 16, color: "bg-blue-500" },
  { name: "Referral", pct: 9, color: "bg-emerald-500" },
  { name: "Email", pct: 5, color: "bg-amber-500" },
];

export default function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("ap_token")?.value ?? "";
  const payload = verifyToken(token);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-1">
          {greeting}, {payload?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-500 text-sm">
          Here&apos;s your overview for {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}.
        </p>
      </div>

      {/* Connect banner */}
      <div className="glass rounded-2xl p-4 flex items-start sm:items-center gap-4 mb-8 border-violet-500/20">
        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold mb-0.5">Connect your first website</p>
          <p className="text-slate-400 text-xs">Add the tracking snippet to start collecting real data. Takes under 2 minutes.</p>
        </div>
        <button className="shrink-0 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all shadow-glow-sm">
          Connect site →
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5 hover:bg-white/[0.05] transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-500 text-xs font-medium">{s.label}</span>
              <span className="text-base">{s.icon}</span>
            </div>
            <div className="font-heading text-2xl font-bold text-white mb-1">{s.value}</div>
            <div className={`text-xs font-semibold flex items-center gap-1 ${s.up ? "text-emerald-400" : "text-red-400"}`}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d={s.up ? "m4.5 15.75 7.5-7.5 7.5 7.5" : "m19.5 8.25-7.5 7.5-7.5-7.5"} />
              </svg>
              {s.delta} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Traffic sources */}
        <div className="glass rounded-2xl p-5">
          <h3 className="text-white text-sm font-semibold mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            {sources.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-400">{s.name}</span>
                  <span className="text-white font-semibold">{s.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top pages */}
        <div className="lg:col-span-2 glass rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
            <h3 className="text-white text-sm font-semibold">Top Pages</h3>
            <span className="text-violet-400 text-xs cursor-pointer hover:text-violet-300">View all →</span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                <th className="text-left px-5 py-2.5 text-slate-500 text-xs font-medium">Page</th>
                <th className="text-right px-5 py-2.5 text-slate-500 text-xs font-medium">Views</th>
                <th className="text-right px-5 py-2.5 text-slate-500 text-xs font-medium">Conv. Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {topPages.map((p) => (
                <tr key={p.path} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-slate-300 text-sm font-mono">{p.path}</td>
                  <td className="px-5 py-3 text-right text-slate-400 text-sm">{p.views}</td>
                  <td className="px-5 py-3 text-right text-violet-400 text-sm font-semibold">{p.conv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Create A/B Test", icon: "🧪", color: "hover:border-orange-500/30" },
          { label: "Run SEO Audit", icon: "🔍", color: "hover:border-emerald-500/30" },
          { label: "Add Integration", icon: "🔌", color: "hover:border-blue-500/30" },
          { label: "Export Report", icon: "📊", color: "hover:border-violet-500/30" },
        ].map((a) => (
          <button
            key={a.label}
            className={`glass ${a.color} rounded-xl p-4 text-left hover:bg-white/[0.05] transition-all border border-white/[0.06]`}
          >
            <span className="text-xl mb-2 block">{a.icon}</span>
            <span className="text-white text-xs font-semibold">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
