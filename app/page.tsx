import Navbar from "@/components/Navbar";
import VideoBanner from "@/components/VideoBanner";
import HorizontalGallery from "@/components/HorizontalGallery";
import ServiceFlexPanels from "@/components/ServiceFlexPanels";
import WhyChooseUs from "@/components/WhyChooseUs";
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
        <HorizontalGallery />
        <ServiceFlexPanels />
        <WhyChooseUs />
        <CaseStudiesAccordion />
        <Testimonials />

        <ConnectSection />
      </main>
      <Footer />
    </>
  );
}
