import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import IndustryDetail from "@/components/IndustryDetail";
import Footer from "@/components/Footer";
import { industries, caseStudies, slugify } from "@/lib/data";

export function generateStaticParams() {
  return industries.map((ind) => ({ slug: slugify(ind.title) }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const industry = industries.find((ind) => slugify(ind.title) === params.slug);
  if (!industry) return { title: "Industries - Penaxis" };
  return {
    title: `${industry.title} - Penaxis`,
    description: industry.copy,
    alternates: {
      canonical: `/industries/${slugify(industry.title)}`,
    },
  };
}

export default function IndustrySlugPage({ params }: { params: { slug: string } }) {
  const industry = industries.find((ind) => slugify(ind.title) === params.slug);
  if (!industry) notFound();

  const relatedCaseStudies = caseStudies.filter((study) => study.tags.includes(industry.title)).slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <IndustryDetail industry={industry} relatedCaseStudies={relatedCaseStudies} />
      </main>
      <Footer />
    </>
  );
}
