"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WaitlistModal from "./WaitlistModal";

export default function ExitIntentModal() {
  const [visible, setVisible] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("exit_intent_dismissed");
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !triggered.current) {
        triggered.current = true;
        setVisible(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("exit_intent_dismissed", "1");
    setVisible(false);
  };

  const handleClaim = () => {
    dismiss();
    setWaitlistOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-4"
            onClick={dismiss}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md glass rounded-2xl border border-white/10 p-8 shadow-2xl shadow-black/60"
            >
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Wait — Special Offer
                </div>

                <h2 className="font-heading text-2xl font-extrabold text-white mb-2 text-balance">
                  Get 3 months free on any plan
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Join the waitlist now and lock in our early-adopter pricing — up to <strong className="text-white">60% off</strong> when we launch. No credit card required.
                </p>

                <div className="space-y-2 mb-6">
                  {[
                    "Real-time analytics dashboard",
                    "SEO & Core Web Vitals tracking",
                    "Unlimited A/B tests",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                      <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleClaim}
                  className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5"
                >
                  Claim My Early Access →
                </button>
                <button
                  onClick={dismiss}
                  className="mt-3 w-full text-slate-600 hover:text-slate-400 text-xs transition-colors"
                >
                  No thanks, I&apos;ll pay full price
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
