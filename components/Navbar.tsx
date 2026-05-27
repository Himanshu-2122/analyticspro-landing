"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { trackEvent } from "@/lib/gtag";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";
import WaitlistModal from "./WaitlistModal";
import { motion, AnimatePresence } from "framer-motion";

function AuthRedirectHandler({ onLoginRequired }: { onLoginRequired: () => void }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (searchParams.get("auth") === "required") {
      onLoginRequired();
      router.replace("/", { scroll: false });
    }
  }, [searchParams, router, onLoginRequired]);
  return null;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("signup");
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#integrations" },
    { label: "FAQ", href: "#faq" },
  ];

  const openAuth = (tab: "login" | "signup") => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  return (
    <>
      <Suspense fallback={null}>
        <AuthRedirectHandler onLoginRequired={() => { setAuthTab("login"); setAuthOpen(true); }} />
      </Suspense>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#020817]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-glow-sm">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l5-5 4 4 5-6 4 3" />
                </svg>
              </div>
              <span className="font-heading font-bold text-lg text-white tracking-tight">
                Analytics<span className="text-violet-400">Pro</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold">
                      {(user.name?.[0] ?? "U").toUpperCase()}
                    </div>
                    <span className="text-white text-sm font-medium">{user.name.split(" ")[0]}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-slate-400 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => openAuth("login")}
                    className="text-slate-400 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-200"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setWaitlistOpen(true);
                      trackEvent("hero_cta_click", { location: "navbar", cta: "get_started" });
                    }}
                    className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-200 shadow-glow-sm hover:shadow-glow hover:-translate-y-px"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/[0.06] bg-[#020817]/95 backdrop-blur-2xl overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-slate-400 hover:text-white text-sm font-medium rounded-xl hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-2 flex flex-col gap-2 border-t border-white/[0.06] mt-2">
                  {user ? (
                    <button onClick={logout} className="py-3 text-center text-slate-400 hover:text-white text-sm font-medium rounded-xl border border-white/10 hover:bg-white/5 transition-all">
                      Sign Out
                    </button>
                  ) : (
                    <>
                      <button onClick={() => { openAuth("login"); setMobileOpen(false); }} className="py-3 text-center text-slate-400 hover:text-white text-sm font-medium rounded-xl border border-white/10 hover:bg-white/5 transition-all">
                        Sign In
                      </button>
                      <button onClick={() => { setWaitlistOpen(true); setMobileOpen(false); }} className="py-3 text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-all">
                        Get Started Free
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} defaultTab={authTab} />
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
