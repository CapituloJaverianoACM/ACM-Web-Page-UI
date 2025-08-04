import PodiumContainer from "@/components/league/ui/podium/podium-component"
import { Student } from "@/models/student.model"

export function Podium(props: {
  students: ({
    student: Student,
    order: number
  })[]
}) {
  const { students = [] } = props
  const sortedStudents = (() => {
    let ss = []
    let d = false;

    students.toSorted((a, b) => a.order - b.order).forEach(x => {
      if (d) ss = [x, ...ss]
      else ss = [...ss, x]

      d = !d;
    })

    return ss
  })();

  return <div id="podium" className="flex flex-col gap-2 py-8 w-[90%] max-w-[100rem] mx-auto">
    <div className="flex flex-col gap-2 lg:w-[80%] mx-auto">
      <h2 className="dark:text-white">Mejores 3 de la liga</h2>
      <div className="w-full h-[20rem] lg:h-[30rem] max-w-full lg:max-w-[45rem] mx-auto mt-[4rem]">
        <PodiumContainer.Container steps={
          sortedStudents.map(s => ({
            order: s.order,
            children: <PodiumContainer.Step showUserInfo showCrown showAvatar showNumber bg_color="bg-[rgb(var(--azul-electrico-rgb)_/_0.2)] dark:bg-[rgb(var(--azul-electrico-rgb)_/_0.5)]" className="border-[rgb(var(--azul-electrico-rgb)_/_0.2)] border-1" student={s} >

            </PodiumContainer.Step>
          }))
        } steps_count={students.length} />
      </div>
    </div>
  </div>
}