import { Contestant } from "@/models/contestant.model";
import { useState } from "react";

export type SelectedCodeforcesProblem = {
  name: string;
  link: string;
};

const TEST_CODEFORCES_PROBLEM = {
  name: "Perfect Root",
  link: "https://codeforces.com/contest/2185/problem/A",
};

export type useContestResult = [
  boolean,
  Function,
  SelectedCodeforcesProblem | null,
];
export const useContestMatch = (
  contest_id: number,
  contestant: Contestant | undefined,
): useContestResult => {
  const [user_ready, setUserReady] = useState<boolean>(false);
  const [codeforces_problem, setCodeforcesProblem] =
    useState<SelectedCodeforcesProblem | null>(null);

  const toggleUserReady = () => {
    setUserReady((prev) => !prev);
  };
  console.log("USE CONTEST MATCH" + contestant);
  return [user_ready, toggleUserReady, codeforces_problem];
};
