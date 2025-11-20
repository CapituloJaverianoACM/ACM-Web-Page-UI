"use server";

import { Student } from "@/models/student.model";
import { getAccessToken } from "./supabase.controller";

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

export async function getStudentById(id: number): Promise<Student> {
  const res = await fetch(
    new URL(`/students/${id}`, process.env.NEXT_PUBLIC_BACKEND_URL),
  );

  if (!res.ok) {
    throw new Error("Error al obtener el estudiante");
  }

  const json = await res.json();

  return Array.isArray(json.data) ? json.data[0] : json.data;
}

export async function getStudentBySupabaseId(
  id: string,
): Promise<Student | null> {
  if (!id) {
    return null;
  }

  try {
    const res = await fetch(
      new URL(`/students/supabase/${id}`, process.env.NEXT_PUBLIC_BACKEND_URL),
    );

    if (!res.ok) {
      // Si el estudiante no existe o hay un error, retornar null en lugar de lanzar error
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Error al obtener el estudiante: ${res.statusText}`);
    }

    const json = await res.json();
    return Array.isArray(json.data) ? json.data[0] : json.data;
  } catch (error) {
    throw new Error("Error al obtener el estudiante: " + error.message);
  }
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
}: {
  student_number: number;
}): Promise<Student[]> {
  const res = await fetch(
    new URL(
      `/students?limit=${student_number}&ordercol=victory_count&subordercol=matches_count&subasc=1`,
      process.env.NEXT_PUBLIC_BACKEND_URL,
    ),
  );

  if (!res.ok) {
    throw new Error("Error al obtener los estudiantes del ranking");
  }

  const json = await res.json();
  return json.data;
}

export async function updateStudent(
  id: number,
  student: Partial<Student>,
): Promise<Student> {
  const token = await getAccessToken();

  if (!token) {
    throw new Error("No se pudo obtener el token de autenticación");
  }

  const res = await fetch(
    new URL(`/students/${id}`, process.env.NEXT_PUBLIC_BACKEND_URL),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "acm-auth-signed-supabase": "true",
      },
      body: JSON.stringify(student),
    },
  );

  if (!res.ok) {
    throw new Error("Error al actualizar el estudiante: " + res.statusText);
  }

  const json = await res.json();
  return json.data;
}
