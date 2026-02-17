import { PERSONAL } from "@/lib/constants";
import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "@/lib/seo";

const personSchema = {
  "@type": "Person",
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
};

const websiteSchema = {
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    `Portfolio, implementações reais e guias técnicos de ${PERSONAL.name} — React, Next.js, React Native e mais.`,
  author: { "@type": "Person", name: SITE_AUTHOR },
  inLanguage: ["pt-BR", "en", "es", "de"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
