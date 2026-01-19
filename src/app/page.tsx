"use client";
import { useTranslations } from "next-intl";
import { Activities } from "@/components/home/sections/activities";
import { Hero } from "@/components/home/sections/hero";
import { Members } from "@/components/home/sections/members";
import MainNavbar from "@/components/shared/main-navbar";
import { CursorWrapper } from "@/components/home/ui/cursor-wrapper";
import Footer from "../components/shared/footer";
import { getNavLinks } from "@/lib/nav-links";

export default function HomePage() {
  const t = useTranslations("Navigation");
  const navLinks = getNavLinks(t);

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
