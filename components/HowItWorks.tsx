"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    number: "01",
    title: "Connect your stack",
    description: "Drop in a 2 KB snippet. One-click integrations with GA4, Shopify, Stripe, and 60+ other tools. Up and running in under 5 minutes.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    glow: "shadow-[0_0_40px_rgba(124,58,237,0.35)]",
    dot: "bg-violet-400",
  },
  {
    number: "02",
    title: "Get instant insights",
    description: "Real-time dashboards surface the metrics that matter. AI-powered anomaly detection alerts you to issues before users notice.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 10.5 6.75l3.75 3.75L21 3.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M3.75 16.5h16.5" /></svg>,
    color: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    glow: "shadow-[0_0_40px_rgba(79,70,229,0.35)]",
    dot: "bg-indigo-400",
  },
  {
    number: "03",
    title: "Grow with confidence",
    description: "A/B test ideas, optimize for Core Web Vitals, track SEO rankings, and generate executive reports — all from one place.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "shadow-[0_0_40px_rgba(16,185,129,0.35)]",
    dot: "bg-emerald-400",
  },
];

function ConnectorLine() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <svg ref={ref} className="absolute top-11 left-0 right-0 w-full hidden md:block" height="2" viewBox="0 0 800 2" preserveAspectRatio="none">
      <line x1="0" y1="1" x2="800" y2="1" stroke="rgba(124,58,237,0.15)" strokeWidth="1" />
      <motion.line
        x1="0" y1="1" x2="800" y2="1"
        stroke="url(#lineGradient)"
        strokeWidth="1.5"
        strokeDasharray="800"
        initial={{ strokeDashoffset: 800 }}
        animate={inView ? { strokeDashoffset: 0 } : {}}
        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
      />
      <defs>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
          <stop offset="30%" stopColor="#7c3aed" />
          <stop offset="70%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16" blur>
          <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
            How it works
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            Live in minutes, value in hours
          </h2>
          <p className="mt-4 text-slate-400 text-lg text-balance">
            No data engineering degree required.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <ConnectorLine />

          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.15} scale>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="glass rounded-2xl p-8 relative group h-full border border-white/[0.06] hover:border-white/[0.15] transition-all duration-300"
              >
                {/* Step number */}
                <motion.div
                  initial={{ opacity: 0.04 }}
                  whileHover={{ opacity: 0.08 }}
                  className="absolute top-6 right-6 font-heading text-6xl font-extrabold text-white select-none leading-none"
                >
                  {step.number}
                </motion.div>

                {/* Top dot indicator */}
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-2 h-2 rounded-full hidden md:block">
                  <div className={`w-2 h-2 rounded-full ${step.dot}`} />
                  <div className={`absolute inset-0 rounded-full ${step.dot} animate-ping-slow opacity-60`} />
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6 group-hover:${step.glow} transition-shadow duration-300`}
                >
                  {step.icon}
                </motion.div>

                <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-violet-100 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
