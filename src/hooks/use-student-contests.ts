import { useState, useEffect, useMemo } from "react";
import { Contest } from "@/models/contest.model";
import { getContestsByStudentId } from "@/controllers/contest.controller";

export const useStudentContests = (studentId: string | number | undefined) => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loadingContests, setLoadingContests] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoadingContests(true);
        if (studentId) {
          const fetchedContests = await getContestsByStudentId(
            Number(studentId),
          );
          setContests(fetchedContests || []);
        } else {
          setContests([]);
        }
      } catch (error) {
        console.error("Error al cargar contests:", error);
        setContests([]);
      } finally {
        setLoadingContests(false);
      }
    };

    if (studentId) {
      fetchContests();
    } else {
      setContests([]);
      setLoadingContests(false);
    }
  }, [studentId]);

  const sortedContests = useMemo(() => {
    return [...contests].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [contests]);

  return { contests: sortedContests, loadingContests };
};
