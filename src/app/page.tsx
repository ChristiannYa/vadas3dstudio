import {
  IntroSection,
  PortfolioSection,
  AboutSection,
  GetInTouchSection,
} from "./sections/home/";
import Collage from "./components/miscellaneous/Collage";

export default function Home() {
  return (
    <main className="space-y-6 lg:space-y-12">
      <IntroSection />
      <PortfolioSection />
      <AboutSection />
      <Collage />
      <GetInTouchSection />
    </main>
  );
}
