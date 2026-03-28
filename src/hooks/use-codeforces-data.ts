import { useQuery } from "@tanstack/react-query";

export interface CodeforcesUser {
  handle: string;
  rating?: number;
  titlePhoto: string;
}

export const useCodeforcesData = (memberHandles: string[]) => {
  const { data, isLoading } = useQuery({
    queryKey: ["codeforces", memberHandles],
    queryFn: async () => {
      const response = await fetch(
        `https://codeforces.com/api/user.info?checkHistoricHandles=false&handles=${memberHandles.join(";")}`,
        {
          cache: "no-store",
        },
      );
      const responseData = await response.json();

      if (responseData.status === "OK" && Array.isArray(responseData.result)) {
        const membersData = responseData.result
          .sort(
            (a: CodeforcesUser, b: CodeforcesUser) =>
              (b.rating || 0) - (a.rating || 0),
          )
          .map((user: CodeforcesUser) => ({
            title: `${user.handle} - (Rating: ${user.rating})`,
            src: user.titlePhoto,
            handle: user.handle,
          }));

        return {
          members: membersData,
          loading: false,
        };
      }
      return { members: [], loading: false };
    },
  });

  return (
    data || {
      members: [],
      loading: isLoading,
    }
  );
};
