import { Contest } from "@/models/contest.model";
import { Participation } from "@/models/partipation.model";
import { User } from "@supabase/supabase-js";
import {
  getAccessToken,
  getUser,
  getUserTableFromSupabaseId,
} from "./supabase.controller";
import { Student } from "@/models/student.model";

export async function getParticipationByContestId(
  contest_id: number,
): Promise<Participation[]> {
  try {
    const res = await fetch(
      new URL(
        `/participation/contest/${contest_id}`,
        process.env.NEXT_PUBLIC_BACKEND_URL,
      ),
    );
    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getParticipationsByStudentId(
  studentId: number,
): Promise<Participation[]> {
  try {
    const res = await fetch(
      new URL(
        `/participation/student/${studentId}`,
        process.env.NEXT_PUBLIC_BACKEND_URL,
      ),
    );

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    throw new Error("Error al obtener participaciones: " + error.message);
  }
}

export const getParticipationsBySupabaseStudentId = async (
  user: User,
): Promise<Participation[]> => {
  const supabase_user = await getUserTableFromSupabaseId(user.id);

  if (!supabase_user) return [];

  return await getParticipationsByStudentId(supabase_user.id);
};

export enum RegisterContestResult {
  OK = "Registrado exitosamente.",
  NO_USER = "Debes loggearte primero.",
  NO_CODEFORCES_HANDLE = "No tienes el handle de codeforces configurado, ¡configuralo!",
  ALREADY_REGISTERED = "Ya estas registrado a este contest.",
  LEVEL_MISMATCH = "Tu nivel no coincide con el del contest.",
  SUPABASE_ERROR = "Algo salió mal de nuestro lado.",
}

export const registerUserToContest = async (
  user_metadata: User | null,
  contest: Contest,
): Promise<{ ok: boolean; msg: RegisterContestResult }> => {
  const result = { ok: false, msg: RegisterContestResult.SUPABASE_ERROR };
  if (!user_metadata) {
    result.msg = RegisterContestResult.NO_USER;
    return result;
  }

  const user = await getUserTableFromSupabaseId(user_metadata.id);

  if (user.level != contest.level) {
    result.msg = RegisterContestResult.LEVEL_MISMATCH;
    return result;
  }

  if (!user.codeforces_handle) {
    result.msg = RegisterContestResult.NO_CODEFORCES_HANDLE;
    return result;
  }

  const participations: Participation[] = (
    await getParticipationsByStudentId(user.id)
  ).filter((participation) => participation.contest_id == contest.id);

  if (participations.length != 0) {
    result.msg = RegisterContestResult.ALREADY_REGISTERED;
    return result;
  }

  const participation_record = {
    contest_id: contest.id,
    student_id: user.id,
    position: null,
    checkin: false,
  };

  const token = await getAccessToken();
  try {
    const res = await fetch(
      new URL(`/participation/create`, process.env.NEXT_PUBLIC_BACKEND_URL),
      {
        method: "POST",
        body: JSON.stringify(participation_record),
        headers: {
          authorization: `Bearer ${token}`,
          "acm-auth-signed-supabase": "",
          "content-type": "application/json",
        },
      },
    );

    if (!res.ok) throw new Error("Sucedió algo en la API");

    const res_json = await res.json();
    if (res_json.error) throw res_json.error;

    result.ok = true;
    result.msg = RegisterContestResult.OK;
  } catch (e) {
    console.log(e);
    result.msg = RegisterContestResult.SUPABASE_ERROR;
  }

  return result;
};

export enum CheckInResult {
  NOT_LOGGED = "Necesitas estas loggeado.",
  SUPABASE_ERROR = "Algo paso de nuestro lado.",
  NOT_REGISTERED = "Al parecer no estas registrado al contest.",
  OK = "Check-in exitoso.",
  ALREADY_CHECK = "Tu check-in ya esta hecho.",
}

export const checkInStudent = async (
  contest_id: number,
): Promise<{ ok: boolean; msg: CheckInResult }> => {
  const result = { ok: false, msg: CheckInResult.NOT_LOGGED };
  const user_metadata = await getUser();

  if (!user_metadata) return result;

  const user: Student | null = await getUserTableFromSupabaseId(
    user_metadata.id,
  );
  if (!user) {
    result.msg = CheckInResult.SUPABASE_ERROR;
    return result;
  }

  const participation: Participation[] = (
    await getParticipationsByStudentId(user.id)
  ).filter((p) => p.contest_id == contest_id);

  if (participation.length == 0) {
    result.msg = CheckInResult.NOT_REGISTERED;
    return result;
  }

  if (participation[0].checkin) {
    result.msg = CheckInResult.ALREADY_CHECK;
    return result;
  }

  const token = await getAccessToken();

  try {
    const res = await fetch(
      new URL(
        `/participation/${contest_id}/${user.id}`,
        process.env.NEXT_PUBLIC_BACKEND_URL,
      ),
      {
        method: "PUT",
        body: JSON.stringify({ checkin: true }),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token!}`,
          "acm-auth-signed-supabase": "",
        },
      },
    );

    if (!res.ok) throw "";

    result.ok = true;
    result.msg = CheckInResult.OK;
  } catch (e) {
    console.log(e);
    result.msg = CheckInResult.SUPABASE_ERROR;
  }

  return result;
};
