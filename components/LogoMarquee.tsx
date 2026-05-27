"use client";

import { motion } from "framer-motion";

const companies = [
  "Vercel", "Stripe", "Linear", "Notion", "Figma",
  "GitHub", "Slack", "Shopify", "Loom", "Webflow",
  "Framer", "Planetscale", "Supabase", "Railway", "Fly.io",
];

function LogoItem({ name }: { name: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, borderColor: "rgba(139,92,246,0.4)", color: "#e2e8f0" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex items-center justify-center px-8 py-3 mx-2 rounded-xl glass text-slate-500 font-semibold text-sm whitespace-nowrap transition-colors duration-200 border border-white/[0.06] cursor-default"
    >
      <motion.span
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() * 2 }}
        className="w-1.5 h-1.5 rounded-full bg-violet-500/60 mr-2.5"
      />
      {name}
    </motion.div>
  );
}

export default function LogoMarquee() {
  const doubled = [...companies, ...companies];

  return (
    <section className="py-12 border-y border-white/[0.06] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-center"
      >
        <p className="text-slate-600 text-sm font-medium uppercase tracking-widest">
          Powering growth at world-class teams
        </p>
      </motion.div>
      <div className="marquee-container marquee-pause">
        <div className="flex animate-marquee">
          {doubled.map((name, i) => (
            <LogoItem key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
