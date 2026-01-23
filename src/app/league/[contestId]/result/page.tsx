"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getContestMatchInfo,
  getContestResults,
  getMatchmakingTree,
} from "@/controllers/contest.controller";
import { MeshGradient } from "@/layouts/mesh-gradient";
import MatchmakingTree from "@/components/league/matchmaking-tree";
import { getUser } from "@/controllers/supabase.controller";
import { useEffect, useState } from "react";
import { ContestResultStudent } from "@/controllers/contest.controller";

const StudentPositionRow = ({
  student,
  isCurrentUser = false,
}: {
  student: ContestResultStudent;
  isCurrentUser?: boolean;
}) => {
  const position = student.position;
  const positionClass =
    position === 1
      ? "text-yellow-500"
      : position === 2
        ? "text-neutral-500"
        : position === 3
          ? "text-orange-500"
          : "text-(--azul-electrico)";

  return (
    <div
      className={`flex gap-2 p-2 px-4 rounded-md bg-white shadow-md lg:px-6 text-xs lg:text-base hover:scale-[1.01] transition hover:shadow-lg ${isCurrentUser
        ? "ring-2 ring-(--azul-electrico) dark:ring-(--azul-niebla)"
        : ""
        }`}
    >
      <p className={`w-10 m-0 ${positionClass} font-semibold`}>{position}.</p>
      <div className="flex justify-between w-full">
        <p className="flex gap-1 m-0 w-[90%] truncate text-ellipsis">
          {student.name}
          <span className="md:flex hidden">{student.surname}</span>
          {isCurrentUser && (
            <span className="text-(--azul-electrico) dark:text-(--azul-niebla) font-semibold">
              (Tú)
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default function ContestResultPage() {
  const params = useParams();
  const contestId = params.contestId as string;
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  const { data: matchData, isLoading: isLoadingMatch } = useQuery({
    queryKey: ["matchmaking", contestId],
    queryFn: async () => getContestMatchInfo(Number(contestId)),
  });

  const { data: tree, isLoading: isLoadingTree } = useQuery({
    queryKey: ["matchmaking-tree", contestId],
    queryFn: async () => getMatchmakingTree(Number(contestId)),
  });

  const { data: resultsData, isLoading: isLoadingResults } = useQuery({
    queryKey: ["contest-results", contestId, userId],
    queryFn: async () => {
      const user = await getUser();
      return getContestResults(Number(contestId), user?.id);
    },
  });

  const isLoading = isLoadingMatch || isLoadingResults || isLoadingTree;

  return (
    <MeshGradient>
      <div className="flex flex-col gap-10 items-center justify-center mt-[8%] mx-[5%] md:mx-[10%] lg:mx-[20%] pb-20">
        {/* Título del contest */}
        <h1 className="dark:text-white text-3xl md:text-4xl lg:text-5xl text-center">
          {isLoading
            ? "Cargando..."
            : resultsData?.contest?.name ||
            matchData?.contest?.name ||
            "Resultados del Contest"}
        </h1>

        {/* Posición del usuario */}
        {resultsData?.userPosition !== undefined && (
          <div className="w-full max-w-2xl">
            <div className="p-6 rounded-md bg-white/20 backdrop-blur-lg border border-white shadow-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4 dark:text-white">
                Tu Posición
              </h2>
              <div className="flex items-center justify-center">
                <span
                  className={`text-6xl md:text-8xl font-bold ${resultsData.userPosition === 1
                    ? "text-yellow-500"
                    : resultsData.userPosition === 2
                      ? "text-neutral-500"
                      : resultsData.userPosition === 3
                        ? "text-orange-500"
                        : "text-white"
                    }`}
                >
                  {resultsData.userPosition}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Árbol de matchmaking */}
        <div className="w-full">
          <h2 className="dark:text-white text-2xl md:text-3xl font-semibold text-center mb-6">
            Árbol de Matchmaking
          </h2>
          {!isLoadingTree && tree && matchData?.students && (
            <MatchmakingTree
              tree={tree}
              students={matchData.students || []}
            />
          )}
          {!isLoadingTree && !tree && (
            <div className="flex items-center justify-center p-8 dark:text-white/50">
              No hay árbol de matchmaking disponible
            </div>
          )}
        </div>

        {/* Tabla de posiciones */}
        {resultsData?.students && resultsData.students.length > 0 && (
          <div className="w-full max-w-4xl">
            <h2 className="dark:text-white text-2xl md:text-3xl font-semibold text-center mb-6">
              Clasificación Final
            </h2>
            <div className="p-2 rounded-md bg-white shadow-md">
              <div className="p-2">
                <div className="flex flex-col gap-2">
                  {resultsData.students.map((student) => {
                    const isCurrentUser =
                      resultsData.userStudentId !== undefined &&
                      student.id === resultsData.userStudentId;
                    return (
                      <StudentPositionRow
                        key={student.id}
                        student={student}
                        isCurrentUser={isCurrentUser}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {!isLoadingResults &&
          (!resultsData?.students || resultsData.students.length === 0) && (
            <div className="flex items-center justify-center p-8 dark:text-white/50">
              No hay resultados disponibles aún
            </div>
          )}
      </div>
    </MeshGradient>
  );
}
