"use client";

import { useTranslations } from "next-intl";

import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";

import { A11yStep } from "./steps/a11y-step";
import { CreatingStep } from "./steps/creating-step";
import { DevelopingStep } from "./steps/developing-step";
import { EnvironmentStep } from "./steps/environment-step";
import { I18nStep } from "./steps/i18n-step";
import { PrStep } from "./steps/pr-step";
import { QualityStep } from "./steps/quality-step";
import { RegistrationStep } from "./steps/registration-step";
import { StructureStep } from "./steps/structure-step";
import { TrackProvider } from "./track-context";
import { TutorialHero } from "./tutorial-hero";

/** Página de tutorial interativo de desenvolvimento. */
export function TutorialPage() {
  const tNav = useTranslations("tutorialPage.sectionNav");
  const tStep = useTranslations("tutorialPage.nav");

  const sections = [
    { id: "environment", label: tNav("environment") },
    { id: "structure", label: tNav("structure") },
    { id: "creating", label: tNav("creating") },
    { id: "registration", label: tNav("registration") },
    { id: "developing", label: tNav("developing") },
    { id: "i18n", label: tNav("i18n") },
    { id: "a11y", label: tNav("a11y") },
    { id: "quality", label: tNav("quality") },
    { id: "pr", label: tNav("pr") },
  ];

  return (
    <TrackProvider>
      <div className="min-h-screen">
        <TutorialHero />
        <SectionNav sections={sections} triggerId="environment" />
        <EnvironmentStep
          nextStepId="structure"
          nextStepLabel={tStep("next", { step: tNav("structure") })}
        />
        <SectionDivider />
        <StructureStep
          nextStepId="creating"
          nextStepLabel={tStep("next", { step: tNav("creating") })}
        />
        <SectionDivider />
        <CreatingStep
          nextStepId="registration"
          nextStepLabel={tStep("next", { step: tNav("registration") })}
        />
        <SectionDivider />
        <RegistrationStep
          nextStepId="developing"
          nextStepLabel={tStep("next", { step: tNav("developing") })}
        />
        <SectionDivider />
        <DevelopingStep
          nextStepId="i18n"
          nextStepLabel={tStep("next", { step: tNav("i18n") })}
        />
        <SectionDivider />
        <I18nStep
          nextStepId="a11y"
          nextStepLabel={tStep("next", { step: tNav("a11y") })}
        />
        <SectionDivider />
        <A11yStep
          nextStepId="quality"
          nextStepLabel={tStep("next", { step: tNav("quality") })}
        />
        <SectionDivider />
        <QualityStep
          nextStepId="pr"
          nextStepLabel={tStep("next", { step: tNav("pr") })}
        />
        <SectionDivider />
        <PrStep />
      </div>
    </TrackProvider>
  );
}
