"use server";
import { Contest } from "@/models/contest.model";
import { Participation } from "@/models/partipation.model";
import { MatchmakingTreeNode } from "@/models/matchmaking.model";
import {
  getParticipationsByStudentId,
  getParticipationsBySupabaseStudentId,
} from "./participation.controller";

import { User } from "@supabase/supabase-js";

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

export async function getContestById(id: number): Promise<Contest> {
  const res = await fetch(
    new URL(`/contests/${id}`, process.env.NEXT_PUBLIC_BACKEND_URL),
  );

  if (!res.ok) {
    throw new Error("Error al obtener el contest");
  }

  const json = await res.json();
  return json.data;
}

export async function getContestsWithPictures(
  user: User | null,
): Promise<Contest[]> {
  const res = await fetch(
    new URL(`/contests?picture=1`, process.env.NEXT_PUBLIC_BACKEND_URL),
  );

  if (!res.ok) {
    throw new Error("Error al obtener contests");
  }

  const json = await res.json();

  const contests: Contest[] = json.data;

  if (!user) return contests;

  const user_participations = await getParticipationsBySupabaseStudentId(user);

  return await Promise.all(
    contests.map(async (contest) => {
      const participation: Participation | undefined = user_participations.find(
        (participation) => participation.contest_id == contest.id,
      );
      contest.registered = participation != undefined;
      contest.checkin = contest.registered && participation.checkin;

      return contest;
    }),
  );
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
    throw new Error("Error al obtener contests: " + error.message);
  }
}

export async function getMatchmakingTree(
  contestId: number,
): Promise<MatchmakingTreeNode | null> {
  try {
    const res = await fetch(
      new URL(
        `/matchmaking/tree/${contestId}`,
        process.env.NEXT_PUBLIC_BACKEND_URL_DEV,
      ),
      { cache: "no-store" },
    );
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Error al obtener matchmaking tree");
    }

    const json = await res.json();
    console.log("La data es: " + json.data + " xd.");
    const tree: MatchmakingTreeNode | null =
      json.data?.tree ?? json.data ?? null;
    return tree;
  } catch (error) {
    console.error("Error al obtener matchmaking tree:", error);
    return null;
  }
}
