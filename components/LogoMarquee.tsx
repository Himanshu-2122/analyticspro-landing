const companies = [
  "Vercel", "Stripe", "Linear", "Notion", "Figma",
  "GitHub", "Slack", "Shopify", "Loom", "Webflow",
  "Framer", "Planetscale", "Supabase", "Railway", "Fly.io",
];

function LogoItem({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center px-8 py-3 mx-2 rounded-xl glass text-slate-500 font-semibold text-sm whitespace-nowrap hover:text-slate-300 hover:border-white/20 transition-all duration-200 border border-white/[0.06]">
      <span className="w-1.5 h-1.5 rounded-full bg-violet-500/40 mr-2.5" />
      {name}
    </div>
  );
}

export default function LogoMarquee() {
  const doubled = [...companies, ...companies];

  return (
    <section className="py-12 border-y border-white/[0.06] overflow-hidden">
      <div className="mb-6 text-center">
        <p className="text-slate-600 text-sm font-medium uppercase tracking-widest">
          Powering growth at world-class teams
        </p>
      </div>
      <div className="marquee-container">
        <div className="flex animate-marquee">
          {doubled.map((name, i) => (
            <LogoItem key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
