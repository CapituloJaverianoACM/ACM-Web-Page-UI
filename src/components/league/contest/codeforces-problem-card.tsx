import { SelectedCodeforcesProblem } from "@/hooks/use-contest-match";
import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";

interface CodeforcesProblemCardProps {
  problem: SelectedCodeforcesProblem | null;
}

export function CodeforcesProblemCard({ problem }: CodeforcesProblemCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-transparent max-w-md">
      {/* Codeforces Logo SVG */}

      {/* Problem Name */}
      <h2 className="text-3xl text-black dark:text-white text-center">
        {problem ? problem.name : "Waiting problem..."}
      </h2>
    </div>
  );
}
