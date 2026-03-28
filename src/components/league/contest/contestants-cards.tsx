import { Contestant } from "@/models/contestant.model";
import { ContestantDetails } from "./contestant-details";
import { useTranslations } from "next-intl";

export interface ContestantCardsProps {
  user: Contestant;
  oponent: Contestant | null;
}

export const ContestantsCards: React.FC<ContestantCardsProps> = ({
  user,
  oponent,
}) => {
  const t = useTranslations();

  console.log(oponent);
  const WAITING_OPONENT: Contestant = {
    id: 0,
    name: t("Match.waiting_oponent"),
    ready: false,
    victories: 0,
    avatar_url: process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL,
    codeforces_handle: "",
    matches_count: 0,
  };

  const other_user: Contestant = oponent ?? WAITING_OPONENT;

  const user_avatar =
    user.avatar_url || process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL;
  const opponent_avatar =
    oponent?.avatar_url || process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL;
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 w-full max-w-750">
      {/* Jugador Izquierda */}
      <ContestantDetails
        local_side={true}
        name={user.name}
        ready={user.ready}
        wins={user.victories}
        avatar_url={user_avatar}
        matches={user.matches_count}
      />

      {/* Divisor central */}
      <div className="text-2xl select-none bg-transparent ">
        <h1 className="italic text-black dark:text-white">vs</h1>
      </div>

      {/* Jugador Derecha */}
      <ContestantDetails
        local_side={false}
        name={other_user.name}
        ready={other_user.ready}
        wins={other_user.victories}
        avatar_url={opponent_avatar}
        matches={other_user.matches_count}
      />
    </div>
  );
};
