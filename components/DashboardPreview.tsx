"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const lineData = "M0,80 C30,70 60,40 100,35 C140,30 170,55 210,45 C250,35 280,15 320,10 C360,5 390,20 430,18";
const areaData = "M0,80 C30,70 60,40 100,35 C140,30 170,55 210,45 C250,35 280,15 320,10 C360,5 390,20 430,18 L430,100 L0,100 Z";

const metrics = [
  { label: "Total Users", value: "124,847", delta: "+18.2%", up: true, color: "text-violet-400" },
  { label: "Revenue", value: "$84,230", delta: "+12.5%", up: true, color: "text-emerald-400" },
  { label: "Conversion", value: "4.28%", delta: "+0.6%", up: true, color: "text-blue-400" },
  { label: "Bounce Rate", value: "28.1%", delta: "-3.4%", up: false, color: "text-amber-400" },
];

const barData = [40, 65, 45, 80, 55, 90, 72, 85, 60, 95, 78, 88];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isInView) setTimeout(() => setAnimated(true), 300);
  }, [isInView]);

  return (
    <section id="dashboard" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center mb-12">
            <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Live Preview
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Your analytics, beautifully visualized
            </h2>
            <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
              Everything you need at a glance. Customize any widget, any metric, any time frame.
            </p>
          </div>

          {/* Browser chrome */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
            {/* Browser bar */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#0d1224] border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex-1 max-w-xs mx-auto">
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-1.5 text-xs text-slate-500 flex items-center gap-2">
                  <svg className="w-3 h-3 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  app.analyticspro.io/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="bg-[#0a0f1e] p-4 sm:p-6">
              {/* Metric cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={animated ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="glass rounded-xl p-4"
                  >
                    <p className="text-slate-500 text-xs mb-2">{m.label}</p>
                    <p className={`font-heading font-bold text-xl text-white mb-1`}>{m.value}</p>
                    <div className={`flex items-center gap-1 text-xs font-semibold ${m.up ? "text-emerald-400" : "text-red-400"}`}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={m.up ? "m4.5 15.75 7.5-7.5 7.5 7.5" : "m19.5 8.25-7.5 7.5-7.5-7.5"} />
                      </svg>
                      {m.delta}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Line chart */}
                <div className="lg:col-span-2 glass rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white text-sm font-semibold">User Growth</p>
                      <p className="text-slate-500 text-xs">Last 12 months</p>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                      </svg>
                      <span className="text-emerald-400 text-xs font-semibold">+24.3%</span>
                    </div>
                  </div>
                  <div className="relative h-24 sm:h-32">
                    <svg viewBox="0 0 430 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#7c3aed" />
                          <stop offset="100%" stopColor="#4f46e5" />
                        </linearGradient>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      {[25, 50, 75].map((y) => (
                        <line key={y} x1="0" y1={y} x2="430" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                      ))}
                      {/* Area */}
                      <motion.path
                        d={areaData}
                        fill="url(#areaGrad)"
                        initial={{ opacity: 0 }}
                        animate={animated ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                      {/* Line */}
                      <motion.path
                        d={lineData}
                        fill="none"
                        stroke="url(#lineGrad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="1000"
                        initial={{ strokeDashoffset: 1000 }}
                        animate={animated ? { strokeDashoffset: 0 } : {}}
                        transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
                      />
                      {/* End dot */}
                      <motion.circle
                        cx="430" cy="18" r="4"
                        fill="#7c3aed"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={animated ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 1.8 }}
                      />
                      <motion.circle
                        cx="430" cy="18" r="8"
                        fill="#7c3aed" fillOpacity="0.3"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={animated ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 1.9 }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="glass rounded-xl p-4">
                  <p className="text-white text-sm font-semibold mb-1">Monthly Revenue</p>
                  <p className="text-slate-500 text-xs mb-4">vs target</p>
                  <div className="flex items-end gap-1 h-24 sm:h-28">
                    {barData.map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-violet-600 to-violet-400 min-w-0"
                        title={months[i]}
                        initial={{ height: 0 }}
                        animate={animated ? { height: `${h}%` } : { height: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.06, ease: "easeOut" }}
                        style={{ alignSelf: "flex-end" }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Table preview */}
              <div className="mt-4 glass rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
                  <p className="text-white text-sm font-semibold">Top Pages</p>
                  <span className="text-violet-400 text-xs font-medium cursor-pointer hover:text-violet-300">View all →</span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {[
                    { page: "/pricing", views: "24,481", rate: "8.2%" },
                    { page: "/features", views: "18,923", rate: "5.6%" },
                    { page: "/blog/seo-tips", views: "12,304", rate: "3.1%" },
                  ].map((row, i) => (
                    <motion.div
                      key={row.page}
                      initial={{ opacity: 0, x: -20 }}
                      animate={animated ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center justify-between px-4 py-2.5 text-xs"
                    >
                      <span className="text-slate-400 font-mono">{row.page}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-300">{row.views}</span>
                        <span className="text-violet-400 font-semibold">{row.rate}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
