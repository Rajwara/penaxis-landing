import type { MetadataRoute } from "next";
import { services, caseStudies, insights, industries, slugify } from "@/lib/data";

const BASE_URL = "https://www.penaxis.com";

// /home-v2 and /testing are component sandboxes (noindex via their own
// metadata), so they're intentionally left out of here too.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/case-studies`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/careers`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/contact-us`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/faqs`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/game-changers`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/industries`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/insights`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/who-we-are`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms-conditions`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${BASE_URL}/case-studies/${study.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insights.map((post) => ({
    url: `${BASE_URL}/insights/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${BASE_URL}/industries/${slugify(ind.title)}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...insightRoutes, ...industryRoutes];
}
