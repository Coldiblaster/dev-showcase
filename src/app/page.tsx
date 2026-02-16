import { AboutSection } from "@/features/home/about-section";
import { AISection } from "@/features/home/ai-section";
import { ContactSection } from "@/features/home/contact-section";
import { ExperienceSection } from "@/features/home/experience-section";
import { HeroSection } from "@/features/home/hero-section";
import { ProjectsSection } from "@/features/home/projects-section";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <AISection />
      <ContactSection />
    </main>
  );
}
