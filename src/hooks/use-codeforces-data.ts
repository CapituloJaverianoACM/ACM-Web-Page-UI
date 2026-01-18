import { useState, useEffect } from "react";

export interface CodeforcesUser {
  handle: string;
  rating?: number;
  titlePhoto: string;
}

export interface CPData {
  members: { title: string; src: string }[];
  coaches: { title: string; src: string }[];
  loading: boolean;
}

export const useCodeforcesData = (
  memberHandles: string[],
  coachHandle: string = "sandoval95",
) => {
  const [data, setData] = useState<CPData>({
    members: [],
    coaches: [],
    loading: true,
  });

  useEffect(() => {
    fetch(
      `https://codeforces.com/api/user.info?checkHistoricHandles=false&handles=${memberHandles.join(";")}`,
      {
        cache: "no-store",
      },
    )
      .then((response) => response.json())
      .then((responseData) => {
        if (
          responseData.status === "OK" &&
          Array.isArray(responseData.result)
        ) {
          // Separar los coaches de los miembros
          const membersData = responseData.result
            .filter((user: CodeforcesUser) => user.handle !== coachHandle)
            .sort(
              (a: CodeforcesUser, b: CodeforcesUser) =>
                (b.rating || 0) - (a.rating || 0),
            )
            .map((user: CodeforcesUser) => ({
              title: `${user.handle} - (Rating: ${user.rating})`,
              src: user.titlePhoto,
            }));

          const coachData = responseData.result
            .filter((user: CodeforcesUser) => user.handle === coachHandle)
            .map((user: CodeforcesUser) => ({
              title: `${user.handle} - Coach`,
              src: user.titlePhoto,
            }));

          setData({
            members: membersData,
            coaches: coachData,
            loading: false,
          });
        } else {
          setData((prev) => ({ ...prev, loading: false }));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData((prev) => ({ ...prev, loading: false }));
      });
  }, [memberHandles, coachHandle]);

  return data;
};
