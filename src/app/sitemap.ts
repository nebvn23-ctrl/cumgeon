import type { MetadataRoute } from "next";
import { cumgeonConfig } from "@/config/cumgeon";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: cumgeonConfig.seo.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
