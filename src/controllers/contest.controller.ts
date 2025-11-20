import { Contest } from "@/models/contest.model";
import { Participation } from "@/models/partipation.model";
import { getParticipationsByStudentId } from "./participation.controller";

export async function getContests(): Promise<Contest[]> {
  const res = await fetch(
    new URL(`/contests`, process.env.NEXT_PUBLIC_BACKEND_URL),
  );

  if (!res.ok) {
    throw new Error("Error al obtener contests");
  }

  const json = await res.json();
  return json.data;
}

export async function getContestsWithPictures(): Promise<
  (Contest & {
    picture: {
      link: string;
    };
  })[]
> {
  const res = await fetch(
    new URL(`/contests?picture=1`, process.env.NEXT_PUBLIC_BACKEND_URL),
  );

  if (!res.ok) {
    throw new Error("Error al obtener contests");
  }

  const json = await res.json();
  return json.data;
}

export async function getContestByIds(
  contestIds: number[],
): Promise<Contest[]> {
  const resContests = await fetch(
    new URL(`/contests/bulk-query/id`, process.env.NEXT_PUBLIC_BACKEND_URL),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: contestIds }),
    },
  );

  if (!resContests.ok) {
    throw new Error("Error al obtener contests");
  }
  const jsonContests = await resContests.json();
  return jsonContests.data;
}

export async function getContestsByStudentId(
  studentId: number,
): Promise<Contest[]> {
  try {
    const participations = await getParticipationsByStudentId(studentId);

    if (!participations || participations.length === 0) {
      return [];
    }

    const contestsIds = participations.map(
      (participation: Participation) => participation.contest_id,
    );

    if (!contestsIds || contestsIds.length === 0) {
      return [];
    }

    return await getContestByIds(contestsIds);
  } catch (error) {
    return [];
  }
}
