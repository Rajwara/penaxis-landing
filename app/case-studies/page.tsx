import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CaseStudyExperience from "@/components/CaseStudyExperience";

export const metadata: Metadata = {
  title: "Case Studies — Penaxis",
  description: "How Penaxis approaches a project, from first conversation to the system still running after launch.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <CaseStudyExperience />
      </main>
    </>
  );
}
