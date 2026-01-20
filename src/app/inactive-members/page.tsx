"use client";
import InactiveMembers from "@/components/members/inactive-members";
import { CursorWrapper } from "@/components/home/ui/cursor-wrapper";
import MainNavbar, { NavLink } from "@/components/shared/main-navbar";

const navlinks: NavLink[] = [];

export default function InactiveMembersPage() {
  return (
    <>
      <CursorWrapper>
        <MainNavbar navLinks={navlinks} />
        <InactiveMembers />
      </CursorWrapper>
    </>
  );
}
