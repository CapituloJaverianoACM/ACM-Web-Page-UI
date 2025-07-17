import { getMembers } from "@/controllers/member.controller";

export async function getMembersService() {
  const members = await getMembers();

  return members;
}
