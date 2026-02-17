export const JSON_LD_CODE = `const personSchema = {
  "@type": "Person",
  name: "Vinicius Bastazin Araujo",
  url: SITE_URL,
  jobTitle: "Desenvolvedor Frontend Senior",
  sameAs: [
    "https://github.com/Coldiblaster",
    "https://www.linkedin.com/in/vbastazin/",
  ],
  knowsAbout: [
    "React", "Next.js", "TypeScript",
    "React Native", "Tailwind CSS", "Node.js",
  ],
  image: \`\${SITE_URL}/avatar-desk.png\`,
};

const websiteSchema = {
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  author: { "@type": "Person", name: SITE_AUTHOR },
  inLanguage: ["pt-BR", "en", "es", "de"],
};

// Injetado no <head> via layout.tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [personSchema, websiteSchema],
    }),
  }}
/>`;

export const SITEMAP_CODE = `import { CONTENT_ITEMS } from "@/data/content";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, priority: 1 },
    { url: \`\${SITE_URL}/implementacoes\`, priority: 0.8 },
    { url: \`\${SITE_URL}/dicas\`, priority: 0.8 },
  ];

  const dynamicPages = CONTENT_ITEMS.map((item) => ({
    url: \`\${SITE_URL}/\${prefix}/\${item.slug}\`,
    priority: 0.7,
  }));

  return [...staticPages, ...dynamicPages];
}`;

export const ROBOTS_CODE = `export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: \`\${SITE_URL}/sitemap.xml\`,
  };
}`;

export const LAYOUT_CODE = `export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: \`\${SITE_NAME} | Desenvolvedor Frontend Senior\`,
    template: \`%s | \${SITE_NAME}\`,
  },
  description: "Portfolio de Vinicius Bastazin Araujo...",
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: \`\${SITE_NAME} — Desenvolvedor Frontend\`,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES", "de_DE"],
  },
  twitter: { card: "summary_large_image" },
  verification: { google: "OAX_26lbl..." },
};`;

export const HELPER_CODE = `export function buildPageMetadata(page: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = \`\${SITE_URL}\${page.path ?? ""}\`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "pt_BR",
    },
  };
}`;

export const OG_CODE = `import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const avatar = await readFile(
    join(process.cwd(), "public", "avatar-desk.png"),
  );
  const src = \`data:image/png;base64,\${avatar.toString("base64")}\`;

  return new ImageResponse(
    <div style={{ /* dark bg, avatar, name, skills */ }}>
      <img src={src} width={280} height={280} />
      <h1>Vinicius Bastazin</h1>
      <p>Desenvolvedor Frontend Senior</p>
      {skills.map(s => <span>{s}</span>)}
    </div>,
    { ...size },
  );
}`;
