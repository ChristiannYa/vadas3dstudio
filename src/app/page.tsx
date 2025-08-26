"use client";

import {
  IntroSection,
  PortfolioSection,
  AboutSection,
  QuestionsAndAnswers,
  ServicesSection,
  GetInTouchSection,
} from "./sections/home/";
import CallToAction from "./components/page/CallToAction";
import AutomaticCarousel from "./shop/AutomaticCarousel";
import { duAgGroup } from "./assets/effects";

export default function Home() {
  return (
    <div>
      <div className="space-y-6 lg:space-y-12">
        <IntroSection />
        <PortfolioSection />
        <AboutSection />
        <QuestionsAndAnswers />
        <ServicesSection />
        <div className="container-1600">
          <div className="flex flex-col md:flex-row justify-center items-start md:gap-x-6 gap-y-4">
            <AutomaticCarousel
              images={duAgGroup}
              intervalSeconds={1}
              className="rounded-sm md:rounded-md lg:rounded-2xl w-full aspect-[7/4]"
            />
            <CallToAction />
          </div>
        </div>
        <GetInTouchSection />
      </div>
    </div>
  );
}
