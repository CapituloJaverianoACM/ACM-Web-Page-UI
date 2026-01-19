"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { FocusCards } from "./focus-cards";
import { useCodeforcesData } from "@/hooks/use-codeforces-data";

const CP_MEMBERS: string[] = [
  "adrianrrruiz",
  "TalkySafe143",
  "achalogy",
  "Avila_Sa",
  "Cojuan",
  "Lorenzo_lrc",
  "harry3008",
  "sandoval95",
];

export const CPMembersContent = () => {
  const t = useTranslations("Activities.cpMembers");
  const { members, coaches, loading } = useCodeforcesData(CP_MEMBERS);

  if (loading) return <p>{t("loading")}</p>;

  return (
    <>
      <p className="dark:text-[--azul-niebla]">{t("description")}</p>
      <br />
      <FocusCards cards={members} />
      <p className="text-3xl text-center my-10 font-semibold dark:text-[--azul-niebla]">
        {t("coach")}
      </p>
      <FocusCards cards={coaches} />
    </>
  );
};
