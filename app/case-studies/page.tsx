import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CaseStudyV2Banner from "@/components/CaseStudyV2Banner";
import CaseStudyV2Grid from "@/components/CaseStudyV2Grid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Case Studies - Penaxis",
  description: "Real projects and real impact - explore Penaxis's work by industry.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <CaseStudyV2Banner />
        <CaseStudyV2Grid />
      </main>
      <Footer />
    </>
  );
}
