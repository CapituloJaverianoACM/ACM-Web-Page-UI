'use client';

import { HeroUIProvider } from "@heroui/react";
import MainNavbar from '@/components/shared/main-navbar';
import { Hero } from "@/components/league/sections/hero";
import { Rules } from "@/components/league/sections/rules";
import { UpcomingEvents } from "@/components/league/sections/upcoming-events";
import { Podium } from "@/components/league/sections/podium";
import { Contest } from "@/models/contest.model";
import { LevelEnum } from "@/models/level.enum";
import Footer from "@/components/shared/footer";

const navLinks = [
  { key: "home", label: "Home", href: "/" },
  { key: "rules", label: "Rules", href: "#rules" },
  { key: "upcoming-events", label: "Upcoming Events", href: "#upcoming-events" },
  { key: "podium", label: "Podium", href: "#podium" },
];

// API CONSUME NOT IMPLEMENTED
const hard_coded_events: Contest[] = [
  {
    _id: "1",
    classroom: "S02-P501",
    date: new Date("2025-08-01T14:00:00-05:00"),
    start_hour: new Date("2025-08-01T14:00:00-05:00"),
    final_hour: new Date("2025-08-01T14:00:00-05:00"),
    level: LevelEnum.Advanced,
    name: "Probando",
    picture: {
      _id: "1",
      contest_id: "1",
      link: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }
  },
  {
    _id: "2",
    classroom: "S02-P501",
    date: new Date("2025-08-01T14:00:00-05:00"),
    start_hour: new Date("2025-08-01T14:00:00-05:00"),
    final_hour: new Date("2025-08-01T14:00:00-05:00"),
    level: LevelEnum.Advanced,
    name: "Probando",
  },
  {
    _id: "3",
    classroom: "S02-P501",
    date: new Date("2025-08-01T14:00:00-05:00"),
    start_hour: new Date("2025-08-01T14:00:00-05:00"),
    final_hour: new Date("2025-08-01T14:00:00-05:00"),
    level: LevelEnum.Advanced,
    name: "Probando",
  },
  {
    _id: "4",
    classroom: "S02-P501",
    date: new Date("2025-08-01T14:00:00-05:00"),
    start_hour: new Date("2025-08-01T14:00:00-05:00"),
    final_hour: new Date("2025-08-01T14:00:00-05:00"),
    level: LevelEnum.Advanced,
    name: "Probando",
  },
  {
    _id: "5",
    classroom: "S02-P501",
    date: new Date("2025-08-01T14:00:00-05:00"),
    start_hour: new Date("2025-08-01T14:00:00-05:00"),
    final_hour: new Date("2025-08-01T14:00:00-05:00"),
    level: LevelEnum.Advanced,
    name: "Probando",
  },
  {
    _id: "6",
    classroom: "S02-P501",
    date: new Date("2025-08-01T14:00:00-05:00"),
    start_hour: new Date("2025-08-01T14:00:00-05:00"),
    final_hour: new Date("2025-08-01T14:00:00-05:00"),
    level: LevelEnum.Advanced,
    name: "Probando",
  },
  {
    _id: "7",
    classroom: "S02-P501",
    date: new Date("2025-08-01T14:00:00-05:00"),
    start_hour: new Date("2025-08-01T14:00:00-05:00"),
    final_hour: new Date("2025-08-01T14:00:00-05:00"),
    level: LevelEnum.Advanced,
    name: "Probando",
  },
  {
    _id: "8",
    classroom: "S02-P501",
    date: new Date("2025-08-01T14:00:00-05:00"),
    start_hour: new Date("2025-08-01T14:00:00-05:00"),
    final_hour: new Date("2025-08-01T14:00:00-05:00"),
    level: LevelEnum.Advanced,
    name: "Probando",
  },
  {
    _id: "9",
    classroom: "S02-P501",
    date: new Date("2025-08-01T14:00:00-05:00"),
    start_hour: new Date("2025-08-01T14:00:00-05:00"),
    final_hour: new Date("2025-08-01T14:00:00-05:00"),
    level: LevelEnum.Advanced,
    name: "Probando",
  },
  {
    _id: "10",
    classroom: "S02-P501",
    date: new Date("2025-08-01T14:00:00-05:00"),
    start_hour: new Date("2025-08-01T14:00:00-05:00"),
    final_hour: new Date("2025-08-01T14:00:00-05:00"),
    level: LevelEnum.Advanced,
    name: "Probando",
  },
]

export default function LeagueHomePage() {
  return (
    <HeroUIProvider>
      <MainNavbar navLinks={navLinks} />
      <Hero />
      <Rules />
      <UpcomingEvents events={hard_coded_events} />
      <Podium />
      <Footer />
    </HeroUIProvider>
  );
}
