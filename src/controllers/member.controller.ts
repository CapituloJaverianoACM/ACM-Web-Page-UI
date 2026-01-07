export async function getMembers() {
  const res = await fetch(
    new URL(`/members`, process.env.NEXT_PUBLIC_BACKEND_URL),
  );

  console.log(res);
  if (!res.ok) {
    throw new Error("Error al obtener miembros");
  }

  const json = await res.json();
  return json.data;
}
