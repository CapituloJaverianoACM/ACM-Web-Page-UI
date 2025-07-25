'use client';

import { AboutUs } from "@/components/home/sections/about-us";
import { Activities } from "@/components/home/sections/activities";
import { Hero } from "@/components/home/sections/hero";
import { Members } from "@/components/home/sections/members";
import { HeroUIProvider } from "@heroui/react";
import MainNavbar from '@/components/home/main-navbar';

export default function HomePage() {
  return (
    <HeroUIProvider>
      <div className="cursor-none">
        <MainNavbar />
        <Hero />
        <AboutUs />
        <Members />
        <Activities />
      </div>
    </HeroUIProvider>
  );
}
