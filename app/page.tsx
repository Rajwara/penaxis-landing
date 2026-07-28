import Navbar from "@/components/Navbar";
import MaterialHeading from "@/components/MaterialHeading";
import LiquidHeading from "@/components/LiquidHeading";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AIShowcase from "@/components/AIShowcase";
import TechPicker from "@/components/TechPicker";
import Coverage from "@/components/Coverage";
import Services from "@/components/Services";
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
        <MaterialHeading />
        <LiquidHeading />
        <Hero />
        <About />
        <AIShowcase />
        <TechPicker />
        <Coverage />
        <Services />
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
