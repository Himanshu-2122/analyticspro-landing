"use client";

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import WaitlistModal from "./WaitlistModal";
import ContactModal from "./ContactModal";

export default function CTASection() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <section className="py-24 sm:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-[#020817] to-indigo-950/30" />
        <div className="absolute inset-0 border-y border-white/[0.05]" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-700/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-violet-500/20 text-violet-300 text-sm font-medium mb-8">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 10.5 6.75l3.75 3.75L21 3.75" />
              </svg>
              No credit card. 14-day full Pro access.
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight text-balance mb-6">
              Ready to ship smarter?
            </h2>
            <p className="text-slate-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 text-balance">
              Join 10,000+ teams who replaced their bloated analytics stack with AnalyticsPro and grew revenue faster.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setWaitlistOpen(true)}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base transition-all duration-300 shadow-glow hover:shadow-glow-lg hover:-translate-y-1"
              >
                Get Started Free
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button
                onClick={() => setContactOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass hover:bg-white/[0.07] text-white font-semibold text-base transition-all duration-300"
              >
                Talk to Sales
              </button>
            </div>

            <p className="mt-6 text-slate-600 text-sm">
              Trusted by teams at Vercel, Stripe, Linear, Loom, and 9,996 others.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
