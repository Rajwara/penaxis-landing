import Navbar from "@/components/Navbar";
import VideoBanner from "@/components/VideoBanner";
import ServiceFlexPanels from "@/components/ServiceFlexPanels";
import WhyChooseUs from "@/components/WhyChooseUs";
import GameChangers from "@/components/GameChangers";
import CaseStudiesAccordion from "@/components/CaseStudiesAccordion";
import Testimonials from "@/components/Testimonials";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <VideoBanner />
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
