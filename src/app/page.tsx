'use client';

import { AboutUs } from "@/components/sections/about-us";
import { Activities } from "@/components/sections/activities";
import { Hero } from "@/components/sections/hero";
import { Members } from "@/components/sections/members";


export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Members />
      <Activities />
    </>
  );
}
