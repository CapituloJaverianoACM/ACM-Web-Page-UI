import { Participation } from "@/models/partipation.model";

export async function getParticipationsByStudentId(
  studentId: number,
): Promise<Participation[]> {
  const res = await fetch(
    new URL(
      `/participation/student/${studentId}`,
      process.env.NEXT_PUBLIC_BACKEND_URL,
    ),
  );

  if (!res.ok) {
    throw new Error("Error al obtener participations");
  }

  const json = await res.json();

  return json.data;
}
