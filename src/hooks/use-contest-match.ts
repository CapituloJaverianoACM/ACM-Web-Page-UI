import { Contestant } from "@/models/contestant.model";

export const useContestMatch = (
  contest_id: number,
  contestant: Contestant | undefined,
) => {
  console.log("USE CONTEST MATCH" + contestant);
  return [true];
};
