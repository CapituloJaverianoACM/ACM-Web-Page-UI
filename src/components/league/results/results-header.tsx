"use client";

import { useTranslations } from "next-intl";

interface ResultsHeaderProps {
  isLoading: boolean;
  contestName?: string;
}

export const ResultsHeader = ({
  isLoading,
  contestName,
}: ResultsHeaderProps) => {
  const t = useTranslations("Results");
  return (
    <h1 className="dark:text-white text-3xl md:text-4xl lg:text-5xl text-center">
      {isLoading ? t("loading") : contestName || t("title")}
    </h1>
  );
};
