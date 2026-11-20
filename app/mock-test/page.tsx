import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import VideoBanner from "@/components/VideoBanner";
import HorizontalGallery from "@/components/HorizontalGallery";
import ServiceFlexPanels from "@/components/ServiceFlexPanels";
import WhyChooseUs from "@/components/WhyChooseUs";
import GameChangers from "@/components/GameChangers";
import CaseStudiesAccordion from "@/components/CaseStudiesAccordion";
import Testimonials from "@/components/Testimonials";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";

// Duplicate of the homepage (app/page.tsx) at /mock-test, for trying
// out changes without touching the live homepage. Keep this in sync
// manually, or edit it freely for one-off experiments.

// Sandbox page, not real content - kept out of search.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function MockTestPage() {
  return (
    <>
      <Navbar />
      <main>
        <VideoBanner />
        <HorizontalGallery />
        <ServiceFlexPanels />
        <WhyChooseUs />
        <GameChangers />
        <CaseStudiesAccordion />
        <Testimonials />

        <ConnectSection />
      </main>
      <Footer />
    </>
  );
}
