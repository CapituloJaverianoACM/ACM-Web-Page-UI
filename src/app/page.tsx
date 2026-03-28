"use client";
import { Activities } from "@/components/home/sections/activities";
import { Hero } from "@/components/home/sections/hero";
import { Members } from "@/components/home/sections/members";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Activities />
      <Members />
    </>
  );
}
