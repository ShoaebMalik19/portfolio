import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.shoaebmalik.in/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: ["https://www.shoaebmalik.in/portrait/shoaeb-photo.webp"]
    }
  ];
}
