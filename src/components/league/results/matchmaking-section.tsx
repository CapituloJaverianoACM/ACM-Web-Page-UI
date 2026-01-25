"use client";

import MatchmakingTree from "@/components/league/matchmaking-tree";
import { MatchmakingTreeNode } from "@/models/matchmaking.model";
import { TreeStudentInfo } from "@/controllers/contest.controller";
import { useTranslations } from "next-intl";

interface MatchmakingSectionProps {
  isLoading: boolean;
  tree: MatchmakingTreeNode | null | undefined;
  students: TreeStudentInfo[] | undefined;
}

export const MatchmakingSection = ({
  isLoading,
  tree,
  students,
}: MatchmakingSectionProps) => {
  const t = useTranslations("Results");
  return (
    <div className="w-full">
      <h2 className="dark:text-white text-2xl md:text-3xl font-semibold text-center mb-6">
        {t("matchmakingTree")}
      </h2>
      {!isLoading && tree && students && (
        <MatchmakingTree tree={tree} students={students} />
      )}
      {!isLoading && !tree && (
        <div className="flex items-center justify-center p-8 dark:text-white/50">
          {t("noMatchmakingTree")}
        </div>
      )}
    </div>
  );
};
