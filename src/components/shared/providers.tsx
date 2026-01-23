"use client";

import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import MainNavbar from "./main-navbar";
import Footer from "./footer";
import { useTranslations } from "next-intl";
import { NavLink } from "../navbar/navbar-item";
import {
  BanIcon,
  CalendarsIcon,
  HomeIcon,
  PencilIcon,
  SpotlightIcon,
  TrophyIcon,
  UserRoundMinusIcon,
  UsersIcon,
} from "lucide-react";

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000 * 5, // 5 minute
          refetchOnWindowFocus: false,
        },
      },
    });

    return client;
  });
  // window.__TANSTACK_QUERY_CLIENT__ = queryClient;

  const translation = useTranslations("Navigation");
  const navLinks: NavLink[] = [
    {
      key: "home",
      label: translation("home"),
      href: "/",
      isDropdown: true,
      dropdownItems: [
        {
          title: translation("dropdown.home.title"),
          logo: <HomeIcon />,
          description: translation("dropdown.home.description"),
          key: "home",
          href: "/",
        },
        {
          key: "activities",
          title: translation("dropdown.activities.title"),
          logo: <PencilIcon />,
          description: translation("dropdown.activities.description"),
          href: "/#activities",
        },
        {
          key: "members",
          title: translation("dropdown.members.title"),
          logo: <UsersIcon />,
          description: translation("dropdown.members.description"),
          href: "/#members",
        },
        {
          key: "inactive-members",
          title: translation("dropdown.inactiveMembers.title"),
          logo: <UserRoundMinusIcon />,
          description: translation("dropdown.inactiveMembers.description"),
          href: "/inactive-members",
        },
      ],
    },
    {
      key: "league",
      label: translation("league"),
      isDropdown: true,
      dropdownItems: [
        {
          key: "league",
          title: translation("dropdown.league.title"),
          logo: <TrophyIcon />,
          description: translation("dropdown.league.description"),
          href: "/league",
        },
        {
          key: "rules",
          title: translation("dropdown.rules.title"),
          logo: <BanIcon />,
          description: translation("dropdown.rules.description"),
          href: "/league#rules",
        },
        {
          href: "/league#upcoming-events",
          key: "upcoming-events",
          title: translation("dropdown.upcomingEvents.title"),
          logo: <CalendarsIcon />,
          description: translation("dropdown.upcomingEvents.description"),
        },
        {
          href: "/league#podium",
          key: "podium",
          title: translation("dropdown.podium.title"),
          logo: <SpotlightIcon />,
          description: translation("dropdown.podium.description"),
        },
      ],
    },
    {
      key: "roadmap",
      label: "Roadmap",
      href: "/roadmap",
      isDropdown: false,
    },
    {
      key: "discord",
      label: "Discord",
      isDropdown: false,
      href: "https://discord.gg/pj7nZsmx",
      isExternal: true,
    },
  ];
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <MainNavbar navLinks={navLinks} />
        {children}
        <Footer />
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
