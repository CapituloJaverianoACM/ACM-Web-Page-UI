"use client";

import { useParams } from "next/navigation";
import MainNavbar from "@/components/shared/main-navbar";
import Footer from "@/components/shared/footer";
import { useQuery } from "@tanstack/react-query";
import {
  ContestMatchResult,
  getContestMatchInfo,
} from "@/controllers/contest.controller";
import { MeshGradient } from "@/layouts/mesh-gradient";
import { ContestantsCards } from "@/components/league/contest/ContestantsCards";
import { ContestInstructions } from "@/components/league/contest/ContestInstructions";
import MatchmakingTree from "@/components/league/matchmaking-tree";

const navLinks = [
  { key: "home", label: "Inicio", href: "/" },
  { key: "league", label: "Liga", href: "/league" },
  { key: "rank", label: "Ranking", href: "/rank" },
];

export default function ContestDetailPage() {
  const params = useParams();
  const contestId = params.contestId as string;

  const { data, isLoading } = useQuery({
    queryKey: ["matchmaking", contestId],
    queryFn: async () => getContestMatchInfo(Number(contestId)),
  });

  return (
    <>
      <MainNavbar navLinks={navLinks} />
      <MeshGradient>
        <div className="flex flex-col gap-10 items-center justify-center mt-[8%] mx-[20%]">
          <h1 className="text-white">
            {isLoading ? "Cargando..." : data.contest[0].name}
          </h1>
          <ContestantsCards />
          <ContestInstructions />
          <h1 className="text-white">Matchmaking</h1>
          {!isLoading && (
            <MatchmakingTree tree={data.tree} students={data.students} />
          )}
        </div>
      </MeshGradient>
      <Footer />
    </>
  );
}
