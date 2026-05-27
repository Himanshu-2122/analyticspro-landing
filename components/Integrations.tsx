import AnimatedSection from "./AnimatedSection";

const integrations = [
  { name: "Google Analytics 4", color: "text-orange-400", icon: "📊" },
  { name: "Stripe", color: "text-violet-400", icon: "💳" },
  { name: "Shopify", color: "text-emerald-400", icon: "🛍️" },
  { name: "HubSpot", color: "text-orange-400", icon: "🔄" },
  { name: "Slack", color: "text-purple-400", icon: "💬" },
  { name: "Salesforce", color: "text-blue-400", icon: "☁️" },
  { name: "Segment", color: "text-green-400", icon: "🔵" },
  { name: "Intercom", color: "text-blue-400", icon: "💭" },
  { name: "Mixpanel", color: "text-violet-400", icon: "📈" },
  { name: "PostHog", color: "text-amber-400", icon: "🦔" },
  { name: "Amplitude", color: "text-indigo-400", icon: "📉" },
  { name: "Zapier", color: "text-orange-400", icon: "⚡" },
];

export default function Integrations() {
  return (
    <section id="integrations" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Integrations
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            Plays nicely with your entire stack
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            One-click connectors with 60+ tools. More added every month.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {integrations.map((integration, i) => (
            <AnimatedSection key={integration.name} delay={i * 0.05}>
              <div className="glass glass-hover rounded-xl p-4 flex items-center gap-3 group cursor-default">
                <span className="text-xl">{integration.icon}</span>
                <div>
                  <div className="text-white text-sm font-semibold leading-tight">{integration.name}</div>
                  <div className={`text-xs font-medium ${integration.color}`}>Connected</div>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="text-center mt-8">
          <span className="text-slate-500 text-sm">
            + 48 more integrations via{" "}
            <a href="#" className="text-violet-400 hover:text-violet-300 font-medium">REST API & Webhooks</a>
          </span>
        </AnimatedSection>
      </div>
    </section>
  );
}
