import RankingComponent from "../ui/ranking-component";
import { Podium } from "./podium";

export const Ranking = () => {
  return (
    <div>
      <Podium />
      <RankingComponent.RankingContainer>
        <RankingComponent.Padding className="max-w-[65rem] mx-auto">
          <p className="text-lg font-semibold text-center">Ranking</p>
          <RankingComponent.RankingList student_number={5} offset={2} />
        </RankingComponent.Padding>
      </RankingComponent.RankingContainer>
    </div>
  );
};
