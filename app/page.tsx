import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import ComparisonTable from "@/components/ComparisonTable";

const HowItWorks = dynamic(() => import("@/components/HowItWorks"), {
  loading: () => <div className="h-96" />,
});
const DashboardPreview = dynamic(() => import("@/components/DashboardPreview"), {
  loading: () => <div className="h-[600px]" />,
});
const Features = dynamic(() => import("@/components/Features"), {
  loading: () => <div className="h-96" />,
});
const Metrics = dynamic(() => import("@/components/Metrics"), {
  loading: () => <div className="h-48" />,
});
const Integrations = dynamic(() => import("@/components/Integrations"), {
  loading: () => <div className="h-96" />,
});
const Pricing = dynamic(() => import("@/components/Pricing"), {
  loading: () => <div className="h-[600px]" />,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-96" />,
});
const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => <div className="h-96" />,
});
const CTASection = dynamic(() => import("@/components/CTASection"), {
  loading: () => <div className="h-80" />,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-64" />,
});
const ExitIntentModal = dynamic(() => import("@/components/ExitIntentModal"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <HowItWorks />
        <DashboardPreview />
        <Features />
        <Metrics />
        <Integrations />
        <Pricing />
        <ComparisonTable />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <ExitIntentModal />
    </>
  );
}
