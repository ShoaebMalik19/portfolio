import type { MetadataRoute } from "next";
import { LANDING_PAGES, SITE } from "@/data/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE}/portrait/shoaeb-photo.webp`]
    },
    ...LANDING_PAGES.map((p) => ({
      url: `${SITE}${p.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9
    }))
  ];
}
