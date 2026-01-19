import { useTranslations } from "next-intl";
import PodiumContainer from "@/components/league/ui/podium/podium-component";
import { getPodiumStudents } from "@/controllers/student.controller";
import { LevelEnum } from "@/models/level.enum";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

/**
 * Muestra a los 3 mejores estudiantes de la liga
 * @param refresh_toggle es un booleano que se recibe desde el componente padre para saber cuando tiene que pedir los estudiantes
 */
export function Podium() {
  const t = useTranslations("League.podium");
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["podium-students"],
    queryFn: async () => {
      const response = await getPodiumStudents();
      return response.map((s, i) => ({
        student: s,
        order: i,
      }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const sortedStudents = useMemo(() => {
    let ss: typeof students = [];
    let d = false;

    // students is already ordered by rank (order 0, 1, 2...)
    // logic to visually arrange for podium: 2, 1, 3
    students.forEach((x) => {
      if (d) ss = [x, ...ss];
      else ss = [...ss, x];
      d = !d;
    });

    return ss;
  }, [students]);

  return (
    <div
      id="podium"
      className="flex flex-col gap-2 py-8 w-[90%] max-w-[100rem] mx-auto"
    >
      <div className="flex flex-col gap-2 lg:w-[80%] mx-auto">
        <h2 className="dark:text-white">{t("title")}</h2>
        <div className="w-full h-[20rem] lg:h-[30rem] max-w-full lg:max-w-[45rem] mx-auto mt-[4rem]">
          {isLoading ? (
            <PodiumContainer.Container
              steps={[{ order: 1 }, { order: 0 }, { order: 2 }].map((s) => ({
                order: s.order,
                children: (
                  <PodiumContainer.Step
                    showUserInfo
                    showNumber
                    bg_color="bg-[rgb(var(--azul-electrico-rgb)_/_1)] dark:bg-[rgb(var(--azul-electrico-rgb)_/_1)]"
                    className="border-[rgb(var(--azul-electrico-rgb)_/_0.2)] border-1"
                    student={{
                      order: s.order,
                      student: {
                        id: 0,
                        avatar: "",
                        level: LevelEnum.Advanced,
                        matches_count: 0,
                        name: "",
                        surname: "",
                        // ignorar
                        victory_count: 0,
                        supabase_user_id: "",
                      },
                    }}
                  ></PodiumContainer.Step>
                ),
              }))}
              steps_count={3}
            />
          ) : (
            <PodiumContainer.Container
              steps={sortedStudents.map((s) => ({
                order: s.order,
                children: (
                  <PodiumContainer.Step
                    showUserInfo
                    showCrown
                    showAvatar
                    showNumber
                    bg_color="bg-[rgb(var(--azul-electrico-rgb)_/_1)] dark:bg-[rgb(var(--azul-electrico-rgb)_/_1)]"
                    student={s}
                  ></PodiumContainer.Step>
                ),
              }))}
              steps_count={students.length}
            />
          )}
        </div>
      </div>
    </div>
  );
}
