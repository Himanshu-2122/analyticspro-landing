"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  { prefix: "", integer: 10, suffix: "k+", label: "Active Teams", sublabel: "across 80+ countries", decimals: 0, color: "from-violet-400 to-purple-400" },
  { prefix: "$", integer: 420, suffix: "M", label: "Revenue Tracked", sublabel: "in the last 30 days", decimals: 0, color: "from-emerald-400 to-teal-400" },
  { prefix: "", integer: 99.9, suffix: "%", label: "Uptime SLA", sublabel: "guaranteed, with credits", decimals: 1, color: "from-blue-400 to-cyan-400" },
  { prefix: "", integer: 4.9, suffix: " / 5", label: "Customer Rating", sublabel: "from 2,800+ reviews", decimals: 1, color: "from-amber-400 to-orange-400" },
];

function AnimatedNumber({ end, prefix, suffix, decimals, trigger }: {
  end: number; prefix: string; suffix: string; decimals: number; trigger: boolean;
}) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!trigger || ran.current) return;
    ran.current = true;
    const duration = 1800;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((eased * end).toFixed(decimals)));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [trigger, end, decimals]);

  const display = decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toLocaleString();
  return <>{prefix}{display}{suffix}</>;
}

export default function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-[#020817] to-indigo-950/20" />
      <div className="absolute inset-0 border-y border-white/[0.05]" />

      {/* Background pulse */}
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-transparent to-indigo-900/20 pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ backgroundColor: "rgba(124,58,237,0.05)", scale: 1.01 }}
              className="bg-[#020817] px-6 py-10 text-center group transition-colors relative overflow-hidden"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at center, rgba(124,58,237,0.08) 0%, transparent 70%)" }}
              />

              <div className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}>
                <AnimatedNumber end={m.integer} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} trigger={isInView} />
              </div>
              <div className="text-white font-semibold text-base mb-1">{m.label}</div>
              <div className="text-slate-500 text-xs">{m.sublabel}</div>

              {/* Bottom accent */}
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${m.color} opacity-0 group-hover:opacity-60`}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
