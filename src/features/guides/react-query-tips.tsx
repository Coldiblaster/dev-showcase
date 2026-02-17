"use client";

import { Code2, Database, Link2, RefreshCw, Zap } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { CTASection } from "@/components/cta-section";
import { FeatureCard } from "@/components/feature-card";
import { HeroSection } from "@/components/hero-section";
import { ResourceLink } from "@/components/resource-link";
import { SectionHeader } from "@/components/section-header";
import { TipItem } from "@/components/tip-item";
import { Separator } from "@/components/ui/separator";

import {
  INSTALL_CODE,
  LAYOUT_SETUP_CODE,
  USE_MUTATION_CODE,
  USE_QUERY_CODE,
} from "./examples/react-query-examples";

export function ReactQueryTips() {
  return (
    <div className="min-h-screen">
      <HeroSection
        badge="Data Fetching"
        badgeIcon={Database}
        title="React Query Essencial"
        subtitle="TanStack Query (React Query)"
        description="Domine cache, mutations, otimização e boas práticas para gerenciar estado assíncrono de forma profissional."
        warning="Este guia assume conhecimento básico de React e hooks. Foco em uso prático e real."
      />

      <section className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Zap}
              title="Setup Inicial"
              subtitle="Configuração básica"
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
              Instale o React Query e configure o QueryClient no root da sua
              aplicação.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mb-6">
              <CodeBlock title="terminal" code={INSTALL_CODE} />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <CodeBlock title="app/layout.tsx" code={LAYOUT_SETUP_CODE} />
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <section className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Database}
              title="useQuery - Buscar Dados"
              subtitle="GET requests"
            />
          </AnimatedSection>

          <div className="mb-10 grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Cache Automático",
                description:
                  "Dados são cacheados e reutilizados automaticamente",
              },
              {
                title: "Refetch Inteligente",
                description: "Atualiza dados quando necessário (window focus)",
              },
              {
                title: "Loading States",
                description: "Estados de loading, error e success prontos",
              },
              {
                title: "Retry Automático",
                description: "Tenta novamente em caso de falha",
              },
            ].map((feature, i) => (
              <AnimatedSection key={feature.title} delay={0.1 + i * 0.05}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <CodeBlock
              title="components/user-profile.tsx"
              code={USE_QUERY_CODE}
            />
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <section className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={RefreshCw}
              title="useMutation - Modificar Dados"
              subtitle="POST, PUT, DELETE"
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
              Use mutations para criar, atualizar ou deletar dados. Invalide o
              cache automaticamente após sucesso.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <CodeBlock
              title="components/create-user-form.tsx"
              code={USE_MUTATION_CODE}
            />
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <section className="px-6 py-12 md:py-20 bg-secondary/20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Code2}
              title="Boas Práticas"
              subtitle="Dicas essenciais"
            />
          </AnimatedSection>

          <div className="flex flex-col gap-4">
            {[
              {
                title: "Use Query Keys Consistentes",
                description:
                  "Sempre use arrays: ['users', userId] ao invés de strings simples",
              },
              {
                title: "Configure staleTime",
                description:
                  "Defina quanto tempo os dados são considerados 'frescos'",
              },
              {
                title: "Invalide com Precisão",
                description:
                  "Use invalidateQueries com queryKey específica, não tudo",
              },
              {
                title: "Otimistic Updates",
                description:
                  "Atualize UI antes da resposta do servidor para melhor UX",
              },
              {
                title: "Error Boundaries",
                description:
                  "Sempre trate erros com error boundaries ou try/catch",
              },
            ].map((tip, i) => (
              <AnimatedSection key={tip.title} delay={0.1 + i * 0.05}>
                <TipItem title={tip.title} description={tip.description} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Link2}
              title="Recursos Oficiais"
              subtitle="Documentação e ferramentas"
            />
          </AnimatedSection>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <AnimatedSection delay={0.1}>
              <ResourceLink
                href="https://tanstack.com/query/latest"
                title="Documentação Oficial"
                description="Guia completo do TanStack Query"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <ResourceLink
                href="https://tanstack.com/query/latest/docs/framework/react/devtools"
                title="DevTools"
                description="Ferramenta de debug para React Query"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <ResourceLink
                href="https://tanstack.com/query/latest/docs/framework/react/examples/react/simple"
                title="Exemplos"
                description="Exemplos práticos e casos de uso"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <CTASection
        icon={Database}
        title="Pronto para otimizar seu data fetching?"
        description="Volte ao portfolio e explore mais conteúdos"
      />
    </div>
  );
}
