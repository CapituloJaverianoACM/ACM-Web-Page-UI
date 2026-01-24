import { useQuery } from "@tanstack/react-query";
import { getContestsByStudentId } from "@/controllers/contest.controller";

export const useStudentContests = (studentId: string | number | undefined) => {
  const { data: contests = [], isLoading: loadingContests } = useQuery({
    queryKey: ["contests", studentId],
    queryFn: async () => {
      if (!studentId) return [];
      const fetchedContests = await getContestsByStudentId(Number(studentId));
      return fetchedContests || [];
    },
    enabled: !!studentId,
  });

  const sortedContests = contests.sort(
    (a, b) => new Date(b.start_hour).getTime() - new Date(a.start_hour).getTime(),
  );

  return { contests: sortedContests, loadingContests };
};
