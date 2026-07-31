import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactBanner from "@/components/ContactBanner";
import ContactFormSection from "@/components/ContactFormSection";
import OfficesSection from "@/components/OfficesSection";
import ContactMapSection from "@/components/ContactMapSection";
import ShapeGrid from "@/components/ShapeGrid";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Penaxis",
  description: "Get in touch with Penaxis to start a project.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactBanner />
        <ContactFormSection />
        <OfficesSection />

        {/* Relocated from the main homepage per client request — still a temporary/preview treatment */}
        <ShapeGrid />

        <ContactMapSection />

        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
