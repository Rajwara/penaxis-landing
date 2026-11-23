import Navbar from "@/components/Navbar";
import VideoBanner from "@/components/VideoBanner";
import FeaturedLogos from "@/components/FeaturedLogos";
import ServiceFlexPanels from "@/components/ServiceFlexPanels";
import WhyChooseUs from "@/components/WhyChooseUs";
import CaseStudiesAccordion from "@/components/CaseStudiesAccordion";
import InsightsSection from "@/components/InsightsSection";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <VideoBanner />
        <FeaturedLogos />
        <WhyChooseUs />
        <ServiceFlexPanels />
        <CaseStudiesAccordion />
        <InsightsSection />

        <ConnectSection />
      </main>
      <Footer />
    </>
  );
}
