"use client";
import { Activities } from "@/components/home/sections/activities";
import { Hero } from "@/components/home/sections/hero";
import { Members } from "@/components/home/sections/members";
import { HeroUIProvider } from "@heroui/react";
import MainNavbar from "@/components/shared/main-navbar";
import { CursorWrapper } from "@/components/home/ui/cursor-wrapper";
import Footer from "../components/shared/footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { navLinks } from "@/lib/nav-links";

const queryClient = new QueryClient();

export default function HomePage() {
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <CursorWrapper>
          <MainNavbar navLinks={navLinks} />
          <Hero />
          <Activities />
          <Members />
          <Footer />
        </CursorWrapper>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
