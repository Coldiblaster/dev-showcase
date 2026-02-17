import { AboutSection } from "@/features/home/about-section";
import { AISection } from "@/features/home/ai-section";
import { ContactSection } from "@/features/home/contact";
import { ExperienceSection } from "@/features/home/experience-section";
import { GitHubStatsSection } from "@/features/home/github-stats";
import { HomeHeroSection } from "@/features/home/hero-section";
import { ProjectsSection } from "@/features/home/projects-section";
import { StackSection } from "@/features/home/stack-section";
import { StatsSection } from "@/features/home/stats-section";

export default function Page() {
  return (
    <main>
      <HomeHeroSection />
      <StatsSection />
      <AboutSection />
      <StackSection />
      <GitHubStatsSection />
      <ProjectsSection />
      <ExperienceSection />
      <AISection />
      <ContactSection />
    </main>
  );
}
