import { Student } from "@/models/student.model";

export async function getStudents() {
  const res = await fetch(
    new URL(`/students`, process.env.NEXT_PUBLIC_BACKEND_URL),
  );

  if (!res.ok) {
    throw new Error("Error al obtener estudiantes");
  }

  const json = await res.json();
  return json.data;
}

export async function getPodiumStudents(): Promise<Student[]> {
  const res = await fetch(
    new URL(
      `/students?limit=3&ordercol=victory_count&subordercol=matches_count&subasc=1`,
      process.env.NEXT_PUBLIC_BACKEND_URL,
    ),
  );

  if (!res.ok) {
    throw new Error("Error al obtener los estudiantes del podio");
  }

  const json = await res.json();
  return json.data;
}

export async function getRankingStudents({
  student_number,
  offset = 0,
}: {
  student_number: number;
  offset?: number
}): Promise<Student[]> {
  const res = await fetch(
    new URL(
      `/students?limit=${student_number}&ordercol=victory_count&subordercol=matches_count&subasc=1&offset=${offset}`,
      process.env.NEXT_PUBLIC_BACKEND_URL,
    ),
  );

  if (!res.ok) {
    throw new Error("Error al obtener los estudiantes del ranking");
  }

  const json = await res.json();
  return json.data;
}
