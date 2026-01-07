import PodiumContainer from "@/components/league/ui/podium/podium-component";
import { getPodiumStudents } from "@/controllers/student.controller";
import { LevelEnum } from "@/models/level.enum";
import { Student } from "@/models/student.model";
import { useEffect, useState } from "react";

export function Podium() {
  const [loading, setloading] = useState<boolean>(true);

  const [students, setStudents] = useState<
    {
      student: Student;
      order: number;
    }[]
  >([]);
  const [sortedStudents, setSortedStudents] = useState<
    {
      student: Student;
      order: number;
    }[]
  >([]);

  const handlerGetPodiumStudents = async () => {
    try {
      const response = await getPodiumStudents();

      setStudents(
        response.map((s, i) => ({
          student: s,
          order: i,
        })),
      );
    } catch {
      return;
    }
  };

  useEffect(() => {
    handlerGetPodiumStudents();
    setloading(false);
  }, []);

  useEffect(() => {
    setSortedStudents(() => {
      let ss = [];
      let d = false;

      students
        .toSorted((a, b) => a.order - b.order)
        .forEach((x) => {
          if (d) ss = [x, ...ss];
          else ss = [...ss, x];

          d = !d;
        });

      return ss;
    });
  }, [students]);

  return (
    <div
      id="podium"
      className="flex flex-col gap-2 py-8 w-[90%] max-w-[100rem] mx-auto"
    >
      <div className="flex flex-col gap-2 lg:w-[80%] mx-auto">
        <h2 className="dark:text-white">Mejores 3 de la liga</h2>
        <div className="w-full h-[20rem] lg:h-[30rem] max-w-full lg:max-w-[45rem] mx-auto mt-[4rem]">
          {loading ? (
            <PodiumContainer.Container
              steps={[{ order: 1 }, { order: 0 }, { order: 2 }].map((s) => ({
                order: s.order,
                children: (
                  <PodiumContainer.Step
                    showUserInfo
                    showNumber
                    bg_color="bg-[rgb(var(--azul-electrico-rgb)_/_0.2)] dark:bg-[rgb(var(--azul-electrico-rgb)_/_0.5)]"
                    className="border-[rgb(var(--azul-electrico-rgb)_/_0.2)] border-1"
                    student={{
                      order: s.order,
                      student: {
                        id: "0",
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
                    bg_color="bg-[rgb(var(--azul-electrico-rgb)_/_0.2)] dark:bg-[rgb(var(--azul-electrico-rgb)_/_0.5)]"
                    className="border-[rgb(var(--azul-electrico-rgb)_/_0.2)] border-1"
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
