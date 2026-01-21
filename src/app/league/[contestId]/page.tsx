"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getContestMatchInfo,
  getMatchmakingTree,
} from "@/controllers/contest.controller";
import { MeshGradient } from "@/layouts/mesh-gradient";
import { ContestantsCards } from "@/components/league/contest/contestants-cards";
import { ContestInstructions } from "@/components/league/contest/contest-instructions";
import MatchmakingTree from "@/components/league/matchmaking-tree";
import { ContestMatchResult } from "@/models/contest.model";
import { useEffect } from "react";
import LogoLoader from "@/components/shared/ui/logo-loader/loader";
import { ContestFailedLoad } from "@/components/league/contest/contest-failed-load";
import { useContestMatch } from "@/hooks/use-contest-match";

export default function ContestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contestId = params.contestId as string;

  const { data, isLoading } = useQuery({
    queryKey: ["matchmaking", contestId],
    queryFn: async () => getContestMatchInfo(Number(contestId)),
  });

  const { data: tree, isLoading: isLoadingTree } = useQuery({
    queryKey: ["matchmaking-tree", contestId],
    queryFn: async () => getMatchmakingTree(Number(contestId)),
  });

  useEffect(() => {
    if (!isLoading && data?.msg === ContestMatchResult.NO_LOGGED) {
      router.replace("/log-in");
    }
  }, [data, isLoading, router]);

  const [user_ready, toggleUserReady, codeforces_problem] = useContestMatch(
    Number(contestId),
    data?.current_student,
  );

  if (isLoading || isLoadingTree) {
    return (
      <MeshGradient>
        <div className="w-screen h-screen flex items-center justify-center">
          <LogoLoader size={300} />
        </div>
      </MeshGradient>
    );
  }

  return (
    <>
      <MeshGradient>
        {!data.ok || !tree ? (
          <ContestFailedLoad
            msg={!tree ? ContestMatchResult.NO_TREE : data.msg}
          />
        ) : (
          <div className="flex flex-col gap-10 items-center justify-center mt-[8%] mx-[20%]">
            <h1 className="text-black dark:text-white">
              {data.contest[0].name}
            </h1>
            <ContestantsCards
              user={{ ...data.current_student, ready: user_ready }}
              oponent={null}
            />
            <ContestInstructions
              ready={user_ready}
              codeforces_problem={codeforces_problem}
              toggleReady={toggleUserReady}
            />
            <h1 className="text-black dark:text-white">Matchmaking</h1>
            {!isLoadingTree && (
              <MatchmakingTree tree={tree} students={data.students} />
            )}
          </div>
        )}
      </MeshGradient>
    </>
  );
}
