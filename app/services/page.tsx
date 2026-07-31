import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ServicesIntro from "@/components/ServicesIntro";
import ServicesCube from "@/components/ServicesCube";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services — Penaxis",
  description:
    "AI-powered MVP development, digital transformation, fractional sales & growth, and web/CRM/software solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesIntro />
        <ServicesCube />
      </main>
      <Footer />
    </>
  );
}
