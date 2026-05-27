import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
      {/* Aurora */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-700/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-700/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative text-center max-w-lg">
        <div className="font-heading text-[120px] sm:text-[160px] font-extrabold leading-none gradient-text opacity-20 select-none mb-4">
          404
        </div>
        <div className="-mt-8 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white mb-3">Page not found</h1>
          <p className="text-slate-400 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all shadow-glow-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/#pricing"
            className="px-6 py-3 rounded-xl glass hover:bg-white/[0.08] text-white font-semibold text-sm transition-all border border-white/10"
          >
            View Pricing
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-600">
          <Link href="/#features" className="hover:text-slate-400 transition-colors">Features</Link>
          <Link href="/#faq" className="hover:text-slate-400 transition-colors">FAQ</Link>
          <a href="mailto:hello@analyticspro.io" className="hover:text-slate-400 transition-colors">Contact</a>
        </div>
      </div>
    </div>
  );
}
