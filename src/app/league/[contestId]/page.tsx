"use client";

import { useParams, useRouter } from "next/navigation";
import MainNavbar from "@/components/shared/main-navbar";
import Footer from "@/components/shared/footer";
import { useQuery } from "@tanstack/react-query";
import { getContestMatchInfo } from "@/controllers/contest.controller";
import { MeshGradient } from "@/layouts/mesh-gradient";
import { ContestantsCards } from "@/components/league/contest/contestants-cards";
import { ContestInstructions } from "@/components/league/contest/contest-instructions";
import MatchmakingTree from "@/components/league/matchmaking-tree";
import { ContestMatchResult } from "@/models/contest.model";
import { useEffect } from "react";
import LogoLoader from "@/components/shared/ui/logo-loader/loader";
import { ContestFailedLoad } from "@/components/league/contest/contest-failed-load";

const navLinks = [
  { key: "home", label: "Inicio", href: "/" },
  { key: "league", label: "Liga", href: "/league" },
  { key: "rank", label: "Ranking", href: "/rank" },
];

export default function ContestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contestId = params.contestId as string;

  const { data, isLoading } = useQuery({
    queryKey: ["matchmaking", contestId],
    queryFn: async () => getContestMatchInfo(Number(contestId)),
  });

  useEffect(() => {
    if (!isLoading && data?.msg === ContestMatchResult.NO_LOGGED) {
      router.replace("/log-in");
    }
  }, [data, isLoading, router]);

  return (
    <>
      <MainNavbar navLinks={navLinks} />
      <MeshGradient>
        {isLoading ? (
          <div className="w-screen h-screen flex items-center justify-center">
            <LogoLoader size={300} />
          </div>
        ) : !data.ok ? (
          <ContestFailedLoad data={data} />
        ) : (
          <div className="flex flex-col gap-10 items-center justify-center mt-[8%] mx-[20%]">
            <h1 className="text-white">{data.contest[0].name}</h1>
            <ContestantsCards />
            <ContestInstructions />
            <h1 className="text-white">Matchmaking</h1>
            {!isLoading && (
              <MatchmakingTree tree={data.tree} students={data.students} />
            )}
          </div>
        )}
      </MeshGradient>
      <Footer />
    </>
  );
}
