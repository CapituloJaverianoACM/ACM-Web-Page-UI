"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InactiveMembers from "@/components/members/inactive-members";

const queryClient = new QueryClient();

export default function InactiveMembersPage() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <InactiveMembers />
      </QueryClientProvider>
    </>
  );
}
