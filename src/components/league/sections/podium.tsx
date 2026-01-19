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
      className="flex flex-col gap-2 py-8 w-[90%] max-w-400 mx-auto"
    >
      <div className="flex flex-col gap-2 lg:w-[80%] mx-auto">
        <h2 className="dark:text-white">Mejores 3 de la liga</h2>
        <div className="w-full h-80 lg:h-120 max-w-full lg:max-w-180 mx-auto mt-16">
          {isLoading ? (
            <PodiumContainer.Container
              steps={[{ order: 1 }, { order: 0 }, { order: 2 }].map((s) => ({
                order: s.order,
                children: (
                  <PodiumContainer.Step
                    showUserInfo
                    showNumber
                    bg_color="bg-[rgb(var(--azul-electrico-rgb)/1)] dark:bg-[rgb(var(--azul-electrico-rgb)/1)]"
                    className="border-[rgb(var(--azul-electrico-rgb)/0.2)] border"
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
                    bg_color="bg-[rgb(var(--azul-electrico-rgb)/1)] dark:bg-[rgb(var(--azul-electrico-rgb)/1)]"
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
