import { Dispatch, SetStateAction } from "react"

export const LevelFilter = ({
  filter,
  setFilter
}: {
  filter: "Initial" | "all" | "Advanced",
  setFilter: Dispatch<SetStateAction<"Initial" | "all" | "Advanced">>
}) => {

  const texts = {
    "Initial": "Inicial",
    "all": "Todos",
    "Advanced": "Avanzado"
  }

  const LevelButton = ({ f }: { f: "Initial" | "all" | "Advanced" }) => {
    return <div onClick={() => setFilter(f)} className={`glassmorphic transition-all duration-300 ease-in-out select-none ${filter == f ? "shadow-md" : ""} px-2 p-1`}>
      <p className="m-0">{texts[f]}</p>
    </div>
  }


  return <div className="flex gap-2 items-center glassmorphic p-2">
    <LevelButton f={"all"} />
    <LevelButton f={"Initial"} />
    <LevelButton f={"Advanced"} />
  </div>

}