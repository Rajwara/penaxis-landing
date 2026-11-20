import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import InsightsHub from "@/components/InsightsHub";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Insights - Penaxis",
  description: "Ideas, lessons, and practical advice from the Penaxis team on building software and AI products.",
  alternates: {
    canonical: "/insights",
  },
};

export default function InsightsPage() {
  return (
    <>
      <Navbar />
      <main>
        <InsightsHub />
      </main>
      <Footer />
    </>
  );
}
