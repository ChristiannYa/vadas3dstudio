import {
  IntroSection,
  PortfolioSection,
  SkillsSection,
  AboutSection,
  GetInTouchSection,
} from "./sections/home/";

export default function Home() {
  return (
    <main className="space-y-6 lg:space-y-12">
      <IntroSection />
      <PortfolioSection />
      <SkillsSection />
      <AboutSection />
      <GetInTouchSection />
    </main>
  );
}
