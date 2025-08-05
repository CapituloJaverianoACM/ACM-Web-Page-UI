"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InactiveMembers from "@/components/members/inactive-members";
import { CursorWrapper } from "@/components/home/ui/cursor-wrapper";
import MainNavbar, { NavLink } from "@/components/shared/main-navbar";

const queryClient = new QueryClient();

const navlinks: NavLink[] = [];

export default function InactiveMembersPage() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CursorWrapper>
          <MainNavbar navLinks={navlinks} />
          <InactiveMembers />
        </CursorWrapper>
      </QueryClientProvider>
    </>
  );
}
