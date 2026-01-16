"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Contest } from "@/models/contest.model";
import { MatchmakingTreeNode } from "@/models/matchmaking.model";
import MainNavbar from "@/components/shared/main-navbar";
import Footer from "@/components/shared/footer";
import { HeroUIProvider } from "@heroui/react";
import {
  getContestById,
  getMatchmakingTree,
} from "@/controllers/contest.controller";
import MatchmakingTree from "@/components/league/matchmaking-tree";

// Función helper para obtener contest por ID
async function fetchContestById(id: number): Promise<Contest> {
  try {
    const contest = await getContestById(id);
    return contest;
  } catch (error) {
    throw new Error("No se pudo cargar el contest");
  }
}

const navLinks = [
  { key: "home", label: "Inicio", href: "/" },
  { key: "league", label: "Liga", href: "/league" },
  { key: "rank", label: "Ranking", href: "/rank" },
];

export default function ContestDetailPage() {
  const params = useParams();
  const contestId = params.contestId as string;
  const [contest, setContest] = useState<Contest | null>(null);
  const [tree, setTree] = useState<MatchmakingTreeNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [treeError, setTreeError] = useState<string | null>(null);

  useEffect(() => {
    const id = Number(contestId);
    setLoading(true);
    Promise.all([fetchContestById(id), getMatchmakingTree(id)])
      .then(([contestData, treeData]) => {
        setContest(contestData ?? null);
        setTree(treeData ?? null);
      })
      .catch((err) => {
        console.error("Error loading contest or tree:", err);
        setTreeError("No se pudo cargar el árbol de matchmaking");
      })
      .finally(() => setLoading(false));
  }, [contestId]);

  if (loading) return <div>Cargando...</div>;
  if (!contest) return <div>Contest no encontrado</div>;

  return (
    <HeroUIProvider>
      <MainNavbar navLinks={navLinks} />
      <main className="min-h-screen py-20">
        <div className="container mx-auto space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-[#00081b] text-center">
            Árbol de Matchmaking
          </h2>
          {treeError && (
            <p className="text-red-600 mb-4 font-semibold">{treeError}</p>
          )}
          {tree ? (
            <MatchmakingTree tree={tree} />
          ) : (
            <p className="text-gray-600 text-center py-8">
              No hay datos del árbol.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </HeroUIProvider>
  );
}
