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
      // Si el estudiante no tiene participaciones o hay un error, retornar array vacío
      if (res.status === 404) {
        return [];
      }
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
}
