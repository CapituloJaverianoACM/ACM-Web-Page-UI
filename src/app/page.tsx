"use client";
import { Activities } from "@/components/home/sections/activities";
import { Hero } from "@/components/home/sections/hero";
import { Members } from "@/components/home/sections/members";
import MainNavbar from "@/components/shared/main-navbar";
import { CursorWrapper } from "@/components/home/ui/cursor-wrapper";
import Footer from "../components/shared/footer";
import { navLinks } from "@/lib/nav-links";

export default function HomePage() {
  return (
    <CursorWrapper>
      <MainNavbar navLinks={navLinks} />
      <Hero />
      <Activities />
      <Members />
      <Footer />
    </CursorWrapper>
  );
}
