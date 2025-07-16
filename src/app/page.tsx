'use client';

import { AboutUs } from "@/components/sections/about-us";
import { Activities } from "@/components/sections/activities";
import { Hero } from "@/components/sections/hero";
import { Members } from "@/components/sections/members";
import { HeroUIProvider } from "@heroui/react";
import MainNavbar from '@/components/main-navbar';

export default function HomePage() {
  return (
    <HeroUIProvider>
      <MainNavbar />
      <>
        <Hero />
        <AboutUs />
        <Members />
        <Activities />
      </>
    </HeroUIProvider>
  );
}
