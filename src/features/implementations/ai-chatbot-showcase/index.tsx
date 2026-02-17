"use client";

import { ApiRouteSection } from "./api-route-section";
import { ArchitectureSection } from "./architecture-section";
import { ChecklistSection } from "./checklist-section";
import { AiChatbotCta } from "./cta-section";
import { FrontendSection } from "./frontend-section";
import { AiChatbotHero } from "./hero-section";
import { OverviewSection } from "./overview-section";
import { PricingSection } from "./pricing-section";
import { SetupSection } from "./setup-section";
import { SystemPromptSection } from "./system-prompt-section";

/**
 * Showcase completo de AI Chatbot.
 *
 * Demonstração de como implementar um chatbot com IA usando OpenAI,
 * incluindo setup, pricing, arquitetura, API route e frontend.
 */
export function AiChatbotShowcase() {
  return (
    <div>
      <AiChatbotHero />
      <OverviewSection />
      <SetupSection />
      <PricingSection />
      <ArchitectureSection />
      <ApiRouteSection />
      <SystemPromptSection />
      <FrontendSection />
      <ChecklistSection />
      <AiChatbotCta />
    </div>
  );
}
