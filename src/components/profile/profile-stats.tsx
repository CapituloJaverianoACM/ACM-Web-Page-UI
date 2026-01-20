import { LevelEnum } from "@/models/level.enum";
import { Student } from "@/models/student.model";
import React from "react";

interface ProfileStatsProps {
  student: Student | null;
}

export const ProfileStats = ({ student }: ProfileStatsProps) => {
  const totalParticipations = student?.matches_count || 0;
  const totalWins = student?.victory_count || 0;
  const level = student?.level?.toString() || LevelEnum.Initial.toString();

  return (
    <div className="px-6 pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative overflow-hidden rounded-xl border border-blue-200 dark:border-gray-700 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-indigo-900/20 p-4">
          <div className="text-xs font-semibold text-blue-600 dark:text-blue-300">
            Participaciones
          </div>
          <div className="mt-1 text-3xl font-extrabold text-blue-800 dark:text-blue-100">
            {totalParticipations}
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-200/60 dark:bg-blue-800/40" />
        </div>
        <div className="relative overflow-hidden rounded-xl border border-emerald-200 dark:border-gray-700 bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-teal-900/20 p-4">
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-300">
            Competencias ganadas
          </div>
          <div className="mt-1 text-3xl font-extrabold text-emerald-800 dark:text-emerald-100">
            {totalWins}
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-200/60 dark:bg-emerald-800/40" />
        </div>
        <div
          className={`relative overflow-hidden rounded-xl border p-4 ${
            level === "Advanced"
              ? "border-purple-200 dark:border-gray-700 bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-violet-900/20"
              : "border-amber-200 dark:border-gray-700 bg-linear-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-rose-900/20"
          }`}
        >
          <div
            className={`text-xs font-semibold ${
              level === "Advanced"
                ? "text-purple-600 dark:text-purple-300"
                : "text-amber-600 dark:text-amber-300"
            }`}
          >
            Nivel
          </div>
          <div
            className={`mt-1 text-3xl font-extrabold ${
              level === "Advanced"
                ? "text-purple-800 dark:text-purple-100"
                : "text-amber-800 dark:text-amber-100"
            }`}
          >
            {level}
          </div>
          <div
            className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${
              level === "Advanced"
                ? "bg-purple-200/60 dark:bg-purple-800/40"
                : "bg-amber-200/60 dark:bg-amber-800/40"
            }`}
          />
        </div>
      </div>
    </div>
  );
};
