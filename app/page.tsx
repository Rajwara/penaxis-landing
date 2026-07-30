import Navbar from "@/components/Navbar";
import NameIntro from "@/components/NameIntro";
import HorizontalGallery from "@/components/HorizontalGallery";
import About from "@/components/About";
import AIShowcase from "@/components/AIShowcase";
import ServicesShowcase from "@/components/ServicesShowcase";
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
        <IndustriesStack />
        <About />
        <AIShowcase />
        <WhyChooseUs />
        <GameChangers />
        <LogoMarquee />
        <CaseStudiesAccordion />
        <Testimonials />

        <ConnectSection />
      </main>
      <Footer />
    </>
  );
}
