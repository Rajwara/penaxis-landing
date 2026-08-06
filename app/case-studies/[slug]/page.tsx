import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CaseStudyBanner from "@/components/CaseStudyBanner";
import CaseStudyFeaturedCTA from "@/components/CaseStudyFeaturedCTA";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import Footer from "@/components/Footer";
import { caseStudies } from "@/lib/data";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = caseStudies.find((c) => c.slug === params.slug);
  if (!study) return { title: "Case Study — Penaxis" };
  return {
    title: `${study.title} — Penaxis`,
    description: study.blurb,
  };
}

export default function CaseStudySlugPage({ params }: { params: { slug: string } }) {
  const index = caseStudies.findIndex((c) => c.slug === params.slug);
  const study = caseStudies[index];
  if (!study) notFound();

  const featured = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <Navbar />
      <main>
        <CaseStudyBanner title={study.title} tags={study.tags} images={study.bannerImages} />
        <CaseStudyDetail study={study} />
        <CaseStudyFeaturedCTA featured={featured} />
      </main>
      <Footer />
    </>
  );
}
