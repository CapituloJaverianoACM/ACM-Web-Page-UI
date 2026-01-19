import { Contest } from "@/models/contest.model";
import Link from "next/link";
import React from "react";

interface ContestCardProps {
  contest: Contest;
}

export const ContestCard = ({ contest }: ContestCardProps) => {
  // Determine status based on start_hour and final_hour
  const now = new Date();
  const startDate = new Date(contest.start_hour);
  const endDate = new Date(contest.final_hour);

  const isUpcoming = now < startDate;
  const isInProgress = now >= startDate && now <= endDate;

  const getStatusInfo = () => {
    if (isUpcoming)
      return {
        text: "Próxima",
        classes:
          "bg-[--azul-niebla] text-[--azul-electrico] dark:bg-blue-900 dark:text-blue-200",
      };
    if (isInProgress)
      return {
        text: "En curso",
        classes:
          "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      };
    return {
      text: "Finalizada",
      classes: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <li className="group">
      <div className="flex items-start gap-4 p-4 rounded-lg border border-[--azul-niebla] dark:border-gray-700 bg-[--azul-niebla]/30 dark:bg-gray-700/50 hover:bg-[--azul-niebla]/50 dark:hover:bg-gray-700 transition-colors">
        <div className="flex-1 min-w-0">
          <p className="text-base mb-0 font-semibold text-[--azul-noche] dark:text-white truncate">
            {contest.name}
          </p>
          <span
            className={`inline-block px-2 py-0.5 rounded text-xs font-medium mt-1 ${statusInfo.classes}`}
          >
            {statusInfo.text}
          </span>
          <p className="text-xs text-[--azul-ultramar] dark:text-gray-400 truncate mt-1">
            {new Date(contest.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {contest.classroom ? ` · ${contest.classroom}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isUpcoming && !contest.checkin ? ( // TODO : Traer si ya hizo checkin de participation
            <Link
              href="/auth/login"
              className="no-underline px-2 py-1 rounded-md text-xs font-semibold bg-[--azul-electrico] hover:bg-[--azul-crayon] text-white hover:text-white"
            >
              Check in
            </Link>
          ) : isInProgress ? (
            <Link
              href="/rank"
              className="no-underline px-2 py-1 rounded-md text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white"
            >
              Ver progreso
            </Link>
          ) : 1 ? ( // TODO : Traer el puesto de participation
            <span
              className={`px-2 py-1 rounded-md text-xs font-semibold ${1 === 1 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200" : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"}`}
            >
              Puesto {1}
            </span>
          ) : null}
        </div>
      </div>
    </li>
  );
};
