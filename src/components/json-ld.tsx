import { PERSONAL } from "@/lib/constants";
import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "@/lib/seo";

const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: SITE_AUTHOR,
  url: SITE_URL,
  jobTitle: PERSONAL.role,
  description: `${PERSONAL.role} com mais de 8 anos de experiência em React.js, Next.js e React Native. Especialista em arquitetura frontend, design systems, performance, acessibilidade e liderança técnica.`,
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
  description: `Portfolio, implementações reais e guias técnicos de ${PERSONAL.name} — React, Next.js, React Native e mais.`,
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
  description: `Portfolio profissional de ${PERSONAL.name}. Projetos, experiência, implementações técnicas e guias para desenvolvedores.`,
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
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Implementações",
      item: `${SITE_URL}/implementacoes`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Dicas & Guias",
      item: `${SITE_URL}/dicas`,
    },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema, profilePageSchema, breadcrumbSchema],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
