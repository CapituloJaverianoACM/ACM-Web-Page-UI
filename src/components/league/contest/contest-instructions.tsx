import { useTranslations } from "next-intl";

export const ContestInstructions: React.FC = () => {
  const t = useTranslations();
  const INSTRUCTIONS: string[] = t.raw("Match.instructions") as string[];
  return (
    <div className="w-full max-w-750 grow p-10 bg-white/20 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl flex flex-col justify-between">
      <div>
        <h2 className="text-4xl font-extralight text-white italic mb-6 tracking-tight">
          {t("Match.title")}
        </h2>
        <div className="space-y-4 max-w-2xl">
          {INSTRUCTIONS.map((instruction, i) => (
            <p
              key={i}
              className="text-white text-lg leading-relaxed border-l-2 border-white/50 pl-4"
            >
              {instruction}
            </p>
          ))}
        </div>
      </div>

      <button className="w-fit mt-10 px-12 py-3 bg-green-500/30 hover:bg-green-500/40 border border-green-400/40 text-green-300 rounded-xl transition-all duration-300 font-bold tracking-widest hover:scale-105 active:scale-95 uppercase text-sm">
        {t("Match.ready")}
      </button>
    </div>
  );
};
