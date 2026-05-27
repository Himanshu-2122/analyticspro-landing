"use client";

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { trackEvent } from "@/lib/gtag";
import WaitlistModal from "./WaitlistModal";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Perfect for personal projects and indie makers.",
    cta: "Start Free",
    ctaVariant: "outline",
    features: [
      "Up to 50k pageviews / month",
      "3 websites",
      "7-day data retention",
      "Core Web Vitals monitor",
      "Community support",
    ],
    missing: ["A/B testing", "GA4 integration", "Custom reports"],
  },
  {
    name: "Pro",
    monthlyPrice: 49,
    annualPrice: 39,
    description: "For growing teams who need serious analytics.",
    cta: "Start 14-Day Trial",
    ctaVariant: "primary",
    badge: "Most Popular",
    features: [
      "Up to 1M pageviews / month",
      "Unlimited websites",
      "90-day data retention",
      "A/B testing (unlimited)",
      "GA4 & SEO integration",
      "Core Web Vitals — all pages",
      "Custom reports & PDF exports",
      "Priority email support",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 199,
    annualPrice: 159,
    description: "For large orgs with compliance and scale needs.",
    cta: "Contact Sales",
    ctaVariant: "outline",
    features: [
      "Unlimited pageviews",
      "Unlimited websites",
      "Unlimited data retention",
      "SSO / SAML",
      "Custom SLA & uptime",
      "Dedicated Slack channel",
      "Custom contracts & invoicing",
      "On-prem deployment option",
    ],
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const handleToggle = (annual: boolean) => {
    setIsAnnual(annual);
    trackEvent("pricing_toggle", { billing: annual ? "annual" : "monthly" });
  };

  return (
    <>
      <section id="pricing" className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Pricing
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-slate-400 text-lg">
              No hidden fees. No surprise bills. Cancel anytime.
            </p>
          </AnimatedSection>

          {/* Toggle */}
          <AnimatedSection delay={0.1} className="flex items-center justify-center gap-4 mb-12">
            <button
              onClick={() => handleToggle(false)}
              className={`text-sm font-semibold transition-colors ${!isAnnual ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleToggle(!isAnnual)}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none ${
                isAnnual ? "bg-violet-600 shadow-glow-sm" : "bg-white/10"
              }`}
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle annual billing"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <button
              onClick={() => handleToggle(true)}
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isAnnual ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Annual
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                Save 20%
              </span>
            </button>
          </AnimatedSection>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {plans.map((plan, i) => (
              <AnimatedSection key={plan.name} delay={i * 0.1}>
                <div
                  className={`relative rounded-2xl p-8 flex flex-col h-full transition-all duration-300 ${
                    plan.highlight
                      ? "gradient-border bg-[#0d0f1e]"
                      : "glass glass-hover"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 rounded-full bg-violet-600 text-white text-xs font-bold shadow-glow-sm">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-heading text-xl font-bold text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-slate-400 text-sm">{plan.description}</p>
                  </div>

                  <div className="flex items-end gap-1 mb-8">
                    <span className="font-heading text-5xl font-extrabold text-white">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    {(isAnnual ? plan.annualPrice : plan.monthlyPrice) > 0 && (
                      <span className="text-slate-400 text-sm mb-1.5">/ mo</span>
                    )}
                    {(isAnnual ? plan.annualPrice : plan.monthlyPrice) === 0 && (
                      <span className="text-slate-400 text-lg mb-1.5 ml-1">free forever</span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <svg className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        <span className="text-slate-300">{f}</span>
                      </li>
                    ))}
                    {plan.missing?.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm opacity-30">
                        <svg className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        <span className="text-slate-500">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setWaitlistOpen(true)}
                    className={`w-full text-center px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      plan.ctaVariant === "primary"
                        ? "bg-violet-600 hover:bg-violet-500 text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-px"
                        : "glass hover:bg-white/[0.08] text-white border border-white/10 hover:border-white/20"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4} className="text-center mt-8 text-sm text-slate-500">
            All plans include SSL, GDPR compliance, and 99.9% uptime SLA.{" "}
            <a href="#" className="text-violet-400 hover:text-violet-300 font-medium">
              Compare all features →
            </a>
          </AnimatedSection>
        </div>
      </section>

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
