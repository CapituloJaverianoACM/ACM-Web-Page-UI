"use client";

import { useParams } from "next/navigation";
import { MeshGradient } from "@/layouts/mesh-gradient";
import { useContestResultsData } from "@/hooks/use-contest-results";
import { ResultsHeader } from "@/components/league/results/results-header";
import { UserPosition } from "@/components/league/results/user-position";
import { MatchmakingSection } from "@/components/league/results/matchmaking-section";
import { FinalRanking } from "@/components/league/results/final-ranking";
import Confetti from "@/components/shared/ui/confetti";

export default function ContestResultPage() {
  const params = useParams();
  const contestId = params.contestId as string;

  const {
    matchData,
    tree,
    resultsData,
    isLoading,
    isLoadingTree,
    contestName,
  } = useContestResultsData(contestId);

  return (
    <MeshGradient>
      <Confetti duration={5000} />
      <div className="flex flex-col gap-10 items-center justify-center mt-[8%] mx-[5%] md:mx-[10%] lg:mx-[20%] pb-20">
        <ResultsHeader isLoading={isLoading} contestName={contestName} />

        <UserPosition position={resultsData?.userPosition} />

        <MatchmakingSection
          isLoading={isLoadingTree}
          tree={tree}
          students={matchData?.students}
        />

        <FinalRanking
          students={resultsData?.students || []}
          userStudentId={resultsData?.userStudentId}
        />
      </div>
    </MeshGradient>
  );
}
