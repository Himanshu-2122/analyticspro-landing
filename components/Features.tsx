"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const barHeights = [30, 55, 40, 75, 50, 90, 65, 80, 70, 95, 85, 100];
const vitals = [{ label: "LCP", v: 85, color: "from-emerald-500 to-emerald-400" }, { label: "CLS", v: 92, color: "from-blue-500 to-cyan-400" }, { label: "INP", v: 78, color: "from-violet-500 to-purple-400" }];

function AnimatedBars() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mt-4 h-16 flex items-end gap-1 opacity-60">
      {barHeights.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-violet-600 to-violet-400"
          initial={{ height: 0, opacity: 0 }}
          animate={inView ? { height: `${h}%`, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: "easeOut" }}
          style={{ alignSelf: "flex-end" }}
        />
      ))}
    </div>
  );
}

function AnimatedVitals() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mt-4 space-y-2.5">
      {vitals.map((x, i) => (
        <div key={x.label} className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-8 shrink-0 font-semibold">{x.label}</span>
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${x.color} rounded-full`}
              initial={{ width: 0 }}
              animate={inView ? { width: `${x.v}%` } : {}}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <motion.span
            className="text-emerald-400 font-semibold w-6 text-right"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 + i * 0.15 }}
          >
            {x.v}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

const features = [
  {
    title: "Real-Time Analytics",
    description: "Sub-second event tracking with live visitor maps, session replays, and custom funnels. Up to 1M events/day.",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l5-5 4 4 5-6 4 3" /></svg>,
    color: "from-violet-500 to-purple-600",
    glow: "group-hover:shadow-[0_0_40px_rgba(124,58,237,0.35)]",
    size: "md:col-span-2",
    visual: <AnimatedBars />,
  },
  {
    title: "SEO Tracking",
    description: "Monitor keyword rankings, backlinks, and SERP positions daily.",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>,
    color: "from-emerald-500 to-teal-600",
    glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]",
    size: "md:col-span-1",
  },
  {
    title: "A/B Testing",
    description: "Ship confident changes with multivariate experiments and statistical significance alerts.",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>,
    color: "from-orange-500 to-rose-600",
    glow: "group-hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]",
    size: "md:col-span-1",
  },
  {
    title: "GA4 Integration",
    description: "Sync 13 months of historical GA4 data in one click. Augment with deeper cohorts.",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>,
    color: "from-blue-500 to-cyan-600",
    glow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]",
    size: "md:col-span-1",
  },
  {
    title: "Core Web Vitals",
    description: "Track LCP, CLS, and INP across every URL. Get fix suggestions per page, prioritized by impact.",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 10.5 6.75l3.75 3.75L21 3.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M3.75 16.5h16.5" /></svg>,
    color: "from-rose-500 to-pink-600",
    glow: "group-hover:shadow-[0_0_40px_rgba(244,63,94,0.3)]",
    size: "md:col-span-2",
    visual: <AnimatedVitals />,
  },
  {
    title: "Custom Reports",
    description: "Drag-and-drop report builder. Schedule PDF exports to stakeholders automatically.",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>,
    color: "from-amber-500 to-orange-600",
    glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]",
    size: "md:col-span-1",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16" blur>
          <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Features
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            Six tools. One subscription.
          </h2>
          <p className="mt-4 text-slate-400 text-lg text-balance">
            Replace your entire analytics stack and save thousands per year.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.07} className={feature.size} scale>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`bento-card glass rounded-2xl p-6 h-full group cursor-default border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-300 ${feature.glow} transition-shadow`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 shadow-glow-sm`}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-violet-100 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {feature.visual && feature.visual}
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
