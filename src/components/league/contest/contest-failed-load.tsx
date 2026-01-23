import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { ContestMatchResult } from "@/models/contest.model";

export interface ContestFailedLoadProps {
  msg: ContestMatchResult;
}

export const ContestFailedLoad: React.FC<ContestFailedLoadProps> = ({
  msg,
}) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-white dark:bg-[#1a1a1a] border-0 shadow-2xl rounded-2xl overflow-hidden">
        {/* Barra superior con gradiente */}

        <CardHeader className="text-center pb-6 pt-8">
          <CardTitle className="text-3xl font-(family-name:--font-primary) dark:text-white mb-1">
            Lo sentimos :(
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8">
          <p className="text-center">{msg}</p>
        </CardContent>
      </Card>
    </div>
  );
};
