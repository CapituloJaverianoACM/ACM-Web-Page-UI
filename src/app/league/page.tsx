"use client";

import { HeroUIProvider } from "@heroui/react";
import MainNavbar from "@/components/shared/main-navbar";
import { Hero } from "@/components/league/sections/hero";
import { Rules } from "@/components/league/sections/rules";
import { UpcomingEvents } from "@/components/league/sections/upcoming-events";
import { Podium } from "@/components/league/sections/podium";
import { Contest } from "@/models/contest.model";
import { LevelEnum } from "@/models/level.enum";
import { Student } from "@/models/student.model";
import Footer from "@/components/shared/footer";
import { getContestsWithPictures } from "@/services/contest.service";
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

const hard_coded_league_podium: { student: Student; order: number }[] = [
  {
    student: {
      _id: "1",
      avatar:
        "https://userpic.codeforces.org/3372984/avatar/13e0bcb6d6425cfe.jpg",
      level: LevelEnum.Advanced,
      matches_count: 100,
      name: "Acha1",
      surname: "Dev",
      victory_count: 90,
    },
    order: 0,
  },
  {
    student: {
      _id: "1",
      avatar:
        "https://userpic.codeforces.org/3372984/avatar/13e0bcb6d6425cfe.jpg",
      level: LevelEnum.Advanced,
      matches_count: 100,
      name: "Acha2",
      surname: "Dev",
      victory_count: 90,
    },
    order: 1,
  },
  {
    student: {
      _id: "1",
      avatar:
        "https://userpic.codeforces.org/3372984/avatar/13e0bcb6d6425cfe.jpg",
      level: LevelEnum.Advanced,
      matches_count: 100,
      name: "Acha3",
      surname: "Dev",
      victory_count: 90,
    },
    order: 2,
  },
];

export default function LeagueHomePage() {

  const [contests, setContests] = useState < (Contest & {
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
      <Podium students={hard_coded_league_podium} />
      <Footer />
    </HeroUIProvider>
  );
}
