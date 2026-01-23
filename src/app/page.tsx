"use client";
import { Activities } from "@/components/home/sections/activities";
import { Hero } from "@/components/home/sections/hero";
import { Members } from "@/components/home/sections/members";
import { CursorWrapper } from "@/components/home/ui/cursor-wrapper";

export default function HomePage() {
  return (
    <CursorWrapper>
      <Hero />
      <Activities />
      <Members />
    </CursorWrapper>
  );
}
