import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/go/" }],
    sitemap: "https://www.shoaebmalik.in/sitemap.xml",
    host: "https://www.shoaebmalik.in"
  };
}
