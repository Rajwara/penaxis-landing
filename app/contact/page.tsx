import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactBanner from "@/components/ContactBanner";
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
        {/* More sections to come */}
      </main>
      <Footer />
    </>
  );
}
