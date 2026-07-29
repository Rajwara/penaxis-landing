import Navbar from "@/components/Navbar";
import NameIntro from "@/components/NameIntro";
import HorizontalGallery from "@/components/HorizontalGallery";
import StarfieldBanner from "@/components/StarfieldBanner";
import About from "@/components/About";
import AIShowcase from "@/components/AIShowcase";
import Coverage from "@/components/Coverage";
import Services from "@/components/Services";
import ServicesShowcase from "@/components/ServicesShowcase";
import IndustriesStack from "@/components/IndustriesStack";
import WhyUs from "@/components/WhyUs";
import Team from "@/components/Team";
import ShapeGrid from "@/components/ShapeGrid";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <NameIntro />
        <HorizontalGallery />
        <ServicesShowcase />
        <Coverage />
        <IndustriesStack />
        <StarfieldBanner />
        <About />
        <AIShowcase />
        <Services />
        <WhyUs />
        <Team />

        {/* TEMPORARY PREVIEW — remove or relocate once a placement is decided */}
        <ShapeGrid />

        <CTA />
      </main>
      <Footer />
    </>
  );
}
