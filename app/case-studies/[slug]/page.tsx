import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CaseStudyBanner from "@/components/CaseStudyBanner";
import Footer from "@/components/Footer";
import { caseStudyPlaceholders } from "@/lib/data";

export function generateStaticParams() {
  return caseStudyPlaceholders.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = caseStudyPlaceholders.find((c) => c.slug === params.slug);
  if (!study) return { title: "Case Study — Penaxis" };
  return {
    title: `${study.title} — Penaxis`,
    description: study.blurb,
  };
}

export default function CaseStudySlugPage({ params }: { params: { slug: string } }) {
  const study = caseStudyPlaceholders.find((c) => c.slug === params.slug);
  if (!study) notFound();

  return (
    <>
      <Navbar />
      <main>
        <CaseStudyBanner title={study.title} tags={study.tags} />
      </main>
      <Footer />
    </>
  );
}
