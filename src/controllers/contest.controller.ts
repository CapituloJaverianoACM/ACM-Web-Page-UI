"use server";
import { Contest, ContestMatchResult } from "@/models/contest.model";
import { Participation } from "@/models/partipation.model";
import { MatchmakingTreeNode } from "@/models/matchmaking.model";
import {
  getParticipationByContestId,
  getParticipationsByStudentId,
  getParticipationsBySupabaseStudentId,
} from "./participation.controller";

import { User } from "@supabase/supabase-js";
import { Student } from "@/models/student.model";
import { queryStudentsByBulkIds } from "./student.controller";
import { BACKEND_URL } from "@/config/env";
import { Contestant } from "@/models/contestant.model";
import {
  getAccessToken,
  getUser,
  getUserTableFromSupabaseId,
} from "./supabase.controller";
import { StandardAPIResponse } from "@/models/api.model";

export async function getContests(): Promise<Contest[]> {
  const res = await fetch(new URL(`/contests`, BACKEND_URL));

  if (!res.ok) {
    throw new Error("Error al obtener contests");
  }

  const json = await res.json();
  return json.data;
}

export async function getContestById(id: number): Promise<Contest> {
  const res = await fetch(new URL(`/contests/${id}`, BACKEND_URL));

  if (!res.ok) {
    throw new Error("Error al obtener el contest");
  }

  const json = await res.json();
  return json.data;
}

export async function getContestsWithPictures(
  user: User | null,
): Promise<Contest[]> {
  const res = await fetch(new URL(`/contests?picture=1`, BACKEND_URL));

  if (!res.ok) {
    console.log(await res.json());
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
    new URL(`/contests/bulk-query/id`, BACKEND_URL),
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
      new URL(`/matchmaking/tree/${contestId}`, BACKEND_URL!),
      { cache: "no-store" },
    );
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Error al obtener matchmaking tree");
    }

    const json = await res.json();
    const tree: MatchmakingTreeNode | null =
      json.data?.tree ?? json.data ?? null;
    return tree;
  } catch (error) {
    console.error("Error al obtener matchmaking tree:", error);
    return null;
  }
}

export type TreeStudentInfo = Pick<
  Student,
  "id" | "name" | "avatar" | "codeforces_handle"
>;

export type ContestMatchInfo = {
  ok: boolean;
  msg: ContestMatchResult;
  contest?: Contest;
  students?: Array<TreeStudentInfo>;
  current_student?: Contestant;
};

export const getContestMatchInfo = async (
  contestId: number,
  user_in_tree: boolean = true,
): Promise<ContestMatchInfo> => {
  let result: ContestMatchInfo = { ok: false, msg: ContestMatchResult.EMPTY };

  try {
    const supabase_user = await getUser();

    if (!supabase_user) {
      result.msg = ContestMatchResult.NO_LOGGED;
      throw ContestMatchResult.NO_LOGGED;
    }

    const user: Student | null = await getUserTableFromSupabaseId(
      supabase_user.id,
    );

    if (!user) return result;

    const current_student: Contestant = {
      id: user.id,
      name: user.name,
      victories: user.victory_count,
      avatar_url: user.avatar,
      codeforces_handle: user.codeforces_handle,
      matches_count: user.matches_count,
    };

    const contest: Contest = await getContestById(contestId);

    const participants_id = (await getParticipationByContestId(contestId)).map(
      (p) => p.student_id,
    );

    if (participants_id.length == 0) {
      result.msg = ContestMatchResult.NO_USERS;
      throw ContestMatchResult.NO_USERS;
    }

    if (
      participants_id.find((p) => p === current_student.id) == undefined &&
      user_in_tree
    ) {
      result.msg = ContestMatchResult.NO_PARTICIPANT;
      throw ContestMatchResult.NO_PARTICIPANT;
    }

    const students: Array<TreeStudentInfo> = (
      await queryStudentsByBulkIds(participants_id)
    ).map(({ id, name, avatar, codeforces_handle }) => ({
      id,
      name,
      avatar,
      codeforces_handle,
    }));

    result.ok = true;
    result.msg = ContestMatchResult.OK;

    result = { ...result, contest, students, current_student };
  } catch (e) {
    console.log(e);
  }

  return result;
};

export type ContestResultStudent = Student & {
  position: number;
};

export type ContestResults = {
  ok: boolean;
  contest?: Contest;
  students?: ContestResultStudent[];
  userPosition?: number;
  userStudentId?: number;
};

export const getContestResults = async (
  contestId: number,
  userId?: number,
): Promise<ContestResults> => {
  try {
    const contest: Contest = await getContestById(contestId);
    const participations = await getParticipationByContestId(contestId);

    // Filtrar participaciones que tengan posición asignada
    const participationsWithPosition = participations.filter(
      (p) => p.position !== null && p.position !== undefined,
    );

    if (participationsWithPosition.length === 0) {
      return { ok: false };
    }

    // Ordenar por posición
    participationsWithPosition.sort((a, b) => a.position - b.position);

    const studentIds = participationsWithPosition.map((p) => p.student_id);
    const students = await queryStudentsByBulkIds(studentIds);

    // Combinar estudiantes con sus posiciones
    const studentsWithPosition: ContestResultStudent[] =
      participationsWithPosition.map((participation) => {
        const student = students.find((s) => s.id === participation.student_id);
        if (!student) {
          throw new Error(
            `Estudiante con id ${participation.student_id} no encontrado`,
          );
        }
        return {
          ...student,
          position: participation.position,
        };
      });

    // Obtener posición del usuario si está logueado
    let userPosition: number | undefined;
    if (userId) {
      const userParticipation = participations.find(
        (p) => p.student_id === userId,
      );
      userPosition = userParticipation?.position ?? undefined;
    }

    return {
      ok: true,
      contest,
      students: studentsWithPosition,
      userPosition,
      userStudentId: userId,
    };
  } catch (e) {
    console.error("Error al obtener resultados del contest:", e);
    return { ok: false };
  }
};

export const getOpponent = async (
  contest_id: number,
  student_id: number,
): Promise<Contestant | null> => {
  if (!student_id) return null;
  try {
    const token = await getAccessToken();

    const res = await fetch(
      new URL(
        `/matchmaking/opponent/${contest_id}/${student_id}`,
        BACKEND_URL!,
      ),
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    const api_res: StandardAPIResponse = await res.json();
    if (api_res.error) throw api_res.error;

    const student = api_res.data[0] as Student;

    const contestant: Contestant = {
      id: student.id,
      name: student.name,
      victories: student.victory_count,
      avatar_url: student.avatar,
      codeforces_handle: student.codeforces_handle,
      matches_count: student.matches_count,
      ready: false,
    };

    return contestant;
  } catch (e) {
    console.log(e);
    return null;
  }
};
