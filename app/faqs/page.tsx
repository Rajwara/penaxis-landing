import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FAQsPageAccordion from "@/components/FAQsPageAccordion";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQs - Penaxis",
  description: "Answers to common questions about working with Penaxis.",
};

export default function FAQsPage() {
  return (
    <>
      <Navbar />
      <main>
        <FAQsPageAccordion />
      </main>
      <Footer />
    </>
  );
}
