import { Calendar } from "lucide-react";
import React from "react";

interface PeriodTitleProps {
  period: string;
  groupLength: number;
}

export const PeriodTitle: React.FC<PeriodTitleProps> = ({
  period,
  groupLength,
}) => {
  const formatPeriodTitle = (memberSince: string) => {
    const [year, semester] = memberSince.split("-");
    return `${year} - Semestre ${semester}`;
  };

  return (
    <div className="relative flex items-center gap-8 mb-8">
      <div className="relative z-10 flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg flex items-center justify-center">
          <Calendar className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          {period === "Sin periodo"
            ? "Sin Periodo Definido"
            : formatPeriodTitle(period)}
        </h2>
        <p className="text-gray-600 dark:text-[var(--azul-niebla)] mt-1">
          {groupLength} miembro
          {groupLength !== 1 ? "s" : ""}
          {period !== "Sin periodo"
            ? ` ${groupLength !== 1 ? "ingresaron" : "ingresó"} en este periodo`
            : ""}
        </p>
      </div>
    </div>
  );
};
