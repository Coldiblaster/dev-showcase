import { getTranslations } from "next-intl/server";

import { PERSONAL } from "@/lib/constants";
import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "@/lib/seo";

/** Estruturado JSON-LD para SEO (Person, WebSite, ProfilePage, Breadcrumb). */
export async function JsonLd() {
  const tHero = await getTranslations("hero");
  const tNav = await getTranslations("nav");

  const personSchema = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE_AUTHOR,
    url: SITE_URL,
    jobTitle: PERSONAL.role,
    description: tHero("meta.personDescription"),
    sameAs: [PERSONAL.github, PERSONAL.linkedin],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Tailwind CSS",
      "Node.js",
      "GraphQL",
      "RESTful APIs",
      "Design Systems",
      "Clean Architecture",
      "TDD",
      "Framer Motion",
      "React Query",
      "Zustand",
      "Expo",
      "Docker",
      "CI/CD",
    ],
    image: `${SITE_URL}${PERSONAL.avatar}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Presidente Prudente",
      addressRegion: "SP",
      addressCountry: "BR",
    },
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: tHero("meta.websiteDescription"),
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: ["pt-BR", "en", "es", "de"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const profilePageSchema = {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: `${PERSONAL.name} — ${PERSONAL.role}`,
    description: tHero("meta.profileDescription"),
    mainEntity: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: tNav("home"),
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tNav("implementations"),
        item: `${SITE_URL}/implementacoes`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tNav("tips"),
        item: `${SITE_URL}/dicas`,
      },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personSchema,
      websiteSchema,
      profilePageSchema,
      breadcrumbSchema,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
