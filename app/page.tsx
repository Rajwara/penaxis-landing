import Navbar from "@/components/Navbar";
import NameIntro from "@/components/NameIntro";
import HorizontalGallery from "@/components/HorizontalGallery";
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
        <NameIntro />
        <HorizontalGallery />
        <ServiceFlexPanels />
        <CaseStudiesAccordion />
        <WhyChooseUs />
        <GameChangers />
        <Testimonials />

        <ConnectSection />
      </main>
      <Footer />
    </>
  );
}
