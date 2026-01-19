"use client";
import { useTranslations } from "next-intl";

import { HeroUIProvider } from "@heroui/react";
import MainNavbar from "@/components/shared/main-navbar";
import { Roadmap } from "@/components/league/sections/roadmap";
import Footer from "@/components/shared/footer";
import { getNavLinks } from "@/lib/nav-links";

export default function RoadmapPage() {
  const t = useTranslations("Navigation");
  const navLinks = [
    { key: "home", label: t("home"), href: "/" },
    { key: "league", label: t("league"), href: "/league" },
  ];

  return (
    <HeroUIProvider>
      <MainNavbar navLinks={navLinks} />
      <Roadmap />
      <Footer />
    </HeroUIProvider>
  );
}
