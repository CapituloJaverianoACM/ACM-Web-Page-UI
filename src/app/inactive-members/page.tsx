"use client";
import InactiveMembers from "@/components/members/inactive-members";
import { CursorWrapper } from "@/components/home/ui/cursor-wrapper";

export default function InactiveMembersPage() {
  return (
    <CursorWrapper>
      <InactiveMembers />
    </CursorWrapper>
  );
}
