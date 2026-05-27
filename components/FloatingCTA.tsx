"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WaitlistModal from "./WaitlistModal";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <button
              onClick={() => setWaitlistOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
              Get Started Free
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
