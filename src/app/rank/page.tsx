"use client";

import MainNavbar, { NavLink } from "@/components/shared/main-navbar";
import Footer from "@/components/shared/footer";
import { Ranking } from "@/components/league/sections/ranking";

const navLinks: NavLink[] = [];

export default function RankPage() {
  {
    /* El contenido interno debe ocupar como mínimo el alto de la pantalla para que el footer se vea bien */
  }
  return (
    <div className="min-h-[100dvh] flex flex-col justify-between">
      <MainNavbar navLinks={navLinks} />
      <div className="mt-[10rem] w-full max-w-[90rem] mx-auto p-8">
        <Ranking />
      </div>
      <Footer />
    </div>
  );
}
