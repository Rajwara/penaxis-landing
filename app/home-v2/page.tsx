import Navbar from "@/components/Navbar";
import CityScene from "@/components/CityScene";
import HorizontalGallery from "@/components/HorizontalGallery";
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

// Clone of the homepage (app/page.tsx) at /home-v2, for testing/
// comparing changes without touching the live homepage. Keep this in
// sync manually, or replace its contents entirely once it becomes the
// place for new homepage experiments.

export default function HomeV2() {
  return (
    <>
      <Navbar />
      <main>
        <CityScene />
        <HorizontalGallery />
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
