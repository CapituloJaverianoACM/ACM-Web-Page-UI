import { BACKEND_URL } from "@/config/env";

export async function getMembers() {
  const res = await fetch(new URL(`/members`, BACKEND_URL));

  if (!res.ok) {
    throw new Error("Error al obtener miembros");
  }

  const json = await res.json();
  return json.data;
}
