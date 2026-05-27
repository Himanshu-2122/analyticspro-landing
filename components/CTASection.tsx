"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import WaitlistModal from "./WaitlistModal";
import ContactModal from "./ContactModal";

const floatingDots = [
  { size: 3, top: "20%", left: "10%", dur: 7, delay: 0 },
  { size: 4, top: "70%", left: "8%", dur: 9, delay: 2 },
  { size: 2, top: "40%", left: "88%", dur: 6, delay: 1 },
  { size: 5, top: "80%", left: "85%", dur: 8, delay: 3 },
  { size: 3, top: "15%", left: "75%", dur: 10, delay: 1.5 },
  { size: 2, top: "60%", left: "20%", dur: 7.5, delay: 4 },
];

export default function CTASection() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <section className="py-24 sm:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-[#020817] to-indigo-950/30" />
        <div className="absolute inset-0 border-y border-white/[0.05]" />

        {/* Animated glow orb */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-violet-700/20 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-indigo-700/15 rounded-full blur-[80px] pointer-events-none"
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating particles */}
        {floatingDots.map((d, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-violet-400/30 pointer-events-none"
            style={{
              width: d.size, height: d.size,
              top: d.top, left: d.left,
              animation: `float ${d.dur}s ease-in-out infinite ${d.delay}s`,
            }}
          />
        ))}

        <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection blur scale>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-violet-500/20 text-violet-300 text-sm font-medium mb-8"
            >
              <motion.svg
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 10.5 6.75l3.75 3.75L21 3.75" />
              </motion.svg>
              No credit card. 14-day full Pro access.
            </motion.div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight text-balance mb-6">
              Ready to ship smarter?
            </h2>
            <p className="text-slate-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 text-balance">
              Join 10,000+ teams who replaced their bloated analytics stack with AnalyticsPro and grew revenue faster.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setWaitlistOpen(true)}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5, #6d28d9)",
                  backgroundSize: "200% 200%",
                  boxShadow: "0 0 50px rgba(124,58,237,0.45), 0 0 100px rgba(124,58,237,0.15)",
                }}
              >
                <span className="absolute inset-0 btn-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Get Started Free</span>
                <motion.svg
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </motion.svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.25)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setContactOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass hover:bg-white/[0.07] text-white font-semibold text-base transition-all duration-300 border border-white/10"
              >
                Talk to Sales
              </motion.button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-6 text-slate-600 text-sm"
            >
              Trusted by teams at Vercel, Stripe, Linear, Loom, and 9,996 others.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
