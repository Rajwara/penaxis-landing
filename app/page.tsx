import Navbar from "@/components/Navbar";
import NameIntro from "@/components/NameIntro";
import HorizontalGallery from "@/components/HorizontalGallery";
import AIShowcase from "@/components/AIShowcase";
import ServicesShowcase from "@/components/ServicesShowcase";
import ServiceFlexPanels from "@/components/ServiceFlexPanels";
import IndustriesStack from "@/components/IndustriesStack";
import WhyChooseUs from "@/components/WhyChooseUs";
import GameChangers from "@/components/GameChangers";
import LogoMarquee from "@/components/LogoMarquee";
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
        <ServicesShowcase />
        <ServiceFlexPanels />
        <IndustriesStack />
        <CaseStudiesAccordion />
        <AIShowcase />
        <WhyChooseUs />
        <GameChangers />
        <LogoMarquee />
        <Testimonials />

        <ConnectSection />
      </main>
      <Footer />
    </>
  );
}
