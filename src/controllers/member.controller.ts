export async function getMembers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/members`);

  if (!res.ok) {
    throw new Error("Error al obtener miembros");
  }

  const json = await res.json();
  return json.data;
}
