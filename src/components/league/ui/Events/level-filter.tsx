import { Dispatch, SetStateAction } from "react"

export const LevelFilter = ({
  filter,
  setFilter
}: {
  filter: "initial" | "all" | "advanced",
  setFilter: Dispatch<SetStateAction<"initial" | "all" | "advanced">>
}) => {

  const texts = {
    "initial": "Inicial",
    "all": "Todos",
    "advanced": "Avanzado"
  }

  const LevelButton = ({ f }: { f: "initial" | "all" | "advanced" }) => {
    return <div onClick={() => setFilter(f)} className={`glassmorphic transition-all duration-300 ease-in-out select-none ${filter == f ? "shadow-md" : ""} px-2 p-1`}>
      <p className="m-0">{texts[f]}</p>
    </div>
  }


  return <div className="flex gap-2 items-center glassmorphic p-2">
    <LevelButton f={"all"} />
    <LevelButton f={"initial"} />
    <LevelButton f={"advanced"} />
  </div>

}