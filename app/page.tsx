import Navbar from "@/components/Navbar";
import NameIntro from "@/components/NameIntro";
import RetroHero from "@/components/RetroHero";
import MaterialHeading from "@/components/MaterialHeading";
import LiquidHeading from "@/components/LiquidHeading";
import Hero from "@/components/Hero";
import StarfieldBanner from "@/components/StarfieldBanner";
import About from "@/components/About";
import AIShowcase from "@/components/AIShowcase";
import TechPicker from "@/components/TechPicker";
import Coverage from "@/components/Coverage";
import Services from "@/components/Services";
import ServicesExpand from "@/components/ServicesExpand";
import Industries from "@/components/Industries";
import WhyUs from "@/components/WhyUs";
import Team from "@/components/Team";
import ShapeGrid from "@/components/ShapeGrid";
import SpotlightDeck from "@/components/SpotlightDeck";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <NameIntro />
        <RetroHero />
        <MaterialHeading />
        <LiquidHeading />
        <Hero />
        <StarfieldBanner />
        <About />
        <AIShowcase />
        <TechPicker />
        <Coverage />
        <Services />
        <ServicesExpand />
        <Industries />
        <WhyUs />
        <Team />

        {/* TEMPORARY PREVIEW — remove or relocate once a placement is decided */}
        <ShapeGrid />
        <SpotlightDeck />

        <CTA />
      </main>
      <Footer />
    </>
  );
}
