import { BlueLine } from "@/components/shared/ui/blue-line";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { ContestMatchInfo } from "@/controllers/contest.controller";

export interface ContestFailedLoadProps {
  data: ContestMatchInfo;
}

export const ContestFailedLoad: React.FC<ContestFailedLoadProps> = ({
  data,
}) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-white dark:bg-[#1a1a1a] border-0 shadow-2xl rounded-2xl overflow-hidden">
        {/* Barra superior con gradiente */}
        <BlueLine />

        <CardHeader className="text-center pb-6 pt-8">
          <CardTitle className="text-3xl font-bold text-red-500 dark:text-white mb-3">
            Lo sentimos :(
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8">
          <h3 className="text-center">{data.msg}</h3>
        </CardContent>
      </Card>
    </div>
  );
};
