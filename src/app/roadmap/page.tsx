"use client";

import { HeroUIProvider } from "@heroui/react";
import MainNavbar from "@/components/shared/main-navbar";
import { Roadmap } from "@/components/league/sections/roadmap";
import Footer from "@/components/shared/footer";

const navLinks = [{ key: "home", label: "Inicio", href: "/" }];

export default function RoadmapPage() {
  return (
    <HeroUIProvider>
      <MainNavbar navLinks={navLinks} />
      <Roadmap />
      <Footer />
    </HeroUIProvider>
  );
}
