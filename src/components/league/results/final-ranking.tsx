"use client";

import { ContestResultStudent } from "@/controllers/contest.controller";
import { StudentPositionRow } from "./student-position-row";
import { useTranslations } from "next-intl";

interface FinalRankingProps {
  students: ContestResultStudent[];
  userStudentId?: number;
}

export const FinalRanking = ({
  students,
  userStudentId,
}: FinalRankingProps) => {
  const t = useTranslations("Results");
  if (!students || students.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 dark:text-white/50">
        {t("noResults")}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl">
      <h2 className="dark:text-white text-2xl md:text-3xl font-semibold text-center mb-6">
        {t("finalRanking")}
      </h2>
      <div className="p-2 rounded-md bg-white shadow-md">
        <div className="p-2">
          <div className="flex flex-col gap-2">
            {students.map((student) => {
              const isCurrentUser =
                userStudentId !== undefined && student.id === userStudentId;
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
  );
};
