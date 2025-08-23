import RankingComponent from "../ui/ranking-component"

export const Ranking = () => {

  return <div>

    <RankingComponent.RankingContainer>
      <RankingComponent.Padding className="max-w-[65rem] mx-auto">
        <p className="text-lg font-semibold text-center">Ranking</p>
        <RankingComponent.RankingList student_number={20} />
      </RankingComponent.Padding>
    </RankingComponent.RankingContainer>

  </div>
}