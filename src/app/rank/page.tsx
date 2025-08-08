"use client";

import MainNavbar, { NavLink } from "@/components/shared/main-navbar";
import Footer from "@/components/shared/footer";

const navLinks: NavLink[] = [];

export default function RankPage() {
  return (
    <>
      <MainNavbar navLinks={navLinks} />
      {/* El contenido interno debe ocupar como mínimo el alto de la pantalla para que el footer se vea bien */}
      <Footer />
    </>
  );
}
