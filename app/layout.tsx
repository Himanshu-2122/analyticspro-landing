import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import { ToastProvider } from "@/contexts/ToastContext";
import { AuthProvider } from "@/contexts/AuthContext";
import FloatingCTA from "@/components/FloatingCTA";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://analyticspro.io"),
  title: {
    default: "AnalyticsPro — Real-Time Analytics, SEO Tracking & A/B Testing",
    template: "%s | AnalyticsPro",
  },
  description:
    "AnalyticsPro gives you real-time analytics, SEO tracking, A/B testing, GA4 integration, Core Web Vitals monitoring, and custom reports — all in one blazing-fast dashboard.",
  keywords: [
    "analytics platform", "real-time analytics", "SEO tracking", "A/B testing",
    "GA4 integration", "Core Web Vitals", "web analytics SaaS", "dashboard analytics",
  ],
  authors: [{ name: "AnalyticsPro Team" }],
  creator: "AnalyticsPro",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "https://analyticspro.io" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://analyticspro.io",
    siteName: "AnalyticsPro",
    title: "AnalyticsPro — Real-Time Analytics, SEO Tracking & A/B Testing",
    description: "Real-time analytics, SEO tracking, A/B testing, and Core Web Vitals monitoring in one powerful dashboard.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AnalyticsPro Dashboard Preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnalyticsPro — Real-Time Analytics, SEO Tracking & A/B Testing",
    description: "Real-time analytics, SEO tracking, A/B testing, and Core Web Vitals monitoring in one powerful dashboard.",
    images: ["/og-image.png"],
    creator: "@analyticspro",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AnalyticsPro",
  url: "https://analyticspro.io",
  logo: "https://analyticspro.io/logo.png",
  sameAs: [
    "https://twitter.com/analyticspro",
    "https://linkedin.com/company/analyticspro",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@analyticspro.io",
  },
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AnalyticsPro",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "199",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2847",
    bestRating: "5",
  },
  description:
    "Production-grade analytics platform with real-time dashboards, SEO tracking, A/B testing, GA4 integration, and Core Web Vitals monitoring.",
  url: "https://analyticspro.io",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans">
        <AuthProvider>
          <ToastProvider>
            {children}
            <FloatingCTA />
            <CookieConsent />
          </ToastProvider>
        </AuthProvider>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
          `}
        </Script>
      </body>
    </html>
  );
}
