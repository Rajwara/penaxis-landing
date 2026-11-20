import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CareersHub from "@/components/CareersHub";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Careers - Penaxis",
  description: "Open roles at Penaxis - join the team building AI-powered products, software, and growth systems for real clients.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <CareersHub />
      </main>
      <Footer />
    </>
  );
}
