import React from "react";
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
  const { members, coaches, loading } = useCodeforcesData(CP_MEMBERS);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <p className="dark:text-[--azul-niebla]">
        Somos un grupo apasionado por competir y desctacarnos cada día más
      </p>
      <br />
      <FocusCards cards={members} />
      <p className="text-3xl text-center my-10 font-semibold dark:text-[--azul-niebla]">
        Nuestro Coach
      </p>
      <FocusCards cards={coaches} />
    </>
  );
};
