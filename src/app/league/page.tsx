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
import { createClient } from "@/lib/supabase/client";
import { suscribe_leaderboard } from "@/lib/supabase/channel_subscribe";

const navLinks = [
  { key: "home", label: "Inicio", href: "/" },
  { key: "rules", label: "Reglas", href: "#rules" },
  {
    key: "upcoming-events",
    label: "Próximos Eventos",
    href: "#upcoming-events",
  },
  { key: "podium", label: "Podio", href: "#podium" },
  { key: "rank", label: "Raking", href: "/rank" },
];

export default function LeagueHomePage() {
  const [contests, setContests] = useState<
    (Contest & {
      picture: {
        link: string;
      };
    })[]
  >([]);

  const [refresh_students, setRefreshStudents] = useState<boolean>(false);

  useEffect(() => {
    getContestsWithPictures()
      .then(setContests)
      .catch(() => setContests([]));
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const channel = suscribe_leaderboard(supabase, () => {
      setRefreshStudents((prev) => !prev);
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <HeroUIProvider>
      <MainNavbar navLinks={navLinks} />
      <Hero />
      <Rules />
      <UpcomingEvents events={contests} loadingInitialState />
      <Podium refresh_toggle={refresh_students} />
      <Footer />
    </HeroUIProvider>
  );
}
