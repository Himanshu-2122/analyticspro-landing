const testimonials = [
  { initials: "SR", name: "Sarah Rodriguez", title: "Head of Growth", company: "Zephyr Labs", quote: "We replaced three separate tools with AnalyticsPro and cut our SaaS spend by $2,400/mo. The Core Web Vitals integration fixed a ranking drop we'd been chasing for months.", color: "bg-violet-600", rating: 5 },
  { initials: "MK", name: "Marcus Kim", title: "CTO", company: "Luminary AI", quote: "The A/B testing engine is genuinely best-in-class. Statistical significance alerts prevented us from shipping a variant that would've hurt conversion by ~18%.", color: "bg-indigo-600", rating: 5 },
  { initials: "AP", name: "Aisha Patel", title: "Product Manager", company: "Flowverse", quote: "Real-time dashboards changed how we run launches. We spotted a bug tanking conversions within 90 seconds and rolled back before it hit 5% of users.", color: "bg-emerald-600", rating: 5 },
  { initials: "TW", name: "Tom Watkins", title: "Founder", company: "StellarSaaS", quote: "SEO tracking caught a 30% traffic drop before Google even updated our Search Console. AnalyticsPro paid for itself in the first week.", color: "bg-blue-600", rating: 5 },
  { initials: "LC", name: "Lisa Chen", title: "VP Marketing", company: "NovaHQ", quote: "Custom reports that auto-email our board every Monday. Our leadership team finally understands what's happening with our funnel without me presenting it.", color: "bg-pink-600", rating: 5 },
  { initials: "RJ", name: "Rohan Joshi", title: "Lead Engineer", company: "Buildfast", quote: "GA4 sync took 3 minutes. Having 13 months of historical data in the same UI as our real-time events is a game changer for cohort analysis.", color: "bg-amber-600", rating: 5 },
  { initials: "EK", name: "Emma Kowalski", title: "Analytics Lead", company: "GrowthLab", quote: "I've used every analytics tool on the market. AnalyticsPro is the first one where I didn't need to hire a data engineer to get insights.", color: "bg-teal-600", rating: 5 },
  { initials: "DM", name: "David Morris", title: "CEO", company: "Launchpad.io", quote: "The ROI was immediate. In 48 hours we found a checkout bug that was losing us $18k/month. The platform paid for itself 400x over in one finding.", color: "bg-rose-600", rating: 5 },
  { initials: "NH", name: "Nadia Hassan", title: "Growth Engineer", company: "Scalify", quote: "Framer-smooth UI, real-time data, and an API that actually makes sense. Rare combination. Our whole team uses it now, not just the data team.", color: "bg-purple-600", rating: 5 },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="w-80 shrink-0 mx-2 glass rounded-2xl p-6 flex flex-col hover:border-white/15 transition-all duration-300">
      <Stars count={t.rating} />
      <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-5">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
          {t.initials}
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{t.name}</div>
          <div className="text-slate-500 text-xs">{t.title} · {t.company}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const row1 = [...testimonials.slice(0, 5), ...testimonials.slice(0, 5)];
  const row2 = [...testimonials.slice(4), ...testimonials.slice(4)];

  return (
    <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            Loved by 10,000+ teams
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            Don&apos;t take our word for it.
          </p>
        </div>
      </div>

      {/* Row 1 — left */}
      <div className="marquee-container mb-4 overflow-hidden">
        <div className="flex animate-marquee">
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${t.initials}-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — right */}
      <div className="marquee-container overflow-hidden">
        <div className="flex animate-marquee-reverse">
          {row2.map((t, i) => (
            <TestimonialCard key={`r2-${t.initials}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
