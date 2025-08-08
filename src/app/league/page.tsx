"use client";

import { HeroUIProvider } from "@heroui/react";
import MainNavbar from "@/components/shared/main-navbar";
import { Hero } from "@/components/league/sections/hero";
import { Rules } from "@/components/league/sections/rules";
import { UpcomingEvents } from "@/components/league/sections/upcoming-events";
import { Podium } from "@/components/league/sections/podium";
import { Contest } from "@/models/contest.model";
import Footer from "@/components/shared/footer";
import { getContestsWithPictures } from "@/controllers/contest.controller";
import { useEffect, useState } from "react";

const navLinks = [
  { key: "home", label: "Home", href: "/" },
  { key: "rules", label: "Rules", href: "#rules" },
  {
    key: "upcoming-events",
    label: "Upcoming Events",
    href: "#upcoming-events",
  },
  { key: "podium", label: "Podium", href: "#podium" },
];

export default function LeagueHomePage() {

  const [contests, setContests] = useState<(Contest & {
    picture: {
      link: string;
    };
  })[]>([]);

  useEffect(() => {
    getContestsWithPictures()
      .then(setContests)
      .catch(() => setContests([]));
  }, []);


  return (
    <HeroUIProvider>
      <MainNavbar navLinks={navLinks} />
      <Hero />
      <Rules />
      <UpcomingEvents events={contests} loadingInitialState />
      <Podium  />
      <Footer />
    </HeroUIProvider>
  );
}
