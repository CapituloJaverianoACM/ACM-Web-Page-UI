import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from "@/components/shared/ui/card";
import { Contest, ContestMatchResult } from "@/models/contest.model";
import Countdown from "react-countdown";

export interface ContestFailedLoadProps {
  msg: ContestMatchResult;
  contest?: Contest;
}

export const ContestFailedLoad: React.FC<ContestFailedLoadProps> = ({
  msg,
  contest,
}) => {
  const t = useTranslations("League.contestFailed");
  const start = contest ? new Date(contest.start_hour) : null;

  const { data: now } = useQuery({
    queryKey: ["current-time"],
    queryFn: () => new Date(),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

  const isCompleted = start ? (now ?? new Date()) >= start : true;

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-white dark:bg-[#1a1a1a] border-0 shadow-2xl rounded-2xl overflow-hidden">
        {start && !isCompleted && (
          <CardTitle className="text-center pt-4">{t("beforeTitle")}</CardTitle>
        )}
        <CardHeader className="text-center pb-6 pt-8 text-base mb-2 text-(--azul-electrico) dark:text-blue-400">
          <div className="font-(family-name:--font-primary) text-5xl leading-tight dark:text-white">
            <Countdown date={start}>
              <div className="text-center pt-6 px-5">
                <h2 className="text-(--azul-electrico)">{t("startsSoon")}</h2>
              </div>
            </Countdown>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
