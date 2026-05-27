"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const integrations = [
  { name: "Google Analytics 4", color: "text-orange-400", bg: "bg-orange-500/10", icon: "📊", delay: 2.1 },
  { name: "Stripe", color: "text-violet-400", bg: "bg-violet-500/10", icon: "💳", delay: 1.4 },
  { name: "Shopify", color: "text-emerald-400", bg: "bg-emerald-500/10", icon: "🛍️", delay: 1.9 },
  { name: "HubSpot", color: "text-orange-400", bg: "bg-orange-500/10", icon: "🔄", delay: 2.7 },
  { name: "Slack", color: "text-purple-400", bg: "bg-purple-500/10", icon: "💬", delay: 1.1 },
  { name: "Salesforce", color: "text-blue-400", bg: "bg-blue-500/10", icon: "☁️", delay: 3.2 },
  { name: "Segment", color: "text-green-400", bg: "bg-green-500/10", icon: "🔵", delay: 0.8 },
  { name: "Intercom", color: "text-blue-400", bg: "bg-blue-500/10", icon: "💭", delay: 2.4 },
  { name: "Mixpanel", color: "text-violet-400", bg: "bg-violet-500/10", icon: "📈", delay: 1.7 },
  { name: "PostHog", color: "text-amber-400", bg: "bg-amber-500/10", icon: "🦔", delay: 3.5 },
  { name: "Amplitude", color: "text-indigo-400", bg: "bg-indigo-500/10", icon: "📉", delay: 2.9 },
  { name: "Zapier", color: "text-orange-400", bg: "bg-orange-500/10", icon: "⚡", delay: 1.2 },
];

export default function Integrations() {
  return (
    <section id="integrations" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16" blur>
          <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Integrations
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            Plays nicely with your entire stack
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            One-click connectors with 60+ tools. More added every month.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {integrations.map((item, i) => (
            <AnimatedSection key={item.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass rounded-xl p-4 flex items-center gap-3 group cursor-default border border-white/[0.06]"
              >
                <motion.span
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`text-xl w-9 h-9 flex items-center justify-center rounded-lg ${item.bg} shrink-0`}
                >
                  {item.icon}
                </motion.span>
                <div className="min-w-0">
                  <div className="text-white text-sm font-semibold leading-tight truncate">{item.name}</div>
                  <div className={`text-xs font-medium ${item.color} flex items-center gap-1`}>
                    <span>Connected</span>
                  </div>
                </div>
                {/* Animated live dot */}
                <div className="ml-auto relative shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div
                    className="absolute inset-0 rounded-full bg-emerald-400 live-dot"
                    style={{ animationDelay: `${item.delay}s` }}
                  />
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="text-center mt-8">
          <motion.span
            whileHover={{ scale: 1.02 }}
            className="text-slate-500 text-sm"
          >
            + 48 more integrations via{" "}
            <a href="#" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              REST API & Webhooks
            </a>
          </motion.span>
        </AnimatedSection>
      </div>
    </section>
  );
}
