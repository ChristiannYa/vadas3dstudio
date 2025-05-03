import {
  IntroSection,
  PortfolioSection,
  AboutSection,
  QuestionsAndAnswers,
  ServicesSection,
  GetInTouchSection,
} from "./sections/home/";
import CallToAction from "./components/page/CallToAction";

export default function Home() {
  return (
    <main>
      <div className="space-y-6 lg:space-y-12">
        <IntroSection />
        <PortfolioSection />
        <AboutSection />
        <QuestionsAndAnswers />
        <ServicesSection />
      </div>
      <CallToAction />
      <hr />
      <GetInTouchSection />
    </main>
  );
}
