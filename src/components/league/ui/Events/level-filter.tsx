import { Dispatch, SetStateAction } from "react";

export const LevelFilter = ({
  filter,
  setFilter,
}: {
  filter: "Initial" | "all" | "Advanced" | "Past";
  setFilter: Dispatch<SetStateAction<"Initial" | "all" | "Advanced" | "Past">>;
}) => {
  const texts = {
    Initial: "Inicial",
    all: "Todos",
    Advanced: "Avanzado",
    Past: "Pasados",
  };

  const LevelButton = ({ f }: { f: "Initial" | "all" | "Advanced" | "Past" }) => {
    return (
      <div
        onClick={() => setFilter(f)}
        className={`glassmorphic transition-all duration-300 ease-in-out select-none ${filter == f ? "shadow-md" : ""} px-2 p-1`}
      >
        <p className="m-0">{texts[f]}</p>
      </div>
    );
  };

  return (
    <div className="flex gap-2 items-center glassmorphic p-2">
      <LevelButton f={"all"} />
      <LevelButton f={"Initial"} />
      <LevelButton f={"Advanced"} />
      <LevelButton f={"Past"} />
    </div>
  );
};
