import { Participation } from "@/models/partipation.model";

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
