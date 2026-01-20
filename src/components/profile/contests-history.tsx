import { Contest } from "@/models/contest.model";
import React from "react";
import { ContestCard } from "./ui/contest-card";

interface ContestsHistoryProps {
  contests: Contest[];
  loading: boolean;
}

export const ContestsHistory = ({
  contests,
  loading,
}: ContestsHistoryProps) => {
  return (
    <section className="bg-(--white) dark:bg-gray-800 rounded-xl shadow-sm border border-(--azul-niebla) dark:border-gray-700">
      <div className="p-6 border-b border-(--azul-niebla) dark:border-gray-700 flex items-center justify-start">
        <p className="text-xl font-semibold text-(--azul-noche) dark:text-white">
          Historial de competencias
        </p>
      </div>
      <ul className="p-4 space-y-3">
        {loading ? (
          <li className="flex items-center justify-center py-8">
            <div className="text-(--azul-ultramar) dark:text-gray-400">
              Cargando competencias...
            </div>
          </li>
        ) : contests.length === 0 ? (
          <li className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="text-(--azul-ultramar) dark:text-gray-400 text-base mb-2">
                No tienes competencias registradas aún
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Cuando participes en una competencia, aparecerá aquí
              </p>
            </div>
          </li>
        ) : (
          contests.map((c) => <ContestCard key={c.id} contest={c} />)
        )}
      </ul>
    </section>
  );
};
