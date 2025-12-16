import ExperienceSection from "@/components/sections/experience-section";
import HeroSection from "@/components/sections/hero-section";
import SkillsSection from "@/components/sections/skills-section";

const Home = () => (
  <main className="h-svh snap-y snap-mandatory overflow-y-auto">
    <HeroSection />
    <SkillsSection />
    <ExperienceSection />
  </main>
);

export default Home;
