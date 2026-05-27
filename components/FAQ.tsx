"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { trackEvent } from "@/lib/gtag";

const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer: "Sign up with your email — no credit card required. You get full Pro access for 14 days. At the end of the trial, choose a plan or downgrade to Starter for free. We remind you 3 days before the trial ends.",
  },
  {
    question: "Can I import my existing Google Analytics 4 data?",
    answer: "Yes. Our one-click GA4 connector syncs up to 13 months of historical data from your GA4 property. After the initial sync, data flows in real time. You keep access to GA4 alongside AnalyticsPro — we're additive, not a replacement.",
  },
  {
    question: "How does A/B testing work with my existing stack?",
    answer: "Drop our lightweight JavaScript snippet (< 2 KB gzipped) onto your site. Define variants in the dashboard, set traffic splits, and choose your success metric. AnalyticsPro handles variant assignment, tracking, and statistical analysis — no engineering dependency once the snippet is in.",
  },
  {
    question: "Is my data GDPR and CCPA compliant?",
    answer: "Yes. All data is stored on EU-based servers (AWS eu-west-1) with optional US residency. We don't sell your data. Cookie consent mode is built in, and cookieless tracking is available. We sign a DPA on request for Pro and Enterprise plans.",
  },
  {
    question: "What happens if I exceed my pageview limit?",
    answer: "We email you at 80% and 100% of your limit. On Starter, data collection pauses until the next cycle. On Pro and Enterprise, we continue collecting and auto-upgrade you with prorated billing — you'll never lose data due to a traffic spike.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <AnimatedSection delay={index * 0.06}>
      <div className={`rounded-2xl transition-all duration-300 ${open ? "glass" : "hover:bg-white/[0.02]"}`}>
        <button
          onClick={() => {
            const next = !open;
            setOpen(next);
            if (next) trackEvent("faq_expand", { question: faq.question });
          }}
          className="w-full flex items-start justify-between gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-2xl"
          aria-expanded={open}
        >
          <span className="font-heading font-semibold text-white text-base sm:text-lg leading-snug">
            {faq.question}
          </span>
          <span
            className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 mt-0.5 ${
              open
                ? "bg-violet-600 border-violet-600 rotate-180 shadow-glow-sm"
                : "border-white/20 bg-white/[0.03]"
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 transition-colors ${open ? "text-white" : "text-slate-400"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="px-6 pb-6 text-slate-400 text-sm sm:text-base leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
            FAQ
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            Common questions
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            Still curious?{" "}
            <a href="mailto:hello@analyticspro.io" className="text-violet-400 hover:text-violet-300 font-medium">
              Email us
            </a>{" "}
            — we reply within 2 hours.
          </p>
        </AnimatedSection>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
