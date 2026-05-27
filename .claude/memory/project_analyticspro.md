---
name: project-analyticspro
description: AnalyticsPro SaaS landing page built in Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion
metadata:
  type: project
---

Production SaaS landing page "AnalyticsPro" built in C:\Users\pc\Downloads\frontend.

**Why:** User requested a full production-grade landing page with specific sections, SEO, GA4 events, and animations.

**How to apply:** When user asks about this project, all files are in C:\Users\pc\Downloads\frontend. Key architecture:
- `app/layout.tsx` — JSON-LD SoftwareApplication schema, GA4 script, Inter + Plus Jakarta Sans fonts
- `app/page.tsx` — dynamically imports all sections (lazy loading) except Hero + Navbar
- `app/sitemap.ts`, `app/robots.ts` — auto-generated SEO files
- `components/` — Navbar, Hero (counter animation), Features, Pricing (monthly/annual toggle), Testimonials, FAQ (accordion + JSON-LD FAQPage schema), Footer (newsletter)
- `components/AnimatedSection.tsx` — Framer Motion fade-up wrapper used by all below-fold sections
- `lib/gtag.ts` — GA4 event helper; GA_MEASUREMENT_ID from NEXT_PUBLIC_GA_ID env var

**Stack:** Next.js 14.2.5, React 18, TypeScript, Tailwind CSS 3, Framer Motion 11. next.config.mjs (not .ts — 14.2.5 doesn't support next.config.ts).

**Build:** Passes `npm run build`, all 4 routes SSG.
