import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import InsightDetail from "@/components/InsightDetail";
import Footer from "@/components/Footer";
import { insights } from "@/lib/data";

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = insights.find((p) => p.slug === params.slug);
  if (!post) return { title: "Insights - Penaxis" };
  return {
    title: `${post.title} - Penaxis`,
    description: post.excerpt,
    alternates: {
      canonical: `/insights/${post.slug}`,
    },
  };
}

export default function InsightSlugPage({ params }: { params: { slug: string } }) {
  const index = insights.findIndex((p) => p.slug === params.slug);
  const post = insights[index];
  if (!post) notFound();

  const next = insights[(index + 1) % insights.length];

  return (
    <>
      <Navbar />
      <main>
        <InsightDetail post={post} next={next} />
      </main>
      <Footer />
    </>
  );
}
