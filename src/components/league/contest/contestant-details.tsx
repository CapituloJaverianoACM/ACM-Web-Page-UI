import { useTranslations } from "next-intl";
import { ReactNode } from "react";

export interface ContestantDetailsProps {
  local_side: boolean;
  name: string;
  ready: boolean;
  wins: number;
  avatar_url: string;
  matches: number;
}

export const ContestantDetails: React.FC<ContestantDetailsProps> = ({
  local_side,
  name,
  ready,
  wins,
  avatar_url,
  matches,
}) => {
  const t = useTranslations();
  const readyText = ready ? t("Match.ready") : t("Match.not_ready");
  const win_ratio: string = ((wins / (matches === 0 ? 1 : matches)) * 100).toFixed(2);

  const AvatarImage: ReactNode = (
    <div className="w-14 h-14 rounded-full bg-linear-to-br from-white/30 to-transparent border border-white/40 shadow-inner">
      <img
        src={avatar_url}
        alt={"Avatar"}
        className="object-cover w-full h-full block rounded-full"
      />
    </div>
  );

  return (
    <div
      className={`flex items-center ${!local_side ? "justify-end" : ""} gap-4 p-5  border border-white/20 rounded-2xl shadow-lg`}
      style={{
        background: `radial-gradient(circle at ${local_side ? "170% 35%" : "-10% 35%"
          }, ${local_side ? "var(--color-green-500)" : "var(--color-red-400)"}, transparent)`,
      }}
    >
      {local_side && AvatarImage}
      <div
        className={`flex flex-col ${!local_side ? "justify-end items-end" : ""}`}
      >
        <h2 className="mb-0 font-bold text-lg tracking-tight text-black dark:text-white uppercase">
          {name}
        </h2>
        <div className="flex gap-2 items-center">
          {local_side && (
            <span
              className={`w-2 h-2 ${ready ? `bg-green-400` : "bg-red-400"} rounded-full animate-pulse`}
            />
          )}
          <span
            className={`${ready ? "text-green-400" : "text-red-400"} text-xs font-bold uppercase tracking-tighter`}
          >
            {readyText}
          </span>
          {!local_side && (
            <span
              className={`w-2 h-2 ${ready ? `bg-green-400` : "bg-red-400"} rounded-full animate-pulse`}
            />
          )}
        </div>
        <p className="text-black/50 dark:text-white/50 text-xs mt-1 mb-0">
          {win_ratio}% {t("Match.wins")}
        </p>
      </div>

      {!local_side && AvatarImage}
    </div>
  );
};
