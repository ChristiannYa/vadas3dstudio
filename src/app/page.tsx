import {
  IntroSection,
  PortfolioSection,
  AboutSection,
  QuestionsAndAnswers,
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
      <QuestionsAndAnswers />
      <GetInTouchSection />
    </main>
  );
}
