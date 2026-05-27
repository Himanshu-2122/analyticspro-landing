import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    number: "01",
    title: "Connect your stack",
    description:
      "Drop in a 2 KB snippet. One-click integrations with GA4, Shopify, Stripe, and 60+ other tools. Up and running in under 5 minutes.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
    color: "from-violet-500 to-purple-600",
    glow: "shadow-[0_0_30px_rgba(124,58,237,0.3)]",
  },
  {
    number: "02",
    title: "Get instant insights",
    description:
      "Real-time dashboards surface the metrics that matter. AI-powered anomaly detection alerts you to issues before users notice.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 10.5 6.75l3.75 3.75L21 3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M3.75 16.5h16.5" />
      </svg>
    ),
    color: "from-indigo-500 to-blue-600",
    glow: "shadow-[0_0_30px_rgba(79,70,229,0.3)]",
  },
  {
    number: "03",
    title: "Grow with confidence",
    description:
      "A/B test ideas, optimize for Core Web Vitals, track SEO rankings, and generate executive reports — all from one place.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
            How it works
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            Live in minutes, value in hours
          </h2>
          <p className="mt-4 text-slate-400 text-lg text-balance">
            No data engineering degree required.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent hidden md:block" />

          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.12}>
              <div className="glass glass-hover rounded-2xl p-8 relative group">
                {/* Step number */}
                <div className="absolute top-6 right-6 font-heading text-6xl font-extrabold text-white/[0.04] select-none leading-none">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6 ${step.glow} transition-all duration-300 group-hover:scale-110`}>
                  {step.icon}
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
