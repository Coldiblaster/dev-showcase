"use client";

import { ArrowLeft } from "lucide-react";
import { BookOpen } from "lucide-react";

import { HeroSection } from "@/components/hero-section";

// import { BeforeAfterSection } from "./before-after-section";
// import { CodePlaygroundSection } from "./code-playground-section";
import { CodeSnippetsSection } from "./code-snippets-section";
import { LiveComponentsSection } from "./live-components-section";

export function DevResourcesPage() {
  return (
    <div className="min-h-screen">
      <HeroSection
        badge="Guia"
        badgeIcon={BookOpen}
        title="Recursos para Desenvolvedores"
        subtitle="Explore ferramentas, dicas e exemplos práticos para acelerar seu aprendizado."
        description="Componentes ao vivo, snippets úteis, comparações de código e playground interativo. Tudo que você precisa para aprender e evoluir como dev. Aqui você encontra recursos para diferentes stacks, frameworks e temas, com exemplos reais e dicas de produtividade."
        backHref="/"
        showBackLink={true}
        titleSlot={undefined}
        descriptionSlot={undefined}
        badgeSlot={undefined}
        ctaSlot={undefined}
        statsSlot={undefined}
        socialSlot={undefined}
      />
      {/* All Sections */}
      <LiveComponentsSection />
      <CodeSnippetsSection />
      {/* <BeforeAfterSection /> */}
      {/* <CodePlaygroundSection /> */}
    </div>
  );
}
