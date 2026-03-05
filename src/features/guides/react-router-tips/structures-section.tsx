import { BookOpenText, CirclePile } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";

import type reactRouterTipsPage from "../../../../messages/pt-BR/reactRouterTipsPage.json";

type StructuresItem =
  (typeof reactRouterTipsPage)["structures"]["items"][number];

export function StructuresSection() {
  const t = useTranslations("reactRouterTipsPage");

  return (
    <section id="structures" className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={CirclePile}
            title={t("structures.title")}
            subtitle={t("structures.subtitle")}
          />
        </AnimatedSection>

        <div className="flex flex-col gap-6 md:gap-10">
          {(t.raw("structures.items") as StructuresItem[]).map((item, i) => (
            <AnimatedSection key={item.name} delay={0.1 + i * 0.08}>
              <CardBlur radius="xl" padding="p-6" className="">
                <div className="mb-2 flex items-center gap-2 text-base text-foreground md:text-lg">
                  <BookOpenText className="h-5 w-5 text-primary" />
                  {item.name}
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <CodeBlock code={item.code} title={item.name} />
                </div>
              </CardBlur>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
