'use client';

import { HeroUIProvider } from "@heroui/react";
import MainNavbar from '@/components/shared/main-navbar';
import { Hero } from "@/components/league/sections/hero";
import { Rules } from "@/components/league/sections/rules";
import { UpcomingEvents } from "@/components/league/sections/upcoming-events";
import { Podium } from "@/components/league/sections/podium";

const navLinks = [
  { key: "home", label: "Home", href: "/" },
  { key: "rules", label: "Rules", href: "#rules" },
  { key: "upcoming-events", label: "Upcoming Events", href: "#upcoming-events" },
  { key: "podium", label: "Podium", href: "#podium" },
];

export default function LeagueHomePage() {
  return (
    <HeroUIProvider>
      <MainNavbar navLinks={navLinks} />
      <Hero />
      <Rules />
      <UpcomingEvents />
      <Podium />
    </HeroUIProvider>
  );
}
