import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutV2Bento from "@/components/AboutV2Bento";
import AboutV2Banner from "@/components/AboutV2Banner";
import AboutV2Values from "@/components/AboutV2Values";
import AboutV2Timeline from "@/components/AboutV2Timeline";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Who We Are — Penaxis",
  description: "Penaxis — Growth & Technology Partner.",
};

export default function AboutV2Page() {
  return (
    <>
      <Navbar />
      <main>
        <AboutV2Banner />
        <AboutV2Bento />
        <AboutV2Values />
        <AboutV2Timeline />
      </main>
      <Footer />
    </>
  );
}
