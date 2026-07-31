import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutContent from "@/components/AboutContent";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Game Changers — Penaxis",
  description:
    "Small team, big results. Meet the people behind Penaxis's strategy, technology, and growth work.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
