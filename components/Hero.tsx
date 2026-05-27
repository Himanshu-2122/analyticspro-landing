"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/gtag";
import WaitlistModal from "./WaitlistModal";

function Counter({ end, suffix, prefix = "", decimals = 0, duration = 2200 }: {
  end: number; suffix: string; prefix?: string; decimals?: number; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(parseFloat((eased * end).toFixed(decimals)));
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [end, duration, decimals]);

  return <>{prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}</>;
}

const stats = [
  { label: "Active Teams", end: 10, suffix: "k+", decimals: 0 },
  { label: "Uptime SLA", end: 99.9, suffix: "%", decimals: 1 },
  { label: "Avg Rating", end: 4.9, suffix: "★", decimals: 1 },
  { label: "Events / Day", end: 2.4, suffix: "B+", decimals: 1 },
];

export default function Hero() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-16">
        {/* Aurora background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-60 -left-60 w-[600px] h-[600px] bg-violet-700/20 rounded-full blur-[120px] animate-aurora" />
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-700/15 rounded-full blur-[100px] animate-[aurora_18s_ease-in-out_infinite_reverse]" />
          <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] bg-purple-700/15 rounded-full blur-[80px] animate-[aurora_15s_ease-in-out_infinite_4s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-900/10 rounded-full blur-[80px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border-violet-500/20 text-sm font-medium mb-8"
          >
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute h-2 w-2 rounded-full bg-violet-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-violet-500" />
            </span>
            <span className="text-violet-300">New: GA4 + Core Web Vitals in one dashboard</span>
            <svg className="w-3.5 h-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[1.04] tracking-tight text-balance"
          >
            Analytics that
            <span className="block gradient-text">
              actually grow
            </span>
            your business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed text-balance"
          >
            Real-time dashboards, SEO tracking, A/B testing, and Core Web Vitals — unified in one blazing-fast platform. Replace five tools with one.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={() => {
                setWaitlistOpen(true);
                trackEvent("hero_cta_click", { cta: "get_started", location: "hero" });
              }}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base transition-all duration-300 shadow-glow hover:shadow-glow-lg hover:-translate-y-1"
            >
              Get Started Free
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <a
              href="#dashboard"
              onClick={() => trackEvent("hero_cta_click", { cta: "view_demo", location: "hero" })}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass hover:bg-white/[0.08] text-white font-semibold text-base transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
              View Live Demo
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#020817] px-6 py-5 text-center">
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-1">
                  <Counter end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Trust row */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 text-slate-600 text-sm"
          >
            Trusted by teams at{" "}
            {["Vercel", "Stripe", "Linear", "Loom", "Figma"].map((c, i) => (
              <span key={c}>
                <span className="text-slate-400 font-semibold">{c}</span>
                {i < 4 && <span className="mx-2">·</span>}
              </span>
            ))}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-600 text-xs">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-violet-500/60"
            />
          </div>
        </motion.div>
      </section>

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
