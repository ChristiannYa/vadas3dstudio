"use client";

import React, { useState } from "react";
import { qnaList } from "@/app/constants/qna";

export default function QuestionsAndAnswers() {
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(
    null
  );

  const toggleAnswer = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  return (
    <section className="container-1000">
      <h1 className="section-title__mb">FAQ&apos;s</h1>
      <ul className="space-y-4">
        {qnaList.map((item, index) => {
          return (
            <li
              key={item.id}
              className={`qna px-2 cursor-pointer border-l-2 ${
                openQuestionIndex === index
                  ? "border-accent-1"
                  : "border-transparent"
              }`}
              onClick={() => toggleAnswer(index)}
            >
              <h2 className="text-xl lg:text-2xl font-raleway font-[300] dark:font-[200] text-start">
                {item.q}
              </h2>
              <p
                className={`text-fg/60 dark:text-gray-500 font-raleway font-[300] text-base lg:text-lg ${
                  openQuestionIndex === index ? "block" : "hidden"
                }`}
              >
                {item.a}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
