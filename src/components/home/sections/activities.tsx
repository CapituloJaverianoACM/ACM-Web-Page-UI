"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Carousel, Card } from "@/components/home/apple-cards-carousel";
import { PreExamsContent } from "../pre-exams-content";
import { CPMembersContent } from "../cp-members-content";

export function Activities() {
  const t = useTranslations("Activities");
  const cards = carrousel_items(t).map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div id="activities" className="space-y-8 pl-4 sm:pl-6 lg:pl-8 py-12">
      <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-40">
        <h1 className="dark:text-white">{t("title")}</h1>
        <p className="text-xl dark:text-white/80">{t("description")}</p>
      </div>
      <Carousel items={cards} />
    </div>
  );
}

const carrousel_items = (t) => [
  {
    category: t("cpMembers.category"),
    title: t("cpMembers.title"),
    src: "https://drive.google.com/uc?export=view&id=1RW9BeAFChl4J9darhpCqwl1NEvrNi_jJ",
    content: <CPMembersContent />,
  },
  {
    category: t("preExams.category"),
    title: t("preExams.title"),
    src: "https://drive.google.com/uc?export=view&id=1mAWVNMh5wmlaBaciCkSMOV2nQXVYkMAu",
    content: <PreExamsContent />,
  },
  {
    category: t("courses.category"),
    title: t("courses.title"),
    src: "https://drive.google.com/uc?export=view&id=1HH58GMKbAqUc06YbqzhHifatfKGDRpV0",
    content: <></>,
  },
];
