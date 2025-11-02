//import { supabase } from "@/lib/supabase";
import { Participation } from "@/models/participation.model";

// Este token es tu "pase temporal" para hablar con la API mientras no hay login.
const TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTkwNjQxOTIsImRhdGEiOnsiZW1haWwiOiJhY21AamF2ZXJpYW5hLmVkdS5jbyIsInN1cGVyIjp0cnVlfSwiaWF0IjoxNzU5MDYwNTkyfQ._gXd3FVPWF2ixpm-OPARVYskCzQNv7X_URSbqiaGGkA"; // CAMBIAR

/**
 * Registra al estudiante actual en un concurso.
 * @param contestId - El ID del concurso al que se registrará el estudiante.
 * @returns - La información de la participación creada.
 */
// Le indicamos a la función que debe devolver una Promesa que se resuelve en un objeto Participation
export async function registerForContest(
  contestId: number,
): Promise<Participation> {
  //const { data: { user } } = await supabase.auth.getUser();

  //   if (!user) {
  //     throw new Error("Debes iniciar sesión para registrarte en un concurso.");
  //   }

  //   const { data: studentData, error: studentError } = await supabase
  //     .from("student")
  //     .select("id")
  //     .eq("supabase_user_id", user.id)
  //     .single();

  //   if (studentError || !studentData) {
  //     throw new Error("No se pudo encontrar la información del estudiante.");
  //   }

  //const studentId = studentData.id;
  const studentId = 9; // Temporalmente, hasta que implementemos la autenticación

  const res = await fetch(
    new URL(`/participation/create`, process.env.NEXT_PUBLIC_BACKEND_URL),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${session.access_token}`
        Authorization: `Bearer ${TEST_TOKEN}`,
      },
      body: JSON.stringify({
        contest_id: contestId,
        student_id: studentId,
        checkin: false,
      }),
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = JSON.stringify(errorData.error, null, 2);
    throw new Error(errorMessage || "Error al registrarse en el concurso.");
  }

  const json = await res.json();
  return json.data;
}

/**
 * Realiza el check-in del estudiante en un concurso.
 * @param contestId - El ID del concurso.
 * @param studentId - El ID del estudiante.
 * @returns - La información de la participación actualizada.
 */
// Igualmente aquí...
export async function checkInForContest(
  contestId: number,
  studentId: number,
): Promise<Participation> {
  const res = await fetch(
    new URL(
      `/participation/${contestId}/${studentId}`,
      process.env.NEXT_PUBLIC_BACKEND_URL,
    ),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${session.access_token}`,
        Authorization: `Bearer ${TEST_TOKEN}`,
      },
      body: JSON.stringify({
        checkin: true,
      }),
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = JSON.stringify(errorData.error, null, 2);
    throw new Error(errorMessage || "Error al realizar el check-in.");
  }

  const json = await res.json();
  return json.data;
}

/**
 * Obtiene las participaciones de un estudiante.
 * @param studentId - El ID del estudiante.
 * @returns - Una lista de las participaciones del estudiante.
 */
// ...y aquí le decimos que devolverá un ARREGLO de participaciones.
export async function getStudentParticipations(
  studentId: number,
): Promise<Participation[]> {
  const res = await fetch(
    new URL(
      `/participation/student/${studentId}`,
      process.env.NEXT_PUBLIC_BACKEND_URL,
    ),
  );

  if (!res.ok) {
    if (res.status === 400) {
      return [];
    }
    throw new Error("Error al obtener las participaciones.");
  }

  const json = await res.json();
  return json.data;
}
