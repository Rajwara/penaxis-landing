import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutV2Banner from "@/components/AboutV2Banner";
import AboutV2Beliefs from "@/components/AboutV2Beliefs";
import AboutV2Values from "@/components/AboutV2Values";
import AboutV2Timeline from "@/components/AboutV2Timeline";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Penaxis",
  description: "Penaxis — Growth & Technology Partner.",
};

export default function AboutV2Page() {
  return (
    <>
      <Navbar />
      <main>
        <AboutV2Banner />
        <AboutV2Beliefs />
        <AboutV2Values />
        <AboutV2Timeline />

        {/* Existing section, moved down below the new banner/values/timeline sections */}
        <Hero />
      </main>
      <Footer />
    </>
  );
}
