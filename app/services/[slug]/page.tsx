import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ServiceDetail from "@/components/ServiceDetail";
import Footer from "@/components/Footer";
import { services } from "@/lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service - Penaxis" };
  return {
    title: `${service.title} - Penaxis`,
    description: service.short,
  };
}

export default function ServiceSlugPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <main>
        <ServiceDetail slug={params.slug} />
      </main>
      <Footer />
    </>
  );
}
