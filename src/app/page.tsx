'use client';

import { AboutUs } from "@/components/home/sections/about-us";
import { Activities } from "@/components/home/sections/activities";
import { Hero } from "@/components/home/sections/hero";
import { Members } from "@/components/home/sections/members";
import { HeroUIProvider } from "@heroui/react";
import MainNavbar from '@/components/shared/main-navbar';
import { CursorWrapper } from "@/components/home/ui/cursor-wrapper";
import Footer from "../components/shared/footer";

const navLinks = [
  { key: "home", label: "Home", href: "#home" },
  { key: "about us", label: "About Us", href: "#about-us" },
  { key: "members", label: "Members", href: "#members" },
  { key: "league", label: "League", href: "/league" },
];

export default function HomePage() {
  return (
    <HeroUIProvider>
      <CursorWrapper>
        <MainNavbar navLinks={navLinks} />
        <Hero />
        <AboutUs />
        <Members />
        <Activities />
        <Footer />
      </CursorWrapper>
    </HeroUIProvider>
  );
}
