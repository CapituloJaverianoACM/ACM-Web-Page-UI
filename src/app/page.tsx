'use client';
import { AboutUs } from "@/components/home/sections/about-us";
import { Hero } from "@/components/home/sections/hero";
import { Members } from "@/components/home/sections/members";
import { HeroUIProvider } from "@heroui/react";
import MainNavbar from '@/components/shared/main-navbar';
import { CursorWrapper } from "@/components/home/ui/cursor-wrapper";
import Footer from "../components/shared/footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Contributors from "@/components/home/sections/contributors";

const navLinks = [
  { key: "home", label: "Home", href: "#home" },
  { key: "about us", label: "About Us", href: "#about-us" },
  { key: "members", label: "Members", href: "#members" },
  { key: "league", label: "League", href: "/league" },
];

const queryClient = new QueryClient();

export default function HomePage() {
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <CursorWrapper>
          <MainNavbar navLinks={navLinks} />
          <Hero />
          <AboutUs />
          <Members />
          <Contributors />
          <Footer />
        </CursorWrapper>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
