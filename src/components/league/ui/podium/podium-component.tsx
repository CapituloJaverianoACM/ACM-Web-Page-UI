import { Student } from "@/models/student.model"
import { IconCrown } from "@tabler/icons-react"
import { ReactNode } from "react"

const Container = (props: {
  steps_count: number,
  className?: string,
  steps: {
    order: number,
    children: ReactNode
  }[]
}) => {

  const { steps_count, className = "", steps } = props

  return <div className={`flex gap-3 h-full w-full items-end ${className}`}>
    {steps.map(step => {
      return <div style={{
        height: `${((((0.8) / steps_count) * (steps_count - step.order)) + 0.2) * 100}%`
      }} className="flex-grow" key={step.order}>
        {step.children}
      </div>
    })}
  </div>
}

const Step = (props: {
  className?: string,
  bg_color: string,
  student: {
    student: Student,
    order: number
  },
  showNumber?: boolean,
  showAvatar?: boolean,
  showUserInfo?: boolean,
  showCrown?: boolean
}) => {
  const {
    bg_color = "#000",
    className = "",
    student,
    showNumber = false,
    showAvatar = false,
    showUserInfo = false,
    showCrown = false
  } = props

  const val = 1 - (student.order * 0.045)

  return <div className="flex flex-col gap-2 w-full h-full relative transition hover:scale-105 cursor-pointer">
    <div style={{
      backdropFilter: `brightness(${val})`
    }} className={`flex flex-col items-center justify-center rounded-3xl flex-grow ${bg_color} ${className} shadow-md`}>
      <div className="h-[1.5rem] w-full"></div>

      {showNumber && <b className="text-6xl text-white">{student.order + 1}°</b>}

    </div>

    {
      showAvatar &&
      <div className="absolute -top-[2rem] lg:-top-[3.5rem] left-1/2 transform -translate-x-1/2 mx-auto rounded-full border-2 border-[--azul-niebla] bg-[--azul-niebla] h-[4rem] lg:h-[7rem] aspect-square overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={student.student.avatar?.length == 0 ? null : student.student.avatar} alt={`Avatar de ${student.student.name}`} className="w-full h-full object-cover" />
      </div>
    }

    {showCrown && <div className={`absolute z-10 -top-[3.5rem] lg:-top-[5.5rem] left-[40%] transform -translate-x-1/2 -rotate-12 lg:-rotate-[24deg] ${student.order == 0 ? 'text-yellow-500' : student.order == 1 ? 'text-neutral-300' : "text-amber-600"}`}>
      <IconCrown className="hidden lg:flex" size={65} />
      <IconCrown className="flex lg:hidden" size={45} />
    </div>}

    {
      showUserInfo && <div className="glassmorphic dark:glassmorphic-dark dark:text-white flex flex-col items-center justify-center p-2 text-center text-xs lg:text-base h-16 shadow">
        <p className="m-0" title={`${student.student.name} ${student.student.surname}`}>
          <b>{student.student.name}</b>
        </p>
        <p className="m-0 flex gap-1 items-center"> <IconCrown className="text-yellow-500" size={15} />{student.student.victory_count} <span className="hidden lg:flex">Victorias</span></p>
      </div>
    }
  </div >

}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Step,
  Container
}