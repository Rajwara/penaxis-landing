import Navbar from "@/components/Navbar";
import NameIntro from "@/components/NameIntro";
import HorizontalGallery from "@/components/HorizontalGallery";
import About from "@/components/About";
import AIShowcase from "@/components/AIShowcase";
import Services from "@/components/Services";
import ServicesShowcase from "@/components/ServicesShowcase";
import IndustriesStack from "@/components/IndustriesStack";
import WhyChooseUs from "@/components/WhyChooseUs";
import GameChangers from "@/components/GameChangers";
import LogoMarquee from "@/components/LogoMarquee";
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
        <Services />
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
