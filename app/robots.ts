import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/og/*",
    },
    sitemap: "https://sebastianojeda.com/sitemap.xml",
  };
}
