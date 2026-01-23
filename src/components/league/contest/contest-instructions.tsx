import { SelectedCodeforcesProblem } from "@/hooks/use-contest-match";
import { useTranslations } from "next-intl";
import { CodeforcesProblemCard } from "./codeforces-problem-card";
import { VerticalSeparator } from "@/components/shared/ui/vertical-separator";
import Image from "next/image";
import { IconExternalLink } from "@tabler/icons-react";

export interface ContestInstructionsProps {
  ready: boolean;
  codeforces_problem: SelectedCodeforcesProblem | null;
  toggleReady: Function;
}

export const ContestInstructions: React.FC<ContestInstructionsProps> = ({
  ready,
  codeforces_problem,
  toggleReady,
}) => {
  const t = useTranslations();
  const INSTRUCTIONS: string[] = t.raw("Match.instructions") as string[];
  return (
    <div className="w-full max-w-750 grow p-10 bg-white/20 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl flex justify-around items-center">
      <div className="flex flex-col">
        <div>
          <h2 className="text-4xl font-extralight text-black dark:text-white italic mb-6 tracking-tight">
            {t("Match.title")}
          </h2>
          <div className="flex items-center">
            <VerticalSeparator color="(--azul-electrico)" />
            <div className="space-y-0">
              {INSTRUCTIONS.map((instruction, i) => (
                <p
                  key={i}
                  className="text-black dark:text-white text-lg font-normal leading-relaxed  border-black/50 dark:border-white/50 pl-4 pt-2.5"
                >
                  <span className="font-bold p-1">
                    {i + 1}
                    {". "}
                  </span>
                  {instruction}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 mt-5">
          <button
            className={`w-fit px-12 py-3 border ${!ready ? "bg-green-500 hover:bg-green-500/80 border-green-400/40" : "bg-red-500 hover:bg-red-500 border-red-400"} text-white rounded-xl transition-all duration-300 font-bold tracking-widest hover:scale-105 active:scale-95 uppercase text-sm disabled:opacity-50`}
            disabled={codeforces_problem != null}
            onClick={() => toggleReady()}
          >
            {t(!ready ? "Match.ready" : "Match.not_ready")}
          </button>
          <button
            className={`w-fit px-12 py-3 border bg-yellow-500 hover:bg-yellow-500/90 border-yellow-400/40 text-white rounded-xl transition-all duration-300 font-bold tracking-widest hover:scale-105 active:scale-95 uppercase text-sm disabled:opacity-50`}
            disabled={codeforces_problem === null}
            onClick={(e) => {
              const btn = e.target as HTMLButtonElement;
              if (btn.disabled) return;
              btn.disabled = true;

              setTimeout(() => {
                if (btn.disabled) btn.disabled = false;
              }, 5000);
            }}
          >
            {t("Match.check")}
          </button>
          {codeforces_problem && (
            <button
              className={`w-fit  px-12 py-3 border bg-(--azul-electrico)/80 hover:bg-(--azul-electrico)/90 border-(--azul-electrico)/40 text-white rounded-xl transition-all duration-300 font-bold tracking-widest hover:scale-105 active:scale-95 uppercase text-sm disabled:opacity-50`}
              onClick={() => {
                window.open(codeforces_problem.link);
              }}
            >
              <div className="flex gap-4 items-center">
                <Image
                  src={"/Codeforces.svg"}
                  alt={""}
                  width={20}
                  height={20}
                />
                {codeforces_problem.name}
                <IconExternalLink />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
