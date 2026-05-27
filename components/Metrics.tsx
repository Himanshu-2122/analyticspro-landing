"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  { value: "10,000+", label: "Active Teams", sublabel: "across 80+ countries" },
  { value: "$420M", label: "Revenue Tracked", sublabel: "in the last 30 days" },
  { value: "99.9%", label: "Uptime SLA", sublabel: "guaranteed, with credits" },
  { value: "4.9 / 5", label: "Customer Rating", sublabel: "from 2,800+ reviews" },
];

export default function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dark gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-[#020817] to-indigo-950/20" />
      <div className="absolute inset-0 border-y border-white/[0.05]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#020817] px-6 py-10 text-center group hover:bg-white/[0.02] transition-colors"
            >
              <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text mb-2">
                {m.value}
              </div>
              <div className="text-white font-semibold text-base mb-1">{m.label}</div>
              <div className="text-slate-500 text-xs">{m.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
