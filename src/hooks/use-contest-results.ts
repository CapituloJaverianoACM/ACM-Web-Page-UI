"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getContestMatchInfo,
  getContestResults,
  getMatchmakingTree,
} from "@/controllers/contest.controller";

import { useTranslations } from "next-intl";

export const useContestResultsData = (contestId: string) => {
  const t = useTranslations("Results");
  const { data: matchData, isLoading: isLoadingMatch } = useQuery({
    queryKey: ["matchmaking", contestId, "results"],
    queryFn: async () => getContestMatchInfo(Number(contestId), false),
  });

  const { data: tree, isLoading: isLoadingTree } = useQuery({
    queryKey: ["matchmaking-tree", contestId],
    queryFn: async () => getMatchmakingTree(Number(contestId)),
  });

  const { data: resultsData, isLoading: isLoadingResults } = useQuery({
    queryKey: ["contest-results", contestId, matchData?.current_student?.id],
    enabled: !!matchData?.current_student?.id,
    queryFn: async () =>
      getContestResults(Number(contestId), matchData?.current_student?.id),
  });

  const isLoading = isLoadingMatch || isLoadingResults || isLoadingTree;

  const contestName =
    resultsData?.contest?.name || matchData?.contest?.name || t("title");

  return {
    matchData,
    tree,
    resultsData,
    isLoading,
    isLoadingTree,
    isLoadingResults,
    contestName,
  };
};
