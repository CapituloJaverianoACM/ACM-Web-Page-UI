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
import Link from "next/link";

export default function ContestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contestId = params.contestId as string;

  const { data, isLoading } = useQuery({
    queryKey: ["matchmaking", contestId],
    queryFn: async () => getContestMatchInfo(Number(contestId)),
    staleTime: 0,
  });

  const { data: tree, isLoading: isLoadingTree } = useQuery({
    queryKey: ["matchmaking-tree", contestId],
    queryFn: async () => getMatchmakingTree(Number(contestId)),
    staleTime: 0,
  });

  const [
    user_ready,
    toggleUserReady,
    codeforces_problem,
    opponent,
    onCheckProblem,
  ] = useContestMatch(Number(contestId), data?.current_student);

  useEffect(() => {
    if (!isLoading && data?.msg === ContestMatchResult.NO_LOGGED) {
      const currentPath = `/league/${contestId}`;
      router.replace(`/log-in?redirect=${encodeURIComponent(currentPath)}`);
    }

    // Si el usuario no hace parte del contest, redirigir a la página de resultados
    if (!isLoading && data?.msg === ContestMatchResult.NO_PARTICIPANT) {
      router.replace(`/league/${contestId}/result`);
    }
  }, [data, isLoading, router]);

  if (isLoading || isLoadingTree) {
    return (
      <MeshGradient>
        <div className="w-screen h-screen flex items-center justify-center">
          <LogoLoader size={300} />
        </div>
      </MeshGradient>
    );
  }

  // Verificar si el contest terminó (el nodo raíz tiene un student_id)
  const isContestFinished =
    tree?.student_id !== null && tree?.student_id !== undefined;

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

            {/* Anuncio de contest terminado */}
            {isContestFinished && (
              <div className="w-full max-w-2xl p-6 rounded-lg bg-white/20 dark:bg-white/10 backdrop-blur-lg border-2 border-yellow-400 dark:border-yellow-500 shadow-xl">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="text-4xl">🎉</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                    ¡El Contest ha Finalizado!
                  </h2>
                  <p className="text-lg text-black/80 dark:text-white/80">
                    Los resultados ya están disponibles. Revisa tu posición y la
                    clasificación final.
                  </p>
                  <Link
                    href={`/league/${contestId}/result`}
                    className="btn btn--primary dark:text-white px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform"
                  >
                    Ver Resultados
                  </Link>
                </div>
              </div>
            )}

            {!isContestFinished && (
              <>
                <ContestantsCards
                  user={{ ...data.current_student, ready: user_ready }}
                  oponent={opponent}
                />
                <ContestInstructions
                  ready={user_ready}
                  codeforces_problem={codeforces_problem}
                  toggleReady={toggleUserReady}
                  onCheckProblem={onCheckProblem}
                />
                <h1 className="text-black dark:text-white">Matchmaking</h1>
                {!isLoadingTree && (
                  <MatchmakingTree tree={tree} students={data.students} />
                )}
              </>
            )}
          </div>
        )}
      </MeshGradient>
    </>
  );
}
