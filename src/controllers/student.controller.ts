export async function getStudents() {
  const res = await fetch(new URL(`/students`, process.env.NEXT_PUBLIC_BACKEND_URL));

  if (!res.ok) {
    throw new Error("Error al obtener estudiantes");
  }

  const json = await res.json();
  return json.data;
}

export async function getPodiumStudents() {
  const res = await fetch(new URL(`/students?limit=3&ordercol=victory_count&subordercol=matches_count&subasc=1`, process.env.NEXT_PUBLIC_BACKEND_URL));

  if (!res.ok) {
    throw new Error("Error al obtener los estudiantes del podio");
  }

  const json = await res.json();
  return json.data;
}
