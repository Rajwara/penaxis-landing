import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ServicesHero from "@/components/ServicesHero";
import ServicesPageList from "@/components/ServicesPageList";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services - Penaxis",
  description: "AI-powered MVPs, digital transformation, fractional sales and growth, and web/CRM software - everything Penaxis builds, in one place.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <ServicesPageList />
      </main>
      <Footer />
    </>
  );
}
