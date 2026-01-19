"use client";
import { useTranslations } from "next-intl";

import MainNavbar from "@/components/shared/main-navbar";
import { Hero } from "@/components/league/sections/hero";
import { Rules } from "@/components/league/sections/rules";
import { UpcomingEvents } from "@/components/league/sections/upcoming-events";
import { Podium } from "@/components/league/sections/podium";
import Footer from "@/components/shared/footer";
import { getContestsWithPictures } from "@/controllers/contest.controller";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { suscribe_leaderboard } from "@/lib/supabase/channel_subscribe";
import { RoadmapButton } from "@/components/home/ui/roadmap-button";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function LeagueHomePage() {
  const t = useTranslations("Navigation");
  const navLinks = [
    { key: "home", label: t("home"), href: "/" },
    { key: "rules", label: t("rules"), href: "#rules" },
    {
      key: "upcoming-events",
      label: t("upcomingEvents"),
      href: "#upcoming-events",
    },
    { key: "podium", label: t("podium"), href: "#podium" },
    { key: "rank", label: t("rank"), href: "/rank" },
  ];

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["league-contests"],
    queryFn: async () => {
      const supabase = createClient();
      const user = (await supabase.auth.getUser()).data.user;
      return await getContestsWithPictures(user);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = createClient();
    const channel = suscribe_leaderboard(supabase, () => {
      queryClient.invalidateQueries({ queryKey: ["podium-students"] });
      queryClient.invalidateQueries({ queryKey: ["ranking-students"] });
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return (
    <>
      <MainNavbar navLinks={navLinks} />
      <Hero />
      <Rules />
      <UpcomingEvents events={contests} loadingInitialState={isLoading} />
      <Podium />
      <Footer />
      <RoadmapButton />
    </>
  );
}
