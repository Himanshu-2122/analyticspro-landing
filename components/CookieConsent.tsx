"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = (type: "all" | "necessary") => {
    localStorage.setItem("cookie_consent", type);
    setVisible(false);
    if (type === "all" && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-xl"
        >
          <div className="glass rounded-2xl border border-white/10 p-5 shadow-2xl shadow-black/50 backdrop-blur-2xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-1">We use cookies</p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  We use cookies to analyse site traffic and improve your experience. You can choose which cookies to allow.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => accept("necessary")}
                className="flex-1 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-xs font-medium transition-all"
              >
                Necessary Only
              </button>
              <button
                onClick={() => accept("all")}
                className="flex-1 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
