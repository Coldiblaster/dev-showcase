import type { MetadataRoute } from "next";

import { CONTENT_ITEMS } from "@/data/content";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const CATEGORY_PATH_MAP: Record<string, string> = {
    implementation: "implementacoes",
    guide: "dicas",
    tool: "ferramentas",
  };

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/implementacoes`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ferramentas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/dicas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const dynamicPages: MetadataRoute.Sitemap = CONTENT_ITEMS.map((item) => {
    const prefix = CATEGORY_PATH_MAP[item.category] ?? "dicas";

    return {
      url: `${SITE_URL}/${prefix}/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...dynamicPages];
}
