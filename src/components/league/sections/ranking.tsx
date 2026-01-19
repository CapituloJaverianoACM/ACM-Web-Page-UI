import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import RankingComponent from "../ui/ranking-component";
import { Podium } from "./podium";
import { createClient } from "@/lib/supabase/client";
import { suscribe_leaderboard } from "@/lib/supabase/channel_subscribe";

export const Ranking = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = createClient();
    const channel = suscribe_leaderboard(supabase, () => {
      queryClient.invalidateQueries({ queryKey: ["podium-students"] });
      queryClient.invalidateQueries({ queryKey: ["ranking-students"] });
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return (
    <div>
      <div className="mt-[-9vh]">
        <h1 className="text-center text-6xl">Ranking global</h1>
      </div>
      <Podium />
      <RankingComponent.RankingContainer>
        <RankingComponent.Padding className="max-w-[65rem] mx-auto">
          <p className="text-lg font-semibold text-center">Ranking</p>
          <RankingComponent.RankingList student_number={5} offset={3} />
        </RankingComponent.Padding>
      </RankingComponent.RankingContainer>
    </div>
  );
};
