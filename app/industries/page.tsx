import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import IndustriesHub from "@/components/IndustriesHub";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Industries — Penaxis",
  description: "13 industries, one team — see how Penaxis builds for each one.",
};

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustriesHub />
      </main>
      <Footer />
    </>
  );
}
