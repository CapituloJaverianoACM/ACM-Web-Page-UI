"use client";

import { ContestResultStudent } from "@/controllers/contest.controller";
import { useTranslations } from "next-intl";

interface StudentPositionRowProps {
  student: ContestResultStudent;
  isCurrentUser?: boolean;
}

export const StudentPositionRow = ({
  student,
  isCurrentUser = false,
}: StudentPositionRowProps) => {
  const t = useTranslations("Results");
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
      className={`flex gap-2 p-2 px-4 rounded-md bg-white dark:bg-white/10 shadow-md lg:px-6 text-xs lg:text-base hover:scale-[1.01] transition hover:shadow-lg dark:border dark:border-white/20 ${
        isCurrentUser
          ? "ring-2 ring-(--azul-electrico) dark:ring-(--azul-niebla)"
          : ""
      }`}
    >
      <p className={`w-10 m-0 ${positionClass} font-semibold`}>{position}.</p>
      <div className="flex justify-between w-full">
        <p className="flex gap-1 m-0 w-[90%] truncate text-ellipsis text-black dark:text-white">
          {student.name}
          <span className="md:flex hidden">{student.surname}</span>
          {isCurrentUser && (
            <span className="text-(--azul-electrico) dark:text-(--azul-niebla) font-semibold">
              {t("you")}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
