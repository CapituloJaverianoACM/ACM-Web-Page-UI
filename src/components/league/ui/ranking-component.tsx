import { getRankingStudents } from "@/controllers/student.controller";
import { LevelEnum } from "@/models/level.enum";
import { Student } from "@/models/student.model";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

const RankingContainer = ({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={`p-2 rounded-md bg-white shadow-md ${className}`}>
      {children}
    </div>
  );
};

const Padding = ({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={`p-2 ${className}`}>{children}</div>;
};

const StudentComponent = ({
  student,
  pos,
  skeleton = false,
}: {
  student: Student;
  pos: number;
  skeleton?: boolean;
}) => {
  return (
    <div className="flex gap-2 p-2 px-4 rounded-md bg-white shadow-md lg:px-6 text-xs lg:text-base hover:scale-[1.01] transition hover:shadow-lg dark:bg-white/10">
      {skeleton ? (
        <>
          <div className="w-12 h-4 bg-neutral-200 rounded-sm"></div>
          <div className="w-1/2 h-4 bg-neutral-200 rounded-sm"></div>
        </>
      ) : (
        <>
          <p
            className={`w-10 m-0 ${pos == 0 ? "text-yellow-500" : pos == 1 ? "text-neutral-500" : pos == 2 ? "text-orange-500" : "text-white"} font-semibold`}
          >
            {pos + 1}.
          </p>
          <div className="flex justify-between w-full">
            <p className="flex gap-1 m-0 w-[90%] truncate text-ellipsis">
              {student.name}
              <span className="md:flex hidden">{student.surname}</span>
            </p>
            <p className="m-0">
              <b className="text-base">{student.victory_count}</b>/
              {student.matches_count}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Muestra la información de `student_number` estudiantes
 * @param className clases normales de html, se puede agregar tailwind sin problema (a pesar que no sirva el autocompletado a veces)
 * @param student_number cantidad de estudiantes maxima que puede mostrar el ranking
 * @param offset cantidad de estudiantes a ignorar, se implemento para poner arriba el podio
 * @param refresh_toggle es un booleano que se recibe desde el componente padre para saber cuando tiene que pedir los estudiantes
 */
const RankingList = ({
  className = "",
  student_number = 20,
  offset = 0,
}: {
  className?: string;
  student_number?: number;
  offset?: number;
}) => {
  const SKELETON_RANKING_USERS_COUNT = 5;

  const { data: students = [], isLoading } = useQuery({
    queryKey: ["ranking-students", student_number, offset],
    queryFn: () => getRankingStudents({ student_number, offset }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const studentsToRender = isLoading
    ? Array.from({ length: SKELETON_RANKING_USERS_COUNT }).map(() => ({
        id: 0,
        avatar: "",
        level: LevelEnum.Initial,
        matches_count: 0,
        victory_count: 0,
        name: "",
        supabase_user_id: "",
        surname: "",
      }))
    : students;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {studentsToRender.map((s, i) => {
        return (
          <StudentComponent
            skeleton={isLoading}
            student={s}
            key={i}
            pos={i + offset}
          />
        );
      })}
    </div>
  );
};

const exp = {
  RankingContainer,
  Padding,
  RankingList,
};

export default exp;
