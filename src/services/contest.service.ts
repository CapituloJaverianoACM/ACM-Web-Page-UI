import { Contest } from "@/models/contest.model";

export async function getContests(): Promise<Contest[]> {
  const res = await fetch(new URL(`/contests`, process.env.NEXT_PUBLIC_BACKEND_URL));

  if (!res.ok) {
    throw new Error("Error al obtener contests");
  }

  const json = await res.json();
  return json.data;
}
