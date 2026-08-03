import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CaseStudyBanner from "@/components/CaseStudyBanner";
import CaseStudyFeaturedCTA from "@/components/CaseStudyFeaturedCTA";
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
  const index = caseStudyPlaceholders.findIndex((c) => c.slug === params.slug);
  const study = caseStudyPlaceholders[index];
  if (!study) notFound();

  const featured = caseStudyPlaceholders[(index + 1) % caseStudyPlaceholders.length];

  return (
    <>
      <Navbar />
      <main>
        <CaseStudyBanner title={study.title} tags={study.tags} />
        <CaseStudyFeaturedCTA featured={featured} />
      </main>
      <Footer />
    </>
  );
}
