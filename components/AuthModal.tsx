"use client";

import { useState } from "react";
import Link from "next/link";
import Modal from "./Modal";
import { useToast } from "@/contexts/ToastContext";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

export default function AuthModal({ open, onClose, defaultTab = "signup" }: AuthModalProps) {
  const { addToast } = useToast();
  const { login } = useAuth();
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = tab === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const payload = tab === "signup"
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      login(data.user);
      addToast(
        tab === "signup"
          ? `Welcome, ${data.user.name}! Account created.`
          : `Welcome back, ${data.user.name}!`,
        "success"
      );
      setForm({ name: "", email: "", password: "" });
      onClose();
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const field = "w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-slate-500 text-sm transition-all input-glow";

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8">
        {/* Tabs */}
        <div className="flex rounded-xl bg-white/5 p-1 mb-6">
          {(["signup", "login"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                tab === t
                  ? "bg-violet-600 text-white shadow-glow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t === "signup" ? "Create Account" : "Sign In"}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="font-heading text-2xl font-bold text-white mb-1">
            {tab === "signup" ? "Get started free" : "Welcome back"}
          </h2>
          <p className="text-slate-400 text-sm">
            {tab === "signup"
              ? "Create your account in seconds."
              : "Sign in to your AnalyticsPro account."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {tab === "signup" && (
            <input
              className={field}
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            className={field}
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            className={field}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 shadow-glow flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </>
            ) : tab === "signup" ? (
              "Create Free Account →"
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-slate-600 space-y-2">
          {tab === "signup" ? (
            <p>
              Already have an account?{" "}
              <button onClick={() => setTab("login")} className="text-violet-400 hover:text-violet-300 font-medium">
                Sign in
              </button>
            </p>
          ) : (
            <>
              <p>
                Don&apos;t have an account?{" "}
                <button onClick={() => setTab("signup")} className="text-violet-400 hover:text-violet-300 font-medium">
                  Sign up free
                </button>
              </p>
              <p>
                <Link
                  href="/forgot-password"
                  onClick={onClose}
                  className="text-slate-500 hover:text-violet-400 transition-colors"
                >
                  Forgot your password?
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
