import AnimatedSection from "./AnimatedSection";

const rows = [
  { feature: "Real-time data (< 1s)", us: true, ga4: false, mixpanel: true, amplitude: true },
  { feature: "SEO & keyword tracking", us: true, ga4: false, mixpanel: false, amplitude: false },
  { feature: "Core Web Vitals monitor", us: true, ga4: true, mixpanel: false, amplitude: false },
  { feature: "A/B testing built-in", us: true, ga4: false, mixpanel: false, amplitude: false },
  { feature: "GA4 data import", us: true, ga4: "—", mixpanel: false, amplitude: false },
  { feature: "Custom reports & PDF", us: true, ga4: false, mixpanel: true, amplitude: true },
  { feature: "Cookie-less tracking", us: true, ga4: false, mixpanel: false, amplitude: false },
  { feature: "Free tier available", us: true, ga4: true, mixpanel: true, amplitude: false },
  { feature: "Starting price", us: "$0/mo", ga4: "Free*", mixpanel: "$28/mo", amplitude: "$61/mo" },
];

type ColKey = "us" | "ga4" | "mixpanel" | "amplitude";

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return <span className="text-emerald-400"><svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg></span>;
  if (value === false)
    return <span className="text-slate-700"><svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></span>;
  return <span className="text-slate-400 text-sm">{value}</span>;
}

export default function ComparisonTable() {
  const cols: { key: ColKey; label: string; highlight?: boolean }[] = [
    { key: "us", label: "AnalyticsPro", highlight: true },
    { key: "ga4", label: "GA4 Alone" },
    { key: "mixpanel", label: "Mixpanel" },
    { key: "amplitude", label: "Amplitude" },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Comparison
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            How we stack up
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            One platform instead of three separate subscriptions.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium w-1/3">Feature</th>
                    {cols.map((col) => (
                      <th
                        key={col.key}
                        className={`px-4 py-4 text-center text-sm font-semibold ${
                          col.highlight ? "text-violet-400" : "text-slate-400"
                        }`}
                      >
                        {col.highlight && (
                          <span className="block text-xs px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-1 mx-auto w-fit">
                            Best
                          </span>
                        )}
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {rows.map((row) => (
                    <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-slate-300 text-sm">{row.feature}</td>
                      {cols.map((col) => (
                        <td
                          key={col.key}
                          className={`px-4 py-4 text-center ${
                            col.highlight ? "bg-violet-500/[0.04]" : ""
                          }`}
                        >
                          <Cell value={row[col.key]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-slate-600">
            * GA4 has no real-time data, no A/B testing, and requires Google Tag Manager for most configurations.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
