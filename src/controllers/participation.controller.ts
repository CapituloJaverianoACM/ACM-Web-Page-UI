import { createClient } from "@/lib/supabase/client";
import { Contest } from "@/models/contest.model";
import { Participation } from "@/models/partipation.model";
import { User } from "@supabase/supabase-js";

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
  const supabase = createClient();
  const { data, error } = await supabase
    .from(STUDENT_TABLE)
    .select()
    .eq(STUDENT_ID_COLUMN, user.id);

  if (error || !data || data.length == 0) return [];

  return await getParticipationsByStudentId(data[0].id);
};

export enum RegisterContestResult {
  OK = "Registrado exitosamente.",
  NO_USER = "Debes loggearte primero.",
  NO_CODEFORCES_HANDLE = "No tienes el handle de codeforces configurado, ¡configuralo!",
  ALREADY_REGISTERED = "Ya estas registrado a este contest.",
  LEVEL_MISMATCH = "Tu nivel no coincide con el del contest.",
  SUPABASE_ERROR = "Algo salió mal de nuestro lado.",
}

const STUDENT_TABLE: string = "student";
const STUDENT_ID_COLUMN: string = "supabase_user_id";

export const registerUserToContest = async (
  user_metadata: User | null,
  contest: Contest,
): Promise<{ ok: boolean; msg: RegisterContestResult }> => {
  const result = { ok: false, msg: RegisterContestResult.SUPABASE_ERROR };
  if (!user_metadata) {
    result.msg = RegisterContestResult.NO_USER;
    return result;
  }

  const supabase = createClient();
  const { data, error: supabase_error } = await supabase
    .from(STUDENT_TABLE)
    .select()
    .eq(STUDENT_ID_COLUMN, user_metadata.id);

  if (supabase_error) {
    console.log(supabase_error);
    result.msg = RegisterContestResult.SUPABASE_ERROR;

    return result;
  }

  if (!data || data.length == 0) {
    result.msg = RegisterContestResult.SUPABASE_ERROR;
    return result;
  }

  const user = data[0];

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

  const token = (await supabase.auth.getSession()).data.session.access_token;
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
