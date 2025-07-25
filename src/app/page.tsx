'use client';

import { AboutUs } from "@/components/home/sections/about-us";
import { Activities } from "@/components/home/sections/activities";
import { Hero } from "@/components/home/sections/hero";
import { Members } from "@/components/home/sections/members";
import { HeroUIProvider } from "@heroui/react";
import MainNavbar from '@/components/shared/main-navbar';

const navLinks = [
  { key: "home", label: "Home", href: "#home" },
  { key: "about us", label: "About Us", href: "#about-us" },
  { key: "members", label: "Members", href: "#members" },
  { key: "league", label: "League", href: "/league" },
];

export default function HomePage() {
  return (
    <HeroUIProvider>
      <MainNavbar navLinks={navLinks} />
      <div>
        <Hero />
        <AboutUs />
        <Members />
        <Activities />
      </div>
    </HeroUIProvider>
  );
}
