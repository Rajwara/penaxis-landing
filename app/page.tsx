import Navbar from "@/components/Navbar";
import MaterialHeading from "@/components/MaterialHeading";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AIShowcase from "@/components/AIShowcase";
import Coverage from "@/components/Coverage";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import WhyUs from "@/components/WhyUs";
import Team from "@/components/Team";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <MaterialHeading />
        <Hero />
        <About />
        <AIShowcase />
        <Coverage />
        <Services />
        <Industries />
        <WhyUs />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
