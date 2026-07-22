import type { MetadataRoute } from "next";
import { cumgeonConfig } from "@/config/cumgeon";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${cumgeonConfig.seo.siteUrl}/sitemap.xml`,
  };
}
